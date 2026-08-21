import { chromium } from 'playwright';
import { resolve } from 'node:path';

/* Runs against the single-file build, so no server is needed.
   Build it first:  npm run build && node scripts/build-singlefile.mjs  */
const TARGET = process.env.LQ_TARGET
  || 'file://' + resolve('dist/learning-quest.html');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));

// Seed a profile with math day 1 complete + a legacy-shaped profile missing `completed`
await p.goto(TARGET, { waitUntil: 'domcontentloaded' });
await p.evaluate(() => {
  localStorage.clear();
  localStorage.setItem('lq_v3', JSON.stringify({
    version: 3,
    profiles: [
      { id: 'p1', name: 'Seeded', xp: 70, completed: { 'math:m1': { best: 5, total: 5 }, 'bio:b1': { best: 4, total: 4 } }, practice: {}, streak: { count: 3, last: '2026-08-20' } },
      { id: 'p2', name: 'Malformed' },   // missing completed/practice/streak on purpose
    ],
    lastActive: 'p1',
  }));
});
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
const t = () => p.evaluate(() => document.body.innerText);
console.log('dash:', (await t()).split('\n').filter(Boolean).slice(0,4).join(' | '));

await p.getByText('Mathematics').first().click(); await p.waitForTimeout(500);
const rows = await p.evaluate(() => [...document.querySelectorAll('div')]
  .filter(d => d.style.cursor).slice(0,4).map(d => ({ c: d.style.cursor, t: d.innerText.slice(0,26).replace(/\n/g,' ') })));
console.log('day rows:', JSON.stringify(rows));

// malformed profile must not crash the app (eval bug #11)
await p.evaluate(() => { const d = JSON.parse(localStorage.getItem('lq_v3')); d.lastActive = 'p2'; localStorage.setItem('lq_v3', JSON.stringify(d)); });
await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
const after = await t();
console.log('malformed profile renders:', after.length > 40 ? 'OK — ' + after.split('\n').filter(Boolean)[1] : 'BLANK/CRASH');
console.log('pageerrors:', errs.length ? errs : 'none');
await b.close();
