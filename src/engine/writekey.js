/* Where a piece of his writing is filed.
 *
 * Originally the key was positional — subject:day:page:blockIndex — which
 * meant inserting any block above a write box on the same page silently
 * moved his writing to a key nothing would ever read again. It never bit,
 * because write blocks are appended last, but it was one careless edit away
 * from doing so.
 *
 * Write prompts now carry an explicit id and are filed under it, so the
 * prompt can move anywhere on the page and still find what he wrote. The
 * positional form stays as a fallback for any write block without an id.
 * The four original English prompts were written before ids existed;
 * store.js migrates their old keys on load.
 *
 * Kept in its own plain .js module rather than in views.jsx so the test
 * suite can import it — Node cannot parse the JSX that file is full of, and
 * a key format that decides whether his writing is findable is exactly the
 * kind of thing that should not be untestable. */
export const writeKeyFor = (b, subj, dayId, page, i) =>
  (b && b.id ? `w:${b.id}` : `${subj}:${dayId}:${page}:${i}`);
