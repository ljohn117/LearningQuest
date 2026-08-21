import { Sparkles } from 'lucide-react';

/* Connections
 *
 * This lane teaches no new material. Every day takes two or three things he
 * has already finished in different lanes and shows they were the same idea
 * the whole time.
 *
 * That is the point of the whole project. The math checkpoints already did
 * this within one lane — ratio, unit rate, proportion and slope revealed as
 * one idea in four costumes — and that reframe lands harder than new
 * material does. This does it across lanes.
 *
 * Each day declares `requires`, so it only unlocks once both halves have
 * actually been learned. A connection to something he has not seen yet is
 * just a confusing lesson; a connection to something he finished last month
 * is the jolt of recognition this is built for.
 *
 * Tone rule for this lane specifically: never explain the connection before
 * he has a chance to feel it. Ask first, reveal second. */

export const CONNECTIONS = {
  connect: {
    name: 'Connections', icon: Sparkles, accent: '#f472b6',
    blurb: 'Where two things you already know turn out to be one thing.',
    days: [
      {
        id: 'cx1', tag: 'Connection', title: 'Powers of Two, Everywhere',
        subtitle: 'Binary · Exponents · Half-life · Compound interest',
        requires: ['cs:c2', 'math:m7'],
        pages: [
          { title: 'Four things you have already done', blocks: [
            { type: 'text', text: 'Binary place value. Exponents. Radioactive half-life. Compound interest. You met these in four different lanes, weeks apart, and nobody mentioned they were related.' },
            { type: 'callout', text: 'They are the same idea. See if you can spot it before the next page.' },
          ]},
          { title: 'Doubling and halving', blocks: [
            { type: 'text', text: 'Each binary place is worth twice the one to its right. Each half-life leaves half of what was there. Each year of compound interest multiplies by the same factor again.' },
            { type: 'formula', text: 'value = start × rateⁿ', label: 'the shape all four share' },
            { type: 'text', text: 'Repeated multiplication by a fixed factor. That is all an exponent ever was.' },
          ]},
          { title: 'Why it feels so different each time', blocks: [
            { type: 'text', text: 'The factor changes the mood. Times 2 grows fast enough to feel explosive. Times 0.5 shrinks toward nothing but never quite arrives. Times 1.1 looks boring for years and then runs away from you.' },
            { type: 'example', text: '2^10 is 1,024 — ten doublings turn one into a thousand. Ten halvings turn a thousand back into one. Same machinery, opposite direction.' },
          ]},
          { title: 'What this buys you', blocks: [
            { type: 'callout', text: 'You do not have four things to remember. You have one, plus four places it shows up. That is what it feels like to actually understand something rather than memorise it.' },
          ]},
        ],
        recap: [
          'Binary, half-life and compound interest are all repeated multiplication.',
          'The factor decides whether it grows, shrinks, or sneaks up on you.',
          'One idea learned properly replaces four facts memorised separately.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Each binary place is worth how many times the place to its right?', answer: 2, hint: 'Count the places: 1, 2, 4, 8, 16.', explain: 'Two. Every place doubles — that is why binary is powers of two.' },
          { type: 'mc', prompt: 'Half-life and compound interest are related because both:', choices: ['subtract a fixed amount each step', 'happen only in science', 'add a fixed amount each step', 'multiply by a fixed factor each step'], answer: 3, hint: 'Is the change an amount, or a factor?', explain: 'Both multiply by the same factor repeatedly. Only the factor differs.' },
          { type: 'numeric', prompt: 'A sample halves 3 times. What fraction of the original is left? (Type the bottom number: 1 over what?)', answer: 8, hint: 'Half, then half again, then half again.', explain: '1/2 × 1/2 × 1/2 = 1/8. Three halvings, so 2³ = 8.' },
          { type: 'tf', prompt: 'Repeated multiplication by a fixed factor is what an exponent describes.', answer: true, hint: 'Think about what 2⁵ actually means.', explain: 'Exactly — that is the definition, whichever lane you meet it in.' },
        ],
      },
      {
        id: 'cx2', tag: 'Connection', title: 'If-Then in Four Places',
        subtitle: 'Logic · Code · Law · The scientific method',
        requires: ['logic:lg3', 'cs:c4'],
        pages: [
          { title: 'The same sentence, four uniforms', blocks: [
            { type: 'text', text: 'In Logic: if P then Q. In code: if (condition) { do this }. In Government: if a bill passes both chambers and is signed, it becomes law. In science: if this hypothesis is right, then this experiment should show that result.' },
            { type: 'callout', text: 'Four subjects. One structure.' },
          ]},
          { title: 'The failure is also the same', blocks: [
            { type: 'text', text: 'A conditional breaks in exactly one way: the condition happens and the result does not. That is a broken promise in Logic, a bug in code, an unenforced law, and a failed hypothesis in science.' },
            { type: 'example', text: 'Predicted: if I heat the metal, it expands. Heated it. Did not expand. The hypothesis is now false — and that is a result, not a failure.' },
          ]},
          { title: 'And so is the classic mistake', blocks: [
            { type: 'text', text: 'Confusing a conditional with its converse. "If it rains the game is cancelled" does not mean a cancelled game proves rain. In code that becomes a bug. In an argument it becomes a fallacy. In science it becomes a wrong conclusion from a real experiment.' },
            { type: 'visual', kind: 'flow', steps: ['If P', 'then Q', 'not Q', 'so not P'] },
          ]},
          { title: 'Why this is worth noticing', blocks: [
            { type: 'callout', text: 'When you learn to spot a broken conditional in one subject, you have learned to spot it in all four. Skills that transfer like this are the ones worth having.' },
          ]},
        ],
        recap: [
          'If-then has the same structure in logic, code, law and science.',
          'It fails in one way: condition met, result absent.',
          'Confusing it with its converse is the same error everywhere.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A hypothesis that predicts a result which then does not happen is:', choices: ['shown false', 'unprovable', 'a converse', 'still true'], answer: 0, hint: 'Condition met, result absent.', explain: 'That is exactly how a conditional fails — and it is a real result.' },
          { type: 'mc', prompt: 'An if-statement in code is structurally the same as:', choices: ['a variable', 'a definition', 'a conditional in logic', 'a counterexample'], answer: 2, hint: 'Both check something, then act.', explain: 'Same structure, different uniform.' },
          { type: 'tf', prompt: '"The game was cancelled, so it must have rained" confuses a conditional with its converse.', answer: true, hint: 'Could the game be cancelled for another reason?', explain: 'Yes — that is the converse error, and it appears in every one of these four subjects.' },
          { type: 'mc', prompt: 'A conditional is broken when:', choices: ['both parts are true', 'the condition is true but the result is not', 'nobody checks it', 'the condition is false'], answer: 1, hint: 'There is only one failing case.', explain: 'Condition met, promised result absent. That is the only way.' },
        ],
      },
      {
        id: 'cx3', tag: 'Connection', title: 'Ratios Wearing Disguises',
        subtitle: 'Math · Genetics · Economics · Ecology',
        requires: ['math:m1', 'bio:bio4'],
        pages: [
          { title: 'One tool, four lanes', blocks: [
            { type: 'text', text: 'A Punnett square gives 3:1. A food web loses about 90% of energy at each level. Supply and demand meet at a price. A unit rate is dollars per one item.' },
            { type: 'callout', text: 'Every one of those is a ratio. You learned the tool in Math and then used it three more times without anyone saying so.' },
          ]},
          { title: 'Why ratios travel so well', blocks: [
            { type: 'text', text: 'A ratio compares two quantities without caring what they are. Offspring to offspring, energy to energy, dollars to items. The comparison is the same operation regardless of the units.' },
            { type: 'visual', kind: 'punnett' },
          ]},
          { title: 'Reading one you have not seen', blocks: [
            { type: 'text', text: 'That is the real payoff. Faced with a brand new 2:5 in some subject you have never studied, you already know what to do — scale it, simplify it, or turn it into a rate.' },
            { type: 'example', text: '3:1 in genetics means three of one kind for every one of the other — out of four total, not five. The same trap catches people in every subject ratios appear in.' },
          ]},
          { title: 'What to take from this', blocks: [
            { type: 'callout', text: 'You are not learning a new thing in each subject. You are learning where a thing you already have applies. That is why the work compounds.' },
          ]},
        ],
        recap: [
          'Punnett ratios, energy pyramids and unit rates are all ratios.',
          'A ratio compares quantities regardless of their units.',
          'Knowing the tool means you can read a ratio in a subject you have never studied.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'A 3:1 ratio means how many parts in total?', answer: 4, hint: 'Add the parts together, do not just take the larger one.', explain: '3 + 1 = 4. This is the trap in every subject ratios appear in.' },
          { type: 'mc', prompt: 'A unit rate is a ratio where the second quantity is:', choices: ['the same as the first', 'always money', 'zero', 'one'], answer: 3, hint: 'Think about "per ONE item".', explain: 'Per one — that is what makes it a unit rate.' },
          { type: 'tf', prompt: 'Ratios only work when both quantities measure the same kind of thing.', answer: false, hint: 'Think about dollars per notebook.', explain: 'Dollars per item compares two different kinds entirely. That is why ratios travel so well.' },
          { type: 'numeric', prompt: 'If about 10% of energy passes to the next level of a food web, how much of 1000 units reaches it?', answer: 100, hint: '10% of 1000.', explain: '100 units. The other 90% is lost as heat — conservation of energy, from Physical Science.' },
        ],
      },
      {
        id: 'cx4', tag: 'Connection', title: 'Reading the Evidence',
        subtitle: 'Fossils · Earth layers · Text evidence · Debugging',
        requires: ['fossils:f3', 'ela:ela2'],
        pages: [
          { title: 'You cannot see the event itself', blocks: [
            { type: 'text', text: 'Nobody watched the dinosaurs die. Nobody has been to the mantle. You were not in the author’s head. You did not see the bug happen.' },
            { type: 'text', text: 'In all four cases you work from what got left behind.' },
          ]},
          { title: 'Layers, quotes, and stack traces', blocks: [
            { type: 'text', text: 'A rock layer records what was happening when it formed. A seismic wave records what it passed through. A sentence records what the author actually claimed. An error message records what the program was doing when it broke.' },
            { type: 'visual', kind: 'strata' },
          ]},
          { title: 'The discipline is identical', blocks: [
            { type: 'text', text: 'Point at the specific evidence. Not a feeling, not a guess — the layer, the wave, the sentence, the line number. "I think the character is angry" is worth far less than "she slammed the door, on page 40".' },
            { type: 'callout', text: 'This is the whole reason your English teacher wants a quote. It is the same standard a geologist and a programmer are held to.' },
          ]},
          { title: 'Where this takes you', blocks: [
            { type: 'callout', text: 'Getting good at citing evidence in one subject makes you better at it in all of them, because it was never really a subject skill. It is how you find out what is true when you cannot watch it happen.' },
          ]},
        ],
        recap: [
          'Fossils, rock layers, texts and bugs are all read from evidence left behind.',
          'Point at the specific evidence, not at a feeling.',
          'Citing evidence is one skill, not four subject-specific ones.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What do fossil layers, text quotes and error messages have in common?', choices: ['they are always reliable', 'they are evidence left behind by something you cannot watch', 'they are opinions', 'they are only used in science'], answer: 1, hint: 'What can none of them let you do directly?', explain: 'None of them let you observe the event — you reconstruct it from traces.' },
          { type: 'tf', prompt: '"I feel like the character is upset" is as strong as quoting what the character did.', answer: false, hint: 'Which one can someone else check?', explain: 'A quote is evidence. A feeling is not — same standard as citing a rock layer.' },
          { type: 'mc', prompt: 'A lower rock layer is generally:', choices: ['impossible to date', 'younger', 'older', 'the same age'], answer: 2, hint: 'Which went down first?', explain: 'Older — layers pile up over time, so the deepest was laid down first.' },
          { type: 'mc', prompt: 'The best first move when a program breaks is to:', choices: ['read what the error actually says', 'start over', 'rewrite it', 'guess what went wrong'], answer: 0, hint: 'It already left you evidence.', explain: 'Read the evidence first. Same discipline as every other lane here.' },
        ],
      },
      {
        id: 'cx5', tag: 'Connection', title: 'Nothing Disappears',
        subtitle: 'Energy · Water · Matter · Money',
        requires: ['physics:phy4', 'earth:es3'],
        pages: [
          { title: 'A rule that keeps reappearing', blocks: [
            { type: 'text', text: 'Energy is never created or destroyed. Water is never used up. Matter is not lost when ice melts. And money that leaves your pocket did not vanish — it moved.' },
            { type: 'callout', text: 'Four subjects, one law: track the total, and it stays put.' },
          ]},
          { title: 'What "gone" usually means', blocks: [
            { type: 'text', text: 'When something seems to disappear, it almost always changed form or moved somewhere you were not looking. Friction turns motion into heat. Water becomes vapour. Spent money becomes someone else’s revenue.' },
            { type: 'example', text: 'A ball rolls to a stop. The kinetic energy did not vanish — it warmed the floor, the air and the ball by a tiny, unmeasurable-looking amount that nonetheless balances the books exactly.' },
          ]},
          { title: 'Why scientists love these laws', blocks: [
            { type: 'text', text: 'A conservation law is a promise that the books balance. If your total changed, you missed something — and knowing you missed something is far more useful than a wrong answer you trust.' },
            { type: 'formula', text: 'total before = total after', label: 'every conservation law' },
          ]},
          { title: 'Using it as a tool', blocks: [
            { type: 'callout', text: 'Next time an answer seems to lose something, do not accept it. Ask where it went. That single habit catches more mistakes than almost anything else you can do.' },
          ]},
        ],
        recap: [
          'Energy, water, matter and money are all conserved — they move rather than vanish.',
          'Seeming disappearance usually means a change of form.',
          'If your total changed, you missed something.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A rolling ball slows and stops. The kinetic energy:', choices: ['was never there', 'turned into mass', 'was destroyed', 'became heat'], answer: 3, hint: 'What warms up when things rub?', explain: 'Friction converted it to heat. The total is unchanged.' },
          { type: 'tf', prompt: 'A conservation law says the total is the same before and after.', answer: true, hint: 'It is the definition.', explain: 'Forms change; the total does not.' },
          { type: 'mc', prompt: 'If your total changed during a calculation, the most useful conclusion is:', choices: ['start over from scratch', 'the law is wrong', 'you missed something', 'the total does not matter'], answer: 2, hint: 'Which conclusion helps you find the error?', explain: 'You missed something — and now you know to look, which is worth more than a wrong answer you trust.' },
          { type: 'tf', prompt: 'Earth needs new water added regularly because water gets used up.', answer: false, hint: 'Think about the water cycle.', explain: 'It cycles. The same water has been here since long before the dinosaurs.' },
        ],
      },
      {
        id: 'cx6', tag: 'Connection', title: 'Zooming Out',
        subtitle: 'Atoms · Cells · Organisms · Planets · Deep time',
        requires: ['physics:phy2', 'bio:bio2'],
        pages: [
          { title: 'The same question at every size', blocks: [
            { type: 'text', text: 'What is this made of, and what holds it together? You have now asked that about atoms, about cells, about ecosystems, about the planet, and about the solar system.' },
            { type: 'callout', text: 'The answer changes. The question does not.' },
          ]},
          { title: 'Each level has parts that do jobs', blocks: [
            { type: 'text', text: 'An atom has protons and electrons. A cell has a nucleus and membrane. A body has organ systems. An ecosystem has producers and consumers. At every level, specialised parts combine into something the parts alone could not be.' },
            { type: 'visual', kind: 'atom', protons: 6 },
          ]},
          { title: 'And the level above cannot be predicted from the parts', blocks: [
            { type: 'text', text: 'Knowing everything about hydrogen and oxygen would not tell you water is wet. Knowing everything about one ant tells you almost nothing about a colony. Something genuinely new appears at each level.' },
            { type: 'example', text: 'This is why biology is not just chemistry and chemistry is not just physics — even though nothing breaks the rules underneath.' },
          ]},
          { title: 'What to carry forward', blocks: [
            { type: 'callout', text: 'When something is too big or too small to picture, ask the same two questions: what are the parts, and what do they do together. It works from quarks to galaxies.' },
          ]},
        ],
        recap: [
          'Every scale answers the same two questions with different parts.',
          'Specialised parts combine into something new.',
          'The higher level cannot be predicted from the parts alone.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Knowing everything about hydrogen and oxygen separately would NOT tell you:', choices: ['their atomic numbers', 'that water is wet', 'their masses', 'their proton counts'], answer: 1, hint: 'Which property belongs to the combination?', explain: 'New properties appear when parts combine.' },
          { type: 'tf', prompt: 'Biology can be completely reduced to physics with nothing left over.', answer: false, hint: 'Think about what appears at each level.', explain: 'Nothing breaks the rules underneath, but new behaviour appears that the parts alone do not show.' },
          { type: 'mc', prompt: 'The pattern shared by atoms, cells and ecosystems is:', choices: ['specialised parts combining into something larger', 'they are all alive', 'they all contain carbon', 'they are all microscopic'], answer: 0, hint: 'What is true at every scale?', explain: 'Parts with jobs, combining into a whole.' },
          { type: 'mc', prompt: 'Faced with something too large to picture, the useful move is to ask:', choices: ['who discovered it', 'how far away is it', 'how old is it', 'what are the parts and what do they do together'], answer: 3, hint: 'The two questions from page one.', explain: 'Parts and their interaction — it works at every scale.' },
        ],
      },
      {
        id: 'cx7', tag: 'Connection', title: 'Things That Push Back',
        subtitle: 'Homeostasis · Supply and demand · Checks and balances',
        requires: ['bio:bio1', 'gov:g3'],
        pages: [
          { title: 'Three systems that correct themselves', blocks: [
            { type: 'text', text: 'Your body holds its temperature near 37°C. A market pushes prices toward a balance point. A government splits power so no branch can run away with it. Three completely different subjects.' },
            { type: 'callout', text: 'All three are the same mechanism.' },
          ]},
          { title: 'Push it, and something pushes back', blocks: [
            { type: 'text', text: 'Get too hot and you sweat. Price too high and buyers leave until it falls. One branch overreaches and the others can block it. In each case the disturbance itself triggers the correction.' },
            { type: 'visual', kind: 'supplydemand' },
          ]},
          { title: 'Balance is not stillness', blocks: [
            { type: 'text', text: 'None of these systems sit still. Your temperature wobbles constantly. Prices move daily. Branches argue permanently. Balance means the wobbles stay bounded, not that nothing happens.' },
            { type: 'example', text: 'A thermostat is never exactly at the set point. It is always slightly over or under, correcting. That is what working looks like.' },
          ]},
          { title: 'And what happens when it breaks', blocks: [
            { type: 'callout', text: 'Remove the feedback and the system runs away. A body that cannot sweat overheats. A market with one seller stops correcting. A government with no checks stops being checked. The correction was the whole design.' },
          ]},
        ],
        recap: [
          'Homeostasis, market prices and checks and balances are one mechanism.',
          'The disturbance itself triggers the correction.',
          'Balance means bounded wobbling, not stillness.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What do homeostasis, supply and demand, and checks and balances share?', choices: ['a disturbance triggers its own correction', 'they never change', 'they require people', 'they are all biological'], answer: 0, hint: 'What happens when each is pushed?', explain: 'Each pushes back against being pushed. Same mechanism, three subjects.' },
          { type: 'tf', prompt: 'A balanced system is one where nothing is changing.', answer: false, hint: 'Think about a thermostat.', explain: 'It wobbles constantly and corrects. Bounded, not still.' },
          { type: 'mc', prompt: 'A market with only one seller tends to stop correcting because:', choices: ['prices are fixed by law', 'the feedback from competition is removed', 'buyers disappear', 'costs fall'], answer: 1, hint: 'What normally pushes a price back down?', explain: 'Remove the feedback and the system stops self-correcting.' },
          { type: 'mc', prompt: 'Splitting government power across branches is most like:', choices: ['an exponent', 'a food chain', 'a body regulating its own temperature', 'a fossil record'], answer: 2, hint: 'Which one corrects its own drift?', explain: 'Both are feedback systems that resist runaway change.' },
        ],
      },
    ],
  },
};
