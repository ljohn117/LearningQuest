/* Statistics and probability — days 27 onward in the Mathematics lane.
 *
 * WHY IT LIVES HERE AND NOT IN A NEW LANE
 *
 * It was nearly built as a track called "Data & charts that lie", which was
 * the right content under a name that maps to nothing outside this app.
 * Statistics is a named subject taught everywhere, and putting it inside the
 * maths lane says the true thing: it is the next part of mathematics, not a
 * fourteenth tile on a grid the learner is 24% of the way through.
 *
 * WHAT IT BUILDS ON
 *
 * Five days already exist and are deliberately not repeated: m16 averages,
 * m17 counting, m18 probability, m19 scaling, mr3 the checkpoint that ties
 * them together. Those covered the CENTRE of a set of numbers and the basic
 * arithmetic of chance. Everything here is about the three things those days
 * could not reach:
 *
 *   where the numbers came from   (m27 sampling)
 *   how spread out they are        (m28 spread, m29 pictures)
 *   what follows from them          (m30 cause, m31-m32 probability, m33 uncertainty)
 *
 * THE SPINE
 *
 * Every day answers one question about a number somebody is showing you:
 * should you believe it, and what exactly is it claiming? That is the same
 * reflex the Logic lane teaches about sentences, applied to figures — which
 * is why the callbacks point there constantly.
 *
 * Band: this is genuinely the content of a first statistics course. The
 * arithmetic stays light on purpose; the difficulty is in the reasoning,
 * which is where it should be for a learner who reads well above his
 * arithmetic speed.
 */

