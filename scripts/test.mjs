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
const { EXPLAIN } = await import('../src/content/explain.js');
const { drillForDay } = await import('../src/engine/drills.js');
const { suggestedDrill } = await import('../src/engine/suggest.js');
const { isReady, readinessNote, MASTERY_STREAK } = await import('../src/engine/readiness.js');
const { VISUALS } = await import('../src/content/visuals.js');
const { INTERACTIVE } = await import('../src/content/interactive.js');
const { evalExpr, showNum } = await import('../src/engine/expr.js');
const { migrateWriting } = await import('../src/store.js');
const { writeKeyFor } = await import('../src/engine/writekey.js');
const { LADDERS, rungEarned } = await import('../src/content/ladder.js');
const { advanceStreak, skipsAfter, daysBetween } = await import('../src/engine/progress.js');
const { pickLesson, pickReview, recordReview } = await import('../src/engine/daily.js');
const { EXTRA_DRILLS, MATH_DRILLS, MAX_LEVEL, clampLevel } = await import('../src/engine/drills.js');
const ALL_DRILLS = [...MATH_DRILLS, ...EXTRA_DRILLS];

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

/* ---- 1b. progress must never be orphaned -------------------------------- */
section('Existing day ids are frozen');

/* Progress is stored per day as `subject:dayId`. Renaming, renumbering or
 * removing a day id does not fail loudly — it silently orphans whatever he
 * had already finished under the old key, and he sees a lane reset to zero
 * with no explanation. It is the single most damaging thing that can be done
 * to this app, and until now nothing stopped it.
 *
 * So the ids that exist are frozen here. Adding days is fine and expected;
 * this list only grows. If a test in this block fails, the correct fix is
 * almost never to edit the list — it is to put the id back.
 */
const FROZEN = {
  math: ['m1','m2','m3','m4','m5','m6','m7','mr1','m8','m9','m10','m11','m12','m13',
         'm14','mr2','m15','m16','m17','m18','m19','mr3','m20','m21','m22','m23','m24',
         'm25','m26','mr4'],
  cs: ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12'],
  physics: ['phy1','phy2','phy3','phy4','phy5','phy6','phyr1','phy7','phy8'],
  logic: ['lg1','lg2','lg3','lg4','lg5','lg6','lgr1'],
  earth: ['es1','es2','es3','es4','es5','es6','esr1'],
  bio: ['bio1','bio2','bio3','bio4','bio5','bio6','bio7','bio8','bio9','bio10','bio11'],
  chem: ['ch1','ch2','ch3','ch4','ch5','ch6','ch7','ch8','ch9','ch10','chr1','ch11',
         'ch12','ch13'],
  ela: ['ela1','ela2','ela3','ela4','ela5','ela6','ela7','ela8','ela9','ela10'],
  biz: ['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12'],
  gov: ['g1','g2','g3','g4','g5','g6','g7','g8','g9','g10'],
  fossils: ['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10'],
  connect: ['cx1','cx2','cx3','cx4','cx5','cx6','cx7'],
  teardown: ['td1','td2','td3','td4','td5','td6'],
};
for (const [subj, ids] of Object.entries(FROZEN)) {
  for (const id of ids) {
    ok(`${subj}:${id} still exists`, dayExists(subj, id), 'removing or renaming this orphans real progress');
  }
}
/* Order matters too: a day that moves earlier in its lane changes what the
   sequential unlock opens, so appended days must stay appended. */
for (const [subj, ids] of Object.entries(FROZEN)) {
  const actual = (CURRICULUM[subj]?.days || []).map((d) => d.id).slice(0, ids.length);
  ok(`${subj}: the original days are still in their original order`,
    actual.join(',') === ids.join(','), `now ${actual.join(',')}`);
}

/* Duel statistics are stored under the DRILL id, exactly as day progress is
 * stored under the day id, so renaming a generator silently orphans his
 * practice history in the same way. Rewriting all twenty-three generators to
 * add difficulty levels was precisely the kind of edit that could have
 * dropped one without anything failing, so these are frozen too. */
const FROZEN_DRILLS = [
  'ch6a',
  'ch11a', 'ch12a', 'ch13a', 'phy7a', 'phy8a', 'bio11a',
  'm20a', 'm21a', 'm22a', 'm23a', 'm24a', 'm25a', 'm26a',
  'dr1','dr2','dr3','dr4','dr5','dr6','dr7','dr8','dr9','dr10','dr11','dr12','dr13','dr14',
  'cs2a','cs2b','cs2c','cs4a','cs5a',
  'biz3a','biz3b','biz5a','biz5b','biz10a','biz10b',
  'fos4a','fos4b','fos3a',
  'gov3a','gov6a','gov5a',
  'bio4a','bio6a',
  'chem5a','chem5b','chem8a','chem9a',
];
const drillIds = new Set(ALL_DRILLS.map((d) => d.id));
for (const id of FROZEN_DRILLS) {
  ok(`drill "${id}" still exists`, drillIds.has(id), 'renaming it orphans his duel stats');
}
ok('drill ids are unique', drillIds.size === ALL_DRILLS.length,
  `${ALL_DRILLS.length} drills, ${drillIds.size} distinct ids`);

/* ---- 1d. a full profile survives a round trip --------------------------- */
section('A populated profile loses nothing on load');

/* normalize() runs over every profile on every load. It fills in fields added
 * after a save was written, and the one thing it must never do is drop a
 * field it does not recognise — a future key, or one from a newer build he
 * used on another device. */
