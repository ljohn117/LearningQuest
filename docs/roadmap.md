# LearningQuest — Staged Product Roadmap

**Scope:** synthesis only. No code written or changed. Sourced entirely from `docs/eval-apps.md` (technical evaluation of the two prototypes) and `docs/curriculum-requirements.md` (curriculum/design requirements), both read in full and treated as settled research — this document sequences their findings into a build plan, it does not re-open them.

**Citations:** `eval-apps.md §_` and `curriculum-requirements.md §_`, referenced as `eval` / `curric` after first use in a section. Bug numbers refer to `eval` §6's numbered table; the ten build items referenced as `curric §9 item N` refer to §9's ranked list.

**Effort key:** S = hours to ~1 day of focused work · M = 2–5 focused days · L = 1–3+ focused weeks, content-authoring items may run longer. These are effort-equivalent, not calendar time — solo spare-time pacing (a few hours/week) will typically stretch S→a week, M→3–6 weeks, L→2–4 months of calendar time. Plan the school-year budget (curric §5.3: ~30 school weeks / ~37 hours of practice time before the AASA) against calendar time, not effort time.

---

## Framing: what "keep the content" actually means once you reconcile it

The existing prototype content is being kept, not discarded — but it is not the spine of this product, because it was never really in contention for that role. `eval-apps.md` §1 and §5.5 found `LearningQuest.jsx` tags its own math days Grade 6–8 through Algebra I (Flesch–Kincaid reading level aside — the *vocabulary* is the gate: hypotenuse, coefficient, distributive property) and `LearningQuestExplore.jsx` sits at FKGL 5.7–7.3 with vocabulary like *homeostasis* and *counterargument*. Separately, `curriculum-requirements.md` §2.5 established that the target was never one grade band to begin with: Madison Traditional Academy teaches Grade 5 math content in class (Reveal Math, one year of acceleration) while the AASA tests Grade 4 standards each spring — so the real target is a Grade 4–5 band, tagged by Arizona standard code rather than by grade label so one engine can serve both the test and the classwork (`curric` §9 item 1). The reconciliation is arithmetic, not opinion: even measured against the *more advanced* of the two real targets — Grade 5 classwork — the existing content is still one to three years too advanced. "Keep it and ship it as-is" was never viable, independent of whether the earlier "rewrite everything" framing was right either.

So this roadmap does neither extreme. It treats the existing **engine** as reusable infrastructure — the ~650 shared rendering/navigation/styling lines, the `day → pages → blocks → quiz` content schema, the `Visual` SVG diagram pattern, the `DRILLS` procedural-generator pattern (verified correct across 42,000 sampled generations), and `updateProfile` as the single mutation choke point all survive per `eval` §7–§8. It treats the existing **prose** as a design reference — `eval` §7 calls the math lane's sequencing and cross-referencing "the best thing in the repo." And it treats the existing **lesson/quiz content itself** — ~18,000 words, 289 questions, 64 days across both files (`eval` §5.1) — as a second, parallel enrichment track: not what a Grade 4/5 child works through toward the AASA, but what they graduate into once the actual Grade 4/5 core exists and, given MTA's accelerated trajectory, plausibly will need before long anyway. New content, authored specifically for the Grade 4/5 band and tagged by Arizona standard code, becomes the spine. The existing content becomes the payoff at the far end, not the starting point — and per Stage 0 below, it gets repaired (unbiased answer keys, no dangling references, no tab-hanging code) before it's handed to the child as enrichment, because "kept" should not mean "kept broken."

---

## Stage overview

