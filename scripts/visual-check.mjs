/* Do the diagrams actually draw?
 *
 *   npm run visual-check      (after a build)
 *
 * A visual block with an unknown `kind`, or a renderer that throws on its
 * props, produces an empty box. No error, no warning, no failing unit test —
 * the page just quietly stops teaching. This opens each day that carries a
 * diagram in a real browser and counts the shapes actually painted.
 *
 * It cannot tell you the diagram is CORRECT. For that, screenshot it and look:
 * npm run screenshot-visuals. That is how the physical-change diagram was
 * caught drawing "before" and "after" identically under a caption claiming
 * they differed — every test passed.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const b = await chromium.launch(existsSync('/opt/pw-browsers/chromium') ? { executablePath:'/opt/pw-browsers/chromium' } : {});
const p = await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const fails=[]; const ok=(n,c,d='')=>{console.log((c?'  ok   ':'  FAIL ')+n+(c?'':' — '+d)); if(!c)fails.push(n);};
const TARGET='file://'+resolve('dist/learning-quest.html');

// Seed every target day as complete so each is reachable, then open each one.
const targets=[['math','m12','Inequalities'],['logic','lg1','Statements'],['logic','lg2','And, Or, Not'],
  ['math','m13','Functions'],['gov','g3','Checks'],['math','m15','Percent Change'],
  ['math','m2','Proportions'],['chem','ch1','Two Kinds']];
await p.goto(TARGET,{waitUntil:'domcontentloaded'});
/* Mark every day complete so nothing is locked — this test is about whether
   the diagrams draw, not about the unlock cascade. */
const { CURRICULUM, SUBJECT_ORDER } = await import('../src/content/index.js');
const allKeys = SUBJECT_ORDER.flatMap((s) => CURRICULUM[s].days.map((d) => s + ':' + d.id));
await p.evaluate((keys)=>{ const completed={};
  for(const k of keys) completed[k]={best:2,total:5};
  localStorage.clear();
  localStorage.setItem('lq_v3', JSON.stringify({version:3,profiles:[{id:'v',name:'V',xp:500,completed,practice:{},review:{},writing:{},calibration:{},streak:{count:1,last:'2026-09-12'},skips:0}],lastActive:'v'}));
}, allKeys);

for (const [subj,id,label] of targets) {
  await p.goto(TARGET,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(450);
  // navigate: lane -> the day
  const laneName={math:'Mathematics',logic:'Logic',gov:'Government',chem:'Chemistry'}[subj];
  await p.getByText(laneName).first().click(); await p.waitForTimeout(350);
  const btn = p.locator('button[aria-label^="Day "]').filter({ hasText: new RegExp(label.split(',')[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i') }).first();
  if (!(await btn.count())) { ok(`${subj}:${id} reachable`, false, 'no day card matched '+label); continue; }
  await btn.click(); await p.waitForTimeout(400);
  // walk every page, collecting svg shape counts
  let found=0, pages=0;
  for (let i=0;i<7;i++){
    pages++;
    const n = await p.evaluate(()=>{
      const svgs=[...document.querySelectorAll('svg')];
      return svgs.map(s=>s.querySelectorAll('rect,circle,line,text,polygon,ellipse,path').length).reduce((a,c)=>a+c,0);
    });
    if (n>6) found=Math.max(found,n);
    const next=p.getByRole('button',{name:/let.s go|next/i}).first();
    if (!(await next.count()) || !(await next.isVisible())) break;
    await next.click(); await p.waitForTimeout(260);
  }
  ok(`${subj}:${id} draws a real diagram`, found>6, `richest svg had ${found} shapes across ${pages} pages`);
}
ok('no page errors', errs.length===0, errs.join(' | '));
await b.close();
console.log(fails.length?`\n${fails.length} FAILED`:'\nall diagrams render');
process.exit(fails.length?1:0);
