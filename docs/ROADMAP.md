# LearningQuest — Build Roadmap

> **Status: Phases 1, 2, 3 and 4 done. 2b partial and parked.
> Phase 5 (depth in the science lanes) is next. See "Revised direction".**
> Update the status line and the phase table at the bottom of a phase when it
> lands. This file is the handoff between sessions — it is the only thing that
> survives a context reset, so it must always say where work actually stands.

Superseded: `docs/roadmap-superseded-2026-08.md` (written before the audience
brief existed; several of its value judgments were wrong and are corrected in
its own header).

---

## Why this roadmap exists

The app was built in surgical passes — a lane here, a fix there. That got it to
131 days, 51 drills and 73 writing prompts, which is real. But the first
analysis of the learner's **actual progress data** (2026-09-13, 35 finished
days) showed the remaining problems are structural, not incidental:

| finding | evidence |
|---|---|
| He advances without understanding | **9 of 35** days finished under 60%; five under 50%; one at 25% |
| Spatial ideas are taught as prose | **92 of 131** days have no visual at all; **7 of his 9 weak days** have none |
| Scores are inflated by coin flips | **116 true/false** questions; **7 of his 9 weak days** contain one |
| The practice engine is invisible | **0 duels played.** 22 drills unlocked and never opened |
| The best lane is unreachable | Teardowns is the only fully locked lane — all 6 days need chemistry he has not done |
| Concepts get seen ~4 times, ever | 572 questions ÷ 131 days = **4.4 per day**; mastery needs 20+ spaced |

Each phase below fixes one of those, in order of evidence strength per unit of
work. No phase is a tweak; each is a session's worth of building that ends
green, pushed, and republished.

---

## How to run a phase

One phase per session. Use the `next-phase` skill, which enforces this:

1. Read `CLAUDE.md` and this file. Confirm which phase is next.
2. Re-measure before building. Every phase below states the number it is
   moving — take that reading first so the claim at the end is real.
3. Build only that phase's scope. Resist adjacent improvements; note them
   under *Deferred* instead.
4. Verify: `npm run check`, build, `npm run smoke`, `npm run restore-check`.
   All four, every time.
5. Commit, push to the feature branch, merge to `main`, republish the artifact.
6. Update this file: tick the phase, record the before/after number, and set
   the status line at the top.

**The done-criteria are not negotiable.** If a phase cannot fully land, ship
what is genuinely finished, mark the phase partial here with what remains, and
do not tick it.

---

## Phase 1 — Make the invisible visible

**Why.** 8 of the 9 days he is failing contain no visual, and every one of
them is a natively spatial idea delivered as paragraphs. This is the single
strongest signal in his data.

**Build.** Reusable visual primitives in `src/engine/Visual.jsx`, then wire one
into each failing day:

| day | his score | primitive |
|---|---|---|
| Inequalities (m12) | 2/5 | number line with open/closed endpoints |
| And, Or, Not (lg2) | 2/4 | truth table |
| Statements & Truth (lg1) | 2/4 | truth table |
| Functions & f(x) (m13) | 2/5 | input→output mapping diagram |
| Checks and Balances (g3) | 2/4 | three-node power diagram |
| Percent Change (m15) | 1/4 | before/after bar comparison |
| Proportions & Percents (m2) | 2/5 | before/after bar comparison |
| States of Matter (phy1) | 1/4 | particle arrangement |
| Two Kinds of Change (ch1) | 2/4 | atom rearrangement |

**Done when.** Each of those 9 days renders a visual; a test asserts each by
day id so it cannot silently regress; `smoke` drives one of them in a browser;
the "days with no visual" count drops from 92.

**Guardrails.** Adding a `visual` block to a page is safe — it has no progress
key. Do **not** touch the `quiz` array of any of these days in this phase.

### Outcome

Shipped five reusable primitives in `src/engine/Visual.jsx` — `numberline`,
`grid`, `mapping`, `percentbar`, `rearrange` — wired to 8 days via
`src/content/visuals.js`, each landing on the page that introduces the idea
rather than appended at the end.

Two corrections to the plan above, both found by measuring rather than
assuming:

- It was **7** of his 9 weak days without a picture, not 8. Maths day 2 and
  States of Matter both had one. Day 2's showed *ratio scaling* — the half of
  the day he can already do — so it gained a percent diagram rather than a
  first one. States of Matter already had the right diagram and was left alone.
- The first `rearrange` drew the physical-change case with before and after
  **identical** under the caption "same groupings, just moved". Caught by
  screenshotting it rather than by any test. Groups now carry optional
  `dx`/`dy` so the picture shows the motion the words claim.

