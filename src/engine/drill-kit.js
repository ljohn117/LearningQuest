/* The small pieces every drill generator needs.
 *
 * These lived in drills.js, which is also where the generators live. Once the
 * lanes with the most prose in them (English, Connections, Teardowns) got
 * their own files, those files needed the helpers and drills.js needed their
 * drills — a cycle. Splitting the helpers out breaks it, and drills.js
 * re-exports every name from here so nothing that imported them before has
 * to change.
 */

/* ---- difficulty ---------------------------------------------------------
 *
 * A level is 1, 2 or 3 and every generator defaults to 1, so anything that
 * ignores the argument keeps behaving exactly as it did.
 *
 *   1  the plain form
 *   2  inverted, or one step longer
 *   3  the form that catches people out
 *
 * The duel raises the level as his run grows and drops it the moment he
 * misses. That fall is the important half: getting something wrong makes the
 * next question easier, never harder.
 */
export const MAX_LEVEL = 3;
export const clampLevel = (n) => Math.max(1, Math.min(MAX_LEVEL, Math.round(n) || 1));

export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

/** A new array in random order. Does not touch the original. */
export function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** n distinct members of arr, in random order. */
export const sample = (arr, n) => shuffled(arr).slice(0, n);

/* Build a multiple-choice payload with the right answer in a random slot.
 *
 * Writing `choices` by hand is how a drill becomes a password: the correct
 * option ends up in the same position every time, or phrased longer than the
 * others, and he learns the tell instead of the idea. This shuffles, and it
 * drops any distractor that collides with the answer rather than quietly
 * offering the same text twice. If that leaves too few options the drill
 * returns a short list and the contract test fails — which is the point. */
export function mc(correct, wrong) {
  const answer = String(correct);
  const seen = new Set([answer]);
  const all = [answer];
  for (const w of wrong) {
    const s = String(w);
    if (!seen.has(s)) { seen.add(s); all.push(s); }
  }
  const out = shuffled(all);
  return { choices: out, answer: out.indexOf(answer) };
}
