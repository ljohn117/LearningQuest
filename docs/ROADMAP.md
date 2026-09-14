# LearningQuest — Build Roadmap

> **Status: Phases 1–8 done (2b partial and parked). Every lane can now be
> practised: English, Connections and Teardowns had zero generated drills
> between them because the duel could only ask for a number.
> NOTHING SINCE PHASE 1 HAS BEEN VALIDATED AGAINST THE LEARNER: he last did
> a lesson on 2026-09-10 and all eight phases landed after it.**
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

### Phase 5 — Depth in the science lanes — DONE

Six days: `ch11`–`ch13` (the mole, molar mass, stoichiometry), `phy7`–`phy8`
(motion with equations, F = ma), `bio11` (Punnett squares). Seven new drills,
including `ch6a`, added because a readiness prerequisite had no duel route.

**The bigger change is the mechanism.** At the owner's instruction — *"scale
into this content with verification of understanding, no point in progress for
progress' sake"* — these are the first days in the app that do not open on
completion alone.

A day may declare `readiness: ['chem:ch6']`. It opens when that day is at 60%
**or** its duel has been won on a sustained streak of six. This modifies a
load-bearing rule, so `CLAUDE.md` records the exception and its reasoning
rather than the change happening quietly.

It is a door with its key written on it:

- Applies **only** to days that declare it. Every original day stays ungated,
  and finishing any day still completes it whatever the score.
- **Two routes, always** — a test asserts every readiness prerequisite has a
  drill, so the second route can never go silently missing. That test found
  `ch6` had none and the gap was filled.
- The card reads *"opens at 3 of 4 on Reading a Formula, or win the Counting
  Atoms duel"*, with a **key** icon rather than a padlock — a padlock says
  "you cannot" while the text says exactly how, and the icon should not
  contradict the words.
- Unlimited, free retries. Nothing is ever taken away.

**Caught by verification, not by writing:** a generator invented **Ca(OH)₃**,
which is not a compound — a drill that fabricates chemistry to make its
numbers work is worse than no drill. Another had a train "slow" from 12 m/s to
−12 m/s. A Punnett question offered "all Bb" and "all bb" as separate options,
differing only by case and genuinely easy to misread.

### Phase 6 — Presentation — DONE

Two new interactive block types, plus 21 more days given a diagram.

**`slider`** — drag one number and watch what depends on it move. Formulas
travel with the content as strings, evaluated by a tiny recursive-descent
parser in `src/engine/expr.js` (numbers, `x`, `+ - * / ^`, parentheses; no
`eval`, no `Function`). So a new slider is a data edit, not a new component.
Five uses across three lanes — cube scaling, slope, exponential growth,
F = ma, and compound against simple interest over forty years.

**`order`** — produce a sequence rather than recognise one. Rock layers,
an algorithm, a bill becoming law, the water cycle, a food chain. Moved with
buttons rather than drag: drag is unreliable on touch and invisible to a
keyboard, and this has to work on a phone.

Neither block stores anything, neither is scored, and nothing depends on
whether he touches them — asserted by test. An unsolved sequence says
**nothing**; getting it out of order is the ordinary state of working on it,
and an app that comments on that is an app that punishes trying.

**Days with no visual: 94 → 73.** Twenty-one days gained one using primitives
that already existed — exponent laws, scientific notation, square roots, the
mean-versus-median trap, factoring, binary place values, ionic bonding,
reading a formula, the pH scale, the if-then truth table, word parts, levels
of government, what taxes buy, the geologic time scale, dating methods,
profit, markup, taxonomy, and powers of two.

**Two things caught by looking rather than testing:** the sequence row let its
arrow buttons stretch and squeezed every label to one word per line — every
assertion passed. And the browser check's first sort driver clicked every
"up" button, which rotates a list rather than sorting it, so it never reached
the solved state it was asserting on.

New tooling: `npm run interactive-check` drags a real slider, sorts a real
sequence, and writes `slider.png` / `order.png`, because layout is not
correctness.

### Phase 6b — finish the visuals — DONE

At the owner's instruction, before any new tracks. **73 → 0.** Every one of
the 145 days now carries at least one diagram, and a test fails the build if
a new day is added without one, so the gap cannot quietly reopen.

Three more primitives, chosen because they unlock clusters the existing set
could not reach:

- **`layers`** — a cross-section, stacked or concentric. Earth's interior, a
  pencil, a battery, a touchscreen, how a fossil forms. "What is inside what"
  is a picture, not a sentence.