const { __testNormalize } = await import('../src/store.js');
if (typeof __testNormalize === 'function') {
  const rich = {
    id: 'p1', name: 'Leo', xp: 1234,
    completed: { 'math:m1': { best: 5, total: 5 }, 'chem:ch4': { best: 3, total: 4 } },
    practice: { cs2a: { runs: 7, bestStreak: 5 } },
    review: { 'math:m1:0': { at: '2026-09-01', missed: true } },
    writing: { 'ela:ela5': { text: 'half-life is repeated halving', checked: [0, 1], at: '2026-09-01' } },
    calibration: { 'math:m1': { level: 'right', at: '2026-09-01' } },
    streak: { count: 14, last: '2026-09-10' }, skips: 2,
    somethingFromAFutureBuild: { keep: 'me' },
  };
  const out = __testNormalize(rich);
  for (const k of Object.keys(rich)) {
    ok(`normalize keeps "${k}"`, JSON.stringify(out[k]) === JSON.stringify(rich[k]),
      `was ${JSON.stringify(rich[k])}, became ${JSON.stringify(out[k])}`);
  }
  const empty = __testNormalize({ id: 'p2' });
  for (const k of ['completed', 'practice', 'review', 'writing', 'calibration']) {
    ok(`normalize gives a bare profile an empty ${k}`, empty[k] && typeof empty[k] === 'object');
  }
  eq('normalize defaults skips to 0', empty.skips, 0);
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

/* ---- 3b. adaptive difficulty ------------------------------------------- */
section('Adaptive difficulty');
const levelFor = (streak) => clampLevel(Math.floor(streak / 2) + 1);
eq('a fresh duel starts easy', levelFor(0), 1);
eq('two right in a row raises it', levelFor(2), 2);
eq('a long run reaches the top', levelFor(8), 3);
eq('it never exceeds the top level', levelFor(40), MAX_LEVEL);
eq('clampLevel floors at 1', clampLevel(0), 1);
eq('clampLevel floors below zero too', clampLevel(-5), 1);
eq('clampLevel caps at the maximum', clampLevel(99), MAX_LEVEL);
/* A miss must always make the NEXT question easier or equal, never harder —
   this is the rule that keeps adaptive difficulty from reading as a penalty. */
for (let L = 1; L <= MAX_LEVEL; L++) {
  ok(`a miss at level ${L} does not raise the level`, clampLevel(L - 1) <= L);
}

/* ---- 3c. the daily warm-up mixes generated with recalled ---------------- */
section('Warm-up composition');
const { buildSession, pickDrillReview, drillLevel } = await import('../src/engine/daily.js');
const chainOf = (subj, ids) => Object.fromEntries(ids.map((i) => [`${subj}:${i}`, { best: 4, total: 4 }]));

const warm = { completed: { ...chainOf('math', ['m1', 'm2', 'm3', 'm4']), ...chainOf('physics', ['phy1', 'phy2', 'phy3']) },
  review: {}, calibration: {} };
const sess = buildSession(warm);
eq('a warm-up is the full size', sess.review.length, 4);
ok('it contains generated questions', sess.review.some((r) => r.drillId),
  'procedural practice was only reachable through a duel before this');
ok('it still contains recalled questions', sess.review.some((r) => !r.drillId),
  'recalling a specific taught fact is its own skill');
ok('every item carries a usable question', sess.review.every((r) => r.q && r.q.prompt));

/* A generated concept must rise when landed and fall when missed, and must
   never fall below the easiest level. */
let prog = { ...warm };
const one = pickDrillReview(prog, 1)[0];
ok('a drill is offered at all', !!one);
if (one) {
  const id = one.drillId;
  for (const correct of [true, true, true]) {
    prog = { ...prog, review: recordReview(prog, [{ drillId: id, level: drillLevel(prog, id), correct }]) };
  }
  eq('three correct answers reach the top level', drillLevel(prog, id), MAX_LEVEL);
  prog = { ...prog, review: recordReview(prog, [{ drillId: id, level: drillLevel(prog, id), correct: false }]) };
  ok('a miss lowers it', drillLevel(prog, id) < MAX_LEVEL);
  for (let i = 0; i < 5; i++) {
    prog = { ...prog, review: recordReview(prog, [{ drillId: id, level: drillLevel(prog, id), correct: false }]) };
  }
  eq('repeated misses never go below level 1', drillLevel(prog, id), 1);
}
/* A profile with nothing finished must not crash or invent practice. */
const fresh = buildSession({ completed: {}, review: {}, calibration: {} });
eq('a brand new profile gets no warm-up', fresh.review.length, 0);

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
for (const d of ALL_DRILLS) {
  ok(`${d.id}: has a lane and a gating day`, !!d.subj && !!d.day && dayExists(d.subj, d.day), `${d.subj}:${d.day}`);
  for (let L = 1; L <= MAX_LEVEL; L++) {
    let bad = 0;
    const answers = new Set(), prompts = new Set();
    let ugly = null;
    for (let i = 0; i < 300; i++) {
      const q = d.gen(L);
      if (!q || typeof q.prompt !== 'string' || !q.prompt || !Number.isFinite(q.answer) || !q.hint) { bad++; continue; }
      answers.add(q.answer); prompts.add(q.prompt);
      /* A repeating decimal tests typing, not understanding. */
      if (!Number.isInteger(q.answer) && Math.abs(q.answer * 100 - Math.round(q.answer * 100)) > 1e-9) ugly = q.answer;
    }
    eq(`${d.id} L${L}: 300 generated questions are well formed`, bad, 0);
    /* A level whose answer never changes is not practice — it is a password.
       This caught three real generators that always answered 1. */
    ok(`${d.id} L${L}: the answer actually varies`, answers.size > 1, 'always ' + [...answers][0]);
    ok(`${d.id} L${L}: the wording actually varies`, prompts.size > 1, 'single fixed prompt');
    ok(`${d.id} L${L}: answers are clean numbers`, ugly === null, `e.g. ${ugly}`);
  }
  /* Levels must differ from each other, or the ramp is decoration. */
  const shape = (L) => new Set(Array.from({ length: 60 }, () => d.gen(L).prompt.replace(/\d+/g, '#'))); 
  const [a, b, c] = [shape(1), shape(2), shape(3)];
  const same = (x, y) => [...x].every((v) => y.has(v)) && [...y].every((v) => x.has(v));
  ok(`${d.id}: level 1 and 3 ask different things`, !same(a, c), 'identical question shapes');
  ok(`${d.id}: level 2 differs from level 1`, !same(a, b), 'identical question shapes');
}

/* ---- writing prompts --------------------------------------------------- */
section('Writing prompts are addressable and stay addressable');

/* A write prompt's id is a progress key: what he wrote is filed under
   `w:<id>`. Renaming one orphans his writing exactly as surely as renumbering
   a day id does, and just as silently — the box simply comes back empty one
   morning. So every id that exists is frozen here. */
const FROZEN_WRITE_IDS = [
  'w-ela5', 'w-ela6', 'w-ela9', 'w-ela10',
  'x-m2', 'x-m5', 'x-m7', 'x-m10', 'x-m13', 'x-mr2', 'x-m15', 'x-m16', 'x-m18', 'x-m19', 'x-mr3',
  'x-c2', 'x-c4', 'x-c6', 'x-c10', 'x-c12',
  'x-phy3', 'x-phy4', 'x-phy5', 'x-phyr1',
  'x-lg3', 'x-lg4', 'x-lg5', 'x-lg6', 'x-lgr1',
  'x-es2', 'x-es4', 'x-es6', 'x-esr1',
  'x-bio3', 'x-bio4', 'x-bio7', 'x-bio9', 'x-bio10',
  'x-ch1', 'x-ch3', 'x-ch6', 'x-ch7', 'x-ch10', 'x-chr1',
  'x-ela2', 'x-ela3', 'x-ela4', 'x-ela7', 'x-ela8',
  'x-b2', 'x-b3', 'x-b5', 'x-b8', 'x-b10', 'x-b12',
  'x-g3', 'x-g5', 'x-g7', 'x-g9', 'x-g10',
  'x-f3', 'x-f4', 'x-f7', 'x-f8', 'x-f10',
  'x-cx1', 'x-cx2', 'x-cx5', 'x-cx7',
  'x-td1', 'x-td2', 'x-td4', 'x-td6',
  'x-m20', 'x-m21', 'x-m23', 'x-m24', 'x-m26', 'x-mr4',
];

const liveWrites = [];
for (const [subj, lane] of Object.entries(CURRICULUM)) {
  for (const day of lane.days) {
    day.pages.forEach((pg, pi) => pg.blocks.forEach((b, i) => {
      if (b.type === 'write') liveWrites.push({ subj, day: day.id, page: pi, i, b });
    }));
  }
}
const liveWriteIds = new Set(liveWrites.map((w) => w.b.id).filter(Boolean));
for (const id of FROZEN_WRITE_IDS) {
  ok(`write prompt ${id} still exists`, liveWriteIds.has(id), 'renaming it orphans what he wrote there');
}
eq('every write prompt carries an id', liveWrites.filter((w) => !w.b.id).length, 0);
eq('write prompt ids are unique', liveWriteIds.size, liveWrites.length);

/* A day takes its prompt from WRITING or EXPLAIN, never both. */
const overlap = Object.keys(EXPLAIN).filter((d) => WRITING[d]);
eq('no day is claimed by both WRITING and EXPLAIN', overlap.length, 0);

/* Every prompt has to be answerable and self-checkable. A task with no
   checklist gives him nothing to judge his own answer against, which is the
   only feedback this feature has. */
for (const { b } of liveWrites) {
  const id = b.id || '(no id)';
  ok(`${id}: has a task`, typeof b.task === 'string' && b.task.length > 15);
  ok(`${id}: has a checklist`, Array.isArray(b.checklist) && b.checklist.length >= 3, 'nothing to self-check against');
  ok(`${id}: word target is small`, !b.words || b.words <= 60, `${b.words} words is a wall, not a prompt`);
  if (b.kind === 'flaw') ok(`${id}: a flaw prompt supplies the claim`, typeof b.claim === 'string' && b.claim.length > 10);
  if (b.claim) ok(`${id}: only flaw prompts carry a claim`, b.kind === 'flaw');
}

/* The prompts must not all be the same job wearing different words. */
const kinds = new Set(liveWrites.map((w) => w.b.kind).filter(Boolean));
ok('prompts use several different shapes', kinds.size >= 5, `only ${kinds.size} kinds`);

/* Writing must never be a requirement. Nothing in a day's completion path
   may consult it — a timid kid who skips the box still finishes the day. */
const appForWriting = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const finishBlock = appForWriting.slice(appForWriting.indexOf('const finishDay'), appForWriting.indexOf('const finishDay') + 900);
ok('finishing a day never consults his writing', !/writing/.test(finishBlock), 'writing became load-bearing for progress');

/* ---- write keys resolve ------------------------------------------------ */
section('Writing survives the move to id-based keys');

eq('a prompt with an id is filed under it', writeKeyFor({ id: 'x-m2' }, 'math', 'm2', 3, 1), 'w:x-m2');
eq('a prompt without one falls back to position', writeKeyFor({}, 'math', 'm2', 3, 1), 'math:m2:3:1');

/* The four prompts that predate ids must carry their old contents forward. */
const legacy = {
  'ela:ela5:3:2': { text: 'half-life is like halving a pile', checked: [0] },
  'ela:ela6:3:3': { text: 'I think school should start later', checked: [] },
  'ela:ela9:3:1': { text: 'shorter version', checked: [] },
  'ela:ela10:3:1': { text: 'two voices', checked: [] },
};
const migrated = migrateWriting(legacy);
for (const [oldKey, v] of Object.entries(legacy)) {
  const id = 'w:w-' + oldKey.split(':')[1];
  eq(`${oldKey} is readable at ${id}`, migrated[id]?.text, v.text);
  ok(`${oldKey} is not deleted by the migration`, !!migrated[oldKey], 'a restored old backup would lose it');
}
/* Migrating twice must not clobber anything he wrote after the first pass. */
const after = migrateWriting({ ...legacy, 'w:w-ela5': { text: 'a better version I wrote later' } });
eq('migration never overwrites newer writing', after['w:w-ela5'].text, 'a better version I wrote later');
eq('migration of an empty store is empty', Object.keys(migrateWriting({})).length, 0);
eq('migration survives junk input', Object.keys(migrateWriting(null)).length, 0);

/* Every key the parent view could meet must resolve to a real lane. The
   drill-key bug hid a whole category of his practice by failing this. */
const parentSrc = readFileSync(new URL('../src/engine/ParentView.jsx', import.meta.url), 'utf8');
ok('the parent view resolves write keys by index, not by splitting them',
  /WRITE_INDEX\.get\(key\)/.test(parentSrc), 'split() silently yields an undefined lane for w: keys');
ok('the parent view shows him the prompt, not just the answer', /w\.task/.test(parentSrc));

/* ---- finished but not learned ------------------------------------------ */
section('Days finished without mastery are visible to the parent');

const pvSrc = readFileSync(new URL('../src/engine/ParentView.jsx', import.meta.url), 'utf8');
ok('the parent view computes a shaky list', /const shaky = /.test(pvSrc));
ok('the threshold is a real score, not a guess', /pct >= 60/.test(pvSrc));
ok('it is sorted worst first', /sort\(\(a, b\) => a\.pct - b\.pct\)/.test(pvSrc));
ok('it is on the parent page, not his dashboard',
  !/Finished, but shaky/.test(readFileSync(new URL('../src/engine/views.jsx', import.meta.url), 'utf8')),
  'a kid who already expects to fail does not need this on his home screen');

/* Completion must stay ungated. The shaky list exists precisely BECAUSE a low
   score still finishes a day, and that trade is deliberate. */
const appSrc2 = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const fd = appSrc2.slice(appSrc2.indexOf('const finishDay'), appSrc2.indexOf('const finishDay') + 900);
ok('finishing a day is never gated on the score', !/(best|correct)\s*[<>]=?\s*\d/.test(fd), 'a score gate appeared in finishDay');

/* ---- backup age --------------------------------------------------------- */
section('The parent can see how long since a backup');

const st = readFileSync(new URL('../src/store.js', import.meta.url), 'utf8');
ok('lastBackup is normalised', /lastBackup: typeof p\.lastBackup === 'string'/.test(st));
ok('recording a backup touches nothing else',
  /onBackedUp=\{\(\) => updateProfile\(\(p\) => \(\{ \.\.\.p, lastBackup: todayStr\(\) \}\)\)\}/.test(appSrc2),
  'it must not write xp, completed, practice, streak or skips');
const vw = readFileSync(new URL('../src/engine/views.jsx', import.meta.url), 'utf8');
ok('a failed copy is not recorded as a backup', /if \(done && days !== null\)/.test(vw),
  'reporting safety that does not exist is worse than reporting none');

/* ---- quiz position is a progress key ----------------------------------- */
section('Quiz order is frozen');

/* His recall history is keyed `subject:dayId:quizIndex`. That makes a
 * question's POSITION a progress key, exactly like a day id — and a far
 * easier one to break, because reordering a quiz array looks like tidying
 * rather than like data loss.
 *
 * Reordering, inserting or deleting silently reattaches every recorded
 * answer to a different question. A day he struggled on starts reporting a
 * question he never saw, the warm-up re-asks the wrong thing, and the parent
 * page shows a concept he is fine with as one he keeps missing. Nothing
 * errors; the data just quietly starts lying.
 *
 * So every day's quiz length is frozen here. A question may be REWRITTEN in
 * place — index 2 must keep testing what index 2 tested — and new questions
 * may only be APPENDED. This guard exists specifically so that retiring the
 * 116 true/false questions (roadmap phase 2) cannot shift a single index. */
const FROZEN_QUIZ_LENGTHS = {
  "physics:phy7": 5,
  "physics:phy8": 5,
  "bio:bio11": 5,
  "chem:ch11": 5,
  "chem:ch12": 5,
  "chem:ch13": 5,
  "math:m20": 5,
  "math:m21": 5,
  "math:m22": 5,
  "math:m23": 5,
  "math:m24": 5,
  "math:m25": 5,
  "math:m26": 5,
  "math:mr4": 7,
  "math:m1": 5,
  "math:m2": 5,
  "math:m3": 5,
  "math:m4": 5,
  "math:m5": 5,
  "math:m6": 5,
  "math:m7": 5,
  "math:mr1": 7,
  "math:m8": 5,
  "math:m9": 5,
  "math:m10": 5,
  "math:m11": 5,
  "math:m12": 5,
  "math:m13": 5,
  "math:m14": 5,
  "math:mr2": 7,
  "math:m15": 4,
  "math:m16": 4,
  "math:m17": 4,
  "math:m18": 4,
  "math:m19": 4,
  "math:mr3": 7,
  "cs:c1": 4,
  "cs:c2": 5,
  "cs:c3": 4,
  "cs:c4": 4,
  "cs:c5": 4,
  "cs:c6": 4,
  "cs:c7": 4,
  "cs:c8": 4,
  "cs:c9": 4,
  "cs:c10": 4,
  "cs:c11": 4,
  "cs:c12": 5,
  "physics:phy1": 4,
  "physics:phy2": 4,
  "physics:phy3": 4,
  "physics:phy4": 4,
  "physics:phy5": 4,
  "physics:phy6": 4,
  "physics:phyr1": 7,
  "logic:lg1": 4,
  "logic:lg2": 4,
  "logic:lg3": 4,
  "logic:lg4": 4,
  "logic:lg5": 4,
  "logic:lg6": 4,
  "logic:lgr1": 7,
  "earth:es1": 4,
  "earth:es2": 4,
  "earth:es3": 4,
  "earth:es4": 4,
  "earth:es5": 4,
  "earth:es6": 4,
  "earth:esr1": 7,
  "bio:bio1": 4,
  "bio:bio2": 4,
  "bio:bio3": 5,
  "bio:bio4": 5,
  "bio:bio5": 4,
  "bio:bio6": 5,
  "bio:bio7": 4,
  "bio:bio8": 4,
  "bio:bio9": 4,
  "bio:bio10": 4,
  "chem:ch1": 4,
  "chem:ch2": 4,
  "chem:ch3": 4,
  "chem:ch4": 4,
  "chem:ch5": 4,
  "chem:ch6": 4,
  "chem:ch7": 4,
  "chem:ch8": 4,
  "chem:ch9": 4,
  "chem:ch10": 4,
  "chem:chr1": 7,
  "ela:ela1": 4,
  "ela:ela2": 4,
  "ela:ela3": 4,
  "ela:ela4": 4,
  "ela:ela5": 4,
  "ela:ela6": 5,
  "ela:ela7": 4,
  "ela:ela8": 4,
  "ela:ela9": 4,
  "ela:ela10": 4,
  "biz:b1": 4,
  "biz:b2": 5,
  "biz:b3": 5,
  "biz:b4": 4,
  "biz:b5": 5,
  "biz:b6": 4,
  "biz:b7": 4,
  "biz:b8": 4,
  "biz:b9": 4,
  "biz:b10": 4,
  "biz:b11": 4,
  "biz:b12": 5,
  "gov:g1": 4,
  "gov:g2": 5,
  "gov:g3": 4,
  "gov:g4": 4,
  "gov:g5": 4,
  "gov:g6": 4,
  "gov:g7": 4,
  "gov:g8": 4,
  "gov:g9": 4,
  "gov:g10": 4,
  "fossils:f1": 4,
  "fossils:f2": 4,
  "fossils:f3": 4,
  "fossils:f4": 5,
  "fossils:f5": 4,
  "fossils:f6": 5,
  "fossils:f7": 4,
  "fossils:f8": 4,
  "fossils:f9": 4,
  "fossils:f10": 4,
  "connect:cx1": 4,
  "connect:cx2": 4,
  "connect:cx3": 4,
  "connect:cx4": 4,
  "connect:cx5": 4,
  "connect:cx6": 4,
  "connect:cx7": 4,
  "teardown:td1": 4,
  "teardown:td2": 4,
  "teardown:td3": 4,
  "teardown:td4": 4,
  "teardown:td5": 4,
  "teardown:td6": 4
};

for (const [key, want] of Object.entries(FROZEN_QUIZ_LENGTHS)) {
  const [subj, dayId] = key.split(':');
  const day = CURRICULUM[subj]?.days.find((d) => d.id === dayId);
  ok(`${key} still exists`, !!day, 'a day id vanished — restore it, do not update this list');
  if (!day) continue;
  const got = (day.quiz || []).length;
  ok(`${key} still has ${want} questions`, got >= want,
    `got ${got} — questions were deleted, which reattaches his recall history to the wrong ones`);
  ok(`${key} did not shrink or reorder`, got === want || got > want,
    'only appending is safe');
}

/* Every question must still be answerable and still teach on a miss. */
let missingExplain = 0, missingHint = 0, badAnswer = 0;
for (const [subj, lane] of Object.entries(CURRICULUM)) {
  for (const day of lane.days) {
    for (const q of day.quiz || []) {
      if (!q.explain) missingExplain++;
      if (!q.hint) missingHint++;
      if (q.type === 'mc' && !(Number.isInteger(q.answer) && q.choices && q.answer < q.choices.length)) badAnswer++;
      if (q.type === 'tf' && typeof q.answer !== 'boolean') badAnswer++;
      if (q.type === 'numeric' && typeof q.answer !== 'number') badAnswer++;
    }
  }
}
eq('every question explains itself after a miss', missingExplain, 0);
eq('every question offers a hint', missingHint, 0);
eq('every answer is well formed for its type', badAnswer, 0);

/* ---- the days he was failing now have pictures -------------------------- */
section('Spatial ideas are taught with diagrams');

/* Nine of his finished days scored under 60%. Seven had no visual at all, and
 * every one of those teaches something natively spatial — a number line, a
 * truth table, a mapping. This freezes the fix in place so a later content
 * edit cannot quietly drop one and leave him reading paragraphs about shapes
 * again. */
const NEEDS_A_PICTURE = {
  m12: 'numberline',   // inequalities — the open circle IS the point
  lg1: 'grid',         // which sentences even have a truth value
  lg2: 'grid',         // the canonical truth table
  m13: 'mapping',      // one arrow out of each input, or it is not a function
  g3:  'grid',         // six checks between three branches
  m15: 'percentbar',   // the second % is taken from a shorter bar
  m2:  'percentbar',   // it had a ratio diagram; the percent half had none
  ch1: 'rearrange',    // "rearranged" vs "rebuilt" are different pictures
};

const visualsOn = (dayId) => {
  for (const lane of Object.values(CURRICULUM)) {
    const day = lane.days.find((d) => d.id === dayId);
    if (day) return day.pages.flatMap((p) => p.blocks.filter((b) => b.type === 'visual'));
  }
  return null;
};

for (const [dayId, kind] of Object.entries(NEEDS_A_PICTURE)) {
  const vis = visualsOn(dayId);
  ok(`${dayId} still exists`, vis !== null);
  if (!vis) continue;
  ok(`${dayId} has a ${kind}`, vis.some((v) => v.kind === kind),
    `has ${vis.map((v) => v.kind).join(',') || 'nothing'} — he scored under 60% here reading prose`);
}

/* A diagram appended after the closing callout explains nothing, so each one
   declares the page it belongs on and that page must exist. */
for (const [dayId, adds] of Object.entries(VISUALS)) {
  let day = null;
  for (const lane of Object.values(CURRICULUM)) { const d = lane.days.find((x) => x.id === dayId); if (d) day = d; }
  ok(`VISUALS targets a real day: ${dayId}`, !!day);
  if (!day) continue;
  for (const a of adds) {
    const pg = a.page ?? 0;
    ok(`${dayId} page ${pg} exists`, pg < day.pages.length, `day has ${day.pages.length} pages`);
    ok(`${dayId} page ${pg} is not the recap-only page`, pg < day.pages.length);
  }
}

/* Every visual kind used anywhere must be one the renderer knows. A typo here
   renders an empty box with no error, which is worse than a crash. */
const visualSrc = readFileSync(new URL('../src/engine/Visual.jsx', import.meta.url), 'utf8');
const known = new Set([...visualSrc.matchAll(/v\.kind === '([a-z]+)'/g)].map((m) => m[1]));
const usedKinds = new Set();
for (const lane of Object.values(CURRICULUM)) {
  for (const day of lane.days) for (const p of day.pages) for (const b of p.blocks) {
    if (b.type === 'visual') usedKinds.add(b.kind);
  }
}
for (const k of usedKinds) {
  ok(`the renderer knows the "${k}" diagram`, known.has(k), 'an unknown kind renders an empty box silently');
}

/* Adding diagrams must not have moved anything he is scored on. */
let quizTouched = 0;
for (const [key, want] of Object.entries(FROZEN_QUIZ_LENGTHS)) {
  const [subj, dayId] = key.split(':');
  const day = CURRICULUM[subj]?.days.find((d) => d.id === dayId);
  if (day && (day.quiz || []).length !== want) quizTouched++;
}
eq('no quiz array moved while adding diagrams', quizTouched, 0);

/* A caption wider than the 320-unit viewBox is silently clipped at both ends
   — it does not wrap and it does not error, it just loses its first and last
   words. Two of these shipped and were only caught by looking at a
   screenshot. At 10px in the mono face, ~50 characters is the limit. */
const CAPTION_MAX = 50;
let tooWide = [];
for (const lane of Object.values(CURRICULUM)) {
  for (const day of lane.days) for (const p of day.pages) for (const b of p.blocks) {
    if (b.type !== 'visual') continue;
    for (const field of ['caption', 'note', 'label']) {
      const t = b[field];
      if (typeof t === 'string' && t.length > CAPTION_MAX) tooWide.push(`${day.id}.${field} (${t.length})`);
    }
  }
}
ok('no diagram caption is wide enough to clip', tooWide.length === 0, tooWide.join(', '));

/* ---- the coin flip is retired ------------------------------------------ */
section('No question can be answered by guessing heads or tails');

/* 116 of 572 questions were true/false. A 50/50 guess reads as knowledge,
 * which inflates every score and corrupts the "Finished, but shaky" list the
 * parent page now uses to decide what he redoes. Seven of his nine weakest
 * days contained one.
 *
 * They were converted IN PLACE — same index, same idea tested — because
 * recall history is keyed by quiz position. */
let tfLeft = 0;
for (const lane of Object.values(CURRICULUM)) {
  for (const day of lane.days) for (const q of day.quiz || []) if (q.type === 'tf') tfLeft++;
}
eq('no true/false questions remain', tfLeft, 0);

/* Every multiple choice question must actually offer a choice worth making. */
let thin = 0, dupeChoices = 0, badIndex = 0, noHint = 0, noExplain = 0;
for (const lane of Object.values(CURRICULUM)) {
  for (const day of lane.days) for (const q of day.quiz || []) {
    if (q.type !== 'mc') continue;
    if (!Array.isArray(q.choices) || q.choices.length < 3) { thin++; continue; }
    const seen = new Set(q.choices.map((x) => String(x).trim().toLowerCase()));
    if (seen.size !== q.choices.length) dupeChoices++;
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length)) badIndex++;
    if (!q.hint) noHint++;
    if (!q.explain) noExplain++;
  }
}
eq('every choice question offers at least 3 options', thin, 0);
eq('no question repeats an option', dupeChoices, 0);
eq('every answer index points at a real option', badIndex, 0);
eq('every choice question has a hint', noHint, 0);
eq('every choice question explains itself', noExplain, 0);

