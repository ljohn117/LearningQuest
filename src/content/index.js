import { CORE } from './core.js';
import { EXPLORE } from './explore.js';
import { RESTORED } from './restored.js';

/* Merged curriculum. Subject keys are distinct across all three sources and
   every day id is unique, so the merge cannot collide.
   Progress is keyed `subjectId:dayId` — NEVER renumber or reuse a day id. */
export const CURRICULUM = { ...CORE, ...EXPLORE, ...RESTORED };

export const SUBJECT_ORDER = [
  'math', 'cs', 'physics', 'logic', 'earth',
  'bio', 'ela', 'biz', 'gov', 'fossils',
];