- **`codeshape`** — code with its parts named. A `for` loop packs three jobs
  into one line, and pointing at them beats describing them. Serves six
  Computer Science days, which was the second-worst lane.
- **`spectrum`** — a line with named zones, for things that are not true or
  false but somewhere along a range: the electromagnetic spectrum, formality
  of tone, how protected a kind of speech is.

Block mix moved from **5% visual / 36% plain text to 11% / 34%** — 150
visuals across 1,355 blocks. Both thresholds are asserted so it cannot drift
back, but note the honest reading: doubling the visuals moved plain text by
only two points, because the diagrams were *added* rather than replacing
prose. If the goal is a genuinely less text-heavy app, that is a separate
piece of work — cutting and tightening the prose itself, not adding more
blocks beside it.

**Two things caught by looking, not by testing.** `codeshape` right-anchored
its annotations on the same row as the code, so a normal-length line ran
straight into its own label — every assertion passed. And the palest zone of
a `spectrum` had dark text on a nearly dark band.

New shape guards: a `layers` with no items, a `codeshape` line too long for
the viewBox, a `spectrum` label long enough to overlap its neighbour, and a
`grid` row shorter than its header all now fail the suite. The last three
each caught a real instance on their first run.

### Phase 7 — Statistics — DONE

**The three tracks originally proposed here were rejected by the owner as ad
hoc, and they were right — for three different reasons:**

- *"How to notice you don't know something"* — real pedagogy, no external
  referent, and it should not be a lane anyway. It belongs distributed inside
  existing days, and partly already is: the calibration tap, the readiness
  gates, the explain prompts, Logic 6, Biology 10.
- *"Data & charts that lie"* — that was **Statistics**, badly named. The cute
  framing hid an actual named subject.
- *"History"* — maps cleanly but is a department, not a track. Unscoped.

So Phase 7 became **Statistics and Probability**, eight days appended to the
Mathematics lane as `m27`–`m33` and `mr5`. Inside the maths lane deliberately:
it is the next part of mathematics, not a fourteenth tile on a grid the
learner is 24% of the way through.

| | |
|---|---|
| maths days | 30 → **38** |
| drills | 65 → **70** |
| new visuals | 8, including a new `twobars` primitive |

Sampling and bias · spread · charts that argue · correlation and cause ·
combining probabilities · base rates · margin of error · checkpoint.

Five days already existed and are not repeated (m16–m19, mr3 — averages,
counting, probability, scaling). Those covered the *centre* of a data set and
basic chance. These cover where the numbers came from, how spread out they
are, and what follows from them.

`twobars` draws the same two numbers on a zero-based axis and a truncated one,
side by side. The day's entire claim is that the impression changes while the
data does not, and that is not something prose can land.

**Two of my own tests caught real problems.** `m33` named a prerequisite with
no drill, which would have left a readiness gate with only one route through
it — the missing generator was written. And the "original lanes stay ungated"
assertion was too coarse: it checked whole lanes, so adding statistics to
maths tripped a rule that only ever meant to protect days that already
existed. It now checks the specific day ids frozen when readiness was
introduced, which is the actual intent — a day he may already have finished
must never become gated behind a score.

### Remaining named subjects, if tracks are wanted later
Economics (Business & Money is entrepreneurship, not economics) · History
(needs scoping: which, and what period) · Environmental Science ·
Psychology. Skip geography, and skip a world language — an offline app with
no audio and no conversation partner is the wrong vehicle, and saying so
beats building something weak.

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

## Phase 8 — Every lane can be practised  — **done**

**Why.** Three lanes had no generated practice at all: English & Writing (10
days), Connections (7) and Teardowns (6). Twenty-three days he could finish
and then never revisit.

That looked like a content gap and was not. `Duel.jsx` wrote
`type: 'numeric'` onto whatever a generator returned, in four places, so a
drill could only ever ask something with a numeric answer. `drills.js` said as
much: it extended "to the lanes with something countable in them". English has
nothing countable, so English got nothing — not because sentence structure,
evidence and revision cannot be drilled, but because the duel had no way to
show a question that is not a number.

**What changed.**

- `asQuestion(drill, level)` is now the single place a drill becomes a
  question. A generator may return `choices` with `answer` as an index, and it
  renders as multiple choice; anything without `choices` behaves exactly as
  before.