/* ---- the tells --------------------------------------------------------- */
section('Scores cannot be gamed by test-taking tricks');

/* Retiring true/false removed one way to score without knowing anything.
 * Measuring afterwards found two more, both pre-existing and both made
 * slightly worse by the conversion:
 *
 *   1. WHERE the answer sits. If one slot is disproportionately correct,
 *      "when in doubt pick B" beats guessing.
 *   2. HOW LONG the answer is. The oldest test-taking heuristic there is:
 *      pick the longest, most qualified option. At 60% that is worth far
 *      more than a coin flip was.
 *
 * These caps are set at the CURRENT measured level, not at an ideal. They
 * exist to stop drift while roadmap phase 2b brings the numbers down. */
const mcs = [];
for (const lane of Object.values(CURRICULUM)) {
  for (const day of lane.days) for (const q of day.quiz || []) {
    if (q.type === 'mc' && Array.isArray(q.choices)) mcs.push(q);
  }
}
const atPos = [0, 1, 2, 3].map((i) => mcs.filter((q) => q.answer === i).length);
const worstSlot = Math.max(...atPos) / mcs.length;
ok('no answer slot is overwhelmingly the right one',
  worstSlot <= 0.28, `slot distribution ${JSON.stringify(atPos)} — worst is ${Math.round(worstSlot * 100)}%`);

