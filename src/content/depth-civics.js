/* Depth extensions for Government and Fossils.
 *
 *   Government  g1-6 covered why government exists, the three branches,
 *               checks and balances, the Constitution, how a bill becomes
 *               law, and voting. These add rights in practice, courts and
 *               precedent, taxes, and judging political claims.
 *   Fossils     f1-6 covered what a fossil is, how they form, rock layers,
 *               dating, the time scale, and extinctions. These add
 *               correlating layers across continents, the gaps in the
 *               record, trace fossils, and combining dating methods.
 *
 * Appended by id — nothing renumbered, no id reused.
 *
 * Both lanes lean hard on Logic here. Judging a political claim and judging
 * a fossil claim turn out to be the same skill, and saying so is the point. */

export const GOV_EXTRA = [
  {
    id: 'g7', tag: 'Civics', title: 'Rights Have Edges',
    subtitle: 'Day 7 · Where one person’s freedom meets another’s',
    pages: [
      { title: 'A right is not unlimited', blocks: [
        { type: 'text', text: 'Free speech is protected, but you cannot use it to threaten someone or to lie in a contract. Almost every right has a boundary where it starts costing someone else something.' },
        { type: 'concept', term: 'Limit', def: 'The point where exercising a right would take away someone else’s.' },
      ]},
      { title: 'Who decides where the edge is', blocks: [
        { type: 'text', text: 'Legislatures write the limits and courts test them against the Constitution. The line moves over time — which is a feature, not a flaw, because circumstances change.' },
        { type: 'example', text: 'Rules written before the internet had to be re-argued once anyone could publish to millions from a phone. The right did not change; the situation did.' },
      ]},
      { title: 'Due process is the safeguard', blocks: [
        { type: 'text', text: 'Before the government can take your freedom or property, it has to follow a set procedure — notice, a hearing, a chance to answer. That process is what stops a rule from being applied to you arbitrarily.' },
        { type: 'callout', text: 'The procedure protects people you disagree with too. That is exactly why it works.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic taught the false dilemma — pretending there are only two options. "Total freedom or total control" is that fallacy applied to rights. Almost all real answers sit between.' },
      ]},
    ],
    recap: [
      'Rights have limits where they would override someone else’s.',
      'Legislatures write limits; courts test them.',
      'Due process stops rules being applied arbitrarily.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Rights generally have limits because:', choices: ['unlimited use would take away someone else’s', 'they are hard to write', 'courts are slow', 'governments dislike them'], answer: 0, hint: 'What happens when two rights collide?', explain: 'A boundary is needed where one person’s use costs another theirs.' },
      { type: 'mc', prompt: 'Due process protects:', choices: ['only people who turn out to be innocent', 'everyone accused, because guilt is not known in advance', 'only citizens', 'only people who can afford a lawyer'], answer: 1, hint: 'How would anyone know who is innocent before the process runs?', explain: 'The process is how guilt gets established. Applying it only to the innocent would require already knowing the answer it exists to find.' },
      { type: 'mc', prompt: '"Either total freedom or total control" is an example of:', choices: ['due process', 'a false dilemma', 'circular reasoning', 'judicial review'], answer: 1, hint: 'Count the real options.', explain: 'It hides everything in between — straight from the Logic lane.' },
      { type: 'mc', prompt: 'Who tests whether a limit on a right is constitutional?', choices: ['the police', 'voters directly', 'the press', 'the courts'], answer: 3, hint: 'Which branch interprets?', explain: 'The judicial branch measures laws against the Constitution.' },
    ],
  },
  {
    id: 'g8', tag: 'Civics', title: 'Courts and Precedent',
    subtitle: 'Day 8 · Why an old decision still binds a new one',
    pages: [
      { title: 'Courts decide what a law means', blocks: [
        { type: 'text', text: 'Laws are written in general words, and general words run into specific situations nobody imagined. Someone has to decide which side of the line a real case falls on.' },
        { type: 'concept', term: 'Judicial review', def: 'A court’s power to decide whether a law conflicts with the Constitution.' },
      ]},
      { title: 'Past decisions carry forward', blocks: [
        { type: 'text', text: 'Once a court settles a question, later courts follow that decision in similar cases. That is precedent, and it is why the law is predictable enough to plan around.' },
        { type: 'example', text: 'Without precedent, the same dispute could be decided one way on Monday and the opposite on Tuesday. Nobody could know their rights in advance.' },
      ]},
      { title: 'But precedent can be overturned', blocks: [
        { type: 'text', text: 'A later court can decide an earlier ruling was wrong. That is rare on purpose — stability has real value — but a system that could never correct itself would carry its mistakes forever.' },
        { type: 'callout', text: 'Stability and correction pull against each other. Courts sit in the tension deliberately.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Science works the same way. A well-supported finding is treated as settled until strong evidence overturns it. Neither system claims certainty; both claim a good process for changing their minds.' },
      ]},
    ],
    recap: [
      'Courts decide how general laws apply to specific cases.',
      'Precedent makes the law predictable.',
      'Precedent can be overturned, rarely and deliberately.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Precedent means courts:', choices: ['decide only new questions', 'ignore old cases', 'follow earlier decisions in similar cases', 'must agree with the legislature'], answer: 2, hint: 'What makes law predictable?', explain: 'Following settled decisions is what lets people plan around the law.' },
      { type: 'mc', prompt: 'A legal precedent:', choices: ['can never be overturned', 'can be overturned by a later court', 'expires after fifty years', 'applies only in the state where it was set'], answer: 1, hint: 'What would happen to a mistake otherwise?', explain: 'Precedent gives stability, not permanence. Courts have overturned their own past rulings when those rulings were wrong.' },
      { type: 'mc', prompt: 'Judicial review is the power to:', choices: ['elect judges', 'write new laws', 'veto a bill', 'decide whether a law conflicts with the Constitution'], answer: 3, hint: 'Which branch measures laws against the Constitution?', explain: 'Courts test laws against the Constitution.' },
      { type: 'mc', prompt: 'Courts and science are alike because both:', choices: ['treat conclusions as settled until strong evidence overturns them', 'never change', 'require unanimous agreement', 'are run by governments'], answer: 0, hint: 'How does each handle being wrong?', explain: 'Both value stability but keep a route to correction.' },
    ],
  },
  {
    id: 'g9', tag: 'Money', title: 'Taxes and What They Buy',
    subtitle: 'Day 9 · Following the money in and back out',
    pages: [
      { title: 'Government spending has to come from somewhere', blocks: [
        { type: 'text', text: 'Roads, schools, courts and firefighters all cost money. Most of it comes from taxes — a share of income, purchases, or property collected from everyone.' },
        { type: 'concept', term: 'Tax', def: 'A required payment to government, used to fund shared services.' },
      ]},
      { title: 'Different taxes work differently', blocks: [
        { type: 'text', text: 'Income tax takes a share of what you earn. Sales tax adds a percentage at purchase. Property tax is based on what you own. Each one hits people differently, which is why arguments about taxes are really arguments about fairness.' },
        { type: 'example', text: 'A 5% sales tax costs a person earning $20,000 the same dollars per purchase as one earning $200,000 — but a much larger share of what they have.' },
      ]},
      { title: 'Budgets are choices, not arithmetic', blocks: [
        { type: 'text', text: 'Money spent on one thing cannot be spent on another. Every budget is a ranking of what matters most, argued over in public.' },
        { type: 'callout', text: 'Opportunity cost, from Business — but for a whole country instead of your allowance.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Scarcity from the Business lane is the entire reason government budgets are contested. Unlimited money would make politics much duller and much shorter.' },
      ]},
    ],
    recap: [
      'Taxes fund shared services nobody could buy alone.',
      'Different taxes fall differently on different people.',
      'Budgets are rankings of priorities, not just sums.',
    ],
    quiz: [
      { type: 'numeric', prompt: 'A 5% sales tax on a $60 item adds how many dollars?', answer: 3, hint: '5% of 60.', explain: '$3 — the same percentage calculation from the Business lane.' },
      { type: 'mc', prompt: 'Arguments about taxes are usually really arguments about:', choices: ['geography', 'arithmetic', 'fairness — who should pay what share', 'technology'], answer: 2, hint: 'The sums are the easy part.', explain: 'Who bears the burden is the contested question.' },
      { type: 'mc', prompt: 'A government budget is best understood as:', choices: ['mostly arithmetic', 'a set of choices about what matters most', 'a legal formality', 'a prediction of the economy'], answer: 1, hint: 'What happens when two good things need the same money?', explain: 'The arithmetic is the easy half. Deciding what to fund when everything cannot be funded is the actual work.' },
      { type: 'mc', prompt: 'The reason budgets are contested at all is:', choices: ['precedent', 'scarcity', 'inflation', 'voting'], answer: 1, hint: 'What is the problem at the heart of money?', explain: 'Limited resources force choices — the first idea in the Business lane.' },
    ],
  },
  {
    id: 'g10', tag: 'Civics', title: 'Judging a Political Claim',
    subtitle: 'Day 10 · The most useful skill in this whole lane',
    pages: [
      { title: 'Everyone claiming something wants something', blocks: [
        { type: 'text', text: 'That is not cynical — it is just true, and it is not automatically bad. Knowing what someone wants tells you which parts of their claim to check first.' },
        { type: 'callout', text: 'The question is never "is this person biased". Everyone is. The question is whether the evidence holds up anyway.' },
      ]},
      { title: 'Separate the claim from the feeling', blocks: [
        { type: 'text', text: 'Political language is built to make you feel something fast. Strip the adjectives and ask what is actually being asserted — often a specific, checkable fact hiding under a pile of emotion.' },
        { type: 'example', text: '"This disastrous policy is destroying our schools" contains one checkable claim: the policy changed some measurable thing about schools. Everything else is temperature.' },
      ]},
      { title: 'Check before you share', blocks: [
        { type: 'text', text: 'A claim that makes you immediately angry is the one most worth slowing down on, because that reaction is usually what it was engineered for.' },
        { type: 'concept', term: 'Verification', def: 'Finding out whether a claim holds up before repeating it.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'This is Logic and English together — fallacies from one, source evaluation from the other, both aimed at the noisiest information environment you will ever be in. If you only keep one thing from this lane, keep this.' },
      ]},
    ],
    recap: [
      'Everyone making a claim wants something; check accordingly.',
      'Strip the emotional language to find the checkable claim.',
      'The claim that angers you fastest deserves the most checking.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Knowing what a speaker wants is useful because it tells you:', choices: ['they are trustworthy', 'they are lying', 'which parts to check first', 'to ignore them'], answer: 2, hint: 'Motive points at where to look.', explain: 'Motive is a map of where to check, not proof of dishonesty.' },
      { type: 'mc', prompt: 'A claim that makes you instantly furious deserves extra checking because:', choices: ['anger means it is false', 'it may have been written to produce exactly that reaction', 'angry claims are always exaggerated', 'you should never trust your feelings'], answer: 1, hint: 'Why might it have been written that way?', explain: 'Strong feeling makes people share before verifying. Something designed to spread often aims at that reaction on purpose.' },
      { type: 'mc', prompt: 'In "this disastrous policy is destroying our schools", the checkable part is:', choices: ['destroying', 'that the policy changed something measurable', 'our', 'disastrous'], answer: 1, hint: 'Which part could you actually look up?', explain: 'The rest is emotional temperature, not assertion.' },
      { type: 'mc', prompt: 'The best question to ask about any strong claim is:', choices: ['how would I find out if it is true', 'how popular is it', 'does it sound right', 'who agrees with it'], answer: 0, hint: 'Which one leads to an answer?', explain: 'Checkability — the same standard from evaluating sources in English.' },
    ],
  },
];

