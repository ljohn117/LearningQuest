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

/* ---- writing ------------------------------------------------------------
 * The write box renders, files what he types under the prompt's id, and is
 * never required to finish a day. Checked in a real browser because all
 * three are things the unit tests cannot see: the unit suite can prove the
 * data is shaped right and still miss a block that silently renders nothing.
 * Uses math day 2, whose last page carries a `flaw` prompt. */
/* Re-seed rather than reuse: earlier sections switch profiles and spend
   progress, and a day-2 card that is still locked makes this section fail
   for a reason that has nothing to do with writing. */
await p.evaluate(() => {
  localStorage.setItem('lq_v3', JSON.stringify({
    version: 3,
    profiles: [{
      id: 'p1', name: 'Seeded', xp: 70,
      completed: { 'math:m1': { best: 5, total: 5 } },
      practice: {}, review: {}, writing: {},
      streak: { count: 3, last: '2026-08-20' },
    }],
    lastActive: 'p1',
  }));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
await p.getByText('Mathematics').first().click(); await p.waitForTimeout(400);
await p.locator('button[aria-label^="Day 2,"]').first().click(); await p.waitForTimeout(500);
for (let i = 0; i < 6; i++) {
  const t = await p.evaluate(() => document.body.innerText);
  if (/15% of 100 is 15/.test(t)) break;           // the claim under critique
  const next = p.getByRole('button', { name: /let.s go|next/i }).first();
  if (!(await next.count()) || !(await next.isVisible())) break;
  await next.click(); await p.waitForTimeout(320);
}
const writeBody = await p.evaluate(() => document.body.innerText);
const writeRendered = /15% of 100 is 15/.test(writeBody)
  && /someone says/i.test(writeBody)
  && /find the mistake/i.test(writeBody)
  && (await p.locator('textarea').count()) > 0;
console.log('write block renders:', writeRendered);

let writeFiled = false, noStrayKey = true;
if (writeRendered) {
  await p.locator('textarea').first().fill('It takes 15% of 100 instead of 15% of 60.');
  await p.waitForTimeout(1100);
  const w = await p.evaluate(() => JSON.parse(localStorage.getItem('lq_v3')).profiles[0].writing);
  writeFiled = !!w['w:x-m2'];
  noStrayKey = !Object.keys(w).some((k) => k.startsWith('math:m2:'));
  console.log('writing filed by prompt id:', writeFiled, '| no positional key:', noStrayKey);
}

/* Old backups are keyed by position. They must still resolve to a real lane
   in the parent view rather than rendering as "undefined · undefined". */
await p.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('lq_v3'));
  s.profiles[0].writing = {
    'w:x-m2': { text: 'new-key answer', checked: [], at: '2026-09-12' },
    'ela:ela5:3:2': { text: 'legacy-key answer', checked: [], at: '2026-08-01' },
  };
  localStorage.setItem('lq_v3', JSON.stringify(s));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
const parentBtn = p.getByText(/for parents/i).first();
if (await parentBtn.count()) { await parentBtn.click(); await p.waitForTimeout(700); }
const pv = await p.evaluate(() => document.body.innerText);
const parentOK = /new-key answer/.test(pv) && /legacy-key answer/.test(pv) && !/undefined/.test(pv);
console.log('parent view resolves both key shapes:', parentOK);

/* ---- readiness --------------------------------------------------------
 * Depth days open on demonstrated understanding, not completion alone. The
 * card must name its own key and must never read as a punishment; a lock icon
 * with no explanation is the thing this replaced. Synthetic profile: real
 * progress data never belongs in this repo.
 *
 * Chemistry days 11-13 require chem:ch5 or chem:ch6 at 60%. Here ch5 is
 * finished but shaky, so they stay closed and must say why. */
await p.evaluate(() => {
  const completed = {};
  for (const id of ['ch1','ch2','ch3','ch4','ch5','ch6','ch7','ch8','ch9','ch10','chr1']) {
    completed['chem:' + id] = { best: 2, total: 5 };     // finished, not understood
  }
  localStorage.setItem('lq_v3', JSON.stringify({
    version: 3,
    profiles: [{ id: 'p1', name: 'Seeded', xp: 400, completed, practice: {}, review: {}, writing: {},
                 calibration: {}, streak: { count: 2, last: '2026-09-13' }, skips: 0 }],
    lastActive: 'p1',
  }));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
await p.getByText('Chemistry').first().click(); await p.waitForTimeout(600);
const gateBody = await p.evaluate(() => document.body.innerText);
const gateNames = /opens at \d+ of \d+ on /i.test(gateBody);
const gateDuel = /or win the .+ duel/i.test(gateBody);
const gateKind = !/\blocked\b|\bfailed\b/i.test(gateBody);
console.log('closed depth day names its key:', gateNames, '| offers the duel too:', gateDuel, '| never says locked:', gateKind);

/* And it must actually OPEN once the prerequisite is understood. */
await p.evaluate(() => {
  const st = JSON.parse(localStorage.getItem('lq_v3'));
  st.profiles[0].completed['chem:ch5'] = { best: 4, total: 5 };
  st.profiles[0].completed['chem:ch6'] = { best: 4, total: 5 };
  localStorage.setItem('lq_v3', JSON.stringify(st));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
await p.getByText('Chemistry').first().click(); await p.waitForTimeout(600);
const openNow = await p.evaluate(() => [...document.querySelectorAll('button')]
  .filter((b) => (b.getAttribute('aria-label') || '').startsWith('Day '))
  .filter((b) => !b.disabled).length);
const gateOpens = openNow >= 12;
console.log('understanding the prerequisite opens the depth days:', gateOpens, `(${openNow} open)`);

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
if (!writeRendered) failures.push('the write prompt did not render');
if (writeRendered && !writeFiled) failures.push('writing was not filed under the prompt id');
if (!noStrayKey) failures.push('writing was filed under a positional key');
if (!parentOK) failures.push('the parent view could not resolve a write key');
if (!gateNames) failures.push('a closed depth day did not name what opens it');
if (!gateDuel) failures.push('a closed depth day offered no duel route');
if (!gateKind) failures.push('a closed depth day read as a punishment');
if (!gateOpens) failures.push('understanding the prerequisite did not open the depth days');
if (failures.length) { console.error('\nFAILED: ' + failures.join('; ')); process.exit(1); }
console.log('\nsmoke passed');
await b.close();
