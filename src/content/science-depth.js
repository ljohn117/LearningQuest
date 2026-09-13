/* Depth for the science lanes, and the first days in the app that ask to be
 * earned rather than merely reached.
 *
 * APPENDED, never inserted. Chemistry continues at ch11, Physical Science at
 * phy7, Biology at bio11. Every existing id is untouched and frozen.
 *
 * WHY THESE TOPICS
 *
 * Chemistry stopped at reaction rates and deliberately skipped moles and
 * stoichiometry — the machinery that turns chemistry from description into
 * calculation. Physical Science named forces and energy without ever writing
 * an equation for either. Biology taught one gene and one trait, which is the
 * part of inheritance that needs no probability at all.
 *
 * Each lane therefore stopped exactly where it stops being memorable and
 * starts being usable.
 *
 * WHY THEY DECLARE `readiness`
 *
 * These are the first days that will not open on completion alone. Each names
 * an earlier day and asks for 60% on it, or a won duel instead.
 *
 * The reason is specific rather than ideological. Stoichiometry on top of a
 * half-grasp of conservation of mass is not progress; it is the appearance of
 * progress, and it ends with a child concluding he is bad at chemistry when
 * what actually happened is that nobody checked. The same is true of F = ma
 * resting on a shaky idea of what a force is.
 *
 * The door always names its own key, there are two routes through it, and
 * retries are unlimited and free. See src/engine/readiness.js.
 */

