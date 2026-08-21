# Learning Quest

A gamified, self-hosted learning app — seven subject lanes, paged lessons,
quizzes with penalty-free hints, generated practice drills, and a live
JavaScript sandbox.

**Setup:** see [SETUP.md](SETUP.md) — or `bash scripts/setup-mac.sh`, then
`npm run dev`.

## Subjects

| Lane | Days |
|---|---|
| Mathematics | 16 |
| Computer Science | 12 |
| Business & Money | 12 |
| Biology | 6 |
| English & Writing | 6 |
| Government & Civics | 6 |
| Fossils & Deep Time | 6 |
| **Total** | **64** |

## Design rules

These are deliberate and load-bearing. See `docs/who-this-is-for.md`.

- **Consequence-free.** Wrong answers cost nothing, every question has a
  hint, nothing is ever lost.
- **Middle-school band.** Not grade level, not high-school prep.
- **One new idea per page.**
- **The spiral.** Lanes call back to each other on purpose — binary is
  powers of two from math, profit is an algebra expression, Punnett squares
  are ratios. That recognition is the point.
- **Checkpoints connect, they don't re-teach.**

## Layout

```
src/content/    curriculum data, one module per app of origin
src/engine/     progress rules, styles, SVG visuals, all screens
src/store.js    localStorage persistence
src/App.jsx     shell and navigation
prototypes/     the original single-file Claude artifacts
docs/           evaluation, curriculum research, roadmap, decisions
```

## Day IDs are load-bearing

Progress is keyed `subjectId:dayId`. **Never renumber or reuse a day id** —
it silently erases completed work. All 64 ids are unique across the merge.
