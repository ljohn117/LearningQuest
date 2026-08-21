import { CORE } from './core.js';
import { EXPLORE } from './explore.js';

/* Merged curriculum. Subject keys are distinct across both prototypes and
   all 64 day ids are unique, so the merge cannot collide.
   Progress is keyed `subjectId:dayId` — NEVER renumber or reuse a day id. */
export const CURRICULUM = { ...CORE, ...EXPLORE };

export const SUBJECT_ORDER = ['math', 'cs', 'bio', 'ela', 'biz', 'gov', 'fossils'];
