import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Calculator, Atom, Lightbulb, Globe2, Flame, Star, Lock, Check,
  ChevronRight, ChevronLeft, ArrowLeft, Trophy, Sparkles, RotateCcw, Zap,
  Target, Rocket, BookOpen, HelpCircle, Users, Eye, Cpu,
  Terminal, Play, Shuffle,
} from 'lucide-react';

/* ============================================================================
   LEARNING QUEST — Full build
   ----------------------------------------------------------------------------
   PORTABILITY: the `Store` wrapper below is the ONLY Claude-specific code.
   Swap its two methods for localStorage / a backend when porting to Vite.

   CONTENT MODEL (expandable — append days to grow the course):
     day = {
       id, tag, title, subtitle,
       pages: [ { title, blocks:[ {type:'text'|'concept'|'example'|'callout'
                                   |'formula'|'visual', ...} ] } ],
       recap: [ 'bullet', ... ],          // confidence checkpoint before quiz
       quiz:  [ { type:'mc'|'tf'|'numeric', prompt, hint?, ... } ],
     }
   Visual blocks reference named SVG diagrams in <Visual/>.
   ========================================================================== */

/* ---- 1. STORAGE WRAPPER (swap when porting) ------------------------------ */
const PROFILES_KEY = 'lq_profiles_v2';
const Store = {
  async load() {
    try {
      const r = await window.storage.get(PROFILES_KEY, false);
      if (r) return JSON.parse(r.value);
    } catch {}
    // migrate legacy single-user save, if present
    try {
      const old = await window.storage.get('lq_progress', false);
      if (old) {
        const s = JSON.parse(old.value);
        if (s && s.name) {
          const prof = { id: 'p' + Date.now().toString(36), xp: 0, completed: {}, streak: { count: 0, last: null }, ...s };
          return { profiles: [prof], lastActive: prof.id };
        }
      }
    } catch {}
    return null;
  },
  async save(data) {
    try { await window.storage.set(PROFILES_KEY, JSON.stringify(data), false); } catch {}
  },
};