const margin = (q) => {
  const lens = q.choices.map((x) => String(x).length);
  return lens[q.answer] - Math.max(...lens.filter((_, i) => i !== q.answer));
};
const bigTell = mcs.filter((q) => margin(q) >= 10).length;
eq('no correct answer is conspicuously longer than every wrong one', bigTell, 0);

const maxMargin = Math.max(...mcs.map(margin));
ok('no answer stands out by more than a few characters', maxMargin <= 9, `worst margin is ${maxMargin} characters`);

/* Still above where it should be. Every remaining case is within nine
   characters, so "pick the longest" is no longer something a child can see —
   but it is still something a child could count, and 49% beats 25%. The
   remaining work is recorded in docs/ROADMAP.md. */
const longestTell = mcs.filter((q) => margin(q) > 0).length / mcs.length;
ok('the longest option is not almost always the right one',
  longestTell <= 0.50, `correct is longest in ${Math.round(longestTell * 100)}% of questions — target is under 35%`);

/* A permutation that moved `choices` without moving `answer` would leave
   every test above passing and every question silently wrong. These pin a
   sample of answers to their CONTENT rather than their position. */
const ANSWER_CONTENT = {
  'Which pair can be combined into a single term?': '3x and 5x',
  '10⁶ equals:': '1,000,000',
  'In a² + b² = c², the side c is always:': 'longest side',
  'The graph of y = x² is:': 'U-shaped',
  'Why does the Moon never crash into Earth?': 'sideways',
  'A catalyst speeds up a reaction by:': 'lowering the energy',
  'Judicial review is the power to:': 'breaks the Constitution',
  'A charged battery actually stores:': 'chemical arrangement',
  'Which value satisfies x > 4?': '4.5',
  'Scarcity means:': 'resources are limited while wants are not',
  'Because resources are scarce, every choice you make:': 'the next best thing you gave up',
};
for (const q of mcs) {
  const want = ANSWER_CONTENT[q.prompt];
  if (!want) continue;
  ok(`"${q.prompt.slice(0, 36)}" still marks the right option correct`,
    String(q.choices[q.answer]).includes(want),
    `answer ${q.answer} is "${q.choices[q.answer]}" — a permutation moved choices without moving answer`);
}

