/* Structural checks on the curriculum. Run after any content edit. */
import { CURRICULUM, SUBJECT_ORDER } from '../src/content/index.js';

let errors = 0, days = 0, questions = 0;
const seen = new Set();
const fail = (m) => { console.log('  FAIL ' + m); errors++; };

for (const subj of SUBJECT_ORDER) {
  const s = CURRICULUM[subj];
  if (!s) { fail(`SUBJECT_ORDER lists "${subj}" but it has no content`); continue; }
  if (!s.name || !s.icon || !s.accent) fail(`${subj}: missing name/icon/accent`);
  for (const d of s.days) {
    days++;
    if (seen.has(d.id)) fail(`duplicate day id "${d.id}"`);
    seen.add(d.id);
    if (!d.title || !d.tag || !d.subtitle) fail(`${d.id}: missing title/tag/subtitle`);
    if (!d.pages?.length) fail(`${d.id}: no pages`);
    if (!d.recap?.length) fail(`${d.id}: no recap`);
    for (const p of d.pages || []) {
      if (!p.title) fail(`${d.id}: page missing title`);
      for (const b of p.blocks || []) {
        if (!b.type) fail(`${d.id}: block missing type`);
      }
    }
    for (const [i, q] of (d.quiz || []).entries()) {
      questions++;
      const at = `${d.id} q${i + 1}`;
      if (!q.prompt) fail(`${at}: no prompt`);
      if (!q.hint) fail(`${at}: no hint — every question must have one`);
      if (!q.explain) fail(`${at}: no explanation`);
      if (q.type === 'mc') {
        if (!Array.isArray(q.choices) || q.choices.length < 2) fail(`${at}: bad choices`);
        else if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.choices.length) fail(`${at}: answer index out of range`);
        else if (new Set(q.choices).size !== q.choices.length) fail(`${at}: duplicate choice text`);
      } else if (q.type === 'tf') {
        if (typeof q.answer !== 'boolean') fail(`${at}: tf answer must be boolean`);
      } else if (q.type === 'numeric') {
        if (typeof q.answer !== 'number' || !Number.isFinite(q.answer)) fail(`${at}: numeric answer must be a finite number`);
      } else fail(`${at}: unknown type "${q.type}"`);
    }
  }
}

// visual kinds must all exist in the Visual component
const visualSrc = (await import('node:fs')).readFileSync('src/engine/Visual.jsx', 'utf8');
const implemented = new Set([...visualSrc.matchAll(/v\.kind === '(\w+)'/g)].map((m) => m[1]));
for (const subj of SUBJECT_ORDER) {
  for (const d of CURRICULUM[subj]?.days || []) {
    for (const p of d.pages) for (const b of p.blocks) {
      if (b.type === 'visual' && !implemented.has(b.kind)) fail(`${d.id}: visual "${b.kind}" has no implementation — renders blank`);
    }
  }
}

console.log(`\n${SUBJECT_ORDER.length} lanes · ${days} days · ${questions} questions`);
console.log(errors ? `${errors} PROBLEM(S)` : 'all checks passed');
process.exit(errors ? 1 : 0);