/* ---- 2. CURRICULUM ------------------------------------------------------- */
const CURRICULUM = {
  math: {
    name: 'Mathematics', icon: Calculator, accent: '#f6b73c',
    blurb: 'Ratios → proportions → equations. Each day builds on the last.',
    days: [
      {
        id: 'm1', tag: 'Grade 6–7', title: 'Ratios & Unit Rates',
        subtitle: 'Day 1 · Comparing quantities',
        pages: [
          { title: 'Why this matters', blocks: [
            { type: 'text', text: 'Which is the better deal — 3 apples for $1.50, or 5 apples for $2.75? Ratios answer questions like this instantly. They show up everywhere: prices, speeds, recipes, maps.' },
            { type: 'concept', term: 'Ratio', def: 'A comparison of two amounts. "3 to 2" can be written 3:2 or as the fraction 3/2.' },
            { type: 'visual', kind: 'bars', a: 3, b: 2, labelA: '3 apples', labelB: '2 oranges' },
          ]},
          { title: 'The key move: unit rate', blocks: [
            { type: 'text', text: 'A unit rate tells you the amount for exactly ONE of something. Once you know the price of one apple, you can price any number of apples.' },
            { type: 'formula', text: 'unit rate = amount ÷ how many', label: 'Divide to get down to one' },
            { type: 'example', text: '3 apples cost $1.50 → one apple costs $1.50 ÷ 3 = $0.50. So 7 apples cost 7 × $0.50 = $3.50.' },
          ]},
          { title: 'Rates in the wild', blocks: [
            { type: 'text', text: 'Speed is a rate too: miles per ONE hour. A car going 120 miles in 2 hours travels 120 ÷ 2 = 60 miles each hour.' },
            { type: 'callout', text: 'Strategy you can always trust: get down to ONE first, then scale up to whatever the question asks.' },
          ]},
        ],
        recap: [
          'A ratio compares two amounts (3:2 or 3/2).',
          'A unit rate = the amount for exactly one (divide!).',
          'Solve “best deal” and speed problems by finding the unit first.',
        ],
        quiz: [
          { type: 'numeric', prompt: '4 notebooks cost $6. How much is ONE notebook, in dollars?', answer: 1.5, hint: 'Divide the total cost by the number of notebooks.', explain: '$6 ÷ 4 = $1.50 each.' },
          { type: 'numeric', prompt: 'A car travels 120 miles in 2 hours. What is its speed in miles per hour?', answer: 60, hint: 'Miles ÷ hours gives miles per ONE hour.', explain: '120 ÷ 2 = 60 mph.' },
          { type: 'mc', prompt: 'The ratio 6:8 in simplest form is:', choices: ['2:3', '3:4', '4:6', '1:2'], answer: 1, hint: 'What number divides evenly into both 6 and 8?', explain: 'Divide both by 2 → 3:4.' },
          { type: 'numeric', prompt: 'If 3 pencils cost $0.90, how much do 5 pencils cost, in dollars?', answer: 1.5, hint: 'Find the cost of ONE pencil first.', explain: 'Unit rate $0.30 × 5 = $1.50.' },
          { type: 'mc', prompt: 'Which is the better deal?', choices: ['3 apples for $1.50', '5 apples for $2.75'], answer: 0, hint: 'Compare the price of one apple in each deal.', explain: '$0.50 each beats $0.55 each.' },
        ],
      },
      {
        id: 'm2', tag: 'Grade 6–7', title: 'Proportions & Percents',
        subtitle: 'Day 2 · Builds on unit rates',
        pages: [
          { title: 'Two ratios, one truth', blocks: [
            { type: 'text', text: 'Yesterday you compared amounts with ratios. A proportion says two ratios are EQUAL — same relationship, different size. Like a photo and its enlargement.' },
            { type: 'formula', text: '2⁄3 = x⁄12', label: 'A proportion: two equal ratios' },
            { type: 'text', text: 'To solve it, find the scale factor: 3 became 12 by multiplying by 4. Whatever happens to the bottom must happen to the top — so x = 2 × 4 = 8.' },
            { type: 'visual', kind: 'bars', a: 2, b: 3, a2: 8, b2: 12, labelA: '2 : 3', labelB: '8 : 12', scaled: true },
          ]},
          { title: 'Percents are ratios in disguise', blocks: [
            { type: 'concept', term: 'Percent', def: 'A ratio out of 100. “Per cent” literally means “per hundred.” 25% = 25/100 = 0.25.' },
            { type: 'formula', text: 'part = percent × whole', label: 'The one percent formula you need' },
            { type: 'example', text: 'What is 25% of 80? Convert: 25% = 0.25. Then 0.25 × 80 = 20.' },
          ]},
          { title: 'Putting it together', blocks: [
            { type: 'example', text: 'A $40 game is 30% off. Discount = 0.30 × 40 = $12, so you pay 40 − 12 = $28.' },
            { type: 'callout', text: 'Proportions and percents are the same skill wearing different outfits: keep the relationship equal while the numbers change.' },
          ]},
        ],
        recap: [
          'A proportion = two equal ratios; solve with the scale factor.',
          'Percent means "out of 100" — 25% = 0.25.',
          'part = percent × whole handles discounts, tips, and tests.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Solve the proportion 2/5 = x/20.  x = ?', answer: 8, hint: '5 became 20 by multiplying by what?', explain: 'Scale factor 4 → x = 2 × 4 = 8.' },
          { type: 'numeric', prompt: 'What is 25% of 80?', answer: 20, hint: 'Turn 25% into a decimal first.', explain: '0.25 × 80 = 20.' },
          { type: 'numeric', prompt: 'A $40 game is 30% off. What is the sale price, in dollars?', answer: 28, hint: 'Find the discount first, then subtract it.', explain: '40 − (0.30 × 40) = 28.' },
          { type: 'mc', prompt: '3/4 = 9/x.  What is x?', choices: ['10', '12', '16', '27'], answer: 1, hint: '3 became 9 by ×3 — do the same below.', explain: '4 × 3 = 12.' },
          { type: 'numeric', prompt: 'You scored 18 out of 20 on a quiz. What percent is that?', answer: 90, hint: 'Make the ratio out of 100: 18/20 = ?/100.', explain: '18/20 = 90/100 = 90%.' },
        ],
      },
      {
        id: 'm3', tag: 'Grade 7', title: 'Two-Step Equations',
        subtitle: 'Day 3 · Solving for the unknown',
        pages: [
          { title: 'The balance idea', blocks: [
            { type: 'text', text: 'An equation is a balance scale: the = sign says both sides weigh the same. As long as you do the SAME thing to both sides, it stays balanced.' },
            { type: 'visual', kind: 'scale', left: '2x + 3', right: '11' },
            { type: 'concept', term: 'Golden rule', def: 'Whatever you do to one side of an equation, do to the other. That is the whole game.' },
          ]},
          { title: 'Undo it, in reverse', blocks: [
            { type: 'text', text: 'To free the x, undo each operation with its opposite — and peel from the outside in: deal with + or − first, then × or ÷. (This is the “working backward” trick from the Logic lane.)' },
            { type: 'formula', text: '2x + 3 = 11  →  2x = 8  →  x = 4', label: 'Subtract 3, then divide by 2' },
            { type: 'example', text: 'Solve x/2 + 4 = 9. Subtract 4 → x/2 = 5. Multiply by 2 → x = 10.' },
          ]},
          { title: 'The pro move: check', blocks: [
            { type: 'text', text: 'Substitute your answer back in. 2(4) + 3 = 11 ✓. If the two sides don’t match, no problem — it just means a sign slipped somewhere, and the mismatch shows you where to look.' },
            { type: 'callout', text: 'Checking isn’t extra work — it’s how you KNOW you’re right before anyone tells you. That feeling is the best part of algebra.' },
          ]},
        ],
        recap: [
          'An equation is a balance: same move on both sides, always.',
          'Undo + / − first, then × / ÷ — working backward.',
          'Substitute your answer back in to prove yourself right.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Solve: 2x + 3 = 11.  x = ?', answer: 4, hint: 'Subtract 3 from both sides first.', explain: '2x = 8 → x = 4.' },
          { type: 'numeric', prompt: 'Solve: 3x − 5 = 10.  x = ?', answer: 5, hint: 'Add 5 to both sides first.', explain: '3x = 15 → x = 5.' },
          { type: 'numeric', prompt: 'Solve: x/2 + 4 = 9.  x = ?', answer: 10, hint: 'Subtract 4, then multiply both sides by 2.', explain: 'x/2 = 5 → x = 10.' },
          { type: 'mc', prompt: 'To solve 5x + 2 = 17, the correct FIRST step is:', choices: ['Divide by 5', 'Subtract 2 from both sides', 'Add 2 to both sides', 'Multiply by 5'], answer: 1, hint: 'Peel from the outside: handle the + 2 first.', explain: 'Remove +2 first, then divide by 5.' },
          { type: 'numeric', prompt: 'Solve: 4x − 7 = 9.  x = ?', answer: 4, hint: 'Add 7 to both sides, then divide.', explain: '4x = 16 → x = 4.' },
        ],
      },
      {
        id: 'm4', tag: 'Grade 7', title: 'Simplifying Expressions',
        subtitle: 'Day 4 · Tidying up the algebra',
        pages: [
          { title: 'Like terms are family', blocks: [
            { type: 'text', text: 'Before solving bigger equations, you need to tidy them. An expression like 3x + 2x is messier than it needs to be — those are LIKE terms, and they combine.' },
            { type: 'concept', term: 'Like terms', def: 'Terms with the exact same variable part. 3x and 2x are like terms (both plain x). 3x and 3x² are NOT — different species.' },
            { type: 'visual', kind: 'bars', a: 3, b: 2, labelA: '3x', labelB: '+ 2x  →  5x total' },
          ]},
          { title: 'The distributive property', blocks: [
            { type: 'text', text: 'When a number sits outside parentheses, it multiplies EVERYTHING inside — it gets distributed to each term, no favorites.' },
            { type: 'formula', text: 'a(b + c) = ab + ac', label: 'Multiply through to every term' },
            { type: 'example', text: '3(x + 4) = 3·x + 3·4 = 3x + 12. Watch signs: 2(x − 5) = 2x − 10.' },
          ]},
          { title: 'Distribute, then combine', blocks: [
            { type: 'example', text: 'Simplify 2(x + 3) + 4x.  Distribute: 2x + 6 + 4x.  Combine like terms: (2x + 4x) + 6 = 6x + 6. Done — same value, half the clutter.' },
            { type: 'callout', text: 'Simplifying never changes what an expression equals — it just rewrites it in its cleanest outfit. Tomorrow this skill unlocks the biggest equations yet.' },
          ]},
        ],
        recap: [
          'Like terms share the same variable part — combine their coefficients.',
          'Distribute: multiply the outside number into every term inside.',
          'Distribute first, then combine — clutter to clean in two moves.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Simplify 4x + 3x = ?x.  What is the coefficient?', answer: 7, hint: 'Add the numbers in front; the x comes along for free.', explain: '4x + 3x = 7x.' },
          { type: 'mc', prompt: 'Distribute: 5(x + 2) =', choices: ['5x + 2', '5x + 10', 'x + 10', '5x + 7'], answer: 1, hint: 'The 5 must multiply BOTH terms inside.', explain: '5·x + 5·2 = 5x + 10.' },
          { type: 'mc', prompt: 'Simplify 2(x + 3) + 4x =', choices: ['6x + 6', '6x + 3', '8x + 6', '2x + 7'], answer: 0, hint: 'Distribute first, then gather the x terms.', explain: '2x + 6 + 4x = 6x + 6.' },
          { type: 'numeric', prompt: 'Simplify 7y − 2y = ?y.  What is the coefficient?', answer: 5, hint: 'Subtract the coefficients.', explain: '7y − 2y = 5y.' },
          { type: 'tf', prompt: 'x and x² are like terms.', answer: false, hint: 'Same variable, but is it the same POWER of the variable?', explain: 'Different powers = different species. They never combine.' },
        ],
      },
      {
        id: 'm5', tag: 'Grade 7–8', title: 'Equations with x on Both Sides',
        subtitle: 'Day 5 · The full solving toolkit',
        pages: [
          { title: 'When x shows up everywhere', blocks: [
            { type: 'text', text: 'So far the unknown stayed politely on one side. Real equations are messier: 3x + 2 = x + 10 has x on BOTH sides. The plan: herd every x to one side, every number to the other.' },
            { type: 'visual', kind: 'scale', left: '3x + 2', right: 'x + 10' },
          ]},
          { title: 'Herd, then solve', blocks: [
            { type: 'text', text: 'Subtract x from both sides (golden rule, always both sides) to clear it off the right. Then it is just a two-step equation — which you already own.' },
            { type: 'formula', text: '3x + 2 = x + 10 → 2x + 2 = 10 → 2x = 8 → x = 4', label: 'Herd the x’s, then peel as usual' },
          ]},
          { title: 'The final boss: distribute first', blocks: [
            { type: 'example', text: 'Solve 4(x − 1) = 2x + 6.  Distribute (Day 4!): 4x − 4 = 2x + 6.  Subtract 2x: 2x − 4 = 6.  Add 4: 2x = 10.  So x = 5. Check: 4(4) = 16 and 2(5)+6 = 16. ✓' },
            { type: 'callout', text: 'Notice what just happened: ratios → equations → expressions → THIS. Every day so far was a piece of today. That is what real math mastery feels like.' },
          ]},
        ],
        recap: [
          'Move all x terms to one side first — same move on both sides.',
          'If there are parentheses, distribute before anything else.',
          'After herding, it is just the two-step solving you already know.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Solve: 3x + 2 = x + 10.  x = ?', answer: 4, hint: 'Subtract x from both sides first.', explain: '2x + 2 = 10 → 2x = 8 → x = 4.' },
          { type: 'numeric', prompt: 'Solve: 5x − 3 = 2x + 9.  x = ?', answer: 4, hint: 'Subtract 2x, then add 3.', explain: '3x = 12 → x = 4.' },
          { type: 'numeric', prompt: 'Solve: 4(x − 1) = 2x + 6.  x = ?', answer: 5, hint: 'Distribute the 4 first.', explain: '4x − 4 = 2x + 6 → 2x = 10 → x = 5.' },
          { type: 'mc', prompt: 'To solve 2(x + 3) = x + 8, the best FIRST step is:', choices: ['Subtract x', 'Distribute the 2', 'Add 8', 'Divide by 2'], answer: 1, hint: 'Parentheses get handled before herding.', explain: 'Distribute first: 2x + 6 = x + 8 → x = 2.' },
          { type: 'numeric', prompt: 'Solve: 6x + 1 = 4x + 9.  x = ?', answer: 4, hint: 'Herd the x’s left, the numbers right.', explain: '2x = 8 → x = 4.' },
        ],
      },
      {
        id: 'm6', tag: 'Grade 7–8', title: 'Graphing: Rules Become Pictures',
        subtitle: 'Day 6 · Seeing equations',
        pages: [
          { title: 'Every rule draws a picture', blocks: [
            { type: 'text', text: 'Take the function machine y = 2x + 1 and feed it inputs: x = 0 gives y = 1. x = 1 gives 3. x = 2 gives 5. Plot those (x, y) pairs as points… and they line up. Perfectly. Every rule like this draws a straight line.' },
            { type: 'visual', kind: 'graph', label: 'y = 2x + 1' },
          ]},
          { title: 'Slope and starting value', blocks: [
            { type: 'formula', text: 'y = mx + b', label: 'm = slope (the rate) · b = starting value' },
            { type: 'concept', term: 'Slope', def: 'How much y climbs each time x goes up by 1. In y = 2x + 1, the slope is 2: up 2 for every 1 across. Sound familiar? Slope IS a unit rate — Day 1 returns.' },
          ]},
          { title: 'Reading the world from a line', blocks: [
            { type: 'example', text: 'You have $5 saved and add $2 each week: y = 2x + 5. The 5 is where the line starts (b); the 2 is how fast it climbs (m). After 10 weeks: y = 2(10) + 5 = $25 — read it off the line or compute it, same answer.' },
            { type: 'callout', text: 'Steeper line = bigger slope = faster rate. y = 4x outruns y = 2x. One glance at a graph now tells you what a whole table of numbers used to.' },
          ]},
        ],
        recap: [
          'A rule y = mx + b plots as a straight line.',
          'm is the slope — the unit rate of climb. b is the starting value.',
          'Steeper means faster: comparing slopes compares rates.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Using y = 2x + 1, what is y when x = 4?', answer: 9, hint: 'Multiply, then add.', explain: '2(4) + 1 = 9.' },
          { type: 'numeric', prompt: 'What is the slope of y = 3x + 2?', answer: 3, hint: 'Slope is the number multiplying x.', explain: 'm = 3.' },
          { type: 'mc', prompt: 'In the savings rule y = 2x + 5, the 5 represents:', choices: ['the weekly amount', 'the starting amount', 'the number of weeks', 'the slope'], answer: 1, hint: 'What is y when x = 0?', explain: 'b = 5 is where you start before any weeks pass.' },
          { type: 'numeric', prompt: 'The point (2, ?) is on the line y = 2x + 1. What is the missing y?', answer: 5, hint: 'Feed x = 2 into the rule.', explain: '2(2) + 1 = 5.' },
          { type: 'mc', prompt: 'Which line is steeper?', choices: ['y = 4x', 'y = 2x', 'they are the same'], answer: 0, hint: 'Compare the slopes.', explain: 'Slope 4 climbs faster than slope 2.' },
        ],
      },
      {
        id: 'm7', tag: 'Grade 8', title: 'Exponents & Their Laws',
        subtitle: 'Day 7 · Shortcuts for repeated multiplication',
        pages: [
          { title: 'The shorthand', blocks: [
            { type: 'text', text: 'You have met exponents: 2³ means 2 × 2 × 2 = 8. Their real power is the LAWS that combine them instantly — no expanding required.' },
            { type: 'formula', text: 'aᵐ · aⁿ = aᵐ⁺ⁿ', label: 'Same base, multiplied: ADD the exponents' },
            { type: 'example', text: '2³ · 2⁴ = (2·2·2)(2·2·2·2) = seven 2’s = 2⁷. The law just counts them for you.' },
          ]},
          { title: 'Powers of powers, and the strange zero', blocks: [
            { type: 'formula', text: '(aᵐ)ⁿ = aᵐⁿ', label: 'A power raised to a power: MULTIPLY the exponents' },
            { type: 'text', text: 'And the famous oddball: anything (except 0) to the power 0 equals 1. See why with the pattern: 2³ = 8, 2² = 4, 2¹ = 2 — each step divides by 2. One more step: 2⁰ = 1. The pattern leaves no other choice.' },
          ]},
          { title: 'Going negative', blocks: [
            { type: 'text', text: 'Keep that dividing pattern going past zero: 2⁻¹ = 1/2, 2⁻² = 1/4. A negative exponent means RECIPROCAL — flip it under 1. It is not a negative number; 3⁻² = 1/9, which is small and positive.' },
            { type: 'callout', text: 'Tomorrow these laws let you write 93,000,000 and 0.0000042 in four characters each. Scientists could not live without it.' },
          ]},
        ],
        recap: [
          'Multiplying same bases: add exponents. Power of a power: multiply them.',
          'Anything (nonzero) to the 0 power is 1 — the pattern proves it.',
          'A negative exponent means reciprocal: 3⁻² = 1/9.',
        ],
        quiz: [
          { type: 'numeric', prompt: '2³ · 2⁴ = 2ⁿ.  What is n?', answer: 7, hint: 'Same base multiplied — add the exponents.', explain: '3 + 4 = 7.' },
          { type: 'numeric', prompt: '(10²)³ = 10ⁿ.  What is n?', answer: 6, hint: 'Power of a power — multiply.', explain: '2 × 3 = 6.' },
          { type: 'mc', prompt: 'What is 5⁰?', choices: ['0', '1', '5', 'undefined'], answer: 1, hint: 'Follow the dividing pattern down from 5¹.', explain: 'Any nonzero number to the 0 power is 1.' },
          { type: 'mc', prompt: 'What does 3⁻² equal?', choices: ['−9', '−6', '1/9', '1/6'], answer: 2, hint: 'Negative exponent = flip it into a fraction.', explain: '3⁻² = 1/3² = 1/9.' },
          { type: 'numeric', prompt: 'What is the value of 2⁵?', answer: 32, hint: 'Double your way up: 2, 4, 8…', explain: '2·2·2·2·2 = 32.' },
        ],
      },
      {
        id: 'mr1', tag: 'Checkpoint', title: 'Checkpoint: Numbers & Equations',
        subtitle: 'Review · Everything from Days 1–7, connected',
        pages: [
          { title: 'Look at the ground you covered', blocks: [
            { type: 'text', text: 'Before pushing forward, stop and look back. In seven days you went from comparing two numbers to graphing a line and shrinking giant multiplications into tiny exponents. Today you connect those pieces into one picture.' },
            { type: 'callout', text: 'Nothing new is coming at you today. This is the day where the things you already learned lock together and start feeling easy.' },
          ]},
          { title: 'One idea grew into three', blocks: [
            { type: 'text', text: 'Day 1 gave you the ratio — comparing two quantities. Boil it down to "per one" and it becomes a unit rate. Set two ratios equal and it becomes a proportion. Put that steady rate on a graph and it becomes slope.' },
            { type: 'formula', text: 'ratio → unit rate → proportion → slope', label: 'Days 1, 2, and 6 are the same idea wearing different clothes' },
            { type: 'text', text: 'That is why y = mx + b felt learnable: the m was just a unit rate you already understood, describing how much y climbs for every one step of x.' },
          ]},
          { title: 'The balance toolkit', blocks: [
            { type: 'text', text: 'Days 3, 4, and 5 all trained one instinct: an equation is a balanced scale, and whatever you do to one side you must do to the other.' },
            { type: 'concept', term: 'Your three moves', def: 'Undo operations in reverse order (Day 3). Combine like terms to tidy up (Day 4). Gather variables on one side when they appear on both (Day 5).' },
            { type: 'example', text: 'Solve 5x + 3 = 2x + 18. Gather: subtract 2x from both sides → 3x + 3 = 18. Undo: subtract 3 → 3x = 15. Undo: divide by 3 → x = 5. Three days of skills, one smooth solution.' },
          ]},
          { title: 'Exponents: the great shortcut', blocks: [
            { type: 'text', text: 'Day 7 handed you a compressor. Instead of writing 2 × 2 × 2 × 2 × 2, you write 2⁵. And when you multiply powers of the same base, you simply add the exponents — because you are just counting how many copies there are in total.' },
            { type: 'formula', text: 'x³ · x⁴ = x⁷', label: '3 copies plus 4 copies makes 7 copies' },
          ]},
          { title: 'Where you stand', blocks: [
            { type: 'text', text: 'You can now describe a relationship (ratios), solve for the unknown inside it (equations), draw it (graphing), and compress it (exponents). Those four powers are the whole foundation of algebra.' },
            { type: 'callout', text: 'Everything from here — roots, triangles, systems, curves — is built on exactly these four. You are not starting over. You are standing on solid ground.' },
          ]},
        ],
        recap: [
          'Ratios, unit rates, proportions, and slope are one idea in four forms.',
          'Equations stay balanced: undo, combine, and gather to isolate the variable.',
          'Exponents compress repeated multiplication; multiplying adds the exponents.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Review — 12 apples cost $6. What is the cost of one apple, in dollars?', answer: 0.5, hint: 'Divide the total cost by the number of apples.', explain: '6 ÷ 12 = 0.5.' },
          { type: 'numeric', prompt: 'Review — What is 25% of 80?', answer: 20, hint: '25% means one quarter.', explain: '0.25 × 80 = 20.' },
          { type: 'numeric', prompt: 'Review — Solve 3x + 4 = 19. What is x?', answer: 5, hint: 'Subtract 4 first, then divide by 3.', explain: '3x = 15, so x = 5.' },
          { type: 'numeric', prompt: 'Review — Solve 5x + 3 = 2x + 18. What is x?', answer: 5, hint: 'Gather the x terms on one side first.', explain: '3x = 15, so x = 5.' },
          { type: 'numeric', prompt: 'Review — For y = 2x + 1, what is y when x = 4?', answer: 9, hint: 'Multiply first, then add.', explain: '2(4) + 1 = 9.' },
          { type: 'mc', prompt: 'Review — x³ · x⁴ equals:', choices: ['x⁷', 'x¹²', 'x', 'x¹'], answer: 0, hint: 'Add the exponents when the base matches.', explain: '3 + 4 = 7, so x⁷.' },
          { type: 'mc', prompt: 'In y = mx + b, the m tells you the:', choices: ['slope — how steep the line is', 'starting value', 'number of answers', 'exponent'], answer: 0, hint: 'It is the unit rate of the line.', explain: 'm is the slope.' },
        ],
      },
      {
        id: 'm8', tag: 'Grade 8', title: 'Scientific Notation',
        subtitle: 'Day 8 · Writing the enormous and the tiny',
        pages: [
          { title: 'The problem with zeros', blocks: [
            { type: 'text', text: 'The Sun is 93,000,000 miles away. A red blood cell is 0.000007 meters wide. Counting zeros is slow and error-prone — scientific notation fixes it using yesterday’s exponents.' },
            { type: 'formula', text: 'a × 10ⁿ   (1 ≤ a < 10)', label: 'One digit before the decimal, times a power of ten' },
          ]},
          { title: 'Converting both directions', blocks: [
            { type: 'example', text: '93,000,000 → put the decimal after the first digit: 9.3. It moved 7 places, so 9.3 × 10⁷.' },
            { type: 'example', text: '0.0042 → the decimal moves 3 places RIGHT to reach 4.2, so the exponent is negative: 4.2 × 10⁻³. Big numbers get positive exponents; tiny ones get negative.' },
          ]},
          { title: 'Math at full speed', blocks: [
            { type: 'text', text: 'Multiplying becomes easy: (2 × 10³) × (3 × 10⁴) = (2 × 3) × 10³⁺⁴ = 6 × 10⁷. Multiply the fronts, add the exponents — the product rule doing real work.' },
            { type: 'callout', text: 'In the Earth & Space lane, you will use exactly this to measure light-years and compare planets. Watch the lanes snap together.' },
          ]},
        ],
        recap: [
          'Scientific notation: one digit, a decimal, × a power of 10.',
          'Big numbers → positive exponents; tiny numbers → negative.',
          'To multiply: multiply the fronts, ADD the exponents.',
        ],
        quiz: [
          { type: 'numeric', prompt: '93,000,000 = 9.3 × 10ⁿ.  What is n?', answer: 7, hint: 'Count how many places the decimal moved.', explain: 'It moved 7 places → 10⁷.' },
          { type: 'numeric', prompt: '0.0042 = 4.2 × 10ⁿ.  What is n?', answer: -3, hint: 'Tiny number — the exponent is negative.', explain: 'Decimal moves 3 right → −3.' },
          { type: 'mc', prompt: '3 × 10⁸ is the same as:', choices: ['300,000,000', '30,000,000', '3,000,000', '38'], answer: 0, hint: '10⁸ has eight zeros.', explain: '3 followed by 8 zeros.' },
          { type: 'numeric', prompt: '(2 × 10³) × (3 × 10⁴) = 6 × 10ⁿ.  What is n?', answer: 7, hint: 'Multiply fronts, add exponents.', explain: '3 + 4 = 7.' },
          { type: 'tf', prompt: '10⁶ is one million.', answer: true, hint: 'Count the zeros in a million.', explain: '1,000,000 has six zeros = 10⁶.' },
        ],
      },
      {
        id: 'm9', tag: 'Grade 8', title: 'Square Roots & Perfect Squares',
        subtitle: 'Day 9 · The opposite of squaring',
        pages: [
          { title: 'Undoing a square', blocks: [
            { type: 'text', text: 'In Day 7 you learned 5² means 5 × 5 = 25. A square root runs that backward: it asks "what number, times itself, gives 25?" The answer is 5.' },
            { type: 'concept', term: 'Square root', def: 'The number that, multiplied by itself, gives the value under the √ symbol. √25 = 5 because 5 × 5 = 25.' },
          ]},
          { title: 'Perfect squares', blocks: [
            { type: 'concept', term: 'Perfect square', def: 'A number whose square root is a whole number: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100… Worth memorizing the first ten.' },
            { type: 'formula', text: '√49 = 7   because   7 × 7 = 49', label: 'Square root and squaring undo each other' },
          ]},
          { title: 'When it is not perfect', blocks: [
            { type: 'text', text: 'Most numbers are not perfect squares. √20 is not a whole number — but you can trap it between two. Since 4² = 16 and 5² = 25, √20 sits between 4 and 5 (closer to 4).' },
            { type: 'example', text: 'Estimate √50: 7² = 49 and 8² = 64, so √50 is just barely above 7. This "trap it between perfect squares" trick gives a fast estimate without a calculator.' },
          ]},
          { title: 'Why you just learned this', blocks: [
            { type: 'callout', text: 'Square roots are the key that unlocks tomorrow: the Pythagorean Theorem, one of the most useful tools in all of mathematics. You needed this first.' },
          ]},
        ],
        recap: [
          'A square root undoes squaring: √25 = 5.',
          'Perfect squares (1, 4, 9, 16, 25…) have whole-number roots.',
          'Trap a non-perfect root between two perfect squares to estimate it.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'What is √49?', answer: 7, hint: 'What number times itself is 49?', explain: '7 × 7 = 49.' },
          { type: 'numeric', prompt: 'What is 8²?', answer: 64, hint: 'Multiply 8 by itself.', explain: '8 × 8 = 64.' },
          { type: 'mc', prompt: 'Which of these is a perfect square?', choices: ['12', '16', '20', '18'], answer: 1, hint: 'Which has a whole-number square root?', explain: '16 = 4², the others do not.' },
          { type: 'mc', prompt: '√20 falls between which two whole numbers?', choices: ['3 and 4', '4 and 5', '5 and 6', '9 and 10'], answer: 1, hint: 'Find the perfect squares just below and above 20.', explain: '16 < 20 < 25, so √20 is between 4 and 5.' },
          { type: 'numeric', prompt: 'What is √81?', answer: 9, hint: '9 × 9 = ?', explain: '√81 = 9.' },
        ],
      },
      {
        id: 'm10', tag: 'Algebra I', title: 'The Pythagorean Theorem',
        subtitle: 'Day 10 · The most famous equation in geometry',
        pages: [
          { title: 'A special triangle', blocks: [
            { type: 'text', text: 'A right triangle has one 90° corner (a perfect "L"). The two short sides are legs; the longest side, always opposite the right angle, is the hypotenuse.' },
            { type: 'visual', kind: 'rtriangle' },
          ]},
          { title: 'The theorem', blocks: [
            { type: 'concept', term: 'Pythagorean Theorem', def: 'In any right triangle, the squares of the two legs add up to the square of the hypotenuse.' },
            { type: 'formula', text: 'a² + b² = c²', label: 'a, b = legs · c = hypotenuse' },
          ]},
          { title: 'Working an example', blocks: [
            { type: 'example', text: 'Legs of 3 and 4: a² + b² = 3² + 4² = 9 + 16 = 25. So c² = 25, which means c = √25 = 5. (That square-root skill from yesterday — already paying off.)' },
            { type: 'text', text: 'The 3-4-5 triangle is famous because every side is a whole number. So is 6-8-10 and 5-12-13. Builders use these to make perfect corners.' },
          ]},
          { title: 'Why it matters', blocks: [
            { type: 'text', text: 'This single equation lets you find a distance you cannot measure directly — the diagonal of a screen, the height of a ladder leaning on a wall, the straight-line distance between two points on a map.' },
            { type: 'callout', text: 'Two days ago: square roots. One day ago: nothing — you were ready. Today: a 2,500-year-old theorem you can actually use. That is what building skills looks like.' },
          ]},
        ],
        recap: [
          'A right triangle has legs (short sides) and a hypotenuse (longest).',
          'a² + b² = c² connects all three sides.',
          'Solve for the hypotenuse by squaring the legs, adding, then square-rooting.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'A right triangle has legs 3 and 4. What is the hypotenuse?', answer: 5, hint: '3² + 4² = c², then take the square root.', explain: '9 + 16 = 25, √25 = 5.' },
          { type: 'numeric', prompt: 'Legs of 6 and 8. Find the hypotenuse.', answer: 10, hint: '36 + 64 = c².', explain: '100 → √100 = 10.' },
          { type: 'mc', prompt: 'The hypotenuse of a right triangle is:', choices: ['the shortest side', 'the longest side, opposite the right angle', 'always 5', 'one of the legs'], answer: 1, hint: 'Which side faces the 90° corner?', explain: 'It is the longest side, opposite the right angle.' },
          { type: 'numeric', prompt: 'Legs of 5 and 12. Find the hypotenuse.', answer: 13, hint: '25 + 144 = c².', explain: '169 → √169 = 13.' },
          { type: 'tf', prompt: 'In a² + b² = c², the letter c stands for the hypotenuse.', answer: true, hint: 'c is the side you usually solve for.', explain: 'Yes — c is always the hypotenuse.' },
        ],
      },
      {
        id: 'm11', tag: 'Algebra I', title: 'Systems of Equations',
        subtitle: 'Day 11 · Two equations, one answer',
        pages: [
          { title: 'When two rules share a point', blocks: [
            { type: 'text', text: 'On Day 6 a single equation drew a line. What if you have TWO lines? A system asks: is there one (x, y) point that satisfies BOTH equations at once?' },
            { type: 'text', text: 'Picture two lines on a graph. Unless they are parallel, they cross at exactly one point — and that crossing point is the solution to the system.' },
          ]},
          { title: 'Solving by elimination', blocks: [
            { type: 'text', text: 'Stacking the equations can make a variable vanish. Take x + y = 10 and x − y = 2. Add them straight down: the +y and −y cancel, leaving 2x = 12, so x = 6.' },
            { type: 'formula', text: 'x + y = 10  and  x − y = 2  →  2x = 12  →  x = 6', label: 'Add the equations; one variable disappears' },
          ]},
          { title: 'Finishing the job', blocks: [
            { type: 'example', text: 'With x = 6, plug back into x + y = 10: 6 + y = 10, so y = 4. The solution is (6, 4) — the one point both lines share. Check it in the OTHER equation: 6 − 4 = 2. ✓' },
          ]},
          { title: 'Where this shows up', blocks: [
            { type: 'callout', text: 'Systems answer real questions: "two plans, which is cheaper and when do they tie?" The tie is exactly where the two lines cross. You will use this constantly.' },
          ]},
        ],
        recap: [
          'A system is two equations solved together.',
          'The solution is the single point where the two lines cross.',
          'Adding equations can eliminate a variable; then back-substitute.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'x + y = 10 and x − y = 2. Add them: what is x?', answer: 6, hint: 'The y terms cancel when you add.', explain: '2x = 12 → x = 6.' },
          { type: 'numeric', prompt: 'From x = 6 and x + y = 10, what is y?', answer: 4, hint: 'Substitute x = 6 back in.', explain: '6 + y = 10 → y = 4.' },
          { type: 'mc', prompt: 'The solution to a system of two lines is:', choices: ['the steeper line', 'the point where they cross', 'always (0,0)', 'the longer line'], answer: 1, hint: 'One point satisfies BOTH equations.', explain: 'It is the crossing point.' },
          { type: 'numeric', prompt: 'If y = 2x and x + y = 9, what is x?', answer: 3, hint: 'Replace y with 2x: x + 2x = 9.', explain: '3x = 9 → x = 3.' },
          { type: 'tf', prompt: 'Two parallel lines have no single solution point.', answer: true, hint: 'Do parallel lines ever cross?', explain: 'Parallel lines never meet — no solution.' },
        ],
      },
      {
        id: 'm12', tag: 'Algebra I', title: 'Inequalities',
        subtitle: 'Day 12 · When answers are a RANGE',
        pages: [
          { title: 'Beyond a single answer', blocks: [
            { type: 'text', text: 'Equations have one answer; inequalities have a whole range. "You must be at least 48 inches to ride" is not one height — it is every height 48 and up. Math writes that as h ≥ 48.' },
            { type: 'concept', term: 'Inequality symbols', def: '< less than · > greater than · ≤ less than or equal to · ≥ greater than or equal to.' },
          ]},
          { title: 'Solve them like equations', blocks: [
            { type: 'text', text: 'Great news: you solve inequalities almost exactly like the equations from Day 3. Isolate the variable with inverse operations.' },
            { type: 'example', text: 'Solve x + 3 > 7. Subtract 3 from both sides → x > 4. The answer is every number bigger than 4.' },
          ]},
          { title: 'The one twist', blocks: [
            { type: 'text', text: 'Here is the only new rule, and it is a famous trap: if you multiply or divide both sides by a NEGATIVE number, you must FLIP the inequality sign.' },
            { type: 'formula', text: '−2x < 6  →  x > −3', label: 'Divided by −2, so < flips to >' },
          ]},
          { title: 'Why it is everywhere', blocks: [
            { type: 'callout', text: 'Budgets ("spend at most $20"), speed limits, age rules, grades to pass — the real world runs on ranges far more than on single answers. Inequalities are the math of "enough."' },
          ]},
        ],
        recap: [
          'Inequalities describe a range using < > ≤ ≥.',
          'Solve them like equations — isolate the variable.',
          'Flip the sign when you multiply or divide by a negative.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Solve x + 3 > 7. The answer is x greater than what number?', answer: 4, hint: 'Subtract 3 from both sides.', explain: 'x > 4.' },
          { type: 'mc', prompt: 'When you divide both sides of an inequality by a negative number, you must:', choices: ['add 1', 'flip the inequality sign', 'square both sides', 'do nothing special'], answer: 1, hint: 'It is the one twist from today.', explain: 'Dividing by a negative flips the sign.' },
          { type: 'tf', prompt: 'x = 5 is a solution to x > 4.', answer: true, hint: 'Is 5 greater than 4?', explain: '5 > 4, so yes.' },
          { type: 'numeric', prompt: 'Solve 2x < 10. The answer is x less than what number?', answer: 5, hint: 'Divide both sides by 2 (positive, no flip).', explain: 'x < 5.' },
          { type: 'mc', prompt: 'The symbol ≥ means:', choices: ['greater than only', 'greater than OR equal to', 'less than', 'not equal'], answer: 1, hint: 'The line under > adds "or equal."', explain: '≥ is "greater than or equal to."' },
        ],
      },
      {
        id: 'm13', tag: 'Algebra I', title: 'Functions & f(x) Notation',
        subtitle: 'Day 13 · A new way to write rules',
        pages: [
          { title: 'A rule with one job', blocks: [
            { type: 'text', text: 'A function is a rule that gives each input EXACTLY ONE output — no surprises, no two answers. A vending machine is a function: press B4, you always get the same snack.' },
            { type: 'concept', term: 'Function', def: 'A relationship where every input has exactly one output. Same input in, same output out, every time.' },
          ]},
          { title: 'The f(x) shorthand', blocks: [
            { type: 'text', text: 'Mathematicians write functions with special notation. Instead of y = 2x + 1, they write f(x) = 2x + 1. The f is the function’s name; the x in parentheses is the input.' },
            { type: 'formula', text: 'f(x) = 2x + 1', label: 'Read it: "f of x equals 2x plus 1"' },
          ]},
          { title: 'Evaluating a function', blocks: [
            { type: 'example', text: 'f(3) means "feed 3 into the function." Replace every x with 3: f(3) = 2(3) + 1 = 7. The notation f(3) = 7 packs "input 3 gives output 7" into four symbols.' },
            { type: 'text', text: 'It is the same line you graphed on Day 6 — just dressed in the notation every high school and college math class uses.' },
          ]},
          { title: 'Why learn the notation', blocks: [
            { type: 'callout', text: 'f(x) is the universal language of advanced math, science, and computer code. Meeting it now, gently, means it will feel familiar — not scary — when it shows up everywhere later.' },
          ]},
        ],
        recap: [
          'A function gives each input exactly one output.',
          'f(x) = 2x + 1 is just a named rule; x is the input.',
          'f(3) means substitute 3 for x and compute.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'If f(x) = 2x + 1, what is f(3)?', answer: 7, hint: 'Replace x with 3, then compute.', explain: '2(3) + 1 = 7.' },
          { type: 'mc', prompt: 'A function gives each input how many outputs?', choices: ['exactly one', 'two', 'as many as it wants', 'zero'], answer: 0, hint: 'Same input, same single result.', explain: 'Exactly one output per input.' },
          { type: 'numeric', prompt: 'If f(x) = x², what is f(4)?', answer: 16, hint: 'Square the input.', explain: '4² = 16.' },
          { type: 'numeric', prompt: 'If f(x) = 3x, what is f(0)?', answer: 0, hint: 'Multiply 3 by 0.', explain: '3 × 0 = 0.' },
          { type: 'tf', prompt: 'f(x) = 2x + 1 describes a function.', answer: true, hint: 'Does each x give exactly one answer?', explain: 'Yes — one output per input.' },
        ],
      },
      {
        id: 'm14', tag: 'Algebra I', title: 'Intro to Quadratics',
        subtitle: 'Day 14 · When lines become curves',
        pages: [
          { title: 'A different kind of rule', blocks: [
            { type: 'text', text: 'Every rule so far made a straight line. But what happens when the input is SQUARED? The rule y = x² behaves very differently — and it draws a curve, not a line.' },
            { type: 'concept', term: 'Quadratic', def: 'A function where the input is squared, like y = x². The "quad" hints at squaring (square = four-sided).' },
          ]},
          { title: 'Build the table', blocks: [
            { type: 'text', text: 'Feed in values and watch: x = −2 gives 4, x = −1 gives 1, x = 0 gives 0, x = 1 gives 1, x = 2 gives 4. Notice the outputs fall, hit bottom at 0, then climb back up — and the negatives give positive answers (a negative squared is positive).' },
            { type: 'visual', kind: 'parabola' },
          ]},
          { title: 'The U-shaped curve', blocks: [
            { type: 'concept', term: 'Parabola', def: 'The U-shaped graph of a quadratic. Its lowest (or highest) point is called the vertex.' },
            { type: 'text', text: 'The symmetry is the giveaway: x = 2 and x = −2 BOTH give 4, so the curve is a perfect mirror image across the middle. Lines never do that.' },
          ]},
          { title: 'Where curves rule the world', blocks: [
            { type: 'text', text: 'Throw a ball — its path is a parabola. A satellite dish, the cables of a suspension bridge, a fountain’s arc of water: all quadratics. Straight-line math could never describe them.' },
            { type: 'callout', text: 'Fourteen days ago you found a unit rate. Today you graphed a parabola — the gateway to all of high school algebra and physics. Look how far you have climbed.' },
          ]},
        ],
        recap: [
          'A quadratic squares the input: y = x².',
          'Its graph is a parabola — a symmetric U-shaped curve.',
          'Negatives squared turn positive, making both sides climb.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'For y = x², what is y when x = 3?', answer: 9, hint: 'Square the input.', explain: '3² = 9.' },
          { type: 'mc', prompt: 'The graph of y = x² is a:', choices: ['straight line', 'parabola (U-shape)', 'circle', 'single point'], answer: 1, hint: 'Squaring bends the graph.', explain: 'It is a U-shaped parabola.' },
          { type: 'numeric', prompt: 'For y = x², what is y when x = −2?', answer: 4, hint: 'A negative squared becomes positive.', explain: '(−2)² = 4.' },
          { type: 'tf', prompt: 'The graph of y = x² is a straight line.', answer: false, hint: 'Squaring changes its shape.', explain: 'It curves into a parabola.' },
          { type: 'numeric', prompt: 'For y = x² + 1, what is y when x = 2?', answer: 5, hint: 'Square first, then add 1.', explain: '4 + 1 = 5.' },
        ],
      },
      {
        id: 'mr2', tag: 'Checkpoint', title: 'Checkpoint: Algebra Foundations',
        subtitle: 'Review · Everything from Days 8–14, connected',
        pages: [
          { title: 'The second half of the climb', blocks: [
            { type: 'text', text: 'The first checkpoint tied together ratios, equations, and exponents. Since then you picked up tools that professional mathematicians, scientists, and engineers use every single day. Time to see how they link.' },
          ]},
          { title: 'Very big and very small', blocks: [
            { type: 'text', text: 'Day 8 used exponents to tame enormous numbers: 4,600,000,000 becomes 4.6 × 10⁹. Day 9 ran exponents backward — a square root undoes a square. Both days are the same tool pointed in opposite directions.' },
            { type: 'formula', text: '7² = 49    and    √49 = 7', label: 'Squaring and rooting undo each other' },
          ]},
          { title: 'Roots build triangles', blocks: [
            { type: 'text', text: 'The moment you could take a square root, the Pythagorean Theorem became available. a² + b² = c² finds a distance you cannot measure directly — but only if you can undo that final square.' },
            { type: 'example', text: 'Legs 6 and 8: 36 + 64 = 100, and √100 = 10. Day 9 was the key that opened Day 10.' },
          ]},
          { title: 'Lines, ranges, and rules', blocks: [
            { type: 'text', text: 'Days 11 to 13 stretched what an answer can even look like. A system asks where two lines cross, so the answer is a point. An inequality accepts a whole range instead of one number. And f(x) notation gives a rule a name so you can feed it any input.' },
            { type: 'concept', term: 'Three kinds of answer', def: 'A point where lines meet (systems) · a range of valid values (inequalities) · a rule that transforms inputs (functions).' },
          ]},
          { title: 'When lines finally curve', blocks: [
            { type: 'text', text: 'Day 14 broke the straight-line rule. Square the input and the graph bends into a parabola — the shape of a thrown ball, a satellite dish, a fountain of water.' },
            { type: 'callout', text: 'Fourteen days ago you compared two numbers. You can now solve systems, work with ranges, use function notation, and graph a curve. That is the doorway to high school algebra, and you are already standing in it.' },
          ]},
        ],
        recap: [
          'Scientific notation and square roots are exponents in both directions.',
          'Square roots unlock the Pythagorean Theorem for finding distances.',
          'Answers can be a point (systems), a range (inequalities), or a rule (functions).',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Review — What is √64?', answer: 8, hint: 'What number times itself is 64?', explain: '8 × 8 = 64.' },
          { type: 'numeric', prompt: 'Review — A right triangle has legs 6 and 8. Find the hypotenuse.', answer: 10, hint: '36 + 64 = c², then take the root.', explain: '√100 = 10.' },
          { type: 'numeric', prompt: 'Review — x + y = 12 and x − y = 4. What is x?', answer: 8, hint: 'Add the two equations so y cancels.', explain: '2x = 16, so x = 8.' },
          { type: 'numeric', prompt: 'Review — Solve x + 5 > 12. The answer is x greater than what?', answer: 7, hint: 'Subtract 5 from both sides.', explain: 'x > 7.' },
          { type: 'numeric', prompt: 'Review — If f(x) = 3x + 2, what is f(4)?', answer: 14, hint: 'Replace x with 4.', explain: '3(4) + 2 = 14.' },
          { type: 'numeric', prompt: 'Review — For y = x², what is y when x = 6?', answer: 36, hint: 'Square the input.', explain: '6² = 36.' },
          { type: 'mc', prompt: 'The graph of y = x² is a:', choices: ['parabola', 'straight line', 'circle', 'single point'], answer: 0, hint: 'Squaring bends the graph.', explain: 'It is a parabola.' },
        ],
      },
    ],
  },
  cs: {
    name: 'Computer Science', icon: Cpu, accent: '#38bdf8',
    blurb: 'How machines think — from bits to debugging.',
    days: [
      {
        id: 'c1', tag: 'CS', title: 'What Is a Computer?',
        subtitle: 'Day 1 · Input, process, output',
        pages: [
          { title: 'A machine that follows orders', blocks: [
            { type: 'text', text: 'A computer is not magic and not smart on its own. It is a machine that follows instructions with perfect, literal obedience — and astonishing speed.' },
            { type: 'concept', term: 'Computer', def: 'A machine that takes input, processes it by following instructions, and produces output.' },
          ]},
          { title: 'The four basic jobs', blocks: [
            { type: 'text', text: 'Almost everything a computer does fits four roles: INPUT (information coming in), PROCESS (working on it), OUTPUT (results going out), and STORAGE (saving it for later).' },
            { type: 'formula', text: 'INPUT → PROCESS → OUTPUT  (+ STORAGE)', label: 'The shape of every computer task' },
          ]},
          { title: 'Seeing it in action', blocks: [
            { type: 'example', text: 'In a calculator app: typing 5 + 3 is input, the chip adding them is process, the 8 on screen is output, and saving your history is storage. The same four jobs power a phone, a game, or a spaceship.' },
          ]},
          { title: 'Why start here', blocks: [
            { type: 'callout', text: 'Because the computer obeys exactly — no common sense — YOU must give flawless instructions. That challenge is the whole adventure of computer science.' },
          ]},
        ],
        recap: [
          'A computer follows instructions exactly and very fast.',
          'Its four basic jobs: input, process, output, storage.',
          'Because it has no common sense, your instructions must be perfect.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The four basic computer jobs are input, process, output, and:', choices: ['storage', 'magic', 'guessing', 'sleeping'], answer: 0, hint: 'Where does data get saved?', explain: 'Storage is the fourth job.' },
          { type: 'mc', prompt: 'Typing on a keyboard is an example of:', choices: ['input', 'output', 'storage', 'process'], answer: 0, hint: 'Information coming IN.', explain: 'Keyboard typing is input.' },
          { type: 'mc', prompt: 'A screen showing your results is:', choices: ['input', 'output', 'storage', 'a bug'], answer: 1, hint: 'Information going OUT.', explain: 'The display is output.' },
          { type: 'tf', prompt: 'Computers follow instructions exactly, with no common sense.', answer: true, hint: 'That is why bugs happen.', explain: 'Yes — perfect, literal obedience.' },
        ],
      },
      {
        id: 'c2', tag: 'CS', title: 'Binary: 1s and 0s',
        subtitle: 'Day 2 · The language machines speak',
        pages: [
          { title: 'Only two symbols', blocks: [
            { type: 'text', text: 'Deep down, a computer does not understand the number 5 or the letter A. It understands only two states: ON and OFF, written as 1 and 0. A single one of these is a bit.' },
            { type: 'concept', term: 'Bit', def: 'The smallest piece of computer data — a single 1 or 0, on or off.' },
          ]},
          { title: 'Why just two?', blocks: [
            { type: 'text', text: 'Electricity is reliably either flowing or not — like a light switch. Two clear states almost never get confused, which makes computers fast and accurate. Ten fuzzy states would be a nightmare.' },
          ]},
          { title: 'Counting in twos', blocks: [
            { type: 'text', text: 'Our normal numbers use place values 1, 10, 100 (powers of ten). Binary uses powers of TWO: 1, 2, 4, 8, 16… To read binary, add up the place values wherever there is a 1.' },
            { type: 'formula', text: '1 0 1  =  4 + 0 + 1  =  5', label: 'Place values 4, 2, 1' },
          ]},
          { title: 'Bytes and beyond', blocks: [
            { type: 'example', text: '1010 = 8 + 0 + 2 + 0 = 10. Group 8 bits together and you get a byte — enough to store one letter. Your photos and videos are just millions of these 1s and 0s.' },
            { type: 'callout', text: 'Those powers of two? The exact same exponents you mastered in the Math lane (Day 7). Computers run on your algebra.' },
          ]},
        ],
        recap: [
          'A bit is a single 1 or 0 (on or off).',
          'Binary uses place values that are powers of two: 1, 2, 4, 8…',
          'Read binary by adding the place values where a 1 appears; 8 bits = a byte.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A single 1 or 0 is called a:', choices: ['bit', 'byte', 'pixel', 'word'], answer: 0, hint: 'Smallest piece of data.', explain: 'That is a bit.' },
          { type: 'numeric', prompt: 'Binary 101 (place values 4, 2, 1) equals what number?', answer: 5, hint: 'Add the place values where there is a 1.', explain: '4 + 1 = 5.' },
          { type: 'numeric', prompt: 'Binary 1010 equals what number? (8, 4, 2, 1)', answer: 10, hint: 'Add 8 and 2.', explain: '8 + 2 = 10.' },
          { type: 'mc', prompt: 'Computers use binary because switches are reliably:', choices: ['on or off', 'colorful', 'warm', 'round'], answer: 0, hint: 'Two clear states.', explain: 'On/off is hard to confuse.' },
          { type: 'numeric', prompt: 'How many bits are in one byte?', answer: 8, hint: 'A small power of two.', explain: 'A byte is 8 bits.' },
        ],
      },
      {
        id: 'c3', tag: 'CS', title: 'Algorithms & Pseudocode',
        subtitle: 'Day 3 · Precise step-by-step thinking',
        pages: [
          { title: 'Instructions, exactly', blocks: [
            { type: 'text', text: 'To make a computer do anything, you write an algorithm — a precise, ordered list of steps. A recipe is an algorithm. So is long division. The computer needs the same exactness.' },
            { type: 'concept', term: 'Algorithm', def: 'A precise, step-by-step set of instructions that completes a task the same way every time.' },
          ]},
          { title: 'Planning in plain words', blocks: [
            { type: 'concept', term: 'Pseudocode', def: 'Plain-language steps written to plan an algorithm BEFORE turning it into real code. Half-English, half-logic.' },
            { type: 'visual', kind: 'flow' },
          ]},
          { title: 'A worked example', blocks: [
            { type: 'example', text: 'Algorithm to find the largest of three numbers — Step one: assume the first is biggest. Step two: if the second is bigger, remember it instead. Step three: if the third beats your current biggest, remember it. Step four: announce the biggest. Every step is exact and ordered.' },
          ]},
          { title: 'Why it is the foundation', blocks: [
            { type: 'callout', text: 'Every app, game, and website is just algorithms stacked together. Master clear step-by-step thinking and you can command any computer.' },
          ]},
        ],
        recap: [
          'An algorithm is a precise, ordered list of steps.',
          'Pseudocode plans an algorithm in plain language first.',
          'Order and exactness are everything; a flowchart can map the steps.',
        ],
        quiz: [
          { type: 'mc', prompt: 'An algorithm is:', choices: ['a precise list of steps', 'a lucky guess', 'a type of computer', 'a math symbol'], answer: 0, hint: 'Think recipe.', explain: 'Exact, ordered steps.' },
          { type: 'mc', prompt: 'Pseudocode is:', choices: ['plain-language steps before real code', 'a programming language', 'a kind of bug', 'a password'], answer: 0, hint: 'A planning tool.', explain: 'It plans the algorithm in plain words.' },
          { type: 'tf', prompt: 'The order of steps in an algorithm matters.', answer: true, hint: 'Try the steps out of order.', explain: 'Order is part of the instructions.' },
          { type: 'mc', prompt: 'A diagram that maps an algorithm’s steps is a:', choices: ['flowchart', 'spreadsheet', 'keyboard', 'pixel'], answer: 0, hint: 'Boxes and arrows.', explain: 'That is a flowchart.' },
        ],
      },
      {
        id: 'c4', tag: 'CS', title: 'Loops & Conditionals',
        subtitle: 'Day 4 · Repeating and deciding',
        pages: [
          { title: 'The lazy genius move', blocks: [
            { type: 'text', text: 'Imagine printing "hello" 100 times. Writing it 100 times is madness. Instead, a loop says "repeat this step 100 times" — once. Loops are how computers handle huge, repetitive jobs effortlessly.' },
            { type: 'concept', term: 'Loop', def: 'An instruction that repeats a step or steps multiple times, so you write it only once.' },
          ]},
          { title: 'Making decisions', blocks: [
            { type: 'concept', term: 'Conditional', def: 'An IF/THEN instruction that runs only when something is true. "IF it is raining, THEN bring an umbrella."' },
            { type: 'text', text: 'Conditionals give programs choices. Add an ELSE for the other case: "IF score ≥ 90, THEN print A, ELSE print B."' },
          ]},
          { title: 'Combining them', blocks: [
            { type: 'example', text: 'Loop through a list of test scores; for EACH score, IF it is above 90, THEN count it as an A. One loop plus one conditional just graded an entire class. That is the power of combining the two.' },
          ]},
          { title: 'The two superpowers', blocks: [
            { type: 'callout', text: 'Steps, loops, and conditionals — with just these three tools you can describe almost any process on Earth. Nearly all code is built from them.' },
          ]},
        ],
        recap: [
          'A loop repeats steps so you write them once.',
          'A conditional (IF/THEN) runs steps only when something is true.',
          'Combining loops and conditionals handles big, smart tasks.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A loop is used to:', choices: ['repeat steps', 'make a single decision', 'store one value', 'turn off the computer'], answer: 0, hint: 'It handles repetition.', explain: 'Loops repeat steps.' },
          { type: 'mc', prompt: '"IF it is raining, THEN bring an umbrella" is a:', choices: ['conditional', 'loop', 'variable', 'byte'], answer: 0, hint: 'It is an IF/THEN decision.', explain: 'That is a conditional.' },
          { type: 'tf', prompt: 'Loops help avoid writing the same step many times.', answer: true, hint: 'Why else use one?', explain: 'Yes — write once, repeat many.' },
          { type: 'mc', prompt: '"Repeat 10 times" describes a:', choices: ['loop', 'conditional', 'bug', 'byte'], answer: 0, hint: 'Repetition word.', explain: 'Repeating is a loop.' },
        ],
      },
      {
        id: 'c5', tag: 'CS', title: 'Variables & Data',
        subtitle: 'Day 5 · Boxes that hold information',
        pages: [
          { title: 'A named box', blocks: [
            { type: 'text', text: 'Programs need to remember things — a score, a name, a high score. They use a variable: a named container that holds a value. Sound familiar? It is the cousin of the x from your algebra lane.' },
            { type: 'concept', term: 'Variable (in code)', def: 'A named container that stores data, and whose value can change while the program runs.' },
          ]},
          { title: 'Different kinds of data', blocks: [
            { type: 'text', text: 'Variables hold different TYPES of data: numbers (like 42), text called strings (like "hello"), and true/false values called booleans. The type tells the computer what it is allowed to do with the data.' },
          ]},
          { title: 'Watching a variable change', blocks: [
            { type: 'example', text: 'Start with score = 0. Player wins points: score = score + 10. Now score holds 10. The box kept its name but swapped its contents — that updating is what makes games and apps feel alive.' },
            { type: 'formula', text: 'score = 0  →  score = score + 10  →  score is 10', label: 'A variable’s value can change' },
          ]},
          { title: 'The algebra connection', blocks: [
            { type: 'callout', text: 'In algebra, x stood for an unknown number. In code, a variable stores a known value you can change. Same idea — a named stand-in — which is why algebra makes coding click.' },
          ]},
        ],
        recap: [
          'A variable is a named container that stores data.',
          'Data types include numbers, strings (text), and booleans (true/false).',
          'A variable’s value can change as the program runs.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A variable in code is:', choices: ['a named container for data', 'a type of loop', 'a bug', 'a screen'], answer: 0, hint: 'It stores a value.', explain: 'A named container for data.' },
          { type: 'mc', prompt: 'Text data like "hello" is called a:', choices: ['string', 'integer', 'boolean', 'loop'], answer: 0, hint: 'A string of characters.', explain: 'Text is a string.' },
          { type: 'mc', prompt: 'A true/false value is a:', choices: ['boolean', 'string', 'number', 'pixel'], answer: 0, hint: 'Only two possible values.', explain: 'True/false is a boolean.' },
          { type: 'tf', prompt: 'A variable’s value can change while a program runs.', answer: true, hint: 'Think of a score going up.', explain: 'Yes — that is the point of variables.' },
        ],
      },
      {
        id: 'c6', tag: 'CS', title: 'Debugging & Decomposition',
        subtitle: 'Day 6 · Thinking like a programmer',
        pages: [
          { title: 'Bugs are normal', blocks: [
            { type: 'text', text: 'Every programmer writes code that breaks. An error in a program is called a bug, and finding and fixing it is debugging. Bugs are not failure — they are just the next puzzle.' },
            { type: 'concept', term: 'Debugging', def: 'The process of finding and fixing errors (bugs) in a program.' },
          ]},
          { title: 'Break it down', blocks: [
            { type: 'concept', term: 'Decomposition', def: 'Breaking a big, scary problem into small, solvable pieces — the single most important problem-solving skill in computing.' },
            { type: 'text', text: 'Can’t build a whole game? Build just the player moving. Then just the scoring. Then just the enemies. Small wins stack into big programs.' },
          ]},
          { title: 'Hunting the bug', blocks: [
            { type: 'example', text: 'When code misbehaves, test small pieces one at a time and read the error clues. You rule out what works until the broken part is cornered — the exact "eliminate the impossible" reasoning a good detective uses.' },
          ]},
          { title: 'Computational thinking', blocks: [
            { type: 'callout', text: 'Decompose the problem, write precise steps, use loops and conditionals, store data in variables, and debug calmly. That toolkit — computational thinking — solves far more than just code.' },
          ]},
        ],
        recap: [
          'A bug is an error; debugging is finding and fixing it.',
          'Decomposition breaks big problems into small, solvable pieces.',
          'Test small parts and read clues to corner a bug.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A "bug" in code is:', choices: ['an error', 'a feature', 'a loop', 'a fast computer'], answer: 0, hint: 'Something gone wrong.', explain: 'A bug is an error.' },
          { type: 'mc', prompt: 'Breaking a big problem into smaller parts is called:', choices: ['decomposition', 'debugging', 'looping', 'storage'], answer: 0, hint: 'Divide and conquer.', explain: 'That is decomposition.' },
          { type: 'tf', prompt: 'Testing small pieces helps locate a bug.', answer: true, hint: 'Rule out what works.', explain: 'Yes — isolate the broken part.' },
          { type: 'mc', prompt: 'Debugging is most like:', choices: ['detective work and elimination', 'guessing randomly', 'giving up', 'taking a nap'], answer: 0, hint: 'Rule out the impossible.', explain: 'It is detective-style elimination.' },
        ],
      },
      {
        id: 'c7', tag: 'Coding', title: 'Meet a Real Language',
        subtitle: 'Day 7 · From pseudocode to JavaScript',
        pages: [
          { title: 'From plan to program', blocks: [
            { type: 'text', text: 'On Day 3 you wrote pseudocode — plain-language steps. That was the plan. A programming language is how you hand that plan to an actual computer in words it can obey.' },
            { type: 'concept', term: 'Programming language', def: 'A precise set of words and symbols a computer understands. You write instructions in it; the machine carries them out exactly.' },
          ]},
          { title: 'Why JavaScript', blocks: [
            { type: 'text', text: 'You will learn JavaScript, the language that runs inside every web browser on Earth. It powers websites, games, and apps — including this one you are using right now.' },
          ]},
          { title: 'Syntax: spelling counts', blocks: [
            { type: 'concept', term: 'Syntax', def: 'The exact grammar rules of a language. Miss a quote or a bracket and the computer stops — it cannot guess what you meant.' },
            { type: 'text', text: 'This is not the computer being mean. Remember Day 1: a computer has no common sense. Precision is the price of that perfect obedience.' },
          ]},
          { title: 'Statements and order', blocks: [
            { type: 'text', text: 'Code is made of statements — single commands, usually one per line, run top to bottom in order. Just like an algorithm, sequence is everything.' },
            { type: 'callout', text: 'You already know how to think in steps, loops, and conditions. Everything from here is just learning to spell those ideas in JavaScript.' },
          ]},
        ],
        recap: [
          'A programming language turns your plan into instructions a computer obeys.',
          'JavaScript runs in every web browser.',
          'Syntax is exact grammar — precision matters because computers cannot guess.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A programming language is:', choices: ['precise words a computer understands', 'a kind of hardware', 'a type of mouse', 'a spreadsheet'], answer: 0, hint: 'It is how you give instructions.', explain: 'It lets you give exact instructions.' },
          { type: 'mc', prompt: 'Syntax means:', choices: ['the exact grammar rules of the language', 'a bug', 'a fast computer', 'a variable'], answer: 0, hint: 'Spelling and punctuation rules.', explain: 'Syntax is the language’s grammar.' },
          { type: 'mc', prompt: 'JavaScript mainly runs in:', choices: ['web browsers', 'toasters', 'calculators only', 'printers'], answer: 0, hint: 'Think websites.', explain: 'It runs in browsers.' },
          { type: 'tf', prompt: 'Statements in code normally run in order from top to bottom.', answer: true, hint: 'Same as an algorithm.', explain: 'Yes — sequence matters.' },
        ],
      },
      {
        id: 'c8', tag: 'Coding', title: 'Talking to the Computer',
        subtitle: 'Day 8 · console.log and strings',
        pages: [
          { title: 'Making the computer speak', blocks: [
            { type: 'text', text: 'The very first thing every programmer learns is how to make the computer say something back. In JavaScript that command is console.log.' },
            { type: 'formula', text: 'console.log("Hello!");', label: 'Prints Hello! to the output' },
          ]},
          { title: 'Reading the parts', blocks: [
            { type: 'text', text: 'Break that line down. console.log is the command. The parentheses hold what you are giving it. The quotation marks mark text. The semicolon ends the statement, like a period ends a sentence.' },
            { type: 'concept', term: 'String', def: 'Text in code, always wrapped in quotation marks — like "Hello!" — exactly the data type you met on Day 5.' },
          ]},
          { title: 'Quotes change everything', blocks: [
            { type: 'example', text: 'console.log("5 + 3") prints the text 5 + 3, because quotes mean "treat this as words." But console.log(5 + 3) prints 8, because without quotes the computer treats it as math. One tiny mark, two different results.' },
          ]},
          { title: 'Your output window', blocks: [
            { type: 'text', text: 'Everything you log appears in an output area. It is how you check what your program is actually doing — and tomorrow it becomes your main tool for hunting bugs.' },
            { type: 'callout', text: 'Next lesson you learn to store values. The lesson after that, you write and run real code yourself.' },
          ]},
        ],
        recap: [
          'console.log makes the computer print something out.',
          'Text in quotes is a string; without quotes, math gets calculated.',
          'A semicolon ends a statement.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which command prints something out in JavaScript?', choices: ['console.log', 'print.now', 'say.it', 'show.text'], answer: 0, hint: 'It logs to the console.', explain: 'console.log prints output.' },
          { type: 'mc', prompt: 'Text wrapped in quotation marks is called a:', choices: ['string', 'number', 'loop', 'bug'], answer: 0, hint: 'A string of characters.', explain: 'Quoted text is a string.' },
          { type: 'mc', prompt: 'What does console.log(5 + 3) print?', choices: ['8', '5 + 3', '53', 'nothing'], answer: 0, hint: 'No quotes means it does the math.', explain: 'It calculates and prints 8.' },
          { type: 'mc', prompt: 'What does console.log("5 + 3") print?', choices: ['5 + 3', '8', '53', 'an error'], answer: 0, hint: 'Quotes mean "treat as text."', explain: 'Quoted text prints exactly as written.' },
        ],
      },
      {
        id: 'c9', tag: 'Coding', title: 'Variables & Math in Code',
        subtitle: 'Day 9 · Storing and calculating',
        pages: [
          { title: 'Naming a box', blocks: [
            { type: 'text', text: 'On Day 5 you met variables as named containers. Here is how JavaScript actually makes one: the word let, then a name, then an equals sign, then the value.' },
            { type: 'formula', text: 'let score = 0;', label: 'Creates a box named score holding 0' },
          ]},
          { title: 'The equals sign lies', blocks: [
            { type: 'text', text: 'Careful — in code, = does not mean "is equal to." It means "put this value into this box." So score = score + 10 is not a strange algebra puzzle; it means "take what is in score, add 10, and put it back."' },
          ]},
          { title: 'Doing math', blocks: [
            { type: 'concept', term: 'Operators', def: 'The math symbols code uses: + add, − subtract, * multiply, / divide. Note that multiplication is a star, not an × sign.' },
            { type: 'example', text: 'let price = 4; let count = 3; let total = price * count; console.log(total); prints 12. You just wrote the revenue formula from the Business lane as real code.' },
          ]},
          { title: 'Using a variable', blocks: [
            { type: 'text', text: 'Once a box has a value, use its name anywhere you would use that value. Write console.log(score) with no quotes and it prints what is inside — not the word "score."' },
            { type: 'callout', text: 'Tomorrow you stop reading code and start writing it. Everything you need is now in your hands.' },
          ]},
        ],
        recap: [
          'let name = value; creates a variable in JavaScript.',
          'In code, = means "store this value," not "is equal to."',
          'Operators are + − * / and you use a variable by writing its name.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which line correctly creates a variable?', choices: ['let score = 0;', 'variable score 0', 'score := 0', 'make score'], answer: 0, hint: 'Start with the word let.', explain: 'let score = 0; is the JavaScript way.' },
          { type: 'mc', prompt: 'In code, the = sign means:', choices: ['store this value in the box', 'is exactly equal to', 'add', 'compare'], answer: 0, hint: 'It assigns rather than compares.', explain: 'It stores a value.' },
          { type: 'mc', prompt: 'Which symbol multiplies in JavaScript?', choices: ['*', '×', 'x', '·'], answer: 0, hint: 'It is on the number-8 key.', explain: 'The star * multiplies.' },
          { type: 'numeric', prompt: 'let price = 4; let count = 3; let total = price * count; What does total hold?', answer: 12, hint: 'Multiply 4 by 3.', explain: 'total is 12.' },
        ],
      },
      {
        id: 'c10', tag: 'Live Code', title: 'Your First Real Program',
        subtitle: 'Day 10 · Write it, run it, see it work',
        pages: [
          { title: 'Time to actually build', blocks: [
            { type: 'text', text: 'Enough reading. Below you get a real code editor. Type JavaScript, press Run, and watch the computer obey you. Nothing can break — if it fails, you simply fix it and run again.' },
          ]},
          { title: 'Make it speak', blocks: [
            { type: 'text', text: 'Start with the classic first program every coder on Earth has written.' },
            { type: 'codelab', task: 'Make the computer print exactly:  Hello, world!', starter: 'console.log("Hello, world!");', expect: 'Hello, world!', hint: 'Keep the text inside quotes, exactly as shown.' },
          ]},
          { title: 'Store, then calculate', blocks: [
            { type: 'text', text: 'Now combine variables and math. Create two boxes, multiply them, and print the result.' },
            { type: 'codelab', task: 'Create price = 5 and count = 4, then print price * count. Expected output: 20', starter: 'let price = 5;\nlet count = 4;\nconsole.log(price * count);', expect: '20', hint: 'Use let for each variable, then log the product with no quotes.' },
          ]},
          { title: 'You are a programmer now', blocks: [
            { type: 'text', text: 'Try changing the numbers and running it again. Break it on purpose and watch the error. Curiosity is the fastest way to learn a language.' },
            { type: 'callout', text: 'You just wrote and ran real JavaScript — the same language running billions of websites. Tomorrow you teach it to make decisions.' },
          ]},
        ],
        recap: [
          'You can write and run real JavaScript code.',
          'console.log prints results to the output.',
          'Variables store values you can calculate with.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which line prints Hello, world! exactly?', choices: ['console.log("Hello, world!");', 'console.log(Hello, world!);', 'print("Hello, world!")', 'log Hello, world!'], answer: 0, hint: 'Text needs quotes.', explain: 'Quotes make it a string.' },
          { type: 'numeric', prompt: 'let a = 5; let b = 4; console.log(a * b); What prints?', answer: 20, hint: 'Multiply the two values.', explain: '5 × 4 = 20.' },
          { type: 'tf', prompt: 'Running broken code is safe — you can just fix it and run again.', answer: true, hint: 'Errors are normal in coding.', explain: 'Yes — errors are part of learning.' },
          { type: 'mc', prompt: 'To print a variable’s value, you write its name:', choices: ['without quotes', 'with quotes', 'in capitals', 'twice'], answer: 0, hint: 'Quotes would print the name itself.', explain: 'No quotes prints the stored value.' },
        ],
      },
      {
        id: 'c11', tag: 'Live Code', title: 'Decisions in Real Code',
        subtitle: 'Day 11 · Writing if and else',
        pages: [
          { title: 'Conditionals, for real', blocks: [
            { type: 'text', text: 'Day 4 taught you IF/THEN thinking. Here is the actual JavaScript spelling: the word if, a condition in parentheses, then the instructions inside curly braces.' },
            { type: 'formula', text: 'if (score > 90) { console.log("Great!"); }', label: 'Runs only when the condition is true' },
          ]},
          { title: 'Comparing values', blocks: [
            { type: 'concept', term: 'Comparison operators', def: 'Greater than >, less than <, at least >=, at most <=, and === for "is exactly equal to." The triple equals is needed because a single = already means "store this."' },
            { type: 'text', text: 'A comparison always produces a boolean — true or false — which is exactly what an if statement needs.' },
          ]},
          { title: 'Write your own', blocks: [
            { type: 'codelab', task: 'Set score to 95, then print "Great!" only if score is greater than 90.', starter: 'let score = 95;\nif (score > 90) {\n  console.log("Great!");\n}', expect: 'Great!', hint: 'The condition goes in parentheses, the action inside curly braces.' },
          ]},
          { title: 'Handling the other case', blocks: [
            { type: 'text', text: 'Add else to say what happens when the condition is false. The program always takes exactly one of the two paths.' },
            { type: 'codelab', task: 'Set age to 10. If age is at least 13, print "Teen". Otherwise print "Kid".', starter: 'let age = 10;\nif (age >= 13) {\n  console.log("Teen");\n} else {\n  console.log("Kid");\n}', expect: 'Kid', hint: 'Use >= for "at least," and put the backup plan inside else.' },
          ]},
        ],
        recap: [
          'if (condition) { … } runs code only when the condition is true.',
          'Comparisons use > < >= <= and === for exact equality.',
          'else provides the path taken when the condition is false.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which symbol checks if two values are exactly equal?', choices: ['===', '=', '+', '<'], answer: 0, hint: 'A single = already means "store."', explain: '=== compares for equality.' },
          { type: 'mc', prompt: 'Code that runs when the if condition is false goes in:', choices: ['else', 'again', 'end', 'stop'], answer: 0, hint: 'The backup path.', explain: 'else handles the false case.' },
          { type: 'mc', prompt: 'let age = 10; if (age >= 13) print Teen else print Kid. What prints?', choices: ['Kid', 'Teen', 'both', 'nothing'], answer: 0, hint: 'Is 10 at least 13?', explain: '10 is less than 13, so Kid.' },
          { type: 'mc', prompt: 'A comparison like score > 90 produces a:', choices: ['boolean (true or false)', 'string', 'loop', 'variable name'], answer: 0, hint: 'Only two possible results.', explain: 'It gives true or false.' },
        ],
      },
      {
        id: 'c12', tag: 'Live Code', title: 'Loops & Debugging in Code',
        subtitle: 'Day 12 · Repeating, and fixing what breaks',
        pages: [
          { title: 'The for loop', blocks: [
            { type: 'text', text: 'Day 4 promised loops save you from writing the same line over and over. Here is the real JavaScript version — the for loop, with three parts separated by semicolons: where to start, when to keep going, and how to step.' },
            { type: 'formula', text: 'for (let i = 1; i <= 5; i++) { console.log(i); }', label: 'Start at 1 · continue while i is at most 5 · add 1 each time' },
          ]},
          { title: 'Counting for yourself', blocks: [
            { type: 'text', text: 'The i++ at the end simply means "add one to i." Without a step like that, the loop would never end.' },
            { type: 'codelab', task: 'Print the numbers 1 through 5, each on its own line.', starter: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}', expect: '1\n2\n3\n4\n5', hint: 'Start i at 1 and keep going while i is less than or equal to 5.' },
          ]},
          { title: 'Debugging a real bug', blocks: [
            { type: 'text', text: 'Here is broken code. It is supposed to print 2, 4, 6, 8, 10 — the first five even numbers — but something is off. Read it carefully, find the mistake, and fix it.' },
            { type: 'codelab', task: 'Fix this loop so it prints the first five even numbers: 2, 4, 6, 8, 10', starter: 'for (let i = 1; i <= 5; i++) {\n  console.log(i * 3);\n}', expect: '2\n4\n6\n8\n10', hint: 'Check the multiplication. What number turns 1, 2, 3, 4, 5 into 2, 4, 6, 8, 10?' },
          ]},
          { title: 'The full toolkit', blocks: [
            { type: 'text', text: 'You now have every core building block: printing, variables, math, conditionals, and loops. Nearly every program ever written is these five ideas arranged cleverly.' },
            { type: 'callout', text: 'Twelve days ago a computer was a mystery box. Now you can read it, write it, run it, and fix it. That is genuinely what programmers do all day.' },
          ]},
        ],
        recap: [
          'A for loop has three parts: start, condition, and step.',
          'i++ adds one each pass so the loop eventually ends.',
          'Debugging means reading carefully and testing until output matches.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What does i++ do?', choices: ['adds 1 to i', 'doubles i', 'deletes i', 'prints i'], answer: 0, hint: 'It is the step part of the loop.', explain: 'It increases i by 1.' },
          { type: 'numeric', prompt: 'for (let i = 1; i <= 5; i++) — how many times does the loop run?', answer: 5, hint: 'From 1 up to and including 5.', explain: 'It runs 5 times.' },
          { type: 'mc', prompt: 'To print 2, 4, 6, 8, 10 from i = 1 to 5, you log:', choices: ['i * 2', 'i * 3', 'i + 5', 'i'], answer: 0, hint: 'What turns 1 into 2 and 5 into 10?', explain: 'Multiplying by 2 gives the even numbers.' },
          { type: 'tf', prompt: 'A loop with no step instruction could run forever.', answer: true, hint: 'Something must change each pass.', explain: 'Yes — it would never reach its end condition.' },
          { type: 'mc', prompt: 'The five core building blocks of programs are printing, variables, math, conditionals, and:', choices: ['loops', 'colors', 'fonts', 'mice'], answer: 0, hint: 'Repetition.', explain: 'Loops complete the toolkit.' },
        ],
      },
    ],
  },
};

