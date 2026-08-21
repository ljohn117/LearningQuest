/* Content quality audit.
 *
 * validate-content.mjs checks structure — ids, required fields, answer ranges.
 * This checks whether the writing actually follows the rules the project set
 * for itself:
 *
 *   - reading level inside the middle-school band
 *   - one new idea per page
 *   - every day connecting back to a lane already finished
 *   - no reference to a lane that does not exist (the original content had
 *     thirteen of these, pointing at lanes that had been removed)
 *   - hints that guide rather than hand over the answer
 *   - no duplicate questions across days
 *
 * None of this can check whether a claim is factually true. That still needs
 * a human read, and it is the one gap this script does not close.
 *
 *   node scripts/audit-content.mjs [--verbose]
 */
import { CURRICULUM, SUBJECT_ORDER } from '../src/content/index.js';

const verbose = process.argv.includes('--verbose');
const warn = [];
const flag = (m) => warn.push(m);

/* ---- readability -------------------------------------------------------- */
const syllables = (w) => {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  return (w.match(/[aeiouy]{1,2}/g) || ['x']).length;
};
function fleschKincaid(text) {
  const sentences = (text.match(/[.!?]+/g) || ['.']).length;
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  const sylls = words.reduce((n, w) => n + syllables(w), 0);
  return 0.39 * (words.length / sentences) + 11.8 * (sylls / words.length) - 15.59;
}

const prose = (day) => day.pages.flatMap((p) => p.blocks
  .map((b) => b.text || b.def || '')).filter(Boolean).join(' ');

/* ---- per-lane pass ------------------------------------------------------ */
const laneNames = SUBJECT_ORDER.map((s) => CURRICULUM[s]?.name).filter(Boolean);
const seenPrompts = new Map();
const rows = [];

for (const subj of SUBJECT_ORDER) {
  const lane = CURRICULUM[subj];
  if (!lane) continue;
  let grades = [], noCallback = 0, multiIdea = 0, weakHints = 0;

  for (const day of lane.days) {
    const text = prose(day);
    const g = fleschKincaid(text);
    if (g !== null) grades.push(g);

    // one new idea per page: more than one `concept` block is a proxy for two
    for (const page of day.pages) {
      const concepts = page.blocks.filter((b) => b.type === 'concept').length;
      if (concepts > 1) {
        multiIdea++;
        if (verbose) flag(`${day.id} "${page.title}": ${concepts} concept blocks on one page`);
      }
    }

    // does the day connect back to another lane?
    const mentionsOtherLane = laneNames.some((n) =>
      n !== lane.name && text.includes(n.split(' ')[0]));
    const hasCallbackPage = day.pages.some((p) => /where you have seen|seen this before|connect/i.test(p.title));
    // a day declaring cross-lane prerequisites IS a connection by construction
    const isConnector = (day.requires || []).some((k) => !k.startsWith(subj + ':'));
    if (!mentionsOtherLane && !hasCallbackPage && !isConnector) {
      noCallback++;
      if (verbose) flag(`${day.id} "${day.title}": no cross-lane callback`);
    }

    // references to a lane that does not exist
    // lane names can be multiple words ("Computer Science", "Earth & Space")
    for (const m of text.matchAll(/\b((?:[A-Z][a-z]+ )*[A-Z][a-z]+(?: & [A-Z][a-z]+)?) lane\b/g)) {
      const named = m[1].replace(/^(?:The|Your|A|An|This|That|Our)\s+/, '');
      if (!laneNames.some((n) => n.startsWith(named) || named.startsWith(n.split(' ')[0]))) {
        flag(`${day.id}: references "${named} lane", which does not exist`);
      }
    }

    /* A scale block is labelled "not on the quiz" on screen. That is a
       promise to the reader, so it is checked rather than trusted: the
       block's figure must not appear anywhere in the day's questions. */
    const scaleValues = day.pages.flatMap((p) => p.blocks
      .filter((b) => b.type === 'scale').map((b) => String(b.value)));
    const quizText = day.quiz.map((q) =>
      [q.prompt, q.explain, q.hint, ...(q.choices || [])].join(' ')).join(' ');
    for (const v of scaleValues) {
      if (v.length > 2 && quizText.includes(v)) {
        flag(`${day.id}: scale figure "${v}" is marked "not on the quiz" but appears in a question`);
      }
    }

    for (const [i, q] of day.quiz.entries()) {
      // a hint should not contain the answer verbatim
      if (q.type === 'mc' && q.hint && q.choices[q.answer]) {
        const ans = String(q.choices[q.answer]).toLowerCase();
        if (ans.length > 6 && q.hint.toLowerCase().includes(ans)) {
          weakHints++;
          if (verbose) flag(`${day.id} q${i + 1}: hint contains the answer verbatim`);
        }
      }
      // duplicate prompts across the whole curriculum
      const key = q.prompt.trim().toLowerCase();
      if (seenPrompts.has(key)) flag(`duplicate question: ${day.id} q${i + 1} repeats ${seenPrompts.get(key)}`);
      else seenPrompts.set(key, `${day.id} q${i + 1}`);
    }
  }

  const avg = grades.length ? grades.reduce((a, b) => a + b) / grades.length : 0;
  rows.push({ lane: lane.name, days: lane.days.length, grade: avg, noCallback, multiIdea, weakHints });
}

/* ---- report ------------------------------------------------------------- */
console.log('lane                     days   FK grade   no callback   2+ ideas/page   weak hints');
console.log('─'.repeat(86));
for (const r of rows) {
  const band = r.grade < 5 ? ' (below band)' : r.grade > 9 ? ' (above band)' : '';
  console.log(
    r.lane.padEnd(24) + String(r.days).padStart(4)
    + r.grade.toFixed(1).padStart(11) + band.padEnd(14)
    + String(r.noCallback).padStart(6)
    + String(r.multiIdea).padStart(16)
    + String(r.weakHints).padStart(13)
  );
}
const all = rows.flatMap((r) => Array(r.days).fill(r.grade));
console.log('─'.repeat(86));
console.log(`overall reading grade ${(all.reduce((a, b) => a + b, 0) / all.length).toFixed(1)} · target band 5-9 (middle school)`);
console.log(`${seenPrompts.size} distinct questions`);

if (warn.length) {
  console.log(`\n${warn.length} item(s) to look at:`);
  for (const w of warn.slice(0, 40)) console.log('  · ' + w);
  if (warn.length > 40) console.log(`  … and ${warn.length - 40} more (run with --verbose for all)`);
} else {
  console.log('\nno issues flagged');
}
console.log('\nNote: this cannot check whether a statement is factually true.');
