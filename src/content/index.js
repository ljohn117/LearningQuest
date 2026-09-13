import { CORE } from './core.js';
import { EXPLORE } from './explore.js';
import { RESTORED } from './restored.js';
import { CONNECTIONS } from './connections.js';
import { CHEMISTRY } from './chemistry.js';
import { TEARDOWNS } from './teardowns.js';
import { MATH_EXTRA } from './math-extra.js';
import { MATH_ADVANCED } from './math-advanced.js';
import { CHEM_DEPTH, PHYSICS_DEPTH, BIO_DEPTH } from './science-depth.js';
import { ELA_EXTRA, BIO_EXTRA } from './depth.js';
import { GOV_EXTRA, FOSSILS_EXTRA } from './depth-civics.js';
import { CHECKPOINTS } from './checkpoints.js';
import { SPIRAL, WRITING, SCALE } from './spiral.js';
import { EXPLAIN } from './explain.js';
import { VISUALS } from './visuals.js';
import { INTERACTIVE } from './interactive.js';

/* Merged curriculum. Subject keys are distinct across all sources and every
   day id is unique, so the merge cannot collide.
   Progress is keyed `subjectId:dayId` — NEVER renumber or reuse a day id. */
const merged = { ...CORE, ...EXPLORE, ...RESTORED, ...CHEMISTRY, ...CONNECTIONS, ...TEARDOWNS };

/* Depth days append to lanes that already exist, so ordering continues from
   the last day already there rather than renumbering anything. */
const append = (subj, days) => {
  if (!merged[subj]) return;
  merged[subj] = { ...merged[subj], days: [...merged[subj].days, ...days] };
};
append('math', MATH_EXTRA);
append('ela', ELA_EXTRA);
append('bio', BIO_EXTRA);
append('gov', GOV_EXTRA);
append('fossils', FOSSILS_EXTRA);
for (const [subj, days] of Object.entries(CHECKPOINTS)) append(subj, days);

/* Algebra II and precalculus, appended AFTER the checkpoints so the lane ends
   ...m19, mr3, m20...m26, mr4 — each block of days followed by its review.
   Appending only: no existing id moves, and nothing above is renumbered. */
append('math', MATH_ADVANCED);

/* Science depth. These are the first days that declare `readiness` — they
   open on demonstrated understanding of a named earlier day, not on mere
   completion. Appended only; nothing above them moves. */
append('chem', CHEM_DEPTH);
append('physics', PHYSICS_DEPTH);
append('bio', BIO_DEPTH);

/* Append spiral callbacks to the days that had none. Kept out of the content
   files so the additions stay reviewable in one place and the prototype prose
   is left exactly as written. */
for (const lane of Object.values(merged)) {
  lane.days = lane.days.map((day) => {
    const note = SPIRAL[day.id];
    /* A day takes its writing prompt from exactly one source. WRITING holds
       the four original English-lane prompts; EXPLAIN holds the rest. They
       must never both claim a day — two write blocks on one page is fine
       structurally but muddies what he is being asked, and scripts/test.mjs
       fails the build if the key sets ever overlap. */
    const write = WRITING[day.id] || EXPLAIN[day.id];
    const awe = SCALE[day.id];
    if (!note && !write && !awe) return day;
    const extra = [
      ...(note ? [{ type: 'callout', text: note }] : []),
      ...(awe ? [{ type: 'scale', ...awe }] : []),
      ...(write ? [{ type: 'write', ...write }] : []),
    ];
    const pages = day.pages.map((p, i) =>
      i === day.pages.length - 1 ? { ...p, blocks: [...p.blocks, ...extra] } : p);
    return { ...day, pages };
  });
}

/* Diagrams land on the page that introduces the idea, not at the end of the
   day — a number line appended after the closing callout explains nothing.
   Appending a block is safe: visuals carry no progress key, quiz arrays are
   untouched, and write prompts are filed by id rather than by position. */
for (const lane of Object.values(merged)) {
  lane.days = lane.days.map((day) => {
    const adds = VISUALS[day.id];
    if (!adds) return day;
    const pages = day.pages.map((p, i) => {
      const mine = adds.filter((a) => (a.page ?? 0) === i);
      if (!mine.length) return p;
      return { ...p, blocks: [...p.blocks, ...mine.map(({ page, ...spec }) => ({ type: 'visual', ...spec }))] };
    });
    return { ...day, pages };
  });
}

/* Sliders and sequences, onto the page that introduces the relationship or
   the order they make manipulable. Same safety as visuals: neither block
   carries a progress key, quiz arrays are untouched, and write prompts are
   filed by id rather than position. */
for (const lane of Object.values(merged)) {
  lane.days = lane.days.map((day) => {
    const adds = INTERACTIVE[day.id];
    if (!adds) return day;
    const pages = day.pages.map((p, i) => {
      const mine = adds.filter((a) => (a.page ?? 0) === i);
      if (!mine.length) return p;
      return { ...p, blocks: [...p.blocks, ...mine.map(({ page, ...spec }) => ({ ...spec }))] };
    });
    return { ...day, pages };
  });
}

export const CURRICULUM = merged;

export const SUBJECT_ORDER = [
  'math', 'cs', 'physics', 'logic', 'earth',
  'bio', 'chem', 'ela', 'biz', 'gov', 'fossils',
  'connect', 'teardown',
];