Also added: a caption-width guard. Text wider than the 320-unit viewBox is
silently clipped at both ends — no wrap, no error. Two shipped that way and
were only visible in a screenshot.

---

## Phase 2 — Retire the coin flip

**Why.** 116 true/false questions. A 50/50 guess reads as knowledge, which
inflates every score and corrupts the "Finished, but shaky" list that now
drives parent decisions.

**Build.** Convert true/false questions to multiple choice **in place**. Every
distractor must encode a specific, nameable misconception — not filler.

**Done when.** `tf` count is zero; every converted question keeps its original
index; quiz lengths are unchanged everywhere; the audit still passes; each new
distractor is justified in the commit.

**Guardrails — this phase is the dangerous one.** `review` keys are
`subj:dayId:quizIndex`. Rewriting index 2 is fine; moving, inserting or
deleting anything is not. A test freezes every day's quiz length before this
phase starts.

### Outcome

All 116 converted in place across 10 content files, plus one pre-existing
**two-option** multiple choice (`math:m1[4]`, "Which is the better deal?")
which was a coin flip wearing a different costume — and sits in his recall
history. It now has four options and the trap is that the biggest pack is the
worst value.

No quiz array moved. The freeze test was run after every file.

---

## Phase 2b — Close the answer tells

**Why.** Measuring after Phase 2 found two more ways to score without knowing
anything. Both pre-existing; both made slightly worse by the conversion,
because a carefully-worded correct answer tends to be longer than a wrong one.

| tell | now | chance | target |
|---|---|---|---|
| correct option is the longest | **60%** | ~27% | under 35% |
| correct option is longest by 10+ characters | **32%** | — | under 10% |
| most-used answer slot | **37%** (index 1) | 25% | under 30% |

The second row is the serious one. "Pick the longest, most qualified option"
is the oldest test-taking heuristic there is, and at 60% it is worth more to
him than the coin flip ever was. A child who learns it will score well on days
he does not understand — which feeds the wrong days into the parent page's
"Finished, but shaky" list and hides the real ones.