const SUBJECT_ORDER = ['math', 'cs'];

/* ---- 3. PROGRESSION HELPERS ---------------------------------------------- */
const RANKS = [
  { min: 0, name: 'Cadet' }, { min: 120, name: 'Explorer' },
  { min: 300, name: 'Investigator' }, { min: 560, name: 'Scholar' },
  { min: 900, name: 'Adept' }, { min: 1320, name: 'Specialist' },
  { min: 1850, name: 'Master' }, { min: 2500, name: 'Luminary' },
];
function levelInfo(xp) {
  let i = 0;
  for (let k = 0; k < RANKS.length; k++) if (xp >= RANKS[k].min) i = k;
  const cur = RANKS[i];
  const nextAt = RANKS[i + 1] ? RANKS[i + 1].min : cur.min + 700;
  return { level: i + 1, rank: cur.name, pct: Math.min(1, (xp - cur.min) / (nextAt - cur.min)), nextAt, isMax: !RANKS[i + 1] };
}
const todayStr = () => new Date().toISOString().slice(0, 10);
function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }
const dayKey = (subj, d) => `${subj}:${d}`;
const XP_CORRECT = 10, XP_BONUS = 20;
const DEFAULT_STATE = { name: '', xp: 0, completed: {}, practice: {}, streak: { count: 0, last: null } };

