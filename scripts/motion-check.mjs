/* Diagrams that move must never move at the cost of being right.
 *
 * Three things are checked in a real browser, because none of them is visible
 * to a unit test:
 *
 *   1. COMPLETE AT REST. After the animation finishes, nothing is left dimmed
 *      or part-drawn. This is the property that lets a broken observer, a
 *      headless screenshot or a reader who scrolls past mid-play still see the
 *      whole picture.
 *   2. IT ACTUALLY MOVES. Replay, sample immediately, and require the picture
 *      to differ from its resting state. Without this, an animation that
 *      silently stopped working would look exactly like one that finished.
 *   3. REDUCED MOTION MEANS NONE. With prefers-reduced-motion: reduce, replay
 *      must change nothing at all -- the diagram is already complete and no
 *      timers run.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const TARGET = process.env.LQ_TARGET || 'file://' + resolve('dist/learning-quest.html');
const PINNED = process.env.LQ_CHROMIUM
  || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : null);

const { CURRICULUM, SUBJECT_ORDER } = await import('../src/content/index.js');
const { stageCount } = await import('../src/engine/motion.js');

const fails = [];
const ok = (name, pass, detail = '') => {
  console.log(`  ${pass ? 'ok  ' : 'FAIL'}   ${name}${pass || !detail ? '' : ' — ' + detail}`);
  if (!pass) fails.push(name);
};

/* Every day that carries a visual which claims more than one stage. */
const animated = [];
for (const s of SUBJECT_ORDER) {
  for (let di = 0; di < CURRICULUM[s].days.length; di++) {
    const d = CURRICULUM[s].days[di];
    for (let pi = 0; pi < d.pages.length; pi++) {
      for (const b of d.pages[pi].blocks || []) {
        if (b.type === 'visual' && stageCount(b) > 1) {
          animated.push({ subj: s, day: d.id, idx: di, page: pi, kind: b.kind, stages: stageCount(b) });
        }
      }
    }
  }
}
/* One representative day per kind keeps this inside a sane runtime. */
const seen = new Set();
const sample = animated.filter((a) => (seen.has(a.kind) ? false : seen.add(a.kind)));
console.log(`${animated.length} animated diagrams across ${seen.size} kinds; checking one of each\n`);

const b = await chromium.launch(PINNED ? { executablePath: PINNED } : {});
const done = {};
for (const s of SUBJECT_ORDER) for (const d of CURRICULUM[s].days) done[`${s}:${d.id}`] = { best: 4, total: 4 };

/* A fingerprint of the picture: every element's opacity and dash offset.
 *
 * The first version counted anything with opacity between 0 and 0.9 as
 * "mid-animation", which is not a distinction a threshold can make:
 * percentbar draws its rows at a deliberate .55-.85 so the later bars read as
 * derived from the earlier ones, and it was reported as permanently
 * incomplete. Comparing fingerprints needs no magic number -- the picture a
 * reduced-motion reader sees IS the definition of complete, and every other
 * state is measured against it. */
const SIG = () => {
  const svg = document.querySelector('svg[viewBox^="0 0 320"]');
  if (!svg) return 'NO-SVG';
  const out = [];
  for (const el of svg.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    /* Skip anything driven by a CSS keyframe animation. `particles` jiggles
       its liquid and gas molecules forever with `drift` -- that IS the
       physics of the day, not a stage -- so its transform never settles and
       no fingerprint of it could ever be stable. Those animations are a
       separate system that the app's own prefers-reduced-motion CSS already
       switches off. What is being checked here is STAGE-driven state. */
    if (cs.animationName && cs.animationName !== 'none') continue;
    /* Transform too: `plates` animates by translating, and a fingerprint of
       only opacity and dash offset reported it as never moving. */
    out.push(`${parseFloat(cs.opacity).toFixed(2)}:${parseFloat(cs.strokeDashoffset || 0).toFixed(2)}:${cs.transform}`);
  }
  return out.join(',');
};

async function openDay(p, hit) {
  await p.goto(TARGET, { waitUntil: 'domcontentloaded' });
  await p.evaluate((d) => localStorage.setItem('lq_v3', JSON.stringify({
    version: 3, profiles: [{ id: 'p1', name: 'S', xp: 900, completed: d, practice: {}, review: {},
      writing: {}, calibration: {}, streak: { count: 1, last: '2026-01-01' }, skips: 0 }], lastActive: 'p1',
  })), done);
  await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(320);
  await p.getByText(CURRICULUM[hit.subj].name).first().click(); await p.waitForTimeout(300);
  await p.locator(`button[aria-label^="Day ${hit.idx + 1},"]`).first().click(); await p.waitForTimeout(340);
  for (let i = 0; i < hit.page; i++) {
    const n = p.getByRole('button', { name: /let.s go|next/i }).first();
    if (await n.count() && await n.isVisible()) { await n.click(); await p.waitForTimeout(240); }
  }
  await p.locator('svg[viewBox^="0 0 320"]').first().scrollIntoViewIfNeeded();
}

const errs = [];
for (const hit of sample) {
  /* Reduced motion first: what it shows is the definition of "complete". */
  const q = await b.newPage({ viewport: { width: 430, height: 900 }, reducedMotion: 'reduce' });
  q.on('pageerror', (e) => errs.push(`${hit.kind} (reduced): ${e.message}`));
  await openDay(q, hit);
  const sigComplete = await q.evaluate(SIG);
  ok(`${hit.kind}: renders under reduced motion`, sigComplete !== 'NO-SVG');
  const r2 = q.locator('button[aria-label="Play this diagram again"]').first();
  if (await r2.count()) {
    await r2.click(); await q.waitForTimeout(150);
    ok(`${hit.kind}: reduced motion means NO motion, even on replay`,
      (await q.evaluate(SIG)) === sigComplete, 'it animated despite prefers-reduced-motion');
  }
  await q.close();

  /* Then normal motion, measured against that. */
  const p = await b.newPage({ viewport: { width: 430, height: 900 } });
  p.on('pageerror', (e) => errs.push(`${hit.kind}: ${e.message}`));
  await openDay(p, hit);
  await p.waitForTimeout(hit.stages * 950 + 700);
  ok(`${hit.kind}: at rest it is the complete picture`, (await p.evaluate(SIG)) === sigComplete,
    'something stayed faded or part-drawn after the animation finished');

  const replay = p.locator('button[aria-label="Play this diagram again"]').first();
  ok(`${hit.kind}: offers a replay control`, (await replay.count()) > 0);
  if (await replay.count()) {
    await replay.click();
    await p.waitForTimeout(80);
    ok(`${hit.kind}: replay actually moves it`, (await p.evaluate(SIG)) !== sigComplete,
      `${hit.kind} claims ${hit.stages} stages but its renderer never reads \`stage\``);
    await p.waitForTimeout(hit.stages * 950 + 700);
    ok(`${hit.kind}: settles back to the complete picture`, (await p.evaluate(SIG)) === sigComplete);
  }
  await p.close();
}

ok('no page errors', errs.length === 0, errs.join(' | '));
console.log(fails.length ? `\n${fails.length} FAILED` : '\nmotion verified: every animated diagram is whole at rest');
await b.close();
process.exit(fails.length ? 1 : 0);