**Build.** For every question where the correct option is conspicuously the
longest, the fix is not to pad the distractors — it is to move the
explanatory tail into `explain`, where it belongs, and leave four options of
comparable weight. Then even out the answer slots by permuting choices (the
choices array is not a progress key; only the question's index is).

**Done when.** Correct-is-longest is under 35%, longest-by-10+ under 10%, no
slot above 30%, and the caps in `scripts/test.mjs` are tightened to match.

**Guardrails.** Same as Phase 2, and one more: permuting a question's choices
must move `answer` with them. A test asserts every answer index still points
at the option the `explain` text describes.

### Outcome — partial

**The plan above was wrong about the cause, and that matters.** It assumed
correct answers were too long because they carried an explanatory tail that
belonged in `explain`. Measuring found the opposite: only 12 of the 149 worst
had such a tail. The real problem was **lazy distractors** — "a loop", "a kind
of tax", "song lyrics", "secret codes", "animals get bored". Those are not
misconceptions, they are jokes, and a child eliminates them without knowing
anything. The correct answer looked long because the wrong answers were
throwaway.

So the fix was not trimming correct answers. It was rewriting roughly 130 sets
of distractors into plausible near-misses — judicial review now offers
"rewrite a law it finds unconstitutional" and "block a bill before it reaches
the President", both of which a half-informed reader would seriously consider.
That is a real improvement to the questions, not a cosmetic balancing of
character counts.

| target | before | after | met |
|---|---|---|---|
| longest by 10+ characters | 149 (32%) | **0** | ✓ |
| worst single margin | 44 chars | **9 chars** | ✓ |
| worst answer slot | 37% | **25%** | ✓ |
| correct is strictly longest | 60% | **49%** | ✗ (target 35%) |

**What is left.** 228 questions where the correct option is longest by between
one and nine characters. No child can *see* a three-character difference, so
the tell is no longer visible — but "always pick the longest" still scores 49%
against 25% by chance, so it is still countable. Closing it means nudging one
distractor in each of ~70 more questions, which is a session of authoring on
its own and was not worth doing badly to claim a tick.

Answer slots are now permuted deterministically across all 461 questions.
Because a permutation that moved `choices` without moving `answer` would leave
every other test passing and every question silently wrong, ten answers are
now pinned to their **content** rather than their position.

Also fixed: `b1` asked "Scarcity means:" twice, because the Phase 2 conversion
produced a near-duplicate of a question already on that day. The second is
rewritten in place to test opportunity cost instead.

---

## Phase 3 — Route him to the practice that already exists

**Why.** He has played zero duels. 22 drills are unlocked and have never been
opened. Three structural fixes, all cheap, all high-leverage.

**Build.**
1. When a day finishes below 60%, offer the matching drill by name on the
   results screen — not a nag, an offer, and only when one exists.
2. Surface the duel on the dashboard when a shaky day has a matching drill.
3. Unlock Teardowns: reduce each day from two prerequisites to one.

**Done when.** A sub-60% finish shows the matching drill; Teardowns has at
least one day open given his real profile; `smoke` covers the offer path.

**Guardrails.** Loosening `requires` can only unlock, never lock. Assert no
day that was open becomes closed.

### Outcome

Teardowns went from **0 of 6 open to 6 of 6** on his real profile. Each day
dropped from two prerequisites to one, and where a requirement was *replaced*
rather than removed it was replaced by an **earlier day in the same lane** —
since lanes unlock sequentially, anyone who satisfied the original
necessarily satisfies the substitute, so the change can only unlock.

The dashboard duel card now names his weakest finished day that has a
generator, instead of saying "every skill you have unlocked". On his profile
that reads *"Percent Change is a good one to try"* — the day he scored 1/4 on.

After a day finishing under 60%, the results screen offers the matching drill
by name. It never says he did badly, never says he should, and never gates
Continue; a test strips code comments and asserts the visible words contain no
scolding vocabulary. (The first version of that test failed on its own
comment, which was the test measuring the wrong thing rather than a finding.)

`suggestedDrill` lives in a plain `.js` module so the suite can import it —
Node cannot parse JSX, a trap this project has hit before.

---

## Revised direction (2026-09-13)

The owner can influence the behaviour Phase 3 was compensating for, so
routing is no longer the constraint. The priority is now **content depth
beyond middle school**, **presentation quality**, and **new tracks**. The
phases below are reordered accordingly; 2b's remaining work is parked.

**Where the content actually tops out today** — this is the case for the
change:

| lane | ceiling |
|---|---|
| Mathematics | intro quadratics, scaling — **no Algebra II, no trig, no functions beyond f(x)** |
| Chemistry | reaction rates — **moles and stoichiometry deliberately omitted** |
| Physical Science | waves, light, sound — **no equations of motion** |
| Computer Science | loops and conditionals — **no functions, arrays or data structures** |
| Biology | microbes, testing a claim — **no genetics beyond a single gene** |

Measured reading level is **6.1 overall**, with Mathematics at **5.0 — below
the target band**. That is the clearest single signal: the maths lane is
written more simply than the child reads, while stopping well short of where
he could go.

### Phase 4 — Raise the maths ceiling — DONE

Eight days appended as `m20`–`m26` and `mr4`. Nothing above them moved.

| | |
|---|---|
| maths days | 22 → **30** |
| ceiling | intro quadratics → **right-angle trigonometry** |
| maths reading grade | 5.0 *(below band)* → **5.5 *(in band)*** |
| drills | 51 → **58** (`m20a`–`m26a`, all frozen) |
| questions in lane | 111 → **153** |

Factoring · the quadratic formula and discriminant · rational expressions and
excluded values · exponential growth · logarithms · sequences and series ·
right-angle trigonometry · checkpoint.

The spine is deliberately one idea: **every operation worth knowing has an
inverse, and the inverse is where the power sits.** Factoring undoes
multiplying, logarithms undo exponentials, inverse trig undoes a ratio — and
the checkpoint ties all seven back to Chemistry (pH is a logarithm), Fossils
(half-life is exponential decay) and Business (compound interest is
exponential growth), so the new maths is notation for things he has already
met rather than a fresh pile.

**Three things caught by verification, not by writing:**

- The first factoring generator printed the solutions inside the prompt —
  *"x² + 5x + 4 = 0 has solutions x = −4 and x = −1, what is the smaller?"* —
  which is reading comprehension, not factoring. Rebuilt.
- Day 23 was specified to use the existing `graph` visual. That kind is a
  **hardcoded straight line** for day 6, so it would have drawn a line and
  labelled it exponential. A real `curves` primitive now plots both functions
  from their actual formulas.
- A JSX comment placed inside a `.map()` return broke the build, and the
  screenshot that "verified" the fix had silently used the previous bundle.
  Only `npm run build` caught it.

`profile-check` and `restore-check` both hardcoded "of 131 days" and failed
the moment the curriculum grew. Both now derive the total — a stale test that
reports a content addition as progress loss is exactly the kind of false alarm
that trains people to ignore the check that matters most.

### Phase 5 — Depth in the science lanes
Moles and stoichiometry in Chemistry; equations of motion and energy
calculations in Physical Science; inheritance beyond one gene in Biology.
Each extends its lane rather than replacing it.

### Phase 6 — Presentation
Two new block types (`slider`, `order`), and visuals for the remaining
**85 of 131 days without one**. Block mix today is 36% plain text, 22%
callout, **5% visual** — the app is still mostly prose with boxes round it.

### Phase 7 — New tracks
In priority order: **How to notice you do not know something** (he finished a
day at 25% and moved on); **Data & charts that lie**; **History**.

### Parked
- 2b remainder: 228 questions where the correct option is longest by one to
  nine characters. Not visible to a reader; still countable. Nothing blocks
  picking this up later.

---

## Phase 4 — Two new ways to learn

**Why.** `codelab` is the only interactive block and lives in one lane. Pages
average 2.0 blocks — closer to a slide than a lesson.

**Build.** Two block types, both reusable across lanes:
- **`slider`** — change one variable, watch the result. Slope, scaling,
  gravity, reaction rate, interest.
- **`order`** — put things in sequence. Rock layers, algorithm steps, a bill
  becoming law, the water cycle.

**Done when.** Both render and are keyboard-reachable; each is used on at
least 4 days across at least 3 lanes; `smoke` drives one of each.

---

## Phase 5 — Practice where there is none

**Why.** 88 of 131 days have no generated practice. English, Connections and
Teardowns have zero.

**Build.** Generators for English first, then Connections and Teardowns, then
the remaining maths gaps. Every generator must vary answer, wording and shape
across levels — the existing generator tests enforce this.

**Done when.** No lane has zero coverage; coverage rises from 43/131.

---

## Phase 6 — Raise the ceiling

**Why.** `MAX_LEVEL = 3`, and four right in a row reaches it. For a kid
already at 100% on several maths days, the top of the ramp is not the top of
his ability.

**Build.** `MAX_LEVEL` 3 → 6, extending every existing generator with levels
4–6 that change the *shape* of the question, not just the numbers.

**Done when.** All 51 generators produce distinct, well-formed questions at
all 6 levels and pass the existing shape-normalising tests.

**Guardrails.** `clampLevel` must keep old saved levels valid. A profile
holding level 3 must not break.

---

## Phase 7 — The lanes that are missing

**Why.** Content gaps worth filling, in priority order.

1. **How to notice you don't know something.** He finished a day at 25% and
   moved on. This is the highest-leverage content in the app and does not
   exist.
2. **Data & charts that lie.** The purest expression of what this app is for.
3. **History.** There is civics and there is deep time, but no human history.

**Done when.** Each lane ships with the same standard as the rest: spiral
callbacks, writing prompts, generated practice, and visuals where the idea is
spatial.

---

## Status

| phase | state | moved |
|---|---|---|
| 1 — Make the invisible visible | **done** 2026-09-13 | days with no visual: **92 → 85**; his 9 weak days: 7 without a picture → **0** |
| 2 — Retire the coin flip | not started | true/false: 116 → ? |
| 3 — Route him to practice | **done** 2026-09-13 | teardown days open to him: **0 → 6**; weakest-day drill now named on the dashboard and offered after a low score |
| 4 — Raise the maths ceiling | **done** 2026-09-13 | maths days **22 → 30**; ceiling **intro quadratics → right-angle trigonometry**; maths reading grade **5.0 (below band) → 5.5 (in band)**; drills **51 → 58** |
| 5 — Depth in the science lanes | not started | chemistry ceiling: **rates → stoichiometry** |
| 6 — Presentation | not started | days with no visual: **85 → ?**; interactive block types: **1 → 3** |
| 7 — New tracks | not started | lanes: **13 → 16** |
| — parked — | | 2b remainder; MAX_LEVEL 3 → 6; practice coverage 43/131 |

## Deferred

Things noticed while building that are real but out of scope for the phase
that found them. Add here rather than widening a phase.

- Session shape does not match behaviour: he binges 3–10 lessons every few
  days; the app is designed around 12 minutes daily.
- The audit script measures reading level and hint quality but has no notion
  of whether a question is guessable. The tell checks live in the test suite
  instead; they arguably belong in the audit output where they would be seen.
- Git history still contains the school name and address (see `PRIVACY.md`).
  Owner's decision; making the repo private was chosen but not yet done.
