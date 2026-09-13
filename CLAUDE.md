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
- Days are **never** gated on scoring well. A low score still finishes a day.
  (The parent page surfaces weak days instead — see "Finished, but shaky".)

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
npm run check          # validate + 1,535 unit assertions + content audit
npm run build && node scripts/build-singlefile.mjs
npm run smoke          # real browser: dashboard, a duel, a write prompt
npm run restore-check  # real browser: Back up -> Restore across origins
```

`npm run check` alone is not enough. `smoke` and `restore-check` drive a real
browser and catch the class of bug unit tests structurally cannot see — a
block that renders nothing, a key that no longer resolves, a crash on a real
click. Both have caught live bugs that `check` passed.

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
  Blocks: `text | concept | example | callout | formula | visual | codelab | write | scale`.
  Questions: `mc | tf | numeric`, each needing a `hint` and an `explain`.
- **Merging** happens in `src/content/index.js`. Depth days *append* to
  existing lanes; spiral callbacks, scale blocks and write prompts are
  injected there by day id so the original prose stays untouched.
- **Drills** are generators in `src/engine/drills.js`:
  `{id, subj, day, name, gen(level)}` returning `{prompt, answer, hint}`.
  Levels 1–3, rising on a streak and falling on a miss.
- **Storage** is `src/store.js`, key `lq_v3`. `normalize()` fills fields added
  after an old save was written and migrates legacy keys additively.
