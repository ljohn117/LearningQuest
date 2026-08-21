import { CURRICULUM, SUBJECT_ORDER } from '../content/index.js';
import { todayStr } from './progress.js';

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

/* Rotate subjects instead of always serving whichever comes first in
   SUBJECT_ORDER — otherwise math runs dry before biology is ever offered. */
export function pickLesson(profile) {
  const avail = availableLessons(profile);
  if (!avail.length) return null;
  const done = Object.keys(profile.completed || {}).length;
  return avail[done % avail.length];
}

const daysSince = (iso) => {
  if (!iso) return 999;
  const then = new Date(iso + 'T00:00:00'), now = new Date(todayStr() + 'T00:00:00');
  return Math.max(0, Math.round((now - then) / 86400000));
};

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
  const pool = [];
  for (const { subj, day } of completedDays(profile)) {
    day.quiz.forEach((q, qi) => {
      const rec = seen[reviewKey(subj, day.id, qi)];
      const last = typeof rec === 'string' ? rec : rec?.at;
      const missed = typeof rec === 'object' && rec?.missed;
      pool.push({
        subj, dayId: day.id, qi, q,
        dayTitle: day.title,
        score: daysSince(last) + (missed ? 6 : 0),
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

/** Record what was shown, so spacing advances. Pure — returns a new map. */
export function recordReview(profile, results) {
  const next = { ...(profile.review || {}) };
  const at = todayStr();
  for (const r of results) next[reviewKey(r.subj, r.dayId, r.qi)] = { at, missed: !r.correct };
  return next;
}

/** Everything the daily screen needs to describe today before starting it. */
export function buildSession(profile) {
  const review = pickReview(profile);
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