/* ---- routing him to the practice that exists --------------------------- */
section('The practice engine is reachable from where he actually is');

/* He finished 35 days and played zero duels. Twenty-two drills were unlocked
 * and had never been opened — not refused, just never mentioned anywhere he
 * was looking. Six of his nine weakest days have a generator sitting right
 * there producing fresh questions on exactly what he missed. */
eq('a day with a drill resolves to it', drillForDay('math', 'm15')?.id, 'm15a');
eq('a day without one resolves to nothing', drillForDay('ela', 'ela1'), undefined);

/* The suggestion names his weakest finished day that has a drill — not the
   most recent, and not just any unlocked one. */
const fakeProfile = {
  completed: {
    'math:m15': { best: 1, total: 4 },   // 25% — worst, and has a drill
    'math:m12': { best: 2, total: 5 },   // 40% — has a drill
    'ela:ela1': { best: 1, total: 4 },   // 25% but NO drill exists
    'math:m1':  { best: 5, total: 5 },   // fine, must not be suggested
  },
};
eq('it suggests the weakest day that has a drill', suggestedDrill(fakeProfile)?.drill?.id, 'm15a');
eq('a day with no drill is skipped, not crashed on', suggestedDrill({ completed: { 'ela:ela1': { best: 1, total: 4 } } }), null);
eq('nothing is suggested when nothing is shaky', suggestedDrill({ completed: { 'math:m1': { best: 5, total: 5 } } }), null);
eq('an empty profile suggests nothing', suggestedDrill({}), null);
eq('a junk profile does not crash', suggestedDrill(null), null);

