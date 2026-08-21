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
| Physical Science | 6 |
| Logic | 6 |
| Earth & Space | 6 |
| Biology | 6 |
| English & Writing | 6 |
| Government & Civics | 6 |
| Fossils & Deep Time | 6 |
| **Total** | **82** |

361 questions, every one with a hint and an explanation.

## The daily loop

Built to be opened after homework, every school day.

**Today's quest** composes the session: a short warm-up of questions drawn
from days already finished — mixed across lanes, unlabelled — then one new
lesson, rotating through whichever lanes have something unlocked.

The warm-up is what makes this last. 82 days is about 16 school weeks at one
a day; recycling finished work through spaced retrieval is what carries it
across a year, and it is better practice than re-reading anyway.

**Skill Duels** wrap the procedural drill generators in a battle. Questions
are generated fresh each time, so nothing can be memorised. The guardian has
no attack and deals no damage — a wrong answer fizzles and the next question
comes. Every duel is winnable; accuracy only changes the rank at the end.

**Companions** are earned by finishing a whole lane, never bought.

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

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server, port 5173 |
| `npm run build` | Production build |
| `npm run validate` | Check curriculum structure and answer keys |
| `npm run smoke` | Browser smoke test |

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
