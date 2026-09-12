# LearningQuest prototypes — technical evaluation

**Scope:** `/home/user/LearningQuest/prototypes/LearningQuest.jsx` (2055 lines) and `/home/user/LearningQuest/prototypes/LearningQuestExplore.jsx` (2064 lines). Both read in full. Repo contains nothing else but a 15-byte `README.md` and a `.gitignore` — no `package.json`, no build config, no tests, no lint config, single commit `e8fed07`.

**Target stated for the eventual product:** one upper-primary learner, curriculum-aligned.

---

## Executive summary

- **The content is aimed 2–5 grade levels above a 4th grader, and it says so in its own data.** `LearningQuest.jsx` tags its 16 math days `Grade 6–7` ×2, `Grade 7` ×2, `Grade 7–8` ×2, `Grade 8` ×3, `Algebra I` ×5. Day 10 is the Pythagorean theorem; Day 14 is graphing parabolas. Explore's concept glossary runs `Homeostasis`, `Permineralization`, `Taxonomy`, `Counterargument`, `Value-based pricing`. Flesch–Kincaid on Explore prose is grade 5.7–7.3. This is a solid middle-school course. Re-aiming it at upper-primary age is a **content rewrite, not a content edit** — and content is 52–65% of the bytes in these files.

- **The assessment engine is trivially defeatable and there is no pass threshold.** In Explore, 101 of 109 multiple-choice questions have the correct answer at index 0, and 28 of 32 true/false answers are `true`. A child who always taps the first option and always taps True scores **129/155 (83%)** without reading a word. In `LearningQuest.jsx` the same strategy scores 42%, but *either way they complete 100% of the course*, because `finishDay` (LearningQuest.jsx:1055) marks the day done and unlocks the next one at **any** score, including 0/5, and still pays the 20 XP `XP_BONUS`.

- **The two files are a hard fork of a common ancestor with more subjects than either one now has, and the fork is already rotting.** 654 engine lines are byte-identical duplicates; 384 lines exist only in Core, 147 only in Explore; 223 diff hunks overall. `LearningQuest.jsx`'s `Visual` component still carries 8 orphaned SVG cases (`atom`, `particles`, `branches`, `supplydemand`, `strata`, `machine`, `orbit`, `gravity`, lines 1211–1372) for subjects it no longer has. Its lesson prose references a **"Logic lane"** (:133) and an **"Earth & Space lane"** (:334) that exist in *neither* file. Explore's `ImportPanel` (:1956) offers to credit "lanes completed in the Core app" — naming `gov`, `biz`, `fossils`, none of which the Core app contains.

- **Streak tracking is broken for exactly the user this is for: a US kid studying after dinner.** `todayStr()` is `new Date().toISOString().slice(0,10)` — UTC (LearningQuest.jsx:996, Explore:1246). Simulated in `America/New_York`: study Mon 9pm then Tue 4pm — two genuinely consecutive days — and the streak **stays at 1**. Study twice on one Monday (4pm and 9pm) and the streak **jumps to 2**. Separately, `yesterday()` mixes local and UTC frames and returns a wrong value at exactly 2 hours per year (2026-03-08 19:00 ET, where `yesterday() === todayStr()`, and 2026-11-01 19:00 ET, where it skips a day) — both silently reset the streak.

- **`window.storage` has no fallback, and failure is silent.** Both `Store.load` and `Store.save` wrap everything in `try {} catch {}` with empty handlers (LearningQuest.jsx:28–46). Outside a Claude Artifact the app **boots and runs perfectly and never persists anything** — every reload is a fresh profile list, with no error, no warning, no console message. There is no migration path beyond a single legacy hop from `lq_progress`, and no schema version inside the payload.

- **Two things here are genuinely good and worth keeping.** The `CodeLab` (LearningQuest.jsx:1787) really executes JavaScript via `new Function('console', src)` against a captured logger and string-matches the expected output — it is a real REPL, not a fake terminal. And the 14 `DRILLS` generators (:1841–1856) are procedurally correct: I ran 3000 samples of each and found zero wrong answers and zero floating-point display artifacts. Both are small, self-contained, and portable.

- **`CodeLab` will hang the browser tab, and the curriculum teaches the input that does it.** `run()` blocks `while` and `do{` by regex but not `for(;;)`. Day c12 explicitly quizzes "A loop with no step instruction could run forever" and hands the child an editable `for` loop to modify. `for (let i = 1; i >= 1; i++) {}` freezes the page; the 200-log guard only fires if the loop actually logs.

- **Verdict: keep the shell, keep two subsystems, restart the content and the assessment layer.** The rendering/navigation/styling engine (~650 lines) is clean, coherent, and worth porting once into a shared module. The curriculum (~2100 lines across the two files) and the quiz engine's answer model are not reusable for a 4th grader. See [§8](#8-verdict).

---

## 1. What each app does

### 1.1 `LearningQuest.jsx` — "Core"

Screen flow, driven by a single `view` state object (`{name, …payload}`) in `App` (:1006):

```
Store.load() ──► ProfileSelect ──► Dashboard ──┬──► SubjectView ──► LessonView ──► QuizView ──► ResultsView ──┐
   (:1011)         (:1374)          (:1434)    │      (:1517)        (:1556)       (:1650)       (:1745)      │
                       │                       │                                                             │
                  "Try demo mode"              └──► PracticeHub ──► PracticeSession ──► PracticeResults ──────┘
                   (ephemeral)                      (:1859)          (:1909)             (:1969)
```

- **ProfileSelect** — list of named explorers with level/rank/XP, "+ New explorer", and "Try demo mode" (`startDemo`, :1037) which creates an in-memory profile that is never written to storage.
- **Dashboard** — rank + level + XP progress bar + streak flame; one card per subject with a completion bar; a "Practice Range / Skill Drills" card; footer row with Switch explorer / Change name / Reset progress (with a confirm step).
- **SubjectView** — vertical list of days. Each shows a numbered node, or a check if done, or a padlock if locked. Locked rows render at `opacity: .55` and swallow the click (`open && onDay(d)`, :1541).
- **LessonView** — paged reader. `totalPages = day.pages.length + 1`; the extra page is the `recap` checkpoint. Dot indicators at top, Back / Next at the bottom, final button reads `Start Challenge · {n} questions`.
- **QuizView** — one question per screen, `mc` / `tf` / `numeric`, optional penalty-free hint, then Check answer → reveal + `explain` → Next.
- **ResultsView** — medal, "Flawless!" / "So close to perfect!" / "Day complete!", XP badge, optional level-up banner.
- **Practice** — `PracticeHub` lists the drills unlocked by completed math days plus a "Mixed Review"; `PracticeSession` runs 8 procedurally generated numeric questions with a live in-a-row counter; `PracticeResults` awards 5 XP per correct and flags "Skill mastered" at a 5-answer streak.

### 1.2 `LearningQuestExplore.jsx` — "Explore"

Identical flow with the Practice branch deleted and replaced by an **ImportPanel** rendered inline in the Dashboard behind an "Already done a lane?" ghost button (:1440):

```
… Dashboard ──► ImportPanel (inline) ──► applyImport(items) ──► back to Dashboard
    (:1608)        (:1965)                    (:1324)
```