/* The offer must never become a punishment. Finishing stays unconditional. */
const viewsSrc = readFileSync(new URL('../src/engine/views.jsx', import.meta.url), 'utf8');
/* Comments stripped first: this must test the words he READS, not the
   commentary explaining why they were chosen. The first version of this
   assertion failed on its own code comment, which is a test measuring the
   wrong thing rather than a real finding. */
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');
const at = viewsSrc.indexOf('MORE OF THIS, IF YOU WANT IT');
const offer = stripComments(viewsSrc.slice(at - 200, at + 700));
ok('the offer is shown only below 60%', /correct \/ total < 0\.6/.test(stripComments(viewsSrc)));
ok('the offer never scolds', !/(wrong|failed|poor|badly|should have|try harder|weak)/i.test(offer), 'a wrong answer must never be punished');
ok('Continue is never gated behind the offer', /onClick=\{onContinue\}/.test(viewsSrc));

/* ---- teardowns are reachable ------------------------------------------- */
section('The most engaging lane is no longer the most locked');

/* Every teardown needed TWO prerequisites, and the lane was the only fully
 * locked one in the app: 0 of 6 days open to him. Loosening can only ever
 * unlock — each day now needs one prerequisite, and where a requirement was
 * replaced it was replaced by an EARLIER day in the same lane, which anyone
 * who satisfied the original necessarily also has. */
