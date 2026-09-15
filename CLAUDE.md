# LearningQuest

A gamified learning app built by a parent for his son. One learner, one
device, no server, no accounts, no analytics. Everything he does is stored in
his own browser's `localStorage` and never leaves it.

Read `docs/who-this-is-for.md` before making content decisions and
`docs/ROADMAP.md` before starting work.

---

## The rules that are load-bearing

These are not style preferences. Each one exists because breaking it does
real damage to a real child, and each is enforced by `scripts/test.mjs` so it
cannot be softened by accident.

### 1. Never destroy his progress

His history exists in exactly one place and there is no backup unless someone
pressed **Back up**. There is no server to restore from. Losing it is the
worst thing that can happen in this codebase — worse than any bug, worse than
the app being down.

**Four kinds of identifier are progress keys. All are permanent.**

| key | shape | set by |
|---|---|---|
| finished days | `completed['<subj>:<dayId>']` | day ids |
| duel records | `practice['<drillId>']` | drill ids |
| recall history | `review['<subj>:<dayId>:<quizIndex>']` | **day ids AND quiz position** |
| written answers | `writing['w:<promptId>']` | write prompt ids |

Therefore:

- **Never renumber, rename or reuse a day id.** Append new days; never insert.
- **Never rename a drill id.**
- **Never rename a write prompt id.**
- **Never reorder, insert into, or delete from a day's `quiz` array.** A
  question may be rewritten *in place* — index 2 must keep testing what index
  2 tested — and new questions may only be appended to the end. Reordering
  silently reattaches his recall history to the wrong questions.

Every existing id and every quiz length is frozen in `scripts/test.mjs`.
If a test fails saying an id vanished, **you renamed something you must not
rename.** Restore the name; do not update the test.

### 2. A wrong answer is never punished

He is a capable kid who assumes he is going to fail at things. The app must
never confirm that.

- No companion, character or copy scolds him after a wrong answer.
- The wrong-answer sound is one soft low note. Never a failure buzzer.
- Nothing is taken away for being wrong — no lost points, lives, or streak.
- **Finishing a day is never gated on scoring well.** A low score still
  completes the day, always. (The parent page surfaces weak days instead —
  see "Finished, but shaky".)

**One deliberate exception, added 2026-09-13 at the owner's request**, because
"no progress for progress' sake" and "never punish a wrong answer" are both
true and had to be reconciled:

A day may declare `readiness: ['chem:ch6']` — an earlier day that must be
**understood**, not merely finished, before it opens. It applies **only** to
days that declare it; every original day in the app remains ungated, and
finishing any day still completes it whatever the score.

It is a door with its key written on it, not a punishment:

- The bar is 60%, the same threshold the parent page already calls "shaky".
- **Two routes, always**: score 60% on the named day, *or* beat its duel
  (a sustained streak of 6, which means reaching the generator's top level).
  A test asserts every readiness prerequisite has a drill, so the second route
  is never silently missing.
- The card says *"opens at 3 of 4 on Two Kinds of Change, or win the
  Rearrangement duel"* — never "locked", never "failed".
- Retries are unlimited and cost nothing. Nothing is ever taken away.

The reason is specific: stoichiometry resting on a half-grasp of conservation
of mass is not progress, it is the appearance of progress, and it ends with a
child concluding he is bad at chemistry when what actually happened is that
nobody checked. See `src/engine/readiness.js`.

### 3. Calibration is never a currency

"How did that land?" earns nothing and costs nothing. The moment it pays out,
it stops being an honest signal and becomes a thing to game. `recordCalibration`
must not touch xp, completed, practice, streak, skips or writing.

### 4. Writing is never graded and never required

There is no honest way to machine-grade a child's prose offline, and a wrong
verdict aimed at this kid costs more than the feature is worth. He writes,
reads it back against a short checklist, and judges it himself. Every day
completes whether or not he writes a word.

### 5. No personal information in this repository

It is public. Never commit: the school, its address or district; his name,
age, year group or teacher; photographs; his written work; progress exports;
or anything else tying a described child to a locatable place. See
`PRIVACY.md`. Analyse real progress data only in the scratchpad, never in the
repo.

---

## Verify before you push

Run all four. They take about a minute together.

```bash
npm run check             # validate + 3,742 unit assertions + content audit
npm run build && node scripts/build-singlefile.mjs
npm run smoke             # real browser: dashboard, a numeric duel, an MC duel, a write prompt
npm run restore-check     # real browser: Back up -> Restore across origins
npm run visual-check      # real browser: every diagram actually paints shapes
npm run interactive-check # real browser: sliders and orderings respond
npm run motion-check      # real browser: animated diagrams are whole at rest, and still under reduced motion
```

`npm run check` alone is not enough. The browser checks catch the class of bug
unit tests structurally cannot see — a block that renders nothing, a key that
no longer resolves, a crash on a real click. All three have caught live bugs
that `check` passed.

Two more, for changes that warrant them:

```bash
npm run profile-check -- <backup.json>   # a REAL saved profile survives this build
LQ_SHOT_DIR=<dir> npm run screenshot-visuals
```

`profile-check` loads an actual exported backup and asserts every field he
would notice is still there. Run it before shipping anything touching content,
storage or the merge. Keep real backups in the scratchpad, never in this repo.

`screenshot-visuals` exists because **rendering is not the same as being
right**. A diagram can paint every shape it was asked to and still teach the
wrong thing — the first physical-change diagram drew "before" and "after"
identically under a caption saying they differed, and passed everything. Look
at the pictures.

---

## How work is staged

Work proceeds one **phase** at a time from `docs/ROADMAP.md`, not as scattered
edits. Each phase is scoped to a single session, has explicit done-criteria,
and ends green and pushed. Use the `next-phase` skill to run one.

Branch: `claude/learningquest-eval-curriculum-1bgzlm`. Merge to `main` when a
phase is complete and green.

After any change that affects the app itself, republish the artifact — that is
the surface he actually uses:

```
Artifact url=https://claude.ai/code/artifact/f1d62d1b-15ab-49e1-a84f-541842a932a6
```

Same URL keeps the same origin, which is what keeps his progress.

---

## Architecture, briefly

- **Vite + React 18**, built to one self-contained HTML file by
  `scripts/build-singlefile.mjs`. Only external request is Google Fonts.
- **Content** is data, in `src/content/`. A day is
  `{id, tag, title, subtitle, pages[], recap[], quiz[], requires?}`.
  Blocks: `text | concept | example | callout | formula | visual | codelab | write | scale | slider | order`.
  Questions: `mc | numeric`, each needing a `hint` and an `explain`. (`tf` is
  retired — 116 of them went in Phase 2 and a test keeps the count at zero.)
- **Merging** happens in `src/content/index.js`. Depth days *append* to
  existing lanes; spiral callbacks, scale blocks and write prompts are
  injected there by day id so the original prose stays untouched.
- **Drills** are generators: shared helpers in `src/engine/drill-kit.js`,
  maths and science in `src/engine/drills.js`, English in `drills-language.js`,
  Connections and Teardowns in `drills-systems.js`.
  `{id, subj, day, name, gen(level)}` returns either `{prompt, answer, hint}`
  for a numeric answer or `{prompt, choices, answer, hint}` where `answer` is
  an index. Add `passage` for the text a question is about. `asQuestion()` is
  the only place a drill becomes a question — never write `type` by hand.
  Levels 1–3, rising on a streak and falling on a miss.
- **A generated question must not be guessable.** Tests measure how often the
  right option is the longest AND the shortest, against chance for the number
  of options. Fixing one direction tends to create the other; measure, do not
  reason about it. Minimum three choices, since a duel streak of six is what a
  readiness gate accepts as understanding.
- **Progress he can see never goes backwards.** `src/engine/meter.js`. The
  learner-facing bar is a function of days DONE alone, never of the catalogue
  size — appending content used to shrink it (his maths lane fell 82% → 47%
  across phases he had not even opened). The catalogue total belongs in the
  parent view only. A fall he causes by advancing is fine; a fall caused by
  shipping is not.
- **A diagram must use what it is given.** `src/engine/Visual.jsx`. A test
  reads each renderer, works out which `v.*` props it consults, and fails if a
  content block passes one that is ignored — `flow` drew a hardcoded
  programming flowchart on the water cycle day while its correct `steps` sat
  unread. That test cannot tell whether a picture is ABOUT the right thing, so
  after any visual change run `screenshot-visuals` and LOOK. A renderer that
  reads no props can only ever draw one picture; do not reuse one across days
  that are not about the same thing.
- **A diagram that moves is complete when it stops.** `src/engine/motion.js`.
  `stage` starts at the FINAL frame, so a diagram is whole without JavaScript
  and nothing is ever visible only mid-animation. Motion plays once on
  scroll-in and settles back. `prefers-reduced-motion: reduce` starts no
  timers at all. Declaring stages in `stageCount` is only half the job — the
  renderer must read `shown(i)`, and `npm run motion-check` fails if it does
  not.
- **Storage** is `src/store.js`, key `lq_v3`. `normalize()` fills fields added
  after an old save was written and migrates legacy keys additively.