- `Question` gained a `passage` field — the text a question is ABOUT, set in
  body type below the prompt, so a four-sentence paragraph is not crammed into
  a 22px heading.
- `drill-kit.js` holds the shared helpers (levels, RNG, `mc()`), so per-lane
  drill files can use them without importing `drills.js` back.
- 23 new generators: `drills-language.js` (ela1–ela10) and
  `drills-systems.js` (cx1–cx7, td1–td6).

**On guessing.** Multiple choice reintroduces luck, and Phase 2 spent a whole
session removing 116 true/false questions for that reason. A duel is not a
quiz: level rises only on consecutive hits, and a readiness gate opens on a
streak of six. At four choices that is 0.25⁶ — about 1 in 4,000. Tests enforce
at least three options, no duplicates, and that the right answer moves around.

**The tells, measured rather than intended.** A test now measures how often
the correct option is the longest — and the shortest, because the first fix
for one produced the other. The bar scales with the number of options
(chance + 15 points), since three choices sit at 33% when perfectly fair. Both
directions caught real bias in content I had just written.

**What the screenshots caught that nothing else did.** `qPassage` was styled
almost identically to `S.choice`, so the sentence under analysis rendered as
one more thing to click — "What is missing here?" above four identical boxes,
three of which were answers. And `cx7` level 1 drew its wrong options from
other domains, so a question about body heat offered "insulin is released and
sugar is stored": rejectable without knowing anything about feedback. Both
passed every test. Fixed, then re-shot.

**Done when.** No lane has zero drills; an MC duel plays to a win in a real
browser; his real profile survives. All met.

## Status

| phase | state | moved |
|---|---|---|
| 1 — Make the invisible visible | **done** 2026-09-13 | days with no visual: **92 → 85**; his 9 weak days: 7 without a picture → **0** |
| 2 — Retire the coin flip | not started | true/false: 116 → ? |
| 3 — Route him to practice | **done** 2026-09-13 | teardown days open to him: **0 → 6**; weakest-day drill now named on the dashboard and offered after a low score |
| 4 — Raise the maths ceiling | **done** 2026-09-13 | maths days **22 → 30**; ceiling **intro quadratics → right-angle trigonometry**; maths reading grade **5.0 (below band) → 5.5 (in band)**; drills **51 → 58** |
| 5 — Depth in the science lanes | **done** 2026-09-13 | chemistry **rates → stoichiometry**; physics **no equations → F = ma**; biology **one gene → Punnett squares**; 6 days, 7 drills; **readiness gating introduced** |
| 6 — Presentation | **done** 2026-09-13 | days with no visual: **94 → 73**; interactive block types: **1 → 3** (`slider` 5 uses / 3 lanes, `order` 5 uses / 5 lanes) |
| 7 — Statistics | **done** 2026-09-13 | maths days **30 → 38**; a named subject, not a new lane; drills **65 → 70** |
| 8 — Every lane can be practised | **done** 2026-09-14 | lanes with no practice at all: **3 → 0**; days with a drill **62/153 → 85/153** (41% → 56%); drills **70 → 93**; assertions **3,012 → 3,723** |
| — parked — | | 2b remainder (strictly-longest 47% vs 35% target); MAX_LEVEL 3 → 6 (coupled to MASTERY_STREAK); prose tightening (34% plain text) |

## Deferred

Things noticed while building that are real but out of scope for the phase
that found them. Add here rather than widening a phase.

- Session shape does not match behaviour: he binges 3–10 lessons every few
  days; the app is designed around 12 minutes daily.
- The audit script measures reading level and hint quality but has no notion
  of whether a question is guessable. The tell checks live in the test suite
  instead; they arguably belong in the audit output where they would be seen.
- The lesson QUIZZES have never had the length check the drills now have.
  Phase 2b measured 47% strictly-longest against a 25% chance baseline and
  parked it; the test only guards generated drills, so nothing stops a new
  quiz question from being written the same way.
- Practice coverage is 85/153. The thinnest lanes left are Fossils & Deep Time
  (2/10), Earth & Space (2/7), Computer Science (3/12), Business & Money
  (3/12), Government & Civics (3/10) and Biology (3/11).
- `ela9a` level 1 has the correct answer in the middle of the length ordering
  almost every time. Both measured tells are at zero, and spotting "middle of
  four" needs comparing all four, but it is a pattern.
- Git history still contains the school name and address (see `PRIVACY.md`).
  Owner's decision; making the repo private was chosen but not yet done.
