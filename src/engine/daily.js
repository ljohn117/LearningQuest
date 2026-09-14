import { CURRICULUM, SUBJECT_ORDER } from '../content/index.js';
import { todayStr, dayKey } from './progress.js';
import { EXTRA_DRILLS, MATH_DRILLS, clampLevel, MAX_LEVEL, asQuestion } from './drills.js';

const ALL_DRILLS = [...MATH_DRILLS, ...EXTRA_DRILLS];

/* Composes one post-homework session.
 *
 * The lesson content is finite — 64 days is roughly 13 school weeks at one a
 * day. What makes this sustainable as a daily habit is that finished work
 * comes back: every session opens with a short warm-up of questions drawn
 * from days already completed, mixed across subjects.
 *
 * That is deliberate, not filler. Retrieval beats re-reading, and mixing
 * subjects means he has to work out *which* idea applies instead of being
 * told by the header — which is also where the "wait, I already know this"
 * jolt comes from.
 *
 * Nothing here gates or penalizes. A warm-up question answered wrong just
 * comes back sooner. */

export const WARMUP_SIZE = 4;
export const REVIEW_XP = 5;

const reviewKey = (subj, dayId, qi) => `${subj}:${dayId}:${qi}`;

/** Days the student has finished, newest-first order not guaranteed. */
export function completedDays(profile) {
  const out = [];
  for (const subj of SUBJECT_ORDER) {
    const s = CURRICULUM[subj];
    if (!s) continue;
    for (const day of s.days) {
      if (profile.completed?.[`${subj}:${day.id}`]) out.push({ subj, day });
    }
  }
  return out;
}

/** The next unlocked-but-unfinished day in each subject. */
export function availableLessons(profile) {
  const out = [];
  for (const subj of SUBJECT_ORDER) {
    const s = CURRICULUM[subj];
    if (!s) continue;
    const days = s.days;
    for (let i = 0; i < days.length; i++) {
      if (profile.completed?.[`${subj}:${days[i].id}`]) continue;
      const req = days[i].requires;
      const reqMet = !req || req.every((k) => !!profile.completed?.[k]);
      // unlocked when it's the first day, or the one before it is done —
      // and any cross-lane prerequisites are satisfied
      if (reqMet && (i === 0 || profile.completed?.[`${subj}:${days[i - 1].id}`])) out.push({ subj, day: days[i] });
      break; // anything past the first unfinished day in a subject is locked
    }
  }
  return out;
}

const daysSince = (iso) => {
  if (!iso) return 999;
  const then = new Date(iso + 'T00:00:00'), now = new Date(todayStr() + 'T00:00:00');
  return Math.max(0, Math.round((now - then) / 86400000));
};

/* A rating steers the rotation for three days and then stops counting.
 *
 * Without the expiry a single "rough going" would push a lane down the queue
 * forever — and since he can only re-rate a lane the app actually serves
 * him, the lane would have no way back. Three days is long enough for the
 * warm-up to bring that material round again and short enough that one bad
 * afternoon does not quietly delete a subject. */
const RATING_WINDOW_DAYS = 3;

/* His own difficulty rating for the last day he finished in a lane, if he
   gave one recently. Days are appended in order, so the last rated one is
   the most recent read on that lane. */
function laneRating(profile, subj) {
  const cal = profile.calibration || {};
  const days = CURRICULUM[subj]?.days || [];
  for (let i = days.length - 1; i >= 0; i--) {
    const rec = cal[`${subj}:${days[i].id}`];
    if (!rec?.level) continue;
    return daysSince(rec.at) <= RATING_WINDOW_DAYS ? rec.level : null;
  }
  return null;
}

/* Rotate subjects instead of always serving whichever comes first in
   SUBJECT_ORDER — otherwise math runs dry before biology is ever offered.
 *
 * The rotation is then nudged by what he said on the results screen. A lane
 * he breezed comes round sooner; a lane he found rough waits a turn so the
 * warm-up can catch up on it first. The nudge is deliberately small — it
 * reorders, it never locks a lane out, and a lane can only be skipped once
 * in a row so "rough going" can never strand him.
 */
export function pickLesson(profile) {
  const avail = availableLessons(profile);
  if (!avail.length) return null;
  const done = Object.keys(profile.completed || {}).length;
  const base = done % avail.length;

  const eased = [];
  for (let i = 0; i < avail.length; i++) {
    const c = avail[(base + i) % avail.length];
    const r = laneRating(profile, c.subj);
    if (r === 'easy') return c;          // he is ready to move — go there now
    if (r !== 'hard') eased.push(c);     // unrated or "good stretch"
  }
  return eased[0] || avail[base];        // everything rough? serve the rotation
}

/**
 * Warm-up questions from finished days.
 *
 * Ordered by how long since each was last seen (never-seen first), then a
 * random slice off the top so it isn't the identical set two days running.
 * Questions missed last time carry a recency penalty, so they resurface
 * sooner without ever being flagged as "your mistakes".
 */
