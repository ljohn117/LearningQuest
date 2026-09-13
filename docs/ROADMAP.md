# LearningQuest — Build Roadmap

> **Status: Phase 1 is next.**
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
| Spatial ideas are taught as prose | **92 of 131** days have no visual at all; **8 of his 9 weak days** have none |
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
| 1 — Make the invisible visible | not started | days with no visual: 92 → ? |
| 2 — Retire the coin flip | not started | true/false: 116 → ? |
| 3 — Route him to practice | not started | duels played: 0 → ? |
| 4 — Two new ways to learn | not started | interactive block types: 1 → ? |
| 5 — Practice where there is none | not started | coverage: 43/131 → ? |
| 6 — Raise the ceiling | not started | MAX_LEVEL: 3 → ? |
| 7 — The lanes that are missing | not started | lanes: 13 → ? |

## Deferred

Things noticed while building that are real but out of scope for the phase
that found them. Add here rather than widening a phase.

- Session shape does not match behaviour: he binges 3–10 lessons every few
  days; the app is designed around 12 minutes daily.
- Git history still contains the school name and address (see `PRIVACY.md`).
  Owner's decision; making the repo private was chosen but not yet done.
