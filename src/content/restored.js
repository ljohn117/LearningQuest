import { Atom, Lightbulb, Globe2 } from 'lucide-react';

/* Physical Science · Logic · Earth & Space
 *
 * These three lanes were finished 6/6 and then swapped out of the app. This
 * restores them, so the completed keys still in his save file line up with
 * real content again instead of pointing at nothing.
 *
 * Day ids (phy*, lg*, es*) do not collide with any existing prefix and must
 * never be renumbered — progress is keyed `subjectId:dayId`.
 *
 * Two rules held throughout: exactly one new idea per page, and every page
 * four deep. Correct answers are spread across all four choice positions on
 * purpose — the original content put 73-93% of them at index 0, which meant
 * tapping the top option scored well without reading anything.
 *
 * Every day ends by connecting to a lane he has already done. Logic is
 * deliberately the hinge: it is CS boolean logic and mathematical proof
 * wearing different clothes, and he has done both. */

export const RESTORED = {
  physics: {
    name: 'Physical Science', icon: Atom, accent: '#a78bfa',
    blurb: 'What everything is made of, and the rules it has to follow.',
    days: [
      {
        id: 'phy1', tag: 'Matter', title: 'States of Matter',
        subtitle: 'Day 1 · Same stuff, different arrangement',
        pages: [
          { title: 'What counts as matter', blocks: [
            { type: 'text', text: 'Matter is anything that takes up space and has mass. That covers almost everything you can point at — air included, even though you cannot see it.' },
            { type: 'concept', term: 'Matter', def: 'Anything with mass that takes up volume. Light and sound are not matter — they are energy, not stuff.' },
          ]},
          { title: 'The states are about spacing', blocks: [
            { type: 'text', text: 'Solid, liquid, gas. The difference is not what the particles are — it is how close together they sit and how freely they move.' },
            { type: 'visual', kind: 'particles' },
            { type: 'example', text: 'Ice, water and steam are all H2O. Identical particles. What changes is whether they are locked in place, sliding past each other, or flying apart.' },
          ]},
          { title: 'Changing state costs energy', blocks: [
            { type: 'text', text: 'To melt ice you add energy. To freeze water you take energy away. A change of state is always an energy transaction.' },
            { type: 'callout', text: 'Notice what does NOT change: the particles themselves. Melting is not the water becoming something else.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Biology you learned homeostasis — a system holding steady conditions. Ice water sitting at exactly 0°C while it melts is the same idea in physics: the energy goes into changing state, not raising temperature.' },
          ]},
        ],
        recap: [
          'Matter has mass and takes up space.',
          'States differ by particle spacing and freedom, not by particle type.',
          'Changing state means adding or removing energy.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Ice, water and steam differ mainly in:', choices: ['the type of particle', 'their number of atoms', 'their chemical formula', 'how the particles are arranged'], answer: 3, hint: 'All three are still H2O.', explain: 'Same particles throughout — only the spacing and motion change.' },
          { type: 'mc', prompt: 'Ice melting into water is:', choices: ['a physical change — the same substance, rearranged', 'a chemical change — a new substance forms', 'neither a physical nor a chemical change', 'a chemical change because it looks different'], answer: 0, hint: 'Check the chemical formula before and after.', explain: 'H₂O before, H₂O after. Only the arrangement changed, which is exactly what makes it physical.' },
          { type: 'mc', prompt: 'To freeze a liquid you must:', choices: ['add energy', 'remove energy', 'add mass', 'remove volume'], answer: 1, hint: 'Freezing is the opposite of melting.', explain: 'Energy leaves, particles slow, and they lock into place.' },
          { type: 'mc', prompt: 'Which of these is NOT matter?', choices: ['steam', 'air', 'light', 'ice'], answer: 2, hint: 'One of these has no mass.', explain: 'Light is energy, not matter.' },
        ],
      },
      {
        id: 'phy2', tag: 'Matter', title: 'Atoms & Elements',
        subtitle: 'Day 2 · The smallest thing that still counts',
        pages: [
          { title: 'Everything is built from atoms', blocks: [
            { type: 'text', text: 'Cut a piece of gold in half, then in half again, and keep going. Eventually you reach one atom of gold. Cut that, and it stops being gold.' },
            { type: 'concept', term: 'Atom', def: 'The smallest unit of an element that still has that element’s properties.' },
          ]},
          { title: 'Three parts, two places', blocks: [
            { type: 'text', text: 'Protons and neutrons sit in a dense nucleus at the centre. Electrons move around the outside. Almost all the mass is in the nucleus; almost all the volume is empty space.' },
            { type: 'visual', kind: 'atom', protons: 6 },
          ]},
          { title: 'Proton count is the identity', blocks: [
            { type: 'text', text: 'What makes an atom carbon rather than oxygen is one number: how many protons it has. Six protons is carbon. Always. Change that number and you have changed the element.' },
            { type: 'concept', term: 'Atomic number', def: 'The number of protons in an atom. It is the element’s name written as a number.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Biology, taxonomy sorted living things by shared traits into a system you could look things up in. The periodic table does exactly that for atoms — sorted so that elements in the same column behave alike.' },
          ]},
        ],
        recap: [
          'Atoms are the smallest unit of an element.',
          'Protons and neutrons are in the nucleus; electrons are outside.',
          'The proton count decides which element it is.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What decides which element an atom is?', choices: ['its total mass', 'its number of electrons', 'its number of neutrons', 'its number of protons'], answer: 3, hint: 'One count is the element’s identity.', explain: 'The atomic number — the proton count — names the element.' },
          { type: 'mc', prompt: 'Nearly all of an atom’s mass is in the:', choices: ['nucleus', 'empty space', 'electron cloud', 'outer shell'], answer: 0, hint: 'Protons and neutrons are the heavy parts.', explain: 'The nucleus holds the protons and neutrons, so it holds the mass.' },
          { type: 'mc', prompt: 'Compared with the whole atom, the nucleus is:', choices: ['about half the atom', 'tiny — the atom is mostly empty space', 'the same size as the electron cloud', 'slightly larger than the electron cloud'], answer: 1, hint: 'Picture a marble in a sports stadium.', explain: 'The nucleus holds nearly all the mass in a fantastically small space. Almost everything solid is mostly nothing.' },
          { type: 'numeric', prompt: 'An atom has 8 protons. What is its atomic number?', answer: 8, hint: 'Atomic number is defined as the proton count.', explain: 'Atomic number 8 — that is oxygen.' },
        ],
      },
      {
        id: 'phy3', tag: 'Forces', title: 'Forces & Motion',
        subtitle: 'Day 3 · Why things start, stop and turn',
        pages: [
          { title: 'A force is a push or a pull', blocks: [
            { type: 'text', text: 'Every change in how something moves comes from a force acting on it. No force, no change — that is the whole game.' },
            { type: 'concept', term: 'Force', def: 'A push or pull that can change an object’s motion. Measured in newtons (N).' },
          ]},
          { title: 'Things keep doing what they are doing', blocks: [
            { type: 'text', text: 'An object at rest stays at rest. An object moving keeps moving, in a straight line, at the same speed — unless a force acts on it.' },
            { type: 'example', text: 'A hockey puck on ice slides a long way because friction is small. In space, with almost no friction at all, it would simply keep going forever.' },
          ]},
          { title: 'How much force, how much change', blocks: [
            { type: 'text', text: 'The same push moves a shopping cart easily and a car barely at all. Force, mass and acceleration are locked together in one relationship.' },
            { type: 'formula', text: 'F = m × a', label: 'force = mass × acceleration' },
            { type: 'callout', text: 'This is an equation with three variables — exactly what you solved in Math. Know any two and you can find the third.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Math you rearranged formulas to solve for whatever was missing. F = m × a is that same skill pointed at the real world: given a force and a mass, acceleration is just division.' },
          ]},
        ],
        recap: [
          'A force is a push or pull that changes motion.',
          'Without a force, motion does not change.',
          'F = m × a ties force, mass and acceleration together.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'A 4 kg object accelerates at 3 m/s². What force acts on it, in newtons?', answer: 12, hint: 'F = m × a.', explain: '4 × 3 = 12 N.' },
          { type: 'numeric', prompt: 'A 20 N force acts on a 5 kg object. What is its acceleration, in m/s²?', answer: 4, hint: 'Rearrange F = m × a to a = F ÷ m.', explain: '20 ÷ 5 = 4 m/s².' },
          { type: 'mc', prompt: 'An object with no force acting on it will:', choices: ['slow down and stop', 'speed up steadily', 'keep moving as it was', 'turn gradually'], answer: 2, hint: 'Think of the puck on ice with friction removed.', explain: 'Motion only changes when a force acts.' },
          { type: 'mc', prompt: 'Push a shopping trolley and a car with exactly the same force. The car:', choices: ['accelerates more', 'does not move at all', 'accelerates the same', 'accelerates less'], answer: 3, hint: 'Look at a = F ÷ m and make m bigger.', explain: 'Same force, more mass, less acceleration. Mass is the bottom of the fraction.' },
        ],
      },
      {
        id: 'phy4', tag: 'Energy', title: 'Energy & Conservation',
        subtitle: 'Day 4 · It moves, it changes form, it never vanishes',
        pages: [
          { title: 'Energy is the ability to cause change', blocks: [
            { type: 'text', text: 'Anything that heats, moves, lights or lifts something else is spending energy. It is not a substance — it is a capacity.' },
            { type: 'concept', term: 'Energy', def: 'The capacity to do work — to move something, heat something, or change something.' },
          ]},
          { title: 'Stored versus moving', blocks: [
            { type: 'text', text: 'A ball held above the ground has energy because of where it is. A ball already falling has energy because of how it moves.' },
            { type: 'concept', term: 'Potential energy', def: 'Stored energy, waiting — held in position, height, or chemical bonds.' },
            { type: 'concept', term: 'Kinetic energy', def: 'The energy of motion. Anything moving has it.' },
          ]},
          { title: 'The total never changes', blocks: [
            { type: 'text', text: 'As the ball falls, potential energy becomes kinetic energy. Add them together at any instant and the total is the same. Energy is never created or destroyed — only converted.' },
            { type: 'callout', text: 'When energy seems to disappear, follow the heat. Friction turns motion into warmth, and the books still balance.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'The energy pyramid in Biology showed energy passing from plants to animals, losing usable form at every step but never actually vanishing. Same law, drawn as a food web instead of a falling ball.' },
          ]},
        ],
        recap: [
          'Energy is the capacity to cause change.',
          'Potential energy is stored; kinetic energy is motion.',
          'Energy converts between forms but the total is conserved.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A ball at the top of a ramp, not yet moving, mostly has:', choices: ['potential energy', 'no energy', 'heat energy', 'kinetic energy'], answer: 0, hint: 'It is not moving yet, but it could.', explain: 'Its height gives it stored — potential — energy.' },
          { type: 'mc', prompt: 'A sliding box grinds to a halt. Its kinetic energy has:', choices: ['been destroyed by friction', 'turned into heat and sound', 'disappeared into the floor', 'been converted into mass'], answer: 1, hint: 'Where does the energy go when something rubs?', explain: 'Friction does not destroy energy, it converts it — mostly to heat, some to sound. Run your hand over a carpet and feel it.' },
          { type: 'mc', prompt: 'As a ball falls, its potential energy:', choices: ['disappears', 'stays the same', 'becomes kinetic energy', 'increases'], answer: 2, hint: 'It is speeding up as it drops.', explain: 'Height converts into motion — potential becomes kinetic.' },
          { type: 'mc', prompt: 'Which best describes energy conservation?', choices: ['energy is always heat', 'energy is used up', 'energy only moves downhill', 'the total stays constant'], answer: 3, hint: 'Add the forms together before and after.', explain: 'The forms change; the total does not.' },
        ],
      },
      {
        id: 'phy5', tag: 'Energy', title: 'Heat & Temperature',
        subtitle: 'Day 5 · Two words people use as one',
        pages: [
          { title: 'Temperature measures motion', blocks: [
            { type: 'text', text: 'Temperature is how fast the particles in something are jiggling, on average. Hotter means faster.' },
            { type: 'concept', term: 'Temperature', def: 'The average kinetic energy of the particles in a substance.' },
          ]},
          { title: 'Heat is energy on the move', blocks: [
            { type: 'text', text: 'Heat is not what something has — it is energy flowing from a warmer thing to a cooler one. A bathtub of warm water holds far more heat than a spark, even though the spark is hotter.' },
            { type: 'callout', text: 'Hotter is not the same as more heat. Temperature is an average; heat is a total transfer.' },
          ]},
          { title: 'Three ways it travels', blocks: [
            { type: 'text', text: 'Conduction moves heat by direct contact. Convection moves it by currents in a fluid. Radiation moves it as waves, needing nothing in between — which is how sunlight crosses empty space.' },
            { type: 'example', text: 'A metal spoon in soup: conduction. The soup circulating in the pot: convection. Your face feeling the stove from a step away: radiation.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Homeostasis again — your body holds near 37°C by controlling all three. Sweating dumps heat, blood flow redistributes it, and shivering makes more.' },
          ]},
        ],
        recap: [
          'Temperature is average particle motion.',
          'Heat is energy transferred from warmer to cooler.',
          'Heat travels by conduction, convection and radiation.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Sunlight reaching Earth through space travels by:', choices: ['radiation', 'conduction', 'convection', 'evaporation'], answer: 0, hint: 'Space is nearly empty — which method needs no material?', explain: 'Radiation carries energy as waves and needs no medium.' },
          { type: 'mc', prompt: 'A spark is far hotter than a warm bath. Which holds more heat energy in total?', choices: ['the spark, because it is hotter', 'the bath, because there is far more of it', 'they hold the same', 'heat and temperature are the same thing'], answer: 1, hint: 'Separate how hot something is from how much of it there is.', explain: 'Temperature is how fast particles move; heat is the total energy of all of them. A spark is hot and tiny; the bath is cooler and enormous.' },
          { type: 'mc', prompt: 'Temperature is a measure of:', choices: ['the mass of the object', 'the total energy present', 'average particle motion', 'the volume it occupies'], answer: 2, hint: 'It is an average, not a total.', explain: 'Average kinetic energy of the particles.' },
          { type: 'mc', prompt: 'Heat always flows:', choices: ['in both directions equally', 'only downward', 'from cooler to warmer', 'from warmer to cooler'], answer: 3, hint: 'Think about a hot drink left on a table.', explain: 'Energy flows warm to cool until they even out.' },
        ],
      },
      {
        id: 'phy6', tag: 'Waves', title: 'Waves, Light & Sound',
        subtitle: 'Day 6 · Carrying energy without carrying stuff',
        pages: [
          { title: 'A wave moves energy, not matter', blocks: [
            { type: 'text', text: 'Drop a stone in a pond and ripples spread outward. The water does not travel with them — it bobs up and down while the energy moves across.' },
            { type: 'concept', term: 'Wave', def: 'A disturbance that carries energy from place to place without transporting matter.' },
          ]},
          { title: 'Three numbers describe any wave', blocks: [
            { type: 'text', text: 'Wavelength is the distance between peaks. Frequency is how many peaks pass per second. Amplitude is how tall the wave is.' },
            { type: 'formula', text: 'speed = wavelength × frequency', label: 'the wave equation' },
            { type: 'callout', text: 'For a fixed speed, wavelength and frequency trade off — one goes up, the other goes down. That is an inverse relationship, straight out of Math.' },
          ]},
          { title: 'Sound needs a medium; light does not', blocks: [
            { type: 'text', text: 'Sound is particles bumping neighbours, so it needs air, water or solid to travel through. Light is an electromagnetic wave and crosses vacuum happily.' },
            { type: 'example', text: 'In space nobody can hear an explosion — there are no particles to carry the sound. You would see it instantly, though.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Computer Science you learned that everything becomes 1s and 0s. Those signals travel as waves — down wires, through fibre, across the air. Amplitude and frequency are how a binary message physically moves.' },
          ]},
        ],
        recap: [
          'Waves carry energy without moving matter along.',
          'Speed = wavelength × frequency; the last two trade off.',
          'Sound needs a medium; light does not.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What does a wave actually transport?', choices: ['energy', 'temperature', 'mass', 'matter'], answer: 0, hint: 'Think about the bobbing duck on a ripple.', explain: 'Energy moves; the medium stays put.' },
          { type: 'mc', prompt: 'Sound cannot travel through space because:', choices: ['space is far too cold for vibration', 'there are almost no particles to carry it', 'sound is absorbed by strong gravity', 'space is simply too large to cross'], answer: 1, hint: 'What does a sound wave actually push on?', explain: 'Sound is particles bumping into neighbouring particles. With nearly no particles, there is nothing to do the bumping.' },
          { type: 'numeric', prompt: 'A wave has wavelength 3 m and frequency 5 Hz. What is its speed, in m/s?', answer: 15, hint: 'speed = wavelength × frequency.', explain: '3 × 5 = 15 m/s.' },
          { type: 'mc', prompt: 'If speed is fixed and wavelength gets longer, frequency:', choices: ['becomes zero', 'gets larger', 'gets smaller', 'stays the same'], answer: 2, hint: 'Their product has to stay constant.', explain: 'An inverse relationship — one up means the other down.' },
        ],
      },
    ],
  },

  logic: {
    name: 'Logic', icon: Lightbulb, accent: '#fbbf24',
    blurb: 'The rules that decide whether an argument actually works.',
    days: [
      {
        id: 'lg1', tag: 'Logic', title: 'Statements & Truth',
        subtitle: 'Day 1 · What logic can and cannot work with',
        pages: [
          { title: 'A statement can be true or false', blocks: [
            { type: 'text', text: 'Logic only handles sentences that make a claim — something you could, in principle, check.' },
            { type: 'concept', term: 'Statement', def: 'A sentence that is either true or false, even if you do not yet know which.' },
          ]},
          { title: 'Plenty of sentences are not statements', blocks: [
            { type: 'text', text: '"Close the door." "What time is it?" "Ouch!" None of these can be true or false. They are commands, questions and exclamations — logic has nothing to say about them.' },
            { type: 'example', text: '"The moon is made of cheese" IS a statement. It is false, but false is a perfectly good truth value. "Is the moon made of cheese?" is not a statement at all.' },
          ]},
          { title: 'Truth value', blocks: [
            { type: 'text', text: 'Every statement carries exactly one truth value: true or false. Not both, not neither. That strictness is what makes the rest of logic possible.' },
            { type: 'concept', term: 'Truth value', def: 'Whether a statement is true or false.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Computer Science, a boolean holds exactly true or false — nothing else. That is not a coincidence. Booleans are this idea built into a machine.' },
          ]},
        ],
        recap: [
          'A statement is a sentence that is true or false.',
          'Questions, commands and exclamations are not statements.',
          'Every statement has exactly one truth value.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which of these is a statement?', choices: ['Wow!', 'How old are you?', 'Please sit down.', 'Phoenix is in Arizona.'], answer: 3, hint: 'Which one could you check as true or false?', explain: 'Only the last one makes a checkable claim.' },
          { type: 'mc', prompt: '“The Moon is made of cheese.” This sentence is:', choices: ['a statement, and a false one', 'not a statement, because it is false', 'a statement only if someone believes it', 'neither true nor false'], answer: 0, hint: 'False is a truth value too.', explain: 'A statement is anything that can be true or false. Being false is one of the two ways to qualify.' },
          { type: 'mc', prompt: '"Is it raining?" is not a statement because it:', choices: ['is about weather', 'cannot be true or false', 'is too short', 'has no verb'], answer: 1, hint: 'Try assigning it true or false.', explain: 'Questions carry no truth value.' },
          { type: 'mc', prompt: 'How many truth values does a statement have?', choices: ['none', 'as many as you like', 'exactly one', 'two at once'], answer: 2, hint: 'Not both, not neither.', explain: 'Exactly one: true or false.' },
        ],
      },
      {
        id: 'lg2', tag: 'Logic', title: 'And, Or, Not',
        subtitle: 'Day 2 · Building bigger statements from smaller ones',
        pages: [
          { title: 'AND needs both', blocks: [
            { type: 'text', text: '"It is raining AND I have an umbrella" is true only when both halves are true. One false half makes the whole thing false.' },
            { type: 'concept', term: 'Conjunction', def: 'Two statements joined by AND. True only when both parts are true.' },
          ]},
          { title: 'OR needs at least one', blocks: [
            { type: 'text', text: 'In logic, OR means at least one — possibly both. "I will have cake or ice cream" is logically true if you have both. Everyday speech often means "one or the other but not both"; logic does not.' },
            { type: 'callout', text: 'This trips people up constantly. Logical OR is inclusive. Both counts as true.' },
          ]},
          { title: 'NOT flips it', blocks: [
            { type: 'text', text: 'NOT takes a statement and reverses its truth value. If P is true, NOT P is false. Apply it twice and you are back where you started.' },
            { type: 'example', text: 'P: "The door is open" — true. NOT P: "The door is not open" — false. NOT NOT P: true again.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Binary from Computer Science: 1 and 0. AND, OR and NOT are the actual gates inside every processor. A chip is millions of these three operations wired together.' },
          ]},
        ],
        recap: [
          'AND is true only when both parts are true.',
          'OR is true when at least one part is true — both is fine.',
          'NOT reverses a truth value.',
        ],
        quiz: [
          { type: 'mc', prompt: 'In logic, “A or B” is false only when:', choices: ['both A and B are true', 'exactly one of them is true', 'A is true and B is false', 'both A and B are false'], answer: 3, hint: 'Logical OR is inclusive — both counts as yes.', explain: 'OR needs at least one. It fails only when nothing is true. Everyday speech often means “one or the other but not both”, which is where the confusion comes from.' },
          { type: 'mc', prompt: '"P AND Q" is true when:', choices: ['both are true', 'exactly one is true', 'neither is true', 'at least one is true'], answer: 0, hint: 'AND is the demanding one.', explain: 'Both parts must be true.' },
          { type: 'mc', prompt: 'If P is false, what is NOT P?', choices: ['false', 'true', 'unknown', 'both'], answer: 1, hint: 'NOT reverses it.', explain: 'NOT false is true.' },
          { type: 'mc', prompt: 'AND, OR and NOT are physically built into computers as:', choices: ['passwords', 'pixels', 'logic gates', 'files'], answer: 2, hint: 'Think about what a processor is made of.', explain: 'Logic gates — the building blocks of every chip.' },
        ],
      },
      {
        id: 'lg3', tag: 'Logic', title: 'If-Then Statements',
        subtitle: 'Day 3 · The most useful and most misused connector',
        pages: [
          { title: 'A promise with two parts', blocks: [
            { type: 'text', text: '"If it rains, then the game is cancelled." The first part is the condition; the second is what follows. Logicians write it P → Q.' },
            { type: 'concept', term: 'Conditional', def: 'An if-then statement. P is the hypothesis, Q is the conclusion.' },
          ]},
          { title: 'There is only one way to break it', blocks: [
            { type: 'text', text: 'A conditional is false in exactly one case: the condition happens and the promised result does not. Rain, and the game still goes ahead — the promise was broken.' },
            { type: 'callout', text: 'If it does not rain, the promise is not broken no matter what happens to the game. Nothing was claimed about sunny days.' },
          ]},
          { title: 'Flipping it changes the meaning', blocks: [
            { type: 'text', text: '"If it rains, the game is cancelled" does NOT mean "if the game is cancelled, it rained." The game could be cancelled for a dozen other reasons. That flipped version is called the converse, and it is a different claim.' },
            { type: 'example', text: '"If it is a dog, it is a mammal" — true. Converse: "if it is a mammal, it is a dog" — clearly false. A cat settles it.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Every if-statement you wrote in code is this. The computer checks the condition, and only then runs the block. Confusing a conditional with its converse is one of the most common bugs there is.' },
          ]},
        ],
        recap: [
          'A conditional says: if P, then Q.',
          'It is false only when P is true and Q is false.',
          'The converse flips it and means something different.',
        ],
        quiz: [
          { type: 'mc', prompt: '"If P then Q" is false only when:', choices: ['both are false', 'both are true', 'P is false and Q is true', 'P is true and Q is false'], answer: 3, hint: 'When is the promise actually broken?', explain: 'The condition happened and the result did not follow.' },
          { type: 'mc', prompt: 'Swapping the two halves of an if-then statement:', choices: ['can turn a true statement into a false one', 'keeps the meaning exactly the same', 'always makes the statement false', 'only matters inside mathematics'], answer: 0, hint: 'Four sides — is a rectangle a square?', explain: 'Every square has four sides, but plenty of four-sided shapes are not squares. Reversing an if-then is a different claim entirely.' },
          { type: 'mc', prompt: 'The converse of "if A then B" is:', choices: ['A and B', 'if B then A', 'not A', 'if not A then not B'], answer: 1, hint: 'Converse means swap the two parts.', explain: 'Swap hypothesis and conclusion.' },
          { type: 'mc', prompt: '"If it snows, school closes." It does not snow. The statement is:', choices: ['proven false', 'meaningless', 'not broken', 'broken'], answer: 2, hint: 'Was any claim made about non-snowy days?', explain: 'No claim was made, so nothing was broken.' },
        ],
      },
      {
        id: 'lg4', tag: 'Logic', title: 'Valid vs. True',
        subtitle: 'Day 4 · An argument can work perfectly and still be wrong',
        pages: [
          { title: 'Premises and a conclusion', blocks: [
            { type: 'text', text: 'An argument offers reasons — premises — and then a claim those reasons are meant to support.' },
            { type: 'visual', kind: 'argument' },
          ]},
          { title: 'Validity is about the shape', blocks: [
            { type: 'text', text: 'An argument is valid when the conclusion truly follows from the premises. Validity says nothing about whether the premises are actually true — only whether the reasoning holds.' },
            { type: 'concept', term: 'Valid', def: 'If the premises were true, the conclusion would have to be true.' },
          ]},
          { title: 'Valid but false', blocks: [
            { type: 'example', text: 'All birds can fly. A penguin is a bird. Therefore a penguin can fly. The reasoning is airtight — but the first premise is false, so the conclusion is wrong. Perfect logic, garbage input.' },
            { type: 'callout', text: 'This is exactly why you check the premises AND the reasoning. Either one can sink an argument.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Computer Science had a name for this: garbage in, garbage out. A correct program fed wrong data produces a wrong answer with total confidence. An argument works the same way.' },
          ]},
        ],
        recap: [
          'An argument has premises and a conclusion.',
          'Valid means the conclusion follows from the premises.',
          'A valid argument with false premises gives a false conclusion.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A valid argument guarantees that:', choices: ['the argument will persuade people', 'the conclusion is definitely true', 'the premises given are all true', 'if the premises are true, so is the end'], answer: 3, hint: 'Validity is conditional.', explain: 'Validity is about the link, not about the premises being true.' },
          { type: 'mc', prompt: 'An argument whose logic is airtight but whose conclusion is false must have:', choices: ['at least one false premise', 'a mistake in its reasoning', 'too few premises', 'nothing wrong with it at all'], answer: 0, hint: 'Remember the flying penguins.', explain: 'Validity is about the shape of the reasoning. Feed a valid shape a false premise and it will deliver a false conclusion perfectly.' },
          { type: 'mc', prompt: 'An argument that is valid AND has true premises is called:', choices: ['certain', 'sound', 'formal', 'strong'], answer: 1, hint: 'One word covers both conditions.', explain: 'Sound: valid plus true premises.' },
          { type: 'mc', prompt: '"Garbage in, garbage out" describes an argument that is:', choices: ['sound', 'neither valid nor true', 'valid with false premises', 'invalid with true premises'], answer: 2, hint: 'The machinery works; the input does not.', explain: 'Good reasoning, bad starting material.' },
        ],
      },
      {
        id: 'lg5', tag: 'Logic', title: 'Common Fallacies',
        subtitle: 'Day 5 · Arguments that feel right and are not',
        pages: [
          { title: 'Assuming what you set out to prove', blocks: [
            { type: 'text', text: 'Circular reasoning uses the conclusion as one of its own reasons. "This rule is fair because it is the fair thing to do" travels in a circle and never touches the ground.' },
            { type: 'concept', term: 'Circular reasoning', def: 'Using the conclusion as a premise supporting itself.' },
          ]},
          { title: 'Two things happening together', blocks: [
            { type: 'text', text: 'Ice cream sales and drowning both rise in July. Ice cream does not cause drowning — hot weather drives both. Things happening together is not one causing the other.' },
            { type: 'callout', text: 'Before claiming a cause, ask what else could explain both.' },
          ]},
          { title: 'Only two choices, offered falsely', blocks: [
            { type: 'text', text: '"Either we cancel the trip or nobody gets lunch." Presenting two options as the only ones, when others exist, is a false dilemma. The trick is in what got left off the list.' },
            { type: 'example', text: 'Real dilemmas exist — a light is on or off. The fallacy is inventing one where the options are actually many.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Government you looked at how a bill gets argued over. Spotting these three is what separates a real objection from a loud one — and it is the same skill whether the argument is in a debate or a comment section.' },
          ]},
        ],
        recap: [
          'Circular reasoning assumes what it is trying to prove.',
          'Things happening together does not mean one caused the other.',
          'A false dilemma hides the options it left out.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Ice cream sales and drownings both rise in summer. Concluding ice cream causes drowning is:', choices: ['a false dilemma between two', 'a valid argument from the data', 'circular reasoning about heat', 'mistaking correlation for cause'], answer: 3, hint: 'What third thing explains both?', explain: 'Hot weather drives both. Correlation is not causation.' },
          { type: 'mc', prompt: '“Either you agree with me or you hate science.” The problem with this is that it:', choices: ['offers only two options when more exist', 'uses emotional language', 'assumes what it is trying to prove', 'attacks the person instead of the claim'], answer: 0, hint: 'Count the options you are being offered.', explain: 'A false dilemma. You could disagree on one point and love science — but the sentence is built so that option does not appear.' },
          { type: 'mc', prompt: '"The book is good because it is well written, and it is well written because it is good" is:', choices: ['sound', 'circular reasoning', 'correlation', 'a false dilemma'], answer: 1, hint: 'Follow the reasons in a loop.', explain: 'Each claim leans on the other. Nothing supports either.' },
          { type: 'mc', prompt: 'The best first question when someone claims A causes B is:', choices: ['how loud they said it', 'whether it sounds right', 'what else could explain both', 'who said it'], answer: 2, hint: 'Look for a hidden third factor.', explain: 'Rule out a common cause before accepting the link.' },
        ],
      },
      {
        id: 'lg6', tag: 'Logic', title: 'Proof & Counterexample',
        subtitle: 'Day 6 · One exception is enough',
        pages: [
          { title: 'Universal claims are fragile', blocks: [
            { type: 'text', text: '"All swans are white" stood for centuries. Then someone found a black swan in Australia, and the claim was finished. One example destroyed it permanently.' },
            { type: 'concept', term: 'Counterexample', def: 'A single case that makes a universal claim false.' },
          ]},
          { title: 'Examples cannot prove a universal claim', blocks: [
            { type: 'text', text: 'You could check a million white swans and still not prove all swans are white — the next one might not be. Disproving takes one case; proving takes an argument covering every case.' },
            { type: 'callout', text: 'This asymmetry is the whole reason mathematical proof exists. Checking examples is never enough.' },
          ]},
          { title: 'Covering every case', blocks: [
            { type: 'text', text: 'When you cannot check every instance one by one, you split them into groups that cover all possibilities and handle each group. Every whole number is even or odd — prove it for both and you have proved it for all of them.' },
            { type: 'example', text: 'Claim: the square of any whole number is never negative. Case 1: positive times positive is positive. Case 2: negative times negative is positive. Case 3: zero squared is zero. All cases covered — proved.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Math you tested whether a rule always held. This is why that mattered: a rule that works for the numbers you tried can still fail on the one you did not. Proof is what closes that gap.' },
          ]},
        ],
        recap: [
          'One counterexample destroys a universal claim.',
          'No number of examples proves one.',
          'Proof by cases covers every possibility.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'How many counterexamples does it take to disprove "all swans are white"?', answer: 1, hint: 'Think about the black swan.', explain: 'One is enough, permanently.' },
          { type: 'mc', prompt: 'You check a thousand examples of a claim about ALL cases and every one fits. This:', choices: ['proves the claim', 'disproves the claim', 'proves it only for those thousand', 'supports it but never proves it'], answer: 3, hint: 'What about the one you did not check?', explain: 'A universal claim covers cases you have not seen. A thousand hits build confidence; one miss would settle it the other way instantly.' },
          { type: 'mc', prompt: 'To disprove "every prime number is odd" you would name:', choices: ['2', '9', '3', '7'], answer: 0, hint: 'Find a prime that is even.', explain: '2 is prime and even — a single counterexample.' },
          { type: 'mc', prompt: 'Splitting a claim into "even" and "odd" and proving both is:', choices: ['a counterexample', 'proof by cases', 'correlation', 'circular reasoning'], answer: 1, hint: 'The groups cover every possibility.', explain: 'Proof by cases — exhaust the options.' },
        ],
      },
    ],
  },

  earth: {
    name: 'Earth & Space', icon: Globe2, accent: '#38bdf8',
    blurb: 'The planet under you and the system it moves in.',
    days: [
      {
        id: 'es1', tag: 'Geology', title: "Earth's Layers",
        subtitle: 'Day 1 · Reading a planet you cannot open',
        pages: [
          { title: 'Four layers, wildly different', blocks: [
            { type: 'text', text: 'Crust on the outside — thin and rocky. Then the mantle, hot rock that flows slowly. Then a liquid outer core and a solid inner core of mostly iron.' },
            { type: 'concept', term: 'Crust', def: 'Earth’s thin outer rock layer. Under the oceans it is only about 5 to 10 km thick — under continents, far thicker.' },
          ]},
          { title: 'Nobody has ever been down there', blocks: [
            { type: 'text', text: 'The deepest hole ever drilled barely scratched the crust. Everything we know about the interior comes from watching earthquake waves travel through the planet and change speed.' },
            { type: 'callout', text: 'Waves again — from Physical Science. Their speed changes with the material, so the pattern arriving at the far side maps out what they passed through.' },
          ]},
          { title: 'Deeper means hotter and heavier', blocks: [
            { type: 'text', text: 'Pressure and temperature both climb steadily with depth. The inner core sits above 5,000°C — hot enough to melt iron — but stays solid because the pressure is crushing.' },
            { type: 'example', text: 'The outer core is liquid; the inner core is hotter still and solid. Pressure, not temperature, decides.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'The Fossils lane read history off rock layers at the surface. This is the same move at planetary scale: you cannot see the inside directly, so you read the evidence it leaves.' },
          ]},
        ],
        recap: [
          'Earth has crust, mantle, outer core and inner core.',
          'We map the interior using earthquake waves.',
          'Pressure keeps the hottest layer solid.',
        ],
        quiz: [
          { type: 'mc', prompt: 'How do scientists know what Earth’s interior is made of?', choices: ['core samples from volcanoes', 'deep drilling', 'earthquake waves', 'satellite photos'], answer: 2, hint: 'No drill has come close to the mantle.', explain: 'Seismic waves change speed in different materials, revealing the layers.' },
          { type: 'mc', prompt: 'The inner core is the hottest layer, yet it is solid. What keeps it that way?', choices: ['it has cooled more than the outer core', 'it is not actually the hottest layer', 'it is made of a different element', 'the enormous pressure on it'], answer: 3, hint: 'Something other than temperature decides state.', explain: 'Pressure. Squeeze hard enough and atoms cannot move past each other, however hot they are.' },
          { type: 'mc', prompt: 'Which layer is thin, rocky and on the outside?', choices: ['crust', 'outer core', 'inner core', 'mantle'], answer: 0, hint: 'It is the part you stand on.', explain: 'The crust — only a few kilometres thick under the oceans.' },
          { type: 'mc', prompt: 'Going deeper into Earth, temperature and pressure:', choices: ['both fall', 'both rise', 'rise then fall', 'stay constant'], answer: 1, hint: 'Both trend the same way.', explain: 'Both increase steadily with depth.' },
        ],
      },
      {
        id: 'es2', tag: 'Geology', title: 'Plate Tectonics',
        subtitle: 'Day 2 · The ground is moving right now',
        pages: [
          { title: 'The crust is broken into pieces', blocks: [
            { type: 'text', text: "Earth's outer shell is cracked into plates that drift on the hotter, softer rock beneath. They move a few centimetres a year — about the speed your fingernails grow." },
            { type: 'concept', term: 'Tectonic plate', def: 'A large slab of Earth’s rigid outer shell that slides slowly over the hotter, softer rock beneath it.' },
          ]},
          { title: 'Three things plates do at their edges', blocks: [
            { type: 'text', text: 'They pull apart, push together, or slide past each other. Nearly every earthquake, volcano and mountain range on Earth sits at one of these boundaries.' },
            { type: 'example', text: 'The Himalayas are still growing because India is still pushing into Asia. The San Andreas fault is two plates grinding past one another.' },
          ]},
          { title: 'The evidence stacked up', blocks: [
            { type: 'text', text: 'South America and Africa fit together like puzzle pieces. Matching fossils appear on both coasts. Matching rock layers line up. No single clue proved it, but together they were overwhelming.' },
            { type: 'visual', kind: 'plates' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Matching fossils on two continents is exactly the reasoning from the Fossils lane. And it is Logic: several independent lines pointing the same way is far stronger than one.' },
          ]},
        ],
        recap: [
          'The crust is broken into slowly moving plates.',
          'Plates pull apart, collide, or slide past each other.',
          'Coastline fit, fossils and rock layers together proved it.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Roughly how fast do tectonic plates move?', choices: ['a few metres a year', 'a few kilometres a year', 'a few centimetres a year', 'they do not move'], answer: 2, hint: 'About as fast as fingernails grow.', explain: 'Centimetres per year — slow, but relentless over millions of years.' },
          { type: 'mc', prompt: 'Most earthquakes and volcanoes happen:', choices: ['in the middle of plates', 'randomly across Earth', 'only at the equator', 'at plate boundaries'], answer: 3, hint: 'Think about where the action is.', explain: 'Plate edges are where the stress concentrates.' },
          { type: 'mc', prompt: 'Identical fossils turn up on continents now separated by ocean. The best explanation is:', choices: ['the continents were once joined', 'the animals swam across', 'the species evolved twice, identically', 'the fossils were misidentified'], answer: 0, hint: 'Which explanation needs the fewest lucky coincidences?', explain: 'Land-dwelling species that could not cross an ocean appear on both sides — because the land was one piece when they lived.' },
          { type: 'mc', prompt: 'The Himalayas are still rising because:', choices: ['sea level is falling', 'two plates are colliding', 'erosion is slowing', 'the crust is cooling'], answer: 1, hint: 'India is still moving north.', explain: 'A continuing collision keeps pushing them up.' },
        ],
      },
      {
        id: 'es3', tag: 'Earth Systems', title: 'The Water Cycle',
        subtitle: 'Day 3 · The same water, over and over',
        pages: [
          { title: 'Water keeps changing state', blocks: [
            { type: 'text', text: 'The cycle runs on the state changes you already know: liquid to gas, gas back to liquid, and sometimes straight to solid.' },
            { type: 'callout', text: 'This is Physical Science Day 1 doing real work. Evaporation is melting’s cousin — add energy, particles break free.' },
          ]},
          { title: 'Up, across, and down again', blocks: [
            { type: 'text', text: 'The sun evaporates water from oceans and lakes. It rises, cools, and condenses into clouds. When droplets grow heavy enough, they fall as precipitation.' },
            { type: 'visual', kind: 'flow', steps: ['Evaporate', 'Condense', 'Precipitate', 'Collect'], cycle: true,
              cycleLabel: 'and round again \u2014 the same water, forever' },
          ]},
          { title: 'Nothing is added or lost', blocks: [
            { type: 'text', text: 'Earth has essentially the same water it had when dinosaurs drank it. It is not consumed — only moved and changed in form.' },
            { type: 'example', text: 'The water in your glass has been in oceans, clouds, rivers and other living things, many times over.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Conservation of energy said the total never changes, only the form. Water does the same thing. Recognising a conservation law is one of the most useful moves in all of science.' },
          ]},
        ],
        recap: [
          'The water cycle runs on changes of state.',
          'Evaporation, condensation, precipitation, collection.',
          'Water is conserved — moved and transformed, never used up.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Water vapour turning back into liquid droplets is:', choices: ['evaporation', 'collection', 'condensation', 'precipitation'], answer: 2, hint: 'It is what forms a cloud.', explain: 'Condensation — gas to liquid as it cools.' },
          { type: 'mc', prompt: 'The amount of water on Earth is:', choices: ['created fresh by every rainfall', 'growing noticeably with each year', 'shrinking quickly as we use it', 'essentially fixed — the same water cycles'], answer: 3, hint: 'Think about where the dinosaurs’ drinking water went.', explain: 'It is the same water, cycling. Rain does not create water, it moves it — which is why what you drank today is genuinely ancient.' },
          { type: 'mc', prompt: 'What supplies the energy driving the water cycle?', choices: ['the sun', "Earth's core", 'the wind', 'the moon'], answer: 0, hint: 'What makes water evaporate?', explain: 'Solar energy powers evaporation.' },
          { type: 'mc', prompt: 'The water cycle is an example of:', choices: ['a one-way process', 'a conservation law', 'a chemical reaction', 'radioactive decay'], answer: 1, hint: 'Compare it to energy conservation.', explain: 'The total is conserved; only the form and location change.' },
        ],
      },
      {
        id: 'es4', tag: 'Earth Systems', title: 'Weather vs. Climate',
        subtitle: 'Day 4 · One day against thirty years',
        pages: [
          { title: 'Two different timescales', blocks: [
            { type: 'text', text: 'Weather is what the atmosphere is doing right now. Climate is the pattern that same place shows over decades.' },
            { type: 'concept', term: 'Climate', def: 'The long-term average pattern of weather for a place, usually measured over 30 years or more.' },
          ]},
          { title: 'Uneven heating drives it', blocks: [
            { type: 'text', text: 'The sun heats the equator more than the poles. That difference makes air move, and moving air is what weather is made of.' },
            { type: 'callout', text: 'Convection, from Physical Science — warm fluid rises, cool sinks. The atmosphere is one enormous convection system.' },
          ]},
          { title: 'One data point is not a trend', blocks: [
            { type: 'text', text: 'A single cold day tells you nothing about climate, the same way one coin flip tells you nothing about the coin. You need many measurements over a long time before a pattern is real.' },
            { type: 'visual', kind: 'graph' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'In Math you read trends off a graph rather than off single points. And in Logic: one example neither proves nor disproves a general claim. Weather is the example; climate is the claim.' },
          ]},
        ],
        recap: [
          'Weather is right now; climate is the long-term pattern.',
          'Uneven solar heating drives air movement.',
          'A single measurement is not a trend.',
        ],
        quiz: [
          { type: 'mc', prompt: '"It snowed today" is a statement about:', choices: ['both equally', 'neither', 'weather', 'climate'], answer: 2, hint: 'What timescale is one day?', explain: 'A single day is weather.' },
          { type: 'mc', prompt: 'One unusually cold winter tells you:', choices: ['the long-term trend has reversed', 'that the measurements were wrong', 'nothing at all about anything', 'about weather, not about climate'], answer: 3, hint: 'One data point against a long-term pattern.', explain: 'Weather is right now; climate is the pattern over decades. A single cold winter sits inside the pattern rather than replacing it.' },
          { type: 'mc', prompt: 'Climate is usually averaged over at least:', choices: ['30 years', 'a year', 'a week', '5 days'], answer: 0, hint: 'It is decades, not seasons.', explain: 'Thirty years is the standard window.' },
          { type: 'mc', prompt: 'What ultimately drives most weather?', choices: ["Earth's core heat", 'uneven heating by the sun', 'plate movement', 'the moon’s gravity'], answer: 1, hint: 'Compare the equator with the poles.', explain: 'The heating difference sets air in motion.' },
        ],
      },
      {
        id: 'es5', tag: 'Astronomy', title: 'Earth, Moon & Sun',
        subtitle: 'Day 5 · Why we get days, years and seasons',
        pages: [
          { title: 'Spinning and circling', blocks: [
            { type: 'text', text: 'Earth rotates on its axis once a day — that is day and night. It revolves around the sun once a year. Two different motions, two different units of time.' },
            { type: 'visual', kind: 'orbit' },
          ]},
          { title: 'Seasons come from tilt', blocks: [
            { type: 'text', text: "Earth's axis is tilted about 23.5 degrees. That tilt, not distance from the sun, causes the seasons — the tilted hemisphere gets more direct sunlight and longer days." },
            { type: 'callout', text: 'A common mistake: Earth is actually closest to the sun in January. Distance is not the cause. Tilt is.' },
          ]},
          { title: 'The moon changes what we see', blocks: [
            { type: 'text', text: 'Half the moon is always lit. What changes is how much of the lit half faces us as it orbits — that is the cycle of phases, about 29.5 days.' },
            { type: 'example', text: 'A full moon means we are seeing the whole lit side. A new moon means the lit side faces away.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'The tilt explanation is the Logic lane in action: the obvious answer — "summer is when we are closer" — is wrong, and one fact kills it. Earth is nearest the sun during northern winter. Counterexample.' },
          ]},
        ],
        recap: [
          'Rotation gives day and night; revolution gives the year.',
          'Seasons come from axial tilt, not distance.',
          'Moon phases depend on how much of the lit half faces us.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What causes Earth’s seasons?', choices: ['solar flares', 'the moon’s pull', 'the tilt of the axis', 'distance from the sun'], answer: 2, hint: 'Earth is closest to the sun in January.', explain: 'The 23.5° tilt changes how directly sunlight strikes each hemisphere.' },
          { type: 'mc', prompt: 'What causes summer in the northern hemisphere?', choices: ['the Sun giving off more energy', 'Earth being at its closest to the Sun', 'Earth spinning faster on its axis', 'the northern half tilting toward the Sun'], answer: 3, hint: 'This one surprises almost everybody.', explain: 'Tilt, not distance. Earth is actually slightly farther from the Sun during northern summer — distance is not what makes the seasons.' },
          { type: 'mc', prompt: 'One rotation of Earth takes about:', choices: ['a day', 'an hour', 'a month', 'a year'], answer: 0, hint: 'Rotation is spinning on the axis.', explain: 'One rotation is one day.' },
          { type: 'mc', prompt: 'How much of the moon is lit by the sun at any moment?', choices: ['it varies', 'half of it', 'all of it', 'a quarter'], answer: 1, hint: 'Separate what is lit from what we can see.', explain: 'Half is always lit; the phase is how much of that half we see.' },
        ],
      },
      {
        id: 'es6', tag: 'Astronomy', title: 'Gravity & Orbits',
        subtitle: 'Day 6 · Falling forever and never landing',
        pages: [
          { title: 'Mass pulls on mass', blocks: [
            { type: 'text', text: 'Every object with mass attracts every other one. More mass means a stronger pull; more distance means a weaker one.' },
            { type: 'visual', kind: 'gravity' },
          ]},
          { title: 'Distance matters more than you would guess', blocks: [
            { type: 'text', text: 'Double the distance and the pull does not halve — it drops to a quarter. Triple it and you get a ninth. Gravity weakens with the square of distance.' },
            { type: 'formula', text: 'pull ∝ 1 / distance²', label: 'the inverse square law' },
            { type: 'callout', text: 'Squares and inverse relationships, from Math. The exponent is doing the heavy lifting here.' },
          ]},
          { title: 'An orbit is falling sideways', blocks: [
            { type: 'text', text: 'The moon is falling toward Earth constantly. It also moves sideways fast enough that it keeps missing. That combination — falling and missing — is an orbit.' },
            { type: 'example', text: 'Throw a ball harder and it lands farther away. Throw it fast enough and the ground curves away as quickly as the ball falls. It never lands. It is in orbit.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Physical Science Day 3 said motion only changes when a force acts. Gravity is that force here — constantly changing the moon’s direction without ever changing its speed much. Same law, bigger stage.' },
          ]},
        ],
        recap: [
          'Gravity depends on mass and distance.',
          'Doubling distance cuts the pull to one quarter.',
          'An orbit is falling forward fast enough to keep missing.',
        ],
        quiz: [
          { type: 'mc', prompt: 'If you double the distance between two objects, gravity between them becomes:', choices: ['half as strong', 'twice as strong', 'one quarter as strong', 'unchanged'], answer: 2, hint: 'It is an inverse SQUARE law.', explain: '2 squared is 4, so the pull drops to one quarter.' },
          { type: 'mc', prompt: 'Why does the Moon never crash into Earth?', choices: ['it is far too light to fall', 'there is no gravity that far out', 'Earth pushes it away constantly', 'it moves sideways fast enough to miss'], answer: 3, hint: 'If it is falling, why does it never land?', explain: 'It is falling constantly — and travelling sideways fast enough that it keeps missing. An orbit is a fall that never arrives.' },
          { type: 'numeric', prompt: 'If you triple the distance, gravity becomes one over what number?', answer: 9, hint: 'Square the 3.', explain: '3² = 9, so the pull is one ninth.' },
          { type: 'mc', prompt: 'What keeps a satellite in orbit rather than flying off?', choices: ['gravity', 'air pressure', 'magnetism', 'its engines'], answer: 0, hint: 'Which force bends its path into a circle?', explain: 'Gravity continually pulls it away from a straight line.' },
        ],
      },
    ],
  },
};