`applyImport` walks the selected lanes, writes `completed[key] = {best: quiz.length, total: quiz.length}` for every not-yet-done day, and adds the XP those days were worth. It skips days already complete, so it cannot double-pay.

### 1.3 How the two relate

**Not a variant, not a mode — a fork.** They are two independent single-file copies of a shared ancestor. There is no shared module, no import between them, no common package. They cannot run side by side as one app; they are two separate artifacts with two separate save files (`lq_profiles_v2` vs `lq_explore_v1`), so a child using both has two disjoint XP totals, two streaks, two profile lists.

**Drift, quantified:**

| Measure | Value |
|---|---|
| Total diff hunks (whole file) | 223 |
| Engine lines byte-identical in both | **654** |
| Engine lines only in Core | 384 (CodeLab, DRILLS, PracticeHub/Session/Results, 8 Visual cases, `lab*` styles) |
| Engine lines only in Explore | 147 (ImportPanel, IMPORTABLE, 6 Visual cases, `import*` styles) |
| Share of Core's engine that is duplicated | 61% |
| Share of Explore's engine that is duplicated | 78% |
| Curriculum lines | Core 926 (53–978) · Explore 1177 (52–1228) |
| Curriculum share of file bytes | Core 52% · Explore 65% |

**Evidence the ancestor had more subjects than either fork:**

| Artifact | Location | Points to |
|---|---|---|
| 8 orphaned `Visual` cases | LearningQuest.jsx:1211–1372 | Chemistry (`atom`,`particles`), Government (`branches`), Business (`supplydemand`), Fossils (`strata`), Functions (`machine`), Earth & Space (`orbit`,`gravity`) |
| Unused icon imports `Atom, Lightbulb, Globe2` | LearningQuest.jsx:3 | Science / Logic / Geography lanes |
| `"the Logic lane"` | LearningQuest.jsx:133 | A lane in **neither** file |
| `"the Earth & Space lane"` | LearningQuest.jsx:334 | A lane in **neither** file |
| `"the Business lane"` | LearningQuest.jsx:859 | Explore only |
| `"Math lane"`, `"your Math"`, `"Computer Science lane"` ×10 | Explore:73,204,275,601,701,788,793,888,949,1144 | Core only |
| `IMPORTABLE` "completed in the Core app" | Explore:1954–1960 | `gov`/`biz`/`fossils` — **not in the Core app** |

Net: **13 dangling cross-lane references** in shipped lesson copy. A child reading Core's Day 3 is told to recall a "working backward trick from the Logic lane" they can never have seen.

---

## 2. Architecture

### 2.1 State management — accurate characterization

The premise "single `App` with hoisted useState and deep prop drilling" is only half right. It is a **single container + module-level constants**, and prop drilling is shallow because of the second half.

`App` holds exactly four `useState` and one `useRef`:

```js
const [db, setDb]           = useState(null);   // { profiles: [], lastActive }   :1006
const [activeId, setActiveId] = useState(null);
const [demo, setDemo]       = useState(null);   // ephemeral profile, never saved
const [view, setView]       = useState({ name: 'dash' });
const firstSave             = useRef(true);     // skip the save on initial load  :1008
```

Everything else — `CURRICULUM`, `SUBJECT_ORDER`, `RANKS`, `DRILLS`, `IMPORTABLE`, `S` — is a module-level `const` that any component reads directly. That is why `SubjectView` needs only `subj`, not the whole curriculum, and why `LessonView` derives `accent` locally (`CURRICULUM[subj].accent`, :1557) instead of receiving it.

**Actual prop-drilling depth: 3 hops maximum, and only for `accent`:**
`App → LessonView(subj) → Block(accent) → Visual(accent) | CodeLab(accent)`.

Prop counts per screen: `Dashboard` 9 (:1434), `ResultsView` 7 (:1745), `SubjectView` 6 (:1517), `LessonView` 5 (:1556), `QuizView` 4 (:1650). Local state lives where it belongs — `QuizView` owns 6 pieces of question state, `PracticeSession` owns 8, `CodeLab` owns 3. Only `Dashboard`'s 3 (`confirm`, `editing`, `nameVal`) are pure UI toggles.

This is a reasonable, defensible design at this size. It is *not* the pathological hoisted-everything pattern. The real architectural problem is not the state model — it is that the whole model exists **twice**, in two files, with no shared module.

### 2.2 Component structure

18 top-level components in Core, 15 in Explore. Screens: `ProfileSelect`, `Dashboard`, `SubjectView`, `LessonView`, `QuizView`, `ResultsView`, plus Core's `PracticeHub`/`PracticeSession`/`PracticeResults` and Explore's `ImportPanel`. Primitives: `Shell`, `FontAndStyle`, `Block`, `Visual`, `Bar`, `Streak`, `BackBar`, `CodeLab`.

### 2.3 Data flow

Unidirectional. `App` computes `profile` (:1023) as `demo || db.profiles.find(p => p.id === activeId) || null`, derives `lvl` via `useMemo(() => levelInfo(profile?.xp ?? 0), [profile])`, and passes callbacks down. Every mutation funnels through one function:

```js
function updateProfile(fn) {
  if (demo) { setDemo((p) => fn(p)); return; }
  setDb((d) => ({ ...d, profiles: d.profiles.map((p) => (p.id === activeId ? fn(p) : p)) }));
}                                                                            // :1025
```

That single choke point is the cleanest thing in the codebase — demo mode falls out of it for free, and the auto-save effect (`useEffect(… , [db])`, :1017) hangs off it with no extra wiring.

### 2.4 Content / data model

```js
day = {
  id, tag, title, subtitle,
  pages: [{ title, blocks: [Block] }],
  recap: ['bullet', …],
  quiz:  [{ type: 'mc'|'tf'|'numeric', prompt, hint?, explain, … }],
}
```

Block types and their per-file usage:

| type | fields | Core uses | Explore uses | rendered at |
|---|---|--:|--:|---|
| `text` | `text` | 80 | 75 | :1626 |
| `concept` | `term`, `def` | 28 | 73 | :1627 |
| `example` | `text` | 26 | 33 | :1633 |
| `callout` | `text` | 28 | 36 | :1636 |
| `formula` | `text`, `label?` | 25 | 8 | :1639 |
| `visual` | `kind` + kind-specific | 9 | 9 | :1645 |
| `codelab` | `task`,`starter`,`expect`,`hint` | 6 | — | :1646 |

`Block` (:1624) is a flat if-chain returning `null` for anything unknown — an unrecognized `type` renders silently as nothing. `Explore`'s `Block` has the `codelab` arm removed (Explore:1746), correctly, since it has no codelab blocks.

### 2.5 `<Visual/>` — named SVG diagrams

`Visual({v, accent})` (:1176) is a 200-line if-chain keyed on `v.kind`. A `wrap(children, h)` helper emits `<svg viewBox="0 0 320 {h}" width="100%">` inside a bordered box, so every diagram is a fixed 320-unit coordinate space that scales to container width. Diagrams take the subject's `accent` colour and some take data (`v.a`, `v.b`, `v.left`, `v.right`, `v.rule`, `v.protons`). Several animate via the CSS keyframes injected by `FontAndStyle` (`drift`, `orbitSpin`).

