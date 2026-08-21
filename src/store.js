/* Persistence.

   The prototypes used `window.storage` (a Claude Artifacts API) wrapped in
   empty `catch {}` blocks — outside an artifact the app booted, ran fine,
   and silently persisted nothing. This uses localStorage, carries a version
   inside the payload, validates shape on read, and reports failures loudly
   instead of swallowing them. */

export const KEY = 'lq_v3';
export const SCHEMA_VERSION = 3;

const LEGACY_KEYS = ['lq_profiles_v2', 'lq_explore_v1'];

let lastError = null;
export const getLastError = () => lastError;

function validProfile(p) {
  return p && typeof p === 'object' && typeof p.id === 'string';
}

/* Fill in fields added after a profile was first written, so a save from an
   older schema can't crash a newer read path. */
function normalize(p) {
  return {
    xp: 0, completed: {}, practice: {}, streak: { count: 0, last: null }, name: '',
    ...p,
    completed: p.completed && typeof p.completed === 'object' ? p.completed : {},
    practice: p.practice && typeof p.practice === 'object' ? p.practice : {},
    streak: p.streak && typeof p.streak === 'object' ? p.streak : { count: 0, last: null },
  };
}

function readKey(k) {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error(`[LearningQuest] could not read "${k}":`, e);
    lastError = e;
    return null;
  }
}

/* One-time merge of the two prototype save files. Day ids are unique across
   both apps, so completed-maps can be combined without collision. */
function migrateLegacy() {
  const found = LEGACY_KEYS.map(readKey).filter(Boolean);
  if (!found.length) return null;

  const byId = new Map();
  for (const blob of found) {
    const profiles = Array.isArray(blob.profiles) ? blob.profiles.filter(validProfile) : [];
    for (const p of profiles) {
      const prev = byId.get(p.id);
      if (!prev) { byId.set(p.id, normalize(p)); continue; }
      byId.set(p.id, {
        ...prev,
        xp: (prev.xp || 0) + (p.xp || 0),
        completed: { ...prev.completed, ...(p.completed || {}) },
        practice: { ...prev.practice, ...(p.practice || {}) },
        streak: (prev.streak?.count || 0) >= (p.streak?.count || 0) ? prev.streak : p.streak,
      });
    }
  }
  if (!byId.size) return null;
  const profiles = [...byId.values()];
  console.info(`[LearningQuest] migrated ${profiles.length} profile(s) from the prototype save files.`);
  return { version: SCHEMA_VERSION, profiles, lastActive: profiles[0].id };
}

export const Store = {
  load() {
    const cur = readKey(KEY);
    if (cur && Array.isArray(cur.profiles)) {
      return { ...cur, profiles: cur.profiles.filter(validProfile).map(normalize) };
    }
    return migrateLegacy();
  },

  save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...data, version: SCHEMA_VERSION }));
      lastError = null;
      return true;
    } catch (e) {
      console.error('[LearningQuest] SAVE FAILED — progress was not written:', e);
      lastError = e;
      return false;
    }
  },

  /* Restore from a payload produced by the prototypes' Back up button. */
  importBackup(text) {
    const parsed = JSON.parse(text);
    const blob = parsed && parsed.lqBackup ? parsed.data : parsed;
    if (!blob || !Array.isArray(blob.profiles)) throw new Error('Not a Learning Quest backup.');
    const profiles = blob.profiles.filter(validProfile).map(normalize);
    if (!profiles.length) throw new Error('That backup has no profiles in it.');
    const next = { version: SCHEMA_VERSION, profiles, lastActive: profiles[0].id };
    if (!Store.save(next)) throw new Error('Could not write to storage.');
    return next;
  },
};