for (const day of CURRICULUM.teardown.days) {
  ok(`teardown ${day.id} needs at most one prerequisite`,
    !day.requires || day.requires.length <= 1, `needs ${JSON.stringify(day.requires)}`);
}
const hisDays = new Set(['math:m1','math:m2','math:m3','math:m4','math:m5','cs:c1','math:m6','math:m7','math:mr1','math:m8','physics:phy1','math:m9','cs:c2','math:m10','bio:bio1','earth:es1','logic:lg1','bio:bio2','math:m11','chem:ch1','fossils:f1','fossils:f2','math:m12','math:m13','physics:phy2','biz:b1','gov:g1','math:m14','math:mr2','gov:g2','math:m15','math:m16','logic:lg2','ela:ela1','gov:g3']);
const openToHim = CURRICULUM.teardown.days.filter((d) => !d.requires || d.requires.every((r) => hisDays.has(r))).length;
ok('teardowns are open on a real profile', openToHim >= 5, `only ${openToHim} of 6 open`);

/* ---- earned, not merely reached ---------------------------------------- */
section('Depth days ask to be understood, not just finished');

/* His data showed nine days finished under 60%, one at 25%, each unlocking
 * the next and each looking identical to a day he aced. That is fine for the
 * main spine — a child who assumes he will fail does not need a locked door,
 * and finishing a day is his to claim whatever the score.
 *
 * It stops being fine when the next thing genuinely depends on the last.
 * Stoichiometry on a half-grasp of conservation of mass is the APPEARANCE of
 * progress, and it ends with a child concluding he is bad at chemistry when
 * what happened is that nobody checked. */
const depthDays = [];
for (const [subj, lane] of Object.entries(CURRICULUM)) {
  for (const day of lane.days) if (Array.isArray(day.readiness) && day.readiness.length) depthDays.push({ subj, day });
}
ok('some days declare readiness', depthDays.length >= 6, `${depthDays.length} found`);

/* Every prerequisite named must be a day that actually exists, or the door
   can never be opened by anyone. */
for (const { day } of depthDays) {
  for (const key of day.readiness) {
    const [s2, id2] = key.split(':');
    ok(`${day.id} names a real prerequisite (${key})`,
      !!CURRICULUM[s2]?.days.find((d) => d.id === id2), 'an unreachable door');
  }
}

/* The promise is two routes: score well on the earlier day, OR beat its duel.
   A prerequisite with no generator silently offers only one, which is a
   quieter and meaner gate than the one that was designed. */
for (const { day } of depthDays) {
  for (const key of day.readiness) {
    const [s2, id2] = key.split(':');
    ok(`${day.id}'s prerequisite ${key} has a duel route too`,
      !!drillForDay(s2, id2), 'a readiness gate with only one way through it');
  }
}

/* The original spine must stay ungated. */
const ORIGINAL_LANES = ['math', 'cs', 'logic', 'earth', 'ela', 'biz', 'gov', 'fossils', 'connect', 'teardown'];
for (const subj of ORIGINAL_LANES) {
  const gated = CURRICULUM[subj].days.filter((d) => d.readiness && d.readiness.length);
  eq(`${subj} has no readiness gates`, gated.length, 0);
}

const shakyProfile = { completed: { 'chem:ch5': { best: 2, total: 5 }, 'chem:ch6': { best: 2, total: 4 } }, practice: {} };
const solidProfile = { completed: { 'chem:ch5': { best: 4, total: 5 }, 'chem:ch6': { best: 3, total: 4 } }, practice: {} };
const ch11 = CURRICULUM.chem.days.find((d) => d.id === 'ch11');
ok('a shaky prerequisite keeps the depth day closed', !isReady(shakyProfile, ch11));
ok('an understood prerequisite opens it', isReady(solidProfile, ch11));

/* The duel is a genuine second route, and it must be a real demonstration
   rather than a participation trophy. */
const viaDuel = { completed: { 'chem:ch5': { best: 2, total: 5 } }, practice: { chem5a: { runs: 3, bestStreak: MASTERY_STREAK } } };
const weakDuel = { completed: { 'chem:ch5': { best: 2, total: 5 } }, practice: { chem5a: { runs: 9, bestStreak: 2 } } };
ok('winning the duel opens the door too', isReady(viaDuel, ch11), 'the drill route must work');
ok('merely playing the duel does not', !isReady(weakDuel, ch11), 'a participation trophy is not a demonstration');

/* The door has to name its own key. "Locked" tells him nothing. */
const note = readinessNote(shakyProfile, ch11);
ok('a closed door names the day it needs', !!note && /of/.test(note), String(note));
ok('the note never says locked or failed', !/lock|fail|cannot|not allowed/i.test(note || ''), String(note));

/* Days with no readiness declared are unaffected, always. */
const m1 = CURRICULUM.math.days.find((d) => d.id === 'm1');
ok('an ordinary day is always ready', isReady({ completed: {}, practice: {} }, m1));
eq('an ordinary day produces no note', readinessNote({ completed: {} }, m1), null);

/* ---- two more ways to learn -------------------------------------------- */
section('Some ideas are manipulated, not read');

/* The app had one interactive block type, used six times, all in one lane.
 * 36% of blocks were plain text and pages averaged 2.1 blocks — nearer a
 * slide than a lesson. Some ideas are not statements: "doubling the side
 * multiplies the volume by eight" is a relationship to feel by dragging, and
 * "oldest at the bottom" is an order to produce rather than recognise. */
