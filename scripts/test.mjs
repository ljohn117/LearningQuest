/* Regression tests. Pure Node, no browser, runs in about a second.
 *
 *   npm test
 *
 * These exist because almost everything in this app was verified once, by
 * hand, in a throwaway script that was then deleted. That is fine for
 * proving something works and useless for keeping it working — and several
 * behaviours here are ones a later change could soften without anybody
 * noticing, because nothing visibly breaks.
 *
 * The first section is the important one. Three design rules in this project
 * are load-bearing: a wrong answer must never be punished, in text, in
 * sound, or by consequence. Each of those is now asserted rather than
 * trusted to a comment nobody re-reads.
 */
import { readFileSync } from 'node:fs';

let pass = 0; const fails = [];
const ok = (name, cond, detail = '') => {
  if (cond) { pass++; } else fails.push(name + (detail ? ' — ' + detail : ''));
};
const eq = (name, got, want) => ok(name, Object.is(got, want), `got ${JSON.stringify(got)}, wanted ${JSON.stringify(want)}`);
const section = (s) => console.log('\n' + s);

const { CURRICULUM, SUBJECT_ORDER } = await import('../src/content/index.js');
const { COMPANIONS } = await import('../src/content/companions.js');
const { SPIRAL, WRITING, SCALE } = await import('../src/content/spiral.js');
const { LADDERS, rungEarned } = await import('../src/content/ladder.js');
const { advanceStreak, skipsAfter, daysBetween } = await import('../src/engine/progress.js');
const { pickLesson, pickReview } = await import('../src/engine/daily.js');
const { EXTRA_DRILLS } = await import('../src/engine/drills.js');

const dayExists = (subj, id) => !!CURRICULUM[subj]?.days.some((d) => d.id === id);
const allDayIds = new Set(SUBJECT_ORDER.flatMap((s) => (CURRICULUM[s]?.days || []).map((d) => d.id)));

/* ---- 1. the load-bearing rules ----------------------------------------- */
section('Load-bearing rules');

/* A companion speaking after a wrong answer is the single easiest place to
   undo the consequence-free design, because it is the one moment he is
   already braced for a verdict. These patterns are second-person or
   judgemental; a line that REFRAMES failure ("one counterexample is
   information, not failure") is fine and must keep passing, which is why
   this matches constructions rather than the bare word. */
const SCOLDING = [
  /\byou (?:failed|were wrong|got (?:it|that) wrong|missed)\b/i,
  /\bincorrect\b/i, /\bnope\b/i, /\boops\b/i, /\bsorry\b/i,
  /\btry harder\b/i, /\bshould have\b/i, /\bwrong again\b/i,
  /\bnot good enough\b/i, /\bdisappoint/i,
];
for (const [key, c] of Object.entries(COMPANIONS)) {
  ok(`${key}: has all five line types`,
    c.lines && c.lines.open && c.lines.hit?.length && c.lines.miss?.length && c.lines.charge && c.lines.win);
  for (const line of c.lines?.miss || []) {
    const hit = SCOLDING.find((re) => re.test(line));
    ok(`${key}: miss line is not scolding`, !hit, hit ? `"${line}" matched ${hit}` : '');
  }
}

/* The wrong-answer sound. One soft low note — never a descending pair, never
   louder than the correct tone. Exercised against a stub AudioContext so the
   actual oscillator graph is inspected, not the source text. */
const notes = [];
globalThis.window = {
  AudioContext: function () {
    this.currentTime = 0; this.state = 'running'; this.destination = {};
    this.createOscillator = () => { const o = { type: '', frequency: {
      setValueAtTime: (v) => notes.push({ f: v }),
      exponentialRampToValueAtTime: (v) => { notes[notes.length - 1].glide = v; } },
      connect() {}, start() {}, stop() {} }; return o; };
    this.createGain = () => ({ gain: {
      setValueAtTime() {}, linearRampToValueAtTime: (v) => { if (notes.length) notes[notes.length - 1].gain = v; },
      exponentialRampToValueAtTime() {} }, connect() {} });
  },
};
const store = {};
globalThis.localStorage = { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } };
const sound = await import('../src/engine/sound.js');

notes.length = 0; sound.play('miss');
eq('sound: play() is inert until switched on', notes.length, 0);
sound.setSound(true);
notes.length = 0; sound.play('miss');
const miss = [...notes];
eq('sound: miss is exactly one note', miss.length, 1);
ok('sound: miss is low', miss[0]?.f < 250, `${miss[0]?.f} Hz`);
ok('sound: miss does not slide downward', miss[0]?.glide === undefined);
notes.length = 0; sound.play('correct');
const correct = [...notes];
eq('sound: correct is two notes', correct.length, 2);
ok('sound: correct rises', correct[1]?.f > correct[0]?.f, `${correct[0]?.f} -> ${correct[1]?.f}`);
ok('sound: miss is no louder than correct', miss[0]?.gain <= correct[0]?.gain, `${miss[0]?.gain} vs ${correct[0]?.gain}`);
sound.setSound(false);

/* Calibration must never become a currency. If a future change wires his own
   difficulty rating to XP, progress or the streak, he learns to answer it
   strategically and the only honest signal in the app is gone. */
