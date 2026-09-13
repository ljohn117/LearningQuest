import { drillForDay } from './drills.js';

/* The weakest finished day that has a drill waiting for it.
 *
 * He finished 35 days and opened zero duels. The card below said "every math
 * skill you have unlocked", which is true, general, and gave him no reason to
 * tap it on any particular day. Naming the one thing most worth practising
 * turns a menu into a suggestion. Returns null when nothing qualifies, and
 * the card falls back to its general description. */
export function suggestedDrill(profile) {
  const completed = profile?.completed || {};
  let worst = null;
  for (const [key, rec] of Object.entries(completed)) {
    if (!rec || !rec.total) continue;
    const pct = rec.best / rec.total;
    if (pct >= 0.6) continue;
    const [subj, dayId] = key.split(':');
    const drill = drillForDay(subj, dayId);
    if (!drill) continue;
    if (!worst || pct < worst.pct) worst = { pct, drill, subj, dayId };
  }
  return worst;
}