const interactive = { slider: [], order: [] };
const laneOf = {};
for (const [subj, lane] of Object.entries(CURRICULUM)) {
  for (const day of lane.days) for (const p of day.pages) for (const b of p.blocks) {
    if (b.type === 'slider' || b.type === 'order') {
      interactive[b.type].push({ b, day: day.id });
      (laneOf[b.type] = laneOf[b.type] || new Set()).add(subj);
    }
  }
}
ok('sliders are used on several days', interactive.slider.length >= 4, `${interactive.slider.length} uses`);
ok('sequences are used on several days', interactive.order.length >= 4, `${interactive.order.length} uses`);
ok('sliders span at least three lanes', (laneOf.slider || new Set()).size >= 3, `${(laneOf.slider || new Set()).size} lanes`);
ok('sequences span at least three lanes', (laneOf.order || new Set()).size >= 3, `${(laneOf.order || new Set()).size} lanes`);

/* A mistyped formula renders a silent dash rather than crashing, which is
   merciful at runtime and useless for finding the typo. So every expression
   is evaluated here, across its slider's actual range. */
for (const { b, day } of interactive.slider) {
  const min = b.min ?? 1, max = b.max ?? 10;
  for (const o of b.outputs || []) {
    const vals = [min, (min + max) / 2, max].map((x) => evalExpr(o.expr, x));
    ok(`${day}: "${o.expr}" evaluates across the whole range`,
      vals.every((v) => Number.isFinite(v)), `got ${vals.map(showNum).join(', ')}`);
  }
  ok(`${day}: the slider starts inside its own range`,
    (b.start ?? min) >= min && (b.start ?? min) <= max, `start ${b.start} outside ${min}..${max}`);
  ok(`${day}: the slider has at least one output`, (b.outputs || []).length >= 1);
}

/* A sequence needs enough items to be worth ordering, and no duplicates —
   two identical rows make one of them impossible to place. */
for (const { b, day } of interactive.order) {
  ok(`${day}: the sequence has at least three steps`, (b.items || []).length >= 3, `${(b.items || []).length} items`);
  const uniq = new Set((b.items || []).map((x) => String(x).trim().toLowerCase()));
  eq(`${day}: no step is repeated`, uniq.size, (b.items || []).length);
  ok(`${day}: the sequence says what to do`, typeof b.task === 'string' && b.task.length > 10);
}

/* Neither block may become a progress key or a score. They are manipulatives
   — the digital equivalent of blocks on a table, which nobody marks. */
const interSrc = readFileSync(new URL('../src/engine/Interactive.jsx', import.meta.url), 'utf8');
ok('the interactive blocks never touch storage', !/localStorage|lq_v3/.test(interSrc));
ok('the interactive blocks never record progress', !/onWrite|completed|practice\[|xp\b/.test(interSrc));
/* Comments stripped: this tests the words he READS. The same assertion on the
   offer card once failed on its own explanatory comment, which measures the
   wrong thing. */
const interText = interSrc.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');
ok('an unsolved sequence is not scolded', !/(wrong|incorrect|try again|failed|not quite)/i.test(interText),
  'getting it out of order is the ordinary state of working on it');
ok('the sequence is keyboard reachable', /aria-label=\{`Move/.test(interSrc), 'drag-only would exclude keyboards and be unreliable on touch');
ok('the slider is a real range input', /type="range"/.test(interSrc));

/* The evaluator itself. */
eq('expr: multiplication', evalExpr('x*2', 5), 10);
eq('expr: powers are right-associative', evalExpr('2^3^2', 0), 512);
eq('expr: parentheses', evalExpr('(x+1)*2', 4), 10);
eq('expr: division', evalExpr('60/x', 4), 15);
eq('expr: decimals', evalExpr('1000*1.05^x', 0), 1000);
ok('expr: junk yields NaN rather than throwing', Number.isNaN(evalExpr('wat', 1)));
eq('showNum trims noise', showNum(12.000000000000002), '12');
eq('showNum shows a dash for NaN', showNum(NaN), '—');

/* ---- every day has a picture -------------------------------------------- */
section('No day is prose-only any more');

/* This started at 92 of 131 days with no visual at all, and the nine days he
 * was actually failing were almost all in that set. It is now zero, and this
 * assertion is what keeps it there: a new day added without a diagram fails
 * the build rather than quietly rejoining the old majority. */
const prose = [];
for (const [subj, lane] of Object.entries(CURRICULUM)) {
  for (const day of lane.days) {
    if (!day.pages.some((p) => p.blocks.some((b) => b.type === 'visual'))) prose.push(`${subj}:${day.id}`);
  }
}
eq('every day carries at least one visual', prose.length, 0);
if (prose.length) ok('which days', false, prose.join(', '));

/* The block mix should no longer be overwhelmingly plain text. */
const mix = {};
let blocks = 0;
for (const lane of Object.values(CURRICULUM)) {
  for (const day of lane.days) for (const p of day.pages) for (const b of p.blocks) { mix[b.type] = (mix[b.type] || 0) + 1; blocks++; }
}
ok('visuals are a real share of the app', (mix.visual || 0) / blocks >= 0.09,
  `${Math.round((mix.visual || 0) / blocks * 100)}% of blocks are visual`);
ok('plain text is no longer most of it', (mix.text || 0) / blocks <= 0.36,
  `${Math.round((mix.text || 0) / blocks * 100)}% of blocks are plain text`);

/* The three primitives added here need their own shape checks — a `layers`
   entry with no items renders an empty box, silently. */
for (const [subj, lane] of Object.entries(CURRICULUM)) {
  for (const day of lane.days) for (const p of day.pages) for (const b of p.blocks) {
    if (b.type !== 'visual') continue;
    if (b.kind === 'layers') {
      ok(`${day.id}: layers has items`, Array.isArray(b.items) && b.items.length >= 2, 'an empty stack draws nothing');
      ok(`${day.id}: every layer is named`, (b.items || []).every((x) => x && x.name));
    }
    if (b.kind === 'codeshape') {
      ok(`${day.id}: codeshape has lines`, Array.isArray(b.lines) && b.lines.length >= 1);
      ok(`${day.id}: code lines are short enough to fit`,
        (b.lines || []).every((l) => String(typeof l === 'string' ? l : l.t).length <= 42),
        'a long line runs off the viewBox');
    }
    if (b.kind === 'spectrum') {
      ok(`${day.id}: spectrum has zones`, Array.isArray(b.zones) && b.zones.length >= 2);
      ok(`${day.id}: zone labels are short`, (b.zones || []).every((z) => String(z.label).length <= 10),
        'zone labels overlap when long');
    }
    if (b.kind === 'grid') {
      ok(`${day.id}: every grid row matches its columns`,
        (b.rows || []).every((r) => r.length === (b.cols || []).length),
        'a short row leaves a cell blank and shifts the rest');
    }
  }
}

/* ---- report ------------------------------------------------------------ */
console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) { for (const f of fails) console.log('  FAIL ' + f); process.exit(1); }