**Cross-reference of names used vs. cases implemented:**

| File | `v.kind` values used in CURRICULUM | Cases implemented | Used-but-missing (would render blank) | Implemented-but-unused (dead) |
|---|---|---|---|---|
| Core | `bars`(3) `scale`(2) `graph` `rtriangle` `parabola` `flow` — **6 kinds, 9 blocks** | 14 | **none** | **8**: `atom`, `particles`, `branches`, `supplydemand`, `strata`, `machine`, `orbit`, `gravity` (:1211–1372, ~90 lines) |
| Explore | `cell` `punnett` `pyramid` `paragraph` `argument` `branches` `supplydemand` `funnel` `strata` — **9 kinds, 9 blocks** | 9 | **none** | **none** |

So: **no visual anywhere renders blank.** The defect is the opposite — Core carries ~90 lines of diagram code for subjects it deleted, including a `branches` diagram with `GOVERNMENT` hard-coded in the SVG text.

### 2.6 Styling

All inline. One module-level `S` object — 70 style keys in Core (:1986), 68 in Explore (:1997) — of plain JS objects spread into `style={{...S.foo, override}}`. Colour is threaded manually: `accent + '22'` for a 13% tint, `accent + '55'` for a border, `accent + '88'` for a focus ring. Dark palette is hard-coded (`#0c0e16` background, `#e7e9f0` text); no light mode, no theme tokens, no CSS variables.

The only real stylesheet is `FontAndStyle` (:1155), a `<style>` element carrying a Google Fonts `@import` (Bricolage Grotesque / DM Sans / JetBrains Mono), 6 `@keyframes`, and 4 utility classes (`.lq-rise` entrance, `.lq-tap` press-scale, `.lq-card` hover-lift).

Note `S` is declared with `const` at the **bottom** of the file but referenced by components defined above it. This is correct — the references are inside function bodies that run after module evaluation — but it is fragile-looking, and the `/* ---- 14. STYLES ---- */` marker sits at :1785 (Core) / :1953 (Explore), ~200 and ~44 lines above the object it labels.

### 2.7 Routing / navigation

Hand-rolled. `view` is a plain object; `App` renders each screen behind `view.name === '…'`. Payload rides on the object: `setView({ name: 'quiz', subj, day })`, `setView({ name: 'results', subj, day, correct, earned })`. No URL, no history, no deep links; the browser Back button exits the app. Every screen provides its own in-app back affordance (`BackBar` / `S.iconBtn`). For a kiosk-style kid app on a tablet this is defensible; for anything with a share link or a resume-where-I-left-off requirement it is not.

---

## 3. Completeness, feature by feature

| Feature | State | Notes |
|---|---|---|
| Profile create / select / switch | **Working** | No delete. Rename only from inside the active profile's Dashboard. |
| Demo mode | **Working** | Genuinely ephemeral — `setDemo` never touches `Store`. Banner + Exit at :1128. |
| Dashboard / rank / XP bar / streak | **Working** (streak logic wrong — §6) | |
| Subject list + progress bars | **Working** | |
| Day gating | **Working, coherent** | See §3.2 |
| Paged lesson reader + recap | **Working** | Polished: dot indicators, per-block staggered entrance animations. |
| Quiz `mc` | **Working** | Answer key is 73%/93% index-0 — §3.1 |
| Quiz `tf` | **Working** | 87%/88% `true` |
| Quiz `numeric` | **Working, brittle input** | §3.1 |
| Hints | **Working** | Penalty-free, toggle-to-show, reset per question (:1670). Copy at :1600 explicitly tells the child using one is "smart, not cheating." |
| Explanations | **Working** | Every one of the 289 questions across both files has an `explain`. |
| Results / level-up banner | **Working** | Level-up never shown after a practice session (§6). |
| XP / ranks | **Coherent but top rank unreachable** | §3.4 |
| Reset progress | **Partial** | Does not clear `practice` (§6). |
| `CodeLab` | **Real, unsafe** | §3.6 |
| `DRILLS` / Practice | **Complete and correct, math-only** | §3.5 |
| `ImportPanel` | **Functional but stale/harmful** | §3.7 |
| `Visual` | **Complete for what's used** | §2.5 |
| Persistence | **Artifact-only, fails silently** | §4 |
| Accessibility | **Absent** | 0 `aria-*`, 0 `role=`, 0 `tabIndex` in either file; 4 (Core) / 2 (Explore) interactive `<div onClick>` with no keyboard path. |

### 3.1 Quiz engine — types, hints, validation

All three declared types are handled. One expression does all validation:

```js
const checkCorrect = () => q.type === 'numeric'
  ? Math.abs(parseFloat(num) - q.answer) < 1e-9
  : picked === q.answer;                                    // LearningQuest.jsx:1659, Explore:1827
```

- **`mc`** — `picked` is the chosen index (number), `q.answer` is the index (number). `===` is type-safe. ✅
- **`tf`** — `picked` is set from `o.v` which is a literal `true`/`false` (:1698), `q.answer` is a boolean. `===` is type-safe. ✅ Note the guard `if (q.type !== 'numeric' && picked === null) return;` (:1663) correctly uses `=== null` rather than falsy, so `picked === false` still submits.
- **`numeric`** — epsilon compare at `1e-9`. I verified there is **no** floating-point failure in the shipped answer keys or in the 14 generators (3000 samples each). The `1e-9` tolerance is doing real work: it absorbs the `(p/100)*n` rounding in drill `dr2`.

**Where numeric validation is brittle:**

- `parseFloat` is the whole parser. `parseFloat("$1.50")` → `NaN` → marked wrong. `parseFloat("1.5 dollars")` → `1.5` → marked right. Inconsistent leniency.
- The input is `<input type="number">` (:1712), so most browsers refuse non-numeric characters outright — which turns `1/4` into `14`, not `NaN`. Explore's `f4` question **asks for `0.25` and prints "(Enter as a decimal.)"** — a 9-year-old who types `1/4` submits `14` and is told they are wrong. Explore:1152.
- Empty submit is guarded (`num.trim() === ''`, :1662), so no `NaN` crash path.
- **Enter key is inconsistent between the two quiz screens.** `QuizView` binds Enter to `submit()` only (:1714) — after reveal, Enter is dead and the child must click. `PracticeSession` binds Enter to both (`revealed ? next() : submit()`, :1948). The practice screen got the improvement; the main quiz screen — the one every child hits 134 or 155 times — did not. Classic copy-paste divergence.

**The real defect is not the comparator, it is the answer key.** Distribution of correct-answer positions:

| File | MC total | idx 0 | idx 1 | idx 2 | idx 3 | TF total | `true` | Tap-through score |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| Core | 59 | **43 (73%)** | 15 | 1 | 0 | 15 | **13 (87%)** | 56/134 = **42%** |
| Explore | 109 | **101 (93%)** | 7 | 1 | 0 | 32 | **28 (88%)** | 129/155 = **83%** |

"Tap-through" = always pick the first choice, always pick True, leave numerics blank. In Explore that scores 83% and completes every lesson. This is not a bug in the engine; it is a data problem that makes the engine's output meaningless.

