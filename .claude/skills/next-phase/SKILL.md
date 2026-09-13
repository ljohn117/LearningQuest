---
name: next-phase
description: Run the next phase of the LearningQuest build roadmap end to end — measure, build, verify in a real browser, push, republish, and update the roadmap. Use when asked to continue building, work the roadmap, do the next phase, or pick up where the last session left off.
---

# Run one roadmap phase

One phase per session. The point is a complete, verified, pushed increment —
not partial progress on three things.

## 1. Orient

Read `CLAUDE.md` and `docs/ROADMAP.md`. The status line at the top of the
roadmap says which phase is next. If the user named a different phase, do that
one instead and say so.

Check the tree is clean and on the right branch:

```bash
git status --short && git branch --show-current
```

## 2. Measure first

Every phase states the number it moves. Take that reading **before** building,
from the real data, not from memory or from this file. Examples:

```bash
# days with no visual
node -e "import('./src/content/index.js').then(c=>{let n=0,t=0;for(const s of c.SUBJECT_ORDER)for(const d of c.CURRICULUM[s].days){t++;if(!d.pages.some(p=>p.blocks.some(b=>b.type==='visual')))n++}console.log(n+' of '+t)})"

# true/false remaining
node -e "import('./src/content/index.js').then(c=>{let n=0;for(const s of c.SUBJECT_ORDER)for(const d of c.CURRICULUM[s].days)n+=(d.quiz||[]).filter(q=>q.type==='tf').length;console.log(n)})"

# drill coverage
node -e "Promise.all([import('./src/content/index.js'),import('./src/engine/drills.js')]).then(([c,d])=>{const a=[...d.MATH_DRILLS,...d.EXTRA_DRILLS];const k=new Set(a.map(x=>x.subj+':'+x.day));let n=0,t=0;for(const[s,l]of Object.entries(c.CURRICULUM))for(const y of l.days){t++;if(k.has(s+':'+y.id))n++}console.log(n+'/'+t)})"
```

Without a before-reading, the claim at the end of the phase is unverifiable.

## 3. Build only this phase

Stay inside the phase's stated scope. Adjacent improvements are real but they
are how a session ends with five half-finished things — write them under
**Deferred** in the roadmap and move on.

Before touching content, re-read the progress-key rules in `CLAUDE.md`. The
recurring, silent, unrecoverable mistakes in this codebase are all the same
shape: renaming a day id, a drill id or a write prompt id, or reordering a
`quiz` array. When in doubt, append; never insert or rename.

## 4. Verify — all four, every time

```bash
npm run check
npm run build && node scripts/build-singlefile.mjs
npm run smoke
npm run restore-check
```

`check` passing is not sufficient. `smoke` and `restore-check` drive a real
browser and catch what unit tests structurally cannot: a block that renders
nothing, a key that stops resolving, a crash on a real click. Both have caught
live bugs that `check` passed.

Add a regression test for whatever this phase established, so a later session
cannot quietly undo it. Freeze any new identifier that becomes a progress key.

**Two traps that have cost real time here:**
- Assertions against `innerText` are **case-sensitive**, and the app uppercases
  labels via CSS `text-transform`. Match case-insensitively or assert on body
  text that is not transformed.
- Node cannot parse `.jsx`. Anything the test suite needs to import belongs in
  a plain `.js` module.

## 5. Ship

```bash
git add -A && git commit          # say what changed and why it was wrong before
git push -u origin claude/learningquest-eval-curriculum-1bgzlm
git checkout main && git merge --ff-only claude/learningquest-eval-curriculum-1bgzlm
git push -u origin main && git checkout claude/learningquest-eval-curriculum-1bgzlm
```

Then republish the artifact — it is the surface he actually uses, and the same
URL keeps the same origin, which is what keeps his progress:

```
Artifact file_path=dist/learning-quest.html
         url=https://claude.ai/code/artifact/f1d62d1b-15ab-49e1-a84f-541842a932a6
```

## 6. Hand off

Update `docs/ROADMAP.md`: tick the phase, fill in the before → after number in
the status table, and move the status line to the next phase. This file is the
only thing that survives a context reset — if it is stale, the next session
starts by guessing.

Then report to the user in a few lines: what moved, the number it moved, what
you verified, and what is next. Never claim a phase is done if any
done-criterion is unmet — ship what is real and mark the phase partial.

## Never

- Never rename or renumber a day id, drill id or write prompt id.
- Never reorder, insert into, or delete from a day's `quiz` array.
- Never gate finishing a day on scoring well.
- Never make a wrong answer cost him anything.
- Never commit personal data — no school, name, age, or progress exports.
  Analyse real profiles in the scratchpad only.
