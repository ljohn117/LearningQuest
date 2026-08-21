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

export const dayKey = (subj, d) => `${subj}:${d}`;
export const XP_CORRECT = 10, XP_BONUS = 20, PRACTICE_XP = 5;
export const DEFAULT_STATE = { name: '', xp: 0, completed: {}, practice: {}, streak: { count: 0, last: null } };