export const CHEM_DEPTH = [
  {
    id: 'ch11', tag: 'Chemistry II', title: 'Counting by Weighing',
    subtitle: 'Day 11 · The mole',
    readiness: ['chem:ch5'],
    pages: [
      { title: 'Atoms are too small to count', blocks: [
        { type: 'text', text: 'A reaction is a recipe written in atoms: two of these join one of those. But you cannot count atoms, and no balance measures them. Chemistry needed a bridge between the number of particles, which matters, and mass, which you can actually weigh.' },
        { type: 'concept', term: 'Mole', def: 'A fixed count of particles — 6.02 × 10²³ of them. It is a number, in the same way that a dozen is a number.' },
        { type: 'text', text: 'Saying "a mole of carbon" is exactly like saying "a dozen eggs". The word names a quantity, not a substance and not a property.' },
      ]},
      { title: 'Why that particular number', blocks: [
        { type: 'text', text: 'It was not picked for elegance. It was chosen so that one mole of an element weighs, in grams, the same number as its atomic mass on the periodic table.' },
        { type: 'example', text: 'Carbon has atomic mass 12, so one mole of carbon weighs 12 grams. Oxygen is 16, so a mole of oxygen atoms weighs 16 grams. The table you already know how to read is also a weighing chart.' },
        { type: 'callout', text: 'That is the whole trick. You cannot count atoms, but you can weigh them — and the mole converts a weight you can measure into a count you cannot.' },
      ]},
      { title: 'Moving between grams and moles', blocks: [
        { type: 'formula', text: 'moles = mass in grams ÷ molar mass', label: 'and mass = moles × molar mass' },
        { type: 'text', text: '24 grams of carbon is 24 ÷ 12 = 2 moles. Three moles of carbon is 3 × 12 = 36 grams. It is a unit conversion, no different in kind from turning hours into minutes.' },
        { type: 'text', text: 'Getting the division the right way up is the only genuine difficulty, and there is a check: moles are usually a small number, grams are usually a larger one.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 1 said a unit rate compares two quantities so you can convert between them, and day 8 wrote enormous numbers as powers of ten. A mole is both at once — a unit rate between grams and particles, with 6.02 × 10²³ written in scientific notation because no other way of writing it is usable.' },
      ]},
    ],
    recap: [
      'A mole is a count: 6.02 × 10²³ particles.',
      'One mole of an element weighs its atomic mass in grams.',
      'moles = grams ÷ molar mass.',
      'The mole converts a mass you can weigh into a count you cannot.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A mole is best described as:', choices: ['a unit of mass, like the gram', 'a fixed number of particles', 'a type of chemical bond', 'a measure of how fast a reaction runs'], answer: 1, hint: 'Compare it with the word "dozen".', explain: 'It is a count — 6.02 × 10²³ particles. It is not a mass, though it is defined so that it connects neatly to one.' },
      { type: 'numeric', prompt: 'Carbon has atomic mass 12. How many grams is 3 moles of carbon?', answer: 36, hint: 'mass = moles × molar mass.', explain: '3 × 12 = 36 grams.' },
      { type: 'numeric', prompt: 'How many moles are in 32 grams of oxygen atoms, given a molar mass of 16?', answer: 2, hint: 'moles = grams ÷ molar mass.', explain: '32 ÷ 16 = 2 moles.' },
      { type: 'mc', prompt: 'One mole of carbon and one mole of oxygen atoms contain:', choices: ['the same mass', 'the same volume', 'the same number of atoms', 'the same energy'], answer: 2, hint: 'What is a mole actually counting?', explain: 'The same count, 6.02 × 10²³ of each. Their masses differ — 12 g against 16 g — precisely because the atoms differ.' },
      { type: 'mc', prompt: 'The mole exists mainly to solve which problem?', choices: ['atoms are too small to weigh', 'the periodic table is hard to read', 'reactions happen too quickly', 'atoms are too small to count'], answer: 3, hint: 'Which of the two can a balance already do?', explain: 'Weighing is easy; counting is impossible. The mole turns the measurement you can make into the number you need.' },
    ],
  },
  {
    id: 'ch12', tag: 'Chemistry II', title: 'From Formula to Grams',
    subtitle: 'Day 12 · Molar mass',
    readiness: ['chem:ch5'],
    pages: [
      { title: 'Add up what the formula says', blocks: [
        { type: 'text', text: 'The molar mass of a compound is the sum of the molar masses of every atom in its formula. Nothing is hidden and nothing is approximated away — you read the subscripts and you add.' },
        { type: 'example', text: 'Water is H₂O. Two hydrogens at 1 each, plus one oxygen at 16, gives 18 grams per mole.' },
        { type: 'callout', text: 'The subscript multiplies only the symbol immediately before it. That was the rule from day 5, and it is the rule that decides whether you get 18 or 17.' },
      ]},
      { title: 'Brackets multiply everything inside', blocks: [
        { type: 'text', text: 'In Ca(OH)₂ the 2 applies to the whole bracket, so there are two oxygens and two hydrogens, not one of each.' },
        { type: 'example', text: 'Calcium 40, plus two oxygens at 16 (that is 32), plus two hydrogens at 1 (that is 2), giving 74 grams per mole.' },
        { type: 'concept', term: 'Molar mass', def: 'The mass in grams of one mole of a substance. For a compound, the sum of its atoms’ molar masses.' },
      ]},
      { title: 'What it is for', blocks: [
        { type: 'text', text: 'Recipes in chemistry are written in moles because reactions happen particle by particle. Balances read grams. Molar mass is the only thing standing between the two, which is why it turns up in almost every calculation that follows.' },
        { type: 'text', text: 'Weigh 18 grams of water and you have exactly one mole, which is 6.02 × 10²³ molecules. You have counted something uncountable using a kitchen scale.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 5 taught you to read a formula and day 6 said atoms are never created or destroyed. Molar mass is those two facts doing arithmetic together: the formula tells you what is in there, and conservation guarantees the total still adds up after the reaction.' },
      ]},
    ],
    recap: [
      'Molar mass is the sum of the molar masses of every atom in the formula.',
      'A subscript multiplies only the symbol before it.',
      'A subscript after a bracket multiplies everything inside it.',
      'Molar mass is the bridge between grams on a balance and moles in a recipe.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'What is the molar mass of H₂O? Use H = 1 and O = 16.', answer: 18, hint: 'Two hydrogens plus one oxygen.', explain: '(2 × 1) + 16 = 18 grams per mole.' },
      { type: 'numeric', prompt: 'What is the molar mass of CO₂? Use C = 12 and O = 16.', answer: 44, hint: 'One carbon and two oxygens.', explain: '12 + (2 × 16) = 44 grams per mole.' },
      { type: 'numeric', prompt: 'What is the molar mass of Ca(OH)₂? Use Ca = 40, O = 16, H = 1.', answer: 74, hint: 'The 2 applies to everything inside the bracket.', explain: '40 + 2(16 + 1) = 40 + 34 = 74. Treating the bracket as one O and one H gives 57, which is the usual error.' },
      { type: 'numeric', prompt: 'How many grams is 2 moles of CO₂, molar mass 44?', answer: 88, hint: 'mass = moles × molar mass.', explain: '2 × 44 = 88 grams.' },
      { type: 'mc', prompt: 'In Mg(NO₃)₂, how many oxygen atoms are there in total?', choices: ['six', 'five', 'three', 'two'], answer: 0, hint: 'Three oxygens inside, and the bracket is doubled.', explain: '3 × 2 = 6 oxygen atoms.' },
    ],
  },
  {
    id: 'ch13', tag: 'Chemistry II', title: 'The Recipe, in Numbers',
    subtitle: 'Day 13 · Stoichiometry',
    readiness: ['chem:ch6'],
    pages: [
      { title: 'A balanced equation is a ratio', blocks: [
        { type: 'text', text: 'The big numbers in front of a balanced equation are not decoration. They are the recipe, and they are a ratio in exactly the sense you already know.' },
        { type: 'formula', text: '2H₂ + O₂ → 2H₂O', label: 'two hydrogens to one oxygen makes two waters' },
        { type: 'text', text: 'Two moles of hydrogen react with one mole of oxygen. Or twenty with ten, or two hundred with a hundred. The ratio 2 : 1 : 2 holds at any scale, which is what makes it useful.' },
      ]},
      { title: 'Predicting how much you get', blocks: [
        { type: 'text', text: 'Given the moles of one substance, the ratio gives you every other. This is why chemistry can be done on paper before anything is mixed, and why a factory knows what to buy.' },
        { type: 'example', text: 'Start with 6 moles of H₂. The ratio of H₂ to H₂O is 2 : 2, which is 1 : 1, so you get 6 moles of water — and you need 3 moles of O₂ to do it, because that ratio is 2 : 1.' },
        { type: 'callout', text: 'Always convert grams to moles BEFORE using the ratio. The coefficients count particles, not grams, and applying them to masses is the single most common mistake in this topic.' },
      ]},
      { title: 'What runs out first', blocks: [
        { type: 'concept', term: 'Limiting reactant', def: 'The ingredient that runs out first, and therefore decides how much product you can make. Whatever is left over is in excess.' },
        { type: 'text', text: 'With ten slices of bread and two slices of cheese you make two sandwiches, not five. The bread is in excess and the cheese is limiting — and no amount of extra bread changes the answer.' },
        { type: 'text', text: 'Reactions work the same way. Work out how much product each reactant could make on its own, and the smaller answer is the real one.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 1 introduced ratios and day 2 used proportions to scale them up. Stoichiometry is those two days applied to atoms, which is why it feels familiar the moment you stop thinking of it as chemistry and start thinking of it as a recipe you are doubling.' },
      ]},
    ],
    recap: [
      'The coefficients in a balanced equation are a mole ratio.',
      'The ratio holds at any scale, so it predicts amounts before you mix anything.',
      'Convert grams to moles before applying the ratio, never after.',
      'The limiting reactant runs out first and decides the yield.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'For 2H₂ + O₂ → 2H₂O, how many moles of water come from 4 moles of H₂?', answer: 4, hint: 'The H₂ to H₂O ratio is 2 : 2.', explain: 'That ratio is 1 : 1, so 4 moles of hydrogen gives 4 moles of water.' },
      { type: 'numeric', prompt: 'For the same reaction, how many moles of O₂ are needed for 4 moles of H₂?', answer: 2, hint: 'The H₂ to O₂ ratio is 2 : 1.', explain: 'Half as much oxygen as hydrogen, so 2 moles.' },
      { type: 'mc', prompt: 'Before applying the mole ratio from a balanced equation, you must:', choices: ['convert moles into grams', 'convert any masses into moles', 'double every coefficient', 'check the temperature'], answer: 1, hint: 'What do the coefficients actually count?', explain: 'Coefficients count particles. Applying them to grams gives an answer that is simply wrong, and it is the commonest error here.' },
      { type: 'mc', prompt: 'You have 10 slices of bread and 2 of cheese. The limiting ingredient is:', choices: ['the bread', 'neither', 'the cheese', 'both equally'], answer: 2, hint: 'Which one runs out first?', explain: 'The cheese. Extra bread cannot make more sandwiches, and extra reactant cannot make more product.' },
      { type: 'mc', prompt: 'A balanced equation lets a factory know what to buy because the coefficients are:', choices: ['the number of steps in the process', 'the mass in grams of each ingredient', 'the temperature the reaction needs', 'a fixed ratio that holds at any scale'], answer: 3, hint: 'Why can the same equation describe a test tube and a tanker?', explain: 'It is a ratio, and a ratio scales. That is why one equation covers every size of reaction.' },
    ],
  },
];