export const STATISTICS = [
  /* ---- m27 -------------------------------------------------------------- */
  {
    id: 'm27', tag: 'Statistics', title: 'Where the Number Came From',
    subtitle: 'Day 27 · Samples and bias',
    pages: [
      { title: 'Nobody asks everyone', blocks: [
        { type: 'text', text: 'Almost every number you meet about people is based on a sample: a few thousand asked, and a conclusion drawn about millions. That is not cheating. Asking everyone is usually impossible, and a good sample genuinely does stand in for the whole.' },
        { type: 'concept', term: 'Population and sample', def: 'The population is everyone the claim is about. The sample is the part actually measured. The whole question is whether the sample resembles the population.' },
        { type: 'text', text: 'So the first question about any statistic is never "is the maths right". It is "who was asked, and who was not".' },
      ]},
      { title: 'How a sample goes wrong', blocks: [
        { type: 'text', text: 'A sample is biased when some people are systematically more likely to end up in it. Not by a little randomness — by a reason.' },
        { type: 'example', text: 'A survey about phone use, conducted by phone, misses everyone without a phone. A poll on a news website reaches only people who read that website. A question asked at a football ground finds surprising enthusiasm for football.' },
        { type: 'callout', text: 'Biased does not mean dishonest. Most bias is accidental, which is exactly why it is worth checking for rather than accusing anyone of.' },
      ]},
      { title: 'Why random is the fix', blocks: [
        { type: 'text', text: 'A random sample gives every member of the population the same chance of being picked. That does not guarantee a perfect miniature of the population — but it removes any systematic reason for the sample to lean one way.' },
        { type: 'text', text: 'There is a second trap: people who choose to answer are not a random group. Anyone furious enough to complete an online poll is different from everyone who scrolled past it.' },
        { type: 'concept', term: 'Self-selection', def: 'When people opt into the sample themselves. Almost always biased, because having a strong opinion is what made them answer.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic day 6 said one counterexample destroys a claim about all cases, and Government day 10 said everyone making a claim wants something. Sampling is those two ideas as arithmetic: a number about everyone is only as good as the group it was actually taken from.' },
      ]},
    ],
    recap: [
      'The population is who the claim is about; the sample is who was measured.',
      'Bias means some people were systematically more likely to be included.',
      'Random sampling removes systematic lean, not randomness itself.',
      'People who opt in to a survey are never a random group.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A radio phone-in finds 80% oppose a new road. The main problem is:', choices: ['only people who felt strongly rang in', 'the sample size is too small', 'the percentage was calculated wrongly', 'radio audiences are unusually old'], answer: 0, hint: 'Who chose to be in this sample?', explain: 'Self-selection. Anyone annoyed enough to ring a radio station is not a random slice of anyone.' },
      { type: 'mc', prompt: 'In "45% of UK adults own a bicycle", the population is:', choices: ['the 45%', 'all UK adults', 'the people surveyed', 'bicycle owners'], answer: 1, hint: 'Who is the claim actually about?', explain: 'All UK adults. The people surveyed are the sample; the 45% is the result.' },
      { type: 'mc', prompt: 'A random sample guarantees:', choices: ['a perfect miniature of the population', 'a large enough sample size', 'no systematic reason to lean one way', 'that the result is correct'], answer: 2, hint: 'Random removes a reason, not all error.', explain: 'It removes systematic bias. Ordinary random variation still remains, which is what day 33 is about.' },
      { type: 'mc', prompt: 'Surveying phone use by telephone is biased because it:', choices: ['is expensive to run', 'asks the wrong question', 'takes too long', 'misses everyone without a phone'], answer: 3, hint: 'Who could never end up in this sample?', explain: 'The people most relevant to the question are the ones the method cannot reach.' },
      { type: 'mc', prompt: 'The first question to ask about any statistic about people is:', choices: ['who was asked, and who was not?', 'is the arithmetic right?', 'is the number large?', 'who published it?'], answer: 0, hint: 'What comes before the maths?', explain: 'A perfectly calculated number from the wrong group is still wrong. The sample comes first.' },
    ],
  },

  /* ---- m28 -------------------------------------------------------------- */
  {
    id: 'm28', tag: 'Statistics', title: 'The Average Is Half the Story',
    subtitle: 'Day 28 · Spread',
    readiness: ['math:m16'],
    pages: [
      { title: 'Two groups, one average', blocks: [
        { type: 'text', text: 'Day 16 showed that the mean and the median can disagree. There is a second thing an average cannot tell you at all: how spread out the numbers are.' },
        { type: 'example', text: 'Class A scores 68, 70, 70, 72. Class B scores 20, 60, 80, 120. Both have a mean of 70. They are not remotely the same class.' },
        { type: 'callout', text: 'Reporting only an average is the commonest way to say something true and leave a false impression. It is not a lie; it is a half.' },
      ]},
      { title: 'Ways to say how spread out', blocks: [
        { type: 'concept', term: 'Range', def: 'Largest minus smallest. Instant to work out, and destroyed by a single unusual value.' },
        { type: 'text', text: 'A more robust approach cuts the sorted data into quarters. The middle half sits between the first quartile and the third, and the gap between those two — the interquartile range — ignores the extremes entirely.' },
        { type: 'formula', text: 'IQR = Q3 − Q1', label: 'the width of the middle half' },
      ]},
      { title: 'Why spread decides things', blocks: [
        { type: 'text', text: 'Two delivery firms both average 30 minutes. One ranges from 28 to 32; the other from 5 to 90. If you need to be somewhere, that difference matters more than the average does.' },
        { type: 'text', text: 'The same is true of rainfall, exam marks, wages and waiting times. In almost every practical decision, the spread is what you are actually exposed to.' },
        { type: 'callout', text: 'So whenever you are handed an average, the follow-up question is already written: compared with what, and how much do the numbers move around it?' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 16 gave you three kinds of average and said each one can mislead. This is the same move one level up: the average itself, however carefully chosen, is one number standing in for many, and spread is what it left out.' },
      ]},
    ],
    recap: [
      'Two very different sets of numbers can share an average.',
      'Range is largest minus smallest and is wrecked by one outlier.',
      'The interquartile range measures the middle half and ignores extremes.',
      'In most real decisions the spread matters more than the centre.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'What is the range of 4, 9, 11, 20?', answer: 16, hint: 'Largest minus smallest.', explain: '20 − 4 = 16.' },
      { type: 'mc', prompt: 'Two classes both average 70. Class A ranges 68–72, class B ranges 20–120. This tells you:', choices: ['class A is better taught', 'class B is far more spread out', 'the averages were miscalculated', 'class B has more students'], answer: 1, hint: 'What does the average leave out?', explain: 'Identical centres, wildly different spreads. Nothing here says which class is better — only that one is far more varied.' },
      { type: 'mc', prompt: 'The interquartile range is preferred over the range because it:', choices: ['is quicker to calculate', 'is always larger', 'ignores the extreme values', 'uses every single value'], answer: 2, hint: 'What wrecks a range?', explain: 'One freak value destroys a range. The IQR describes the middle half and shrugs off the extremes.' },
      { type: 'mc', prompt: 'Two delivery firms both average 30 minutes. You have a train to catch. You want:', choices: ['the one with more drivers', 'the one with the larger spread', 'either — the averages match', 'the one with the smaller spread'], answer: 3, hint: 'Which risk are you actually exposed to?', explain: 'The average is irrelevant to catching a train. What you care about is how bad the slow end gets.' },
      { type: 'numeric', prompt: 'For data with Q1 = 12 and Q3 = 27, what is the interquartile range?', answer: 15, hint: 'IQR = Q3 − Q1.', explain: '27 − 12 = 15 — the width of the middle half.' },
    ],
  },

  /* ---- m29 -------------------------------------------------------------- */
  {
    id: 'm29', tag: 'Statistics', title: 'Pictures That Argue',
    subtitle: 'Day 29 · Charts, honest and otherwise',
    pages: [
      { title: 'A chart is an argument', blocks: [
        { type: 'text', text: 'A graph feels like a neutral window onto the data. It is not. Every chart involves choices — what to plot, over what period, against what axis — and each choice pushes the reader somewhere.' },
        { type: 'text', text: 'None of those choices has to be dishonest. But the reader who does not notice a choice was made will absorb whatever the choice implies.' },
      ]},
      { title: 'The axis trick', blocks: [
        { type: 'text', text: 'The single most effective way to exaggerate a change is to start the vertical axis somewhere other than zero. A rise from 48% to 52% looks trivial from zero and looks like a landslide if the axis runs from 47 to 53.' },
        { type: 'callout', text: 'Neither version is a lie. The numbers are identical. The impression is completely different, which is precisely why looking at the axis before the shape is worth the half-second it costs.' },
        { type: 'text', text: 'A truncated axis is sometimes the honest choice — small changes in body temperature matter enormously. The problem is never the truncation; it is not saying so.' },
      ]},
      { title: 'Choosing what counts as the story', blocks: [
        { type: 'example', text: 'The same share price can be drawn over ten years (a steady climb), over one year (a wobble), or over one week (a catastrophe). All three are accurate. Only one gets published.' },
        { type: 'concept', term: 'Cherry-picking', def: 'Choosing the period or the subgroup that shows what you wanted, and presenting it as the whole picture.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'English day 4 said two true sentences can leave opposite impressions depending on word choice. Day 15 said percentage points and percent change are both honest descriptions of the same shift. A chart axis is that same trick in a picture, and it works on people who would have spotted it in a sentence.' },
      ]},
    ],
    recap: [
      'Every chart involves choices, and choices push the reader.',
      'Starting an axis away from zero exaggerates change.',
      'Truncating an axis is sometimes right — hiding that you did is not.',
      'Changing the period shown can reverse the apparent story.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A bar chart makes a small rise look enormous. The most likely reason is:', choices: ['the vertical axis does not start at zero', 'the bars were drawn too wide', 'the colours chosen exaggerate it', 'the underlying data is wrong'], answer: 0, hint: 'Look at the numbers on the side before the shape.', explain: 'A truncated axis magnifies any change. The data can be entirely accurate.' },
      { type: 'mc', prompt: 'Showing a share price over one week rather than ten years is:', choices: ['dishonest, and should not be done', 'accurate, but chosen to suit a story', 'always the more useful window', 'a straightforward calculation error'], answer: 1, hint: 'Is the week untrue?', explain: 'Both periods are accurate. Which one gets shown is a choice, and cherry-picking is choosing the flattering window and calling it the picture.' },
      { type: 'mc', prompt: 'Truncating an axis is legitimate when:', choices: ['it is never a legitimate choice', 'the chart looks better that way', 'the small changes matter, and it says so', 'the audience is expert enough'], answer: 2, hint: 'Think about body temperature.', explain: 'Between 36°C and 40°C is the whole story, and a zero-based axis would hide it. The rule is to say what you did.' },
      { type: 'mc', prompt: 'The first thing to check on an unfamiliar chart is:', choices: ['the title above the chart', 'the source printed underneath', 'the colours used for the bars', 'the axes and what they start at'], answer: 3, hint: 'What makes a shape mean something?', explain: 'Without the axes, a shape is decoration. The source matters too, but it cannot tell you what the picture is claiming.' },
      { type: 'mc', prompt: 'Support goes from 48% to 52%. Drawn on an axis from 47 to 53, it looks like:', choices: ['an enormous swing', 'a small change, as it is', 'no change at all', 'a decline'], answer: 0, hint: 'Four points across a six-point axis.', explain: 'It fills most of the chart. On a zero-based axis the same four points barely register.' },
    ],
  },

  /* ---- m30 -------------------------------------------------------------- */
  {
    id: 'm30', tag: 'Statistics', title: 'Moving Together Is Not Causing',
    subtitle: 'Day 30 · Correlation and cause',
    pages: [
      { title: 'Two things that rise together', blocks: [
        { type: 'text', text: 'Two measurements are correlated when they tend to move together. Ice cream sales and drownings both rise in summer. Shoe size and reading ability rise together across a primary school.' },
        { type: 'concept', term: 'Correlation', def: 'A tendency to move together. It says nothing at all about why.' },
        { type: 'text', text: 'Neither example involves one thing causing the other. Something else is moving both, and once you see it the correlation stops being mysterious.' },
      ]},
      { title: 'The three explanations', blocks: [
        { type: 'text', text: 'Whenever two things move together, there are exactly three possibilities worth checking, and only one of them is the exciting one.' },
        { type: 'text', text: 'A causes B. B causes A — which sounds silly until you try it, and it is often the one that survives. Or C causes both, which is the ice cream and the drownings: hot weather drives each, and neither touches the other.' },
        { type: 'concept', term: 'Confounder', def: 'A third thing driving both of the others. Summer, age, wealth and school year are the usual suspects.' },
      ]},
      { title: 'What would settle it', blocks: [
        { type: 'text', text: 'The way to find out is to change one thing yourself and hold everything else steady. That is what an experiment is, and it is why Biology day 10 insisted on changing one variable at a time.' },
        { type: 'callout', text: 'When you cannot run the experiment — you cannot assign people to smoke — the evidence has to be built from many studies that each rule out different confounders. That is slower, weaker per study, and still how most of what we know about health was established.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic day 3 said reversing an if-then gives a different claim, and day 4 said an argument can be valid and still false. Correlation-to-cause is the most common bad inference in adult life, and it is the same shape: the evidence fits the conclusion without supporting it.' },
      ]},
    ],
    recap: [
      'Correlation means moving together, and explains nothing by itself.',
      'Three candidates: A causes B, B causes A, or C causes both.',
      'A confounder is a third thing driving both.',
      'Changing one variable while holding others steady is what settles it.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Ice cream sales and drownings both rise together. The best explanation is:', choices: ['ice cream causes drowning', 'hot weather drives both', 'drowning causes ice cream sales', 'the data is faulty'], answer: 1, hint: 'What is happening in both cases?', explain: 'Summer is the confounder. It drives swimming and ice cream independently, and neither touches the other.' },
      { type: 'mc', prompt: 'Shoe size and reading ability correlate across a primary school because:', choices: ['bigger feet help with reading', 'reading makes feet grow', 'older children have both', 'it is a coincidence'], answer: 2, hint: 'What do a six-year-old and an eleven-year-old differ in?', explain: 'Age drives both. Within a single year group the correlation vanishes.' },
      { type: 'mc', prompt: 'A third thing driving two correlated measurements is called:', choices: ['a coefficient', 'a sample', 'an outlier', 'a confounder'], answer: 3, hint: 'It confuses the picture.', explain: 'A confounder. Finding it usually dissolves the mystery entirely.' },
      { type: 'mc', prompt: 'The strongest way to establish that A causes B is to:', choices: ['change A yourself, hold the rest steady', 'find a much bigger correlation', 'collect many more observations', 'check whether B happened later'], answer: 0, hint: 'What makes an experiment an experiment?', explain: 'Controlled change. More observations of the same correlation never rule out a confounder.' },
      { type: 'mc', prompt: '"B causes A" is worth checking because:', choices: ['it is nearly always the answer', 'the arrow often runs the other way', 'it is much easier to test for', 'it rules out any confounder'], answer: 1, hint: 'Do unhappy people exercise less, or does less exercise make people unhappy?', explain: 'It sounds silly until you try it, and it frequently survives when the obvious direction does not.' },
    ],
  },

  /* ---- m31 -------------------------------------------------------------- */
  {
    id: 'm31', tag: 'Statistics', title: 'And, Or, and Not Quite Independent',
    subtitle: 'Day 31 \u00b7 Combining probabilities',
    readiness: ['math:m18'],
    pages: [
      { title: 'Two events, two questions', blocks: [
        { type: 'text', text: 'Day 18 gave you the probability of one thing. Almost every real question involves two: will it rain AND will the train be late, will I draw a red card OR a face card.' },
        { type: 'formula', text: 'P(A and B) = P(A) \u00d7 P(B)', label: 'only when A and B are independent' },
        { type: 'text', text: 'Two coin flips are independent, so two heads is \u00bd \u00d7 \u00bd = \u00bc. Multiplying is why a run of luck gets rare so quickly \u2014 each extra condition shrinks the answer.' },
      ]},
      { title: 'When multiplying is wrong', blocks: [
        { type: 'text', text: 'The formula has a condition attached, and it is the condition that gets forgotten. If one event changes the odds of the other, they are not independent and plain multiplication overstates or understates the answer.' },
        { type: 'example', text: 'Drawing two aces from a deck without replacing the first is 4/52 \u00d7 3/51, not 4/52 \u00d7 4/52. Taking the first ace out changed what was left.' },
        { type: 'callout', text: 'The test is simple: does knowing that one happened change your estimate of the other? If yes, they are not independent, and the shortcut does not apply.' },
      ]},
      { title: 'Or, and the double count', blocks: [
        { type: 'formula', text: 'P(A or B) = P(A) + P(B) \u2212 P(both)', label: 'subtract the overlap, or you count it twice' },
        { type: 'text', text: 'In a deck, red cards are 26 and face cards are 12, but adding them gives 38 and the true answer is 32 \u2014 because the six red face cards got counted in both halves.' },
        { type: 'text', text: 'That subtraction is the whole of it. When A and B cannot both happen, the overlap is zero and you simply add.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic day 2 said AND needs both and OR needs at least one, and that logical OR includes the case where both are true. That inclusive OR is exactly why the overlap has to be subtracted here \u2014 the same rule, now with numbers attached.' },
      ]},
    ],
    recap: [
      'P(A and B) = P(A) \u00d7 P(B), but only if they are independent.',
      'Independent means knowing one does not change the odds of the other.',
      'Drawing without replacement breaks independence.',
      'P(A or B) adds them and subtracts the overlap.',
    ],
    quiz: [
      { type: 'mc', prompt: 'What is the probability of two heads in two fair coin flips?', choices: ['1 in 2', '1 in 3', '1 in 4', '2 in 3'], answer: 2, hint: 'Independent events multiply.', explain: '\u00bd \u00d7 \u00bd = \u00bc. The coin has no memory, so the flips are independent.' },
      { type: 'mc', prompt: 'Drawing two aces WITHOUT replacing the first is 4/52 \u00d7 3/51 because:', choices: ['the deck had just been shuffled', 'the order of the draws matters', 'aces behave differently to other cards', 'removing the first changed what was left'], answer: 3, hint: 'Is the second draw from the same deck?', explain: 'The events are not independent. One card fewer, one ace fewer, so the second probability changes.' },
      { type: 'mc', prompt: 'Two events are independent when:', choices: ['knowing one does not change the other', 'they cannot possibly both happen', 'they have exactly equal probability', 'they happen at the very same time'], answer: 0, hint: 'It is about information, not timing.', explain: 'That is the whole definition, and it is the condition on multiplying.' },
      { type: 'numeric', prompt: 'A deck has 26 red cards and 12 face cards, 6 of which are red. How many cards are red OR a face card?', answer: 32, hint: 'Add them, then subtract the overlap.', explain: '26 + 12 \u2212 6 = 32. Adding to 38 counts the red face cards twice.' },
      { type: 'mc', prompt: 'You add two probabilities without subtracting anything when:', choices: ['they are independent', 'they cannot both happen', 'they are equally likely', 'never'], answer: 1, hint: 'How big is the overlap then?', explain: 'If they cannot both occur, the overlap is zero and there is nothing to subtract.' },
    ],
  },

  /* ---- m32 -------------------------------------------------------------- */
  {
    id: 'm32', tag: 'Statistics', title: 'The Test Said Yes. Now What?',
    subtitle: 'Day 32 \u00b7 Conditional probability and base rates',
    readiness: ['math:m18'],
    pages: [
      { title: 'A very accurate test', blocks: [
        { type: 'text', text: 'A disease affects 1 person in 1,000. A test for it is 99% accurate: it catches everyone who has it, and wrongly flags only 1% of healthy people. Your test comes back positive. What is the chance you have the disease?' },
        { type: 'text', text: 'Almost everyone says 99%. Doctors say 99%. The answer is closer to 9%, and the reason is not a trick \u2014 it is that the question was about a different probability than the one everybody answered.' },
      ]},
      { title: 'Count actual people', blocks: [
        { type: 'text', text: 'Take 10,000 people. About 10 have the disease, and the test finds all 10. The other 9,990 are healthy, and 1% of them \u2014 about 100 people \u2014 get a false positive anyway.' },
        { type: 'example', text: 'So 110 people test positive, and only 10 of them are ill. 10 out of 110 is roughly 9%. Nothing about the test was inaccurate; there were simply far more healthy people available to be wrongly flagged.' },
        { type: 'concept', term: 'Base rate', def: 'How common the thing is to begin with. When it is rare, false positives from the huge healthy group swamp the true positives.' },
      ]},
      { title: 'Two different questions', blocks: [
        { type: 'text', text: 'The confusion is between two sentences that sound identical and are not: the chance of testing positive given that you are ill, and the chance of being ill given that you tested positive.' },
        { type: 'formula', text: 'P(ill | positive) \u2260 P(positive | ill)', label: 'the bar means "given that"' },
        { type: 'callout', text: 'This is the single most consequential mistake in this entire lane. It runs through medicine, security screening, courtrooms and spam filters, and the fix is always the same: count actual people out of a real total.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic day 3 said that reversing an if-then produces a different claim \u2014 rain guarantees a cancelled game, but a cancelled game does not guarantee rain. This is that identical reversal wearing numbers, and it fools people who would spot it instantly in words.' },
      ]},
    ],
    recap: [
      'P(A given B) and P(B given A) are different numbers.',
      'When a condition is rare, most positive tests are false positives.',
      'The base rate is how common it was before any test.',
      'Counting actual people out of a real total makes it obvious.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A disease affects 1 in 1,000. A 99%-accurate test says you have it. Roughly what is the chance you do?', choices: ['about 99%', 'about 50%', 'about 9%', 'about 1%'], answer: 2, hint: 'Count 10,000 people: 10 ill, and 1% of the rest wrongly flagged.', explain: '10 true positives against about 100 false ones. 10 of 110 is around 9%.' },
      { type: 'mc', prompt: 'Most positives are false when:', choices: ['the test was badly designed', 'the test gets run more than once', 'the sample used was far too small', 'the condition is rare to begin with'], answer: 3, hint: 'Who is there more of?', explain: 'A rare condition means an enormous healthy group, and even a tiny error rate on that group produces a lot of false positives.' },
      { type: 'mc', prompt: '"The chance of being ill given a positive test" and "the chance of a positive test given illness" are:', choices: ['different numbers', 'the same number', 'always both 50%', 'the same if the test is accurate'], answer: 0, hint: 'Compare it to reversing an if-then.', explain: 'Reversing the condition gives a different question entirely. Treating them as equal is the base rate fallacy.' },
      { type: 'mc', prompt: 'The base rate is:', choices: ['how accurate the test happens to be', 'how common the thing is beforehand', 'the number of people who were tested', 'the rate of false positives it gives'], answer: 1, hint: 'It is about the world, not the test.', explain: 'How common it was to begin with. Ignoring it is what makes the answer feel so wrong.' },
      { type: 'numeric', prompt: 'Of 10,000 people, 10 are ill and all test positive. 100 healthy people also test positive. How many positives are there in total?', answer: 110, hint: 'True positives plus false positives.', explain: '10 + 100 = 110, of whom only 10 are actually ill.' },
    ],
  },

  /* ---- m33 -------------------------------------------------------------- */
  {
    id: 'm33', tag: 'Statistics', title: 'How Wrong Is It Allowed to Be?',
    subtitle: 'Day 33 \u00b7 Samples and uncertainty',
    readiness: ['math:m27'],
    pages: [
      { title: 'Every sample wobbles', blocks: [
        { type: 'text', text: 'Ask 1,000 randomly chosen people and you will get one answer. Ask a different 1,000 and you will get a slightly different one. Nothing went wrong \u2014 that variation is unavoidable, and it can be measured.' },
        { type: 'concept', term: 'Margin of error', def: 'How far the true value is likely to sit from what the sample found. Usually quoted as plus or minus a few percentage points.' },
        { type: 'text', text: 'So "52%, margin of error 3 points" is not a claim that 52% is right. It is a claim that the truth is probably somewhere between 49% and 55%.' },
      ]},
      { title: 'Why that changes the headline', blocks: [
        { type: 'example', text: 'A poll puts one side on 52% and the other on 48%, with a margin of error of 3 points. The two ranges are 49\u201355 and 45\u201351. They overlap, so the poll does not actually establish who is ahead.' },
        { type: 'callout', text: '"Too close to call" is not journalists hedging. It is the arithmetic: when the gap is smaller than the margin, the poll genuinely has not answered the question.' },
      ]},
      { title: 'Bigger samples, slowly', blocks: [
        { type: 'text', text: 'Larger samples narrow the margin, but with sharply diminishing returns \u2014 roughly, quadrupling the sample halves the error. Going from 1,000 to 4,000 people is a great deal of work for one halving.' },
        { type: 'text', text: 'And no sample size fixes bias. A biased sample of a million is worse than a random sample of a thousand, because it is confidently wrong instead of honestly uncertain.' },
        { type: 'callout', text: 'That is the sentence worth keeping from this whole lane: size fixes noise, and nothing except method fixes bias.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 27 asked where the number came from and day 28 asked how spread out the data was. A margin of error is those two questions answered at once \u2014 it is the spread of what different honest samples would have found.' },
      ]},
    ],
    recap: [
      'Different random samples give slightly different answers.',
      'A margin of error says how far the truth probably sits from the sample.',
      'When the gap is smaller than the margin, nothing has been established.',
      'Bigger samples reduce noise; only better method reduces bias.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A poll says 52% with a margin of error of 3 points. That means the truth is probably:', choices: ['exactly 52%', 'below 52%', 'between 49% and 55%', 'above 55%'], answer: 2, hint: 'Plus or minus three.', explain: '52 \u00b1 3. The single number is the middle of a range, not the answer.' },
      { type: 'mc', prompt: '52% against 48%, margin of error 3 points. The correct conclusion is:', choices: ['the first side is ahead', 'the second side is ahead', 'the poll was done badly', 'it is too close to call'], answer: 3, hint: 'Do 49\u201355 and 45\u201351 overlap?', explain: 'The ranges overlap, so the poll has not established a leader. That phrase is arithmetic, not hedging.' },
      { type: 'mc', prompt: 'To halve the margin of error you must roughly:', choices: ['quadruple the sample', 'double the sample', 'halve the sample', 'ask better questions'], answer: 0, hint: 'The returns diminish sharply.', explain: 'Four times the people for half the error, which is why polls stop at around a thousand.' },
      { type: 'mc', prompt: 'A biased sample of a million compared with a random sample of a thousand is:', choices: ['better, because it is bigger', 'worse, because size cannot fix bias', 'the same', 'better only for rare events'], answer: 1, hint: 'What does size actually fix?', explain: 'Size reduces random noise and does nothing about a systematic lean. The big biased sample is confidently wrong.' },
      { type: 'mc', prompt: 'Two honest polls taken the same week give slightly different numbers. This means:', choices: ['one of the two must be wrong', 'the population itself changed', 'ordinary sampling variation happened', 'both of them were biased'], answer: 2, hint: 'Different thousand people, slightly different answer.', explain: 'That wobble is expected and is exactly what the margin of error describes.' },
    ],
  },

  /* ---- mr5 -------------------------------------------------------------- */
  {
    id: 'mr5', tag: 'Checkpoint', title: 'Checkpoint: Reading a Number in the Wild',
    subtitle: 'Review \u00b7 Days 27 to 33',
    pages: [
      { title: 'One reflex, seven days', blocks: [
        { type: 'text', text: 'Every day in this run was a different way of asking the same thing about a number somebody is showing you: what exactly is it claiming, and should you believe it?' },
        { type: 'text', text: 'Where did it come from, and who was left out. What is the spread, not just the middle. What do the axes say. Is this cause, or just company. Are these events really independent. Which conditional is being answered. And how much is it allowed to be wrong by.' },
      ]},
      { title: 'The order to ask them in', blocks: [
        { type: 'callout', text: 'Sample first, always. A perfectly calculated, beautifully drawn, carefully caveated number taken from the wrong group is still wrong, and no later step repairs it. Everything else is worth checking only once the sample survives.' },
        { type: 'text', text: 'After that: what does the number actually say, what is it being compared with, and how uncertain is it. Four questions, in that order, handle almost everything you will meet.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'This is the Logic lane with numbers instead of sentences. Logic day 4 separated a valid argument from a true one; Government day 10 asked who benefits from a claim; English day 8 asked how a source came to know. Statistics is those habits applied to figures, which is where most adults stop applying them.' },
      ]},
    ],
    recap: [
      'Ask where the number came from before anything else.',
      'An average hides the spread; a chart hides its axis.',
      'Correlation offers three explanations and only one is causation.',
      'A rare condition makes most positive tests false.',
      'Size fixes noise; only method fixes bias.',
    ],
    quiz: [
      { type: 'mc', prompt: 'The first question to ask about any statistic is:', choices: ['is the arithmetic right?', 'who published it?', 'how big is the number?', 'where did the sample come from?'], answer: 3, hint: 'Which error can no later step repair?', explain: 'The sample. Everything downstream is wasted if the group was wrong.' },
      { type: 'mc', prompt: 'Two things rise together. The explanation you should check LAST is:', choices: ['the first causes the second', 'the second causes the first', 'a third thing drives both', 'the data is wrong'], answer: 0, hint: 'Which one does everybody assume immediately?', explain: 'The obvious direction is the one already assumed. Checking the confounder and the reversed arrow first is what catches the error.' },
      { type: 'numeric', prompt: 'A poll reports 46% with a margin of error of 4 points. What is the highest the true value probably is?', answer: 50, hint: 'Add the margin.', explain: '46 + 4 = 50. The range runs 42 to 50.' },
      { type: 'mc', prompt: 'A rare disease and a very accurate test produce mostly false positives because:', choices: ['the test is faulty', 'the healthy group is enormous', 'the sample was biased', 'the base rate is high'], answer: 1, hint: 'A tiny error rate on a huge group.', explain: '1% of nearly everybody outnumbers 100% of very few.' },
      { type: 'mc', prompt: 'Doubling a biased sample makes the result:', choices: ['twice as reliable', 'random', 'no less biased', 'accurate'], answer: 2, hint: 'What does size actually fix?', explain: 'Bias is systematic. More of the same lean is just more lean, measured more precisely.' },
      { type: 'mc', prompt: 'An average with no spread reported tells you:', choices: ['everything there is about the data', 'the size of the sample used', 'the range the values cover', 'the centre, but not the variation'], answer: 3, hint: 'Two classes, both averaging 70.', explain: 'One number standing in for many. Spread is what it left out.' },
    ],
  },
];