export function pickReview(profile, n = WARMUP_SIZE) {
  const seen = profile.review || {};
  const roughLanes = new Set(SUBJECT_ORDER.filter((s) => laneRating(profile, s) === 'hard'));
  const pool = [];
  for (const { subj, day } of completedDays(profile)) {
    day.quiz.forEach((q, qi) => {
      const rec = seen[reviewKey(subj, day.id, qi)];
      const last = typeof rec === 'string' ? rec : rec?.at;
      const missed = typeof rec === 'object' && rec?.missed;
      pool.push({
        subj, dayId: day.id, qi, q,
        dayTitle: day.title,
        /* A lane he called rough gets its questions back sooner — that is
           what makes "rough going" produce help rather than just a note in
           the parent view. */
        score: daysSince(last) + (missed ? 6 : 0) + (roughLanes.has(subj) ? 4 : 0),
      });
    });
  }
  if (!pool.length) return [];
  pool.sort((a, b) => b.score - a.score);
  const head = pool.slice(0, Math.max(n * 3, n));
  for (let i = head.length - 1; i > 0; i--) {           // Fisher-Yates
    const j = Math.floor(Math.random() * (i + 1));
    [head[i], head[j]] = [head[j], head[i]];
  }
  return head.slice(0, n);
}

/* ---- generated practice, on the same spaced schedule --------------------
 *
 * Until now the warm-up drew only from the 572 fixed quiz questions, and the
 * procedurally generated drills appeared solely if he chose to open a duel.
 * That had it exactly backwards: the memorisable half was spaced daily, and
 * the unmemorisable half only happened on request.
 *
 * A generated question cannot be "spaced" as an item, because it is different
 * every time. The CONCEPT can be, so each drill carries its own last-seen
 * date and the ones he has not met recently come round first.
 *
 * It also carries its own difficulty, which moves the way the duel's does:
 * up when he gets it, down when he misses. That makes the warm-up genuinely
 * adaptive per concept rather than per session — a drill he has been landing
 * for a week arrives harder, one he stumbled on last time arrives easier.
 */
const drillKey = (id) => `drill:${id}`;
export const drillUnlocked = (profile, d) => !!profile.completed?.[dayKey(d.subj, d.day)];

/** The level a given drill should arrive at next, from his history with it. */
export function drillLevel(profile, id) {
  const rec = (profile.review || {})[drillKey(id)];
  return clampLevel(rec && Number.isFinite(rec.level) ? rec.level : 1);
}

/** Generated warm-up items, oldest-unseen concepts first. */
export function pickDrillReview(profile, n) {
  if (n <= 0) return [];
  const seen = profile.review || {};
  const pool = ALL_DRILLS.filter((d) => drillUnlocked(profile, d)).map((d) => {
    const rec = seen[drillKey(d.id)];
    return { d, score: daysSince(rec?.at) + (rec?.missed ? 6 : 0) };
  });
  if (!pool.length) return [];
  pool.sort((a, b) => b.score - a.score);
  const head = pool.slice(0, Math.max(n * 3, n));
  for (let i = head.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [head[i], head[j]] = [head[j], head[i]];
  }
  return head.slice(0, n).map(({ d }) => {
    const level = drillLevel(profile, d.id);
    return { drillId: d.id, subj: d.subj, level, name: d.name,
      q: asQuestion(d, level) };
  });
}

/** Record what was shown, so spacing advances. Pure — returns a new map. */
export function recordReview(profile, results) {
  const next = { ...(profile.review || {}) };
  const at = todayStr();
  for (const r of results) {
    if (r.drillId) {
      /* Difficulty follows the same rule as the duel: it rises when he lands
         one and falls when he does not. Falling is the point — a concept he
         stumbled on comes back gentler, never harder. */
      const was = clampLevel(r.level || 1);
      next[drillKey(r.drillId)] = { at, missed: !r.correct,
        level: clampLevel(r.correct ? Math.min(MAX_LEVEL, was + 1) : was - 1) };
    } else {
      next[reviewKey(r.subj, r.dayId, r.qi)] = { at, missed: !r.correct };
    }
  }
  return next;
}

/** Everything the daily screen needs to describe today before starting it. */
export function buildSession(profile) {
  /* Half generated where possible. Generated questions cannot be memorised,
     so they carry more of the load — but recalling a specific fact he was
     taught is its own skill, so the fixed questions keep their place. If one
     side is short, the other fills in rather than leaving a gap. */
  const wantGenerated = Math.floor(WARMUP_SIZE / 2);
  const generated = pickDrillReview(profile, wantGenerated);
  const recalled = pickReview(profile, WARMUP_SIZE - generated.length);
  const topUp = recalled.length < WARMUP_SIZE - generated.length
    ? pickDrillReview(profile, WARMUP_SIZE - generated.length - recalled.length)
      .filter((g) => !generated.some((x) => x.drillId === g.drillId))
    : [];
  const review = [...recalled, ...generated, ...topUp];
  for (let i = review.length - 1; i > 0; i--) {          // interleave the two kinds
    const j = Math.floor(Math.random() * (i + 1));
    [review[i], review[j]] = [review[j], review[i]];
  }
  const lesson = pickLesson(profile);
  const totalDays = SUBJECT_ORDER.reduce((n, s) => n + (CURRICULUM[s]?.days.length || 0), 0);
  const doneDays = Object.keys(profile.completed || {}).length;
  return {
    review, lesson,
    isFirstEver: doneDays === 0,
    allLessonsDone: !lesson && doneDays >= totalDays,
    doneDays, totalDays,
  };
}
