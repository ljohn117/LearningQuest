# LearningQuest — Curriculum & Design Requirements
### A sourced requirements document for a parent-built learning app targeting one 4th-grade student at Madison Traditional Academy, Phoenix, AZ

**Compiled:** 2026-08-21
**Scope:** Grade 4, Arizona standards, 2026–2027 school year
**Status:** Research complete. No code written. See §8 for the build roadmap.

---

## 0. How to read this document

### Confidence markers
Every substantive claim carries one of these:

| Marker | Meaning |
|---|---|
| **`[A]`** | **Verified fact.** Traced to a primary or authoritative source (ADE, FTC, W3C, peer-reviewed literature) that I retrieved this session. |
| **`[A*]`** | **Verified via search-index extraction of a primary source.** The source is primary (e.g., an azed.gov PDF), but I could only read it through the search engine's extraction of its contents, not by opening it. Treat wording as near-verbatim but confirm before printing on anything official. |
| **`[B]`** | **Reasonable inference.** My deduction from verified facts. Labeled as such. |
| **`[C]`** | **Generic best practice.** Widely accepted design/engineering guidance, not specific to this school or student. |
| **`[?]`** | **Unverified.** I could not confirm this. Stated explicitly so you don't build on it. |

### A tooling limitation you must know about
**Direct page fetching (`WebFetch`) was blocked by this environment's network egress proxy for every domain I tried** — including `mta.madisonaz.org`, `madisonaz.org`, `azed.gov`, `nces.ed.gov`, `en.wikipedia.org`, and `w3.org`. Only web *search* worked.

Consequence: I could not open a single primary PDF or school page directly. Everything marked `[A*]` comes from a search engine's extraction of those primary documents. This is meaningfully weaker than reading the source. **Before you build content that must match the standards verbatim, open these three documents yourself:**

1. `https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%204%20Final%202025.pdf`
2. `https://www.azed.gov/sites/default/files/2025/03/4th%20Grade%20ELA%20CE.pdf`
3. `https://www.azed.gov/sites/default/files/2025/08/4th%20Grade%20ELA%20Essential%20and%20Related%20Standards.pdf`

That's a 20-minute job and it upgrades most of this document's `[A*]` rows to `[A]`.

---

## 1. Executive summary

**The school is confirmed.** Madison Traditional Academy (MTA) is a real K–8 public school of choice at 925 E. Maryland Ave, Phoenix, AZ 85014, in Madison Elementary School District #38. It is a genuine "back-to-basics" school: explicit direct instruction, whole-class teaching, mandatory uniforms, a family volunteering requirement, and — critically — **an accelerated math curriculum taught one year above grade level**. `[A*]`

**The single most consequential finding for your build:** MTA states that students receive math instruction *one year above grade level*, using McGraw Hill **Reveal Math**, starting with first-grade math in kindergarten. `[A*]` If that holds in Grade 4, your child is doing **Arizona Grade 5 math** in class while the state will test them on **Arizona Grade 4 math** on the AASA. Those are different targets. The app must serve both, and you need to confirm with the teacher which one your child is actually working in. **Do not assume.**

**The second most consequential finding:** Arizona published the AASA test blueprint. It tells you exactly where the points are in Grade 4 math:

| Domain | Share of AASA Grade 4 math items |
|---|---|
| Operations & Algebraic Thinking + Number & Operations in Base Ten | **46–54%** |
| Number & Operations—Fractions | **29–33%** |
| Measurement & Data + Geometry | **15–19%** |

`[A*]` — This is a prioritization gift. Geometry is 4–7% of the test. Fractions are ~30%. Build accordingly.

**Third:** starting with the 2025–2026 school year, Arizona designates certain standards as **"Essential Standards"** that receive a *higher proportion* of AASA items. All standards remain testable; essentials are weighted. `[A]` The Grade 4 lists are marked with stars/green highlighting inside the ADE grade-level PDFs. `[A*]`

**Fourth — the evidence base for design is clear and somewhat counterintuitive:**
- **Fractions and division in elementary school uniquely predict high-school math achievement**, controlling for IQ, working memory, and family income (Siegler et al., 2012, *Psychological Science*). `[A]` Fractions are not just 30% of the test; they're the long-term lever.
- **Elaborated feedback (an explanation) is ~10× more effective than "correct/incorrect"** in computer-based learning (g = 0.49 vs 0.05; Van der Kleij et al., 2015). `[A]` Building a "wrong, try again" app is close to building nothing.
- **Interleaved math practice beat blocked practice by d = 0.83** in a randomized trial of 787 students (Rohrer et al., 2020). `[A]` This is one of the largest effect sizes in education research and it is nearly free to implement.
- **Mastery learning: d ≈ 0.5, and larger for weaker students** (Kulik, Kulik & Bangert-Drowns, 1990). `[A]`
- **Extrinsic rewards are genuinely risky for a 9-year-old.** Expected, tangible, performance-contingent rewards reliably undermine intrinsic motivation (d ≈ −0.28 to −0.40), and *the effect is worse for children than for adults* (Deci, Koestner & Ryan, 1999). `[A]` Gamification's average effect on learning is real but modest (g = 0.49 cognitive, and less stable for motivation). `[A]` The widely-cited Duolingo streak numbers are **vendor marketing, not research** `[?]`.
- **"Dyslexia fonts" don't work.** Multiple peer-reviewed studies and a meta-analysis find no benefit from OpenDyslexic or Dyslexie; one study found OpenDyslexic *reduced* reading speed and accuracy. `[A]` What *does* work: extra-wide letter spacing improved dyslexic children's reading speed ~20% and halved errors (Zorzi et al., 2012, *PNAS*). `[A]`

**Fifth — COPPA almost certainly does not apply to you**, because COPPA governs *commercial* websites and online services. `[A]` But the engineering posture it implies is the right one anyway, and it's cheap: local-only storage, no accounts, no PII, no third-party SDKs. Ship that and the question never arises.

---

## 2. The school

### 2.1 Identity — CONFIRMED

| Attribute | Value | Confidence |
|---|---|---|
| Name | Madison Traditional Academy (MTA) | `[A*]` |
| Address | 925 E. Maryland Ave, Phoenix, AZ 85014 | `[A*]` |
| Phone | (602) 745-4000 | `[A*]` |
| District | Madison Elementary School District #38 (a.k.a. Madison School District), Phoenix, AZ | `[A*]` |
| Grades | K–8, plus a preschool program (sources list "PK, K–8") | `[A*]` |
| NCES School ID | 040450002874 | `[A*]` |
| Type | Public school of choice within the district; open enrollment available beyond district boundaries | `[A*]` |
| Founded as school of choice | 2011 | `[A*]` |
| Enrollment | ~736–760 students; student:teacher ratio ~24:1 | `[A*]` |
| School website | `https://mta.madisonaz.org/` | `[A]` |
| District website | `https://www.madisonaz.org/` | `[A]` |

**The lead hypothesis is correct.** This is the school.

### 2.2 Other schools named "Madison Traditional Academy"

I ran targeted searches designed to surface same-named schools elsewhere (explicitly excluding "Phoenix" and "Arizona," and probing Wisconsin, Alabama, Indiana, and Ohio, since "Madison" is a common school-name toponym). **Every result still resolved to the Phoenix school.** `[A]`

Similarly-named but distinct institutions that surfaced and were ruled out:
- **Neely Traditional Academy** — different school, Arizona (Gilbert). Ruled out on name. `[A]`
- **James Madison Preparatory School** — different name, different model. Ruled out. `[A]`
- **Madison Metropolitan School District** (Wisconsin), **Madison District Public Schools** (Michigan), **Christian Academy of Madison** — different districts/schools entirely; none operates a school by this exact name. `[A]`

**Conclusion:** No competing "Madison Traditional Academy" was found. I did not exhaustively enumerate every U.S. school, so this is `[B]` at the level of "almost certainly unique," `[A]` at the level of "no competitor surfaced in targeted search."

### 2.3 Stated instructional model — this is a real traditional school

MTA's self-description (via the district's Signature Programs page and the school's own Signature Program and About Us pages, retrieved through search extraction):

| Claim | Confidence |
|---|---|
| "The Philosophy of MTA is that students will rise to high expectations." | `[A*]` |
| "A traditional accelerated curriculum rooted in research-based and historically proven instruction methods." | `[A*]` |
| Instruction grounded in **direct instruction techniques and whole-class teaching methods**, in **highly structured classrooms** with high academic *and behavioral* expectations. | `[A*]` |
| Curriculum is **teacher-directed** and emphasizes a **structured, sequential** approach. | `[A*]` |
| **Mandatory school-wide uniform** (K–8): solid white, navy, or red collared tops. | `[A*]` |
| **Family volunteering requirement** for enrollment. | `[A*]` |
| Emphasis on **character development** and consistent behavior expectations. | `[A*]` |

**So the hypothesis in the brief was right on the substance** — back-to-basics, direct instruction, structured/explicit teaching, uniforms — with one refinement: **there is no evidence MTA uses a Core Knowledge sequence.** `[?]` No source mentioned E.D. Hirsch, Core Knowledge, or a Core Knowledge Language Arts adoption. Don't build to that assumption.

### 2.4 Named curriculum — this is the most actionable finding in §2

| Subject | Program | Confidence | Notes |
|---|---|---|---|
| **Mathematics** | **Reveal Math** (McGraw Hill) | `[A*]` | Described as "a rigorous, problem-based framework that fosters advanced mathematical thinking." |
| **Math acceleration** | **All students instructed one year above grade level, beginning with first-grade math in kindergarten** | `[A*]` | ⚠️ See §2.5. This is the highest-impact unverified-in-detail claim in this document. |
| **English Language Arts** | **Wonders** (McGraw Hill) as Tier 1 instructional curriculum | `[A*]` | Cited to the 2025–2026 MTA handbook. |
| **ELA approach** | Rooted in the **Science of Reading**; **systematic, explicit phonics**; explicit comprehension instruction | `[A*]` | Matches the "phonics-first" hypothesis. |
| **Historical ELA note** | An older source referenced the **Spalding Method** as the basis of MTA's language arts | `[?]` | Superseded by Wonders per current handbook. Mentioned only so you recognize it if a teacher says "Spalding." |
| **Preschool** | "World of Wonders for Early Learners" (district-wide early childhood) | `[A*]` | Not relevant to Grade 4. |

**No published Grade 4 scope-and-sequence specific to MTA was found.** `[?]` McGraw Hill publishes a public Reveal Math K–5 scope-and-sequence (`https://www.mheducation.com/unitas/school/explore/sites/reveal-math/scope-and-sequence-k-5.pdf`) and a K–5 table-of-contents/pacing guide, which is the closest available proxy for unit ordering. `[A]` A third-party district (Valhalla UFSD) publishes a Reveal Math Grade 4 curriculum guide that mirrors the publisher's unit structure. `[A]`

### 2.5 ⚠️ The acceleration problem — read this before you design anything

If MTA truly teaches math one year above grade level, then in Grade 4 your child is:

- **In class:** working through Arizona **Grade 5** mathematics content (Reveal Math Grade 5, or Grade 4 materials substantially compressed and extended)
- **On the AASA in spring:** tested against Arizona **Grade 4** mathematics standards `[A]`

These do not overlap cleanly. Grade 5 introduces adding/subtracting fractions with **unlike** denominators, multiplying fraction × fraction, dividing with unit fractions, decimals to **thousandths**, the standard multiplication algorithm, 4-digit ÷ 2-digit division, volume, and the coordinate plane. Grade 4 does none of those. `[B]`

**Practical consequences for the app:**
1. **Verify first.** Ask the Grade 4 teacher directly: "Which Reveal Math grade-level book is my child using, and are they assessed on Grade 4 or Grade 5 standards for report cards?" Everything downstream depends on the answer. `[C]`
2. **Design the content model grade-agnostic.** Tag every item with an Arizona standard code, not with "Grade 4." Then a single toggle — or an automatic mastery-driven promotion — lets the same engine serve Grade 4 review and Grade 5 acceleration. `[C]`
3. **Do not skip Grade 4 fluency to chase Grade 5 content.** Acceleration without automaticity is the classic failure mode: a student who can follow the Grade 5 procedure but hasn't automatized multiplication facts will bottleneck on working memory in every multi-step problem. `[B]`, grounded in the National Mathematics Advisory Panel's finding that automatic fact recall and conceptual understanding are mutually reinforcing prerequisites for algebra. `[A]`

### 2.6 Performance data

| Metric | Value | Source quality | Confidence |
|---|---|---|---|
| 2023–24, Grade 3 ELA proficient-or-better | **82%** (district 61%, state 39%) | Third-party aggregator (SchoolDigger) reporting state data | `[A*]` |
| 2023–24, Grade 3 Math proficient-or-better | **90%** (district 63%, state 43%) | Same | `[A*]` |
| All grades, math proficient-or-better | ~84% | Aggregator | `[A*]` |
| All grades, reading proficient-or-better | ~80% | Aggregator | `[A*]` |
| State ranking | Better than ~95.8% of Arizona middle schools; top 5% of AZ schools for test scores | Aggregators (SchoolDigger, PublicSchoolReview) | `[A*]` |
| GreatSchools rating | 10/10 | Commercial | `[A*]` |
| Niche | A−, #57 Best Public K–8 Schools in Arizona | Commercial | `[A*]` |
| Recognition | 2024 U.S. News Best Public Elementary and Middle School | Commercial | `[A*]` |
| **Arizona A–F state letter grade** | **NOT CONFIRMED** | — | `[?]` |

