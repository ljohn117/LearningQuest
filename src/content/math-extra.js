/* Mathematics, days 15 onward.
 *
 * APPENDED, never inserted. Progress is keyed `math:<dayId>`, so the one
 * unforgivable move here is renumbering: m1 through m14, mr1 and mr2 keep
 * their ids forever, and everything below starts at m15. Nothing above is
 * touched, reordered or retitled. scripts/test.mjs now holds a frozen list
 * of every existing day id so this stays true after I am not the one editing
 * it.
 *
 * The lane previously ran ratios to quadratics — a clean arithmetic-to-
 * algebra spine. What it had no version of at all is the other half of
 * school mathematics: the part about quantities that describe the world
 * rather than solve for x. Percent change, averages, counting, probability,
 * scaling.
 *
 * These six days share a spine of their own, and it is deliberately not
 * "more topics". Every one of them is a place where ordinary intuition is
 * confidently, predictably wrong:
 *
 *   m15  a 20% cut and a 20% rise do not cancel
 *   m16  the average can be true and still mislead
 *   m17  choices multiply, so small numbers explode
 *   m18  a coin has no memory
 *   m19  doubling a thing does not double what matters about it
 *
 * That framing matters for this kid specifically. He does not need to be
 * told he is capable; he needs to find out that the confident answer is
 * often wrong, including when it is his own and including when it is an
 * adult's. Being the person in the room who checks is a better thing to
 * hand him than another correct procedure.
 *
 * Band check: this is squarely middle school — percent change and averages
 * are grade 6-7, counting and probability grade 7-8. Nothing here drifts up
 * into Algebra II, and the prose sits above the existing math days, which
 * the audit had flagged as reading below the target band.
 */

