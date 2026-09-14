/* How much progress to SHOW him.
 *
 * WHY THIS FILE EXISTS
 *
 * Every learner-facing number used to be a fraction of the whole catalogue:
 * "35 of 131 missions complete", and a bar per lane at done/total. That is
 * fine for an app that stops growing. This one did not.
 *
 * Measured against his real backup, across phases 4 through 8:
 *
 *     headline      35 of 131  (26.7%)  ->  35 of 153  (22.9%)
 *     Mathematics   18 of 22   (82%)    ->  18 of 38   (47%)
 *
 * Maths was his best lane and he was four days from finishing it. He did
 * nothing wrong, did not lose a single completed day, and the bar still
 * collapsed by thirty-five points — because the denominator was my output,
 * not his. Rule 2 says the app must never confirm his belief that he is going
 * to fail at things. Taking away progress he had earned, because somebody
 * else added content, does exactly that.
 *
 * THE RULE THIS FILE ENFORCES
 *
 * A fall he causes by advancing is fine. A fall I cause by shipping is not.
 *
 * So the bar is a function of DONE ALONE — never of how big the catalogue
 * happens to be today — and a test asserts that appending days to a lane
 * cannot lower it. It does reset each time he passes a milestone, the same
 * way the XP bar on the hero card empties at every level-up; that reads as
 * advancement rather than loss because his finished count rises in the same
 * moment, and the note under the bar names the new goal.
 *
 * ONE CASE IS UNAVOIDABLE, and it is better to write it down than to pretend.
 * If he finishes every day in a lane and I then append more, he moves off
 * "Every day finished" and back onto a partial milestone. No display can
 * honestly keep him at 100% when the lane really did grow, and without
 * storing what the catalogue looked like when he last saw it there is no way
 * to tell him "3 new days" instead. What this file guarantees is that this
 * is the ONLY way appending content can lower his bar — the common case, a
 * lane he is part-way through, is now immune. Measured on his own data, that
 * is the difference between maths falling 82% -> 47% and not moving at all.
 * A test pins the exception so it cannot quietly widen.
 *
 * A second, smaller reason this is better. At 153 days, finishing one moved
 * the global bar by 0.65% — invisible. Against a five-day milestone it moves
 * by 20%. For a kid who needs to see that he is moving, a bar that fills is
 * worth more than a bar that is technically accurate about a catalogue he is
 * never going to exhaust.
 *
 * The parent view still shows coverage of the whole curriculum, because
 * "how much is left" is the right question for the person deciding what to
 * do next. It is the wrong question for the person doing the work.
 */

/** Days per milestone. Small enough that a single lesson visibly moves it. */
export const STRIDE = 5;

/**
 * Progress toward his next milestone in one lane.
 *
 * `pct` depends only on `done`. That is the point, not an implementation
 * detail — routing it through `total` is precisely the bug this replaces.
 */
export function milestone(total, done) {
  const t = Math.max(0, Math.trunc(total) || 0);
  const d = Math.max(0, Math.min(Math.trunc(done) || 0, t));

  /* A finished lane reads as finished rather than as the start of a sixth
     milestone that does not exist. */
  if (t === 0 || d >= t) {
    return { done: d, total: t, from: d, target: d, pct: 1, remaining: 0, leftInLane: 0, complete: true };
  }
  const from = Math.floor(d / STRIDE) * STRIDE;
  const target = from + STRIDE;
  return {
    done: d,
    total: t,
    from,
    target,
    pct: (d - from) / STRIDE,
    remaining: target - d,
    leftInLane: t - d,
    complete: false,
  };
}

/** What the lane card says under the title. Never mentions a total. */
export function milestoneNote(m) {
  if (m.complete) return 'Every day finished';
  /* A lane he has never opened has no "next" milestone to be N more toward. */
  if (m.done === 0) {
    const first = Math.min(m.remaining, m.leftInLane) || m.remaining;
    return `${first} ${first === 1 ? 'day' : 'days'} to your first milestone`;
  }
  if (m.leftInLane > 0 && m.leftInLane <= m.remaining) {
    return m.leftInLane === 1 ? 'One day left in this lane' : `${m.leftInLane} days left in this lane`;
  }
  return m.remaining === 1 ? 'One more to your next milestone' : `${m.remaining} more to your next milestone`;
}