const appSrc = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const calFn = appSrc.slice(appSrc.indexOf('function recordCalibration'));
const calBody = calFn.slice(0, calFn.indexOf('\n  }') + 4);
for (const forbidden of ['xp', 'completed', 'streak', 'skips', 'practice']) {
  ok(`calibration does not touch ${forbidden}`, !new RegExp(`\\b${forbidden}\\b`).test(calBody));
}

/* ---- 2. streaks and skip days ------------------------------------------ */
section('Streaks and skip days');
const T = '2026-08-22';
const on = (last, count, skips, today = T) => advanceStreak({ count, last }, skips, today);
eq('first ever session', on(null, 0, 0).streak.count, 1);
eq('same day twice does not double-count', on(T, 5, 2).streak.count, 5);
eq('consecutive day increments', on('2026-08-21', 5, 0).streak.count, 6);
eq('one day missed with no skips resets', on('2026-08-20', 9, 0).streak.count, 1);
eq('one day missed with a skip survives', on('2026-08-20', 9, 1).streak.count, 10);
eq('...and spends exactly one skip', on('2026-08-20', 9, 1).skips, 0);
eq('two days missed with one skip resets', on('2026-08-19', 9, 1).streak.count, 1);
eq('...and does not spend it', on('2026-08-19', 9, 1).skips, 1);
eq('two days missed with two skips survives', on('2026-08-19', 9, 2).streak.count, 10);
eq('a malformed streak object does not throw', advanceStreak(null, 0, T).streak.count, 1);
eq('skip banked on the fifth day', skipsAfter(5, 0), 1);
eq('no skip on a non-multiple', skipsAfter(6, 0), 0);
eq('skips are capped at two', skipsAfter(10, 2), 2);
eq('daysBetween is whole days', daysBetween('2026-03-07', '2026-03-09'), 2);

/* ---- 3. calibration steering ------------------------------------------- */
section('Calibration steering');
const iso = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const base = { completed: { 'math:m1': { best: 5, total: 5 }, 'bio:bio1': { best: 4, total: 4 } }, review: {}, calibration: {} };
const lane = (p) => pickLesson(p)?.subj;
const unrated = lane(base);
eq('a fresh "breezed it" pulls that lane forward', lane({ ...base, calibration: { 'math:m1': { level: 'easy', at: iso(0) } } }), 'math');
ok('a fresh "rough going" steps that lane aside', lane({ ...base, calibration: { 'math:m1': { level: 'hard', at: iso(0) } } }) !== 'math');
eq('a rating older than three days stops counting', lane({ ...base, calibration: { 'math:m1': { level: 'easy', at: iso(4) } } }), unrated);
eq('a rating with no date is treated as stale', lane({ ...base, calibration: { 'math:m1': { level: 'easy' } } }), unrated);
ok('every lane rated rough still serves a lesson',
  !!pickLesson({ ...base, calibration: { 'math:m1': { level: 'hard', at: iso(0) }, 'bio:bio1': { level: 'hard', at: iso(0) } } }));
ok('review still returns questions with a rough lane', pickReview({ ...base, calibration: { 'math:m1': { level: 'hard', at: iso(0) } } }, 4).length > 0);

/* ---- 4. content wiring ------------------------------------------------- */
section('Content wiring');
/* SPIRAL, WRITING and SCALE are keyed by day id and injected at merge time.
   A typo in a key does not error — the addition just silently never appears,
   which is the worst kind of content bug because it looks like it shipped. */
for (const [label, map] of [['SPIRAL', SPIRAL], ['WRITING', WRITING], ['SCALE', SCALE]]) {
  for (const key of Object.keys(map)) {
    ok(`${label}["${key}"] targets a real day`, allDayIds.has(key));
  }
}
for (const subj of SUBJECT_ORDER) {
  ok(`${subj}: lane has a companion`, !!COMPANIONS[subj], 'a missing entry crashed the duel once');
}
for (const l of LADDERS) {
  for (const r of l.rungs) {
    if (r.subj) ok(`ladder ${l.id}: "${r.label}" points at a real day`, dayExists(r.subj, r.day), `${r.subj}:${r.day}`);
    else ok(`ladder ${l.id}: "${r.label}" is deliberately unreachable`, !r.day);
  }
  ok(`ladder ${l.id}: rungs ascend`, l.rungs.every((r, i) => i === 0 || r.exp >= l.rungs[i - 1].exp));
}
ok('an unearned rung never lights', !rungEarned(LADDERS[0].rungs.find((r) => r.subj), { completed: {} }));

/* ---- 5. drill generators ----------------------------------------------- */
section('Drill generators');
for (const d of EXTRA_DRILLS) {
  ok(`${d.id}: has a lane and a gating day`, !!d.subj && !!d.day && dayExists(d.subj, d.day), `${d.subj}:${d.day}`);
  let bad = 0;
  for (let i = 0; i < 200; i++) {
    const q = d.gen();
    if (!q || typeof q.prompt !== 'string' || !q.prompt || !Number.isFinite(q.answer) || !q.hint) bad++;
  }
  eq(`${d.id}: 200 generated questions are all well formed`, bad, 0);
}

/* ---- report ------------------------------------------------------------ */
console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) { for (const f of fails) console.log('  FAIL ' + f); process.exit(1); }
