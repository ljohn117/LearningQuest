/* Do the interactive blocks actually work when touched?
 *
 *   LQ_SHOT_DIR=<dir> npm run interactive-check      (after a build)
 *
 * A slider that renders but whose outputs never change, or a sequence that
 * can never reach its solved state, passes every unit test and teaches
 * nothing. This drags a real slider and checks the numbers move, then sorts a
 * real sequence into order and checks it says so.
 *
 * It also writes slider.png and order.png, because layout is not correctness:
 * the first version of the sequence row let the arrow buttons stretch and
 * squeezed every label to one word per line. Every assertion passed. Only the
 * screenshot showed it.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const { CURRICULUM, SUBJECT_ORDER } = await import('../src/content/index.js');
const { INTERACTIVE } = await import('../src/content/interactive.js');
const keys = SUBJECT_ORDER.flatMap(s => CURRICULUM[s].days.map(d => s + ':' + d.id));
const b = await chromium.launch(existsSync('/opt/pw-browsers/chromium') ? { executablePath:'/opt/pw-browsers/chromium' } : {});
const p = await b.newPage({ viewport:{width:430,height:1000} });
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const fails=[]; const ok=(n,c,d='')=>{console.log((c?'  ok   ':'  FAIL ')+n+(c?'':' — '+d)); if(!c)fails.push(n);};
const T='file://'+resolve('dist/learning-quest.html');
const out = process.env.LQ_SHOT_DIR || './';
await p.goto(T,{waitUntil:'domcontentloaded'});
await p.evaluate(ks=>{const c={};for(const k of ks)c[k]={best:4,total:5};localStorage.clear();
  localStorage.setItem('lq_v3',JSON.stringify({version:3,profiles:[{id:'v',name:'V',xp:9,completed:c,practice:{},review:{},writing:{},calibration:{},streak:{count:1,last:'2026-09-13'},skips:0}],lastActive:'v'}));},keys);

async function openDay(lane,label,page){
  await p.goto(T,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(420);
  await p.getByText(lane).first().click(); await p.waitForTimeout(320);
  await p.locator('button[aria-label^="Day "]').filter({hasText:new RegExp(label,'i')}).first().click(); await p.waitForTimeout(380);
  for(let i=0;i<page;i++){ await p.getByRole('button',{name:/let.s go|next/i}).first().click(); await p.waitForTimeout(300); }
}

// --- SLIDER: drag it and prove the outputs actually change
await openDay('Mathematics','Why Size Changes',1);
const sl = p.locator('input[type=range]').first();
ok('slider renders', await sl.count() > 0);
const before = await p.evaluate(()=>document.body.innerText);
await sl.fill('4'); await p.waitForTimeout(250);
const after = await p.evaluate(()=>document.body.innerText);
ok('moving the slider changes the outputs', before !== after);
ok('it shows area and volume', /area of one face/i.test(after) && /volume/i.test(after));
ok('volume at side 4 is 64', /\b64\b/.test(after), after.slice(after.indexOf('SIDE LENGTH'), after.indexOf('SIDE LENGTH')+220));
await p.screenshot({ path: out+'slider.png', clip: await (async()=>{const bx=await p.locator('input[type=range]').first().boundingBox();return {x:8,y:Math.max(0,bx.y-92),width:414,height:250};})() });

// --- ORDER: reorder it and prove it reports solved
await openDay('Fossils','Reading Rock Layers',1);
const ups = p.locator('button[aria-label^="Move "]');
ok('sequence renders with move buttons', await ups.count() > 0);
const bodyO = await p.evaluate(()=>document.body.innerText);
ok('sequence shows the task', /order they happened/i.test(bodyO));
ok('an unsolved sequence says nothing about being wrong', !/(wrong|incorrect|try again|not quite)/i.test(bodyO));
/* Sort it properly. Clicking every "up" button rotates the list rather than
   sorting it — the first version of this did exactly that and never solved.
   The correct order is known from the content, so drive each item up into
   its target slot. */
const want = INTERACTIVE.f3[0].items;
const rowTexts = async () => p.evaluate(() =>
  [...document.querySelectorAll('button[aria-label^="Move "]')]
    .map((b) => b.getAttribute('aria-label').replace(/^Move "/, '').replace(/" (up|down)$/, ''))
    .filter((v, i, a) => a.indexOf(v) === i));
for (let target = 0; target < want.length; target++) {
  for (let guard = 0; guard < 12; guard++) {
    const rows = await rowTexts();
    const at = rows.indexOf(want[target]);
    if (at <= target) break;
    await p.getByRole('button', { name: `Move "${want[target]}" up`, exact: true }).click();
    await p.waitForTimeout(70);
  }
}
const solvedText = await p.evaluate(()=>document.body.innerText);
ok('it can be solved and says so', /that is the order/i.test(solvedText), solvedText.slice(0,160));
await p.screenshot({ path: out+'order.png', clip: {x:8,y:180,width:414,height:430} });

ok('no page errors', errs.length===0, errs.join(' | '));
await b.close();
console.log(fails.length?`\n${fails.length} FAILED`:'\ninteractive blocks verified');
process.exit(fails.length?1:0);
