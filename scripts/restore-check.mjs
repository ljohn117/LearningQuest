/* Does his progress actually survive a move between origins?
 *
 *   node scripts/restore-check.mjs      (after a build)
 *
 * localStorage is scoped per ORIGIN. A downloaded file, a hosted page and a
 * published artifact are three separate stores that cannot see each other, so
 * Back up -> Restore is the ONLY path his history has between them. That makes
 * this path the single most consequential thing in the app: if it silently
 * drops a field, the loss is total and there is no second copy anywhere,
 * because nothing ever leaves his device.
 *
 * So this drives the real buttons in a real browser — not the store API —
 * and checks every progress field individually rather than trusting that
 * "it restored". Written after store.js gained a writing-key migration that
 * sits directly in the restore path.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const b = await chromium.launch(existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {});
const fails = [];
const ok = (n,c,d='') => { console.log((c?'  ok   ':'  FAIL ')+n+(c?'':' — '+d)); if(!c) fails.push(n); };
const TARGET = 'file://' + resolve('dist/learning-quest.html');

// ---- SOURCE origin: a realistic amount of history, as if he had been working in the file
const src = await b.newPage();
const srcErrs=[]; src.on('pageerror',e=>srcErrs.push(e.message));
await src.goto(TARGET, { waitUntil: 'domcontentloaded' });
await src.evaluate(() => {
  localStorage.clear();
  localStorage.setItem('lq_v3', JSON.stringify({ version:3, profiles:[{
    id:'kid', name:'Explorer', xp:1240,
    completed:{ 'math:m1':{best:5,total:5}, 'math:m2':{best:4,total:5}, 'math:m3':{best:5,total:5},
                'cs:c1':{best:4,total:4}, 'bio:bio1':{best:4,total:4}, 'logic:lg1':{best:3,total:4} },
    practice:{ dr1:{best:6,runs:3}, dr3:{best:4,runs:1} },
    review:{ 'math:m1:0':{ wrong:1, at:'2026-09-01' }, 'drill:dr1':{ streak:4, at:'2026-09-02' } },
    /* legacy positional writing key — the shape an older backup carries */
    writing:{ 'ela:ela5:3:2':{ text:'half-life halves a pile each time', checked:[0,1], at:'2026-08-15' } },
    calibration:{ 'math:m2':'just right' },
    streak:{ count:11, last:'2026-09-11' }, skips:1,
  }], lastActive:'kid' }));
});
await src.reload({ waitUntil:'domcontentloaded' }); await src.waitForTimeout(600);

// Press the real Back up button and read the real payload out of the real textarea.
await src.getByRole('button',{name:'Back up'}).click(); await src.waitForTimeout(400);
const panelText = await src.evaluate(() => document.body.innerText);
ok('Back up reports the finished-day count', /6 finished days found/.test(panelText), panelText.slice(0,200));
const payload = await src.locator('textarea').first().inputValue();
ok('payload is a Learning Quest backup', JSON.parse(payload).lqBackup === 1);

// ---- DESTINATION origin: a different origin, standing in for the artifact
const dest = await b.newPage();
const destErrs=[]; dest.on('pageerror',e=>destErrs.push(e.message));
await dest.goto(TARGET, { waitUntil:'domcontentloaded' });
await dest.evaluate(() => localStorage.clear());
await dest.reload({ waitUntil:'domcontentloaded' }); await dest.waitForTimeout(700);

// A fresh store must not already look like his.
const before = await dest.evaluate(() => localStorage.getItem('lq_v3'));
ok('destination starts empty', !before || !/Explorer/.test(before));

// Get to a dashboard with a Restore button (fresh install shows onboarding first).
/* A fresh store lands on onboarding, which gates its button on a name. */
for (let i=0;i<8;i++){
  if (await dest.getByRole('button',{name:'Restore'}).count()) break;
  const inp = dest.locator('input[type=text], input:not([type])').first();
  if (await inp.count() && await inp.isVisible()) { await inp.fill('Explorer'); await dest.waitForTimeout(200); }
  const btns = dest.locator('button:not([disabled])');
  if (await btns.count()) { await btns.first().click(); await dest.waitForTimeout(500); } else break;
}
const hasRestore = await dest.getByRole('button',{name:'Restore'}).count() > 0;
ok('Restore is reachable', hasRestore, (await dest.evaluate(()=>document.body.innerText)).slice(0,200));

if (hasRestore) {
  await dest.getByRole('button',{name:'Restore'}).click(); await dest.waitForTimeout(350);
  await dest.locator('textarea').first().fill(payload);
  await dest.waitForTimeout(500);
  const preview = await dest.evaluate(() => document.body.innerText);
  ok('it says what it found BEFORE writing', /Found/.test(preview) && /Explorer/.test(preview) && /6 finished day/.test(preview), preview.slice(0,300));
  ok('it names the cost out loud', /Restoring replaces/.test(preview));

  const restoreBtns = dest.getByRole('button',{name:'Restore'});
  await restoreBtns.last().click(); await dest.waitForTimeout(900);

  const p = await dest.evaluate(() => JSON.parse(localStorage.getItem('lq_v3')).profiles[0]);
  ok('xp carried over', p.xp === 1240, String(p.xp));
  ok('all 6 finished days carried over', Object.keys(p.completed).length === 6, JSON.stringify(Object.keys(p.completed)));
  ok('duel practice carried over', !!p.practice?.dr1 && !!p.practice?.dr3);
  ok('review history carried over', !!p.review?.['math:m1:0'] && !!p.review?.['drill:dr1']);
  ok('streak carried over', p.streak?.count === 11, JSON.stringify(p.streak));
  ok('skips carried over', p.skips === 1, String(p.skips));
  ok('calibration carried over', p.calibration?.['math:m2'] === 'just right');
  ok('his writing carried over', p.writing?.['ela:ela5:3:2']?.text === 'half-life halves a pile each time', JSON.stringify(p.writing));
  const shown = await dest.evaluate(() => document.body.innerText);
  /* A count, not a fraction — see meter.js. This used to derive the catalogue
     total so that appending days could not read as progress loss; the meter
     fix removed the denominator from his screen entirely. */
  ok('dashboard reflects the restore', /Explorer/.test(shown) && /\b6 missions complete\b/.test(shown),
     `expected "6 missions complete" — ` + shown.split('\n').filter(Boolean).slice(0,4).join(' | '));
}
ok('no page errors on either side', srcErrs.length===0 && destErrs.length===0, [...srcErrs,...destErrs].join(' | '));
await b.close();
console.log(fails.length ? `\n${fails.length} FAILED` : '\nrestore path verified end to end');
process.exit(fails.length?1:0);
