# Original porting brief (prior session)

Pasted verbatim from an earlier chat session's planning notes, before the
files could actually be read (macOS TCC blocked `~/Downloads` in that
session — see handoff doc). Kept here as background/reference. Where this
conflicts with the fresh evaluation in `eval-apps.md`, the fresh evaluation
wins — it was produced by actually reading the code; this was written
before that was possible.

---

PROJECT: "Learning Quest" — gamified learning app for a bright ~4th grader
(reads 2 grades ahead, academically timid). Built as React artifacts in
Claude; now porting to Vite + React because both files hit the ~160k
artifact ceiling.

TWO APPS (download from Claude, place in repo):
- LearningQuest.jsx (156k) "Core" — Math 16 days + CS 12 days + Practice Mode
- LearningQuestExplore.jsx (161k) "Explore" — Biology 6, English 6,
  Business 12, Government 6, Fossils 6

IMMEDIATE TASK: port to Vite + React. Already React, near drop-in.
The ONLY Claude-specific code is the `Store` wrapper at the top of each
file (window.storage). Swap its two methods for localStorage — which is
FORBIDDEN in artifacts but fine in Vite. Everything else is portable.
Decide during the port whether to merge both apps into one (now possible
without a size ceiling) — if merged, keep the two storage keys separate
or write a migration; day IDs are already unique across both.

ARCHITECTURE (do not reinvent):
- CURRICULUM = object keyed by subject id. Each subject:
  { name, icon (lucide-react), accent (hex), blurb, days: [] }
  Each day: { id, tag, title, subtitle, pages:[{title, blocks:[]}],
  recap:[str], quiz:[] }
- Block types: text | concept{term,def} | example | callout |
  formula{text,label} | visual{kind} | codelab{task,starter,expect,hint}
- Quiz types: mc{choices,answer:idx} | tf{answer:bool} | numeric{answer:num}
  — EVERY question must have hint + explain.
- Progress key: `${subjectId}:${dayId}` (e.g. math:m1). NEVER renumber or
  reuse day ids — stable ids are what preserve saved progress.
- Sequential unlock (day N needs N-1). XP_CORRECT=10, XP_BONUS=20,
  PRACTICE_XP=5. RANKS ladder + daily streak.
- Multi-profile + ephemeral demo mode (never saves).
- Storage keys: lq_profiles_v2 (Core), lq_explore_v1 (Explore).
- Visual = one SVG component, branches on v.kind, uses subject accent.
- Styling: inline style objects in `S` + a <style> block. Tailwind
  arbitrary values DON'T work (no compiler). framer-motion NOT available.

TWO CUSTOM FEATURES TO PRESERVE:
1. Practice Mode (Core): DRILLS = 14 generator functions, one per math day,
   unlocked by completing that day. Questions are GENERATED with random
   numbers (not static) so they can't be memorized. Mixed Review pulls from
   all unlocked skills = spaced repetition. "SHARP" badge at 5 correct in a
   row. Reduced XP so it isn't an XP farm.
2. CodeLab (Core, CS days 10-12): live JS run [message truncated in the
   original paste]