Distractor quality reinforces it. `LearningQuest.jsx:698` — *"The four basic computer jobs are input, process, output, and:"* with choices `['storage', 'magic', 'guessing', 'sleeping']`. Explore:891 — *"Your price should at least cover your:"* with `['costs', 'wishes', "competitors' dreams", 'homework']`. Many items are answerable by elimination without knowing the material.

### 3.2 Day gating

```js
const isDayDone     = (subj, id)  => !!profile.completed[dayKey(subj, id)];       // :1048
const isDayUnlocked = (subj, idx) => idx === 0 || isDayDone(subj, CURRICULUM[subj].days[idx-1].id);  // :1049
```

Strictly linear per subject, first day always open, no cross-subject dependency. Coherent and correct. Two caveats:

1. The lock is enforced **only** in `SubjectView`'s click handler (`open && onDay(d)`, :1541). `App`'s view switch has no guard — not a child-exploitable path, but the invariant lives in the view layer instead of the model.
2. `isDayDone` reads `profile.completed[…]` with no optional chaining. A stored profile missing `completed` throws `TypeError` on the first Dashboard render, hard-crashing to a blank screen. `Store.load` validates only `Array.isArray(d.profiles)` (:1012) — no per-profile shape check.

**Unlocking ignores the score entirely.** `finishDay` writes `completed[key]` regardless of `correctCount`, so 0/5 unlocks the next day. There is no mastery threshold anywhere in either file.

### 3.3 Streak logic — **broken for US evening use**

```js
const todayStr = () => new Date().toISOString().slice(0, 10);                     // :996 / Explore:1246
function yesterday() { const d = new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }  // :997 / :1247
…
if (p.streak.last === t) {} else if (p.streak.last === yesterday()) count += 1; else count = 1;  // :1061, :1081, Explore:1311
```

`toISOString()` is UTC. Simulated in `America/New_York`:

| Scenario | Real behaviour | App behaviour |
|---|---|---|
| Mon 8pm, Tue 8pm, Wed 8pm ET | 3-day streak | ✅ 1 → 2 → 3 (works, because every session lands on a distinct UTC day) |
| Mon 4pm **and** Mon 9pm ET (one day, two sessions) | streak should stay 1 | ❌ **jumps to 2** — 4pm ET is `2026-04-06Z`, 9pm ET is `2026-04-07Z` |
| Mon 9pm ET, then Tue 4pm ET (two real days) | streak should be 2 | ❌ **stays at 1** — both land on `2026-04-07Z` |

The second and third rows are the common case. A child who does a lesson before dinner one day and after dinner the next gets no credit; a child who does two lessons in one evening gets double credit. For a product whose only retention mechanic is a flame icon, this is a headline defect.

`yesterday()` adds a second, rarer bug: it subtracts a day in **local** time then serializes in **UTC**, mixing frames. Scanning every hour of 2026 in `America/New_York` finds exactly 2 hours where `yesterday() + 1 day ≠ todayStr()`:

- `2026-03-08 19:00 ET` — `yesterday()` returns `2026-03-08`, **identical to `todayStr()`**, so the `else if` branch is unreachable and a legitimate consecutive day falls through to `count = 1`.
- `2026-11-01 19:00 ET` — `yesterday()` returns `2026-10-31`, skipping `2026-11-01` entirely, so a child who studied the previous day has their streak reset.

Correct implementation is local-date arithmetic (`d.getFullYear()/getMonth()/getDate()` formatted manually) plus a stored day-index difference rather than string equality.

### 3.4 XP and leveling

```js
const RANKS = [0 Cadet, 120 Explorer, 300 Investigator, 560 Scholar,
               900 Adept, 1320 Specialist, 1850 Master, 2500 Luminary];  // :983
const XP_CORRECT = 10, XP_BONUS = 20;                                     // :999
earned = correctCount * XP_CORRECT + XP_BONUS;                            // :1056
```

`levelInfo(xp)` (:989) scans for the highest threshold ≤ xp, returns `{level, rank, pct, nextAt, isMax}`, with a synthetic `+700` next-threshold past the top so the bar never divides by zero. Sound.

**Are all ranks reachable?**

| File | Days | Questions | Max XP, one perfect pass | Top rank reached |
|---|--:|--:|--:|---|
| Core | 28 | 134 | `134×10 + 28×20` = **1900** | Master (1850) — 7.7% into the bar toward Luminary |
| Explore | 36 | 155 | `155×10 + 36×20` = **2270** | Master (1850) — 65% toward Luminary |

**`Luminary` (2500) is unreachable in either app by completing all content perfectly.** It is only reachable by replaying — and replaying is unlimited: `finishDay` unconditionally does `xp: p.xp + earned` with no already-completed check (contrast `applyImport`, which *does* guard with `if (p.completed[key]) return`). A child can farm the same 5-question day for 70 XP indefinitely.

`XP_BONUS` is misnamed: it is a flat participation payment, granted at 0/5 as readily as at 5/5.

### 3.5 Practice / DRILLS (Core only) — **complete**

14 generators at :1841–1856, one per math day `m1`–`m14`. Each is `{id, day, name, gen}` where `gen()` returns `{prompt, answer, hint}` built from `rnd(a,b)` and `pickOne(arr)` (:1838–1839).

I executed all 14 generators 3000× each: **zero incorrect answers, zero floating-point display artifacts, zero negative-answer surprises.** Sample output:

```
dr1  Unit Rates            "3 notebooks cost $21. What does ONE notebook cost, in dollars?"  => 7
dr5  Variables Both Sides  "Solve 6x + 5 = 4x + 9. What is x?"                                => 2
dr10 Pythagorean Theorem   "A right triangle has legs 3 and 4. What is the hypotenuse?"       => 5
dr14 Quadratics            "For y = x² + 6, what is y when x = 2?"                            => 10
```

`dr5` is the cleverest — it constructs `ax + d = cx + ((a−c)x + d)` with `a > c` guaranteed, which has the unique intended solution rather than degenerating into an identity. `dr7` randomly alternates between two sub-forms.

