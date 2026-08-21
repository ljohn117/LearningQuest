import { CORE } from './core.js';
import { EXPLORE } from './explore.js';
import { RESTORED } from './restored.js';
import { CONNECTIONS } from './connections.js';
import { ELA_EXTRA, BIO_EXTRA } from './depth.js';

/* Merged curriculum. Subject keys are distinct across all sources and every
   day id is unique, so the merge cannot collide.
   Progress is keyed `subjectId:dayId` — NEVER renumber or reuse a day id. */
const merged = { ...CORE, ...EXPLORE, ...RESTORED, ...CONNECTIONS };

/* Depth days append to lanes that already exist, so ordering continues from
   the last day already there rather than renumbering anything. */
const append = (subj, days) => {
  if (!merged[subj]) return;
  merged[subj] = { ...merged[subj], days: [...merged[subj].days, ...days] };
};
append('ela', ELA_EXTRA);
append('bio', BIO_EXTRA);

export const CURRICULUM = merged;

export const SUBJECT_ORDER = [
  'math', 'cs', 'physics', 'logic', 'earth',
  'bio', 'ela', 'biz', 'gov', 'fossils',
  'connect',
];
