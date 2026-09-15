/* Motion for diagrams that teach a sequence.
 *
 * WHAT THIS IS FOR
 *
 * Some ideas in this app are not shapes, they are shapes CHANGING. The water
 * cycle is a loop that turns. A physical change is atoms moving while staying
 * themselves; a chemical change is the same atoms regrouping. Exponential
 * growth is a line leading and then losing. A still picture of any of those
 * shows the end state and makes the learner infer the motion that mattered.
 *
 * THE RULE THAT MAKES THIS SAFE
 *
 * A diagram is COMPLETE AT REST. `stage` starts at the final frame, not the
 * first, so:
 *
 *   - with no JavaScript, a broken observer, or a headless screenshot, the
 *     picture is whole rather than blank;
 *   - `visual-check` still sees every shape it asserts on;
 *   - a reader who scrolls past mid-play is never left looking at a fragment.
 *
 * Motion is additive. It replays from the first frame when the diagram
 * scrolls into view, runs once, and settles back on the complete picture.
 * Nothing is ever only visible during the animation.
 *
 * REDUCED MOTION
 *
 * `prefers-reduced-motion: reduce` means no timers are started at all and the
 * diagram simply stays complete. Not a faster animation — none. The app
 * already honours the same query for its CSS keyframes.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** How long each stage holds. Slow enough to read a label, short enough that
 *  a four-stage diagram is over in about four seconds. */
export const STAGE_MS = 900;

export function prefersReducedMotion() {
  try {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Play stages 0..n-1 once when the element scrolls into view.
 *
 * Returns { ref, stage, playing, replay }. `stage` is the highest stage
 * currently revealed and rests at n-1, so `i <= stage` is the test a renderer
 * uses to decide whether part i is showing.
 */
export function useStages(n, ms = STAGE_MS) {
  const ref = useRef(null);
  const last = Math.max(0, n - 1);
  /* Complete at rest. See the note above — this is the load-bearing default. */
  const [stage, setStage] = useState(last);
  const [playing, setPlaying] = useState(false);
  const timers = useRef([]);
  const played = useRef(false);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = () => {
    if (last === 0 || prefersReducedMotion()) return;
    clear();
    setStage(0);
    setPlaying(true);
    for (let i = 1; i <= last; i++) {
      timers.current.push(setTimeout(() => {
        setStage(i);
        if (i === last) setPlaying(false);
      }, ms * i));
    }
  };

  /* If the diagram is ALREADY on screen when it mounts — which is the common
     case, because a lesson page renders with its diagram in view — the
     observer fires immediately and the picture visibly fades down from
     complete before building back up. That pulse reads as the diagram
     breaking rather than starting. Dropping to the first frame before the
     browser paints removes it. The initial render is still complete, so a
     broken observer or no JavaScript leaves the whole picture. */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || last === 0 || prefersReducedMotion() || played.current) return;
    if (typeof IntersectionObserver !== 'function') return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (r.top < vh * 0.8 && r.bottom > 0) { played.current = true; setStage(0); run(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last]);

  useEffect(() => {
    const el = ref.current;
    if (!el || last === 0 || prefersReducedMotion()) return undefined;
    if (typeof IntersectionObserver !== 'function') return undefined;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        /* Once. A diagram that restarts every time it crosses the fold turns
           into the looping-in-peripheral-vision problem this design avoids. */
        if (e.isIntersecting && !played.current) { played.current = true; run(); }
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); clear(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last, ms]);

  useEffect(() => clear, []);

  return { ref, stage, playing, replay: () => { played.current = true; run(); }, last };
}

/* How many stages each kind plays. 1 means "does not animate" and costs
 * nothing: useStages with n=1 starts no observer and no timers.
 *
 * Kept as data, next to the hook, so a test can assert that every kind
 * claiming stages actually has a renderer that reads `stage` — the same class
 * of bug as a renderer ignoring its props. */
export function stageCount(v) {
  if (!v) return 1;
  switch (v.kind) {
    case 'flow': return Array.isArray(v.steps) && v.steps.length ? v.steps.length : 1;
    case 'rearrange': return 2;          // before, then after
    case 'curves': return 2;             // axes, then the curves draw
    case 'percentbar': return 1 + (Array.isArray(v.steps) ? v.steps.length : 0);
    case 'plates': return 2;             // at rest, then moved
    case 'parabola': return Array.isArray(v.panels) ? v.panels.length : 1;
    case 'mapping': return Array.isArray(v.links) && v.links.length ? v.links.length : 1;
    case 'funnel': return 4;
    default: return 1;
  }
}