export const MATH_EXTRA = [
  /* ---- m15 -------------------------------------------------------------- */
  {
    id: 'm15', tag: 'Grade 6–7', title: 'Percent Change, and the Trap',
    subtitle: 'Day 15 · Why a discount and a markup do not cancel',
    pages: [
      { title: 'Change is measured from where you started', blocks: [
        { type: 'text', text: 'A price goes from $40 to $50. That is a $10 rise — but is it a 20% rise or a 25% one? It depends entirely on which number you compare against, and the rule is that you always compare against where you started.' },
        { type: 'formula', text: 'percent change = (new − old) ÷ old × 100', label: 'the bottom is always the starting value' },
        { type: 'text', text: '$40 to $50 is 10 ÷ 40 = 25%. Going back down, $50 to $40 is 10 ÷ 50 = 20%. Same ten dollars, different percentage, because the starting point moved.' },
      ]},
      { title: 'Which is why they do not cancel', blocks: [
        { type: 'text', text: 'A $100 jacket is cut by 20%, so it costs $80. The sale ends and the price goes back up by 20%. It does not return to $100.' },
        { type: 'example', text: '20% of $80 is $16, so the price becomes $96. The cut was 20% of a hundred; the rise was 20% of eighty. The percentages match but the amounts do not, because the number underneath them changed.' },
        { type: 'callout', text: 'Every percentage is secretly a percentage OF something. Two percentages are only comparable when that something is the same.' },
      ]},
      { title: 'Percent, or percentage points', blocks: [
        { type: 'text', text: 'A survey says support went from 5% to 7%. You can describe that in two completely different, completely true ways: it rose by 2 percentage points, or it rose by 40%.' },
        { type: 'text', text: 'Both are correct. One sounds trivial and one sounds enormous. Anyone reporting the number gets to pick which impression you walk away with, and most people never notice a choice was made.' },
        { type: 'concept', term: 'Percentage point', def: 'The plain difference between two percentages. Distinct from percent change, which compares that difference against the starting value.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 2 said a percent is a ratio out of a hundred — and a ratio is meaningless until you know what it is a ratio TO. Logic said a claim can be perfectly true and still built to mislead. Percentage points are where those two facts meet, in a newspaper, most weeks.' },
      ]},
    ],
    recap: [
      'Percent change always divides by the starting value.',
      'A 20% cut then a 20% rise lands below where you began.',
      'A percentage is always a percentage OF something.',
      'Percentage points and percent change are different numbers for the same shift.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'A $200 coat is discounted 25%. What does it cost now, in dollars?', answer: 150, hint: '25% of 200 is the amount taken off.', explain: '25% of $200 is $50, so the coat is $150.' },
      { type: 'numeric', prompt: 'That $150 coat then goes back up by 25%. What does it cost now, in dollars?', answer: 187.5, hint: 'The 25% is now taken from 150, not from 200.', explain: '25% of $150 is $37.50, giving $187.50 — still below the original $200, because the rise was calculated from a smaller number.' },
      { type: 'mc', prompt: 'Support rises from 4% to 6%. Which statement is TRUE?', choices: ['it rose 50 percentage points', 'it rose by 2 percentage points', 'it doubled', 'it rose 2%'], answer: 1, hint: 'A percentage point is the plain gap between the two percentages.', explain: 'Two percentage points — which is also a 50% increase. Both are true; "it rose 2%" is the one that is not.' },
      { type: 'mc', prompt: 'A price rises from $80 to $100, then falls from $100 back to $80. The percentages are:', choices: ['a 20% rise then a 25% fall', 'both 25%', 'both 20%', 'a 25% rise then a 20% fall'], answer: 3, hint: 'Divide by the starting value each time.', explain: '20 ÷ 80 = 25% up; 20 ÷ 100 = 20% down. The same twenty dollars, two different percentages.' },
    ],
  },

  /* ---- m16 -------------------------------------------------------------- */
  {
    id: 'm16', tag: 'Grade 6–7', title: 'Averages, and Which One Lies',
    subtitle: 'Day 16 · Three ways to say "typical"',
    pages: [
      { title: 'The mean shares everything out', blocks: [
        { type: 'text', text: 'Add it all up, divide by how many. That is the mean, and it answers a precise question: if everyone had an equal share, how much would each get?' },
        { type: 'concept', term: 'Mean', def: 'The total divided by the count. It uses every value, which is both its strength and its weakness.' },
      ]},
      { title: 'One huge value drags it', blocks: [
        { type: 'text', text: 'Five people in a room earn $30,000 each. A billionaire walks in. The mean income in that room is now over $166 million, and it describes precisely nobody in it.' },
        { type: 'text', text: 'Nothing has gone wrong with the arithmetic. The mean did exactly what it promises — shared the total out equally — and the honest answer to "what does a typical person here earn" is still thirty thousand dollars.' },
      ]},
      { title: 'The median just stands in the middle', blocks: [
        { type: 'text', text: 'Line the values up in order and take the one in the middle. In that room the median is $30,000, billionaire or not, because the median counts positions rather than amounts.' },
        { type: 'concept', term: 'Median', def: 'The middle value once the data is sorted. Extreme values move it barely or not at all.' },
        { type: 'example', text: 'Which is why house prices and incomes are almost always reported as medians. A handful of enormous values would make the mean useless for anyone deciding whether they can afford to live somewhere.' },
      ]},
      { title: 'So ask which one they chose', blocks: [
        { type: 'text', text: 'Neither average is a lie. But whoever writes the headline picks one, and if the mean and the median are far apart, that choice is doing serious work.' },
        { type: 'callout', text: 'The useful question is never "is this number true". It is "why did they pick THIS number".' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Earth & Space day 4 separated weather from climate: one cold week says nothing about a warming decade, because climate IS an average and a single day is a single value. You already know that an average and one observation answer different questions. This is that idea with the arithmetic attached.' },
      ]},
    ],
    recap: [
      'The mean is the total shared equally; it uses every value.',
      'One extreme value can drag the mean far from typical.',
      'The median is the middle value and largely ignores extremes.',
      'When mean and median disagree, ask why the reported one was chosen.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'Find the mean of 4, 6, 6, 8, 11.', answer: 7, hint: 'Add them, then divide by how many there are.', explain: '4 + 6 + 6 + 8 + 11 = 35, and 35 ÷ 5 = 7.' },
      { type: 'numeric', prompt: 'Find the median of 4, 6, 6, 8, 11.', answer: 6, hint: 'They are already in order — take the middle one.', explain: 'The third of five values is 6.' },
      { type: 'mc', prompt: 'Four friends earn $20,000 each and a fifth earns $5,000,000. The better description of a typical income here is the:', choices: ['largest value', 'total', 'median, because extremes barely move it', 'mean, because it uses every value'], answer: 2, hint: 'Which number would describe the four of them?', explain: 'The median is $20,000. The mean is over a million and describes nobody in the group.' },
      { type: 'mc', prompt: 'The mean of a group is much higher than the median. This usually means:', choices: ['a few values sit far above the rest', 'most values are above average', 'the data was recorded wrongly', 'the group is very large'], answer: 0, hint: 'Which average gets dragged by one enormous value?', explain: 'The mean uses every value, so one billionaire pulls it upward. The median just steps to the middle and barely notices.' },
    ],
  },

  /* ---- m17 -------------------------------------------------------------- */
  {
    id: 'm17', tag: 'Grade 7', title: 'Counting Without Counting',
    subtitle: 'Day 17 · When choices multiply',
    pages: [
      { title: 'Choices multiply, they do not add', blocks: [
        { type: 'text', text: 'Three shirts and four pairs of trousers. Not seven outfits — twelve. Every shirt can go with every pair, so the choices multiply.' },
        { type: 'formula', text: 'ways = choices₁ × choices₂ × choices₃ …', label: 'one factor for each independent decision' },
      ]},
      { title: 'Add more decisions and it runs away', blocks: [
        { type: 'text', text: 'Add two pairs of shoes and it is 3 × 4 × 2 = 24. Add a choice of jacket and it is 48. Each new decision does not add a handful of options, it multiplies everything that came before.' },
        { type: 'example', text: 'A four-digit PIN has ten choices in each of four positions: 10 × 10 × 10 × 10 = 10,000. Add one more digit and you have not gained ten thousand more — you have gained ninety thousand.' },
      ]},
      { title: 'Sometimes order matters, sometimes it does not', blocks: [
        { type: 'text', text: 'Picking a first, second and third place from five runners is not the same as picking three of them to be on a team. Gold-silver-bronze cares who came first; the team does not.' },
        { type: 'text', text: 'First, second and third from five: 5 × 4 × 3 = 60 ways. A team of three from five: those same 60, divided by the 6 orders each trio could have been picked in, which gives 10.' },
        { type: 'callout', text: 'Ask it out loud before you calculate: does swapping two of my picks give a different answer? If not, you have counted every group more than once.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Computer Science day 2 said each binary place doubles the possibilities: two choices, ten times over, is 2¹⁰ = 1,024. Mathematics day 7 called the same thing an exponent. This is where that number comes from — an exponent is just this counting rule when every decision has the same number of options.' },
      ]},
    ],
    recap: [
      'Independent choices multiply rather than add.',
      'Each extra decision multiplies everything before it.',
      'Order matters for rankings and not for groups.',
      'An exponent is this rule with the same options every time.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'A menu has 4 mains and 3 desserts. How many different two-course meals?', answer: 12, hint: 'Every main can pair with every dessert.', explain: '4 × 3 = 12.' },
      { type: 'numeric', prompt: 'A lock has 3 dials, each with digits 0 to 9. How many combinations?', answer: 1000, hint: 'Ten choices, three times over.', explain: '10 × 10 × 10 = 1,000.' },
      { type: 'numeric', prompt: 'In how many orders can 4 runners finish a race?', answer: 24, hint: 'Four choices for first, then three left for second, and so on.', explain: '4 × 3 × 2 × 1 = 24.' },
      { type: 'mc', prompt: 'Choosing 2 people from 6 to share a prize equally is:', choices: ['15 ways, because order does not matter', '36 ways', '30 ways, because order matters', '12 ways'], answer: 0, hint: 'Does it change anything if you pick the same two in the other order?', explain: '6 × 5 = 30 ordered picks, but each pair was counted twice, so 15.' },
    ],
  },

  /* ---- m18 -------------------------------------------------------------- */
  {
    id: 'm18', tag: 'Grade 7–8', title: 'Probability',
    subtitle: 'Day 18 · Putting a number on "maybe"',
    pages: [
      { title: 'A number between never and certain', blocks: [
        { type: 'text', text: 'Probability runs from 0 to 1. Zero is impossible, one is certain, and everything real sits between. A half means that out of every two chances you would expect it once — not that it alternates.' },
        { type: 'formula', text: 'probability = outcomes you want ÷ outcomes possible', label: 'when every outcome is equally likely' },
      ]},
      { title: 'So counting is most of the work', blocks: [
        { type: 'text', text: 'Roll a die and want an even number. Three outcomes qualify out of six possible, so the probability is 3/6, which is 1/2. Yesterday you learned how to count possibilities properly, and that turns out to be the hard part of nearly every probability question.' },
        { type: 'example', text: 'Two coins have four equally likely results — HH, HT, TH, TT. Exactly one head happens in two of them, so the probability is 2/4. People guess a third, because they forget HT and TH are different results.' },
      ]},
      { title: 'Independent events multiply', blocks: [
        { type: 'text', text: 'If one event does not affect another, the chance of both is the two probabilities multiplied. Two heads in a row is 1/2 × 1/2 = 1/4. Ten heads in a row is 1/2 multiplied ten times, which is 1 in 1,024.' },
        { type: 'callout', text: 'That is 2¹⁰ again — the same number as ten binary places. Nothing about that is a coincidence: both are counting the ways ten two-way choices can land.' },
      ]},
      { title: 'A coin does not remember', blocks: [
        { type: 'text', text: 'Nine heads in a row have just come up. What is the chance the next flip is tails? Exactly one half. The coin has no memory, no sense of fairness, and no obligation to even things out.' },
        { type: 'text', text: 'Ten heads in a row is rare BEFORE you start — 1 in 1,024. Once nine have landed, the rarity is already spent, and only one flip is left to predict.' },
        { type: 'concept', term: 'Gambler’s fallacy', def: 'Believing that past independent results change the next one. They do not — that is what independent means.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic day 5 catalogued the ways confident reasoning goes wrong. This is one of them, with numbers attached — and Biology day 4 already had you doing probability without the name, because a 3:1 Punnett result is exactly a statement that one outcome in four is expected.' },
      ]},
    ],
    recap: [
      'Probability runs 0 to 1: impossible to certain.',
      'With equally likely outcomes, count the ones you want over the total.',
      'Independent probabilities multiply.',
      'Past independent results never change the next one.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'Rolling one die, what is the probability of a 5? Type the bottom number: 1 over what?', answer: 6, hint: 'One outcome you want, out of how many possible?', explain: 'One face out of six, so 1/6.' },
      { type: 'numeric', prompt: 'Flipping three coins, how many equally likely results are there in total?', answer: 8, hint: 'Two choices, three times over.', explain: '2 × 2 × 2 = 8 — the counting rule from day 17 doing the work again.' },
      { type: 'mc', prompt: 'A fair coin lands heads six times in a row. The chance of heads on the next flip is:', choices: ['less than half — tails is due', 'exactly half', 'more than half — heads is on a run', 'impossible to say'], answer: 1, hint: 'Does the coin know what it did before?', explain: 'The coin has no memory and no way to store those six flips. Every flip is half, forever.' },
      { type: 'mc', prompt: 'Two coins are flipped. The probability of exactly one head is:', choices: ['1/4', '3/4', '1/3, since there are three outcomes', '1/2, because HT and TH both count'], answer: 3, hint: 'List all four results before you decide.', explain: 'HH, HT, TH, TT — two of the four have exactly one head, so 2/4 = 1/2.' },
    ],
  },

  /* ---- m19 -------------------------------------------------------------- */
  {
    id: 'm19', tag: 'Grade 7–8', title: 'Why Size Changes Everything',
    subtitle: 'Day 19 · Area squares, volume cubes',
    pages: [
      { title: 'They do not grow at the same speed', blocks: [
        { type: 'text', text: 'Take a cube and double every side. Its surface area does not double — it goes up four times. Its volume goes up eight times. The shape is identical and nothing about it is proportional.' },
        { type: 'formula', text: 'area ∝ side²   ·   volume ∝ side³', label: 'the exponents are the whole story' },
        { type: 'text', text: 'Double the side and area picks up a factor of 2² = 4, while volume picks up 2³ = 8. Triple it and they are 9 and 27.' },
      ]},
      { title: 'So big things have relatively less skin', blocks: [
        { type: 'text', text: 'Volume outruns surface area, which means the bigger something gets, the less outside it has for each unit of inside. A large animal has proportionally less skin than a small one, even though it obviously has more skin.' },
        { type: 'example', text: 'This is why a mouse must eat almost constantly and an elephant does not. The mouse is losing heat across a surface that is enormous compared to the small body producing it.' },
      ]},
      { title: 'And why some things simply cannot be scaled up', blocks: [
        { type: 'text', text: 'An insect scaled to the size of a dog would collapse. Its weight would grow with volume, cubed, while the cross-section of leg holding that weight grows with area, squared. Weight wins, and quickly.' },
        { type: 'text', text: 'The same arithmetic caps mountains: rock can only bear so much weight per unit of area before it deforms, and a mountain gains weight faster than it gains base. There is a ceiling, and Everest is not far under it.' },
        { type: 'callout', text: 'Giant insects in films are not merely unlikely. They are ruled out by two exponents.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 7 gave you exponents and said the exponent does all the work. Here is the strongest case of that in the whole lane: the ONLY difference between area and volume is 2 against 3, and that one-digit gap decides how big an animal can get, why a mountain stops growing, and how fast a fire spreads through sawdust rather than a log.' },
      ]},
    ],
    recap: [
      'Double the side: area ×4, volume ×8.',
      'Volume outruns surface area, so big things have relatively less surface.',
      'Small animals lose heat fast and must eat constantly.',
      'Scaling up fails because weight grows cubed while support grows squared.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'A cube’s sides are doubled. Its volume is multiplied by what?', answer: 8, hint: 'Volume depends on the side cubed.', explain: '2³ = 8.' },
      { type: 'numeric', prompt: 'That same cube’s surface area is multiplied by what?', answer: 4, hint: 'Area depends on the side squared.', explain: '2² = 4 — which is why the two do not keep pace.' },
      { type: 'mc', prompt: 'A mouse must eat almost constantly because it:', choices: ['cannot store food', 'has a large surface area for its volume', 'has a small stomach', 'moves quickly'], answer: 1, hint: 'Where does a small warm animal lose heat?', explain: 'Lots of surface for very little body, so heat escapes fast and has to be replaced.' },
      { type: 'mc', prompt: 'An insect scaled up to the size of a dog would collapse mainly because:', choices: ['its legs would be too short', 'weight grows faster than the strength of its legs', 'it could not find enough food', 'its shell would be the wrong colour'], answer: 1, hint: 'Compare how area grows with how volume grows.', explain: 'Strength depends on cross-sectional area, which squares. Weight depends on volume, which cubes. Doubling in size makes it eight times heavier but only four times stronger.' },
    ],
  },

  /* ---- mr3 -------------------------------------------------------------- */
  {
    id: 'mr3', tag: 'Checkpoint', title: 'Checkpoint: Where Intuition Fails',
    subtitle: 'Checkpoint · Five days, one warning',
    pages: [
      { title: 'Look at what you built', blocks: [
        { type: 'text', text: 'Percent change. Averages. Counting. Probability. Scaling. Five days that look like five unrelated corners of mathematics.' },
        { type: 'callout', text: 'They are the same day, five times. Watch.' },
      ]},
      { title: 'Every one of them has a confident wrong answer', blocks: [
        { type: 'text', text: 'A 20% cut and a 20% rise obviously cancel. The average obviously describes a typical person. Two coins obviously give a third chance of one head. Nine heads obviously means tails is due. A giant insect obviously just works, bigger.' },
        { type: 'text', text: 'Every one of those is what an intelligent person says immediately, and every one is wrong. Not by a little, and not at random — wrong in a specific direction, the same way, every time.' },
      ]},
      { title: 'And the reason is always the same', blocks: [
        { type: 'text', text: 'In each case something was changing that you were treating as fixed. The base under a percentage. The influence of one extreme value. The number of possible outcomes. The independence of one flip from the last. The gap between an exponent of 2 and an exponent of 3.' },
        { type: 'formula', text: 'compared to WHAT?', label: 'the question all five days were secretly about' },
      ]},
      { title: 'Which makes this a habit, not five facts', blocks: [
        { type: 'text', text: 'You do not have to remember five separate traps. You have to develop one reflex: when a number is presented to you, ask what it was measured against, and whether that thing stayed still.' },
        { type: 'callout', text: 'Logic taught you to check whether an argument holds. This is the same check aimed at a number — and numbers get challenged far less often, which is exactly why they are used to persuade.' },
      ]},
      { title: 'What this actually bought you', blocks: [
        { type: 'callout', text: 'Most adults get every example on page two wrong. Not because they are careless, but because nobody ever showed them the pattern underneath. You have now seen it five times in five costumes, and you will spot the sixth on your own.' },
      ]},
    ],
    recap: [
      'Percent change, averages, counting, probability and scaling all break intuition the same way.',
      'In each, something you treated as fixed was moving.',
      'The reflex is "compared to what, and did it stay still?"',
      'Numbers get challenged less than arguments, which is why they persuade.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A 30% cut followed by a 30% rise leaves the price:', choices: ['below where it started', 'exactly where it started', 'above where it started', 'impossible to tell'], answer: 0, hint: 'The rise is calculated from a smaller number than the cut was.', explain: '$100 → $70 → $91. The base shrank, so the same percentage returns less.' },
      { type: 'mc', prompt: 'A correctly calculated average can still:', choices: ['describe nobody in the group', 'never mislead anyone', 'only be wrong if the maths is wrong', 'always name a real member of the group'], answer: 0, hint: 'Think of the average family with 2.4 children.', explain: 'No family has 2.4 children. The number is arithmetically perfect and describes no actual household.' },
      { type: 'numeric', prompt: 'Four coins are flipped. How many equally likely results in total?', answer: 16, hint: 'Two choices, four times over.', explain: '2⁴ = 16 — the counting rule again.' },
      { type: 'mc', prompt: 'After eight tails in a row, the chance the next flip is heads is:', choices: ['impossible to know', 'higher, because heads is due', 'one half', 'lower'], answer: 2, hint: 'What does independent mean?', explain: 'One half. The rarity of a long run is spent before it happens, not owed afterward.' },
      { type: 'mc', prompt: 'Doubling a cube’s side multiplies volume by 8 and area by 4 because:', choices: ['the exponents differ, 3 against 2', 'area is measured differently', 'volume is heavier', 'cubes are irregular'], answer: 0, hint: 'What is the only difference between the two formulas?', explain: 'One exponent. That single digit decides animal size and mountain height.' },
      { type: 'mc', prompt: 'The single question underneath all five days is:', choices: ['who calculated it', 'is the arithmetic correct', 'is this number large', 'compared to what, and did it stay still'], answer: 3, hint: 'Each trap involved a moving baseline.', explain: 'Every one of the five hid something changing that intuition assumed was fixed.' },
      { type: 'mc', prompt: 'Support rises from 3% to 6%. Which description is honest?', choices: ['only “3 percentage points”', 'only “a 100% increase”', 'both — they measure different things', 'neither'], answer: 2, hint: 'One is the plain gap; one compares against the start.', explain: 'Both are true. One sounds trivial and one sounds enormous, and whoever reports it picks which impression you leave with.' },
    ],
  },
];