| Stage | Goal | Key items | Effort | Depends on |
|---|---|---|---|---|
| **0 — Foundation & de-risking** | Merge the fork, fix load-bearing engine bugs, decide the hosting target, prep the codebase to receive new content | Merge fork; real persistence; date/streak fix; mastery-gate stopgap; answer-key rebalance; delete ImportPanel; CodeLab safety; standards-tagged schema; FKGL/shell-token infra | ~2–3 wk combined | Nothing — this is the root |
| **1 — Core content: Math (Gr 4/5)** | Author the Grade 4 (AASA) + Grade 5 (classwork) math spine, standards-tagged, ordered by AASA blueprint weight | NBT/OA (mult-comparison, area models, partial quotients); NF (equivalence, comparison, number line, decimals); thin MD/G slice | L, ~4–8 wk | Stage 0 (all engineering items) |
| **2 — Core content: Reading & Language (Gr 4)** | Author the Grade 4 reading/language spine; build the text-evidence interaction | RL/RI text-evidence, main idea; morphology (roots/affixes); L.1/L.2 grammar; W.1/W.2/W.9 writing | L, ~3–6 wk | Stage 0. **Not** on Stage 1 — parallelizable with it |
| **3 — Pedagogy & assessment engine** | Replace the stopgap mechanics with the real mastery graph, feedback ladder, interleaving, and spacing the research calls for | Standards-keyed mastery graph w/ decay; elaborated-feedback ladder + error taxonomy; interleaved warm-up; spaced scheduler; mult/div workspace; fraction number-line widget; fact-fluency drill; word-problem engine | L, ~3–6 wk | Stage 1 and/or 2 (needs real tagged content to build against) |
| **4 — Polish, accessibility & shell compliance** | Close-out audit against the non-negotiable shell constraints across the finished surface | Keyboard/screen-reader pass; 7:1 contrast audit; touch-target audit; FKGL read-aloud pass; session-timer tuning; reward-copy audit; delete-all-data control | M, ~1–2 wk | Stages 1–3 substantially built (auditing a surface that doesn't exist yet is wasted motion) |
| **5 — Stretch / deferred** | Activate the existing content as enrichment; pick up everything explicitly deprioritized | Enrichment-track UI; CodeLab rehab if deferred; geometry depth; SL content; audio recording; Grade 5 depth beyond core | S–M, ~1–2 wk | Stage 0 (repairs) for the content; otherwise independent |

---

## Stage 0 — Foundation & de-risking

### 0.1 Decisions & verification (no code)

These come from `curric` §9 "What to verify before you start building" and the scope question the user has not yet settled. None of them block starting Stage 0.2's engineering, but each has a "needed by" point after which proceeding without an answer means real rework.

| # | Item | Source | Needed by |
|---|---|---|---|
| 1 | **Which math track is the child actually taught in** — ask the teacher directly whether report-card assessment is Grade 4 or Grade 5 material | `curric` §2.5, §9 checklist item 1 — *"Everything downstream depends on the answer"* | Before Stage 1's Grade-5-content half is authored (not before Stage 1 starts — the Grade 4 half is needed either way) |
| 2 | **Correct the Essential-Standards ⭐ markers** — open the two ADE PDFs (`Math Grade 4 Final 2025.pdf`, `4th Grade ELA Essential and Related Standards.pdf`) and verify curric's reconstructed priority list | `curric` §5.4 — *"the single highest-value 20 minutes of verification in this document"* | Before finalizing Stage 1/2 content ordering |
| 3 | **MTA's A–F state letter grade** | `curric` §2.6 | Informational only — no blocking dependency |
| 4 | **Exact AZ standard wording** for every standard content gets authored against, verified against the primary PDFs rather than the doc's `[A*]`-marked search-extracted paraphrases | `curric` §3, §4, §9 checklist item 4 | Before authoring each domain in Stage 1/2 (can be done domain-by-domain, doesn't block Stage 1 starting on NBT/OA while ELA wording is still being checked) |
| 5 | **2026–2027 AASA testing window** once ADE publishes it (fall 2026) | `curric` §5.3, §9 checklist item 5 | Before finalizing Stage 3's spaced-review retention-interval math (§7.5's ~210-day assumption) |
| 6 | **The scope interview** — audience (this child only, vs. shareable later), optimization target (AASA prep vs. general enrichment vs. both), build size (how much engineering surface the parent wants to own) | User's stated lean toward self-hosting, not yet a settled interview | Before Stage 0.2 items 2 and 10 are finalized — see the self-hosting section at the end of this document |

### 0.2 Engineering foundation

1. **Merge the fork.** One repo, one `package.json` (currently absent — the repo has no build config, no tests, no lint config per `eval` §front-matter), extract the 654 byte-identical engine lines plus the 384/147 file-specific engine lines into shared modules (`engine/`, `store/`, `styles/`), reduce each existing app to a content file plus config.
   *Why here:* `eval` §8 "If you build on it" ranks this #1 — bug #13 (the Enter-key fix that landed in one copy and not the other) is proof the fork is already actively rotting, and every fix from here on would otherwise need to be applied twice.
   *Load-bearing:* blocks nearly everything else — Stage 1/2 need one engine to add content to, not two.
   Effort: **M**.