export const PHYSICS_DEPTH = [
  {
    id: 'phy7', tag: 'Physics II', title: 'Motion, With Numbers Attached',
    subtitle: 'Day 7 · Speed, velocity and acceleration',
    readiness: ['physics:phy3'],
    pages: [
      { title: 'Speed and velocity are not the same word', blocks: [
        { type: 'text', text: 'Speed says how fast. Velocity says how fast and in which direction. Drive in a complete circle and return to your start: your average speed was substantial, and your average velocity was zero.' },
        { type: 'formula', text: 'speed = distance ÷ time', label: 'metres per second' },
        { type: 'concept', term: 'Vector', def: 'A quantity with a direction as well as a size. Velocity, force and acceleration are vectors; speed, mass and time are not.' },
      ]},
      { title: 'Acceleration is a change in velocity', blocks: [
        { type: 'text', text: 'Acceleration is not "going fast". It is velocity changing — and since velocity includes direction, turning a corner at constant speed is an acceleration.' },
        { type: 'formula', text: 'a = (v − u) ÷ t', label: 'final velocity minus starting velocity, over time' },
        { type: 'example', text: 'A car goes from 0 to 20 m/s in 4 seconds. a = (20 − 0) ÷ 4 = 5 m/s². Every second, it gains another 5 metres per second.' },
      ]},
      { title: 'Slowing down is negative acceleration', blocks: [
        { type: 'text', text: 'Braking from 20 m/s to rest in 5 seconds gives a = (0 − 20) ÷ 5 = −4 m/s². The minus sign is information: the acceleration points opposite to the motion.' },
        { type: 'callout', text: 'This is why "deceleration" is not really a separate idea. It is acceleration with a sign, and keeping the sign is what lets the same equation handle both cases without a special rule.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 6 said slope is how steeply a line rises. Plot velocity against time and acceleration IS the slope of that line. Two subjects, one idea, and you already had the tool before you needed it here.' },
      ]},
    ],
    recap: [
      'Speed is how fast; velocity is how fast and in which direction.',
      'Acceleration is any change in velocity, including a change of direction.',
      'a = (v − u) ÷ t.',
      'Negative acceleration means slowing, and the sign carries real information.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'A car travels 150 metres in 10 seconds. What is its speed, in metres per second?', answer: 15, hint: 'speed = distance ÷ time.', explain: '150 ÷ 10 = 15 m/s.' },
      { type: 'numeric', prompt: 'A bike goes from 0 to 12 m/s in 4 seconds. What is its acceleration, in m/s²?', answer: 3, hint: 'a = (v − u) ÷ t.', explain: '(12 − 0) ÷ 4 = 3 m/s².' },
      { type: 'mc', prompt: 'A car drives round a roundabout at a steady 20 mph. It is:', choices: ['accelerating, because its direction is changing', 'not accelerating, since the speed is constant', 'decelerating the whole way round', 'travelling at constant velocity'], answer: 0, hint: 'Velocity includes direction.', explain: 'Changing direction changes velocity, and any change in velocity is an acceleration — even at constant speed.' },
      { type: 'numeric', prompt: 'A train slows from 30 m/s to 10 m/s in 5 seconds. What is its acceleration, in m/s²?', answer: -4, hint: 'Final minus starting, then divide. Keep the sign.', explain: '(10 − 30) ÷ 5 = −4 m/s². The minus says it points against the motion.' },
      { type: 'mc', prompt: 'You run a full lap of a track and stop where you started. Your average velocity was:', choices: ['equal to your average speed', 'zero', 'half your average speed', 'impossible to determine'], answer: 1, hint: 'Velocity depends on displacement, not distance covered.', explain: 'You ended where you began, so your displacement was zero and so was your average velocity — while your average speed was clearly not.' },
    ],
  },
  {
    id: 'phy8', tag: 'Physics II', title: 'Force Equals Mass Times Acceleration',
    subtitle: 'Day 8 · Newton’s second law',
    readiness: ['physics:phy3'],
    pages: [
      { title: 'One equation, most of mechanics', blocks: [
        { type: 'text', text: 'Day 3 said a force changes motion. This says exactly how much, and it is one of the shortest useful sentences in science.' },
        { type: 'formula', text: 'F = m × a', label: 'newtons = kilograms × metres per second squared' },
        { type: 'text', text: 'Double the force and you double the acceleration. Double the mass instead, with the same force, and you halve it. Everything about pushing things follows from that.' },
      ]},
      { title: 'Reading it three ways', blocks: [
        { type: 'example', text: 'A 2 kg ball pushed with 10 N accelerates at a = F ÷ m = 10 ÷ 2 = 5 m/s².' },
        { type: 'text', text: 'The same equation rearranges to find whichever quantity is missing: F = ma, a = F ÷ m, m = F ÷ a. It is the balance rule from Mathematics day 3, applied to physics.' },
        { type: 'callout', text: 'Mass sits on the bottom when you solve for acceleration. That is the whole explanation for why a loaded lorry takes longer to stop than an empty one, with the same brakes.' },
      ]},
      { title: 'Weight is a force, mass is not', blocks: [
        { type: 'concept', term: 'Weight', def: 'The force gravity exerts on a mass: W = m × g, where g is about 9.8 m/s² on Earth. Measured in newtons.' },
        { type: 'text', text: 'Your mass is the same on the Moon; your weight is about a sixth. Bathroom scales read a force and report it as a mass, which works fine as long as you stay on this planet.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 3 solved equations by doing the same thing to both sides, and day 13 said a function turns one input into exactly one output. F = ma is both: a rearrangeable equation, and a rule that turns mass and acceleration into a force with no ambiguity.' },
      ]},
    ],
    recap: [
      'F = m × a, in newtons, kilograms and m/s².',
      'More force means more acceleration; more mass means less.',
      'Rearrange it to find whichever quantity is missing.',
      'Weight is a force (m × g); mass is not and does not change with location.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'What force accelerates a 4 kg object at 3 m/s²? Answer in newtons.', answer: 12, hint: 'F = m × a.', explain: '4 × 3 = 12 N.' },
      { type: 'numeric', prompt: 'A 20 N force acts on a 5 kg mass. What is the acceleration, in m/s²?', answer: 4, hint: 'Rearrange to a = F ÷ m.', explain: '20 ÷ 5 = 4 m/s².' },
      { type: 'mc', prompt: 'Push a shopping trolley and a car with the same force. The car:', choices: ['accelerates more', 'accelerates identically', 'accelerates less', 'does not accelerate at all'], answer: 2, hint: 'Mass is on the bottom of a = F ÷ m.', explain: 'More mass with the same force gives less acceleration. It still accelerates, just imperceptibly.' },
      { type: 'mc', prompt: 'An astronaut travels to the Moon. What changes?', choices: ['their mass only', 'neither', 'both mass and weight', 'their weight only'], answer: 3, hint: 'Which one depends on gravity?', explain: 'Weight is m × g, and g is weaker there. Mass is how much matter there is, and that travels with them unchanged.' },
      { type: 'numeric', prompt: 'What is the weight, in newtons, of a 10 kg mass where g = 10 m/s²?', answer: 100, hint: 'W = m × g.', explain: '10 × 10 = 100 N.' },
    ],
  },
];