export const FOSSILS_EXTRA = [
  {
    id: 'f7', tag: 'Paleontology', title: 'Matching Layers Across the World',
    subtitle: 'Day 7 · How a cliff in Africa lines up with one in Brazil',
    pages: [
      { title: 'The problem', blocks: [
        { type: 'text', text: 'You have a rock layer in one country and a rock layer in another. Are they the same age? You cannot see between them, and the rock itself looks similar almost everywhere.' },
        { type: 'callout', text: 'This is a real puzzle geologists had to solve before continents could be compared at all.' },
      ]},
      { title: 'Index fossils solve it', blocks: [
        { type: 'text', text: 'Some species lived everywhere, and only for a short stretch of time before going extinct. Find that species in a layer and you have dated it, wherever in the world the layer is.' },
        { type: 'concept', term: 'Index fossil', def: 'A fossil from a species that was widespread but short-lived — ideal for dating a layer.' },
      ]},
      { title: 'Which species make good markers', blocks: [
        { type: 'text', text: 'A species that lived for two hundred million years is useless — it tells you almost nothing. One that lived everywhere for two million years is perfect. Common in space, rare in time.' },
        { type: 'example', text: 'Trilobites work well because different trilobite species each occupied narrow slices of time while being spread across the oceans.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Earth & Space said matching fossils on two continents helped prove they were once joined. This is the technique that made that argument possible.' },
      ]},
    ],
    recap: [
      'Rock alone cannot tell you whether two distant layers match.',
      'Index fossils are widespread but short-lived species.',
      'Common in space and rare in time is what makes a good marker.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A good index fossil comes from a species that was:', choices: ['large and slow', 'found only in one place', 'rare and long-lived', 'widespread and short-lived'], answer: 3, hint: 'You need it everywhere, but only briefly.', explain: 'Common in space, rare in time — that combination dates a layer precisely.' },
      { type: 'mc', prompt: 'What makes a good index fossil?', choices: ['a species that survived for a very long time', 'a species that was widespread but existed only briefly', 'the largest animal in the layer', 'a species found on one continent only'], answer: 1, hint: 'How narrowly does it pin down a date?', explain: 'A species that lasted 200 million years tells you almost nothing about when. You want widespread and short-lived — common enough to find, brief enough to date.' },
      { type: 'mc', prompt: 'Index fossils let geologists:', choices: ['weigh rock layers', 'match layers on different continents', 'find oil', 'measure temperature'], answer: 1, hint: 'The problem was comparing distant places.', explain: 'They correlate layers across the world.' },
      { type: 'mc', prompt: 'Matching fossils on two continents supported which idea?', choices: ['fossils form quickly', 'oceans never change', 'the continents were once joined', 'the Earth is young'], answer: 2, hint: 'Recall the plate tectonics evidence.', explain: 'It was a key line of evidence for continental drift.' },
    ],
  },
  {
    id: 'f8', tag: 'Paleontology', title: 'What the Record Cannot Tell You',
    subtitle: 'Day 8 · The gaps are not random',
    pages: [
      { title: 'Fossilisation is rare and picky', blocks: [
        { type: 'text', text: 'Most organisms decay completely. The ones that fossilise had hard parts and were buried fast — which means the record is not a fair sample of what lived.' },
        { type: 'concept', term: 'Preservation bias', def: 'The tendency for some kinds of organisms to fossilise far more readily than others.' },
      ]},
      { title: 'What goes missing', blocks: [
        { type: 'text', text: 'Jellyfish, worms and fungi are enormously abundant and almost absent from the fossil record. Shelled sea creatures are overrepresented because shells survive. Whole categories of life are nearly invisible.' },
        { type: 'example', text: 'If aliens studied Earth only from fossils, they might conclude the seas were full of shells and the land nearly empty. Both conclusions would be wrong.' },
      ]},
      { title: 'Absence is weak evidence', blocks: [
        { type: 'text', text: 'Not finding a fossil is much weaker evidence than finding one. It might mean the creature was not there — or that it did not preserve, or that nobody has dug in the right place yet.' },
        { type: 'callout', text: 'Knowing what your evidence cannot show is as valuable as knowing what it can.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic: no number of examples proves a universal claim, and absence of a counterexample is not proof either. Paleontologists live inside that limit every day.' },
      ]},
    ],
    recap: [
      'Fossilisation strongly favours hard parts and fast burial.',
      'Soft-bodied life is nearly invisible in the record.',
      'Not finding a fossil is much weaker evidence than finding one.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Soft-bodied animals are rare in the fossil record because they:', choices: ['decay before they can fossilise', 'lived only in deserts', 'are hard to recognise', 'were rare when alive'], answer: 0, hint: 'What survives burial?', explain: 'Without hard parts they usually decay completely.' },
      { type: 'mc', prompt: 'The fossil record over-represents:', choices: ['everything equally', 'hard-bodied organisms buried quickly', 'soft-bodied organisms', 'land animals over sea animals'], answer: 1, hint: 'What conditions does fossilising actually need?', explain: 'Shells and bones in fast-burying sediment. Jellyfish and worms are nearly invisible in the record, which is a fact about preservation, not about how common they were.' },
      { type: 'mc', prompt: 'Not finding a fossil of some creature means:', choices: ['the rock is too young', 'the dating is wrong', 'it definitely never existed', 'it may not have preserved or been found yet'], answer: 3, hint: 'How many explanations fit?', explain: 'Absence has several possible causes, so it is weak evidence.' },
      { type: 'mc', prompt: 'Knowing the limits of your evidence is valuable because it:', choices: ['makes conclusions sound weaker', 'stops you claiming more than you can support', 'speeds up research', 'avoids maths'], answer: 1, hint: 'What error does it prevent?', explain: 'It keeps conclusions matched to what the evidence can actually carry.' },
    ],
  },
  {
    id: 'f9', tag: 'Paleontology', title: 'Fossils That Are Not Bones',
    subtitle: 'Day 9 · Footprints, burrows, and what animals did',
    pages: [
      { title: 'Some fossils record behaviour', blocks: [
        { type: 'text', text: 'A bone tells you an animal existed. A footprint tells you it walked, how fast, and sometimes whether it travelled alone.' },
        { type: 'concept', term: 'Trace fossil', def: 'A preserved record of activity — a track, burrow, nest or bite mark — rather than the organism itself.' },
      ]},
      { title: 'Tracks carry surprising detail', blocks: [
        { type: 'text', text: 'Spacing between prints gives stride length, which gives speed. Many trackways side by side suggest a herd. Small prints beside large ones suggest young travelling with adults.' },
        { type: 'example', text: 'Parallel trackways of the same species heading the same direction are one of the strongest pieces of evidence that some dinosaurs moved in groups.' },
      ]},
      { title: 'Behaviour cannot be read off bones', blocks: [
        { type: 'text', text: 'You could have a complete skeleton and still not know whether the animal hunted alone, cared for its young, or migrated. Trace fossils are the only direct record of what was actually done.' },
        { type: 'callout', text: 'Two kinds of evidence answering two different questions. Neither replaces the other.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'The Connections lane called this reading the evidence: fossils, rock layers, text quotes and error messages all reconstruct something you could not watch. A trackway is a stack trace left in mud.' },
      ]},
    ],
    recap: [
      'Trace fossils record activity rather than anatomy.',
      'Stride length gives speed; parallel trackways suggest groups.',
      'Behaviour cannot be read from bones alone.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A trace fossil records:', choices: ['something an organism did', 'the age of a rock', 'the climate', 'the body of an organism'], answer: 0, hint: 'Think footprints and burrows.', explain: 'Activity, not anatomy.' },
      { type: 'mc', prompt: 'From a fossil trackway, longer strides suggest the animal was:', choices: ['larger', 'moving faster', 'older', 'heavier'], answer: 1, hint: 'What changes about your own stride when you run?', explain: 'Stride lengthens with speed. Combined with leg length it gives a genuine estimate of how fast something moved millions of years ago.' },
      { type: 'mc', prompt: 'Several parallel trackways of one species suggest:', choices: ['the rock is young', 'two different species', 'a flood', 'the animals moved as a group'], answer: 3, hint: 'Same direction, same time.', explain: 'It is among the best evidence for herding behaviour.' },
      { type: 'mc', prompt: 'A complete skeleton still cannot tell you:', choices: ['the animal’s size', 'its bone structure', 'whether it cared for its young', 'roughly what it ate'], answer: 2, hint: 'Which is behaviour rather than anatomy?', explain: 'Behaviour needs trace fossils or other evidence entirely.' },
    ],
  },
  {
    id: 'f10', tag: 'Geology', title: 'Putting the Dates Together',
    subtitle: 'Day 10 · Two methods that answer different questions',
    pages: [
      { title: 'Order versus number', blocks: [
        { type: 'text', text: 'Relative dating tells you what came before what. Absolute dating gives an actual number of years. They answer different questions and are strongest together.' },
        { type: 'concept', term: 'Relative dating', def: 'Working out the order of events — usually from which layer sits above which.' },
      ]},
      { title: 'Radioactive decay gives numbers', blocks: [
        { type: 'text', text: 'Certain elements decay at a fixed rate that nothing speeds up or slows down. Measure how much has decayed and you can calculate elapsed time directly.' },
        { type: 'formula', text: 'age = half-life × number of half-lives elapsed', label: 'absolute dating' },
      ]},
      { title: 'Together they are far stronger', blocks: [
        { type: 'text', text: 'Layer order says this fossil is older than that one. A radiometric date on volcanic ash within the layers pins that ordering to real years. Neither alone would give you the full picture.' },
        { type: 'example', text: 'Ash layers are especially useful because they settle everywhere quickly and can be dated directly — a time stamp dropped across a whole region at once.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Half-lives are powers of two, the same ones binary uses. And combining two independent methods that agree is exactly the reasoning from plate tectonics — several lines pointing the same way beat any single one.' },
      ]},
    ],
    recap: [
      'Relative dating gives order; absolute dating gives years.',
      'Radioactive decay runs at a fixed, unchangeable rate.',
      'Two independent methods agreeing is far stronger than either alone.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Relative dating tells you:', choices: ['the temperature', 'the species', 'an exact age in years', 'which came first'], answer: 3, hint: 'Order, not number.', explain: 'It establishes sequence without giving a figure.' },
      { type: 'numeric', prompt: 'A material has a half-life of 25 million years. After 3 half-lives, how many million years have passed?', answer: 75, hint: 'Multiply the half-life by how many have elapsed.', explain: '25 × 3 = 75 million years.' },
      { type: 'mc', prompt: 'Heating or squeezing a rock changes its radioactive decay rate:', choices: ['a great deal', 'not measurably', 'only at very high temperatures', 'only under extreme pressure'], answer: 1, hint: 'Why would that matter for using it as a clock?', explain: 'The rate is set by the nucleus and is essentially untouched by outside conditions. That stubbornness is precisely what makes it a usable clock.' },
      { type: 'mc', prompt: 'Two independent dating methods agreeing is important because it:', choices: ['saves time', 'makes the conclusion much harder to dismiss', 'is required by law', 'costs less'], answer: 1, hint: 'Recall the plate tectonics evidence.', explain: 'Independent lines pointing the same way is the strongest kind of case.' },
    ],
  },
];