**On the A–F letter grade:** I could not retrieve it. The authoritative pages are:
- `https://azreportcards.azed.gov/schools/detail/89622` (MTA's official AZ School Report Card)
- `https://azsbe.az.gov/schools/a-f-school-letter-grades` (State Board A–F grades)

Both were unreachable. Given ~82–90% proficiency against a state average of 39–43%, an **A** is the overwhelmingly likely grade `[B]` — but I am not asserting it. Check the report-card link above; it takes 30 seconds.

**Design read-through:** this is a high-performing student population at a high-performing school. Your child is very likely *not* remediating; they are likely at or above grade level and accelerated. **Build for enrichment, depth, and fluency — not for rescue.** The app's difficulty ceiling matters more than its floor. `[B]`

---

## 3. Arizona Grade 4 Mathematics standards

### 3.1 What's current

- Arizona's mathematics standards are the **Arizona Mathematics Standards**, adopted by the Arizona State Board of Education in **December 2016**. `[A*]`
- They remain the operative standards. ADE republished grade-level documents in **February/March 2025** (file names like `Math Grade 4 Final 2025.pdf`, revision-dated 2025-01-29) `[A*]`.
- The 2025 republication **did not replace the 2016 standards.** It added an **Essential Standards** emphasis layer: beginning with the **2025–2026 school year**, identified Essential Standards in ELA and math for **grades 3–8** receive a *higher proportion of items* on the AASA, within the existing State-Board-adopted blueprint. **All standards remain testable.** `[A]`
- In the ADE grade-level PDFs, Essential Standards are **highlighted in green and starred (\*)**. `[A*]`
- **Code format:** `Grade.Domain.Cluster.Number` — e.g. `4.NBT.B.5`. Identical in shape to CCSS. `[A]`
- **Arizona is CCSS-derived but not CCSS-identical.** I confirmed at least four Grade 4 deviations (flagged ⚑ below). Assume there may be more. `[A]`
- Arizona retains the eight **Standards for Mathematical Practice (MP1–MP8)**. `[A*]`

### 3.2 Where the points are — the AASA Grade 4 math blueprint

| Reporting cluster | % of items |
|---|---|
| Operations & Algebraic Thinking **+** Numbers in Base Ten | **46–54%** |
| &nbsp;&nbsp;↳ Operations & Algebraic Thinking | 22–26% |
| &nbsp;&nbsp;↳ Numbers in Base Ten | 24–28% |
| Numbers and Operations — **Fractions** | **29–33%** |
| Measurement & Data **+** Geometry | **15–19%** |
| &nbsp;&nbsp;↳ Measurement and Data | 9–13% |
| &nbsp;&nbsp;↳ Geometry | **4–7%** |

Source: `AASA Math Blueprint 2016 Standards` (ADE, Oct 2021). `[A*]`

**Read this as a build budget.** Roughly half your math effort belongs in whole-number operations and place value, a third in fractions, and about a sixth in measurement/geometry — with geometry alone deserving no more than a rounding error of your time.

### 3.3 Priority key for the tables below

- **P1 — Build first.** High test weight, high long-term predictive value, or a documented struggle point.
- **P2 — Build second.** Real weight, but downstream of P1 or less error-prone.
- **P3 — Build if time allows.** Low weight or low error rate.

---

### 3.4 Operations & Algebraic Thinking (4.OA) — 22–26% of the test

| Code | Plain English (for a parent) | Priority |
|---|---|---|
| **4.OA.A.1** | "35 is 5 times as many as 7." Write multiplicative comparisons as equations, and read an equation as a comparison. This is the language of "times as many," distinct from "more than." `[A*]` AZ wording begins *"Represent verbal statements of multiplicative comparisons as multiplication equations"* ⚑ (CCSS phrases it as "Interpret a multiplication equation as a comparison"). | **P1** |
| **4.OA.A.2** | Multiply or divide within 1000 to solve word problems involving multiplicative comparison — and tell the difference between "6 times as many" (multiplicative) and "6 more than" (additive). `[A*]` | **P1** |
| **4.OA.A.3** | Solve **multi-step word problems** with all four operations, including problems where you must **interpret the remainder** (drop it? round up? it's the answer?). ⚑ **Arizona adds:** *"Understand how the remainder is a fraction of the divisor."* `[A*]` This AZ-only sentence is a direct bridge from division to fractions and should be built explicitly. | **P1** |
| **4.OA.B.4** | Find all **factor pairs** of a number 1–100. Recognize multiples. Decide whether a number is **prime or composite**. `[A]` (CCSS wording; AZ wording not directly confirmed — `[B]`) | **P2** |
| **4.OA.C.5** | Generate a number or shape **pattern** from a rule, then notice features the rule didn't state (e.g., "Add 3" starting at 1 alternates odd/even). `[A*]` | **P2** |

**Note:** "Gain familiarity with factors and multiples" and "Generate and analyze patterns" were both named among Grade 4 emphasized clusters in the 2025 Essential Standards materials. `[A*]` That's a nudge to rank 4.OA.B.4 and 4.OA.C.5 higher than their raw item counts suggest.

---

### 3.5 Number & Operations in Base Ten (4.NBT) — 24–28% of the test

Grade 4 expectation is **whole numbers less than 1,000,000**. `[A]`

| Code | Plain English | Priority |
|---|---|---|
| **4.NBT.A.1** | A digit in one place is worth **ten times** what the same digit is worth one place to its right. (The engine of the whole base-ten system.) `[A]` | **P1** |
| **4.NBT.A.2** | Read and write multi-digit whole numbers three ways — numerals, number names, expanded form — and compare two of them with `>`, `=`, `<`. `[A]` | **P2** |
| **4.NBT.A.3** | **Round** multi-digit whole numbers to any place. `[A]` | **P2** |
| **4.NBT.B.4** | **Fluently add and subtract** multi-digit whole numbers using a standard algorithm. `[A]` "Fluently" means accurate, efficient, and flexible — not merely correct-eventually. | **P2** |
| **4.NBT.B.5** ⭐ | **Multi-digit multiplication.** Multiply up to a **4-digit × 1-digit**, and **2-digit × 2-digit**, using place-value strategies and properties of operations. **Illustrate and explain** using equations, **rectangular arrays**, and/or **area models**. `[A*]` — verbatim AZ text confirmed. | **P1** |
| **4.NBT.B.6** ⭐ | **Division with remainders.** ⚑ AZ text: *"**Demonstrate understanding of division** by finding whole-number quotients and remainders with up to four-digit dividends and one-digit divisors."* `[A*]` Note AZ leads with *demonstrate understanding*, not merely *find* — an explicit push toward explanation over algorithm-only. | **P1** |

**Critical design note on 4.NBT.B.5 / .B.6:** Arizona does **not** require the standard multiplication algorithm at Grade 4 (that's Grade 5) and does **not** require the standard long-division algorithm at Grade 4 (that's Grade 6). Grade 4 wants **strategies, arrays, and area models with explanation.** `[B]` If you build a drill that only accepts the traditional long-division layout, you are teaching to the wrong target — and you'll miss the errors the standard actually cares about. Build **partial products** and **partial quotients** workspaces.

---

### 3.6 Number & Operations—Fractions (4.NF) — 29–33% of the test, and the highest-leverage domain in the whole grade

Grade 4 expectations are **limited to denominators 2, 3, 4, 5, 6, 8, 10, 12, and 100.** `[A*]` Respect this limit — a randomly generated /7 or /9 problem is out of grade.

| Code | Plain English | Priority |
|---|---|---|
| **4.NF.A.1** ⭐ | **Fraction equivalence.** Explain *why* `a/b = (n×a)/(n×b)` using **visual fraction models**, paying attention to how the *number* and *size* of parts change even though the fraction's value doesn't. `[A*]` — verbatim AZ text confirmed. | **P1** |
| **4.NF.A.2** ⭐ | **Compare two fractions** with different numerators *and* different denominators — by creating common denominators or common numerators, or by comparing to a benchmark like 1/2. Comparisons are valid only when both refer to the **same whole**. Record with `>`, `=`, `<` and justify. `[A]` | **P1** |
| **4.NF.B.3** ⭐ | Understand `a/b` as **a sum of 1/b's**. Four parts: **(a)** join/separate same-denominator fractions; **(b)** decompose a fraction into a sum in more than one way and justify (`3/8 = 1/8+1/8+1/8 = 1/8+2/8`); **(c)** add and subtract **mixed numbers** with like denominators; **(d)** solve word problems with like denominators. `[A]` | **P1** |
| **4.NF.B.4** ⭐ | **Multiply a fraction by a whole number.** **(a)** `a/b = a × (1/b)`; **(b)** `n × (a/b) = (n×a)/b`; **(c)** word problems ("If each of 3 people eats 3/8 of a pound…"). `[A]` | **P1** |
| **4.NF.C.5** | Express a fraction with denominator **10** as an equivalent with denominator **100**, and use that to **add tenths + hundredths** (`3/10 + 4/100 = 34/100`). `[A*]` — verbatim AZ text confirmed. | **P2** |
| **4.NF.C.6** | Use **decimal notation** for fractions with denominators 10 or 100, ⚑ **and locate these decimals on a number line.** `[A*]` — AZ elevates the number line from a CCSS *example* to a **requirement**. Build the number line. | **P1** |
| **4.NF.C.7** | **Compare two decimals** to hundredths by reasoning about size. Comparisons are valid only when both refer to the same whole. `[A*]` — verbatim AZ text confirmed. | **P1** |

**Why fractions are the top priority even beyond their 30% test weight:** Siegler et al. (2012), analyzing nationally representative longitudinal datasets from the US and UK, found that **elementary-school knowledge of fractions and of division uniquely predicts high-school algebra knowledge and overall math achievement 5–6 years later**, after controlling for other math knowledge, general intellectual ability, working memory, and family income and education. `[A]` This is about as strong a causal-adjacent signal as education research produces.

**How to teach them, per the IES/What Works Clearinghouse practice guide** (*Developing Effective Fractions Instruction for Kindergarten Through 8th Grade*, NCEE 2010-4039, panel chaired by Siegler): help students recognize **fractions are numbers that extend the number system beyond whole numbers**, and use the **number line as a central representational tool** from the early grades onward. Fraction *magnitude* understanding is most effectively developed through the number line. `[A]`

---

### 3.7 Measurement & Data (4.MD) — 9–13% of the test

| Code | Plain English | Priority |
|---|---|---|
| **4.MD.A.1** | Know relative sizes of units within one system (km/m/cm; kg/g; lb/oz; L/mL; hr/min/sec). Convert **larger unit → smaller unit**. Record equivalents in a two-column table. `[A]` (Grade 4 does **not** require smaller→larger conversion; that's Grade 5. `[B]`) | **P2** |
| **4.MD.A.2** | Use all four operations to solve word problems ⚑ **"in real-world context"** involving distance, time intervals, liquid volume, mass, and money — including **simple fractions or decimals** — and requiring larger-to-smaller unit expression. Represent quantities with diagrams such as **number line diagrams** with a measurement scale. `[A*]` | **P2** |
| **4.MD.A.3** ⭐ | Apply the **area and perimeter formulas for rectangles** in real-world and mathematical problems. `[A]` Includes the classic inverse problem: *given area and one side, find the other.* | **P1** |
| **4.MD.B.4** | Make a **line plot** of measurements in fractions of a unit (1/2, 1/4, 1/8); solve addition/subtraction problems using the data on it. `[A]` "Represent and interpret data" was named among Grade 4 emphasized clusters. `[A*]` | **P2** |
| **4.MD.C.5** | Understand **angle measure**: an angle is formed by two rays sharing an endpoint; it's measured against a circle centered at that endpoint; an angle turning through **1/360 of a circle is a "one-degree angle."** `[A]` (Note this is fundamentally a *fraction of a circle* idea — a natural cross-link to 4.NF.) | **P2** |
| **4.MD.C.6** | Measure angles in whole-number degrees with a **protractor**; sketch angles of a given measure. `[A]` Genuinely hard to build well on a touchscreen; see note below. | **P3** |
| **4.MD.C.7** | **Angle measure is additive.** Decompose an angle into non-overlapping parts; the whole is the sum of the parts. Solve for unknown angles with an equation. `[A]` | **P2** |

**Note on 4.MD.C.6:** a virtual protractor is a disproportionate amount of engineering for a standard inside a 9–13% cluster. `[B]` Recommend: build **angle estimation and classification** (which is testable and cheap) and let the physical protractor stay physical. If you build a protractor, make it a drag-rotate widget with snapping disabled — snapping teaches nothing.

---

### 3.8 Geometry (4.G) — 4–7% of the test

| Code | Plain English | Priority |
|---|---|---|
| **4.G.A.1** | Draw and identify **points, lines, line segments, rays, angles** (right, acute, obtuse), and **perpendicular and parallel** lines — and find them inside 2-D figures. `[A]` | **P3** |
| **4.G.A.2** | **Classify 2-D figures** by whether they have parallel or perpendicular lines, or angles of a given size. Recognize **right triangles** as a category. `[A]` | **P3** |
| **4.G.A.3** | Recognize a **line of symmetry**; identify line-symmetric figures and draw lines of symmetry. `[A]` | **P3** |

**Honest recommendation:** at 4–7% of the test, geometry is the least efficient place to spend engineering effort. Build it as a light vocabulary/classification module — an identify-and-tap interaction — and move on. `[B]`

---

### 3.9 If the acceleration is real: Arizona Grade 5 math, in brief

For the class-work track. Do not build this before the Grade 4 track is solid. `[B]`

| Domain | Grade 5 additions relative to Grade 4 |
|---|---|
| 5.OA | Order of operations with parentheses/brackets; write and interpret numerical expressions; generate two numerical patterns and graph ordered pairs |
| 5.NBT | Place value to **thousandths**; powers of 10; read/write/compare/round decimals; **standard algorithm** for multi-digit multiplication; divide 4-digit ÷ 2-digit; add, subtract, multiply, divide **decimals to hundredths** |
| 5.NF | Add/subtract fractions with **unlike** denominators; **fraction × fraction**; fraction as division (`a/b = a ÷ b`); scaling/resizing interpretation of multiplication; divide **unit fractions by whole numbers** and whole numbers by unit fractions |
| 5.MD | Unit conversions **within** a system (both directions); line plots; **volume** of right rectangular prisms |
| 5.G | **Coordinate plane** (first quadrant); classify 2-D figures in a **hierarchy** of properties |

Confidence: `[B]` — this is the standard Grade 5 CCSS-derived structure; I did not verify Arizona's Grade 5 wording this session. Arizona's Grade 5 document is at `https://www.azed.gov/sites/default/files/2016/12/Math%20Final%2005Fifth%20Grade%20Standards%204_2_2018.pdf`.

---

## 4. Arizona Grade 4 English Language Arts standards

### 4.1 What's current

- **Arizona's English Language Arts Standards**, adopted by the Arizona State Board of Education in **December 2016**. `[A*]`
- Four strands: **Reading**, **Writing**, **Speaking and Listening**, **Language**, each headed by strand-specific Anchor Standards. Reading splits into **Literature (RL)**, **Informational Text (RI)**, and **Foundational Skills (RF)**. `[A*]`
- **Code format:** `Grade.Strand.Number` — e.g. `4.RL.1`, `4.RF.3`, `4.L.4`. ⚑ **Note this differs from CCSS**, which writes `RL.4.1` (strand first). Arizona puts the **grade first**. `[A*]` If you pull third-party content tagged with CCSS codes, you'll need a translation layer.
- 2025 republications exist (`4th Grade ELA CE.pdf`, `4th Grade ELA Essential and Related Standards.pdf`) carrying the Essential Standards designations. `[A*]`

### 4.2 Where the points are — AASA ELA blueprint, Grades 3–5

| Reporting cluster | % of items |
|---|---|
| Reading Standards for **Literature** | **26–35%** |
| Reading Standards for **Informational Text** | **26–35%** |
| **Writing and Language** (combined) | **26–38%** |
| &nbsp;&nbsp;↳ Writing | 13–19% |
| &nbsp;&nbsp;↳ Language | 13–19% |
| Listening Comprehension | 0–13% |

Source: `AASA ELA Blueprint 2016 Standards` (ADE, Oct 2021). `[A*]`

⚑ **Important structural note:** *"In Grades 3–5, some items in the Reading and Language standards will also be aligned to the standards for Reading: Foundational Skills."* `[A*]` Foundational Skills is not a separate reporting bucket — it's **embedded inside Reading and Language items**. That means morphology (roots and affixes) shows up in both `4.RF.3a` and `4.L.4b` contexts and is worth more than its apparent zero-percent line. Listening items appear **only on the computer-based test.** `[A*]`

---

### 4.3 The defining shift of 4th grade: "learning to read" → "reading to learn"

This is not a slogan; it's a documented and replicated phenomenon.

- **Jeanne Chall** defined the "fourth-grade slump" in 1983: the point at which students — particularly low-income students — fall behind, at the transition from *learning to read* to *reading to learn*. `[A]`
- Chall's finding: low-income students in **grades 2–3** scored **at or above** national averages on reading, spelling, and word meaning. Retested in **grades 4–7**, the **first and largest gap to appear was in word meaning** — vocabulary. `[A]`
- The mechanism: from Grade 4 onward, texts carry **broader vocabulary, heavier content load, and more assumed background knowledge**. To read them, students must be fluent at word recognition *and* have expanding vocabulary and knowledge. `[A]`
- **Vocabulary knowledge predicts comprehension more reliably than any other single factor.** `[A]`
- **NAEP 2024, Grade 4 reading:** only **31%** at or above NAEP *Proficient* — down 2 points from 2022 and 4 points from 2019. About **40%** are **below NAEP *Basic***, the highest share since 2002. **There are now more fourth-graders below Basic than there are at Proficient.** `[A]`

**Design implication, and it is a big one:** the highest-leverage ELA intervention for a 4th grader is not "more reading practice." It is **vocabulary and morphology** — specifically, teaching the machinery (`4.L.4b`, `4.RF.3a`) that lets a student *derive* meaning from unfamiliar multisyllabic words instead of skipping them. One prefix taught well unlocks hundreds of words; one vocabulary word taught well unlocks one. `[B]`

**Text complexity target:** the CCSS-aligned Lexile band for grades 4–5 is **740L–1010L**. `[A]` Any passages you generate or select should sit in that band. Note that Arizona's ELA standards derive from the same framework, so this band applies. `[B]`

---

### 4.4 Reading: Literature (4.RL) — 26–35% of the test

| Code | Plain English | Priority |
|---|---|---|
| **4.RL.1** ⭐ | **Refer to details and examples in the text** when explaining what it says explicitly *and* when drawing inferences. The Grade-4 version of "cite text evidence." | **P1** |
| **4.RL.2** | Determine a **theme** from details in the text; **summarize** the text. | **P1** |
| **4.RL.3** | Describe **in depth** a character, setting, or event, drawing on specific details (a character's thoughts, words, or actions). | **P2** |
| **4.RL.4** | Determine the meaning of words and phrases, including those that **allude to characters found in mythology** (e.g., *Herculean*). | **P2** |
| **4.RL.5** | Explain major differences between **poems, drama, and prose**; refer to structural elements (verse, rhythm, meter; casts, settings, dialogue, stage directions). | **P3** |
| **4.RL.6** | Compare and contrast **point of view**, including the difference between **first- and third-person** narration. | **P2** |
| **4.RL.7** | Make connections between the **text and a visual or oral presentation** of it; identify where each version reflects specific descriptions. | **P3** |
| **4.RL.9** | Compare and contrast the treatment of similar **themes and topics** and **patterns of events** (e.g., the opposition of good and evil) across stories, myths, and traditional literature from different cultures. | **P3** |
| **4.RL.10** | Read and comprehend grade-level literature proficiently, with scaffolding as needed. | (frame) |

*(RL.8 is not applicable to literature — the numbering skips it, as in CCSS. `[A]`)*

Confidence on this table: **codes `[A]`, plain-English content `[A]` (standard framework), exact Arizona wording `[B]`** — I confirmed AZ's code format and several individual standards but not every RL string.

### 4.5 Reading: Informational Text (4.RI) — 26–35% of the test

| Code | Plain English | Priority |
|---|---|---|
| **4.RI.1** ⭐ | **Refer to details and examples in the text** when explaining what it says explicitly and when drawing inferences. | **P1** |
| **4.RI.2** | Determine the **main idea** and explain how **supporting details** back it up; **summarize**. | **P1** |
| **4.RI.3** | Explain **events, procedures, ideas, or concepts** in a historical, scientific, or technical text — including *what happened and why*, based on specific text information. | **P2** |
| **4.RI.4** | Determine the meaning of **general academic and domain-specific words and phrases**. | **P1** |
| **4.RI.5** | Describe the **overall structure** of a text or part of a text: chronology, comparison, cause/effect, problem/solution. | **P2** |
| **4.RI.6** | Compare and contrast a **firsthand and secondhand account** of the same event; describe the differences in focus and information provided. | **P3** |
| **4.RI.7** | Interpret information presented **visually, orally, or quantitatively** — charts, graphs, diagrams, timelines, animations — and explain how it contributes to understanding. | **P2** |
| **4.RI.8** | Explain **how an author uses reasons and evidence** to support particular points. | **P2** |
| **4.RI.9** | **Integrate information from two texts** on the same topic in order to write or speak about it knowledgeably. | **P2** |
| **4.RI.10** | Read and comprehend grade-level informational text proficiently. | (frame) |

Confidence: same as §4.4.

### 4.6 Reading: Foundational Skills (4.RF)

By Grade 4, RF narrows to two standards — but they are the load-bearing ones for the reading-to-learn transition.

| Code | Plain English | Priority |
|---|---|---|
| **4.RF.3** / **4.RF.3a** ⭐ | **Phonics and word recognition.** *"Use combined knowledge of all letter-sound correspondences, syllabication patterns, and **morphology (e.g., roots and affixes)** to read accurately unfamiliar multisyllabic words in context and out of context."* `[A*]` — confirmed. **This is the standard that carries the entire 4th-grade word-attack burden.** | **P1** |
| **4.RF.4** | **Fluency.** *"Read with sufficient accuracy and fluency to support comprehension."* `[A*]` **(a)** read grade-level text with purpose and understanding; **(b)** read grade-level prose and poetry orally with accuracy, appropriate rate, and expression on successive readings; **(c)** use context to confirm or self-correct word recognition, rereading as necessary. `[A]` | **P2** |

**Note:** MTA's ELA program is explicitly rooted in the Science of Reading with systematic phonics `[A*]`, so the school is already covering this well. The app's role here is **morphology practice volume**, not phonics instruction. `[B]`

### 4.7 Writing (4.W) — 13–19% of the test

| Code | Plain English | Priority |
|---|---|---|
| **4.W.1** | Write **opinion pieces** on topics or texts, supporting a point of view with **reasons and information**. `[A*]` — confirmed. Structure: introduce topic, state opinion, create an organizational structure, supply reasons supported by facts and details, link with words/phrases (*for instance, in order to, in addition*), provide a concluding statement. | **P1** |
| **4.W.2** | Write **informative/explanatory texts** that examine a topic and convey ideas clearly — grouping related information in paragraphs, using formatting/illustrations/multimedia, developing with facts/definitions/concrete details/quotations, using precise language and domain-specific vocabulary. | **P1** |
| **4.W.3** | Write **narratives** developing real or imagined experiences with effective technique, descriptive details, and clear event sequences (orienting situation, narrator/characters, dialogue, description, transitional words, sensory details, conclusion). | **P2** |
| **4.W.4** | Produce **clear and coherent writing** appropriate to task, purpose, and audience. | **P2** |
| **4.W.5** | With guidance and support, **plan, revise, and edit**. | **P2** |
| **4.W.6** | With some guidance, use **technology to produce and publish**; **type a minimum of one page in a single sitting**. | **P3** |
| **4.W.7** | Conduct **short research projects** that build knowledge through investigation. | **P3** |
| **4.W.8** | Recall relevant information from experience; **gather from print and digital sources**; **take notes and categorize**; **provide a list of sources**. | **P2** |
| **4.W.9** | **Draw evidence from literary or informational texts** to support analysis, reflection, and research. — *This is the writing-side twin of 4.RL.1/4.RI.1 and directly mirrors what the AASA writing prompt demands.* | **P1** |
| **4.W.10** | Write **routinely** over extended and shorter time frames. | (frame) |

Confidence: codes `[A]`, 4.W.1 wording `[A*]`, remainder `[B]`.

### 4.8 Speaking & Listening (4.SL) — up to 13% (listening only, CBT only)

| Code | Plain English | Priority |
|---|---|---|
| **4.SL.1** | Engage effectively in **collaborative discussions**, building on others' ideas and expressing one's own clearly. | **P3** |
| **4.SL.2** | **Paraphrase** portions of a text read aloud or information presented in diverse media and formats. | **P2** — *this is the one that's actually tested, via the CBT listening items.* `[B]` |
| **4.SL.3** | Identify the **reasons and evidence** a speaker provides to support particular points. | **P2** |
| **4.SL.4** | Report on a topic or text, tell a story, or recount an experience in an organized manner with appropriate facts and details. | **P3** |
| **4.SL.5** | Add **audio recordings and visual displays** to presentations. | **P3** |
| **4.SL.6** | Differentiate between contexts calling for **formal vs. informal English**. | **P3** |

Confidence: codes `[A]`, wording `[B]`.

### 4.9 Language (4.L) — 13–19% of the test

**This is where the grammar and conventions expectations live, and it's very concretely specified.**

| Code | Plain English | Priority |
|---|---|---|
| **4.L.1** | **Grammar and usage.** Grade 4 specifically expects: **relative pronouns** (*who, whose, whom, which, that*) and **relative adverbs** (*where, when, why*); **progressive verb tenses** (*I was walking / I am walking / I will be walking*); **modal auxiliaries** (*can, may, must*); **ordering adjectives** within a sentence per conventional patterns (*a small red bag*, not *a red small bag*); **prepositional phrases**; producing **complete sentences** and recognizing/correcting **fragments and run-ons**; correctly using **frequently confused words** (*to/too/two*, *there/their/they're*). | **P1** |
| **4.L.2** | **Capitalization, punctuation, spelling.** Correct capitalization; **commas and quotation marks** to mark direct speech and quotations from a text; **comma before a coordinating conjunction** in a compound sentence; spell grade-appropriate words correctly, consulting references as needed. | **P1** |
| **4.L.3** | **Knowledge of language.** Choose words and phrases to **convey ideas precisely**; choose punctuation for effect; differentiate contexts calling for formal English. | **P2** |
| **4.L.4** ⭐ | **Word meaning.** **(a)** use **context clues**; **(b)** ⭐ *"Use common, grade-appropriate **Greek and Latin affixes and roots** as clues to the meaning of a word (e.g., telegraph, photograph, autograph)."* `[A*]` — confirmed; **(c)** consult reference materials (dictionaries, glossaries, thesauruses), print and digital. | **P1** |
| **4.L.5** | **Figurative language and nuance.** Explain the meaning of **similes and metaphors** in context; recognize and explain common **idioms, adages, and proverbs**; demonstrate understanding of words by relating them to **antonyms and synonyms**. | **P2** |
| **4.L.6** | Acquire and use accurately grade-appropriate **general academic and domain-specific** words and phrases, including those signaling precise actions, emotions, or states of being, and those basic to a particular topic. | **P1** |

Confidence: codes `[A]`, 4.L.4b wording `[A*]`, remaining wording `[B]` (this is the standard framework content; Arizona is CCSS-derived here).

### 4.10 Arizona-specific: handwriting / cursive

Search extraction of Arizona's Grade 4 ELA materials surfaced an expectation that students **"read and write cursive letters, upper and lower case."** `[A*]` Arizona added explicit handwriting expectations that are **not present in CCSS** ⚑. I could not confirm the exact code (likely embedded in `4.L.1` or a separate foundational-skills line) or the precise grade-4 wording. `[?]`

**Design implication:** irrelevant for a screen-based app — **do not build a cursive module.** Handwriting requires paper and a pencil grip; a touchscreen teaches the wrong motor pattern. Note it only so you're aware it's a real school expectation your app is *not* covering. `[C]`

---

## 5. AASA — Arizona's Academic Standards Assessment

### 5.1 What it is

| Attribute | Detail | Confidence |
|---|---|---|
| Full name | **Arizona's Academic Standards Assessment (AASA)** | `[A]` |
| What it replaced | AzMERIT / AzM2 | `[A]` |
| Grades tested | **Grades 3–8**, all Arizona public school students | `[A]` |
| Subjects | **English Language Arts** and **Mathematics** | `[A]` |
| Science | **AzSCI** — a separate statewide science test, administered in **Grades 5 and 8** (and high school). **A 4th grader takes no science test.** | `[A]` |
| Vendor / platform | **Pearson**, delivered via **TestNav** | `[A*]` |
| Default mode | **Computer-based** by default; paper-based is the exception | `[A*]` |
| Item types | Multiple choice plus **technology-enhanced item types** (drag-and-drop, hot spot, multi-select, equation/graphing entry) | `[A*]` |
| Adaptive? | **Not confirmed.** No source indicated AASA is computer-adaptive; the blueprint's fixed domain percentages and fixed unit structure are more consistent with fixed-form delivery, but I am **not asserting this**. | `[?]` |
| **Timing** | **All AASA Writing, Reading, and Math test units are UNTIMED.** | `[A*]` |

### 5.2 What a 4th grader specifically faces

**Test structure for Grade 4** `[A*]`:

| Subject | Units |
|---|---|
| **ELA** | **1 Writing unit + 2 Reading units** (Reading Unit 1, Reading Unit 2) |
| **Mathematics** | **2 units** |

**The Writing unit.** Every grade level 3–8 has one. Each Writing test presents **one or more passages that relate to a prompt**, and students compose a written response to it. `[A*]` **Scratch paper is permitted** on both computer-based and paper-based Writing tests so students can draft before composing a final copy. `[A*]`

A published ADE Grade 4 example prompt: *"Write a multiparagraph informative essay explaining how some animals are able to survive in harsh environments."* `[A*]` The pattern is: **multiple sources → multi-paragraph essay → source-based**. This is exactly `4.W.2` + `4.W.9` in combination. `[B]`

ADE publishes scoring rubrics and **annotated student writing samples for Grade 4** (`Annotated Writing Samples Guide_Grade 4`) — these are the single best free artifact for calibrating what "good enough" looks like. `[A*]`

### 5.3 Timing in the school year

- **2025–2026 window:** computer-based AASA for grades 3–8 ELA and Math ran **March 30 – April 24, 2026**. Writing tests and Grade 3 ELA Oral Reading Fluency had to be complete by **April 10, 2026**. `[A*]`
- **2026–2027 window:** not yet published as of this writing. `[?]` Expect a comparable **late-March-through-April** window. `[B]`
- ADE publishes a `Detailed Testing Calendar` PDF each year; check `https://www.azed.gov/assessment/aasa` in fall 2026 for the exact 2027 dates. `[A]`

**Design implication:** you have from **August 2026 to roughly late March 2027** — about **seven months, ~30 school weeks** — before the test. At 15 minutes/day, 5 days/week, that's roughly **37 hours of practice time**. That is a real but finite budget, and it is the strongest argument for ruthless prioritization by blueprint weight. `[B]`

### 5.4 Essential Standards (new, 2025–26 onward)

- **What:** individual standards selected to receive a **greater proportion of questions** on AASA. `[A]`
- **Scope:** ELA and math, **grades 3–8**. `[A]`
- **Effective:** beginning with the **2025–2026 school year**. `[A]`
- **Not a narrowing:** *"ALL standards remain valid and subject to inclusion in each year's AASA."* Essentials simply get more items, within the existing State-Board-adopted blueprint. `[A]`
- **Where to find the Grade 4 lists:** marked **green and starred (\*)** inside the ADE grade-level standards PDFs `[A*]`, and in dedicated files (`4th Grade ELA Essential and Related Standards.pdf`). `[A*]`
- **Caveat from ADE materials:** *"Each given year an Essential Standard Cluster... may or may not be reported, depending upon the final form."* `[A*]`

⚠️ **I could not extract the complete Grade 4 Essential Standards list.** `[?]` The ⭐ markers in my §3 and §4 tables are my **best reconstruction** `[B]` from (a) the emphasized clusters that search extraction surfaced ("Use the four operations with whole numbers to solve problems," "Gain familiarity with factors and multiples," "Represent and interpret data," "Generate and analyze patterns") and (b) blueprint weight. **Open the two ADE PDFs and correct my stars.** This is the single highest-value 20 minutes of verification in this document.

---

## 6. Common struggle points — what the evidence actually says

### 6.1 The national picture (NAEP 2024, most recent published)

| Measure | Grade 4 result | vs. 2022 | vs. 2019 |
|---|---|---|---|
| **Math**, at/above *Proficient* | **39%** | up | **down ~2 pts** |
| **Math**, at/above *Basic* | **76%** | up 2 pts | — |
| **Math**, **below** *Basic* | **24%** | down 1 pt | **up 5 pts** |
| **Reading**, at/above *Proficient* | **31%** | down 2 pts | **down 4 pts** |
| **Reading**, **below** *Basic* | **~40%** | up from 37% | highest since 2002 |

`[A]` — Sources: nationsreportcard.gov 2024 reports; NAGB news release. Note: one search extraction gave "+4 points vs 2022" for math proficiency where others imply +3; treat the exact delta as `[?]` and the level (39%) as `[A]`. Math partially recovered post-pandemic; **reading did not** — it got worse, and more 4th graders are now below Basic than are Proficient. `[A]`

**NAEP 2026 was administered in early 2026; results were not published as of August 2026.** `[B]`

### 6.2 Documented struggle point #1 — Fractions

**Evidence, not folk wisdom:**
- **Siegler et al. (2012), *Psychological Science*:** elementary students' knowledge of **fractions** and of **division** uniquely predicts high-school algebra knowledge and overall math achievement 5–6 years later, controlling for other math knowledge, general intellectual ability, working memory, and family income/education. Replicated across US (PSID-CDS) and UK (British Cohort Study) longitudinal datasets. `[A]`
- **IES/WWC practice guide (NCEE 2010-4039)** exists *specifically because* fractions are a known systemic failure point K–8. Its central recommendation: students must understand fractions **as numbers with magnitude**, taught via the **number line**. `[A]`
- **National Mathematics Advisory Panel (2008):** fluency with **whole numbers and fractions** is part of the "critical foundation" for learning algebra. `[A]`

**Specific error mechanism — "whole number bias" / "natural number bias":** children apply whole-number reasoning to rational numbers. The classic manifestation is **"longer is larger"**: judging 0.45 > 0.8 because 0.45 has more digits. `[A]` Research on inhibitory control shows overcoming digit-length interference requires actively *suppressing* whole-number reasoning — it is not merely a knowledge gap, it's an inhibition problem. `[A]` Longitudinal work shows a small core of students retains "longer-is-larger" persistently, while others cycle in and out of "shorter-is-larger." `[A]`

**Build implication:** you cannot fix whole-number bias with more procedure practice. You fix it with **magnitude comparison on a number line**, and with **deliberately targeted contrast items** (0.45 vs 0.8; 1/3 vs 1/4 — where the bigger denominator is the *smaller* fraction). `[B]`

### 6.3 Documented struggle point #2 — Division

Division is the **second** unique predictor in Siegler et al. (2012), alongside fractions. `[A]` It is also structurally hard in Grade 4 for three compounding reasons: `[B]`

1. It requires **automatized multiplication facts** as a subroutine.
2. It requires **remainder interpretation**, which is a modeling skill, not an arithmetic skill — and Arizona explicitly extends it: *"Understand how the remainder is a fraction of the divisor."* `[A*]`
3. Arizona's Grade 4 standard asks students to **"demonstrate understanding of division"** `[A*]` — an explanation demand, not just a computation demand.

### 6.4 Documented struggle point #3 — Multiplication/division fact automaticity

- **NMAP (2008):** students must develop **automatic recall of basic facts** to be prepared for algebra. Computational proficiency depends on "sufficient and appropriate practice to develop automatic recall of addition and related subtraction facts, and of multiplication and related division facts." Conceptual understanding and fact fluency are **mutually supportive, not competing** for time. `[A]`
- Multiplication is more automaticity-dependent than addition: students have **fewer rapid backup strategies** in multiplication if the times tables aren't in long-term memory. `[A]`
- Students fluent in facts **have more working memory available for problem solving**; students who aren't must work harder and longer on complex problems, which causes frustration and compounds difficulty. `[A]`
- Practitioner-research literature repeatedly documents that teachers *assume* fact fluency was acquired in earlier grades and therefore **stop teaching it**, leaving gaps unaddressed at Grade 4. `[A]`

### 6.5 Documented struggle point #4 — Vocabulary and the reading-to-learn cliff

Covered in §4.3. The headline: Chall's finding that the **first and largest gap to emerge in grades 4–7 is in word meaning**, and that **vocabulary predicts comprehension more reliably than any other single factor**. `[A]` Combined with NAEP 2024's ~40% below Basic in Grade 4 reading `[A]`, this is a national struggle point at least as severe as fractions.

### 6.6 Not verified

- **Which NAEP Grade 4 math *subscale* is weakest** (number/measurement/geometry/data/algebra). Detailed subscale breakdowns exist at nationsreportcard.gov but I could not retrieve them. `[?]`
- **Arizona-specific AASA item-level weak spots.** ADE publishes Performance Level Descriptors (`AASA_Math_PLD_Grade4.pdf`) and Item Specifications (`AASA Math Item Specs Grade 4_2021.pdf`) — both would sharpen this section. `[?]`

---

## 7. Design constraints for a 9–10 year old

### 7.1 Session length — what the evidence supports

**The popular rule is weakly evidenced.** "Two to three minutes per year of age" (giving 18–30 min for a 9-year-old) is developmental folk guidance widely repeated in practitioner sources; some place the upper limit at five minutes per year. `[?]` — I found no peer-reviewed origin. Treat it as a heuristic, not a finding.

**What the research actually shows:**
- A large-scale observational study of elementary students (K–4) found **on-task behavior declined as instructional duration increased from 10 to 30 minutes**. `[A]`
- The **vigilance decrement** is well established: with time-on-task, response times slow and detection accuracy drops. Demonstrated in children as young as 5–7 on psychomotor vigilance tasks. `[A]`
- **Distributed beats massed practice.** A study of third graders found those practicing basic addition **4 minutes/day distributed** (four 1-minute sessions, or two 2-minute sessions) **outperformed** those practicing 4 massed minutes. `[A]` Another third-grade study: distributed practice **70% correct** vs massed **53%**. `[A]`
- Practitioner sources cite 20 minutes of sustained focus on a single task as normal at age 10, with a range of 20–50 minutes — but from low-quality sources. `[?]`
- Sustained attention is heavily modulated by **task complexity, hunger, sleep, distraction, and interest**. `[A]`

**Concrete recommendation:**

| Parameter | Value | Basis |
|---|---|---|
| **Core session length** | **10–15 minutes** | On-task decline from 10→30 min `[A]`; keeps the whole session inside the pre-decrement window |
| **Hard cap** | **20 minutes**, then the app suggests stopping | `[B]` |
| **Sessions per day** | **1–2**, separated by hours | Distributed > massed `[A]` |
| **Micro-block within session** | Change activity type every **3–5 minutes** | `[C]` — resets task-set, exploits interest modulation `[A]` |
| **Fact-fluency drill** | **2–4 minutes max**, as its own micro-block | Directly from the 4-min distributed addition study `[A]` |
| **Weekly cadence** | **5 days/week** short beats 2 days/week long | Distributed practice `[A]` |

**Design rule:** the app should *end the session itself.* Never rely on a 9-year-old to self-regulate stopping — and never let the session length be determined by "how many problems are left." A session ends on a **timer**, at a **clean boundary**, with the state saved. `[C]`

### 7.2 UI reading level — the interface must never be the bottleneck

**The principle:** UI text is *overhead*. Every cognitive cycle spent decoding a button label is a cycle not spent on fractions. Since the student reads at roughly Grade 4, **UI chrome should target Grade 2**.

**How to measure:**
- **Flesch-Kincaid Grade Level (FKGL)** — the most widely used English readability formula; based on average sentence length and average syllables per word; output maps to US grade levels. `[A]`
- **Flesch Reading Ease (FRE)** — same inputs, 0–100 scale. **90–100 = "very easy," suitable for young children.** `[A]`
- Both are computable offline in a few lines; no service call required, which matters for your privacy posture (§7.9). `[C]`

**Concrete targets:**

| Text class | Target | Rationale |
|---|---|---|
| **Buttons, labels, menu items** | FKGL **≤ 2.0**; ideally 1–3 words | `[B]` |
| **Instructions, prompts, feedback messages** | FKGL **≤ 3.0**, FRE **≥ 90** | Two grades below the reader `[B]`, "very easy" band `[A]` |
| **Error / hint text** | FKGL **≤ 3.0** | Read under stress — must be maximally easy `[B]` |
| **Math word problems** | **Grade 4 level** — this is *content*, not chrome, and the standards require reading it | `[B]` |
| **Reading passages** | **740L–1010L** (grades 4–5 Lexile band) | `[A]` |

**Concrete authoring rules for UI copy** `[C]`:
1. **≤ 10 words per sentence.** One idea per sentence.
2. **Prefer one- and two-syllable words.** *Use* not *utilize*; *pick* not *select*; *next* not *proceed*.
3. **Active voice, present tense, second person.** "Tap the bigger fraction." Not "The larger fraction should be selected."
4. **One instruction per line.** Never compound: no "and then," no "after you've."
5. **No idioms, no metaphors for actions.** "Nail it," "crush it," "level up" are decoding traps.
6. **Verb consistency.** If it's *Tap* on one screen it's *Tap* everywhere — never *Press*, *Choose*, *Click*.
7. **Numerals, not words, for numbers.** "3 left," not "three left."
8. **No jargon, ever** — including *your* jargon: no "streak," "XP," "mastery threshold" without a plain-word equivalent.
9. **Gate it in CI.** Compute FKGL over every user-facing string at build time; fail the build above threshold. This is ~40 lines of code and it permanently prevents drift.
10. **Read every string aloud.** If you stumble, a 9-year-old will stop.

### 7.3 Extrinsic rewards vs. intrinsic motivation — the honest state of the evidence

This is genuinely contested. Here is what each side actually established.

**The case that rewards harm (strongest evidence):**
- **Deci, Koestner & Ryan (1999),** meta-analysis of **128 studies**, *Psychological Bulletin*. Free-choice intrinsic motivation was significantly undermined by:
  - **engagement-contingent** rewards: **d = −0.40**
  - **completion-contingent** rewards: **d = −0.36**
  - **performance-contingent** rewards: **d = −0.28**
  - and by *all* rewards, *all tangible* rewards, and *all expected* rewards. Self-reported interest was also undermined (d = −0.15 to −0.17). `[A]`
- ⚠️ **"Negative effects on intrinsic motivation are more serious for children than for college students."** `[A]` **This is the finding that matters most for your build.**
- This meta-analysis was a direct rebuttal to Cameron & Pierce, which had concluded rewards were largely harmless; Deci et al. argued that analysis was "seriously flawed" and its conclusions incorrect. `[A]` The dispute has never been fully resolved, but the 1999 analysis is the more widely accepted position in self-determination theory. `[B]`

**The case that rewards can help (also real):**
- **Verbal rewards praising competence** can *enhance* perceived self-determination and **increase** intrinsic motivation. `[A]`
- **Unexpected rewards** delivered *after* completion largely **do not** undermine; the damage comes from rewards anticipated *before* the task. `[A]`
- **The mechanism is informational vs. controlling.** Every external event has a *controlling* aspect (pressure to produce an outcome) and an *informational* aspect (meaningful signal about performance). Feedback perceived as **informational** supports competence and autonomy; feedback perceived as **controlling** reduces self-determination. `[A]`
- **Praise helps most when it** attributes performance to controllable causes, promotes autonomy, builds competence **without social comparison**, and conveys attainable standards. `[A]`
- **Gamification meta-analysis (Sailer & Homner, 2020, *Educational Psychology Review*):** significant effects on **cognitive** (g = 0.49), **motivational** (g = 0.36), and **behavioral** (g = 0.25) learning outcomes. Crucially: **the cognitive effect was stable** under high-methodological-rigor subsplit analysis, while **motivational and behavioral effects were less stable.** `[A]`

**On Duolingo-style streaks — be skeptical:**
- Widely circulated figures ("streaks lifted retention from 12% to 55%," "engagement +60%," "churn 47%→28%") come from **marketing blogs and vendor case studies**, not peer review. `[?]` **Do not build design decisions on them.**
- One peer-reviewed study (n=247 Duolingo learners) found gamification features influenced motivation **primarily through competence and relatedness** — i.e., through SDT-consistent needs, not through the streak per se. `[A]`
- The streak's actual mechanism is **loss aversion**: fear of losing accumulated progress. `[A]` Duolingo's own streak-freeze and streak-repair features exist because *the moment a streak breaks is the moment the habit dies.* `[A]` That is an admission that the mechanic is fragile.
- There is published academic work on **"gamification misuse"** in language-learning apps — the concern that gamification optimizes *engagement metrics* rather than *learning outcomes*. `[A]`

**Practical guidance — how to use rewards without wrecking intrinsic interest:**

✅ **Do:**
1. **Make rewards informational, not controlling.** Progress should *report* competence ("You can now compare fractions with unlike denominators"), not *pay* for compliance. `[A]`
2. **Prefer competence feedback to tokens.** A filling mastery bar tied to a real skill is informational. A coin is not. `[B]`
3. **Use unexpected, non-contingent celebration.** A surprise animation after a genuinely hard problem doesn't undermine; a promised one does. `[A]`
4. **Reward effort and strategy, not raw correctness.** Attribution to controllable causes is what protects persistence. `[A]`
5. **Avoid social comparison entirely.** No leaderboards. Praise builds competence best *without* social comparison `[A]` — and there's only one user anyway.
6. **Let the content be the reward.** Unlocking a genuinely more interesting problem type is intrinsic; unlocking a hat is not. `[B]`

❌ **Don't:**
1. **Don't punish streak breaks.** A "you lost your 14-day streak" screen is pure loss aversion aimed at a 9-year-old, and it converts a missed day into a reason to quit. If you track consecutive days, display it **neutrally and forgivingly** — "You've practiced 14 days this month" is a count, not a threat. `[B]`
2. **Don't make rewards expected and tangible.** That's the exact combination with the strongest undermining effect `[A]`, worst in children `[A]`.
3. **Don't gate content behind currency.** That's controlling by definition. `[B]`
4. **Don't optimize for time-in-app.** Your success metric is *mastery per minute*, not minutes. This is the single biggest divergence between your incentives and a commercial app's — **use it.** `[B]`

**Bottom line:** you are building for one child whose engagement you can observe directly and whose retention you don't need to monetize. That removes nearly all the pressure that makes commercial apps lean on extrinsic mechanics. **Use the freedom.** Build competence signals, not a casino.

### 7.4 Mastery-based progression

**The evidence is good and unusually consistent.**

- **Kulik, Kulik & Bangert-Drowns (1990),** meta-analysis of **108 controlled evaluations**, *Review of Educational Research*: mean effect **d = 0.52** across 103 studies — moderately large. `[A]`
- **Effects are larger for weaker students** (d = 0.61) than stronger ones (d = 0.40) `[A]` — mastery learning compresses variance.
- A more recent meta-analysis of 36 mastery-learning studies found **d = 0.59**. `[A]`
- **Courses with a higher mastery threshold showed larger effects.** `[A]` Set the bar high.
- Documented outcomes: improved achievement, improved final exam scores, better attitude toward learning and content, and **less variation in performance**. `[A]`

**Concrete design:**

| Parameter | Recommendation | Basis |
|---|---|---|
| Mastery threshold | **~85–90% correct**, sustained | Higher thresholds → larger effects `[A]` |
| Mastery evidence | **N consecutive correct across ≥2 separate sessions** (e.g., 5 in a row, on two different days) — not one lucky run | `[B]`, prevents session-local flukes and requires retention |
| Decay | Mastery should **expire** if unpracticed; skill returns to the review queue | `[B]`, integrates with spacing (§7.5) |
| Prerequisites | Gate skills on prerequisite mastery (fact fluency → multi-digit multiplication → division → fraction-of-a-set) | `[B]` |
| Never do | Never gate on *time spent* or *problems attempted*. Mastery is the unit. | `[B]` |

### 7.5 Spaced repetition — intervals for this age and content

**The evidence:**
- **Cepeda et al. (2008), *Psychological Science*** ("Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention"), n > 1,350: increasing the inter-study gap first **increases**, then gradually **reduces**, test performance. There is an optimal gap, and it **scales with the retention interval**. `[A]`
- **Optimal gap ≈ 10–20% of the desired retention interval.** More precisely: ~20% of a test delay of a few weeks, declining to ~5–10% for a one-year delay. `[A]`
- **Retrieval practice is effective at all levels of education including elementary school**, and **spaced** retrieval specifically. `[A]`

**Applying this to your case.** Your retention interval is defined: **from today to the AASA in late March 2027 ≈ 7 months ≈ 210 days.** But you also want mastery to persist into Grade 5. Two horizons:

| Purpose | Retention interval | Optimal gap (10–20%) | Practical schedule |
|---|---|---|---|
| Hold a skill until the AASA | ~210 days | 21–42 days | Review each mastered skill roughly **monthly** |
| Hold a skill until next unit test | ~30 days | 3–6 days | Review **weekly** |
| Consolidate a *newly* learned skill | ~14 days | 1.5–3 days | Review at **+1, +3, +7 days** |

**Recommended expanding schedule for a newly mastered Grade 4 skill** `[B]` (derived from `[A]` principles, tuned conservatively for a 9-year-old whose forgetting is faster than an adult's):

```
Day 0   — learn to mastery
Day +1  — first review
Day +3  — second review
Day +7  — third review
Day +16 — fourth review
Day +35 — fifth review
then every ~30-45 days until the test
```

**Adaptive rule:** on a **miss**, drop back two steps (not to zero — that's demoralizing and wastes time). On a **hit**, advance one step. `[B]`

**Ceiling:** cap the daily review queue at **8–12 items**, roughly 3–5 minutes. `[B]` An uncapped SRS queue is how adult users burn out; a 9-year-old will quit far faster.

**And critically — interleave the review queue.** See §7.6.

### 7.6 Retrieval practice — and interleaving, which may be your single biggest win

**Retrieval practice:**
- Karpicke and colleagues tested **88 children (mean age 10 — exactly your target)** on studied words: retrieval practice produced **robust benefits over restudying**, and the benefit was **independent of individual differences in reading comprehension and processing speed** `[A]` — meaning it works regardless of where the child sits on those dimensions.
- **Learning is enhanced by the act of retrieval, not by testing per se.** `[A]`
- Retrieval works when the learner must **reinstate a prior context**; **massed retrieval immediately after seeing an item is ineffective.** `[A]` — So a "check your answer" that re-shows the item you just saw teaches nothing. Delay matters.
- **Frequent, low-stakes, ungraded** retrieval is the recommended classroom form. `[A]`

**Interleaving — the standout finding:**
- **Rohrer, Dedrick, Hartwig & Cheung (2020), *Journal of Educational Psychology*:** randomized controlled trial, **787 students in 54 classes across 5 schools**. Practice problems were rearranged so each assignment mixed **different kinds** of problems rather than blocking one type.
- **Result: d = 0.83** (95% CI [0.68, 0.97]) — blocked practice scored **38%** on the delayed test; interleaved scored **61%**. The test came **at least one month** after practice. `[A]`
- **Mechanism:** in blocked practice, "students know which strategy is needed to solve each problem before they read the problem." Interleaving forces **strategy selection from the problem itself.** `[A]`
- Cost noted honestly by the researchers: **teachers reported interleaved assignments took more time.** `[A]`

**Concrete build rules:**
1. **Every session opens with a 5-item interleaved retrieval warm-up** drawn from *previously mastered* skills — mixed domains, no labels, no headers announcing the skill. `[B]`
2. **Never label a problem set with its skill.** "Fractions Practice: Set 3" destroys the strategy-selection demand that produces the d = 0.83. Label by session, not by skill. `[B]`
3. **Free response over recognition** wherever entry allows it. Multiple choice permits recognition, which is a weaker retrieval act. `[B]` (Exception: AASA items *are* often multiple choice, so include some for format familiarity. `[B]`)
4. **Never re-show an item immediately after a miss.** Requeue it later in the session — massed re-retrieval is ineffective. `[A]`
5. **Keep it low-stakes.** No score displayed during a retrieval warm-up. `[A]`

### 7.7 Immediate corrective feedback — what form actually works

**The evidence is decisive** — Van der Kleij, Feskens & Eggen (2015), *Review of Educational Research*, meta-analysis of 40 studies / 70 effect sizes in computer-based learning environments:

| Feedback type | What it is | Effect size |
|---|---|---|
| **KR** — Knowledge of Result | "Wrong." / "Correct." | **0.05** |
| **KCR** — Knowledge of Correct Response | "Wrong. The answer is 3/4." | **0.32** |
| **EF** — **Elaborated Feedback** | "Wrong — *and here's why*." | **0.49** |

`[A]` Additional findings from the same meta-analysis:
- **EF is particularly more effective than KR and KCR for higher-order learning outcomes.** `[A]`
- **Effect sizes were larger for mathematics** than for social sciences, science, or languages. `[A]`
- **Delayed feedback timing reduced effect sizes.** `[A]` → **Give feedback immediately.**
- ⚠️ Effect sizes were **negatively affected in primary and high school** populations vs. higher ed `[A]` — i.e., feedback works, but less strongly for your age group than the headline numbers imply. Don't over-promise to yourself.

**Worked examples — the right *form* of elaborated feedback:**
- **The worked example effect:** novices given worked examples to study outperform novices required to solve the equivalent problems themselves. Widely replicated within Cognitive Load Theory. `[A]`
- **Why:** worked examples reduce **extraneous cognitive load**, freeing working memory for the underlying principle. Novices asked to solve too early fall back on trial-and-error and guessing, which overloads working memory and blocks learning. `[A]`
- **Faded worked examples:** progressively omit steps so the learner takes over. `[A]`
- **Expertise reversal effect:** worked examples become **redundant, even harmful,** for learners who've gained expertise — they then benefit more from problem solving. `[A]` **So fade them out based on mastery**, don't show them forever.

**The feedback ladder — recommended implementation** `[B]`, built on `[A]` findings:

```
Attempt 1 wrong
  → EF Level 1: name the error type, don't give the answer.
    "You added the denominators. Denominators tell you the
     size of the piece — they don't get added."
    Then: Try again.

Attempt 2 wrong
  → EF Level 2: a fully worked example of a DIFFERENT but
    structurally identical problem, step by step.
    Then: Try the original again.

Attempt 3 wrong
  → KCR + full worked solution of THIS problem.
    Mark the skill "not mastered." Requeue for a later session.
    Move on immediately — do not let a 9-year-old sit on
    a fourth attempt.
```

**Error-specific messages require an error taxonomy.** This is real work but it is where most of the app's educational value lives. For each skill, enumerate the 3–6 canonical wrong answers and their diagnoses. Examples `[B]` (mechanisms per §6.2):

| Skill | Wrong answer pattern | Diagnosis to surface |
|---|---|---|
| 1/4 + 2/4 | 3/8 | Added denominators |
| Compare 1/3 vs 1/4 | picks 1/4 | Whole-number bias: bigger denominator ≠ bigger fraction |
| Compare 0.45 vs 0.8 | picks 0.45 | "Longer is larger" `[A]` |
| 23 × 45 | 8 + 15 → partial | Forgot the place-value shift in partial products |
| 47 ÷ 5 | "9" | Dropped the remainder instead of interpreting it |
| 47 ÷ 5 | "9 r2" where problem needed 10 buses | Didn't interpret the remainder in context (4.OA.A.3) |

**Guard against hint abuse.** Research on intelligent tutoring systems documents **"gaming the system"** — succeeding by exploiting the system rather than learning, most commonly via **systematic guessing** or **hint abuse** (rapidly clicking through hints to reach the "bottom-out hint" that contains the answer). `[A]` Two forms of help misuse exist: **help avoidance** (under-use) and **help abuse** (over-use). `[A]`

Mitigations `[B]`:
- **Time-gate the hint ladder** — a minimum dwell (~3–5 s) before the next hint unlocks. This alone kills most rapid-click abuse.
- **Reject implausibly fast wrong answers** (< ~1.5 s) as non-attempts rather than counting them.
- Note the nuance: one study found time spent on bottom-out hints **positively related to learning**, interpreted as students self-explaining them like worked-example steps. `[A]` So **don't punish reaching the bottom-out hint** — punish *speed* through it.

### 7.8 Error handling and frustration — protecting a 9-year-old

**Why this matters more than it sounds.**
- Dweck's foundational work on **learned helplessness**: when facing failure, some children show plunging expectations, negative emotion, and **deteriorating performance**. The helpless pattern involves **denigrating their own ability, overestimating how many problems they failed**, and performing *worse* after failure. `[A]`
- The critical split: children who attribute failure to **lack of ability** become discouraged even in domains where they're capable; children who attribute it to **insufficient effort** are **fueled** by setbacks. `[A]`
- **Elementary-aged students are particularly vulnerable to a pessimistic explanatory style** — believing failure is permanent and uncontrollable. `[A]`
- When elementary students received negative feedback on math tasks, their **emotional responses were linked to lower accuracy and lower persistence.** `[A]`

**Be honest about growth mindset, though.** The intervention literature is contested: brief online growth-mindset interventions improved lower-achieving students' grades by about **0.10–0.11 SD** in the National Study of Learning Mindsets; earlier meta-analysis (Sisk et al.) found **d = 0.08** overall; a 63-study meta-analysis (N = 97,672) found **d = 0.05**. Effects are **heterogeneous** — real in some contexts and subgroups, absent in others. `[A]`

**Read this as:** the *attribution* research (helpless vs. mastery-oriented response to failure) is solid and directly relevant `[A]`. The *packaged growth-mindset intervention* — posters, videos, "the power of yet" — has small and inconsistent effects `[A]`. **So build the attribution principle into the interaction design; don't build a mindset lecture.**

**Concrete rules for wrong answers** `[B]`:

✅ **Do:**
1. **Never a bare "Wrong."** Every incorrect response gets a diagnosis (§7.7). Feedback that explains is feedback that doesn't feel like judgment.
2. **Attribute to strategy, not ability.** "That strategy doesn't work here — here's one that does." Never "Not quite!" (empty), never anything implying capability.
3. **Normalize the error.** "Lots of people add the denominators — here's why it doesn't work." Naming an error as *common* separates it from *personal deficiency*.
4. **Cap consecutive failures at 3.** After the third miss, deliver the worked solution, mark not-mastered, and **move to something the child can do.** Ending a bad stretch on a success protects the next session. `[A]` — performance deteriorates after failure in the helpless pattern.
5. **Make difficulty adaptive downward, silently.** If the last 5 items had 3+ misses, swap in easier items from a mastered skill. Never announce it.
6. **Have an always-available, no-cost exit.** A visible, non-judgmental "I want to stop" that saves state and says something neutral. A child who can always leave is a child who doesn't dread starting.
7. **Keep the same visual tone for right and wrong.** No red flash, no buzzer, no sad sound. Color-code by *information* (green = confirmed, blue = here's the explanation), not by *verdict*.
8. **Show progress on skills, not on scores.** "You've got 3 of 4 fraction skills" beats "72%."

❌ **Don't:**
1. No red X, no buzzer, no "Oops!" No error sounds at all — audio failure cues are disproportionately aversive.
2. No visible running score during practice.
3. No countdown timers on conceptual work. (A separate, opt-in, clearly-framed fact-fluency drill may be timed — that's a different task type. `[B]`)
4. No comparison to any other person, real or fictional.
5. No "you failed this level" framing. Skills are *not yet mastered*; they are never *failed*.
6. Never make the child re-do a whole set because of one miss.

### 7.9 Accessibility — concrete numbers

**Contrast (WCAG 2.1/2.2):**

| Requirement | Ratio | Applies to |
|---|---|---|
| **AA — normal text** | **4.5:1** | Body text `[A]` |
| **AA — large text** | **3:1** | ≥18pt, or ≥14pt bold `[A]` |
| **AAA — normal text** | **7:1** | `[A]` |
| **AAA — large text** | **4.5:1** | `[A]` |
| **AA — non-text / UI components** | **3:1** | Icons, input borders, focus rings, graph elements `[A]` |

*Large text* is formally defined as **14pt bold (≈18.66px)** or **18pt (≈24px)**. `[A]` The 4.5:1 threshold compensates for contrast-sensitivity loss equivalent to ~20/40 vision; 7:1 compensates for ~20/80. `[A]`

**Recommendation: target AAA (7:1) for all body and problem text.** `[B]` You have one user, one design, and no brand constraints — there is no reason to settle for AA. Reserve 4.5:1 as the absolute floor for decorative/secondary text only.

**Touch targets:**

| Standard | Size | Note |
|---|---|---|
| **WCAG 2.2 SC 2.5.8 (AA)** | **24 × 24 CSS px** | Absolute floor `[A]` |
| **Apple HIG** | **44 × 44 pt** | `[A]` |
| **Google Material** | **48 × 48 dp** (≈7–10 mm) | `[A]` |
| **Children 7–10 (research)** | **miss 7 mm targets ~30% of the time** — vs. 20% for ages 11–17 | `[A]` |
| **Nielsen Norman Group, for children** | **2 cm × 2 cm** — **4× the area** recommended for adults (1 cm × 1 cm) | `[A]` |

**Recommendation: minimum 20 mm × 20 mm (≈2 cm) for every interactive target**, which on a typical tablet is roughly **75–80 CSS px**. `[B]` Add **≥ 8 mm spacing** between adjacent targets to prevent mis-taps. `[C]` This is dramatically larger than adult standards and it is the right call: a 30% miss rate on 7 mm targets `[A]` would make the interface itself a source of failure — precisely the thing §7.2 and §7.8 exist to prevent.

**Typography:**

| Parameter | Recommendation | Basis |
|---|---|---|
| Body text minimum | **18 pt on phone, 16 pt on desktop/e-ink, 10.5 pt on tablet** per a multicentre cross-sectional study of optimized font size for young children's online learning | `[A]` |
| Practical single value | **≥ 20 px** body text for children's digital products (some sources: 20px digital / 14pt print) | `[A]` |
| Problem/equation text | **≥ 28–32 px** | `[B]` — math notation has higher per-glyph information density |
| Typeface | **Sans-serif**, with **long ascenders and descenders** — easier for children to process; reduces letter confusion | `[A]` |
| Line length | **~45–60 characters** | `[C]` |
| Line height | **≥ 1.5×** font size | `[C]` |
| **Letter spacing** | **Increase it — this is the evidence-backed one** | `[A]`, see below |

**On dyslexia — what helps vs. what's myth:**

❌ **Myth: "dyslexia fonts."**
- **No reliable research evidence** that special dyslexia fonts have any beneficial effect; peer-reviewed studies find no improvement from **OpenDyslexic** or **Dyslexie**. `[A]`
- A **meta-analysis** of dyslexia-friendly fonts found **no consistent or reliable effect** on reading speed or accuracy. `[A]`
- A 2017 study found OpenDyslexic **reduced** reading speed and accuracy. `[A]` Eye-tracking of Spanish readers with dyslexia found OpenDyslexic did **not** improve reading time or shorten fixations. `[A]`
- Children with dyslexia did **not** read Dyslexie faster or more accurately than **Arial**. `[A]`
- **None** of the students in one study preferred OpenDyslexic; the majority preferred **Arial**. `[A]`

✅ **What actually works: extra-large letter spacing.**
- **Zorzi et al. (2012), *PNAS*** ("Extra-large letter spacing improves reading in dyslexia"): increasing spacing between characters and words improved dyslexic children's reading **without any prior training** — **~20% faster on average with half as many errors** (reported elsewhere in the same work as ~10% faster with ~50% fewer errors for children around age 10). `[A]`
- **Replicated** across measurement sessions, different reading materials, and **two languages** (Italian and French). `[A]`

**Recommendation** `[B]`: use a plain, well-drawn **sans-serif with open apertures and long ascenders/descenders** (Arial, Verdana, Atkinson Hyperlegible, Lexend, or the platform system font). Ship a **user-adjustable letter-spacing control** ranging roughly 0 to +0.15em, and a line-spacing control. **Do not ship OpenDyslexic.** If you want to offer it as a preference toggle because the child likes it, that's fine — preference is legitimate — but do not present it as an accessibility feature, because it isn't one. `[A]`

**Other accessibility musts** `[C]`:
- **Never encode information in color alone** (WCAG 1.4.1).
- **Respect OS text-size settings**; use relative units throughout.
- **Support landscape and portrait**; never lock orientation.
- **Visible focus indicators** at ≥ 3:1 contrast if any keyboard input exists.
- **No flashing** above 3 Hz (WCAG 2.3.1).
- **Every sound optional and off by default**, with a global mute.
- **No time limits** on conceptual work — mirroring AASA itself, which is **untimed** `[A*]`.

---

## 8. COPPA — practical implications

### 8.1 When COPPA applies — and why it probably doesn't apply to you

**COPPA (the Children's Online Privacy Protection Rule, 16 CFR Part 312) governs operators of *commercial* websites and online services** directed to children under 13, or general-audience services with actual knowledge they collect personal information from children under 13.

Key scoping facts:
- **"COPPA expressly states that the law applies to commercial websites and online services and not to nonprofit entities that otherwise would be exempt from coverage under Section 5 of the FTC Act."** `[A]`
- Because many nonprofit entities are not subject to Section 5 of the FTC Act, **those entities are not subject to the Rule.** `[A]` (Exception: nonprofits operating for the profit of commercial members may be covered. `[A]`)
- The FTC nonetheless **encourages** non-covered entities to post privacy policies and extend COPPA's protections voluntarily. `[A]`

**Applied to a parent building an app for their own child:**

| Factor | Your situation | COPPA relevance |
|---|---|---|
| Commercial? | No — not sold, not monetized, not advertised | **Strongly against applicability** `[B]` |
| Is there an "operator" collecting from a child? | You are the child's **parent**, and the "service" isn't offered to the public | **Against applicability** `[B]` |
| Is information transmitted online? | If data stays on-device: **no online collection** | **Against applicability** `[B]` |
| Third parties receiving data? | None, if you ship no SDKs | **Against applicability** `[B]` |

**Conclusion: COPPA almost certainly does not apply.** `[B]` — This is a well-supported inference from `[A]` facts about the Rule's commercial scope, **not legal advice**, and I am not a lawyer. If this ever becomes a product — distributed to other families, listed in an app store, monetized in any way, or funded — **the analysis changes completely and you need actual counsel.** `[C]`

### 8.2 What changes if it ever *does* apply — the 2025 amendments

The FTC finalized the **first COPPA Rule amendments since 2013**:
- **Effective June 23, 2025**; general compliance deadline **April 22, 2026** (some provisions earlier). `[A]`
- **Expanded "personal information"** to include **biometric identifiers**. `[A]`
- **Separate verifiable parental consent** required before disclosing children's personal information to third parties for purposes not "integral" to the service. `[A]`
- **New obligations** around the "support for internal operations" exemption. `[A]`
- **Written information security program** and **written data retention policy** now mandatory. `[A]`
- **Indefinite retention prohibited** — data may be kept only as long as reasonably necessary for the purpose it was collected for. `[A]`
- FTC has signaled COPPA enforcement as a priority. `[A]`

**Definitions worth internalizing regardless:**
- **"Collection" includes passive tracking via a persistent identifier** — not just active collection. `[A]`
- **"Personal information"** includes name, address, email, screen name functioning as contact info, phone, SSN, **persistent identifiers (cookies, IP addresses, device serial numbers, unique device IDs)**, photos/video/audio containing the child's image or voice, geolocation to street-and-city precision, and anything else about the child or parent collected alongside one of those. `[A]`
- **Even automatic collection of a persistent identifier** from a child user on a child-directed service requires verifiable parental consent unless an exception applies. `[A]`

**Note the sharp edge:** most apps trip COPPA not through a signup form but through **an analytics SDK quietly transmitting a device identifier.** `[A]` That is the failure mode to engineer against.

### 8.3 The engineering posture — do this regardless of legal applicability

This is cheap, it eliminates the entire question, and it produces a better app.

**Hard rules** `[C]`:

1. **No accounts. No login. No email. No password.** The app opens to content. There is nothing to sign up for.
2. **No PII, including the child's name.** If you want personalization, let the parent set a **display nickname stored locally** and never transmitted. Prefer even that be optional.
3. **All data local.** Progress, mastery state, review schedule, error history — device-local storage only (SQLite / IndexedDB / platform-local file). **No sync. No cloud. No backend.**
4. **Zero third-party SDKs.** No analytics (Firebase, Amplitude, Mixpanel, GA), no crash reporters that phone home, no ad networks, no A/B services, no fonts loaded from a CDN. If the app makes **zero outbound network requests**, no persistent identifier can leak. This is the single highest-value decision in this section.
5. **No free-text that gets transmitted.** Since nothing transmits, this is automatic — but be deliberate: if you later add a writing module (you should, per `4.W.2` and the AASA writing unit), the child's essays are **the most sensitive data the app will hold.** They stay local, full stop.
6. **No camera, no microphone, no location, no contacts, no clipboard.** Request zero runtime permissions. An app that requests nothing cannot leak anything. (Exception: audio *playback* needs no permission. Audio *recording* — for `4.RF.4` fluency practice — would; **defer it, or keep any recording strictly local and parent-triggered.** `[B]`)
7. **No crash/telemetry upload.** Log to a local file the parent can read.
8. **Data retention: parent-controlled.** One visible "Delete all data" button that actually deletes. Aligns with the 2025 amendments' retention-limitation principle `[A]` and is just good hygiene.
9. **If you ever add a network call, treat it as a design review.** Write down: what leaves the device, who receives it, why it's necessary, and how it's deleted. If you can't answer all four, don't ship it.
10. **Keep a one-page written note** describing what the app stores and where. It costs ten minutes, it's the seed of the "written data retention policy" the amended Rule would require `[A]`, and it'll be useful if you ever share this with another family.

**Practical, not alarmist:** a fully offline, account-free, SDK-free app for your own child raises essentially no privacy risk and no realistic legal exposure. `[B]` **The way you get into trouble is by adding a convenience — cloud sync "so it works on the iPad too," or analytics "just to see which lessons get used."** Those are the moments to stop and reconsider. Everything else is fine.

---

## 9. Deliverable: "If you only build 10 things, build these"

Ranked. Each is specific enough to become a work item. Justifications trace back to the sections above.

---

**1. A mastery-gated skill graph keyed to Arizona standard codes.**
Every item tagged with a code (`4.NF.A.2`), every skill gated on prerequisite mastery, mastery defined as ~85–90% sustained across ≥2 separate sessions and allowed to **expire**. — *Mastery learning is d ≈ 0.52, larger for weaker students, and larger with higher thresholds `[A]`; coding by standard rather than by grade is what lets one engine serve both the Grade 4 test target and MTA's Grade 5 acceleration (§2.5).*

**2. Fraction magnitude on a number line, as the core representational engine — not a lesson.**
Every fraction and decimal in the app can be placed, compared, and decomposed on a number line: equivalence (`4.NF.A.1`), comparison (`4.NF.A.2`), decimals (`4.NF.C.6`, `4.NF.C.7`). — *Fractions are 29–33% of AASA math `[A*]`; fraction and division knowledge uniquely predict high-school achievement 5–6 years out `[A]`; the IES panel names the number line the central representational tool for fraction magnitude `[A]`; and Arizona specifically elevated "locate these decimals on a number line" from example to requirement `[A*]`.*

**3. An error-specific elaborated feedback engine with faded worked examples.**
A per-skill error taxonomy (3–6 canonical wrong answers, each with a diagnosis), a 3-step ladder — name the error → worked example of an isomorphic problem → full solution + requeue — with time-gated hints. — *Elaborated feedback is g = 0.49 vs 0.05 for "wrong" `[A]`; worked examples reduce extraneous cognitive load for novices `[A]`; hint abuse is a documented failure mode of tutoring systems `[A]`. **This is where the app's educational value actually lives.** Everything else is delivery.*

**4. A daily interleaved retrieval warm-up: 5 mixed items, no skill labels, no score shown.**
Drawn from previously mastered skills across all domains, mixed, unlabeled. — *Interleaved practice beat blocked practice at **d = 0.83** in an RCT of 787 students `[A]`; retrieval practice shows robust benefits in children with mean age exactly 10 `[A]`; labeling the set by skill destroys the strategy-selection demand that produces the effect `[A]`.*

**5. A spaced review scheduler with an expanding, forgiving interval.**
`+1, +3, +7, +16, +35` days, then ~monthly; miss → back two steps, hit → forward one; **queue capped at 8–12 items/day.** — *Optimal spacing gap ≈ 10–20% of the retention interval `[A]`; your retention interval to the AASA is ~210 days, giving monthly maintenance reviews `[A]`; the cap exists because an uncapped queue is how a 9-year-old quits `[B]`.*

**6. Structured multi-digit multiplication and division workspaces — partial products and partial quotients — that locate the error.**
Not an answer box. A workspace with visible intermediate steps, an area-model view, and remainder interpretation built in (`4.NBT.B.5`, `4.NBT.B.6`, `4.OA.A.3`). — *OA + NBT is 46–54% of AASA math `[A*]`; Arizona's Grade 4 standards demand strategies, arrays, and area models with explanation — not the standard algorithm `[A]`; Arizona uniquely adds "understand how the remainder is a fraction of the divisor" `[A*]`; and division is the second unique long-term predictor `[A]`. A single answer box tells you a student is wrong; a workspace tells you **where**, which is what feeds item #3.*

**7. A short, separate multiplication/division fact fluency drill — 2–4 minutes, its own micro-block.**
Adaptive to the specific facts that are slow, not a full-table sweep. Kept away from conceptual work. — *NMAP: automatic fact recall is prerequisite to algebra and mutually reinforcing with conceptual understanding `[A]`; students without automaticity bottleneck on working memory in multi-step problems `[A]`; a study of third graders found 4 minutes/day distributed beat 4 minutes massed `[A]`; teachers commonly assume this was handled in earlier grades and stop teaching it `[A]`.*

**8. A multi-step word problem engine with remainder interpretation and multiplicative comparison.**
`4.OA.A.1`, `4.OA.A.2`, `4.OA.A.3`, `4.MD.A.2`. Explicitly contrast "6 times as many" against "6 more than," and force the four remainder decisions (drop it / round up / it's the answer / it's a fraction). — *4.OA.A.3 is an emphasized cluster `[A*]`; OA is 22–26% of the test `[A*]`; and multi-step word problems are where fact fluency, place value, and fraction sense all cash out at once `[B]`.*

**9. A text-evidence reading loop: read a 740L–1010L passage, answer, then tap the sentence that proves it.**
`4.RL.1`, `4.RI.1`, `4.RI.2`, `4.W.9`. The "prove it" step is the whole point — the answer alone is not the standard. — *RL and RI are each 26–35% of AASA ELA `[A*]`; "refer to details and examples" is the defining Grade 4 reading move `[A]`; the AASA writing unit is source-based and demands exactly this skill `[A*]`; and Grade 4 reading is the more urgent national crisis — 40% below Basic, worse than 2022 and 2019 `[A]`.*

**10. A morphology engine: prefixes, suffixes, and Greek/Latin roots, applied to unfamiliar multisyllabic words in context.**
`4.L.4b`, `4.RF.3a`, `4.RI.4`, `4.L.6`. Teach the root, then show it in three unfamiliar words, then in a sentence. — *This is the highest-leverage vocabulary intervention available: Chall found the **first and largest gap** to appear in grades 4–7 is in **word meaning** `[A]`; vocabulary predicts comprehension more reliably than any other single factor `[A]`; Arizona embeds Foundational Skills items **inside** the Reading and Language clusters at grades 3–5, so morphology is worth more than its zero-percent line suggests `[A*]`. One prefix unlocks hundreds of words; one vocabulary word unlocks one.*

---

### The non-negotiable shell around all ten

Not an eleventh feature — a set of constraints every one of the ten must satisfy:

| Constraint | Value |
|---|---|
| Session length | **10–15 min**, app-terminated, 20 min hard cap `[A]` |
| Activity switch | every **3–5 min** `[C]` |
| UI copy | **FKGL ≤ 3.0**, gated in CI `[B]` |
| Touch targets | **≥ 20 mm**, ≥ 8 mm apart `[A]` |
| Body text | **≥ 20 px**, sans-serif, adjustable letter spacing `[A]` |
| Contrast | **7:1 (AAA)** for body and problem text `[A]` |
| Dyslexia fonts | **do not ship** — ship letter-spacing control instead `[A]` |
| Wrong answers | never bare "wrong"; cap at 3 consecutive; end sessions on success `[A]` |
| Rewards | competence signals only; **no leaderboards, no punished streaks, no currency** `[A]` |
| Timers | **none on conceptual work** (the AASA itself is untimed `[A*]`) |
| Data | **local only, no accounts, no SDKs, zero network calls** `[C]` |
| Success metric | **mastery per minute** — never time-in-app `[B]` |

### What to verify before you start building

1. ☐ **Which math grade level is the child actually in?** (§2.5) — ask the teacher. Everything branches here.
2. ☐ **The Grade 4 Essential Standards lists** — open the two ADE PDFs and correct my ⭐ markers. (§5.4)
3. ☐ **MTA's A–F letter grade** — `https://azreportcards.azed.gov/schools/detail/89622` (§2.6)
4. ☐ **Exact Arizona wording** for the Grade 4 standards you build items against (§3, §4)
5. ☐ **The 2026–2027 AASA testing window**, published by ADE in fall 2026 (§5.3)
6. ☐ **ADE's Grade 4 annotated writing samples and rubric** — free calibration for the writing module (§5.2)

---

## 10. Sources

### School and district
- Madison Traditional Academy (school site) — https://mta.madisonaz.org/
- MTA, About Us — https://mta.madisonaz.org/about-us
- MTA, Signature Program Overview — https://mta.madisonaz.org/signature-program/signature-program-overview
- MTA, 2025–2026 Handbook — https://mta.madisonaz.org/families/family-resources/2025-2026-handbook
- MTA, 2024–2025 Student-Parent Handbook (PDF) — https://resources.finalsite.net/images/v1718063938/madisonazorg/dkkm8sr6zfk7b0njnnrb/2024-2025MTAStudent-ParentHandbook11.pdf
- MTA, Dress Code Policy — https://mta.madisonaz.org/families/mta-dress-code-policy
- Madison ESD #38, Traditional Academy signature program — https://www.madisonaz.org/signature-programs/traditional-academy
- Madison ESD #38 (district site) — https://www.madisonaz.org/
- NCES Common Core of Data, school detail (ID 040450002874) — https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?Search=1&ID=040450002874
- AZ School Report Cards, MTA detail — https://azreportcards.azed.gov/schools/detail/89622
- Arizona School Spending, MTA — https://schoolspending.az.gov/explore/as-parent-guardian/school/madison-traditional-academy-070438111
- SchoolDigger, MTA — https://www.schooldigger.com/go/AZ/schools/0450002874/school.aspx
- U.S. News, MTA — https://www.usnews.com/education/k12/arizona/madison-traditional-academy-232998
- GreatSchools, MTA — https://www.greatschools.org/arizona/phoenix/3635-Madison-Traditional-Academy/
- Niche, MTA — https://www.niche.com/k12/madison-traditional-academy-phoenix-az/
- PublicSchoolReview, MTA — https://www.publicschoolreview.com/madison-traditional-academy-profile
- Wikipedia, Madison Elementary School District — https://en.wikipedia.org/wiki/Madison_Elementary_School_District

### Curriculum programs
- McGraw Hill, Reveal Math K–5 Scope & Sequence (PDF) — https://www.mheducation.com/unitas/school/explore/sites/reveal-math/scope-and-sequence-k-5.pdf
- McGraw Hill, Reveal Math K–5 Table of Contents & Pacing Guide (PDF) — https://www.mheducation.com/unitas/school/explore/sites/reveal-math/reveal-math-toc-pacing-guide-k-5.pdf
- Massachusetts DESE, CURATE review of Reveal Math K–5 (PDF) — https://www.doe.mass.edu/instruction/curate/math-2022-reveal-math.pdf
- Reveal Math Grade 4 Curriculum Guide (third-party district example, PDF) — https://resources.finalsite.net/images/v1722963897/lccsnjorg/dn0vewonnjhcsdbkrqz8/RevealMathGrade4CurriculumGuide.pdf

### Arizona standards
- ADE, Mathematics Standards — https://www.azed.gov/standards-practices/k-12standards/mathematics-standards
- ADE, **Arizona Mathematics Standards, Fourth Grade (2025)** — https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%204%20Final%202025.pdf
- ADE, Arizona Mathematics Standards, Fourth Grade (2016/2017 edition) — https://www.azed.gov/sites/default/files/2016/12/Math%20Final%2004Fourth%20Grade%20Standards%204_2_2017.pdf
- ADE, Grade 4 Mathematics Standards Placemat (PDF) — https://www.azed.gov/sites/default/files/2018/05/grade-4-placemat-4-2018.pdf
- ADE, Mathematics Standards Introduction — https://www.azed.gov/sites/default/files/media/Math%20Standards%20Introduction.pdf
- ADE, Arizona Mathematics Standards, Fifth Grade — https://www.azed.gov/sites/default/files/2016/12/Math%20Final%2005Fifth%20Grade%20Standards%204_2_2018.pdf
- ADE, English Language Arts Standards — https://www.azed.gov/standards-practices/k-12standards/english-language-arts-standards
- ADE, **Arizona ELA Standards, Fourth Grade (2025 "CE" edition)** — https://www.azed.gov/sites/default/files/2025/03/4th%20Grade%20ELA%20CE.pdf
- ADE, Arizona's ELA Standards 4th Grade (2016) — https://www.azed.gov/sites/default/files/2016/12/4th%20Grade%20ELA%202016%20Final.pdf
- ADE, **4th Grade ELA Essential and Related Standards** — https://www.azed.gov/sites/default/files/2025/08/4th%20Grade%20ELA%20Essential%20and%20Related%20Standards.pdf
- ADE, Grade 4 ELA Standards Placemat — https://www.azed.gov/sites/default/files/2021/07/4th%20grade%20ELA%20Standards%20Placemat.pdf
- ADE, ELA Standards 2016 Introduction — https://www.azed.gov/sites/default/files/2016/12/ELA%20Introduction%202016%20Final.pdf
- ADE, **English Language Arts and Math Essential Standards** — https://www.azed.gov/standards-practices/english-language-arts-and-math-essential-standards
- Arizona K-12 Standards portal — https://k12standards.az.gov/
- Arizona K-12 Standards, Grade 4 — https://k12standards.az.gov/code-standards-grade/4
- PAASPort, Arizona Mathematics Standards (2016) — https://standards.azed.gov/c6498415-d7cb-11e8-824f-0242ac160002/c6498415-d7cb-11e8-824f-0242ac160002
- CCSS Grade 4 Math (reference for comparison) — https://www.thecorestandards.org/Math/Content/4/
- IXL, Arizona fourth-grade math standards (third-party index) — https://www.ixl.com/standards/arizona/math/grade-4
- IXL, Arizona fourth-grade ELA standards (third-party index) — https://www.ixl.com/standards/arizona/ela/grade-4

### AASA assessment
- ADE, AASA — https://www.azed.gov/assessment/aasa
- ADE, Educator Assessment Resources — https://www.azed.gov/assessment/resources
- ADE, **AASA Math Blueprint (2016 Standards)** — https://www.azed.gov/sites/default/files/2021/10/Math%20AzM2%20Blueprint%202016%20Standards_AASA%20Oct%202021.pdf
- ADE, **AASA ELA Blueprint (2016 Standards)** — https://www.azed.gov/sites/default/files/2021/10/ELA%20AzM2%20Blueprint%202016%20Standards_AASA%20Oct%202021.pdf
- ADE, Mathematics Item Specifications Grade 4 — https://www.azed.gov/sites/default/files/2021/10/AASA%20Math%20Item%20Specs%20Grade%204_2021.pdf
- ADE, ELA Item Specifications Grade 4 — https://www.azed.gov/sites/default/files/2021/11/AASA_ELA%20Item%20Specs_Grade%204_ADE%20102021.pdf
- ADE, Sample Test Scoring Guide, Grade 4 Math — https://www.azed.gov/sites/default/files/2021/10/AASA-Sample%20Test%20Scoring%20Guide-Grade%204%20Math_FINAL%20v1.0.pdf
- ADE, Sample Test Scoring Guide, Grade 4 ELA — https://www.azed.gov/sites/default/files/2021/10/AASA-Sample%20Test%20Scoring%20Guide-Grade%204%20ELA_FINAL%20v1.0.pdf
- ADE, Sample Test Scoring Guide, Grade 4 ELA **Writing** — https://www.azed.gov/sites/default/files/2022/11/AASA-Sample%20Test%20Scoring%20Guide-GR%204%20ELA_Writing.pdf
- ADE, **AASA Annotated Writing Samples, Grade 4** — https://www.azed.gov/sites/default/files/2022/11/Annotated%20Writing%20Samples%20Guide_Grade%204.pdf
- ADE, Math Grade 4 Performance Level Descriptors — https://www.azed.gov/sites/default/files/2021/11/AASA_Math_PLD_Grade4.pdf
- ADE, Detailed Testing Calendar 2025–2026 — https://www.azed.gov/sites/default/files/2025/07/Detailed_Testing_Calendar_2025-2026.pdf
- ADE, 2025–2026 AASA Resources — https://www.azed.gov/sites/default/files/2025/08/2025-2026_AASA.pdf
- ADE, Assessments Overview 2025–26 — https://www.azed.gov/sites/default/files/2025/04/Assessments_Overview_2526.pdf
- ADE, AASA 2024 Technical Report — https://www.azed.gov/sites/default/files/2025/01/AASA_2024_Technical_Report.pdf
- AZ State Board of Education, A–F School and LEA Letter Grades — https://azsbe.az.gov/schools/a-f-school-letter-grades
- AZ SBE, A–F School Accountability FAQ (2025) — https://azsbe.az.gov/sites/default/files/2025-10/A-F%20School%20Accountability%20System%20FAQ%202025.pdf

### Struggle points and achievement data
- NAEP 2024 Mathematics, Grades 4 & 8 — https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/
- NAEP 2024 Mathematics, National Trends (Grade 4) — https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=4
- NAEP 2024 Reading, Grades 4 & 8 — https://www.nationsreportcard.gov/reports/reading/2024/g4_8/
- NAEP 2024 Reading, National Trends (Grade 4) — https://www.nationsreportcard.gov/reports/reading/2024/g4_8/national-trends/?grade=4
- NAGB news release, 2024 Nation's Report Card — https://www.nagb.gov/news-and-events/news-releases/2025/nations-report-card-decline-in-reading-progress-in-math.html
- IES/NCES, 2024 NAEP Mathematics Assessment report — https://nces.ed.gov/use-work/resource-library/report/statistical-analysis-report/2024-naep-mathematics-assessment-results-grades-4-and-8-nation-states-and-districts
- Siegler et al. (2012), *Early Predictors of High School Mathematics Achievement*, Psychological Science — https://journals.sagepub.com/doi/abs/10.1177/0956797612440101 · PDF: https://files.eric.ed.gov/fulltext/ED552898.pdf · PubMed: https://pubmed.ncbi.nlm.nih.gov/22700332/
- IES/WWC Practice Guide, *Developing Effective Fractions Instruction for K–8* (NCEE 2010-4039) — https://ies.ed.gov/ncee/wwc/practiceguide/15 · PDF: https://ies.ed.gov/ncee/wwc/docs/practiceguide/fractions_pg_093010.pdf
- National Mathematics Advisory Panel (2008), *Foundations for Success* — https://files.eric.ed.gov/fulltext/ED500486.pdf
- Chall & Jacobs, *Poor Children's Fourth-Grade Slump*, American Educator — https://www.aft.org/ae/spring2003/chall_jacobs
- ASCD, *Don't Wait Until 4th Grade to Address the Slump* — https://www.ascd.org/el/articles/dont-wait-until-4th-grade-to-address-the-slump
- *Inhibitory control and decimal number comparison in school-aged children* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5695764/
- *Inhibition of the whole number bias in decimal number comparison* — https://www.sciencedirect.com/science/article/abs/pii/S002209651730509X
- *Longer is Larger — Or is It?*, Australian Primary Mathematics Classroom — https://eric.ed.gov/?id=EJ794018
- CCSS text complexity grade bands / Lexile ranges — https://achievethecore.org/content/upload/CCSS_Grade_Bands_and_Quantitative_Measures%20updated%202015.pdf
- *The Importance of Automaticity Development in Mathematics* — https://files.eric.ed.gov/fulltext/EJ1194585.pdf

### Learning science and design
- Deci, Koestner & Ryan (1999), meta-analysis of extrinsic rewards on intrinsic motivation, *Psychological Bulletin* — https://home.ubalt.edu/tmitch/642/articles%20syllabus/Deci%20Koestner%20Ryan%20meta%20IM%20psy%20bull%2099.pdf
- Deci, Koestner & Ryan (2001), *Extrinsic Rewards and Intrinsic Motivation in Education: Reconsidered Once Again*, RER — https://journals.sagepub.com/doi/10.3102/00346543071001001
- Self-Determination Theory, *Beyond Reinforcement: Deci (1971)* — https://selfdeterminationtheory.org/wp-content/uploads/2019/03/2019_RyanRyanDiDomencio_Deci1971.pdf
- *The Effects of Praise on Children's Intrinsic Motivation: A Review and Synthesis* — https://www.researchgate.net/publication/11182972_The_Effects_of_Praise_on_Children's_Intrinsic_Motivation_A_Review_and_Synthesis
- Sailer & Homner (2020), *The Gamification of Learning: A Meta-Analysis*, Educational Psychology Review — https://eric.ed.gov/?id=EJ1245270
- *When Gamification Spoils Your Learning: Gamification Misuse in a Language-Learning App* — https://arxiv.org/pdf/2203.16175
- Kulik, Kulik & Bangert-Drowns (1990), *Effectiveness of Mastery Learning Programs: A Meta-Analysis*, RER — https://journals.sagepub.com/doi/10.3102/00346543060002265 · PDF: http://competencyworks.pbworks.com/w/file/fetch/70372726/1170612.pdf
- *A Practical Review of Mastery Learning* — https://www.sciencedirect.com/science/article/pii/S0002945923007386
- Cepeda, Vul, Rohrer, Wixted & Pashler (2008), *Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention*, Psychological Science — https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf · https://files.eric.ed.gov/fulltext/ED505660.pdf
- Rohrer, Dedrick, Hartwig & Cheung (2020), *A Randomized Controlled Trial of Interleaved Mathematics Practice*, JEP — https://gwern.net/doc/psychology/spaced-repetition/2019-rohrer.pdf
- *Interleaved Practice Improves Mathematics Learning* — https://files.eric.ed.gov/fulltext/ED557355.pdf
- *Retrieval-Based Learning: Positive Effects of Retrieval Practice in Elementary School Children* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4786565/
- *Retrieval-based learning: The need for guided retrieval in elementary school children* — https://www.sciencedirect.com/science/article/abs/pii/S2211368114000655
- Van der Kleij, Feskens & Eggen (2015), *Effects of Feedback in a Computer-Based Learning Environment*, RER — https://journals.sagepub.com/doi/abs/10.3102/0034654314564881 · https://eric.ed.gov/?id=EJ1081708
- NSW CESE, *Cognitive Load Theory: Research That Teachers Really Need to Understand* — https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf
- *Effects of worked examples, example-problem, and problem-example pairs on novices' learning* — https://www.sciencedirect.com/science/article/abs/pii/S0361476X1000055X
- Aleven et al., *Help Helps, But Only So Much: Research on Help Seeking with Intelligent Tutoring Systems*, IJAIED — https://link.springer.com/article/10.1007/s40593-015-0089-1
- LearnLab Theory Wiki, *Gaming the System* — https://learnlab.org/wiki/index.php?title=Gaming_the_system
- *Improving students' help-seeking skills using metacognitive feedback in an ITS* — https://www.sciencedirect.com/science/article/abs/pii/S0959475210000538
- Dweck & Diener/Repucci, *An Analysis of Learned Helplessness*, JPSP (1978) — https://eric.ed.gov/?id=EJ187211
- Chinn (2012), *Beliefs, Anxiety, and Avoiding Failure in Mathematics*, Child Development Research — https://onlinelibrary.wiley.com/doi/10.1155/2012/396071
- *Can growth mindset interventions improve academic achievement? A structured review* (2025), Review of Education — https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/rev3.70066
- *When Do Growth Mindset Interventions Work?*, Trends in Cognitive Sciences — https://www.sciencedirect.com/science/article/abs/pii/S1364661319302062
- *Why Meta-Analyses of Growth Mindset and Other Interventions Should Follow Best Practices for Examining Heterogeneity* — https://pmc.ncbi.nlm.nih.gov/articles/PMC10495100/
- *Off-task behavior in elementary school children*, Learning and Instruction — https://www.sciencedirect.com/science/article/abs/pii/S0959475216300275
- *Pupillometry as a Window into Young Children's Sustained Attention* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9680391/
- *Sex differences in the sustained attention of elementary school children* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9753246/
- *A comparative analysis of massed vs. distributed practice on basic math fact fluency growth rates*, Journal of School Psychology — https://www.sciencedirect.com/science/article/abs/pii/S0022440514001034

### Accessibility and typography
- W3C, Understanding SC 1.4.3 Contrast (Minimum) — https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
- WebAIM, Contrast and Color Accessibility — https://webaim.org/articles/contrast/
- WebAIM Contrast Checker — https://webaim.org/resources/contrastchecker/
- Deque University, WCAG 2.5.5 Target Size (AAA) — https://dequeuniversity.com/resources/wcag2.1/2.5.5-target-size
- Nielsen Norman Group, *Design for Kids Based on Their Stage of Physical Development* — https://www.nngroup.com/articles/children-ux-physical-development/
- Nielsen Norman Group, *Touch Targets on Touchscreens* — https://www.nngroup.com/articles/touch-target-size/
- *Touch interaction for children aged 3 to 6 years*, IJHCS — https://www.sciencedirect.com/science/article/abs/pii/S1071581914001426
- *Evaluating the optimised font size and viewing time of online learning in young children: a multicentre cross-sectional study* — https://pmc.ncbi.nlm.nih.gov/articles/PMC10151978/
- Section508.gov, Fonts and Typography — https://www.section508.gov/develop/fonts-typography/
- Zorzi et al. (2012), *Extra-large letter spacing improves reading in dyslexia*, PNAS — https://www.pnas.org/doi/10.1073/pnas.1205566109 · https://pubmed.ncbi.nlm.nih.gov/22665803/
- PNAS reply on statistical/practical significance of extra-wide letter spacing — https://www.pnas.org/doi/10.1073/pnas.1213265109
- *The effect of a specialized dyslexia font, OpenDyslexic, on reading rate and accuracy* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5629233/ · https://pubmed.ncbi.nlm.nih.gov/26993270/
- *Dyslexie font does not benefit reading in children with or without dyslexia* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5934461/
- *Does font improve reading in dyslexic children? Meta-analysis of dyslexia-friendly fonts* — https://pubmed.ncbi.nlm.nih.gov/42536336/
- International Dyslexia Association, *Do Special Fonts Help People with Dyslexia?* — https://dyslexiaida.org/do-special-fonts-help-people-with-dyslexia/
- Edutopia, *Do Dyslexia Fonts Actually Work?* — https://www.edutopia.org/article/do-dyslexia-fonts-actually-work/
- Readable, *Flesch Reading Ease and Flesch-Kincaid Grade Level* — https://readable.com/readability/flesch-reading-ease-flesch-kincaid-grade-level/
- Harvard University IT, *Writing Readable Content* — https://accessibility.huit.harvard.edu/technique-writing-readable-content

### COPPA
- FTC, *Complying with COPPA: Frequently Asked Questions* — https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions
- FTC, *COPPA Rule: A Six-Step Compliance Plan for Your Business* — https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business
- eCFR, 16 CFR Part 312 — Children's Online Privacy Protection Rule — https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312
- Federal Register, *Children's Online Privacy Protection Rule* (final amendments, April 22, 2025) — https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule
- Latham & Watkins, *FTC Publishes Updates to COPPA Rule* — https://www.lw.com/en/insights/ftc-publishes-updates-to-coppa-rule
- White & Case, *Unpacking the FTC's COPPA amendments* — https://www.whitecase.com/insight-alert/unpacking-ftcs-coppa-amendments-what-you-need-know
- Davis Polk, *FTC prioritizes COPPA enforcement as new compliance obligations take effect* — https://www.davispolk.com/insights/client-update/ftc-prioritizes-coppa-enforcement-new-compliance-obligations-take-effect

---

*Prepared 2026-08-21. Not legal advice. Standards wording marked `[A*]` was extracted through a search index rather than read directly from the source PDF — verify against the ADE documents before printing anything as authoritative.*