/* ---- 4. APP --------------------------------------------------------------- */
export default function App() {
  const [db, setDb] = useState(null);          // { profiles: [], lastActive }
  const [activeId, setActiveId] = useState(null);
  const [demo, setDemo] = useState(null);      // ephemeral profile — never saved
  const [view, setView] = useState({ name: 'dash' });
  const firstSave = useRef(true);

  useEffect(() => {
    Store.load().then((d) => {
      const data = d && Array.isArray(d.profiles) ? d : { profiles: [], lastActive: null };
      setDb(data);
      if (data.lastActive && data.profiles.some((p) => p.id === data.lastActive)) setActiveId(data.lastActive);
    });
  }, []);
  useEffect(() => {
    if (!db) return;
    if (firstSave.current) { firstSave.current = false; return; }
    Store.save(db);
  }, [db]);

  const profile = demo || (db ? db.profiles.find((p) => p.id === activeId) : null) || null;
  const lvl = useMemo(() => levelInfo(profile ? profile.xp : 0), [profile]);

  function updateProfile(fn) {
    if (demo) { setDemo((p) => fn(p)); return; }
    setDb((d) => ({ ...d, profiles: d.profiles.map((p) => (p.id === activeId ? fn(p) : p)) }));
  }
  function createProfile(name) {
    const prof = { id: 'p' + Date.now().toString(36), ...DEFAULT_STATE, name: name.slice(0, 24) };
    setDb((d) => ({ profiles: [...d.profiles, prof], lastActive: prof.id }));
    setActiveId(prof.id); setView({ name: 'dash' });
  }
  function pickProfile(id) {
    setDb((d) => ({ ...d, lastActive: id }));
    setActiveId(id); setView({ name: 'dash' });
  }
  function startDemo() {
    setDemo({ id: 'demo', ...DEFAULT_STATE, name: 'Demo Explorer' });
    setView({ name: 'dash' });
  }
  function exitToProfiles() {
    setDemo(null); setActiveId(null); setView({ name: 'dash' });
    setDb((d) => ({ ...d, lastActive: null }));
  }

  const isDayDone = (subj, id) => !!profile.completed[dayKey(subj, id)];
  const isDayUnlocked = (subj, idx) => idx === 0 || isDayDone(subj, CURRICULUM[subj].days[idx - 1].id);
  function subjStats(subj) {
    const days = CURRICULUM[subj].days;
    const done = days.filter((d) => isDayDone(subj, d.id)).length;
    return { done, total: days.length, pct: days.length ? done / days.length : 0 };
  }
  function finishDay(subj, day, correctCount) {
    const earned = correctCount * XP_CORRECT + XP_BONUS;
    updateProfile((p) => {
      const beforeLvl = levelInfo(p.xp).level;
      const t = todayStr();
      let count = p.streak.count;
      if (p.streak.last === t) {} else if (p.streak.last === yesterday()) count += 1; else count = 1;
      const xp = p.xp + earned;
      const key = dayKey(subj, day.id);
      const prevBest = p.completed[key]?.best ?? 0;
      return {
        ...p, xp, streak: { count, last: t },
        completed: { ...p.completed, [key]: { best: Math.max(prevBest, correctCount), total: day.quiz.length } },
        _leveledTo: levelInfo(xp).level > beforeLvl ? levelInfo(xp).level : null,
      };
    });
    return earned;
  }

  function finishPractice(drillId, correctCount, bestStreak) {
    const earned = correctCount * PRACTICE_XP;
    const key = drillId || 'mixed';
    updateProfile((p) => {
      const beforeLvl = levelInfo(p.xp).level;
      const t = todayStr();
      let count = p.streak.count;
      if (p.streak.last === t) {} else if (p.streak.last === yesterday()) count += 1; else count = 1;
      const xp = p.xp + earned;
      const pr = p.practice || {};
      const prev = pr[key] || { runs: 0, bestStreak: 0 };
      return {
        ...p, xp, streak: { count, last: t },
        practice: { ...pr, [key]: { runs: prev.runs + 1, bestStreak: Math.max(prev.bestStreak, bestStreak) } },
        _leveledTo: levelInfo(xp).level > beforeLvl ? levelInfo(xp).level : null,
      };
    });
    return earned;
  }

  if (!db) return <Shell><FontAndStyle /><div style={S.loading}>Loading your quest…</div></Shell>;
  if (!profile) return (
    <Shell><FontAndStyle />
      <ProfileSelect profiles={db.profiles} onPick={pickProfile} onCreate={createProfile} onDemo={startDemo} />
    </Shell>
  );

  return (
    <Shell>
      <FontAndStyle />
      {demo && (
        <div style={S.demoBar}>
          <span>Demo mode — progress will not be saved</span>
          <button className="lq-tap" style={S.demoExit} onClick={exitToProfiles}>Exit</button>
        </div>
      )}
      {view.name === 'dash' && (
        <Dashboard lvl={lvl} state={profile} subjStats={subjStats}
          onOpen={(subj) => setView({ name: 'subject', subj })}
          onReset={() => updateProfile((p) => ({ ...p, xp: 0, completed: {}, streak: { count: 0, last: null }, _leveledTo: null }))}
          onSetName={(n) => updateProfile((p) => ({ ...p, name: n }))}
          onPractice={() => setView({ name: 'practice' })}
          onSwitch={exitToProfiles} isDemo={!!demo} />
      )}
      {view.name === 'practice' && (
        <PracticeHub profile={profile} onBack={() => setView({ name: 'dash' })}
          onStart={(drillId) => setView({ name: 'psession', drillId })} />
      )}
      {view.name === 'psession' && (
        <PracticeSession drillId={view.drillId} profile={profile}
          onExit={() => setView({ name: 'practice' })}
          onDone={(correct, bestStreak) => { const earned = finishPractice(view.drillId, correct, bestStreak); setView({ name: 'presults', correct, earned, bestStreak }); }} />
      )}
      {view.name === 'presults' && (
        <PracticeResults correct={view.correct} earned={view.earned} bestStreak={view.bestStreak}
          onContinue={() => setView({ name: 'practice' })} />
      )}
      {view.name === 'subject' && (
        <SubjectView subj={view.subj} isDayDone={isDayDone} isDayUnlocked={isDayUnlocked} stats={subjStats(view.subj)}
          onBack={() => setView({ name: 'dash' })} onDay={(day) => setView({ name: 'lesson', subj: view.subj, day })} />
      )}
      {view.name === 'lesson' && (
        <LessonView subj={view.subj} day={view.day} userName={profile.name}
          onBack={() => setView({ name: 'subject', subj: view.subj })}
          onStart={() => setView({ name: 'quiz', subj: view.subj, day: view.day })} />
      )}
      {view.name === 'quiz' && (
        <QuizView subj={view.subj} day={view.day}
          onExit={() => setView({ name: 'subject', subj: view.subj })}
          onDone={(correct) => { const earned = finishDay(view.subj, view.day, correct); setView({ name: 'results', subj: view.subj, day: view.day, correct, earned }); }} />
      )}
      {view.name === 'results' && (
        <ResultsView subj={view.subj} day={view.day} correct={view.correct} earned={view.earned} userName={profile.name}
          leveledTo={profile._leveledTo} onContinue={() => setView({ name: 'subject', subj: view.subj })} />
      )}
    </Shell>
  );
}

