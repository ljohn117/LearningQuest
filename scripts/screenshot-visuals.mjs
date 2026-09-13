/* Screenshot each diagram so a human (or a model) can LOOK at it.
 *
 *   LQ_SHOT_DIR=/some/scratch/dir npm run screenshot-visuals
 *
 * Rendering is not the same as being right. A diagram can paint every shape it
 * was asked to and still teach the wrong thing — the first physical-change
 * diagram drew "before" and "after" identically beneath a caption saying they
 * differed, and passed every automated check. The only way that gets caught is
 * by looking at it.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const b = await chromium.launch(existsSync('/opt/pw-browsers/chromium') ? { executablePath:'/opt/pw-browsers/chromium' } : {});
const p = await b.newPage({ viewport:{width:430,height:900} });
const TARGET='file://'+resolve('dist/learning-quest.html');
const { CURRICULUM, SUBJECT_ORDER } = await import('../src/content/index.js');
const keys = SUBJECT_ORDER.flatMap((s) => CURRICULUM[s].days.map((d) => s + ':' + d.id));
await p.goto(TARGET,{waitUntil:'domcontentloaded'});
await p.evaluate((ks)=>{const completed={};for(const k of ks)completed[k]={best:2,total:5};
  localStorage.clear();localStorage.setItem('lq_v3',JSON.stringify({version:3,profiles:[{id:'v',name:'V',xp:500,completed,practice:{},review:{},writing:{},calibration:{},streak:{count:1,last:'2026-09-12'},skips:0}],lastActive:'v'}));},keys);
const shots=[['Mathematics','Inequalities','m12-numberline',0],['Logic','And, Or, Not','lg2-truthtable',1],
  ['Mathematics','Functions','m13-mapping',1],['Mathematics','Percent Change','m15-percentbar',1],
  ['Chemistry','Two Kinds','ch1-rearrange',0],['Government','Checks','g3-grid',1]];
const out = process.env.LQ_SHOT_DIR || './';
for (const [lane,label,name,page] of shots){
  await p.goto(TARGET,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(400);
  await p.getByText(lane).first().click(); await p.waitForTimeout(300);
  await p.locator('button[aria-label^="Day "]').filter({hasText:new RegExp(label.split(',')[0],'i')}).first().click();
  await p.waitForTimeout(350);
  for(let i=0;i<page;i++){ await p.getByRole('button',{name:/let.s go|next/i}).first().click(); await p.waitForTimeout(300); }
  if(page===0){ /* stay on page 0 */ }
  /* the back-arrow icon is also an <svg>; take the richest one on the page */
  const idx = await p.evaluate(()=>{ const svgs=[...document.querySelectorAll('svg')];
    let best=-1,n=-1; svgs.forEach((s,i)=>{const c=s.querySelectorAll('*').length; if(c>n){n=c;best=i;}});
    return best; });
  if(idx>=0) await p.locator('svg').nth(idx).screenshot({path:out+name+'.png'});
  else console.log('no svg for',name);
}
await b.close(); console.log('shots written');
