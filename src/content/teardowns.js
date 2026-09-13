import { Wrench } from 'lucide-react';

/* Teardowns — borrowed wholesale from Branch Education.
 *
 * Every other lane in this app runs the same direction: here is an idea, now
 * here is where it shows up. Branch Education runs the opposite way. It picks
 * one real object, opens it, and follows each piece down until the piece is
 * genuinely explained — a video about a phone branches into the touchscreen,
 * the battery, the camera and the chip, and each branch is done properly
 * rather than waved at.
 *
 * That inversion matters for this kid specifically. "Conservation of energy"
 * is an intimidating way in. "A pencil" is not. He will follow a pencil into
 * chemistry and geology without ever deciding in advance whether he is the
 * sort of person who can do chemistry and geology.
 *
 * Every day is built the same way, and the shape is the point:
 *
 *   1. The object, and the question nobody thinks to ask about it
 *   2. Branch one — into a lane he has finished
 *   3. Branch two — into a different lane he has finished
 *   4. A scale block: one number, purely for awe, never quizzed
 *   5. "You already knew all of this" — every lane the day drew on, named
 *
 * Page five is the payload. The day ends by listing what he brought to it,
 * not what it taught him. For a kid who consistently underrates himself, an
 * accurate inventory of what he already knows is the most useful thing this
 * app can hand him.
 *
 * Like Connections, every day declares `requires`, so a teardown only opens
 * once the pieces it takes apart are actually in his hands. A teardown of
 * something he has no tools for is just a magic trick.
 *
 * Day ids td1-td6. Never renumber, never reuse. */

