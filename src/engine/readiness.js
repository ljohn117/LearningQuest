import { CURRICULUM } from '../content/index.js';
import { drillForDay } from './drills.js';

/* Has he actually understood the thing, or merely reached the end of it?
 *
 * WHY THIS EXISTS
 *
 * His real progress showed nine finished days scored under 60% — one at 25% —
 * each marked complete, each unlocking the next day, each looking identical to
 * a day he aced. That is fine for the main spine and deliberately so: a child
 * who already assumes he is going to fail does not need a locked door, and
 * finishing a day is his to claim.
 *
 * It stops being fine when the next thing up is genuinely harder and genuinely
 * depends on the last. Stoichiometry on top of a 50% grasp of conservation of
 * mass is not progress, it is the appearance of progress, and it ends with a
 * child concluding he is bad at chemistry when what actually happened is that
 * nobody checked.
 *
 * WHAT THIS IS NOT
 *
 * It is not a punishment and it is not a lock in the usual sense:
 *
 *   - It applies ONLY to days that explicitly declare `readiness`. Every
 *     original day in the app remains ungated, and finishing any day still
 *     completes it whatever the score.
 *   - The door names its own key. A day that is not ready says exactly which
 *     earlier day to revisit and what score opens it.
 *   - There are two routes, not one: score well on the earlier day, OR beat
 *     its duel. A kid who would rather prove it by fighting a guardian than by
 *     re-reading a lesson is allowed to do that.
 *   - Retries are unlimited and cost nothing. Nothing is ever taken away.
 *
 * The bar is deliberately 60% — the same threshold the parent page already
 * uses for "Finished, but shaky". Below that he was guessing more than
 * answering, and everyone involved already knows it. */

export const MASTERY_PCT = 0.6;

/* Sustaining six right in a row means he reached the generator's top level and
   held it — the drill route has to be a real demonstration, not a participation
   trophy, or it becomes the easy way round the front door. */
export const MASTERY_STREAK = 6;

const dayTitle = (key) => {
  const [subj, id] = key.split(':');
  return CURRICULUM[subj]?.days.find((d) => d.id === id)?.title || id;
};

export function metViaScore(profile, key) {
  const rec = (profile?.completed || {})[key];
  if (!rec || !rec.total) return false;
  return rec.best / rec.total >= MASTERY_PCT;
}

export function metViaDrill(profile, key) {
  const [subj, id] = key.split(':');
  const drill = drillForDay(subj, id);
  if (!drill) return false;
  const rec = (profile?.practice || {})[drill.id];
  return !!rec && (rec.bestStreak || 0) >= MASTERY_STREAK;
}

/* What still stands between him and this day. Empty array means ready. */
export function unmetReadiness(profile, day) {
  if (!day || !Array.isArray(day.readiness) || !day.readiness.length) return [];
  return day.readiness
    .filter((key) => !metViaScore(profile, key) && !metViaDrill(profile, key))
    .map((key) => {
      const [subj, id] = key.split(':');
      const rec = (profile?.completed || {})[key];
      const target = CURRICULUM[subj]?.days.find((d) => d.id === id);
      const total = target?.quiz?.length || 0;
      const drill = drillForDay(subj, id);
      return {
        key, subj, dayId: id,
        title: dayTitle(key),
        have: rec ? rec.best : null,
        total,
        /* Round up: at 4 questions, 60% means 3 — asking for 2.4 helps nobody. */
        want: Math.ceil(total * MASTERY_PCT),
        drillName: drill ? drill.name : null,
      };
    });
}

export const isReady = (profile, day) => unmetReadiness(profile, day).length === 0;

/* One short line for the day card. Names the key, never the failure. */
export function readinessNote(profile, day) {
  const gaps = unmetReadiness(profile, day);
  if (!gaps.length) return null;
  const g = gaps[0];
  const more = gaps.length > 1 ? ` (+${gaps.length - 1} more)` : '';
  const via = g.drillName ? `, or win the ${g.drillName} duel` : '';
  return `opens at ${g.want} of ${g.total} on ${g.title}${via}${more}`;
}
