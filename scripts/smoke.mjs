import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

/* Runs against the single-file build, so no server is needed.
   Build it first:  npm run build && node scripts/build-singlefile.mjs  */
const TARGET = process.env.LQ_TARGET
  || 'file://' + resolve('dist/learning-quest.html');
/* Browser resolution, in order: an explicit LQ_CHROMIUM, then a preinstalled
   one if this environment provides it, then Playwright's own download. The
   previous hardcoded container path threw ENOENT on a normal machine, which
   is where the README tells people to run this. */
const PINNED = process.env.LQ_CHROMIUM
  || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : null);
const b = await chromium.launch(PINNED ? { executablePath: PINNED } : {});
const p = await b.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));

// Seed a profile with math day 1 complete + a legacy-shaped profile missing `completed`
await p.goto(TARGET, { waitUntil: 'domcontentloaded' });
await p.evaluate(() => {
  localStorage.clear();
  localStorage.setItem('lq_v3', JSON.stringify({
    version: 3,
    profiles: [
      { id: 'p1', name: 'Seeded', xp: 70, completed: { 'math:m1': { best: 5, total: 5 }, 'bio:bio1': { best: 4, total: 4 } }, practice: {}, streak: { count: 3, last: '2026-08-20' } },
      { id: 'p2', name: 'Malformed' },   // missing completed/practice/streak on purpose
    ],
    lastActive: 'p1',
  }));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
const t = () => p.evaluate(() => document.body.innerText);
console.log('dash:', (await t()).split('\n').filter(Boolean).slice(0,4).join(' | '));

await p.getByText('Mathematics').first().click(); await p.waitForTimeout(500);
/* Day cards are buttons since the accessibility pass; a locked day is
   disabled rather than merely dimmed. */
const rows = await p.evaluate(() => [...document.querySelectorAll('button')]
  .filter((b) => (b.getAttribute('aria-label') || '').startsWith('Day '))
  .slice(0, 4)
  .map((b) => ({ label: b.getAttribute('aria-label').slice(0, 30), disabled: b.disabled })));
console.log('day rows:', JSON.stringify(rows, null, 0));

// malformed profile must not crash the app (eval bug #11)
await p.evaluate(() => { const d = JSON.parse(localStorage.getItem('lq_v3')); d.lastActive = 'p2'; localStorage.setItem('lq_v3', JSON.stringify(d)); });
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
const after = await t();
console.log('malformed profile renders:', after.length > 40 ? 'OK — ' + after.split('\n').filter(Boolean)[1] : 'BLANK/CRASH');
/* Every path that writes to his profile, driven end to end.
 *
 * The unit suite cannot catch a missing import inside a React state updater:
 * finishPractice kept an inline copy of the streak logic after the other two
 * call sites moved to a shared helper, still referencing an import that had
 * gone with it, so finishing ANY duel threw and white-screened the app. His
 * saved progress survived — the throw landed before the write — but the XP
 * from that duel was never recorded, and nothing here noticed.
 *
 * So this now finishes a real duel and checks both that nothing threw and
 * that the profile came out the other side larger, not smaller. */
await p.evaluate(() => {
  const done = {};
  for (const id of ['phy1', 'phy2', 'phy3', 'phy4', 'phy5', 'phy6', 'phyr1']) done['physics:' + id] = { best: 4, total: 4 };
  localStorage.setItem('lq_v3', JSON.stringify({
    version: 3,
    profiles: [{ id: 'p1', name: 'Duellist', xp: 500, completed: done, practice: {}, review: {}, writing: {},
      calibration: {}, streak: { count: 6, last: '2026-01-01' }, skips: 1 }],
    lastActive: 'p1',
  }));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
const beforeDuel = await p.evaluate(() => JSON.parse(localStorage.getItem('lq_v3')).profiles[0]);

await p.locator('button[aria-label^="Skill Duel"]').first().click(); await p.waitForTimeout(400);
await p.getByRole('button', { name: /Force, Mass/ }).first().click(); await p.waitForTimeout(400);
const solve = (q) => {
  let m;
  if ((m = q.match(/A (\d+) kg object accelerates at (\d+)/))) return +m[1] * +m[2];
  if ((m = q.match(/force of (\d+) N acts on a (\d+) kg/))) return +m[1] / +m[2];
  if ((m = q.match(/force of (\d+) N gives an object an acceleration of (\d+)/))) return +m[1] / +m[2];
  return 1;
};
let duelDone = false;
for (let i = 0; i < 14; i++) {
  const txt = await t();
  if (/DEFEATED/i.test(txt)) { duelDone = true; break; }
  if (!(await p.locator('input').count())) break;
  const m = txt.match(/YOUR MOVE\n([^\n]+)|CHARGED\n([^\n]+)/);
  await p.locator('input').first().fill(String(solve(m ? (m[1] || m[2]) : '')));
  await p.getByRole('button', { name: /^Check answer$/ }).click(); await p.waitForTimeout(140);
  const cast = p.getByRole('button', { name: /^Cast$/ });
  if (!(await cast.count())) break;
  await cast.click(); await p.waitForTimeout(260);
}
const afterDuel = await p.evaluate(() => JSON.parse(localStorage.getItem('lq_v3')).profiles[0]);
console.log('duel completed:', duelDone);
console.log('xp went up:', afterDuel.xp > beforeDuel.xp, `(${beforeDuel.xp} -> ${afterDuel.xp})`);
console.log('completed days preserved:',
  Object.keys(afterDuel.completed).length === Object.keys(beforeDuel.completed).length);
console.log('practice recorded:', Object.keys(afterDuel.practice).length > 0);

console.log('pageerrors:', errs.length ? errs : 'none');

/* Fail loudly. Printing 'BLANK/CRASH' and exiting 0 made this test unable to
   catch the exact regression it exists to guard. */
const failures = [];
if (errs.length) failures.push(`${errs.length} page error(s)`);
if (!/Welcome back/.test(after)) failures.push('malformed profile did not render');
if (!rows.length) failures.push('no day rows rendered');
if (!duelDone) failures.push('a duel could not be finished');
if (!(afterDuel.xp > beforeDuel.xp)) failures.push('finishing a duel did not record XP');
if (Object.keys(afterDuel.completed).length !== Object.keys(beforeDuel.completed).length) {
  failures.push('finishing a duel changed his completed days');
}
// math:m1 is seeded complete, so day 1 and day 2 open and day 3 stays locked
if (rows.length >= 3 && (rows[0].disabled || rows[1].disabled || !rows[2].disabled)) {
  failures.push('unlock cascade wrong: ' + JSON.stringify(rows.slice(0, 3)));
}
if (failures.length) { console.error('\nFAILED: ' + failures.join('; ')); process.exit(1); }
console.log('\nsmoke passed');
await b.close();