export const TEARDOWNS = {
  teardown: {
    name: 'Teardowns', icon: Wrench, accent: '#fb923c',
    blurb: 'One ordinary object, opened up. Everything inside is something you already know.',
    days: [
      /* ---- td1 ---------------------------------------------------------- */
      {
        id: 'td1', tag: 'Teardown', title: 'A Pencil',
        subtitle: 'Graphite · Rock · Cost',
        requires: ['chem:ch4', 'fossils:f3'],
        pages: [
          { title: 'The least interesting object in the room', blocks: [
            { type: 'text', text: 'A wooden stick with grey stuff in the middle. Nobody has ever wondered how a pencil works. So here is the question nobody asks: why does the grey stuff come off on the paper, but the wood does not?' },
            { type: 'callout', text: 'Hold that question. The answer is something you learned three weeks ago in a completely different lane.' },
          ]},
          { title: 'Branch one: the grey stuff is not lead', blocks: [
            { type: 'text', text: 'It is graphite — pure carbon, exactly the same element as diamond. The difference is only how the atoms are bonded: diamond locks them into a rigid three-dimensional frame, graphite stacks them in flat sheets.' },
            { type: 'text', text: 'The sheets are strongly bonded inside themselves and barely held to each other at all. Drag graphite across paper and whole sheets slide off and stay there. That grey line is layers of carbon, one atom thick, left behind.' },
            { type: 'callout', text: 'You wrote this sentence yourself in Chemistry day 4. The hardest natural substance and the stuff in a pencil are the same element — arrangement is not a detail. This is that fact doing a job.' },
          ]},
          { title: 'Branch two: where the graphite was before', blocks: [
            { type: 'text', text: 'Graphite starts as carbon in ancient sediment — usually the remains of living things — buried under later layers and squeezed for a very long time. Heat and pressure rearrange the carbon into sheets.' },
            { type: 'text', text: 'Which means the rules for reading rock layers apply directly. Graphite is found in metamorphic rock, and metamorphic rock sits at a predictable depth. Geologists do not hunt for graphite at random; they read the layers and know where to dig.' },
            { type: 'example', text: 'Superposition, from Fossils day 3: deeper layers are older. That single rule is why a mining survey is a survey rather than a guess.' },
          ]},
          { title: 'One number', blocks: [
            { type: 'scale', value: '56 km', unit: 'line a single pencil can draw',
              note: 'The figure usually quoted is about 45,000 words, or roughly 56 kilometres of line, from one pencil. Each stroke leaves layers of carbon a few atoms thick — which is why so little material goes such an absurd distance.' },
          ]},
          { title: 'You already knew all of this', blocks: [
            { type: 'text', text: 'Covalent bonding and why arrangement changes properties — Chemistry. Metamorphic rock and reading layers — Fossils & Deep Time. Nothing on this page was new.' },
            { type: 'callout', text: 'That is the actual point of a teardown. You did not learn how a pencil works today. You found out you already knew, and nobody had connected it up for you.' },
          ]},
        ],
        recap: [
          'Pencil "lead" is graphite — pure carbon in sliding sheets, not lead at all.',
          'The sheets come off easily because they are barely bonded to each other.',
          'Graphite forms from buried carbon under heat and pressure, in readable layers.',
          'Both halves of that came from lanes you had already finished.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Graphite marks paper because its carbon atoms are arranged in:', choices: ['a rigid three-dimensional frame', 'one long single chain of atoms', 'sheets that slide off each other easily', 'a liquid held inside the casing'], answer: 2, hint: 'What is different about graphite compared with diamond?', explain: 'Sheets strongly bonded within themselves and weakly to each other — so they slide off onto the paper.' },
          { type: 'mc', prompt: 'Pencil “lead” is actually made of:', choices: ['lead', 'compressed clay only', 'iron', 'graphite — a form of carbon'], answer: 3, hint: 'What element is it really?', explain: 'Graphite, which is pure carbon in sliding sheets. The name is a centuries-old mistake that stuck.' },
          { type: 'mc', prompt: 'Diamond and graphite have wildly different properties because they differ in:', choices: ['how the atoms are bonded', 'their temperature', 'which element they contain', 'their number of protons'], answer: 0, hint: 'Check what each is made of first.', explain: 'Both are pure carbon. Only the bonding arrangement differs — straight from Chemistry day 4.' },
          { type: 'mc', prompt: 'Geologists can predict where to find graphite because:', choices: ['it glows faintly under ultraviolet', 'rock layers form in a readable order', 'it floats to the surface of water', 'it is strongly magnetic underground'], answer: 1, hint: 'What did Fossils day 3 say about layers?', explain: 'Layers form in order, so depth predicts what kind of rock is there.' },
        ],
      },

      /* ---- td2 ---------------------------------------------------------- */
      {
        id: 'td2', tag: 'Teardown', title: 'A Bicycle',
        subtitle: 'Gears · Forces · Where the energy goes',
        requires: ['math:m1', 'physics:phy3'],
        pages: [
          { title: 'Why does changing gear help at all?', blocks: [
            { type: 'text', text: 'You are pedalling the same legs at roughly the same speed either way. The hill did not get shorter. So what exactly does a gear change do?' },
            { type: 'callout', text: 'The answer is a ratio, and you learned it on the very first day of Mathematics.' },
          ]},
          { title: 'Branch one: a gear is a ratio wearing metal', blocks: [
            { type: 'text', text: 'The front gear has some number of teeth; the back gear has some number of teeth. Divide one by the other and you have how many times the back wheel turns for one turn of the pedals.' },
            { type: 'formula', text: 'wheel turns per pedal turn = front teeth ÷ back teeth', label: 'a unit rate, from Mathematics day 1' },
            { type: 'text', text: '48 front teeth over 16 back teeth is 3 — three wheel turns per pedal turn, fast and hard. 48 over 24 is 2 — slower, easier. You have not changed how hard you can push. You have changed how the push is spent.' },
          ]},
          { title: 'Branch two: nothing is free', blocks: [
            { type: 'text', text: 'A low gear does not create force out of nothing. You trade distance for force: the pedals go round more times to cover the same ground, and each turn is easier. Multiply force by distance and the total is the same either way.' },
            { type: 'text', text: 'That is why a bike helps on a hill and a shortcut does not exist. Physical Science day 4 said energy converts but the total never changes. A gearbox is that law with teeth on it.' },
            { type: 'example', text: 'Same reason a ramp beats a ladder for a heavy box. Longer path, smaller push, identical energy.' },
          ]},
          { title: 'One number', blocks: [
            { type: 'scale', value: '~95%', unit: 'of your effort reaches the wheel',
              note: 'A well-maintained chain drive delivers around 95% of the energy you put in — better than almost any engine ever built. A car engine throws away most of its fuel as heat. Your legs and a chain barely lose anything.' },
          ]},
          { title: 'You already knew all of this', blocks: [
            { type: 'text', text: 'Unit rates — Mathematics day 1. Force and how it changes motion — Physical Science day 3. Energy converting without ever increasing — Physical Science day 4.' },
            { type: 'callout', text: 'Three days, from two lanes, months apart. Put together they explain something you have used since you were five and never once had explained to you.' },
          ]},
        ],
        recap: [
          'A gear ratio is teeth divided by teeth — a unit rate.',
          'A low gear trades distance for force; the energy total is unchanged.',
          'Force × distance stays the same, which is why there is no shortcut.',
          'Chain drives are unusually efficient — around 95%.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'A bike has 48 teeth on the front gear and 12 on the back. How many wheel turns per pedal turn?', answer: 4, hint: 'Front teeth divided by back teeth.', explain: '48 ÷ 12 = 4. Four wheel turns for every turn of the pedals — a fast, hard gear.' },
          { type: 'mc', prompt: 'Changing to a lower gear makes pedalling easier because you:', choices: ['create extra force', 'reduce the weight of the bike', 'trade distance for force', 'lower the total energy needed'], answer: 2, hint: 'What happens to how far the pedals travel?', explain: 'More pedal turns for the same ground, each one easier. The energy total does not change.' },
          { type: 'mc', prompt: 'Riding up a hill in a low gear changes:', choices: ['nothing about the ride at all', 'the total energy the climb needs', 'the effective height of the hill', 'how hard each pedal stroke feels'], answer: 3, hint: 'What did Physical Science say about energy?', explain: 'You trade force for distance — more turns, each easier. The energy to lift you up the hill is the same either way.' },
          { type: 'mc', prompt: 'A gear ratio is the same kind of thing as:', choices: ['a unit rate', 'a percentage increase', 'a square root', 'an exponent'], answer: 0, hint: 'How many of one thing per one of another?', explain: 'Wheel turns per one pedal turn — the unit rate from Mathematics day 1.' },
        ],
      },

      /* ---- td3 ---------------------------------------------------------- */
      {
        id: 'td3', tag: 'Teardown', title: 'A Loaf of Bread',
        subtitle: 'Living things · Gas · Temperature',
        requires: ['chem:ch10', 'bio:bio9'],
        pages: [
          { title: 'Why is it full of holes?', blocks: [
            { type: 'text', text: 'Flour and water make a dense paste. Bread is mostly air. Something put thousands of separate bubbles inside that paste and then made them stay there.' },
            { type: 'callout', text: 'Something alive did it, and you already know what kind of thing.' },
          ]},
          { title: 'Branch one: an organism you cannot see is eating', blocks: [
            { type: 'text', text: 'Yeast is a fungus — a single-celled living organism, millions of them in a spoonful. Feed them the sugars in flour and they do what living things do: consume, and give off waste. Their waste is carbon dioxide gas.' },
            { type: 'text', text: 'Each bubble in a slice of bread is a pocket of gas exhaled by a colony of organisms. Baking kills the yeast and sets the dough around the holes they left.' },
            { type: 'callout', text: 'Biology day 9 said the living things you cannot see are doing most of the work on this planet. This is one of the oldest examples humans ever put to use deliberately.' },
          ]},
          { title: 'Branch two: why the recipe insists on warm water', blocks: [
            { type: 'text', text: 'Yeast works through enzymes, and an enzyme is a catalyst — it lowers the energy a reaction needs without being used up. Warm the dough and the particles move faster, collide more often, and the whole process speeds up.' },
            { type: 'text', text: 'Too hot and the enzymes are destroyed and nothing rises at all. That is the entire reason a bread recipe specifies a temperature instead of saying "some water".' },
            { type: 'example', text: 'Chemistry day 10: heat, concentration and surface area all raise the collision rate. A recipe is a set of instructions for controlling exactly those.' },
          ]},
          { title: 'One number', blocks: [
            { type: 'scale', value: '20 billion', unit: 'yeast cells in a single gram',
              note: 'One gram of dried yeast holds roughly 20 billion living organisms — more than twice the number of people on Earth, sitting in a paper sachet in a kitchen drawer, waiting.' },
          ]},
          { title: 'You already knew all of this', blocks: [
            { type: 'text', text: 'Microorganisms and what they do — Biology day 9. Enzymes as catalysts, and why temperature changes reaction rate — Chemistry day 10.' },
            { type: 'callout', text: 'Baking bread is a controlled biology experiment that humans were running for thousands of years before anyone knew yeast existed. You know why it works. They did not.' },
          ]},
        ],
        recap: [
          'The holes in bread are carbon dioxide given off by living yeast.',
          'Yeast is a single-celled fungus — millions in a spoonful.',
          'Warm water speeds the enzymes up; too much heat destroys them.',
          'That is Chemistry day 10 and Biology day 9, in a kitchen.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The holes in a slice of bread are:', choices: ['gaps left behind by clumps of flour', 'carbon dioxide given off by yeast', 'air whisked in during the mixing', 'pockets of steam from the oven'], answer: 1, hint: 'Something living produced them.', explain: 'Yeast consumes sugars and gives off CO2. Baking sets the dough around the bubbles.' },
          { type: 'mc', prompt: 'Yeast is:', choices: ['a chemical powder', 'a mineral', 'a single-celled fungus', 'a kind of flour'], answer: 2, hint: 'Is it alive?', explain: 'A living single-celled fungus — one of the microorganisms from Biology day 9.' },
          { type: 'mc', prompt: 'Mixing bread dough with boiling water instead of warm water would:', choices: ['make it rise faster', 'make the bread denser but still rise', 'make no difference', 'kill the yeast so it does not rise at all'], answer: 3, hint: 'What is the yeast, exactly?', explain: 'Yeast is alive. Warm wakes it up; boiling kills it, and dead yeast produces no gas at all.' },
          { type: 'mc', prompt: 'Warm water speeds up rising because the particles:', choices: ['collide more often', 'change element', 'dissolve more', 'get heavier'], answer: 0, hint: 'What does temperature actually measure?', explain: 'Temperature is particle motion, so warmth means more collisions — Chemistry day 10 exactly.' },
        ],
      },

      /* ---- td4 ---------------------------------------------------------- */
      {
        id: 'td4', tag: 'Teardown', title: 'The Battery in Your Hand',
        subtitle: 'Electrons · Ions · Stored energy',
        requires: ['chem:ch4', 'physics:phy4'],
        pages: [
          { title: 'What is actually stored in a charged battery?', blocks: [
            { type: 'text', text: 'Not electricity. You cannot put electricity in a box any more than you can put a push in a box. Something else is in there, and it is chemical.' },
            { type: 'callout', text: 'A battery is a chemical reaction that has been stopped halfway and told to wait.' },
          ]},
          { title: 'Branch one: two materials that want to swap electrons', blocks: [
            { type: 'text', text: 'A battery holds two different materials separated by a barrier. One of them holds its outer electrons loosely, the other wants them. Connect the two ends and the electrons finally get to move — but the only route open to them runs out through your phone.' },
            { type: 'text', text: 'Electrons flowing through a circuit is what current is. The battery does not push electricity into the phone; it offers electrons a path they were already desperate to take, and the path goes through the work you wanted done.' },
            { type: 'callout', text: 'Chemistry day 3: an atom with a spare outer electron gives it away, an atom one short takes it. A battery is that transaction with a toll booth in the middle.' },
          ]},
          { title: 'Branch two: charging runs it backwards', blocks: [
            { type: 'text', text: 'Plugging it in forces the electrons back where they started. That costs energy — more than you get back out, always, because some is lost as heat. Which is why a charging phone is warm, and why no battery has ever been 100% efficient.' },
            { type: 'text', text: 'Nothing was created and nothing vanished. Energy went from the wall into a chemical arrangement, waited, and came back out as light and sound and heat.' },
            { type: 'example', text: 'Physical Science day 4 promised energy converts but never changes total. A battery is the most literal storage locker for that promise you will ever hold.' },
          ]},
          { title: 'One number', blocks: [
            { type: 'scale', value: '500+', unit: 'full charges before it fades',
              note: 'Every charge slightly damages the internal structure. After several hundred cycles the same battery holds noticeably less — not because it "forgets", but because a physical arrangement has been rearranged a few hundred times and does not come back perfectly.' },
          ]},
          { title: 'You already knew all of this', blocks: [
            { type: 'text', text: 'Electrons and why atoms give or take them — Chemistry day 3. Ionic bonding and charge attraction — Chemistry day 4. Energy converting without ever increasing — Physical Science day 4.' },
            { type: 'callout', text: 'Every single component of that explanation was already yours. The only thing missing was somebody saying the word "battery" while you held them.' },
          ]},
        ],
        recap: [
          'A battery stores chemical arrangement, not electricity.',
          'Current is electrons moving, and the battery offers them a path through your device.',
          'Charging forces the reaction backwards and always costs more than it returns.',
          'The lost energy leaves as heat — which is why a charging phone is warm.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A charged battery actually stores:', choices: ['electricity held in a container', 'a chemical arrangement it can release', 'heat that is slowly given off', 'compressed air under pressure'], answer: 1, hint: 'Can you keep a push in a box?', explain: 'It stores a chemical setup ready to react. The electricity happens when you let it.' },
          { type: 'mc', prompt: 'Charging a battery and then draining it returns:', choices: ['exactly as much energy as went in', 'more than went in', 'less than went in — some was lost as heat', 'the same, if you charge it slowly'], answer: 2, hint: 'Why does a charger get warm?', explain: 'Some is always lost as heat. That warm charger is the missing energy, leaving where you can feel it.' },
          { type: 'mc', prompt: 'An electric current is:', choices: ['heat travelling', 'light in a wire', 'atoms splitting', 'electrons moving'], answer: 3, hint: 'Which part of the atom is free to move?', explain: 'Moving electrons — the outer ones, the same ones that do all the bonding.' },
          { type: 'mc', prompt: 'A phone gets warm while charging because:', choices: ['some energy is lost as heat', 'the screen is on', 'the battery is full', 'electrons weigh more'], answer: 0, hint: 'Where does the missing energy go?', explain: 'No conversion is perfect. The difference leaves as heat, exactly as Physical Science predicted.' },
        ],
      },

      /* ---- td5 ---------------------------------------------------------- */
      {
        id: 'td5', tag: 'Teardown', title: 'The Screen You Are Touching',
        subtitle: 'Charge · Coordinates · Numbers',
        requires: ['chem:ch3', 'cs:c5'],
        pages: [
          { title: 'How does glass know where your finger is?', blocks: [
            { type: 'text', text: 'The screen is sealed. Your finger never touches anything electrical. And yet it knows where you tapped, to within a millimetre, sixty times a second.' },
            { type: 'callout', text: 'It is not detecting pressure. Try it with a knuckle and a pencil eraser — one works, one does not, and they push equally hard.' },
          ]},
          { title: 'Branch one: your finger is slightly conductive', blocks: [
            { type: 'text', text: 'Under the glass is a grid of transparent wires holding a tiny electrical charge. You are mostly saltwater, and saltwater conducts — so bringing a finger close changes the charge at that spot on the grid, without touching anything.' },
            { type: 'text', text: 'That is why gloves fail and a pencil eraser fails: neither conducts. It is also why a touchscreen works through a thin plastic protector but not through a thick one.' },
            { type: 'callout', text: 'Chemistry day 9 said dissolving salt in water spreads charged particles all through it. You are a bag of that, and the screen is reading you.' },
          ]},
          { title: 'Branch two: the change becomes two numbers', blocks: [
            { type: 'text', text: 'The grid reports which row and which column changed. Row and column is an x and a y — a pair of numbers. Everything after that point is software: the phone asks which thing on screen currently occupies that coordinate, and tells it that it was tapped.' },
            { type: 'text', text: 'That is the whole trick. A physical event became a pair of numbers stored in variables, and from there it is ordinary programming.' },
            { type: 'example', text: 'Computer Science day 5: a variable holds a value you can look at later. tapX and tapY are two of the most-used variables on Earth.' },
          ]},
          { title: 'One number', blocks: [
            { type: 'scale', value: '60–120', unit: 'times per second the grid is read',
              note: 'The whole grid is scanned and re-scanned up to 120 times every second. The reason a drag feels like the picture is stuck to your finger is that the phone re-checks where you are roughly every eight milliseconds.' },
          ]},
          { title: 'You already knew all of this', blocks: [
            { type: 'text', text: 'Electrons, charge, and what conducts — Chemistry day 3. Charged particles spread through a solution — Chemistry day 9. Variables holding values — Computer Science day 5.' },
            { type: 'callout', text: 'A touchscreen is one physics idea and one programming idea shaking hands. You have held both for weeks.' },
          ]},
        ],
        recap: [
          'The screen senses charge, not pressure.',
          'Your finger works because you are mostly conductive saltwater.',
          'The grid turns a touch into a row and a column — an x and a y.',
          'After that it is ordinary variables and ordinary code.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A phone screen detects your finger by sensing:', choices: ['the pressure of your fingertip', 'a change in electrical charge', 'light being blocked by a finger', 'the warmth of your skin'], answer: 1, hint: 'Why does a pencil eraser fail even when you press hard?', explain: 'It reads charge. An eraser pushes just as hard and does not conduct, so nothing registers.' },
          { type: 'mc', prompt: 'A phone screen ignores a thick glove because the screen senses:', choices: ['pressure, and the glove spreads it too thinly', 'heat, and the glove is too cold', 'electrical charge, which the glove blocks', 'movement, and the glove is too slow'], answer: 2, hint: 'Is it really pressing that it detects?', explain: 'It senses charge, not pressure — which is why a light touch of skin works and a firm press with a glove does not.' },
          { type: 'mc', prompt: 'Your finger affects the screen because your body is largely:', choices: ['magnetic in small amounts', 'mostly non-magnetic metal', 'warmer than the screen is', 'largely conductive saltwater'], answer: 3, hint: 'What did Chemistry day 9 say about salt in water?', explain: 'Dissolved salt spreads charged particles through water, and you are mostly that.' },
          { type: 'mc', prompt: 'Once the grid detects a touch, it hands the software:', choices: ['a pair of coordinates', 'a pressure reading', 'a picture', 'a sound'], answer: 0, hint: 'A row and a column are what, together?', explain: 'An x and a y, stored in variables. Everything after that is normal programming.' },
        ],
      },

      /* ---- td6 ---------------------------------------------------------- */
      {
        id: 'td6', tag: 'Teardown', title: 'Water From the Tap',
        subtitle: 'The cycle · What is dissolved in it · Who pays',
        requires: ['earth:es3', 'chem:ch9'],
        pages: [
          { title: 'Where was this water last week?', blocks: [
            { type: 'text', text: 'It came out of a tap. Before that, a pipe. Before that — and this is the part worth sitting with — it was somewhere specific, and not long ago, and it has been through this before.' },
            { type: 'callout', text: 'No water is ever made. Every glass you have ever drunk is water that already existed, on its way round again.' },
          ]},
          { title: 'Branch one: it evaporated, and left everything behind', blocks: [
            { type: 'text', text: 'Water evaporates from oceans and lakes and leaves its dissolved salts behind — that is why rain is fresh and the sea is not. It falls, collects, soaks through ground and rock, and is drawn out again.' },
            { type: 'text', text: 'But on the way through the ground it dissolves new things. Calcium and magnesium from rock make water "hard" — the reason a kettle furs up and soap will not lather properly in some places and does in others.' },
            { type: 'callout', text: 'Earth & Space day 3 gave you the cycle. Chemistry day 9 gave you the solute and the solvent. Hard water is those two facts in the same sentence.' },
          ]},
          { title: 'Branch two: someone measured it before it reached you', blocks: [
            { type: 'text', text: 'Drinking water is tested for pH, for dissolved minerals, for bacteria. pH matters more than it sounds — remember that each step on the scale is ten times, so water at pH 5 is a hundred times more acidic than water at pH 7, and acidic water dissolves metal out of old pipes.' },
            { type: 'text', text: 'That testing is a public system, paid for collectively, because no individual household could run a laboratory. It is one of the clearest examples there is of a thing government exists to do.' },
            { type: 'example', text: 'Government day 1: scarcity and shared problems force collective choices. Clean water is the least controversial example anyone has.' },
          ]},
          { title: 'One number', blocks: [
            { type: 'scale', value: '0.007%', unit: 'of Earth’s water is available fresh water',
              note: 'About 97% of Earth’s water is salt. Most of the remaining 3% is locked in ice and deep groundwater. What is left in accessible lakes and rivers — everything all eight billion people drink — is a rounding error on a rounding error.' },
          ]},
          { title: 'You already knew all of this', blocks: [
            { type: 'text', text: 'The water cycle — Earth & Space day 3. Solutes, solvents and concentration — Chemistry day 9. The pH scale and what one step means — Chemistry day 8. Why some problems have to be solved collectively — Government day 1.' },
            { type: 'callout', text: 'Four lanes, in a glass of water. This is the teardown that best shows what the whole app has been for: nothing here was a new fact, and all of it was new to you anyway.' },
          ]},
        ],
        recap: [
          'Water is never created — it cycles, and evaporation leaves dissolved solids behind.',
          'Hard water carries calcium and magnesium picked up from rock.',
          'pH is tested because acidic water dissolves metal out of pipes.',
          'Accessible fresh water is a tiny fraction of the planet’s water.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Rain is fresh even though it comes from salty oceans because:', choices: ['the clouds filter the salt out of it', 'evaporating water leaves the salt behind', 'the salt sinks to the ocean floor', 'salt evaporates before water does'], answer: 1, hint: 'What stays in the pan when seawater dries out?', explain: 'Only the water evaporates. The salt cannot follow it up.' },
          { type: 'mc', prompt: '"Hard" water contains extra:', choices: ['oxygen dissolved from the air', 'chlorine added at the treatment plant', 'calcium and magnesium from rock', 'salt carried in from the sea'], answer: 2, hint: 'What does water pick up soaking through ground?', explain: 'Minerals dissolved out of the rock it passed through — which is why kettles fur up in some places.' },
          { type: 'numeric', prompt: 'How many times more acidic is water at pH 5 than water at pH 7?', answer: 100, hint: 'Two steps, and each step is ten times.', explain: '10 × 10 = 100. That is why a small pH change is worth testing for.' },
          { type: 'mc', prompt: 'Of all the water on Earth, the fraction that is fresh and accessible to drink is:', choices: ['most of it', 'about a third', 'roughly half', 'a very small fraction'], answer: 3, hint: 'How much of the planet is ocean, and how much is locked in ice?', explain: 'Nearly all of it is salt water, and most of the fresh water is frozen or deep underground. What is actually drinkable is a sliver.' },
        ],
      },
    ],
  },
};
