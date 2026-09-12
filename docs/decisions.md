# Scope decisions (2026-08-21)

Settled in the scope interview. These override the pre-brief roadmap where
they conflict.

| # | Question | Decision |
|---|---|---|
| 1 | First build | **Port to Vite + React.** Swap `window.storage` for `localStorage` with loud failure and payload versioning. |
| 2 | Merge? | **Merge into one app, preserving both save files.** Read `lq_profiles_v2` and `lq_explore_v1` at load and combine. Day ids are already unique across both. |
| 3 | Retired lanes | **Restore all three** — Physical Science, Logic, Earth & Space. Re-author the content so his 6/6 badges have something behind them and the spiral callbacks resolve. |
| 4 | New content | **All four directions**, sequenced: connector/checkpoint days → deeper existing lanes → Practice drills for non-math lanes → new subjects. |

---

## ⚠️ Blocking risk: his progress does not survive the port by itself

**This is the first thing to solve, before the port — not during it.**

His current progress lives in `window.storage`, inside Claude's artifact
sandbox. A Vite app — whether on `localhost:5173` or a private domain —
uses `localStorage` on a **completely different origin**. Browser storage
is origin-scoped by design. There is no automatic migration path, and
nothing in the current code exports.

If we port first and think about this second, he opens the new app and
sees **zero completed days across every lane** — 34+ days of earned work,
gone from his view. For a child whose entire engagement rests on feeling
capable, that is the worst possible failure mode of this project.

### The fix: build an export bridge first

1. Add a **progress export** affordance to the two existing artifacts —
   a button that serializes the profile blob to JSON and shows it for
   copy, or triggers a file save.
2. **Run it and save both payloads** (`lq_profiles_v2`, `lq_explore_v1`)
   somewhere durable outside the browser. This is the backup, and it is
   what makes the merge in decision #2 safe to attempt at all.
3. Build a matching **import** path into the ported app, reusing the
   `applyImport` merge logic that already exists in Explore.

Only after a verified round-trip — export, import, badges intact — does
the port proceed. The existing `ImportPanel` is a partial safety net for
the three retired lanes specifically, but it credits *fixed* lane lists;
it is not a general progress backup.

**Do not attempt the merge before step 2 is verified.**

---

## Hard constraints carried into the build

- **Never renumber or reuse a `dayId`.** Progress is keyed
  `subjectId:dayId`. Renumbering silently erases his history.
- **Consequence-free stays.** No score gates on progression, no lost XP,
  no punished streaks. Every question keeps its hint.
- **Middle school is the band.** Not grade level, not high school prep.
- **One new idea per page.**
- **Every new lane plants spiral callbacks** to lanes he has already done.
- **Checkpoint days connect, they don't re-teach.**

## Content sequencing rationale

Ordered cheapest-highest-value first:

1. **Connector/checkpoint days** — no new material to calibrate, and you
   flagged the reframe as worth more than new content. Lowest risk.
2. **Deeper existing lanes** — calibration is already proven in these
   lanes, so the difficulty band is known-good.
3. **Practice drills beyond math** — extends a generator pattern that
   already works; procedurally generated so nothing is memorizable.
4. **New subjects** — widest spiral surface, but each needs its
   calibration checked against him from scratch. Highest risk, so last.

Every step tuned by the same loop: he runs it, you report
"too easy / too hard / just right," we adjust.

---

## Calibration data (update 2026-08-21)

**Tested reading level: 7th grade.** That is three grades ahead, not two.

Implications:

- **Reading level is not the constraint.** Explore's prose measures
  FKGL 5.7–7.3 — at or below his tested level. Core's math lane is
  comparable. Nothing in the existing content is gated by vocabulary.
- **The stretch belongs in concepts, not wording.** Difficulty should come
  from the idea being genuinely new, never from prose he has to fight
  through. If a lesson lands too hard, suspect the concept load — check
  the one-new-idea-per-page rule first, not the vocabulary.
- **Middle-school calibration is confirmed, with room at the top.** 7th
  grade reading supports the upper end of the middle-school band. Algebra I
  content stays reachable; high-school *prep* framing still does not.
- **UI chrome stays simpler than his reading level anyway.** Interface text
  is overhead, not content — keeping buttons and labels plain isn't
  condescension, it's removing friction between him and the actual work.

This retires the "content is too advanced" concern from `eval-apps.md`
entirely. It was wrong on grade-band grounds, and it is now wrong on
measured-reading-level grounds too.

---

## Explaining became a first-class surface (update 2026-09-12)

**The gap.** Four days out of 131 asked him to produce a sentence — all four
in the English lane. Every other day was read, recognise, answer. Picking C
from four choices proves he can eliminate three wrong things; it does not
prove he could rebuild the idea in front of someone who does not have it.

That also wasted the only behavioural signal we have about this learner: he
explains, out loud, unprompted. The app had nowhere for it to go.

**What changed.** 69 new prompts in `src/content/explain.js`, taking writing
from 4 days to 73 of 131 and covering all thirteen lanes. Deliberately six
different shapes, not one:

| shape | asks for |
|---|---|
| `mechanism` | the causal chain, in order |
| `teach` | explain it to someone who has never seen it |
| `predict` | commit to an answer, then check |
| `flaw` | here is a confident wrong explanation; find the break |
| `compare` | two things that get confused, and what the confusion costs |
| `connect` | the same mechanism in a lane already finished |

**`flaw` is load-bearing for this kid specifically.** Producing an
explanation from nothing is exposing. Saying why someone *else* is wrong is
not, and it runs on identical machinery. It is the low-stakes door into the
same room, and it is used early and often on purpose. 15 of the 69 are this
shape.

**Word targets are 30–45 on purpose.** Short and often beats long and rare.
A 200-word box is how you teach a child to dread a feature.

**Still not graded, still not required.** No score, no XP, no gate. There is
no honest way to machine-grade a child's prose offline, and a wrong verdict
aimed at a kid who already assumes he is bad at this would cost more than the
feature is worth. He writes, reads it back against three short questions, and
judges it himself. `scripts/test.mjs` asserts that nothing in a day's
completion path consults `writing`.

**Write ids are progress keys.** Writing used to be filed positionally —
`subject:day:page:blockIndex` — so inserting any block above a write box
would have silently moved what he wrote to a key nothing reads. It never bit,
because write blocks are appended last, but it was one careless edit from
doing so. Prompts now carry an explicit id and are filed under `w:<id>`.
`store.js` migrates the four original keys additively and one-way: it copies
old to new only when new is empty and never deletes the original, so an old
backup still restores and running it twice cannot clobber newer work.

**The parent view resolves keys by index, not by `split(':')`.** The drill-key
bug hid an entire category of his practice by getting exactly this wrong.
It now also shows the *prompt* next to the answer — reading what he wrote
without knowing what was asked makes a vague answer indistinguishable from a
good one, and asking him about it later is the whole point of the section.
