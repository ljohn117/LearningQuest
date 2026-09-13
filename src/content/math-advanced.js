/* Mathematics, days 20 onward — Algebra II into precalculus.
 *
 * APPENDED, never inserted. m1 through m19 and mr1 through mr3 keep their ids
 * forever; everything here starts at m20. scripts/test.mjs freezes every
 * existing id so this stays true after I am not the one editing it.
 *
 * WHY THIS EXISTS
 *
 * The lane stopped at intro quadratics, and the learner had finished 18 of
 * its 22 days. Meanwhile the content audit measured the maths prose at
 * reading grade 5.0 — BELOW the target band, and below his own tested
 * reading level. The lane was simultaneously written down to him and stopping
 * short of where he could go, which is the worst of both.
 *
 * THE SPINE
 *
 * Days 1 to 19 were all one activity wearing different clothes: there is an
 * unknown number, go and find it. These eight days change the activity.
 *
 *   m20  factoring        — undoing multiplication, to find every answer at once
 *   m21  quadratic formula— the solver that works when undoing fails
 *   m22  rational express.— division as an object you can manipulate
 *   m23  exponentials     — the shape that eventually beats every polynomial
 *   m24  logarithms       — the undo button for exponentials
 *   m25  sequences        — a rule that generates, and a shortcut past the grind
 *   m26  right-angle trig — ratios that depend only on the angle
 *   mr4  checkpoint
 *
 * The thread running through all of them: every operation worth knowing has
 * an inverse, and knowing the inverse is what turns a wall into a door.
 * Squaring had square roots. Multiplying has factoring. Exponentials have
 * logarithms. He has already met that idea twice without it being named.
 *
 * BAND CHECK
 *
 * This is deliberately Algebra II and early precalculus — above the middle
 * school band the rest of the app sits in, and above his current grade. That
 * is the point: it is the direction of travel, not the daily bread. The prose
 * is written at roughly grade 7-8 to pull the lane's average up off 5.0.
 * Nothing here needs calculus, and nothing assumes a teacher.
 */