2. **Replace `window.storage`.** Real persistence behind the same two-method interface, but with **loud failure** (no empty `catch {}` — `eval` bug #7 found the app currently boots and runs perfectly outside a Claude Artifact while persisting nothing, silently), a `version` field inside the payload, a real migration function, and per-profile shape validation (closes bug #11's crash-on-missing-`completed` path). The concrete mechanism (localStorage vs. something else) depends on the hosting decision — see the dedicated section below; this item's *validation/versioning/loud-failure* scope is needed regardless of mechanism.
   *Why here:* `curric`'s architecture-implication note and §8.3 rule 3 both require local-only persistence; Stage 3 adds much larger state objects (mastery graph, spaced-review schedule) that need a solid store to land on.
   *Load-bearing:* everything that persists progress depends on this.
   Effort: **S–M**.

3. **Fix the date/streak logic.** Replace UTC-based `todayStr`/`yesterday` (`eval` §3.3, bugs #1–#2) with local-date arithmetic (`getFullYear()/getMonth()/getDate()`, formatted manually) plus stored day-index differencing rather than string equality. Test explicitly at the two DST-boundary hours the eval identified (2026-03-08 19:00 ET, 2026-11-01 19:00 ET) and at ordinary evening-US-timezone use. Bundle in the reward-framing fix `curric` §7.3 calls for: display consecutive days neutrally ("You've practiced 14 days this month"), never as a thing that can be *lost*.
   *Why here:* cheap, isolated, and `eval` calls it "a headline defect" for a product whose only retention mechanic is a flame icon.
   *Load-bearing:* none — independent, but land it early since it's trivial while the engine is already open from item 1.
   Effort: **S**.

4. **Ship a mastery-gate stopgap.** Require a minimum score (e.g., ≥ 60–80%, moving toward `curric`'s ~85–90% recommendation once Stage 3's real graph exists) to unlock the next day, instead of any score including 0/5 (`eval` §3.2/§3.4, bugs #4, #5, #17 — unlocking ignores score entirely, replay farms XP unbounded, top rank is unreachable without grinding). This is explicitly a stopgap, not the full standards-keyed mastery graph — that's Stage 3 item 1 — but it's cheap now and the data model to support the real thing doesn't exist yet.
   *Why here:* if Stage 1's brand-new content ships with the same broken gate, the new content's progress signal is worthless from day one — same failure the eval found in the old content.
   *Load-bearing:* blocks any meaningful sense of "done" on Stage 1/2 content until it exists.
   Effort: **S**.

5. **Rebalance the existing answer keys.** Script-shuffle the correct-answer index across the 289 existing MC questions (currently 73%/93% at index 0) and balance the TF true/false split (currently 87%/88% true) — a mechanical data transform, not a rewrite of question text (`eval` §3.1, bug #3).
   *Why here:* this content is being kept as enrichment (per the framing above); an 83%-tap-through course isn't usable even as bonus material. Do it once, post-merge, instead of twice.
   *Load-bearing:* none — independent.
   Effort: **S**.

6. **Delete `ImportPanel`/`IMPORTABLE`.** A one-tap button crediting 18 days / 1,140 XP (50% of Explore's XP economy) tied to lanes (`gov`, `biz`, `fossils`) that don't exist in the other file (`eval` §3.7, bug #8 — *"should be deleted, not fixed."*)
   *Load-bearing:* none — independent, trivial.
   Effort: **S**.

7. **CodeLab safety fix.** Either wrap execution in a Web Worker with a hard wall-clock timeout (terminate after ~1–2s), or at minimum extend the loop-blocking regex to catch `for(;;)`-style infinite loops, not just `while`/`do{}` (`eval` §3.6, bug #6 — *"the curriculum teaches exactly this failure mode"*: Day c12 hands the child an editable `for` loop after teaching that missing step instructions cause infinite loops). The Worker approach is more robust — the regex approach already has a documented false-positive (bug #28, rejecting `console.log("take a while")`).
   *Why here:* it's a live tab-hanging bug in an asset being kept; cheap to fix while other engine work is already underway.
   *Load-bearing:* none — the CS/CodeLab content this protects is itself part of the deprioritized-to-enrichment track, so this can slip to Stage 4/5 without blocking anything if time is tight (flagged again in the parallelizable section).
   Effort: **S–M**.

8. **Hygiene cleanup.** Delete the 8 orphaned `Visual` cases and dead imports (bugs #20–#21), fix the 13 dangling cross-lane references in lesson prose that point at lanes ("Logic lane," "Earth & Space lane") that exist in neither file (bugs #9–#10) — natural side effect of item 1's merge.
   *Load-bearing:* none.
   Effort: **S**.

9. **Seed shell-constraint infrastructure** — not full compliance (that's Stage 4's audit), just the scaffolding so Stage 1–2 content is authored correctly the first time:
   - An FKGL-computation script and a build-time gate over user-facing strings (`curric` §7.2 rule 9: *"~40 lines of code and it permanently prevents drift"*).
   - Touch-target-size and 7:1-contrast tokens added to the shared style module so new components default correctly (`curric` §7.9).
   - A user-adjustable letter-spacing control, explicitly instead of a dyslexia font (`curric` §7.9 — OpenDyslexic/Dyslexie show no benefit or actively hurt; extra letter-spacing is the evidence-backed intervention, Zorzi et al. 2012).
   - A session-timer scaffold — 10–15 min soft target, 20 min hard cap, the app ends the session itself and saves state (`curric` §7.1: *"never rely on a 9-year-old to self-regulate stopping"*).
   *Why here:* `curric` §7.2 explicitly argues for gating early — building Stage 1/2 content without this now means a full rewrite pass later instead of a systematic audit. Classic pay-now-cheap-or-pay-later-expensive item.
   *Load-bearing:* soft — skipping it doesn't block Stage 1/2 from starting, but converts Stage 4 from an audit into a rewrite.
   Effort: **M**.

10. **Extend the content schema and split content out of the engine.** Add a `standards: ['4.NF.A.2', …]` array field to the day/quiz-item schema (items can span multiple standards), and move curriculum content out of the JS source into standalone data files, separate from the engine (`curric` §9 item 1's "tag content by Arizona standard code," and the architecture-implication note on splitting content into data files with scripted validation instead of hand-authoring). Keep the validation tooling lightweight at this stage — a script checking every question has `explain`+`hint`, denominators stay in `{2,3,4,5,6,8,10,12,100}` per `curric` §3.6, etc. — and expand it as Stage 1/2 reveal what's worth checking.
    *Why here:* this is the direct bridge to Stage 1 — content authored without it gets built in the wrong shape and needs retrofitting with standard codes later, repeating exactly the kind of rework this whole roadmap exists to avoid.
    *Load-bearing:* blocks Stage 1/2 from being authored in the shape Stage 3's mastery graph needs, and blocks the self-hosting content-scaling goal.
    Effort: **S–M**.

---

## Stage 1 — Core content: Mathematics (Grade 4/5)

**What gets built.** New content, authored specifically for the AZ Grade 4 (AASA) and Grade 5 (MTA classwork) bands, using the schema extended in Stage 0 item 10, ordered by the AASA blueprint weight `curric` §3.2 provides as an explicit build budget:

- **Tier 1 (build first — 46–54% of test weight, OA+NBT):** `4.NBT.A.1` (place value), `4.NBT.B.5` (multi-digit multiplication via arrays/area models — explicitly *not* the standard algorithm; `curric` §3.5's "critical design note" flags that as a Grade-5 requirement), `4.NBT.B.6` (division with remainders via partial quotients), `4.OA.A.1`/`A.2` (multiplicative comparison — "6 times as many" vs. "6 more than"), `4.OA.A.3` (multi-step word problems + the AZ-specific "remainder is a fraction of the divisor" bridge).
- **Tier 1 continued (29–33% of test weight, and per `curric` §3.6 "the highest-leverage domain in the whole grade"):** `4.NF.A.1` (equivalence via visual models), `4.NF.A.2` (comparison), `4.NF.B.3`/`B.4` (fraction arithmetic and fraction × whole number), `4.NF.C.6`/`C.7` (decimal notation, with the AZ-specific number-line requirement). Respect the AZ denominator limit `{2,3,4,5,6,8,10,12,100}`.
- **Tier 2 (15–19%):** `4.MD.A.3` (area/perimeter, including the inverse "given area and one side" problem), lighter coverage of `4.MD.A.1`/`A.2`/`B.4`/`C.5`/`C.7`.
- **Tier 3, thin (4–7%):** `4.G.A.1`–`A.3` as a light vocabulary/classification module — `curric` §3.8 explicitly calls geometry "the least efficient place to spend engineering effort" at this weight.
- **If Stage 0.1 item 1 confirms the acceleration is real**, extend the same standards-tagged approach to the Grade 5 additions in `curric` §3.9 (unlike-denominator fraction ops, standard multiplication algorithm, decimals to thousandths, volume, coordinate plane) — but sequenced *after* the Grade 4 tier above is content-complete, per `curric` §3.9's own instruction: *"Do not build this before the Grade 4 track is solid."*

**Reuse from the kept engine:** the `day/pages/blocks/quiz` schema, the `Visual` SVG pattern for new *static* diagrams (area-model rectangles, a static number-line diagram — not yet the interactive placement widget, that's Stage 3), and the `DRILLS` generator pattern extended to Grade 4/5-appropriate fact families (the pattern itself is "genuinely good design" per `eval` §8 even though the current 14 generators target the wrong grade). Apply Stage 0's mastery-stopgap and answer-key discipline from the start — write new questions with genuinely randomized correct-position, don't reintroduce bug #3.

**Why sequenced here, ahead of ELA:** math's build budget is fully specified by blueprint weight, letting content be authored against a concrete priority order immediately; fractions and division are independently flagged as the single highest long-term-predictive domain in elementary math (Siegler et al. 2012, `curric` §3.6/§6.2); and the existing kept content's math lane is explicitly the strongest asset to imitate for tone and sequencing (`eval` §7), making it the lowest-risk place to prove out the new authoring workflow before applying it to a domain (reading/text-evidence) with no existing analog in either prototype.

**Depends on:** Stage 0 items 1 (merged engine), 2 (real persistence), 4 (working gate), 5 (bias-free answer-key discipline established), 9 (FKGL gate + shell tokens), 10 (standards-tagged schema + data-file split) — all in place first.

**What's cut/deferred:** the interactive fraction number-line widget and the interactive multiplication/division workspace (Stage 3 — Stage 1 ships static diagrams via the existing `Visual` pattern so content ships sooner). Grade 5 content authoring can slip out of Stage 1 entirely if Stage 0.1 verification finds the acceleration claim doesn't hold this year.

Effort: **L** — the single biggest time sink in the roadmap by volume. For scale: the existing 16-day Core math lane alone is ~2,354 words of prose, 84 quiz questions, 48 recap bullets (`eval` §5.1); a comparable from-scratch Grade 4 lane is realistically several weeks of spare-time authoring even reusing the schema and diagram pattern, with a second comparable pass if Grade 5 content is added.

---

## Stage 2 — Core content: Reading & Language (Grade 4)

**What gets built.** New Grade 4-band reading/language content, standards-tagged, authored fresh — **not** adapted from Explore's existing Biology/ELA/Civics/Business/Fossils lanes, which stay in the enrichment track (Stage 5) at their current reading level (FKGL 5.7–7.3, `eval` §5.5):

- **Tier 1:** `4.RL.1`/`4.RI.1` (text evidence — the defining Grade 4 reading move), `4.RI.2` (main idea + supporting details), `4.RI.4` (academic/domain vocabulary), `4.L.4b` (Greek/Latin roots and affixes — `curric` §9 item 10 calls this "the highest-leverage vocabulary intervention available"), `4.L.1`/`4.L.2` (grammar and mechanics — `curric` §4.9 notes these are "very concretely specified": relative pronouns, progressive tenses, modal auxiliaries, adjective ordering, comma rules), `4.W.1`/`4.W.2`/`4.W.9` (opinion and informative writing that draws evidence from a text — this is the writing-side mirror of the AASA's source-based writing-unit format, `curric` §5.2).
- **Tier 2/3, per the priority markers in `curric` §4.4–§4.9:** `4.RL.3`/`6`, `4.RI.3`/`5`/`7`/`8`/`9`, `4.W.3`/`4`/`5`/`8`, `4.SL.2`/`3`, `4.L.3`/`5`/`6`.
- **New interaction — the "text-evidence tap":** read a 740L–1010L passage, answer a question, then tap the sentence that proves it (`curric` §9 item 9 — *"the 'prove it' step is the whole point, the answer alone is not the standard"*). This needs a new passage-block type with tappable sentence spans checked against a stored evidence-span key; neither prototype has anything like it today (both only have plain-text prose blocks), so it's genuinely new engineering, not a reuse of an existing component.
- **New interaction — morphology micro-lesson:** teach a root, show it in three unfamiliar words, then in a sentence (`curric` §9 item 10). Lower engineering lift than the text-evidence tap — likely buildable from the existing `concept`/`example` block types plus disciplined content authoring.

**Why sequenced after math, not before it, but not far behind:** math's build budget is more concretely quantified (exact blueprint percentages and standard list) and the existing content's math lane is the strongest imitable model, so Stage 1 is the lower-risk place to prove out the new-content workflow; ELA's marquee new interaction (text-evidence tap) has no existing analog to build from, so it benefits from patterns already validated in Stage 1. That said, ELA is at least as urgent substantively — NAEP 2024 puts Grade 4 reading at ~40% below Basic, worse than 2019 or 2022, with the "reading-to-learn" vocabulary cliff `curric` §4.3/§6.5 calls a documented, replicated phenomenon since Chall (1983). A parent under time pressure could legitimately interleave Stage 1 and Stage 2 rather than strictly sequence them — see the parallelizable section.

**Depends on:** the same Stage 0 foundations as Stage 1 (schema, persistence, gating, FKGL gate). Does **not** depend on Stage 1 being complete.

**What's cut/deferred:** Speaking & Listening beyond `4.SL.2` (P3 except SL.2, and only exercised via CBT listening items — a smaller, harder-to-simulate slice, `curric` §4.8). Cursive/handwriting excluded entirely — `curric` §4.10 is explicit that a touchscreen "teaches the wrong motor pattern." `4.W.6`/`W.7` (typing fluency, research projects) deferred as P3.

Effort: **L**, comparable order of magnitude to Stage 1, though `curric` doesn't quantify an ELA content-volume "budget" as sharply as it does math's blueprint percentages, so first-pass scope here is more of an open judgment call than Stage 1's is.

---

## Stage 3 — Pedagogy & assessment engine

This is where `curric` §9's ten-item list gets fully realized as infrastructure spanning both content bands built in Stages 1–2 (and eventually the enrichment track, per Stage 5). It's sequenced after content exists because building a mastery graph, an error taxonomy, and a spaced scheduler against content that doesn't exist yet is undirected work — you need real Grade 4/5 skills and real observed error patterns to design a graph and taxonomy that actually fit.

1. **Real mastery-gated skill graph, keyed to standard codes.** Replaces Stage 0's stopgap threshold. Mastery = ~85–90% sustained across **≥2 separate sessions** (not one lucky run), with decay/expiry if unpracticed, and explicit prerequisite edges (fact fluency → multi-digit multiplication → division → fraction-of-a-set, `curric` §7.4). This is the biggest single data-model change in the roadmap — it's what turns "day N unlocks day N+1" into a graph over standards, which is what actually lets one engine serve both the Grade 4 test target and the Grade 5 classwork track (`curric` §9 item 1's own stated justification), rather than needing two separate modes.
   *Load-bearing:* nearly everything else in this stage reads or writes this graph's state (items 3, 4, and most of item 2's requeue logic). Can start as soon as Stage 1 has produced a first batch of tagged content — doesn't need to wait for Stage 2 to finish.
   Effort: **L**.

2. **Elaborated-feedback engine with a per-skill error taxonomy and faded worked examples.** The 3-step ladder from `curric` §7.7/§7.8: name the error type → a fully worked isomorphic problem → full solution + requeue, capped at 3 consecutive misses. Requires authoring a 3–6-item error taxonomy per skill (concrete examples the doc supplies: "added the denominators" for `1/4+2/4`, "whole-number bias" for `1/3` vs `1/4`, "longer is larger" for `0.45` vs `0.8`, "forgot the place-value shift" in partial products, "dropped the remainder" in `47÷5`). Time-gated hints (~3–5s minimum dwell) blunt the documented hint-abuse failure mode (`curric` §7.7).
   *Why it matters most:* `curric` §9 item 3 calls this "where the app's educational value actually lives" — the single highest-ROI item in this stage, worth protecting from being cut if time runs short elsewhere.
   Effort: **L** (both the state-machine engine and the cross-skill taxonomy authoring).

3. **Daily interleaved retrieval warm-up.** 5 mixed-domain items from previously-mastered skills, unlabeled, no score shown, drawn from item 1's mastery pool (`curric` §9 item 4/§7.6 — d = 0.83 in a 787-student RCT, called "your single biggest win").
   *Depends on:* item 1 (needs a real mastered-skill pool) and enough content breadth from Stage 1/2 to mix meaningfully across domains.
   Effort: **M**.

4. **Spaced review scheduler.** Expanding interval `+1, +3, +7, +16, +35` days then ~monthly; miss → back two steps, hit → forward one; daily queue capped at 8–12 items (`curric` §9 item 5/§7.5). Calibrate the "hold until the AASA" horizon (~210 days → monthly) against Stage 0.1 item 5's confirmed testing window.
   *Depends on:* item 1 for mastery events to schedule against.
   Effort: **M**.

5. **Multiplication/division workspace with visible steps.** Upgrades Stage 1's answer-box drills to a partial-products/partial-quotients workspace with an area-model view, so a wrong answer is diagnosable by *where* it went wrong (feeding item 2's taxonomy) rather than just *that* it's wrong (`curric` §9 item 6). Explicitly arrays/area models, not the standard algorithm, per AZ's actual Grade 4 wording.
   Effort: **M–L**.

6. **Interactive fraction number-line engine.** Upgrades Stage 1's static number-line diagrams to a real placement/comparison/decomposition widget threaded through equivalence, comparison, and decimal items (`curric` §9 item 2 — described as "the core representational engine, not a lesson," meant to be reused across many items rather than built once).
   Effort: **M–L**.

7. **Fact-fluency micro-drill.** Adaptive to specifically-slow facts, 2–4 minutes, its own micro-block kept separate from conceptual work (`curric` §9 item 7/§7.1). Extends the kept `DRILLS` pattern with per-fact-family latency tracking.
   *Smallest item in this stage* — reuses the most from the existing kept engine.
   Effort: **S–M**.

8. **Multi-step word problem engine.** `4.OA.A.1`–`A.3`/`4.MD.A.2`: contrasts "6 times as many" against "6 more than," forces the four remainder-interpretation decisions (drop it / round up / it's the answer / it's a fraction) (`curric` §9 item 8). Overlaps with Stage 1 content, but the structured remainder-decision UI is new.
   Effort: **M**.

**Ordering within the stage:** item 1 first — it's the dependency root for 3, 4, and much of 2. Items 5, 6, 7, 8 are comparatively independent of each other and of 2–4, making them the natural place to parallelize across sessions, or to cut individually if time runs short without collapsing the rest of the stage.

**Depends on:** Stage 1 and/or Stage 2 having produced enough tagged content to build against — not both complete, just enough to be non-trivial.

**What's cut/deferred:** full ITS-grade gaming-the-system detection beyond the basic time-gate and implausibly-fast-answer rejection `curric` §7.7 already specifies — don't over-build fraud detection for an audience of one child. The protractor widget stays explicitly cut (`curric` §3.7 note: build angle estimation/classification instead, "let the physical protractor stay physical").

Effort: **L** overall — the most technically novel work in the roadmap; nothing like items 1, 2, or 6 exists in either prototype today.

---

## Stage 4 — Polish, accessibility & shell compliance

Most of the shell constraints were seeded as infrastructure back in Stage 0 item 9 (FKGL gate, style tokens, letter-spacing control, session-timer scaffold) precisely so Stages 1–3 are authored correctly the first time. Stage 4 is the **closeout audit** verifying the constraints hold across the now-substantially-built surface — not the first time any of this is considered.

- **Keyboard and screen-reader pass** across every interactive element, extended to cover Stages 1–3's new components as well as the legacy enrichment-track ones. `eval` bug #19 found 0 `aria-*`, 0 `role=`, 0 `tabIndex` in either original file, with several `<div onClick>` interactive elements and no keyboard path at all.
- **Full contrast audit** targeting 7:1/AAA (`curric` §7.9's recommendation, not just the 4.5:1 AA floor) across every screen, including the enrichment track's existing dark palette and per-subject accent colors.
- **Touch-target audit** — every interactive element (including the enrichment-track's `<div onClick>` cards) at ≥20mm/~75–80 CSS px with ≥8mm spacing (`curric` §7.9).
- **Full FKGL/read-aloud pass** on every string across all stages (`curric` §7.2 rule 10: *"if you stumble, a 9-year-old will stop"*) — the Stage 0 CI gate catches new violations going forward; this catches anything authored before the gate existed or that its heuristics miss.
- **Session-length and activity-switch tuning** (10–15 min soft / 20 min cap, activity switch every 3–5 min, `curric` §7.1) validated against how content actually landed once real, not hypothetical.
- **Reward/motivation copy audit** against `curric` §7.3's do/don't list — no leaderboards (moot, single user), no currency-gated content, competence-framed language throughout. Should mostly already hold from Stage 0's streak-copy fix; this is the systematic check.
- **Data controls** — one visible "delete all data" button (`curric` §8.3 rule 8) and the one-page written data note (§8.3 rule 10 — *"costs ten minutes"*).
- **Error-sound/flash audit** — confirm no red-X/buzzer/flash patterns crept into any Stage 1–3 UI (`curric` §7.8: *"no red X, no buzzer, no 'Oops!'"*).

**Why last:** this is a systemic pass across a finished(-ish) surface — contrast, touch-targets, and keyboard-nav can't be exhaustively verified against screens that don't exist yet, and partial audits after every stage waste more motion than one pass at the end. The exception, deliberately: the cheap infrastructure pieces were pulled forward into Stage 0 to avoid the expensive version of this problem (bulk content rewrites).

**What's cut/deferred:** nothing here should be silently dropped — these are the doc's own "non-negotiable" constraints (`curric` §9's shell table). If something slips, re-flag it explicitly rather than letting it quietly disappear.

Effort: **M** — bounded because the expensive failure mode (bulk rewrites) was avoided by seeding constraints early; the remaining cost is verification labor plus whatever the audit turns up.

---

## Stage 5 — Stretch / deferred

- **Activate the existing content as an explicit enrichment track.** Relabel and expose the existing Grade 6–8/Algebra I math lane and Explore's Biology/English & Writing/Government & Civics/Business & Money/Fossils & Deep Time lanes (all above a 4th-grade reading level per `eval` §5.5) as a distinct "Enrichment" section — reusing the merged engine and Stage 0's repaired answer keys/CodeLab/dead-code, but **not** retagged with AZ Grade 4/5 standard codes and **not** part of Stage 3's mastery graph or spaced-review system (those stay scoped to the Grade 4/5 core). Recommended unlock rule: available once the child shows real progress in the Grade 4/5 core (not gated behind 100% core completion), consistent with `curric` §2.6's read of this as an above-grade-level, accelerated student — *"build for enrichment, depth, and fluency, not for rescue"* — but kept explicitly outside the AASA-prep critical path. This is the direct payoff of the framing decision at the top of this document: everything before this stage builds the thing that didn't exist yet; this step spends the asset that was deliberately preserved.
  Effort: **S** — mostly navigation/labeling work; the content itself was already repaired in Stage 0.
- **CodeLab rehab**, if deferred out of Stage 0 rather than done there — relevant once the CS lane is exposed via the enrichment track above.
- **Geometry depth** beyond the P3 vocabulary/classification module, including any protractor widget — explicitly not recommended (`curric` §3.7) unless there's real spare capacity.
- **Speaking & Listening** beyond `4.SL.2` — P3, CBT-only listening items are a small slice of the ELA blueprint.
- **Audio recording for fluency practice** (`4.RF.4`) — the one feature that would need a new OS permission (microphone); `curric` §8.3 rule 6 says defer it or keep it strictly local and parent-triggered.
- **Grade 5 content depth** beyond Stage 1's core additions, if Stage 0.1 verification confirms real appetite to go further (`curric` §3.9's fuller Grade 5 domain list).
- **Multi-device sync** — explicitly *not* recommended; local-only is a deliberate privacy choice (`curric` §8.3 rule 3). Listed here only so it's on record as rejected, not silently absent.

---

## Load-bearing vs. parallelizable

A solo parent working in spare time needs to know what can slip a week without consequence and what can't be skipped without quietly taxing everything downstream.

**Load-bearing — skipping or rushing these has multiplying downstream cost:**

| Item | Why it's load-bearing |
|---|---|
| Stage 0.1 verify item 1 (which grade track the child is actually taught) | Determines how much of Stage 1's Grade-5 half is even needed this year |
| Stage 0.2 item 1 — merge the fork | Blocks everything: new content into a duplicated engine doubles all future work |
| Stage 0.2 item 2 — real persistence w/ validation | Blocks all Stage 3 state (mastery graph, spaced schedule); blocks the self-hosting goal outright |
| Stage 0.2 item 4 — mastery-gate stopgap | Blocks any meaningful progress signal on new content from day one |
| Stage 0.2 item 9 — FKGL/shell-token infra | Skipping it doesn't block Stage 1/2 starting, but converts Stage 4 from an audit into a rewrite |
| Stage 0.2 item 10 — standards-tagged schema + data-file split | Blocks Stage 1/2 content from being authored in the shape Stage 3's graph needs |
| Stage 3 item 1 — the real mastery graph | Blocks Stage 3 items 3 and 4, and most of item 2's requeue logic |

**Independent / parallelizable — safe to reorder, defer individually, split across sessions, or drop without stalling anything else:**

| Item | Note |
|---|---|
| Stage 0.2 item 3 — date/streak fix | Isolated function, zero dependents |
| Stage 0.2 item 5 — answer-key rebalance | Isolated data transform |
| Stage 0.2 item 6 — delete ImportPanel | Isolated deletion |
| Stage 0.2 item 7 — CodeLab safety fix | Isolated; its content band is deprioritized to enrichment anyway — safe to push to Stage 4/5 |
| Stage 0.2 item 8 — dead-code/dangling-reference cleanup | Isolated hygiene |
| Stage 1 vs. Stage 2 (Math core vs. ELA core) | Both depend only on Stage 0, not on each other — interleave or run concurrently as time allows |
| Stage 3 items 5, 6, 7, 8 (workspaces, fact drill, word-problem engine) | Each depends on Stage 3 item 1, but not on each other |
| Stage 0.1 verify items 2–5 | Informational/calibration — don't block engineering start, just need resolving before the content they inform ships as "final" |

---

## Self-hosting decision: architecture consequences for the roadmap

The user has expressed a lean toward self-hosting (private domain or local host, local-only preferred over public hosting for privacy) rather than staying inside the Claude-Artifacts runtime — but the scope interview that should settle this (audience, optimization target, build size — Stage 0.1 item 6) hasn't happened yet. What follows is input to that interview, not a foreclosed decision. The two paths change Stage 0 concretely enough that it's worth deciding early rather than defaulting into one:

| Concern | If: stay in Claude Artifacts | If: self-hosted (local preferred) |
|---|---|---|
| **Storage (Stage 0.2)** | Keep the `window.storage` mechanism itself, but still add the loud-failure/versioning/validation wrapper — that scope is worth doing regardless. `window.storage` is already sandboxed to the Claude runtime, so this satisfies `curric` §8.3's local-only rule as-is. | Drop `window.storage` entirely rather than fallback-wrap it. `localStorage` is the simplest sufficient mechanism — the eval's entire existing content is ~18,000 words across 64 days (`eval` §5.1), and a Grade 4/5 core of comparable or larger size is still trivially small against localStorage's typical ~5–10MB quota. IndexedDB/SQLite would be over-engineering unless content volume grows far beyond that. |
| **Content structure (Stage 0.10)** | A literal multi-file split isn't available — single-file (or near-single-file) constraints stay. Content can still be organized into clearly delimited sections within the file, but the "split content out of the JS file into data files" recommendation (`curric` architecture-implication note) can't be taken literally. This directly caps how much content — Stages 1, 2, and 5's enrichment track combined — can practically be authored before hitting file-size/editability friction. | Full multi-file data-file split becomes available, which is exactly why `curric` frames that recommendation as an implication of self-hosting specifically. Removes the content-volume ceiling that most constrains Stages 1, 2, and 5. |
| **Build tooling (Stage 0.2, 0.9, 0.10)** | No real build step exists or is available — the FKGL "gate" (Stage 0.9) becomes a script the parent runs manually before pasting content back into the single file, not an enforced CI gate. Content-validation tooling (Stage 0.10) is similarly manual. | Unlocks a real `package.json`/bundler/build step (currently entirely absent — the repo today has none, per `eval`'s scope note). Required to make the FKGL gate and content-validation scripts actually enforced rather than advisory, and to bundle a multi-file content structure at all. |
| **Deployment loop** | Redeploys instantly via the publish mechanism already in use — zero new operational surface. | Requires the parent to own a build+deploy step, even if trivial (e.g., a static build served from a local folder or a small local server). This is new "operations" surface neither prototype has today, and its shape depends on the build-size axis of the still-open scope interview (a one-command static rebuild is a very different commitment than standing up a local server process). |
| **Privacy posture** | Already satisfies `curric` §8.3's local-only rule as written — no accounts, no SDKs, data stays inside the Claude-sandboxed store. | Satisfies the *stronger*, more literal reading of local-only the user has expressed a preference for: no dependency on any runtime other than the parent's own device, not even Anthropic's. |

**Net effect on Stage 0 sizing:** if the interview lands on staying in Artifacts, Stage 0.10 shrinks (internal organization within one file, not a real split) and Stage 0.2 keeps its current mechanism with the validation wrapper added; total Stage 0 effort trends toward the low end of its S–M item estimates. If it lands on self-hosted/local, Stage 0 gains a new up-front item not currently listed above — standing up a minimal build tool/runtime appropriate to the build-size the interview settles on — before 0.2 and 0.10 can be finalized in their fuller form; this pushes Stage 0's total effort toward M overall, but pays for itself by removing the content-volume ceiling that would otherwise constrain every content stage after it (1, 2, and 5).
