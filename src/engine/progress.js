/* Progression helpers.

   Date handling differs deliberately from the prototypes. They used
   `new Date().toISOString().slice(0,10)`, which is UTC — so an evening
   session in the US landed on the *next* UTC day. Studying Monday 9pm then
   Tuesday 4pm left the streak at 1, and two sessions on one evening could
   push it to 2. These use local calendar dates instead. */

export const RANKS = [
  { xp: 0, name: 'Cadet' }, { xp: 120, name: 'Explorer' },
  { xp: 300, name: 'Investigator' }, { xp: 560, name: 'Scholar' },
  { xp: 900, name: 'Adept' }, { xp: 1320, name: 'Specialist' },
  { xp: 1850, name: 'Master' }, { xp: 2500, name: 'Luminary' },
];

export function levelInfo(xp) {
  let i = 0;
  for (let k = 0; k < RANKS.length; k++) if (xp >= RANKS[k].xp) i = k;
  const cur = RANKS[i], next = RANKS[i + 1];
  const isMax = !next;
  const nextAt = isMax ? cur.xp + 700 : next.xp;
  const span = nextAt - cur.xp;
  /* pct is a 0-1 fraction, matching every other producer the Bar component
     consumes. Returning 0-100 here made the dashboard XP bar 100x too wide. */
  return { level: i + 1, rank: cur.name, pct: span > 0 ? Math.min(1, (xp - cur.xp) / span) : 1, nextAt, isMax };
}

/* Local calendar date as YYYY-MM-DD (no UTC shift). */
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const todayStr = () => fmt(new Date());
export function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return fmt(d); }

/* Whole calendar days between two YYYY-MM-DD strings. Parsed as local noon so
   a daylight-saving shift cannot round the difference to the wrong integer. */
export function daysBetween(fromStr, toStr) {
  if (!fromStr || !toStr) return Infinity;
  const at = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d, 12); };
  return Math.round((at(toStr) - at(fromStr)) / 86400000);
}

/* Skip days.
 *
 * A streak is a good motivator and a bad master. For a kid who already
 * assumes he is going to fail at things, a broken streak is not a small
 * disappointment — it is a reason to stop entirely, because starting again
 * from 1 feels like proof he was right. He abandons rather than restarts.
 *
 * So the streak has a safety net he is told about IN ADVANCE. One skip day
 * is banked every five days he completes, up to two. A gap that his banked
 * skips can cover is bridged automatically and the streak carries on.
 *
 * Called "skip", never "miss" or "freeze". He chose to skip; nothing failed.
 */
export const SKIP_EVERY = 5, MAX_SKIPS = 2;

/* Pure. Returns the streak after studying today, plus how many skips it
   spent to get there — so the UI can say so rather than silently absorbing
   a gap he would otherwise think he had got away with. */
export function advanceStreak(streak, skips = 0, today = todayStr()) {
  const cur = streak && typeof streak === 'object' ? streak : { count: 0, last: null };
  if (cur.last === today) return { streak: cur, skips, spent: 0 };
  if (!cur.last) return { streak: { count: 1, last: today }, skips, spent: 0 };

  const gap = daysBetween(cur.last, today);
  if (gap <= 1) return { streak: { count: (cur.count || 0) + 1, last: today }, skips, spent: 0 };

  const missed = gap - 1;
  if (missed > 0 && skips >= missed) {
    return { streak: { count: (cur.count || 0) + 1, last: today }, skips: skips - missed, spent: missed };
  }
  return { streak: { count: 1, last: today }, skips, spent: 0 };
}

/* One skip banked every SKIP_EVERY completed days, capped. Awarded on the
   day the count lands on a multiple, so it accrues from real work. */
export const skipsAfter = (completedCount, skips = 0) =>
  completedCount > 0 && completedCount % SKIP_EVERY === 0
    ? Math.min(MAX_SKIPS, skips + 1) : skips;

export const dayKey = (subj, d) => `${subj}:${d}`;
export const XP_CORRECT = 10, XP_BONUS = 20, PRACTICE_XP = 5;
export const DEFAULT_STATE = { name: '', xp: 0, completed: {}, practice: {}, streak: { count: 0, last: null }, skips: 0 };
