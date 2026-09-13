/* Does a real saved profile survive this build?
 *
 *   npm run profile-check -- /path/to/backup.json
 *
 * The standing constraint on this project is that his progress must not be
 * lost. Unit tests check the store in isolation; this loads an actual exported
 * backup into the built app in a real browser and asserts every field he would
 * notice is still there afterwards — xp, finished days and their scores,
 * streak, skip days, calibration, recall history, name.
 *
 * Run it before shipping anything that touches content, storage or the merge.
 * Pass a backup exported with the Back up button. Keep real backups OUT of this
 * repo — it is public. Use the scratchpad.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
const backup = JSON.parse(readFileSync(process.argv[2],'utf8'));
const b = await chromium.launch(existsSync('/opt/pw-browsers/chromium') ? { executablePath:'/opt/pw-browsers/chromium' } : {});
const p = await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const fails=[]; const ok=(n,c,d='')=>{console.log((c?'  ok   ':'  FAIL ')+n+(c?'':' — '+d)); if(!c)fails.push(n);};
await p.goto('file://'+resolve('dist/learning-quest.html'),{waitUntil:'domcontentloaded'});
const src = backup.data.profiles[0];
await p.evaluate((d)=>{localStorage.clear();localStorage.setItem('lq_v3',JSON.stringify(d));}, backup.data);
await p.reload({waitUntil:'domcontentloaded'}); await p.waitForTimeout(900);

const after = await p.evaluate(()=>JSON.parse(localStorage.getItem('lq_v3')).profiles[0]);
ok('XP unchanged',           after.xp === src.xp, `${src.xp} -> ${after.xp}`);
ok('every finished day kept', Object.keys(after.completed).length === Object.keys(src.completed).length,
   `${Object.keys(src.completed).length} -> ${Object.keys(after.completed).length}`);
ok('scores unchanged',       Object.entries(src.completed).every(([k,v])=>after.completed[k]?.best===v.best && after.completed[k]?.total===v.total));
ok('streak kept',            after.streak.count === src.streak.count && after.streak.last === src.streak.last);
ok('skip days kept',         after.skips === src.skips);
ok('calibration kept',       Object.keys(after.calibration).length === Object.keys(src.calibration).length);
ok('recall history kept',    Object.keys(after.review).length === Object.keys(src.review).length);
ok('his name kept',          after.name === src.name);

const dash = await p.evaluate(()=>document.body.innerText);
ok('dashboard shows his real total', /35 of 131/.test(dash), dash.split('\n').filter(Boolean).slice(0,4).join(' | '));

/* The days that got a diagram must still be open and still scored as before. */
for (const [lane,label,key] of [['Mathematics','Inequalities','math:m12'],['Logic','And, Or, Not','logic:lg2'],['Chemistry','Two Kinds','chem:ch1']]) {
  ok(`${key} still recorded`, !!after.completed[key], 'a day he finished vanished');
}
ok('no page errors', errs.length===0, errs.join(' | '));
await b.close();
console.log(fails.length?`\n${fails.length} FAILED`:'\nhis progress survives the new build intact');
process.exit(fails.length?1:0);