export const MATH_ADVANCED = [
  /* ---- m20 -------------------------------------------------------------- */
  {
    id: 'm20', tag: 'Algebra II', title: 'Factoring, and Why It Finds Every Answer',
    subtitle: 'Day 20 · Undoing multiplication',
    pages: [
      { title: 'A product is zero only one way', blocks: [
        { type: 'text', text: 'Multiply any two numbers and get zero, and you already know something powerful: at least one of them was zero. Nothing else produces zero. That single fact is the entire reason factoring works.' },
        { type: 'formula', text: 'if a × b = 0, then a = 0 or b = 0', label: 'the zero product property' },
        { type: 'text', text: 'So if you can rewrite an equation as two things multiplied together equalling zero, you have not just found an answer — you have found every answer, because each bracket gives you one.' },
      ]},
      { title: 'Reading a quadratic backwards', blocks: [
        { type: 'text', text: 'Expanding (x + 2)(x + 3) gives x² + 5x + 6. Factoring is that journey in reverse: you are handed x² + 5x + 6 and asked which two brackets produced it.' },
        { type: 'example', text: 'You need two numbers that multiply to 6 and add to 5. That is 2 and 3, so the factors are (x + 2)(x + 3). Setting each bracket to zero gives x = −2 and x = −3.' },
        { type: 'callout', text: 'Notice the signs flip. The bracket (x + 2) is zero when x is NEGATIVE two. Nearly every early factoring mistake is this sign, not the arithmetic.' },
      ]},
      { title: 'The patterns worth recognising on sight', blocks: [
        { type: 'formula', text: 'a² − b² = (a + b)(a − b)', label: 'difference of two squares' },
        { type: 'text', text: 'x² − 9 has no middle term, which looks like a problem until you see it as x² − 3². It factors instantly into (x + 3)(x − 3). Spotting this saves more time than any other single pattern in algebra.' },
        { type: 'concept', term: 'Common factor', def: 'Something every term shares, which can be pulled out front. In 2x² + 6x, both terms carry 2x, so it becomes 2x(x + 3).' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 9 said a square root undoes squaring. Day 7 said exponents can be built up or taken back down. Factoring is the same move again: every operation worth knowing has an inverse, and the inverse is usually where the real power sits. That pattern is about to repeat three more times in this lane.' },
      ]},
    ],
    recap: [
      'A product is zero only when one of its factors is zero.',
      'Factoring rewrites a sum as a product, which exposes every solution at once.',
      'For x² + bx + c, find two numbers multiplying to c and adding to b.',
      'a² − b² always factors into (a + b)(a − b).',
    ],
    quiz: [
      { type: 'mc', prompt: 'x² + 7x + 12 factors into:', choices: ['(x + 2)(x + 6)', '(x + 3)(x + 4)', '(x + 12)(x + 1)', '(x − 3)(x − 4)'], answer: 1, hint: 'Two numbers multiplying to 12 and adding to 7.', explain: '3 × 4 = 12 and 3 + 4 = 7. The pair 2 and 6 multiplies to 12 but adds to 8.' },
      { type: 'numeric', prompt: 'One solution of (x − 5)(x + 2) = 0 is x = 5. What is the other?', answer: -2, hint: 'Set the second bracket to zero and solve.', explain: 'x + 2 = 0 gives x = −2. The sign flips from what is written inside the bracket.' },
      { type: 'mc', prompt: 'x² − 25 factors into:', choices: ['(x − 5)(x − 5)', '(x + 25)(x − 1)', '(x + 5)(x − 5)', 'it cannot be factored'], answer: 2, hint: 'There is no middle term — which pattern is that?', explain: 'A difference of two squares: x² − 5² = (x + 5)(x − 5). Squaring (x − 5) would leave a −10x in the middle.' },
      { type: 'mc', prompt: 'Pulling the common factor out of 3x² + 12x gives:', choices: ['3(x² + 12x)', 'x(3x + 12)', '3x(x + 12)', '3x(x + 4)'], answer: 3, hint: 'What do BOTH terms share, in full?', explain: 'Both carry a 3 and an x, so 3x comes out and 3x × 4 = 12x confirms the second term.' },
      { type: 'numeric', prompt: 'x² + x − 6 = 0 has solutions x = 2 and x = ?', answer: -3, hint: 'Two numbers multiplying to −6 and adding to +1.', explain: 'The factors are (x − 2)(x + 3), giving x = 2 and x = −3.' },
    ],
  },

  /* ---- m21 -------------------------------------------------------------- */
  {
    id: 'm21', tag: 'Algebra II', title: 'The Formula That Never Fails',
    subtitle: 'Day 21 · When factoring runs out',
    pages: [
      { title: 'Most quadratics do not factor tidily', blocks: [
        { type: 'text', text: 'Factoring is fast when the numbers cooperate. Very often they do not. x² + x − 1 has perfectly real solutions, but no pair of whole numbers multiplies to −1 and adds to 1, so hunting for brackets is wasted effort.' },
        { type: 'text', text: 'The quadratic formula solves every quadratic there is. Not the tidy ones — all of them. It is one of the few genuinely universal tools in school mathematics.' },
        { type: 'formula', text: 'x = ( −b ± √(b² − 4ac) ) ÷ 2a', label: 'for any ax² + bx + c = 0' },
      ]},
      { title: 'Using it is mostly bookkeeping', blocks: [
        { type: 'text', text: 'Identify a, b and c, substitute, and be careful with signs. The ± is not decoration: it is what produces the two solutions a quadratic is entitled to.' },
        { type: 'example', text: 'For x² − 3x + 2 = 0: a = 1, b = −3, c = 2. The discriminant is 9 − 8 = 1, so x = (3 ± 1) ÷ 2, giving x = 2 and x = 1.' },
        { type: 'callout', text: 'That example also factors into (x − 1)(x − 2). When both methods work they must agree — and checking one against the other is the cheapest way to catch a sign error.' },
      ]},
      { title: 'The part under the root does the talking', blocks: [
        { type: 'concept', term: 'Discriminant', def: 'The b² − 4ac hiding under the square root. Its sign tells you how many real solutions exist before you finish any arithmetic.' },
        { type: 'text', text: 'Positive discriminant: two solutions, and the parabola crosses the x-axis twice. Zero: exactly one, and the curve just touches the axis. Negative: no real solutions, because no real number squares to give a negative.' },
        { type: 'text', text: 'That last case is not a failure. It is the curve sitting entirely above or below the axis, never crossing — which is a perfectly ordinary thing for a parabola to do.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 14 drew y = x² as a curve that turns. Day 6 said a rule becomes a picture. The discriminant joins them: it is an arithmetic quantity that tells you, without drawing anything, where the picture meets the axis. Algebra and geometry describing the same object.' },
      ]},
    ],
    recap: [
      'The quadratic formula solves every quadratic, tidy or not.',
      'x = (−b ± √(b² − 4ac)) ÷ 2a, and the ± supplies both solutions.',
      'The discriminant b² − 4ac counts the real solutions before you compute them.',
      'A negative discriminant means the parabola never crosses the x-axis.',
    ],
    quiz: [
      { type: 'mc', prompt: 'In 2x² − 5x + 3 = 0, the values of a, b and c are:', choices: ['2, −5, 3', '2, 5, 3', '−2, 5, −3', '2, −5, −3'], answer: 0, hint: 'The sign in front of a term belongs to that term.', explain: 'b carries its minus sign: a = 2, b = −5, c = 3. Dropping that sign is the most common slip.' },
      { type: 'numeric', prompt: 'What is the discriminant of x² + 2x − 8 = 0?', answer: 36, hint: 'Work out b² − 4ac, watching the sign of c.', explain: '2² − 4(1)(−8) = 4 + 32 = 36. Subtracting a negative adds.' },
      { type: 'mc', prompt: 'A quadratic has discriminant −7. How many times does its graph cross the x-axis?', choices: ['twice', 'never', 'once', 'it depends on a'], answer: 1, hint: 'What would you need to square to get a negative?', explain: 'No real number squares to a negative, so there are no real solutions and the curve stays entirely on one side of the axis.' },
      { type: 'mc', prompt: 'A discriminant of exactly zero means the parabola:', choices: ['crosses the axis twice', 'misses the axis entirely', 'touches the axis at one point', 'is a straight line'], answer: 2, hint: 'The ± is adding and subtracting zero.', explain: 'Both solutions collapse to the same value, so the curve meets the axis at exactly one point — its turning point.' },
      { type: 'numeric', prompt: 'Solve x² − 6x + 8 = 0. The larger solution is x = ?', answer: 4, hint: 'The discriminant is 36 − 32 = 4, so √4 = 2.', explain: 'x = (6 ± 2) ÷ 2, giving 4 and 2. It also factors as (x − 4)(x − 2).' },
    ],
  },

  /* ---- m22 -------------------------------------------------------------- */
  {
    id: 'm22', tag: 'Algebra II', title: 'Fractions With Letters In Them',
    subtitle: 'Day 22 · Rational expressions',
    pages: [
      { title: 'The rules did not change', blocks: [
        { type: 'text', text: 'A rational expression is a fraction whose top and bottom are polynomials. Everything you know about ordinary fractions still applies — cancel common factors, find a common denominator to add, multiply straight across.' },
        { type: 'text', text: 'The only genuinely new thing is that you must cancel FACTORS, never terms. This is the rule people break constantly, and it is worth being able to say out loud.' },
        { type: 'callout', text: '(x + 3) ÷ 3 is NOT x. The 3 on the bottom divides the whole top, not the part of it that looks similar. You may only cancel something multiplying the entire numerator and the entire denominator.' },
      ]},
      { title: 'Factoring is what makes cancelling legal', blocks: [
        { type: 'example', text: 'Simplify (x² − 9) ÷ (x + 3). Factor the top into (x + 3)(x − 3). Now (x + 3) is genuinely a factor of both, so it cancels, leaving x − 3.' },
        { type: 'text', text: 'This is why the previous two days came first. Without factoring you cannot see what is a factor, and without seeing that, cancelling is guesswork.' },
      ]},
      { title: 'The values that are forbidden', blocks: [
        { type: 'text', text: 'Division by zero is undefined, so any value making the denominator zero is excluded from the start. For 1 ÷ (x − 4), the value x = 4 is simply not allowed.' },
        { type: 'concept', term: 'Excluded value', def: 'An input that would make a denominator zero. It stays excluded even after cancelling makes the problem disappear from view.' },
        { type: 'text', text: 'That last point matters. In the earlier example, x = −3 is excluded even though the simplified answer x − 3 looks perfectly happy there. The original expression never allowed it, and simplifying does not grant permission.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 1 said a ratio compares two amounts, and day 2 said a proportion sets two ratios equal. A rational expression is that same object with algebra inside it — and the excluded value is a new version of an old habit: checking that an answer is actually allowed, not just arithmetically correct.' },
      ]},
    ],
    recap: [
      'A rational expression is a fraction of polynomials.',
      'Cancel factors, never terms — (x + 3) ÷ 3 does not simplify to x.',
      'Factoring first is what reveals which parts are genuinely factors.',
      'Any value making a denominator zero stays excluded, even after cancelling.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Simplify (x² − 4) ÷ (x − 2):', choices: ['x − 2', 'it cannot be simplified', 'x² − 2', 'x + 2'], answer: 3, hint: 'Factor the top as a difference of two squares.', explain: '(x + 2)(x − 2) ÷ (x − 2) cancels to x + 2.' },
      { type: 'mc', prompt: 'Which value is excluded from 5 ÷ (x − 7)?', choices: ['x = 7', 'x = 0', 'x = 5', 'x = −7'], answer: 0, hint: 'What makes the bottom zero?', explain: 'x = 7 makes the denominator zero, and division by zero is undefined.' },
      { type: 'mc', prompt: '(2x + 6) ÷ 2 simplifies to:', choices: ['x + 6', 'x + 3', '2x + 3', 'x'], answer: 1, hint: 'The 2 divides the whole top, both terms.', explain: 'Factor the top as 2(x + 3), then cancel the 2. Only dividing the first term gives x + 6, which is the classic error.' },
      { type: 'numeric', prompt: 'For 1 ÷ (x² − 9), one excluded value is x = 3. What is the other?', answer: -3, hint: 'Factor the bottom, then set each factor to zero.', explain: 'x² − 9 = (x + 3)(x − 3), so both x = 3 and x = −3 make it zero.' },
      { type: 'mc', prompt: 'After simplifying (x² − 9) ÷ (x + 3) to x − 3, the value x = −3 is:', choices: ['now allowed, since the fraction is gone', 'allowed only if x − 3 is positive', 'still excluded', 'never relevant'], answer: 2, hint: 'Was it allowed in the ORIGINAL expression?', explain: 'The original divided by zero there. Simplifying changes how it is written, not what it was ever permitted to do.' },
    ],
  },

  /* ---- m23 -------------------------------------------------------------- */
  {
    id: 'm23', tag: 'Precalculus', title: 'The Shape That Beats Everything',
    subtitle: 'Day 23 · Exponential growth',
    pages: [
      { title: 'Adding versus multiplying, over and over', blocks: [
        { type: 'text', text: 'A linear rule adds the same amount each step: 3, 6, 9, 12. An exponential rule multiplies by the same factor each step: 3, 9, 27, 81. Early on the difference looks minor. It does not stay minor.' },
        { type: 'formula', text: 'y = a · bˣ', label: 'a is the starting amount, b is the growth factor' },
        { type: 'text', text: 'If b is greater than 1 the quantity grows; between 0 and 1 it decays. Radioactive decay uses b = ½, and compound interest uses something like b = 1.05.' },
      ]},
      { title: 'It wins eventually, always', blocks: [
        { type: 'text', text: 'Compare y = x¹⁰⁰⁰ with y = 2ˣ. For a long stretch the polynomial is enormously bigger. But 2ˣ overtakes it and then leaves it behind permanently, and no polynomial of any degree ever catches up.' },
        { type: 'example', text: 'Fold a piece of paper 42 times and, if it were physically possible, its thickness would reach the Moon. Each fold only doubles — which is exactly the point.' },
        { type: 'callout', text: 'This is why people are consistently wrong about epidemics, compound interest and viral spread. Human intuition is built for adding, and exponential processes look harmless right up until they are not.' },
      ]},
      { title: 'Reading the curve', blocks: [
        { type: 'text', text: 'An exponential curve never turns and never crosses the x-axis. For growth it climbs ever more steeply; for decay it falls towards the axis, getting closer forever without arriving.' },
        { type: 'concept', term: 'Asymptote', def: 'A line a curve approaches without ever touching. Decay curves flatten towards zero, always nearer, never there.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Computer Science day 2 doubled place values through binary. Fossils and Deep Time halved an isotope every half-life. Business and Money compounded interest year on year. Connections day 1 said those three were one mechanism. This is that mechanism written as a function, with a graph you can read.' },
      ]},
    ],
    recap: [
      'Linear rules add a fixed amount; exponential rules multiply by a fixed factor.',
      'y = a · bˣ — a is where it starts, b is what it multiplies by.',
      'b > 1 grows, 0 < b < 1 decays.',
      'Exponential growth overtakes every polynomial eventually, without exception.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Which sequence is exponential rather than linear?', choices: ['5, 10, 15, 20', '5, 6, 7, 8', '5, 7, 9, 11', '5, 10, 20, 40'], answer: 3, hint: 'Ask whether each step ADDS the same or MULTIPLIES by the same.', explain: 'Each term doubles. The others all add a fixed amount, which makes them linear.' },
      { type: 'numeric', prompt: 'For y = 3 · 2ˣ, what is y when x = 4?', answer: 48, hint: 'Work out 2⁴ first, then multiply by 3.', explain: '2⁴ = 16, and 3 × 16 = 48. Multiplying 3 × 2 first and then raising to the fourth would give a very different answer.' },
      { type: 'mc', prompt: 'In y = a · bˣ, a value of b = 0.5 means the quantity:', choices: ['halves each step', 'grows steadily', 'stays constant', 'becomes negative'], answer: 0, hint: 'Multiplying by a half repeatedly.', explain: 'Any b between 0 and 1 gives decay. b = 0.5 halves it each step, exactly like a half-life.' },
      { type: 'mc', prompt: 'Compared with y = x¹⁰⁰, the function y = 2ˣ will:', choices: ['never catch up', 'overtake it and stay ahead forever', 'match it exactly', 'overtake it briefly then fall behind'], answer: 1, hint: 'Exponentials beat polynomials of every degree, eventually.', explain: 'It takes a while, but once the exponential overtakes it never gives the lead back — that is true for any power of x, however large.' },
      { type: 'mc', prompt: 'A decay curve approaches zero but never reaches it. That line is called:', choices: ['a tangent', 'a vertex', 'an asymptote', 'a radius'], answer: 2, hint: 'A line the curve gets arbitrarily close to.', explain: 'An asymptote. The value keeps halving, so it shrinks forever without ever being exactly zero.' },
    ],
  },

  /* ---- m24 -------------------------------------------------------------- */
  {
    id: 'm24', tag: 'Precalculus', title: 'The Undo Button for Exponents',
    subtitle: 'Day 24 · Logarithms',
    pages: [
      { title: 'A logarithm answers one question', blocks: [
        { type: 'text', text: 'Every logarithm is asking the same thing: what power do I raise this base to, in order to get that number? Nothing more mysterious than that is going on.' },
        { type: 'formula', text: 'log_b(n) = x  means  bˣ = n', label: 'the two lines say the same thing' },
        { type: 'example', text: 'log₂(8) = 3, because 2³ = 8. Read it aloud as "what power of 2 gives 8?" and the answer is immediate.' },
      ]},
      { title: 'Why it is worth having', blocks: [
        { type: 'text', text: 'Solving 2ˣ = 64 by trial works fine. Solving 2ˣ = 1000 does not, because no whole number works. The logarithm gives the exact answer directly instead of leaving you guessing between 9 and 10.' },
        { type: 'text', text: 'It also collapses enormous ranges into manageable ones. Earthquake magnitude, sound in decibels and the pH scale are all logarithmic, which is why each step on them means a tenfold change rather than a small one.' },
        { type: 'callout', text: 'You already used this without the name. Chemistry said pH 4 is a hundred times more acidic than pH 6 — two steps, each ten times. That scale is a logarithm.' },
      ]},
      { title: 'Turning multiplication into addition', blocks: [
        { type: 'formula', text: 'log(a × b) = log(a) + log(b)', label: 'the property that made logs famous' },
        { type: 'text', text: 'Before calculators, this was how hard multiplication got done: look up two logs, add them, look the result back up. Slide rules work on exactly this principle, and navigators crossed oceans with them.' },
        { type: 'text', text: 'It is not a historical curiosity. Turning multiplication into addition is why logarithmic scales make exponential data readable — a curve that shoots off the page becomes a straight line.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 9 said a square root undoes squaring. Day 20 said factoring undoes multiplying. Now logarithms undo exponentials. Three days in this lane have quietly made the same point: the inverse is where the power is, and it is worth asking of any new operation what its undo looks like.' },
      ]},
    ],
    recap: [
      'log_b(n) asks: what power of b gives n?',
      'log_b(n) = x and bˣ = n are two ways of writing one fact.',
      'Logarithms solve for an exponent exactly, where guessing cannot.',
      'log(a × b) = log(a) + log(b) turns multiplication into addition.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'What is log₂(16)?', answer: 4, hint: 'What power of 2 gives 16?', explain: '2⁴ = 16, so the logarithm is 4.' },
      { type: 'mc', prompt: 'log₁₀(1000) = 3 is another way of writing:', choices: ['10 × 3 = 1000', '3¹⁰ = 1000', '1000 ÷ 10 = 3', '10³ = 1000'], answer: 3, hint: 'The base, raised to the answer, gives the number.', explain: 'A logarithm IS an exponent. Base 10 raised to 3 gives 1000.' },
      { type: 'numeric', prompt: 'What is log₃(27)?', answer: 3, hint: 'Count how many 3s multiply to make 27.', explain: '3 × 3 × 3 = 27, so 3³ = 27 and the logarithm is 3.' },
      { type: 'mc', prompt: 'Each step up the pH scale means the acidity changes by a factor of:', choices: ['10', '2', '1', '100'], answer: 0, hint: 'It is a base-10 logarithmic scale.', explain: 'Ten times per step. Two steps is a hundredfold, which is why pH 4 and pH 6 are so far apart.' },
      { type: 'mc', prompt: 'log(a × b) can be rewritten as:', choices: ['log(a) × log(b)', 'log(a) + log(b)', 'log(a) − log(b)', 'log(a) ÷ log(b)'], answer: 1, hint: 'This is the property that replaced multiplication with addition.', explain: 'Multiplication inside becomes addition outside. That is precisely what made slide rules and log tables work.' },
    ],
  },

  /* ---- m25 -------------------------------------------------------------- */
  {
    id: 'm25', tag: 'Precalculus', title: 'Patterns With a Shortcut',
    subtitle: 'Day 25 · Sequences and series',
    pages: [
      { title: 'Two kinds of pattern, again', blocks: [
        { type: 'text', text: 'An arithmetic sequence adds a fixed amount each time: 4, 7, 10, 13, with a common difference of 3. A geometric sequence multiplies by a fixed factor: 4, 8, 16, 32, with a common ratio of 2.' },
        { type: 'text', text: 'That is the same split as linear against exponential, met one day earlier — now written as a list of terms rather than a curve.' },
        { type: 'formula', text: 'aₙ = a₁ + (n − 1)d', label: 'the nth term of an arithmetic sequence' },
      ]},
      { title: 'Jumping straight to the hundredth term', blocks: [
        { type: 'text', text: 'The formula matters because it lets you skip the grind. Asked for the 100th term of 4, 7, 10, you do not write out ninety-seven more numbers — you substitute.' },
        { type: 'example', text: 'a₁₀₀ = 4 + (99)(3) = 4 + 297 = 301. Note it is 99, not 100: the first term needed no steps to reach it.' },
        { type: 'callout', text: 'That off-by-one is the single most common error here, and it has a reason worth remembering. Getting to the 100th term takes 99 steps, the same way the 5th fence post has only 4 gaps before it.' },
      ]},
      { title: 'Adding a sequence up', blocks: [
        { type: 'concept', term: 'Series', def: 'The sum of the terms of a sequence. The sequence is the list; the series is what you get by adding the list up.' },
        { type: 'formula', text: 'Sₙ = n(a₁ + aₙ) ÷ 2', label: 'sum of an arithmetic series' },
        { type: 'text', text: 'Pair the first term with the last, the second with the second-to-last, and so on. Every pair sums to the same total, and there are n ÷ 2 pairs. Gauss reportedly worked this out as a schoolboy asked to add 1 to 100, and finished almost immediately.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 6 turned a rule into a straight line, and the nth-term formula is that same line with whole-number inputs only. An arithmetic sequence is a linear function sampled at 1, 2, 3; a geometric one is an exponential sampled the same way. Two families, met a third time.' },
      ]},
    ],
    recap: [
      'Arithmetic sequences add a common difference; geometric sequences multiply by a common ratio.',
      'aₙ = a₁ + (n − 1)d jumps straight to any term.',
      'It is (n − 1) steps to the nth term, not n.',
      'A series is a sequence added up; pairing terms gives the sum quickly.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'What is the common difference of 5, 12, 19, 26?', answer: 7, hint: 'Subtract any term from the one after it.', explain: '12 − 5 = 7, and the gap stays 7 throughout, which is what makes it arithmetic.' },
      { type: 'mc', prompt: 'Which sequence is geometric?', choices: ['2, 5, 8, 11', '1, 4, 9, 16', '3, 6, 12, 24', '10, 8, 6, 4'], answer: 2, hint: 'Look for a constant multiplier, not a constant gap.', explain: 'Each term triples then doubles — specifically, each is twice the one before. The others add a fixed amount or follow the squares.' },
      { type: 'numeric', prompt: 'For the sequence 4, 7, 10, what is the 20th term?', answer: 61, hint: 'a₁ = 4, d = 3, and it takes 19 steps to reach term 20.', explain: '4 + (19)(3) = 4 + 57 = 61. Using 20 steps instead of 19 would give 64.' },
      { type: 'numeric', prompt: 'What is the sum of the whole numbers from 1 to 100?', answer: 5050, hint: 'Pair 1 with 100, 2 with 99 — each pair makes 101.', explain: '100(1 + 100) ÷ 2 = 100 × 101 ÷ 2 = 5050. Fifty pairs of 101.' },
      { type: 'mc', prompt: 'The difference between a sequence and a series is that a series is:', choices: ['a longer sequence', 'a sequence with no pattern', 'a sequence written backwards', 'the terms added together'], answer: 3, hint: 'One is a list, the other is a total.', explain: 'The sequence is the list of terms; the series is their sum.' },
    ],
  },

  /* ---- m26 -------------------------------------------------------------- */
  {
    id: 'm26', tag: 'Precalculus', title: 'Ratios That Only Care About Angle',
    subtitle: 'Day 26 · Right-angle trigonometry',
    pages: [
      { title: 'Shrink a triangle and the ratios survive', blocks: [
        { type: 'text', text: 'Take a right triangle and double every side. The triangle is larger, but the ratio of any two sides is exactly what it was. Those ratios depend only on the angles — never on the size.' },
        { type: 'text', text: 'That single fact is what makes trigonometry useful. Measure an angle and one side, and every other side follows, whether you are looking at a roof truss or a star.' },
        { type: 'visual', kind: 'rtriangle' },
      ]},
      { title: 'Three ratios, one mnemonic', blocks: [
        { type: 'formula', text: 'sin = opposite ÷ hypotenuse · cos = adjacent ÷ hypotenuse · tan = opposite ÷ adjacent', label: 'SOH CAH TOA' },
        { type: 'text', text: 'The hypotenuse is always the longest side, opposite the right angle. Which of the other two is "opposite" and which is "adjacent" depends on the angle you have chosen — that is the part worth slowing down for.' },
        { type: 'example', text: 'In a triangle with an angle of 30° and a hypotenuse of 10, the opposite side is 10 × sin(30°) = 10 × 0.5 = 5.' },
      ]},
      { title: 'Measuring what you cannot reach', blocks: [
        { type: 'text', text: 'Stand 50 metres from a tower and measure the angle up to its top as 40°. The height is 50 × tan(40°), roughly 42 metres. You have measured a building with a protractor and a tape measure.' },
        { type: 'callout', text: 'This is how the height of mountains was established before aircraft, and how the distance to nearby stars is found now — the same ratio, with the Earth’s orbit as the baseline instead of a field.' },
        { type: 'concept', term: 'Inverse trig', def: 'Going the other way: given a ratio, find the angle. Written sin⁻¹, cos⁻¹, tan⁻¹ — yet another operation paired with its undo.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 10 gave you a² + b² = c², which finds a missing side when you know two others. Trigonometry finds a missing side when you know one side and an angle. Between them, one side and one angle is enough to know a right triangle completely.' },
      ]},
    ],
    recap: [
      'In similar right triangles, side ratios depend on the angles alone.',
      'SOH CAH TOA: sin = opp/hyp, cos = adj/hyp, tan = opp/adj.',
      'Which side is opposite or adjacent depends on the chosen angle.',
      'Inverse trig turns a ratio back into an angle.',
    ],
    quiz: [
      { type: 'mc', prompt: 'In a right triangle, sin of an angle equals:', choices: ['opposite ÷ hypotenuse', 'adjacent ÷ hypotenuse', 'opposite ÷ adjacent', 'hypotenuse ÷ opposite'], answer: 0, hint: 'The S in SOH CAH TOA.', explain: 'Opposite over hypotenuse. Adjacent over hypotenuse is cosine.' },
      { type: 'numeric', prompt: 'A right triangle has hypotenuse 10 and an angle whose sine is 0.6. How long is the opposite side?', answer: 6, hint: 'sin = opposite ÷ hypotenuse, so rearrange.', explain: 'opposite = 10 × 0.6 = 6.' },
      { type: 'mc', prompt: 'Doubling every side of a right triangle changes its sine values:', choices: ['they double', 'they stay identical', 'they halve', 'they become negative'], answer: 1, hint: 'Both parts of the ratio doubled.', explain: 'Top and bottom both double, so the ratio is unchanged. That is exactly why trigonometry works at any scale.' },
      { type: 'mc', prompt: 'You know a ratio and want the angle that produced it. You use:', choices: ['the Pythagorean theorem', 'the quadratic formula', 'inverse trig, such as tan⁻¹', 'a logarithm'], answer: 2, hint: 'You need the undo of the trig function.', explain: 'Inverse trig turns a ratio back into an angle — yet another operation paired with its inverse.' },
      { type: 'mc', prompt: 'To find the height of a tower from 50 m away with an angle of 40°, you use:', choices: ['50 × sin(40°)', '50 × cos(40°)', '50 ÷ tan(40°)', '50 × tan(40°)'], answer: 3, hint: 'You know the adjacent side and want the opposite one.', explain: 'tan = opposite ÷ adjacent, so opposite = 50 × tan(40°), about 42 m.' },
    ],
  },

  /* ---- mr4 -------------------------------------------------------------- */
  {
    id: 'mr4', tag: 'Checkpoint', title: 'Checkpoint: Every Operation Has an Undo',
    subtitle: 'Review · Days 20 to 26',
    pages: [
      { title: 'One idea, seven days', blocks: [
        { type: 'text', text: 'These days looked like seven separate topics. They were one idea repeated: whenever mathematics hands you an operation, the useful question is what reverses it.' },
        { type: 'text', text: 'Multiplying is undone by factoring. Raising to a power is undone by roots, and taking a power of a base is undone by logarithms. Taking a ratio in a triangle is undone by inverse trig. The undo is almost always where the problem-solving power sits, because problems arrive stated forwards and need to be run backwards.' },
      ]},
      { title: 'Two families, over and over', blocks: [
        { type: 'text', text: 'Linear and exponential kept reappearing in different costumes: as rules, as curves, as sequences. Anything adding a fixed amount is one family; anything multiplying by a fixed factor is the other.' },
        { type: 'callout', text: 'Telling those two apart quickly is worth more than any formula on this list. It is the difference between a saving account and a debt spiral, between a rumour and an epidemic.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Every one of these turned up first in another lane, without the mathematics attached. Chemistry said pH 4 is a hundred times more acidic than pH 6 — that scale is a logarithm. Fossils & Deep Time halved an isotope every half-life, which is exponential decay. Business & Money compounded interest year on year, which is exponential growth. Physical Science measured a slope you would now find with a tangent ratio. You did not learn seven new things here; you learned the notation for things you had already met.' },
      ]},
      { title: 'What you can now do', blocks: [
        { type: 'text', text: 'Solve any quadratic, tidy or not. Simplify algebraic fractions and say which values are forbidden. Recognise exponential growth and read its curve. Solve for an exponent. Jump to the hundredth term of a pattern. Find a distance you cannot walk to.' },
        { type: 'text', text: 'That is a genuine Algebra II toolkit, and it is the foundation the next subject up — calculus — is built directly on top of.' },
      ]},
    ],
    recap: [
      'Every operation worth knowing has an inverse, and the inverse does the work.',
      'Factoring undoes multiplying; logarithms undo exponentials; inverse trig undoes ratios.',
      'Linear adds a fixed amount; exponential multiplies by a fixed factor.',
      'Exponential growth eventually beats every polynomial.',
      'One side and one angle determine a right triangle completely.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Which pair are inverses of each other?', choices: ['exponentials and logarithms', 'adding and multiplying', 'factoring and adding', 'sine and cosine'], answer: 0, hint: 'Which one undoes the other exactly?', explain: 'A logarithm answers what power produced a number, which is precisely undoing an exponential.' },
      { type: 'numeric', prompt: 'What is log₂(32)?', answer: 5, hint: 'How many 2s multiply together to give 32?', explain: '2⁵ = 32.' },
      { type: 'mc', prompt: 'x² − 16 factors into:', choices: ['(x − 4)(x − 4)', '(x + 4)(x − 4)', '(x + 8)(x − 2)', 'it cannot be factored'], answer: 1, hint: 'A difference of two squares.', explain: 'x² − 4² = (x + 4)(x − 4).' },
      { type: 'mc', prompt: 'The sequence 2, 6, 18, 54 is:', choices: ['arithmetic, difference 4', 'arithmetic, difference 12', 'geometric, ratio 3', 'neither'], answer: 2, hint: 'Is each step adding or multiplying?', explain: 'Each term is three times the previous one, so it is geometric with ratio 3.' },
      { type: 'mc', prompt: 'A quadratic with a negative discriminant has:', choices: ['two real solutions', 'one real solution', 'infinitely many solutions', 'no real solutions'], answer: 3, hint: 'What squares to give a negative?', explain: 'No real number does, so the parabola never meets the x-axis.' },
      { type: 'numeric', prompt: 'A right triangle has hypotenuse 20 and an angle whose cosine is 0.8. How long is the adjacent side?', answer: 16, hint: 'cos = adjacent ÷ hypotenuse.', explain: 'adjacent = 20 × 0.8 = 16.' },
      { type: 'mc', prompt: 'Which grows fastest for very large x?', choices: ['y = 2ˣ', 'y = x³', 'y = 1000x', 'y = x² + 500'], answer: 0, hint: 'One of these is not a polynomial.', explain: 'The exponential. It starts slowest and overtakes all of them permanently.' },
    ],
  },
];