export const BIO_DEPTH = [
  {
    id: 'bio11', tag: 'Biology II', title: 'Predicting What the Offspring Get',
    subtitle: 'Day 11 · Punnett squares',
    readiness: ['bio:bio4'],
    pages: [
      { title: 'Two copies of every gene', blocks: [
        { type: 'text', text: 'You carry two copies of most genes, one from each parent. The versions are called alleles, and they need not agree with each other.' },
        { type: 'concept', term: 'Dominant and recessive', def: 'A dominant allele shows whenever it is present. A recessive one shows only when both copies are recessive.' },
        { type: 'text', text: 'Written as letters: B for a dominant allele, b for the recessive one. BB and Bb both show the dominant trait; only bb shows the recessive.' },
      ]},
      { title: 'The square is just a multiplication table', blocks: [
        { type: 'text', text: 'Put one parent’s two alleles along the top and the other’s down the side. Each cell combines the row and column, giving every equally likely combination the offspring could inherit.' },
        { type: 'example', text: 'Cross Bb with Bb and the four cells are BB, Bb, Bb, bb. Three of the four show the dominant trait and one shows the recessive — the classic 3 : 1 ratio.' },
        { type: 'visual', kind: 'punnett' },
      ]},
      { title: 'A ratio, not a promise', blocks: [
        { type: 'text', text: 'A 3 : 1 ratio does not mean that four children will arrive three-and-one. Each child is an independent event with a 3 in 4 chance, in exactly the way each coin flip is independent.' },
        { type: 'callout', text: 'Four recessive children in a row from a Bb × Bb cross is unlikely, but nothing prevents it. The square gives probabilities, and probabilities say nothing about what any particular family gets.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Mathematics day 18 said a coin has no memory and each flip stands alone. Day 17 said independent choices multiply. A Punnett square is those two facts drawn as a grid — which is why the maths already felt familiar.' },
      ]},
    ],
    recap: [
      'You carry two alleles of each gene, one from each parent.',
      'A dominant allele shows whenever present; a recessive one needs two copies.',
      'A Punnett square lists every equally likely combination.',
      'Bb × Bb gives a 3 : 1 ratio — a probability, not a guarantee.',
    ],
    quiz: [
      { type: 'mc', prompt: 'An organism with genotype Bb shows:', choices: ['the dominant trait', 'the recessive trait', 'a blend of both', 'neither trait'], answer: 0, hint: 'A dominant allele shows whenever it is there.', explain: 'One dominant copy is enough. Only bb shows the recessive trait.' },
      { type: 'numeric', prompt: 'In a Bb × Bb cross, how many of the four squares show the recessive trait?', answer: 1, hint: 'Only bb shows it.', explain: 'The four cells are BB, Bb, Bb, bb — so exactly one.' },
      { type: 'mc', prompt: 'A Bb × Bb cross gives what ratio of dominant to recessive?', choices: ['1 : 1', '3 : 1', '2 : 1', '4 : 0'], answer: 1, hint: 'Count the cells showing each.', explain: 'Three of four show the dominant trait, one shows the recessive — 3 : 1.' },
      { type: 'mc', prompt: 'Two parents with a 3 : 1 ratio have four children, all recessive. This means:', choices: ['the square must have been worked out wrongly', 'the alleles changed during development', 'an unlikely outcome happened, as it may', 'the trait is not genuinely recessive'], answer: 2, hint: 'Each child is an independent event.', explain: 'A 1 in 4 chance four times running is about 1 in 256 — uncommon, and nothing forbids it. Probabilities never promise a particular family.' },
      { type: 'mc', prompt: 'Crossing BB with bb gives offspring that are:', choices: ['all bb — two recessive copies', 'all BB — two dominant copies', 'half BB and half bb', 'all Bb — one copy of each'], answer: 3, hint: 'Every cell takes one allele from each parent.', explain: 'Each parent can only contribute one kind, so every cell is Bb and every offspring shows the dominant trait.' },
    ],
  },
];