Gaps, all minor: drills cover **math only** (12 CS days and 2 math checkpoint days have none, so the Dashboard's "every math skill you have unlocked" copy is accurate but the "Skill Drills" card sits above both subjects); `dr1` always yields whole-dollar answers, so it never rehearses the `$1.50` decimal case the lesson taught; drills print exponents as `2^4` rather than `2⁴`; `PracticeSession` shows `q.hint` as the post-answer explanation (:1957) because drills have no `explain` field, so a wrong answer gets a hint rather than a worked solution.

### 3.6 CodeLab (Core only) — **real execution, unsafe sandbox**

```js
if (/\bwhile\b|\bdo\s*\{/.test(src)) { … reject … }
const fake = { log: (...a) => { if (logs.length >= 200) throw new Error('Too much output…'); logs.push(…); } };
try { new Function('console', src)(fake); } catch (e) { error = e.message; }
setOut({ logs, error, pass: !error && logs.join('\n').trim() === String(b.expect).trim() });   // :1789–1804
```

**It genuinely runs the child's JavaScript.** `console` is shadowed by a captured logger, output is compared to `b.expect`, real syntax/runtime errors surface in the OUTPUT pane in red. Six exercises across days c10–c12 — hello-world, variables×math, `if`, `if/else`, a `for` loop, and a debug-this-loop task.

Three problems:

1. **Infinite `for` loops freeze the tab.** The regex blocks `while` and `do{` but not `for(;;)`. `for (let i = 1; i >= 1; i++) {}` hangs. The 200-log cap only trips if the loop logs. Day c12's own quiz answer is *"A loop with no step instruction could run forever"* (:800) and the same day hands the child an editable `for` loop to fix — the curriculum actively steers toward the freeze.
2. **The regex has false positives.** `console.log("take a while")` is rejected with *"Let's stick to for loops here."*
3. **`new Function` is not a sandbox.** The generated function closes over the real global scope: `window`, `document`, `fetch`, `localStorage` are all reachable. For a single child on their own device this is a self-inflicted-wound risk rather than a security one, but the code should not be described as sandboxed.

Also: CodeLab completion is **not persisted and awards no XP**. The 6 exercises are purely formative and invisible to progress. `showHint` has no way back to hidden (:1789, `setShowHint(true)` only) and survives Reset.

### 3.7 ImportPanel / IMPORTABLE (Explore only) — **functional, but stale and harmful**

`applyImport` (:1324) is correctly written — it skips already-completed days, computes XP from real quiz lengths, and merges immutably. Not a stub.

The problem is what it does and what it claims:

- The comment says *"credit lanes they already finished in the Core app"* (:1955) and the UI says *"Tick any lane completed in the Core app"* (:1969). **The Core app has no `gov`, `biz`, or `fossils` lanes** — its `SUBJECT_ORDER` is `['math','cs']`. The feature addresses a build that no longer exists.
- `biz` is imported as `only: ['b1'…'b6']` with the note *"the original 6"* — Explore's `biz` now has 12 days. Direct evidence the lane was extended after the import list was written, and the list was never revisited.
- One tap credits **18 days and 1140 XP — 50% of Explore's entire XP economy** — with zero learning, and cannot be undone (Reset wipes *all* progress, not just the import).
- The rows are `<div onClick>` (:1975) with a fake checkbox `<div>` — no `role="checkbox"`, no `aria-checked`, no keyboard access.

For a single-child product this is a large "skip the course" button sitting on the home screen. It should be deleted, not fixed.

---

## 4. Persistence

### 4.1 Mechanism

```js
const PROFILES_KEY = 'lq_profiles_v2';                    // Core :27   /  'lq_explore_v1'  Explore :26
const Store = {
  async load() {
    try { const r = await window.storage.get(PROFILES_KEY, false); if (r) return JSON.parse(r.value); } catch {}
    try { const old = await window.storage.get('lq_progress', false);        // legacy single-user hop
          if (old) { const s = JSON.parse(old.value);
            if (s && s.name) { const prof = {id:'p'+Date.now().toString(36), xp:0, completed:{}, streak:{count:0,last:null}, ...s};
                               return { profiles:[prof], lastActive: prof.id }; } } } catch {}
    return null;
  },
  async save(data) { try { await window.storage.set(PROFILES_KEY, JSON.stringify(data), false); } catch {} },
};                                                        // Core :28–47, Explore :27–48 — byte-identical but for the key
```

Load fires once (`useEffect(…, [])`, :1010). Save fires on every `db` change, with `firstSave` suppressing the write that would otherwise echo the load straight back (:1017–1021).

**Saved:** the whole `{profiles: [...], lastActive}` blob. Each profile: `{id, name, xp, completed: {"subj:dayId": {best, total}}, practice: {"drillId": {runs, bestStreak}}, streak: {count, last}, _leveledTo}`.

**Not saved:** anything about the `demo` profile; current `view` (always resumes at Dashboard); lesson page position; codelab source or completion; which hints were used; per-question responses (only the aggregate `best` survives, so there is no way to see *which* questions a child missed).

`_leveledTo` is a transient UI flag that gets persisted along with everything else — harmless, but it means the save file carries render state.

### 4.2 Outside a Claude Artifact

`window.storage` is Claude-Artifact-specific. In a plain browser (Vite dev server, static host, CRA) `window.storage` is `undefined`, so:

- `Store.load()` — `window.storage.get` throws `TypeError`, caught by the empty `catch {}`, falls to the legacy branch, throws again, caught again, `return null`. `App` then sets `{profiles: [], lastActive: null}` (:1012). **The app boots normally to the "Ready to explore?" screen.**
- `Store.save()` — throws, caught by `catch {}`, returns. **Silent no-op.**

Net: outside an Artifact the app is **fully functional and completely amnesiac**, with no error, no warning, no console output. A parent could use it for a week before noticing. This is the single most dangerous property of the file, because it fails in the direction of looking fine.

The header comment (:11–12) is honest about the coupling — *"the `Store` wrapper below is the ONLY Claude-specific code. Swap its two methods for localStorage / a backend when porting to Vite"* — and it is accurate: `window.storage` appears nowhere else in either file. The swap is genuinely a ~10-line change. But no fallback is shipped, and the empty `catch {}` blocks guarantee the failure is invisible.

### 4.3 Migration

There is exactly one migration: a legacy `lq_progress` single-user save → a one-element `profiles` array. That is it. Beyond it:

- No version field **inside** the payload — the version lives only in the key name (`_v2`, `_v1`), so a schema change requires a new key and abandons existing saves.
- No per-profile shape validation. `Store.load` checks `Array.isArray(d.profiles)` and nothing else. A profile missing `completed` crashes `isDayDone` (:1048) on the first Dashboard render.
- `practice` was added to `DEFAULT_STATE` (:1000) with no migration; the code survives only because every read-site defensively writes `p.practice || {}` (:1084, :1861). That pattern will not scale to the next field.
- **Explore clones the `lq_progress` migration verbatim** (:32–44) even though its subject namespace is completely different. A legacy Core save would be imported into Explore carrying `math:m1`-style completion keys that mean nothing there, plus its XP. Copy-paste rot.

### 4.4 Multi-profile

Works, with real gaps. Create ✅, list with per-profile level/rank/XP ✅, switch ✅ (via `exitToProfiles`, :1042), last-active remembered ✅, per-profile isolation ✅ (`updateProfile` maps by `activeId`), avatar colour cycles through 6 (`AV_COLORS[i % 6]`, :1377).

Missing: **no delete** — a mistyped name is permanent. **No rename from the list** — only from inside the active profile's Dashboard. **ID collision possible** — `'p' + Date.now().toString(36)` (:1032) collides if two profiles are created in the same millisecond (not reachable through the UI, but it is not a UUID). **`lastActive` is set to `null` on switch** (:1044) rather than preserved, so "switch explorer" and "sign out" are the same action.

---

## 5. Content inventory

### 5.1 Per-subject counts

| File | Subject | Days | Pages | Blocks | Quiz Qs | Recap bullets | Drills | CodeLabs | Prose words¹ | All words² |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Core | Mathematics | 16 | 58 | 122 | 84 | 48 | 14 | — | 2 354 | 5 431 |
| Core | Computer Science | 12 | 48 | 80 | 50 | 36 | 0 | 6 | 1 494 | 3 179 |
| | **Core total** | **28** | **106** | **202** | **134** | **84** | **14** | **6** | **3 848** | **8 610** |
| Explore | Biology | 6 | 24 | 43 | 27 | 18 | — | — | 784 | 1 612 |
| Explore | English & Writing | 6 | 24 | 42 | 25 | 18 | — | — | 784 | 1 591 |
| Explore | Government & Civics | 6 | 24 | 38 | 25 | 18 | — | — | 725 | 1 568 |
| Explore | Business & Money | 12 | 48 | 76 | 52 | 36 | — | — | 1 538 | 3 212 |
| Explore | Fossils & Deep Time | 6 | 24 | 35 | 26 | 18 | — | — | 676 | 1 504 |
| | **Explore total** | **36** | **144** | **234** | **155** | **108** | **0** | **0** | **4 507** | **9 487** |
| | **Grand total** | **64** | **250** | **436** | **289** | **192** | **14** | **6** | **8 355** | **18 097** |

¹ `text` + `example` + concept `def` only. ² adds `term`, `label`, `task`, quiz `prompt`/`hint`/`explain`, and recap bullets.

### 5.2 Shape

| | Pages per lesson | Quiz questions per lesson |
|---|---|---|
| Core | 3 (×8), 4 (×18), 5 (×2) | 4 (×10), 5 (×16), 7 (×2 — the checkpoints) |
| Explore | 4 (×36) — perfectly uniform | 4 (×25), 5 (×11) |

Core's math lane has two dedicated `Checkpoint` review days (`mr1` after day 7, `mr2` after day 14) with 5 pages and 7 review questions each. Explore has no checkpoints — its uniform 4-page shape suggests it was generated more mechanically.

### 5.3 Question-type mix

| File | `mc` | `tf` | `numeric` |
|---|--:|--:|--:|
| Core | 59 (44%) | 15 (11%) | **60 (45%)** |
| Explore | **109 (70%)** | 32 (21%) | 14 (9%) |

Core's math lane is genuinely constructed-response. Explore is 91% recognition, which is what makes its 83% tap-through score possible.

### 5.4 Is the content real?

**Yes — this is real, sequenced, cross-referenced instruction, not lorem ipsum.** Concretely:

- **Every one of the 289 questions has an `explain`**, and 288 have a `hint`. No `TODO`, no placeholder, no `Lorem`.
- **The sequencing is deliberate and deliberately signposted.** Math Day 9 (square roots) is explicitly framed as the prerequisite for Day 10 (Pythagorean theorem): *"Two days ago: square roots. One day ago: nothing — you were ready. Today: a 2,500-year-old theorem you can actually use."* (:271). Day 6 ties slope back to Day 1's unit rate. The `mr1` checkpoint spends five pages showing that ratio → unit rate → proportion → slope are one idea in four costumes (:494–520).
- **Analogies are chosen, not generic.** *"A vending machine is a function: press B4, you always get the same snack"* (:895). *"An equation is a balance scale"* with a matching SVG. Biology's *"Every breath you take is one half of a cycle you are permanently part of"* (Explore:141). Fossils' deep-time-as-one-year: *"Humans? The last 30 minutes of December 31st"* (Explore:1160).
- **The voice is consistently encouraging without being saccharine**, and the app addresses the child by name in the recap and results screens (:1600, :1757).

**But.** Three things undercut it:

1. **13 dangling cross-lane references** (§1.3) point at subjects that do not exist in the running app.
2. **The prose does the teaching; the questions do not check it.** With 93% of Explore's MC answers at index 0 (§3.1), the assessment layer validates nothing.
3. **The reading level and grade level are wrong for the stated target.**

### 5.5 Reading level and target age

| Subject | Flesch–Kincaid grade | Words/sentence | Declared tags |
|---|--:|--:|---|
| Mathematics | 1.9¹ | 11.2 | `Grade 6–7` ×2, `Grade 7` ×2, `Grade 7–8` ×2, `Grade 8` ×3, `Algebra I` ×5, `Checkpoint` ×2 |
| Computer Science | 4.8 | 11.0 | `CS` ×6, `Coding` ×3, `Live Code` ×3 |
| Biology | 7.3 | 12.1 | `Life Science` ×4, `Genetics`, `Ecology` |
| English & Writing | 6.7 | 11.2 | `Grammar`, `Reading` ×2, `Literature`, `Writing` ×2 |
| Fossils & Deep Time | 6.7 | 12.5 | `Paleontology` ×3, `Geology` ×3 |
| Government & Civics | 6.5 | 11.7 | `Civics` ×6 |
| Business & Money | 5.7 | 11.8 | `Economics` ×2, `Business` ×3, `Money`, `Entrepreneurship` ×3, `Marketing` ×3 |

¹ Math's F-K is an artifact — the prose is dense with symbols (`2x`, `=`, `11`, `→`) that score as one-syllable words. Read the actual sentences and it sits with the rest.

Sentence length (11–12 words) is fine for grade 4. **Vocabulary is the gate**, and it is a middle-school gate: `homeostasis`, `permineralization`, `taxonomy`, `cellular respiration`, `superposition`, `federalism`, `counterargument`, `personification`, `opportunity cost`, `value-based pricing`, `differentiation`, `positioning`, `equilibrium`, `hypotenuse`, `coefficient`, `distributive property`.

**The most reliable signal is the data's own labels.** `LearningQuest.jsx` never claims to be for a 4th grader — it tags its math days grade 6 through Algebra I. **Written for roughly ages 11–14.** A 9–10 year old would be blocked on Core's math lane by Day 3 (two-step equations) at the latest, and would find Explore's biology, ELA, and civics reachable only with an adult reading alongside.

Explore is the closer of the two — 4th-grade science standards do cover food webs and fossil layers, and 4th-grade ELA does cover main idea and figurative language — but the *treatment* is pitched to a middle-schooler.

### 5.6 Content-to-engine ratio

| | Curriculum lines | Engine lines | Content % (lines) | Content % (bytes) |
|---|--:|--:|--:|--:|
| `LearningQuest.jsx` | 926 (53–978) | 1129 | 45% | **52%** |
| `LearningQuestExplore.jsx` | 1177 (52–1228) | 887 | 57% | **65%** |
| Combined | 2103 | 2016 | 51% | 58% |

By line count it looks like an even split. **By judgment the ratio is worse than that**, because the "engine" figure counts 654 lines that are a verbatim duplicate of the other file — the amount of *distinct* engine is about 1185 lines total (654 shared + 384 + 147), against 2103 lines of content. So the honest ratio is closer to **64% content / 36% distinct engine**.

That is the good news and the bad news in one number. Most of the investment is in words, not machinery — and the words are the part that needs to be thrown away for a 4th grader.

---

## 6. Bugs, dead code, duplication

Severity: **H** = affects correctness of what the child sees or earns · **M** = wrong behaviour, contained · **L** = hygiene.

| # | Sev | Location | Issue | How it breaks |
|---|---|---|---|---|
| 1 | **H** | `LearningQuest.jsx:996-997`, `Explore:1246-1247` | `todayStr`/`yesterday` use `toISOString()` (UTC) | Mon 9pm ET + Tue 4pm ET → streak stuck at 1. Mon 4pm + Mon 9pm ET → streak jumps to 2. §3.3 |
| 2 | **H** | `LearningQuest.jsx:997`, `Explore:1247` | `yesterday()` subtracts in local time, serializes in UTC | 2 hours/year where `yesterday() === todayStr()` (2026-03-08 19:00 ET) or skips a day (2026-11-01 19:00 ET) → streak silently resets |
| 3 | **H** | CURRICULUM data, both files | 93% (Explore) / 73% (Core) of MC answers at index 0; 88%/87% of TF are `true` | Tap-through scores 83% in Explore with zero reading. §3.1 |
| 4 | **H** | `LearningQuest.jsx:1055-1071`, `Explore:1305-1321` | `finishDay` marks the day complete and unlocks the next at any score, incl. 0/5, and always pays `XP_BONUS` | No mastery gate anywhere; a child can fail-forward through all of Algebra I |
| 5 | **H** | `LearningQuest.jsx:1056` | Replaying a completed day re-awards full XP, unbounded (contrast `applyImport`, which guards) | Unlimited XP farm — 70 XP per replay of a 5-question day |
| 6 | **H** | `LearningQuest.jsx:1789-1791` | CodeLab blocks `while`/`do{` but not `for(;;)`; 200-log cap only fires if the loop logs | `for (let i=1; i>=1; i++) {}` freezes the tab. Day c12 teaches exactly this failure mode and hands the child an editable `for` loop |
| 7 | **H** | `LearningQuest.jsx:28-46`, `Explore:27-48` | Every `window.storage` call wrapped in `try {} catch {}` with empty handlers | Outside a Claude Artifact the app runs perfectly and persists nothing, with no error. §4.2 |
| 8 | **H** | `Explore:1954-1960, 1965-1998` | `ImportPanel` credits 18 days / 1140 XP (50% of the XP economy) in one tap, references a "Core app" that has none of those lanes, and `biz` `only:[b1..b6]` is stale (biz is now 12 days) | Skip-the-course button on the home screen; irreversible short of a full reset |
| 9 | **M** | `LearningQuest.jsx:133, 334, 859` | Lesson prose cites a "Logic lane" and "Earth & Space lane" that exist in neither file, and a "Business lane" that is in the other file | Child is told to recall content they can never have seen |
| 10 | **M** | `Explore:73, 204, 275, 601, 701, 788, 793, 888, 949, 1144` | 10 references to "Math lane" / "Computer Science lane" / "your Math" — Core-only subjects | Same |
| 11 | **M** | `LearningQuest.jsx:1048`, `Explore:1298` | `profile.completed[…]` with no optional chaining; `Store.load` (:1012) validates only `Array.isArray(d.profiles)` | A profile missing `completed` throws `TypeError` on first Dashboard render → blank screen, no recovery path |
| 12 | **M** | `LearningQuest.jsx:1113` | `onReset` clears `xp`, `completed`, `streak`, `_leveledTo` — **not `practice`** | After reset, PracticeHub shows 0 unlocked but stale run counts/best streaks linger in storage |
| 13 | **M** | `LearningQuest.jsx:1714` vs `:1948` | `QuizView` binds Enter to `submit()` only; `PracticeSession` binds it to `revealed ? next() : submit()` | The fix landed on the screen used 8× per session, not the one used 134× per course. Explore inherited the un-fixed copy |
| 14 | **M** | `LearningQuest.jsx:1659`, `Explore:1827` | Numeric validation is bare `parseFloat` | `"$1.50"` → `NaN` → wrong; `"1.5 dollars"` → `1.5` → right. With `type="number"`, `1/4` becomes `14` — and `Explore:1152` explicitly asks for `0.25` |
| 15 | **M** | `LearningQuest.jsx:1929` | `setBestStreak` called **inside** the `setStreak` updater | Updater functions must be pure. Idempotent here (`Math.max`) so it survives StrictMode double-invocation by luck, not design |
| 16 | **M** | `LearningQuest.jsx:1969-1982` | `PracticeResults` never reads `leveledTo` | Levelling up during practice is silent, unlike after a lesson |
| 17 | **M** | `RANKS` :983 / :1233 both files | Max XP on one perfect pass is 1900 (Core) / 2270 (Explore); `Luminary` needs 2500 | Top rank unreachable without grinding replays |
| 18 | **M** | `Explore:32-44` | Legacy `lq_progress` migration cloned verbatim into a file with a completely different subject namespace | A Core-era save imports `math:m1`-style keys plus its XP into Explore |
| 19 | **M** | Both files | 0 `aria-*`, 0 `role=`, 0 `tabIndex`; 4 (Core) / 2 (Explore) interactive `<div onClick>` — `S.subjCard`, `S.dayCard`, `S.importRow` | No keyboard path, no screen-reader semantics for primary navigation |
| 20 | **L** | `LearningQuest.jsx:1211-1372` | 8 orphaned `Visual` cases (`atom`, `particles`, `branches`, `supplydemand`, `strata`, `machine`, `orbit`, `gravity`), ~90 lines, one with `GOVERNMENT` hard-coded | Dead code |
| 21 | **L** | `LearningQuest.jsx:3` | `Atom`, `Lightbulb`, `Globe2` imported, never used | Dead imports |
| 22 | **L** | `LearningQuest.jsx:1182` | `Row` destructures a `max` prop that is never used | Dead param |
| 23 | **L** | `LearningQuest.jsx:1182, 1230` | `Row` and `Box` components **defined inside** `Visual`'s render → new identity every render. `branches` (:1281) does it correctly by calling `Box(...)` as a plain function | Inconsistent, remounts static SVG subtrees |
| 24 | **L** | `LearningQuest.jsx:1785`, `Explore:1953` | `/* ---- 14. STYLES ---- */` sits ~200 / ~44 lines above the `S` object it labels, immediately followed by unrelated code | Misleading navigation marker in both |
| 25 | **L** | `LearningQuest.jsx:1911` vs `:1978` | `TOTAL = 8` but `PracticeResults` hard-codes `"{correct} of 8 correct"` | Changing `TOTAL` silently desyncs the copy |
| 26 | **L** | `LearningQuest.jsx:1957` | Practice feedback renders `q.hint` as the explanation (drills have no `explain`) | Wrong answers get a hint, not a worked solution |
| 27 | **L** | `LearningQuest.jsx:1789` | CodeLab `showHint` is one-way (`setShowHint(true)`), survives Reset | Minor UX |
| 28 | **L** | `LearningQuest.jsx:1789` | `/\bwhile\b/` matches inside string literals | `console.log("take a while")` rejected with a confusing message |
| 29 | **L** | `LearningQuest.jsx:1032`, `Explore:1282` | Profile id is `'p' + Date.now().toString(36)` | Collides in the same millisecond (not UI-reachable, but not a UUID) |
| 30 | **L** | `LearningQuest.jsx:1437` | `Dashboard`'s `nameVal` initialised once from `state.name` | Stale if `state.name` changes without a remount (currently unreachable) |
| 31 | **L** | Both files | `_leveledTo` — pure render state — is written into the persisted profile | Save file carries UI state |
| 32 | **L** | `LearningQuest.jsx:1011` | `Store.load().then(setDb)` with no abort/cleanup | `setState` after unmount if the promise outlives the mount |
| 33 | **L** | `LearningQuest.jsx:1017-1021` | `Store.save` is fire-and-forget with no queue or ordering guarantee | Two rapid `db` updates can interleave writes; low practical risk, no error surfacing either way |
| 34 | **L** | Both files | Index keys in `.map` for `blocks`, page dots, SVG children | Harmless (static arrays), but `key={page}` / `key={i}` on containers is *deliberate* and correct for retriggering entrance animations — the pattern is inconsistent rather than wrong |
| 35 | **L** | Both files | `const S = {…}` declared at the bottom, referenced by components above | Correct (function-scope deferral) but fragile-looking |

**No `useEffect` dependency bugs found.** Both effects are correct: `[]` for the one-shot load, `[db]` for the save with a `useRef` guard against the initial echo. `useMemo` deps are correct in both (`[profile]` for `lvl`, `[drillId, profile]` for the drill pool — over-broad but not wrong).

**No crash paths found beyond #11.** `q` is never undefined (every day has ≥4 questions), `cur` is never dereferenced when `isRecap`, `pool` has a `[DRILLS[0]]` fallback (:1915), and `Visual` returns `null` rather than throwing on an unknown kind.

### Duplication summary

The 654 byte-identical engine lines mean **every fix must be applied twice**, and #13 is proof that this is already failing in practice. Also duplicated verbatim: the entire `Store` wrapper, `RANKS`/`levelInfo`/`todayStr`/`yesterday`/`dayKey`, `App`'s state and effects, `Shell`, `FontAndStyle` (including all 6 keyframes), `ProfileSelect`, `SubjectView`, `LessonView`, `Block`, `QuizView`, `ResultsView`, `Bar`, `Streak`, `BackBar`, and 62 of the ~70 `S` keys.

---

## 7. What is genuinely good

Stated plainly so the verdict below is not read as dismissal:

- **The visual design is well above prototype grade.** Coherent dark palette, three purposeful typefaces, staggered entrance animations, a flickering streak flame, per-subject accent colour threaded consistently through borders/tints/progress bars. It reads as a shipped product.
- **The 14 SVG diagrams that are used are hand-built, on-topic, and correct** — a balance scale that renders the actual equation, a Punnett square with the 3:1 ratio shaded, an energy pyramid with real percentages, a rock-strata stack labelled older/younger.
- **The `DRILLS` generators are correct.** 42 000 sampled generations, zero errors.
- **`CodeLab` really executes code.** That is a meaningfully harder thing to build than a fake terminal, and it works.
- **`updateProfile` as a single mutation choke point** is the right abstraction, and demo mode falls out of it for free.
- **The pedagogical sequencing and cross-referencing in the math lane is the best thing in the repo** — Day 9 → Day 10, Day 1 → Day 6, and the two `Checkpoint` days that explicitly tie the strands together. Whoever wrote that understood curriculum design.

---

## 8. Verdict

**Keep the shell. Keep two subsystems. Restart the content and the assessment model.**

This is not a prototype to delete and it is not a foundation to build on unchanged. It is a well-made piece of work aimed at a different child than the one it now has to serve.

### The argument

The decisive fact is that **content is 58% of the bytes and ~64% of the distinct code, and the content is wrong for the target.** `LearningQuest.jsx` labels its own math days `Grade 6–7` through `Algebra I`. You cannot edit a 4th-grade course out of an Algebra I course — the sequence, the vocabulary, the worked examples, and all 289 questions were built for an 11–14 year old. Explore is closer, but its treatment is still middle-school.

The second decisive fact is that **the assessment layer does not assess.** With 93% of Explore's multiple-choice answers at index 0, 88% of true/false at `true`, and `finishDay` unlocking the next day at 0/5, a child can complete the entire course by tapping the top option. The XP, the ranks, the completion bars, and the streak are all downstream of a signal that carries no information. This is not a bug to patch; the answer keys and the progression rule both have to be rebuilt.

The third fact cuts the other way: **the engine is fine.** ~650 lines of rendering, navigation, and styling that are clean, readable, coherent, and — with the `Store` swap the header comment already anticipates — portable in an afternoon. There is no reason to rewrite `LessonView`, `Block`, `Bar`, `Streak`, `Shell`, or the `S` palette.

### If you build on it

1. **Merge the fork first, before anything else.** One repo, one `package.json`, extract the 654 duplicated lines into shared modules (`engine/`, `store/`, `styles/`), and reduce each app to a curriculum file plus a config. Bug #13 already shows the two copies diverging; every day this waits doubles the cost of every fix.
2. **Replace `Store`** with a `localStorage` implementation behind the same two-method interface, **and make failure loud** — no empty `catch {}`. Add a `version` field inside the payload and a real migration function, plus per-profile shape validation to close #11.
3. **Fix the date helpers** (#1, #2) with local-date arithmetic. Test in `America/New_York` at 7pm, and across both DST boundaries.
4. **Rewrite the progression rule.** A mastery threshold (e.g. ≥ 4/5 to unlock), reduced XP on replay, and a `Luminary` threshold that is actually reachable (#4, #5, #17).
5. **Rewrite the curriculum for grade 4.** Multiplication/division fluency, fractions, area and perimeter, place value to 1 000 000 — not two-step equations. This is the bulk of the work and it is the reason the honest answer is "partial restart."
6. **Rewrite the answer keys.** Randomize correct-choice position, balance true/false, and shift the mix toward constructed response — Core's math lane already shows this is possible at 45% numeric.
7. **Delete `ImportPanel`** (#8) and the 8 orphaned `Visual` cases (#20), and fix the 13 dangling lane references (#9, #10).
8. **Either sandbox `CodeLab` in a Worker with a hard timeout, or cut it.** As shipped it freezes the tab on the exact input its own lesson teaches (#6). It is also almost certainly out of scope for a 9-year-old.
9. **Add keyboard and screen-reader support** (#19) before this is used in any school setting.

### If you restart

You would still copy across, near-verbatim: the `S` palette and `FontAndStyle`, `Shell`/`Bar`/`Streak`/`BackBar`, `Block` and the block-type model, the `day = {id, tag, title, subtitle, pages, recap, quiz}` schema, the `<Visual/>` pattern with the 9 diagrams that survive, `updateProfile` as the single mutation choke point, and the `DRILLS` generator interface (`{id, day, name, gen}`) which is genuinely good design even though all 14 current generators target the wrong grade.

That is roughly 700–900 lines you would keep — which is to say, **restarting and building-on converge on the same work.** The difference is only whether you carry the 2100 lines of middle-school curriculum along while you do it. Given that the curriculum is the single largest asset here and also the single thing that is definitively wrong for a 9-year-old, the cleaner framing is:

> **Harvest the engine into a shared library. Treat the curriculum as a reference for tone, sequencing craft, and cross-referencing technique — which are excellent — and write new content against 4th-grade standards. Rebuild the assessment layer from scratch, because the current one cannot tell whether the child learned anything.**