/* ---- 5. SHELL & STYLE ------------------------------------------------------ */
function Shell({ children }) { return <div style={S.bg}><div style={S.col}>{children}</div></div>; }
function FontAndStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..600&family=JetBrains+Mono:wght@500..700&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      @keyframes fadeUp { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:none;} }
      @keyframes pop { 0%{transform:scale(.8);opacity:0;} 60%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
      @keyframes flicker { 0%,100%{ transform: scale(1) rotate(-2deg);} 50%{ transform: scale(1.12) rotate(2deg);} }
      @keyframes glow { 0%,100%{ box-shadow:0 0 0 0 rgba(246,183,60,0);} 50%{ box-shadow:0 0 28px 2px rgba(246,183,60,.35);} }
      @keyframes drift { 0%{transform:translate(0,0);} 25%{transform:translate(3px,-2px);} 50%{transform:translate(-2px,3px);} 75%{transform:translate(2px,2px);} 100%{transform:translate(0,0);} }
      @keyframes orbitSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      .lq-rise { animation: fadeUp .5s cubic-bezier(.2,.7,.2,1) both; }
      .lq-tap { transition: transform .12s ease, filter .15s ease, background .15s ease; cursor:pointer; }
      .lq-tap:active { transform: scale(.97); }
      .lq-card:hover { transform: translateY(-2px); }
      input::placeholder { color:#5b6275; }
    `}</style>
  );
}

/* ---- 6. SVG VISUALS --------------------------------------------------------- */
function Visual({ v, accent }) {
  const wrap = (children, h = 150) => (
    <div style={S.vizBox}><svg viewBox={`0 0 320 ${h}`} width="100%" style={{ display: 'block' }}>{children}</svg></div>
  );
  if (v.kind === 'bars') {
    const unit = 30, y1 = v.scaled ? 28 : 44, y2 = v.scaled ? 88 : 96;
    const Row = ({ y, n, color, label, max }) => (
      <g>
        {Array.from({ length: n }).map((_, i) => (
          <rect key={i} x={14 + i * (unit + 4)} y={y} width={unit} height={26} rx={6} fill={color} opacity={.9} />
        ))}
        <text x={14} y={y - 8} fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{label}</text>
      </g>
    );
    if (v.scaled) return wrap(<>
      <Row y={y1} n={Math.min(v.a, 8)} color={accent} label={v.labelA} />
      <Row y={y2} n={Math.min(v.a2, 8)} color={accent + '88'} label={`${v.labelB} — same ratio, scaled up`} />
    </>, 130);
    return wrap(<>
      <Row y={y1} n={v.a} color={accent} label={v.labelA} />
      <Row y={y2} n={v.b} color="#5aa9ff" label={v.labelB} />
    </>, 140);
  }
  if (v.kind === 'scale') return wrap(<>
    <line x1="160" y1="34" x2="160" y2="96" stroke="#3a4154" strokeWidth="6" strokeLinecap="round" />
    <rect x="118" y="96" width="84" height="10" rx="5" fill="#3a4154" />
    <line x1="60" y1="40" x2="260" y2="40" stroke="#8b91a3" strokeWidth="5" strokeLinecap="round" />
    <line x1="78" y1="40" x2="78" y2="56" stroke="#8b91a3" strokeWidth="3" />
    <line x1="242" y1="40" x2="242" y2="56" stroke="#8b91a3" strokeWidth="3" />
    <rect x="36" y="56" width="84" height="30" rx="9" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
    <text x="78" y="76" textAnchor="middle" fill={accent} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.left}</text>
    <rect x="200" y="56" width="84" height="30" rx="9" fill="#5aa9ff33" stroke="#5aa9ff" strokeWidth="1.5" />
    <text x="242" y="76" textAnchor="middle" fill="#5aa9ff" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.right}</text>
    <text x="160" y="128" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">balanced — both sides equal</text>
  </>, 140);
  if (v.kind === 'atom') {
    const shells = [[2, 30], [4, 56]];
    return wrap(<>
      <circle cx="160" cy="74" r="14" fill={accent} opacity=".9" />
      <text x="160" y="78" textAnchor="middle" fill="#0c0e16" fontSize="10" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.protons}p</text>
      {shells.map(([n, r], si) => (
        <g key={si}>
          <circle cx="160" cy="74" r={r} fill="none" stroke="#3a4154" strokeWidth="1.5" strokeDasharray="3 4" />
          {Array.from({ length: n }).map((_, i) => {
            const a = (i / n) * Math.PI * 2 + si;
            return <circle key={i} cx={160 + r * Math.cos(a)} cy={74 + r * Math.sin(a)} r="5" fill="#5aa9ff" style={{ animation: `drift ${3 + si}s ease-in-out infinite` }} />;
          })}
        </g>
      ))}
      <text x="160" y="146" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">carbon: 6 protons · electrons in shells</text>
    </>, 156);
  }
  if (v.kind === 'particles') {
    const Box = ({ x, label, dots }) => (
      <g>
        <rect x={x} y="22" width="88" height="78" rx="10" fill="#161a28" stroke="#2a2f3d" />
        {dots}
        <text x={x + 44} y="120" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{label}</text>
      </g>
    );
    const grid = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(<circle key={`s${r}${c}`} cx={26 + c * 24} cy={40 + r * 24} r="6" fill={accent} />);
    const liq = [[36, 78], [58, 84], [80, 76], [44, 58], [70, 60], [58, 40]].map(([x, y], i) => <circle key={`l${i}`} cx={x + 102} cy={y} r="6" fill={accent} style={{ animation: `drift ${2.4 + i * .3}s ease-in-out infinite` }} />);
    const gas = [[228, 36], [262, 52], [240, 78], [286, 34], [292, 86], [256, 92]].map(([x, y], i) => <circle key={`g${i}`} cx={x} cy={y} r="5" fill={accent} opacity=".85" style={{ animation: `drift ${1.2 + i * .2}s ease-in-out infinite` }} />);
    return wrap(<>
      <Box x={12} label="solid" dots={grid} />
      <Box x={114} label="liquid" dots={liq} />
      <Box x={216} label="gas" dots={gas} />
    </>, 134);
  }
  if (v.kind === 'graph') {
    const pts = [[0, 1], [1, 3], [2, 5]];
    const px = (x) => 60 + x * 84, py = (y) => 124 - y * 17;
    return wrap(<>
      <line x1="48" y1="124" x2="300" y2="124" stroke="#3a4154" strokeWidth="2" />
      <line x1="60" y1="18" x2="60" y2="136" stroke="#3a4154" strokeWidth="2" />
      <line x1={px(-0.1)} y1={py(0.8)} x2={px(2.6)} y2={py(6.2)} stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={px(x)} cy={py(y)} r="6" fill={accent} stroke="#0c0e16" strokeWidth="2" />
          <text x={px(x) + 11} y={py(y) - 7} fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">({x},{y})</text>
        </g>
      ))}
      <text x="174" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{v.label} — every input lands on the line</text>
    </>, 156);
  }
  if (v.kind === 'rtriangle') return wrap(<>
    <polygon points="62,118 62,42 256,118" fill={accent + '22'} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <rect x="62" y="102" width="16" height="16" fill="none" stroke={accent} strokeWidth="1.5" />
    <text x="46" y="84" fill="#8b91a3" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">a</text>
    <text x="150" y="134" fill="#8b91a3" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">b</text>
    <text x="166" y="74" fill={accent} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">c</text>
    <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">a² + b² = c²</text>
  </>, 156);
  if (v.kind === 'parabola') {
    const pts = [-3, -2, -1, 0, 1, 2, 3].map((x) => [160 + x * 38, 122 - x * x * 11]);
    const d = pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
    return wrap(<>
      <line x1="34" y1="122" x2="286" y2="122" stroke="#3a4154" strokeWidth="2" />
      <line x1="160" y1="14" x2="160" y2="134" stroke="#3a4154" strokeWidth="2" />
      <path d={d} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="160" cy="122" r="5" fill={accent} stroke="#0c0e16" strokeWidth="2" />
      <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">y = x² — a parabola, not a line</text>
    </>, 156);
  }
  if (v.kind === 'branches') {
    const Box = (x, label, sub) => (
      <g>
        <rect x={x} y="72" width="80" height="36" rx="8" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
        <text x={x + 40} y="89" textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{label}</text>
        <text x={x + 40} y="102" textAnchor="middle" fill="#8b91a3" fontSize="8.5" fontFamily="JetBrains Mono, monospace">{sub}</text>
      </g>
    );
    return wrap(<>
      <rect x="118" y="14" width="84" height="30" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
      <text x="160" y="33" textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">GOVERNMENT</text>
      <line x1="160" y1="44" x2="160" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1="50" y1="56" x2="270" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1="50" y1="56" x2="50" y2="72" stroke="#3a4154" strokeWidth="2" />
      <line x1="160" y1="56" x2="160" y2="72" stroke="#3a4154" strokeWidth="2" />
      <line x1="270" y1="56" x2="270" y2="72" stroke="#3a4154" strokeWidth="2" />
      {Box(10, 'LEGIS.', 'makes laws')}
      {Box(120, 'EXEC.', 'enforces')}
      {Box(230, 'JUDIC.', 'interprets')}
    </>, 124);
  }
  if (v.kind === 'flow') return wrap(<>
    <ellipse cx="58" cy="38" rx="38" ry="17" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
    <text x="58" y="42" textAnchor="middle" fill={accent} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">START</text>
    <line x1="58" y1="55" x2="58" y2="72" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)" />
    <rect x="20" y="72" width="76" height="30" rx="6" fill="#161a28" stroke={accent} strokeWidth="1.5" />
    <text x="58" y="91" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">do a step</text>
    <line x1="96" y1="87" x2="148" y2="87" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)" />
    <polygon points="200,66 242,87 200,108 158,87" fill={accent + '18'} stroke={accent} strokeWidth="1.5" />
    <text x="200" y="90" textAnchor="middle" fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">done?</text>
    <text x="250" y="90" fill="#3ddc97" fontSize="10" fontFamily="JetBrains Mono, monospace">yes</text>
    <text x="200" y="128" textAnchor="middle" fill="#8b91a3" fontSize="9.5" fontFamily="JetBrains Mono, monospace">no → loop back</text>
    <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker></defs>
  </>, 138);
  if (v.kind === 'supplydemand') return wrap(<>
    <line x1="52" y1="120" x2="290" y2="120" stroke="#3a4154" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="130" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="116" x2="268" y2="34" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="72" y1="34" x2="268" y2="116" stroke="#5aa9ff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="170" cy="75" r="6" fill="#fff" stroke="#0c0e16" strokeWidth="1.5" />
    <text x="240" y="30" fill={accent} fontSize="10" fontFamily="JetBrains Mono, monospace">supply</text>
    <text x="232" y="128" fill="#5aa9ff" fontSize="10" fontFamily="JetBrains Mono, monospace">demand</text>
    <text x="160" y="150" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">they cross at the equilibrium price</text>
  </>, 158);
  if (v.kind === 'strata') {
    const layers = [['#d3ab78', 30], ['#bf9568', 56], ['#a37f58', 82], ['#876a4c', 108]];
    return wrap(<>
      {layers.map(([c, y], i) => <rect key={i} x="40" y={y} width="240" height="24" fill={c} stroke="#0c0e16" strokeWidth="1" />)}
      <circle cx="118" cy="120" r="6" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
      <text x="134" y="124" fill="#1a1208" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">older</text>
      <circle cx="210" cy="42" r="5" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
      <text x="224" y="46" fill="#1a1208" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">younger</text>
      <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">deeper = older (law of superposition)</text>
    </>, 156);
  }
  if (v.kind === 'machine') return wrap(<>
    <rect x="104" y="34" width="112" height="64" rx="14" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
    <text x="160" y="60" textAnchor="middle" fill={accent} fontSize="13" fontWeight="800" fontFamily="JetBrains Mono, monospace">RULE</text>
    <text x="160" y="82" textAnchor="middle" fill="#e7e9f0" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.rule}</text>
    <text x="46" y="72" textAnchor="middle" fill="#5aa9ff" fontSize="20" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.inn}</text>
    <text x="276" y="72" textAnchor="middle" fill="#3ddc97" fontSize="20" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.out}</text>
    <path d={v.reverse ? 'M212 110 H 108' : 'M66 66 H 100'} stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#arr)" fill="none" />
    <path d={v.reverse ? 'M104 110 H 96' : 'M220 66 H 254'} stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#arr)" fill="none" opacity={v.reverse ? 0 : 1} />
    {v.reverse && <text x="160" y="128" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">run it backward: undo the rule</text>}
    <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker></defs>
  </>, v.reverse ? 140 : 120);
  if (v.kind === 'orbit') return wrap(<>
    <circle cx="160" cy="78" r="22" fill="#f6b73c" opacity=".95" />
    <circle cx="160" cy="78" r="30" fill="#f6b73c" opacity=".15" />
    <ellipse cx="160" cy="78" rx="120" ry="52" fill="none" stroke="#3a4154" strokeWidth="1.5" strokeDasharray="4 5" />
    <g style={{ transformOrigin: '160px 78px', animation: 'orbitSpin 14s linear infinite' }}>
      <g>
        <circle cx="280" cy="78" r="10" fill="#5aa9ff" />
        <circle cx="280" cy="78" r="10" fill="none" stroke="#5aa9ff55" strokeWidth="4" />
      </g>
    </g>
    <text x="160" y="144" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">one lap = one year · one spin = one day</text>
  </>, 152);
  if (v.kind === 'gravity') return wrap(<>
    <circle cx="92" cy="70" r="30" fill={accent} opacity=".9" />
    <circle cx="236" cy="70" r="15" fill="#5aa9ff" />
    <path d="M130 70 H 174" stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#ar2)" fill="none" />
    <path d="M214 70 H 196" stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#ar3)" fill="none" />
    <text x="92" y="116" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">more mass = bigger pull</text>
    <text x="236" y="116" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">pulled too</text>
    <defs>
      <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker>
      <marker id="ar3" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto-start-reverse"><path d="M8,0 L0,4 L8,8 z" fill="#8b91a3" /></marker>
    </defs>
  </>, 130);
  return null;
}

/* ---- 7. PROFILE SELECT ------------------------------------------------------ */
function ProfileSelect({ profiles, onPick, onCreate, onDemo }) {
  const [creating, setCreating] = useState(profiles.length === 0);
  const [v, setV] = useState('');
  const go = () => { const n = v.trim(); if (n) onCreate(n); };
  const AV_COLORS = ['#f6b73c', '#3ddc97', '#ff6b6b', '#5aa9ff', '#c792ea', '#ffb86c'];
  return (
    <div style={{ paddingTop: 40 }}>
      <div style={{ textAlign: 'center' }}>
        <div className="lq-rise" style={{ ...S.medal, background: '#f6b73c22', border: '2px solid #f6b73c', margin: '0 auto', animation: 'pop .5s both' }}>
          <Rocket size={38} color="#f6b73c" />
        </div>
        <div className="lq-rise" style={{ ...S.eyebrow, marginTop: 20, animationDelay: '.06s' }}>Learning Quest</div>
        <h1 className="lq-rise" style={{ ...S.h1, fontSize: 30, animationDelay: '.1s' }}>
          {profiles.length ? 'Who’s exploring today?' : 'Ready to explore?'}
        </h1>
      </div>

      {!creating ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          {profiles.map((p, i) => {
            const pl = levelInfo(p.xp), c = AV_COLORS[i % AV_COLORS.length];
            return (
              <button key={p.id} className="lq-rise lq-tap lq-card" style={{ ...S.profileCard, animationDelay: `${.14 + i * .05}s` }} onClick={() => onPick(p.id)}>
                <div style={{ ...S.avatar, background: c + '22', border: `1.5px solid ${c}`, color: c }}>{p.name.slice(0, 1).toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={S.subjName}>{p.name}</div>
                  <div style={S.muted}>Level {pl.level} {pl.rank} · {p.xp} XP</div>
                </div>
                <ChevronRight size={18} color="#5b6275" />
              </button>
            );
          })}
          <button className="lq-rise lq-tap" style={{ ...S.profileCard, justifyContent: 'center', borderStyle: 'dashed', animationDelay: `${.14 + profiles.length * .05}s` }} onClick={() => setCreating(true)}>
            <span style={{ ...S.subjName, color: '#8b91a3' }}>+ New explorer</span>
          </button>
        </div>
      ) : (
        <div className="lq-rise" style={{ textAlign: 'center', marginTop: 24, animationDelay: '.14s' }}>
          <p style={{ ...S.muted, maxWidth: 340, margin: '0 auto 18px' }}>What should we call this explorer?</p>
          <input style={{ ...S.numInput, marginTop: 0, textAlign: 'center', borderColor: '#f6b73c88', fontFamily: "'Bricolage Grotesque', sans-serif" }}
            value={v} maxLength={24} placeholder="Type a name"
            onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && go()} autoFocus />
          <button className="lq-tap" style={{ ...S.primaryBtn, background: '#f6b73c', marginTop: 16, opacity: v.trim() ? 1 : .5 }} onClick={go} disabled={!v.trim()}>
            Begin <ChevronRight size={18} />
          </button>
          {profiles.length > 0 && (
            <button className="lq-tap" style={{ ...S.ghostBtn, marginTop: 12 }} onClick={() => { setCreating(false); setV(''); }}>Back to explorers</button>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 26 }}>
        <button className="lq-tap" style={S.ghostBtn} onClick={onDemo}><Eye size={13} /> Try demo mode</button>
        <div style={{ ...S.muted, fontSize: 12, marginTop: 8 }}>Demo lets visitors play without touching anyone’s progress.</div>
      </div>
    </div>
  );
}

/* ---- 8. DASHBOARD ------------------------------------------------------------ */
function Dashboard({ lvl, state, subjStats, onOpen, onPractice, onReset, onSetName, onSwitch, isDemo }) {
  const [confirm, setConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nameVal, setNameVal] = useState(state.name);
  const totalDone = SUBJECT_ORDER.reduce((n, s) => n + subjStats(s).done, 0);
  const totalDays = SUBJECT_ORDER.reduce((n, s) => n + subjStats(s).total, 0);
  return (
    <div>
      <div className="lq-rise" style={{ animationDelay: '.02s' }}>
        <div style={S.eyebrow}>Mission Control</div>
        <h1 style={S.h1}>Welcome back, {state.name}.</h1>
        <div style={S.muted}>{totalDone} of {totalDays} missions complete</div>
      </div>

      <div className="lq-rise" style={{ ...S.heroCard, animationDelay: '.06s' }}>
        <div style={S.heroTop}>
          <div>
            <div style={S.rankRow}><Trophy size={15} color="#f6b73c" /><span style={S.rankName}>{lvl.rank}</span></div>
            <div style={S.lvlBig}>Level {lvl.level}</div>
          </div>
          <Streak count={state.streak.count} />
        </div>
        <Bar pct={lvl.pct} accent="#f6b73c" />
        <div style={S.barLabel}>
          <span style={S.mono}>{state.xp} XP</span>
          <span style={S.muted}>{lvl.isMax ? 'Max rank reached' : `${lvl.nextAt - state.xp} XP to level ${lvl.level + 1}`}</span>
        </div>
      </div>

      <div style={S.sectionLabel}>Your Subjects</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SUBJECT_ORDER.map((id, i) => {
          const s = CURRICULUM[id], st = subjStats(id), Icon = s.icon;
          return (
            <div key={id} className="lq-rise lq-tap lq-card" style={{ ...S.subjCard, animationDelay: `${.1 + i * .05}s` }} onClick={() => onOpen(id)}>
              <div style={{ ...S.subjIcon, background: s.accent + '22', border: `1px solid ${s.accent}55` }}><Icon size={22} color={s.accent} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={S.subjName}>{s.name}</div>
                <div style={S.subjBlurb}>{s.blurb}</div>
                <div style={{ marginTop: 8 }}><Bar pct={st.pct} accent={s.accent} thin /></div>
              </div>
              <div style={S.subjMeta}><span style={{ ...S.mono, color: s.accent }}>{st.done}/{st.total}</span><ChevronRight size={18} color="#5b6275" /></div>
            </div>
          );
        })}
      </div>

      <div style={S.sectionLabel}>Practice Range</div>
      <div className="lq-rise lq-tap lq-card" style={{ ...S.subjCard, borderColor: '#f6b73c55' }} onClick={onPractice}>
        <div style={{ ...S.subjIcon, background: '#f6b73c22', border: '1px solid #f6b73c55' }}><Target size={22} color="#f6b73c" /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={S.subjName}>Skill Drills</div>
          <div style={S.subjBlurb}>Endless fresh practice questions from every math skill you have unlocked.</div>
        </div>
        <ChevronRight size={18} color="#5b6275" />
      </div>

      <div style={{ marginTop: 22, textAlign: 'center' }}>
        {editing ? (
          <div style={S.confirmRow}>
            <input style={S.miniInput} value={nameVal} maxLength={24} onChange={(e) => setNameVal(e.target.value)} />
            <button className="lq-tap" style={S.ghostBtn} onClick={() => { if (nameVal.trim()) onSetName(nameVal.trim().slice(0, 24)); setEditing(false); }}>Save</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => { setNameVal(state.name); setEditing(false); }}>Cancel</button>
          </div>
        ) : !confirm ? (
          <div style={S.confirmRow}>
            <button className="lq-tap" style={S.ghostBtn} onClick={onSwitch}><Users size={13} /> Switch explorer</button>
            {!isDemo && <button className="lq-tap" style={S.ghostBtn} onClick={() => setEditing(true)}>Change name</button>}
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setConfirm(true)}><RotateCcw size={13} /> Reset progress</button>
          </div>
        ) : (
          <div style={S.confirmRow}>
            <span style={S.muted}>Erase all progress?</span>
            <button className="lq-tap" style={S.dangerBtn} onClick={() => { onReset(); setConfirm(false); }}>Yes, reset</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- 9. SUBJECT VIEW ----------------------------------------------------------- */
function SubjectView({ subj, isDayDone, isDayUnlocked, stats, onBack, onDay }) {
  const s = CURRICULUM[subj], Icon = s.icon;
  return (
    <div>
      <BackBar onBack={onBack} />
      <div className="lq-rise" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <div style={{ ...S.subjIcon, background: s.accent + '22', border: `1px solid ${s.accent}55` }}><Icon size={22} color={s.accent} /></div>
        <div>
          <h1 style={{ ...S.h1, margin: 0, fontSize: 26 }}>{s.name}</h1>
          <div style={S.subjBlurb}>{stats.done} of {stats.total} days complete</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {s.days.map((d, i) => {
          const done = isDayDone(subj, d.id), open = isDayUnlocked(subj, i);
          return (
            <div key={d.id} className={`lq-rise ${open ? 'lq-tap lq-card' : ''}`}
              style={{ ...S.dayCard, animationDelay: `${i * .06}s`, opacity: open ? 1 : .55, cursor: open ? 'pointer' : 'default' }}
              onClick={() => open && onDay(d)}>
              <div style={{ ...S.dayNode, borderColor: done ? s.accent : open ? '#3a4154' : '#2a2f3d', background: done ? s.accent : 'transparent' }}>
                {done ? <Check size={16} color="#0c0e16" /> : open ? <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}</span> : <Lock size={13} color="#5b6275" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={S.daySub}>{d.subtitle}</span>
                  {d.tag && <span style={{ ...S.tag, color: s.accent, borderColor: s.accent + '55', background: s.accent + '14' }}>{d.tag}</span>}
                </div>
                <div style={S.dayTitle}>{d.title}</div>
              </div>
              {open && <ChevronRight size={18} color="#5b6275" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- 10. LESSON VIEW (paged) ------------------------------------------------------ */
function LessonView({ subj, day, userName, onBack, onStart }) {
  const accent = CURRICULUM[subj].accent;
  const [page, setPage] = useState(0);
  const totalPages = day.pages.length + 1; // + recap
  const isRecap = page === day.pages.length;
  const cur = isRecap ? null : day.pages[page];
  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onBack}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <div key={i} style={{ width: i === page ? 22 : 8, height: 8, borderRadius: 99, background: i <= page ? accent : '#2a2f3d', transition: 'all .3s ease' }} />
          ))}
        </div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{page + 1}/{totalPages}</span>
      </div>

      {!isRecap ? (
        <div key={page} className="lq-rise" style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ ...S.eyebrow, color: accent, margin: 0 }}>{day.subtitle}</div>
            {day.tag && <span style={{ ...S.tag, color: accent, borderColor: accent + '55', background: accent + '14' }}>{day.tag}</span>}
          </div>
          <h1 style={{ ...S.h1, marginTop: 6, fontSize: 26 }}>{page === 0 ? day.title : cur.title}</h1>
          {page === 0 && <div style={{ ...S.muted, marginBottom: 4 }}>{cur.title}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
            {cur.blocks.map((b, i) => <Block key={i} b={b} accent={accent} delay={i * .06} />)}
          </div>
        </div>
      ) : (
        <div key="recap" className="lq-rise" style={{ marginTop: 22 }}>
          <div style={{ ...S.eyebrow, color: accent }}>Checkpoint</div>
          <h1 style={{ ...S.h1, fontSize: 26 }}>You can now…</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {day.recap.map((r, i) => (
              <div key={i} className="lq-rise" style={{ ...S.recapItem, animationDelay: `${i * .08}s` }}>
                <div style={{ ...S.recapCheck, background: accent + '22', border: `1.5px solid ${accent}` }}><Check size={13} color={accent} /></div>
                <div style={S.body}>{r}</div>
              </div>
            ))}
          </div>
          <div className="lq-rise" style={{ ...S.callout, marginTop: 16, animationDelay: '.3s' }}>
            <Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={S.body}>You’ve got everything you need, {userName}. Hints are there if you want them — using one is smart, not cheating.</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        {page > 0 && (
          <button className="lq-tap" style={{ ...S.secondaryBtn }} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={17} /> Back
          </button>
        )}
        {!isRecap ? (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1 }} onClick={() => setPage(page + 1)}>
            {page === 0 ? <><BookOpen size={17} /> Let’s go</> : <>Next <ChevronRight size={17} /></>}
          </button>
        ) : (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1 }} onClick={onStart}>
            <Target size={17} /> Start Challenge · {day.quiz.length} questions
          </button>
        )}
      </div>
    </div>
  );
}
function Block({ b, accent, delay }) {
  const base = { animationDelay: `${delay}s` };
  if (b.type === 'text') return <p className="lq-rise" style={{ ...S.body, ...base }}>{b.text}</p>;
  if (b.type === 'concept') return (
    <div className="lq-rise" style={{ ...S.concept, borderColor: accent + '66', ...base }}>
      <div style={{ ...S.conceptTerm, color: accent }}>{b.term}</div><div style={S.body}>{b.def}</div>
    </div>
  );
  if (b.type === 'example') return (
    <div className="lq-rise" style={{ ...S.example, ...base }}><span style={S.exTag}>EXAMPLE</span><div style={{ ...S.body, marginTop: 6 }}>{b.text}</div></div>
  );
  if (b.type === 'callout') return (
    <div className="lq-rise" style={{ ...S.callout, ...base }}><Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} /><div style={S.body}>{b.text}</div></div>
  );
  if (b.type === 'formula') return (
    <div className="lq-rise" style={{ ...S.formula, borderColor: accent + '55', ...base }}>
      <div style={{ ...S.formulaText, color: accent }}>{b.text}</div>
      {b.label && <div style={{ ...S.muted, marginTop: 6, textAlign: 'center' }}>{b.label}</div>}
    </div>
  );
  if (b.type === 'visual') return <div className="lq-rise" style={base}><Visual v={b} accent={accent} /></div>;
  if (b.type === 'codelab') return <CodeLab b={b} accent={accent} />;
  return null;
}

/* ---- 11. QUIZ VIEW (with penalty-free hints) -------------------------------------- */
function QuizView({ subj, day, onExit, onDone }) {
  const accent = CURRICULUM[subj].accent;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [num, setNum] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const q = day.quiz[i];
  const checkCorrect = () => q.type === 'numeric' ? Math.abs(parseFloat(num) - q.answer) < 1e-9 : picked === q.answer;
  function submit() {
    if (revealed) return;
    if (q.type === 'numeric' && num.trim() === '') return;
    if (q.type !== 'numeric' && picked === null) return;
    if (checkCorrect()) setCorrectCount((c) => c + 1);
    setRevealed(true);
  }
  function next() {
    if (i + 1 >= day.quiz.length) { onDone(correctCount); return; }
    setI(i + 1); setPicked(null); setNum(''); setRevealed(false); setShowHint(false);
  }
  const ok = revealed && checkCorrect();
  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1 }}><Bar pct={(i + (revealed ? 1 : 0)) / day.quiz.length} accent={accent} thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}/{day.quiz.length}</span>
      </div>
      <div key={i} className="lq-rise" style={{ marginTop: 26 }}>
        <div style={{ ...S.eyebrow, color: accent }}>Question {i + 1}</div>
        <h2 style={S.qPrompt}>{q.prompt}</h2>

        {q.type === 'mc' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
            {q.choices.map((c, idx) => {
              const isPick = picked === idx, isAns = idx === q.answer;
              let bd = '#2a2f3d', bg = '#161a28';
              if (revealed && isAns) { bd = '#3ddc97'; bg = '#3ddc9722'; }
              else if (revealed && isPick && !isAns) { bd = '#ff6b6b'; bg = '#ff6b6b22'; }
              else if (isPick) { bd = accent; bg = accent + '1f'; }
              return <button key={idx} className="lq-tap" disabled={revealed} style={{ ...S.choice, borderColor: bd, background: bg }} onClick={() => setPicked(idx)}>{c}</button>;
            })}
          </div>
        )}

        {q.type === 'tf' && (
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            {[{ v: true, t: 'True' }, { v: false, t: 'False' }].map((o) => {
              const isPick = picked === o.v, isAns = o.v === q.answer;
              let bd = '#2a2f3d', bg = '#161a28';
              if (revealed && isAns) { bd = '#3ddc97'; bg = '#3ddc9722'; }
              else if (revealed && isPick && !isAns) { bd = '#ff6b6b'; bg = '#ff6b6b22'; }
              else if (isPick) { bd = accent; bg = accent + '1f'; }
              return <button key={o.t} className="lq-tap" disabled={revealed} style={{ ...S.choice, flex: 1, textAlign: 'center', borderColor: bd, background: bg }} onClick={() => setPicked(o.v)}>{o.t}</button>;
            })}
          </div>
        )}

        {q.type === 'numeric' && (
          <input type="number" inputMode="decimal" value={num} disabled={revealed}
            onChange={(e) => setNum(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Type your answer"
            style={{ ...S.numInput, borderColor: revealed ? (ok ? '#3ddc97' : '#ff6b6b') : accent + '88' }} />
        )}

        {q.hint && !revealed && (
          !showHint ? (
            <button className="lq-tap" style={{ ...S.hintBtn }} onClick={() => setShowHint(true)}>
              <HelpCircle size={14} /> Show a hint
            </button>
          ) : (
            <div className="lq-rise" style={S.hintBox}>
              <HelpCircle size={15} color="#5aa9ff" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ ...S.body, fontSize: 14.5 }}>{q.hint}</div>
            </div>
          )
        )}

        {revealed && (
          <div className="lq-rise" style={{ ...S.feedback, borderColor: ok ? '#3ddc9766' : '#ff6b6b66', background: ok ? '#3ddc9714' : '#ff6b6b14' }}>
            <div style={{ ...S.fbTitle, color: ok ? '#3ddc97' : '#ff6b6b' }}>{ok ? <><Check size={16} /> Correct! +{XP_CORRECT} XP</> : <>Not quite — good try</>}</div>
            <div style={{ ...S.body, marginTop: 4 }}>{q.explain}</div>
          </div>
        )}
      </div>
      <button className="lq-tap" style={{ ...S.primaryBtn, background: revealed ? accent : '#2a2f3d', color: revealed ? '#0c0e16' : '#e7e9f0', marginTop: 22 }}
        onClick={revealed ? next : submit}>
        {revealed ? (i + 1 >= day.quiz.length ? 'Finish' : 'Next question') : 'Check answer'}
      </button>
    </div>
  );
}

/* ---- 12. RESULTS VIEW -------------------------------------------------------------- */
function ResultsView({ subj, day, correct, earned, leveledTo, userName, onContinue }) {
  const accent = CURRICULUM[subj].accent;
  const total = day.quiz.length, perfect = correct === total;
  const msg = perfect ? 'Flawless!' : correct >= total - 1 ? 'So close to perfect!' : 'Day complete!';
  return (
    <div style={{ textAlign: 'center', paddingTop: 16 }}>
      <div className="lq-rise" style={{ display: 'inline-block' }}>
        <div style={{ ...S.medal, background: accent + '22', border: `2px solid ${accent}`, animation: 'pop .5s both', margin: '0 auto' }}>
          {perfect ? <Trophy size={40} color={accent} /> : <Star size={40} color={accent} />}
        </div>
      </div>
      <h1 className="lq-rise" style={{ ...S.h1, marginTop: 18, animationDelay: '.1s' }}>{msg}</h1>
      <p className="lq-rise" style={{ ...S.muted, animationDelay: '.14s' }}>
        {correct} of {total} correct{perfect ? ` — outstanding, ${userName}!` : ` — every one you missed is now one you know, ${userName}.`}
      </p>
      <div className="lq-rise" style={{ ...S.xpBadge, animationDelay: '.2s' }}><Zap size={18} color="#f6b73c" /> <span style={{ ...S.mono, fontSize: 20 }}>+{earned} XP</span></div>
      {leveledTo && <div className="lq-rise" style={{ ...S.levelUp, animationDelay: '.28s' }}><Sparkles size={16} color="#f6b73c" /> Level up! You reached Level {leveledTo}</div>}
      <div><button className="lq-tap" style={{ ...S.primaryBtn, background: accent, marginTop: 26, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }} onClick={onContinue}>Continue <ChevronRight size={18} /></button></div>
    </div>
  );
}

/* ---- 13. SMALL PIECES ---------------------------------------------------------------- */
function Bar({ pct, accent, thin }) {
  return (
    <div style={{ ...S.track, height: thin ? 6 : 9 }}>
      <div style={{ width: `${Math.round(pct * 100)}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${accent}cc, ${accent})`, transition: 'width .6s cubic-bezier(.2,.7,.2,1)' }} />
    </div>
  );
}
function Streak({ count }) {
  return (
    <div style={S.streak}>
      <Flame size={20} color={count > 0 ? '#ff8a3d' : '#4a505f'} style={count > 0 ? { animation: 'flicker 1.4s ease-in-out infinite' } : {}} />
      <div><div style={{ ...S.mono, fontSize: 18, lineHeight: 1, color: count > 0 ? '#ffb37a' : '#6b7281' }}>{count}</div><div style={S.streakLbl}>day streak</div></div>
    </div>
  );
}
function BackBar({ onBack }) { return <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack}><ArrowLeft size={18} color="#aeb4c4" /></button>; }

/* ---- 14. STYLES ------------------------------------------------------------------------ */
/* ---- CODE LAB: live JavaScript runner ------------------------------------- */
function CodeLab({ b, accent }) {
  const [src, setSrc] = useState(b.starter || '');
  const [out, setOut] = useState(null);
  const [showHint, setShowHint] = useState(false);
  function run() {
    if (/\bwhile\b|\bdo\s*\{/.test(src)) {
      setOut({ logs: [], error: 'Let’s stick to for loops here — they always finish on their own.', pass: false });
      return;
    }
    const logs = [];
    let error = null;
    const fake = { log: (...a) => {
      if (logs.length >= 200) throw new Error('Too much output — is your loop ending?');
      logs.push(a.map((x) => (typeof x === 'object' && x !== null ? JSON.stringify(x) : String(x))).join(' '));
    } };
    try { new Function('console', src)(fake); } catch (e) { error = e.message; }
    const got = logs.join('\n').trim();
    setOut({ logs, error, pass: !error && got === String(b.expect).trim() });
  }
  return (
    <div className="lq-rise" style={S.labBox}>
      <div style={S.labTask}><Terminal size={14} color={accent} /><span>{b.task}</span></div>
      <textarea spellCheck={false} value={src} onChange={(e) => { setSrc(e.target.value); setOut(null); }}
        rows={Math.max(3, src.split('\n').length + 1)} style={{ ...S.labEditor, borderColor: accent + '55' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1, minWidth: 120, marginTop: 0, padding: '11px 14px', fontSize: 14 }} onClick={run}>
          <Play size={15} /> Run code
        </button>
        <button className="lq-tap" style={S.ghostBtn} onClick={() => { setSrc(b.starter || ''); setOut(null); }}>
          <RotateCcw size={13} /> Reset
        </button>
        {b.hint && <button className="lq-tap" style={S.ghostBtn} onClick={() => setShowHint(true)}>Hint</button>}
      </div>
      {showHint && b.hint && <div style={{ ...S.hintBox, marginTop: 10 }}>{b.hint}</div>}
      {out && (
        <div style={S.labOut}>
          <div style={S.labOutLbl}>OUTPUT</div>
          {out.error
            ? <div style={{ ...S.labLine, color: '#ff8b8b' }}>{out.error}</div>
            : out.logs.length === 0
              ? <div style={{ ...S.labLine, color: '#5b6275' }}>(nothing printed yet)</div>
              : out.logs.map((l, i) => <div key={i} style={S.labLine}>{l}</div>)}
          {out.pass && <div style={S.labPass}><Check size={15} /> Correct — that is exactly right.</div>}
          {!out.pass && !out.error && out.logs.length > 0 && <div style={S.labTry}>Close — compare your output with the goal and try again.</div>}
        </div>
      )}
    </div>
  );
}

/* ---- PRACTICE: generated drills ------------------------------------------- */
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];
const PRACTICE_XP = 5;

const DRILLS = [
  { id: 'dr1', day: 'm1', name: 'Unit Rates', gen: () => { const per = rnd(2, 9), n = pickOne([3, 4, 5, 6, 8]); return { prompt: `${n} notebooks cost $${n * per}. What does ONE notebook cost, in dollars?`, answer: per, hint: 'Divide the total cost by how many there are.' }; } },
  { id: 'dr2', day: 'm2', name: 'Percents', gen: () => { const p = pickOne([10, 20, 25, 50, 75]), n = pickOne([40, 60, 80, 100, 200]); return { prompt: `What is ${p}% of ${n}?`, answer: (p / 100) * n, hint: `Turn ${p}% into a decimal, then multiply.` }; } },
  { id: 'dr3', day: 'm3', name: 'Two-Step Equations', gen: () => { const a = rnd(2, 6), x = rnd(2, 9), b = rnd(1, 15); return { prompt: `Solve ${a}x + ${b} = ${a * x + b}. What is x?`, answer: x, hint: `Subtract ${b} from both sides first, then divide by ${a}.` }; } },
  { id: 'dr4', day: 'm4', name: 'Simplify & Evaluate', gen: () => { const a = rnd(2, 6), b = rnd(2, 6), x = rnd(2, 8); return { prompt: `Simplify ${a}x + ${b}x, then evaluate it when x = ${x}.`, answer: (a + b) * x, hint: `Combine like terms into ${a + b}x, then multiply by ${x}.` }; } },
  { id: 'dr5', day: 'm5', name: 'Variables Both Sides', gen: () => { const x = rnd(2, 9), c = rnd(1, 4), a = c + rnd(1, 4), d = rnd(1, 12); const cs = c === 1 ? 'x' : c + 'x'; return { prompt: `Solve ${a}x + ${d} = ${cs} + ${(a - c) * x + d}. What is x?`, answer: x, hint: `Subtract ${cs} from both sides to gather the x terms.` }; } },
  { id: 'dr6', day: 'm6', name: 'Lines & Slope', gen: () => { const m = rnd(2, 6), b = rnd(1, 9), x = rnd(2, 8); return { prompt: `For y = ${m}x + ${b}, what is y when x = ${x}?`, answer: m * x + b, hint: 'Multiply first, then add the starting value.' }; } },
  { id: 'dr7', day: 'm7', name: 'Exponents', gen: () => (Math.random() < 0.5 ? (() => { const a = rnd(2, 5), b = rnd(2, 4); return { prompt: `What is ${a}^${b}?`, answer: Math.pow(a, b), hint: `Multiply ${a} by itself ${b} times.` }; })() : (() => { const a = rnd(2, 5), b = rnd(2, 5); return { prompt: `x^${a} · x^${b} = x^? — what is the exponent?`, answer: a + b, hint: 'Same base means you add the exponents.' }; })()) },
  { id: 'dr8', day: 'm8', name: 'Scientific Notation', gen: () => { const k = rnd(3, 9), lead = rnd(1, 9); return { prompt: `${lead}${'0'.repeat(k)} written as ${lead} × 10^? — what is the exponent?`, answer: k, hint: 'Count how many places the decimal point moves.' }; } },
  { id: 'dr9', day: 'm9', name: 'Square Roots', gen: () => { const n = rnd(2, 15); return { prompt: `What is √${n * n}?`, answer: n, hint: 'What number times itself gives that value?' }; } },
  { id: 'dr10', day: 'm10', name: 'Pythagorean Theorem', gen: () => { const t = pickOne([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25]]); return { prompt: `A right triangle has legs ${t[0]} and ${t[1]}. What is the hypotenuse?`, answer: t[2], hint: 'Square both legs, add them, then take the square root.' }; } },
  { id: 'dr11', day: 'm11', name: 'Systems of Equations', gen: () => { const x = rnd(3, 12), y = rnd(1, x - 1); return { prompt: `x + y = ${x + y} and x − y = ${x - y}. What is x?`, answer: x, hint: 'Add the two equations so the y terms cancel, then halve.' }; } },
  { id: 'dr12', day: 'm12', name: 'Inequalities', gen: () => { const b = rnd(2, 9), x = rnd(3, 15); return { prompt: `Solve x + ${b} > ${x + b}. The answer is x greater than what number?`, answer: x, hint: `Subtract ${b} from both sides.` }; } },
  { id: 'dr13', day: 'm13', name: 'Function Notation', gen: () => { const a = rnd(2, 6), b = rnd(1, 9), k = rnd(2, 8); return { prompt: `If f(x) = ${a}x + ${b}, what is f(${k})?`, answer: a * k + b, hint: `Replace every x with ${k}, then compute.` }; } },
  { id: 'dr14', day: 'm14', name: 'Quadratics', gen: () => { const c = rnd(0, 6), k = pickOne([-4, -3, -2, 2, 3, 4, 5]); return { prompt: `For y = x²${c ? ' + ' + c : ''}, what is y when x = ${k}?`, answer: k * k + c, hint: 'Square the input first — a negative squared turns positive.' }; } },
];

function PracticeHub({ profile, onBack, onStart }) {
  const accent = CURRICULUM.math.accent;
  const pr = profile.practice || {};
  const unlocked = DRILLS.filter((d) => !!profile.completed[dayKey('math', d.day)]);
  const mastered = unlocked.filter((d) => (pr[d.id]?.bestStreak || 0) >= 5).length;
  return (
    <div>
      <BackBar onBack={onBack} />
      <div className="lq-rise">
        <div style={{ ...S.eyebrow, color: accent }}>Practice Range</div>
        <h1 style={{ ...S.h1, fontSize: 26 }}>Sharpen your skills</h1>
        <div style={S.muted}>{unlocked.length} skill{unlocked.length === 1 ? '' : 's'} unlocked · {mastered} mastered</div>
      </div>
      {unlocked.length === 0 ? (
        <div style={{ ...S.callout, marginTop: 22 }}>
          <Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={S.body}>Finish a Mathematics day to unlock practice for that skill. Each lesson you complete adds a new drill here.</div>
        </div>
      ) : (
        <>
          <div className="lq-rise lq-tap lq-card" style={{ ...S.subjCard, marginTop: 18, borderColor: accent + '66' }} onClick={() => onStart(null)}>
            <div style={{ ...S.subjIcon, background: accent + '22', border: `1px solid ${accent}55` }}><Shuffle size={20} color={accent} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={S.subjName}>Mixed Review</div>
              <div style={S.subjBlurb}>Random questions from every skill you know — the best way to remember.</div>
            </div>
            <ChevronRight size={18} color="#5b6275" />
          </div>
          <div style={S.sectionLabel}>Single Skills</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {unlocked.map((d, i) => {
              const st = pr[d.id] || {}; const best = st.bestStreak || 0; const isMaster = best >= 5;
              return (
                <div key={d.id} className="lq-rise lq-tap lq-card" style={{ ...S.dayCard, animationDelay: `${.04 * i}s` }} onClick={() => onStart(d.id)}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={S.dayTitle}>{d.name}</div>
                    <div style={S.daySub}>{st.runs ? `${st.runs} session${st.runs === 1 ? '' : 's'} · best streak ${best}` : 'Not practiced yet'}</div>
                  </div>
                  {isMaster && <span style={{ ...S.tag, color: '#3ddc97', borderColor: '#3ddc9755' }}>SHARP</span>}
                  <ChevronRight size={18} color="#5b6275" />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function PracticeSession({ drillId, profile, onExit, onDone }) {
  const accent = CURRICULUM.math.accent;
  const TOTAL = 8;
  const pool = useMemo(() => {
    const unlocked = DRILLS.filter((d) => !!profile.completed[dayKey('math', d.day)]);
    const p = drillId ? DRILLS.filter((d) => d.id === drillId) : unlocked;
    return p.length ? p : [DRILLS[0]];
  }, [drillId, profile]);
  const [i, setI] = useState(0);
  const [q, setQ] = useState(() => pickOne(pool).gen());
  const [num, setNum] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const ok = revealed && Math.abs(parseFloat(num) - q.answer) < 1e-9;
  function submit() {
    if (revealed || num.trim() === '') return;
    const good = Math.abs(parseFloat(num) - q.answer) < 1e-9;
    if (good) { setCorrect((c) => c + 1); setStreak((s) => { const n = s + 1; setBestStreak((b) => Math.max(b, n)); return n; }); }
    else setStreak(0);
    setRevealed(true);
  }
  function next() {
    if (i + 1 >= TOTAL) { onDone(correct, bestStreak); return; }
    setI(i + 1); setQ(pickOne(pool).gen()); setNum(''); setRevealed(false); setShowHint(false);
  }
  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1 }}><Bar pct={(i + (revealed ? 1 : 0)) / TOTAL} accent={accent} thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}/{TOTAL}</span>
      </div>
      <div key={i} className="lq-rise" style={{ marginTop: 26 }}>
        <div style={{ ...S.eyebrow, color: accent }}>Practice{streak >= 2 ? ` · ${streak} in a row` : ''}</div>
        <h2 style={S.qPrompt}>{q.prompt}</h2>
        <input type="number" inputMode="decimal" value={num} disabled={revealed} placeholder="Your answer"
          onChange={(e) => setNum(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') (revealed ? next() : submit()); }}
          style={{ ...S.numInput, borderColor: revealed ? (ok ? '#3ddc97' : '#ff6b6b') : accent + '88' }} />
        {!revealed && !showHint && (
          <button className="lq-tap" style={S.hintBtn} onClick={() => setShowHint(true)}><HelpCircle size={14} /> Need a hint?</button>
        )}
        {showHint && !revealed && <div style={S.hintBox}>{q.hint}</div>}
        {revealed && (
          <div style={{ ...S.feedback, borderColor: ok ? '#3ddc9755' : '#ff6b6b55', background: ok ? '#3ddc9712' : '#ff6b6b12' }}>
            <div style={{ ...S.fbTitle, color: ok ? '#3ddc97' : '#ff8b8b' }}>{ok ? 'Correct' : `Answer: ${q.answer}`}</div>
            <div style={S.body}>{q.hint}</div>
          </div>
        )}
        <button className="lq-tap" style={{ ...S.primaryBtn, background: revealed ? accent : '#2a2f3d', color: revealed ? '#0c0e16' : '#e7e9f0', marginTop: 22 }}
          onClick={() => (revealed ? next() : submit())}>
          {revealed ? (i + 1 >= TOTAL ? 'Finish' : 'Next') : 'Check answer'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function PracticeResults({ correct, earned, bestStreak, onContinue }) {
  const accent = CURRICULUM.math.accent;
  const great = correct >= 6;
  return (
    <div style={{ textAlign: 'center', paddingTop: 30 }}>
      <div className="lq-rise" style={{ ...S.medal, borderColor: accent + '66', background: accent + '18' }}>
        <Target size={34} color={accent} />
      </div>
      <h1 className="lq-rise" style={{ ...S.h1, fontSize: 28 }}>{great ? 'Sharp work.' : 'Good reps.'}</h1>
      <div className="lq-rise" style={S.muted}>{correct} of 8 correct · best streak {bestStreak}</div>
      {bestStreak >= 5 && <div className="lq-rise" style={{ ...S.levelUp, marginTop: 14 }}>Skill mastered — 5 in a row!</div>}
      <div className="lq-rise" style={{ ...S.xpBadge, borderColor: accent + '66', color: accent, marginTop: 16 }}>+{earned} XP</div>
      <div><button className="lq-tap" style={{ ...S.primaryBtn, background: accent, marginTop: 26, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }} onClick={onContinue}>Continue <ChevronRight size={18} /></button></div>
    </div>
  );
}

const S = {
  labBox: { marginTop: 14, marginBottom: 14, background: '#0f1220', border: '1px solid #262c3d', borderRadius: 14, padding: 14 },
  labTask: { display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, color: '#c9cee0', lineHeight: 1.5, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" },
  labEditor: { width: '100%', boxSizing: 'border-box', background: '#080a12', color: '#e7e9f0', border: '1px solid #2a2f3d', borderRadius: 10, padding: '11px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.65, resize: 'vertical', outline: 'none' },
  labOut: { marginTop: 12, background: '#080a12', border: '1px solid #262c3d', borderRadius: 10, padding: '10px 12px' },
  labOutLbl: { fontSize: 10, letterSpacing: '.14em', color: '#5b6275', fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 },
  labLine: { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#e7e9f0', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
  labPass: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: '#3ddc97', fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" },
  labTry: { marginTop: 8, color: '#f6b73c', fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
  bg: { minHeight: '100vh', width: '100%', backgroundColor: '#0c0e16', backgroundImage: 'radial-gradient(1200px 600px at 50% -10%, #1a2030 0%, rgba(12,14,22,0) 55%), radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: 'auto, 22px 22px', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#e7e9f0' },
  col: { maxWidth: 560, margin: '0 auto', padding: '24px 18px 56px' },
  loading: { textAlign: 'center', padding: '80px 0', color: '#8b91a3', fontFamily: "'JetBrains Mono', monospace" },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#8b91a3', marginBottom: 6 },
  h1: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.1, margin: '0 0 4px', letterSpacing: -.5 },
  heroCard: { marginTop: 16, padding: 18, borderRadius: 18, background: 'linear-gradient(180deg, #181d2c, #12151f)', border: '1px solid #262b3a', boxShadow: '0 18px 40px -22px rgba(0,0,0,.8)' },
  heroTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  rankRow: { display: 'flex', alignItems: 'center', gap: 6 },
  rankName: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: '#f6b73c' },
  lvlBig: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, marginTop: 2 },
  barLabel: { display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 },
  track: { width: '100%', background: '#252a38', borderRadius: 99, overflow: 'hidden' },
  mono: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 },
  muted: { color: '#8b91a3', fontSize: 13 },
  streak: { display: 'flex', alignItems: 'center', gap: 8 },
  streakLbl: { fontSize: 10, color: '#6b7281', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  sectionLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6b7281', margin: '26px 0 12px' },
  subjCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, background: '#141826', border: '1px solid #232838', transition: 'transform .15s ease' },
  subjIcon: { width: 46, height: 46, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  subjName: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 17 },
  subjBlurb: { color: '#8b91a3', fontSize: 13, marginTop: 1 },
  subjMeta: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 },
  dayCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 14, background: '#141826', border: '1px solid #232838' },
  dayNode: { width: 30, height: 30, borderRadius: 99, border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  daySub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7281', letterSpacing: .5 },
  dayTitle: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, marginTop: 3 },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 6, border: '1px solid' },
  body: { fontSize: 15.5, lineHeight: 1.6, color: '#cfd3df', margin: 0 },
  concept: { padding: 14, borderRadius: 13, background: '#12151f', border: '1px solid' },
  conceptTerm: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, marginBottom: 4 },
  example: { padding: 14, borderRadius: 13, background: '#13182a', border: '1px solid #232c44' },
  exTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#5aa9ff', background: '#5aa9ff1c', padding: '3px 7px', borderRadius: 6 },
  callout: { display: 'flex', gap: 10, padding: 14, borderRadius: 13, background: 'linear-gradient(180deg,#1d1a13,#161310)', border: '1px solid #3a3320' },
  formula: { padding: '16px 14px', borderRadius: 13, background: '#10131d', border: '1.5px dashed' },
  formulaText: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 19, textAlign: 'center', letterSpacing: .5 },
  vizBox: { padding: '10px 6px', borderRadius: 13, background: '#10131d', border: '1px solid #1f2433' },
  recapItem: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12, borderRadius: 12, background: '#141826', border: '1px solid #232838' },
  recapCheck: { width: 24, height: 24, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  primaryBtn: { width: '100%', border: 'none', borderRadius: 14, padding: '15px 18px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: '#0c0e16', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  secondaryBtn: { border: '1px solid #2a2f3d', background: '#161a28', borderRadius: 14, padding: '15px 18px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: '#aeb4c4', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 },
  iconBtn: { width: 40, height: 40, borderRadius: 11, background: '#161a28', border: '1px solid #262b3a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
  quizTop: { display: 'flex', alignItems: 'center', gap: 12 },
  qPrompt: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, lineHeight: 1.25, margin: '8px 0 0' },
  choice: { textAlign: 'left', padding: '15px 16px', borderRadius: 13, border: '1.5px solid', fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#e7e9f0' },
  numInput: { width: '100%', marginTop: 18, padding: '15px 16px', borderRadius: 13, border: '1.5px solid', background: '#161a28', color: '#fff', fontSize: 18, fontFamily: "'JetBrains Mono', monospace", outline: 'none' },
  miniInput: { padding: '8px 12px', borderRadius: 10, border: '1px solid #3a4154', background: '#161a28', color: '#fff', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', width: 150 },
  hintBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, background: 'transparent', border: '1px dashed #2f3a4d', color: '#5aa9ff', padding: '8px 14px', borderRadius: 10, fontSize: 13.5, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  hintBox: { display: 'flex', gap: 9, marginTop: 16, padding: 12, borderRadius: 12, background: '#5aa9ff10', border: '1px dashed #5aa9ff44' },
  feedback: { marginTop: 18, padding: 14, borderRadius: 13, border: '1px solid' },
  fbTitle: { display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15 },
  medal: { width: 88, height: 88, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18, padding: '10px 18px', borderRadius: 99, background: '#1d1a13', border: '1px solid #3a3320' },
  levelUp: { marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: '#1d1a13', border: '1px solid #4a3f1f', color: '#f6b73c', fontWeight: 600, fontSize: 14, animation: 'glow 2s ease-in-out infinite' },
  ghostBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid #2a2f3d', color: '#8b91a3', padding: '8px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' },
  dangerBtn: { background: '#ff6b6b22', border: '1px solid #ff6b6b66', color: '#ff8f8f', padding: '8px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' },
  confirmRow: { display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  demoBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '8px 12px', borderRadius: 10, background: '#5aa9ff14', border: '1px dashed #5aa9ff55', color: '#9cc6ff', fontSize: 13, marginBottom: 16 },
  demoExit: { background: 'transparent', border: '1px solid #5aa9ff66', color: '#9cc6ff', borderRadius: 8, padding: '3px 12px', fontSize: 12, cursor: 'pointer' },
  profileCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, background: '#141826', border: '1px solid #232838', width: '100%', textAlign: 'left', cursor: 'pointer' },
  avatar: { width: 44, height: 44, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, flexShrink: 0 },
};
