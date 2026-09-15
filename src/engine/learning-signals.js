export const LEARNING_SIGNAL_VERSION = 1;
export const MAX_SIGNALS = 250;

const TYPES = new Set([
  'day_opened',
  'day_completed',
  'quiz_completed',
  'drill_suggested',
  'drill_opened',
  'drill_completed',
  'difficulty_rated',
]);

const DIFFICULTIES = new Set(['too_easy', 'right_level', 'too_hard']);

export function createLearningSignals() {
  return { version: LEARNING_SIGNAL_VERSION, events: [] };
}

export function isSignalEvent(event) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) return false;
  if (!TYPES.has(event.type)) return false;
  if (typeof event.dayId !== 'string' || !event.dayId.trim()) return false;
  if (typeof event.at !== 'string' || Number.isNaN(Date.parse(event.at))) return false;
  if (event.lane !== undefined && (typeof event.lane !== 'string' || !event.lane.trim())) return false;
  if (event.score !== undefined && (!Number.isFinite(event.score) || event.score < 0)) return false;
  if (event.total !== undefined && (!Number.isFinite(event.total) || event.total <= 0)) return false;
  if (event.score !== undefined && event.total !== undefined && event.score > event.total) return false;
  if (event.type === 'difficulty_rated' && !DIFFICULTIES.has(event.rating)) return false;
  if (event.type !== 'difficulty_rated' && event.rating !== undefined && !DIFFICULTIES.has(event.rating)) return false;
  return true;
}

export function normaliseLearningSignals(signals) {
  if (!signals || typeof signals !== 'object' || Array.isArray(signals)) return createLearningSignals();
  const events = Array.isArray(signals.events) ? signals.events.filter(isSignalEvent) : [];
  return { version: LEARNING_SIGNAL_VERSION, events: events.slice(-MAX_SIGNALS) };
}

export function appendSignal(signals, event, limit = MAX_SIGNALS) {
  if (!isSignalEvent(event)) throw new TypeError('Invalid learning-signal event');
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : MAX_SIGNALS;
  const current = normaliseLearningSignals(signals);
  return {
    version: LEARNING_SIGNAL_VERSION,
    events: [...current.events, { ...event }].slice(-safeLimit),
  };
}

export function withLearningSignals(profile) {
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) return profile;
  return { ...profile, learningSignals: normaliseLearningSignals(profile.learningSignals) };
}

function inWindow(event, since) {
  return !since || new Date(event.at) >= since;
}

function countBy(events, key) {
  return events.reduce((counts, event) => {
    const value = event[key] || 'unassigned';
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

export function summarizeLearningSignals(signals, { now = new Date(), days = 14 } = {}) {
  const safe = normaliseLearningSignals(signals);
  const asDate = now instanceof Date ? now : new Date(now);
  const since = new Date(asDate);
  since.setDate(since.getDate() - Math.max(0, days));
  const events = safe.events.filter(event => inWindow(event, since));
  const quizzes = events.filter(event => event.type === 'quiz_completed' && Number.isFinite(event.score) && Number.isFinite(event.total));
  const drillSuggested = events.filter(event => event.type === 'drill_suggested').length;
  const drillOpened = events.filter(event => event.type === 'drill_opened').length;
  const drillCompleted = events.filter(event => event.type === 'drill_completed').length;
  const byDay = {};

  for (const event of quizzes) {
    const current = byDay[event.dayId] || { attempts: 0, score: 0, total: 0, lastAt: event.at };
    current.attempts += 1;
    current.score += event.score;
    current.total += event.total;
    if (new Date(event.at) > new Date(current.lastAt)) current.lastAt = event.at;
    byDay[event.dayId] = current;
  }

  const weakDays = Object.entries(byDay)
    .map(([dayId, value]) => ({ dayId, ...value, rate: value.total ? value.score / value.total : 0 }))
    .filter(value => value.rate < 0.6)
    .sort((a, b) => a.rate - b.rate || new Date(b.lastAt) - new Date(a.lastAt));

  const difficulty = { too_easy: 0, right_level: 0, too_hard: 0 };
  for (const event of events) {
    if (event.type === 'difficulty_rated') difficulty[event.rating] += 1;
  }

  return {
    windowDays: Math.max(0, days),
    eventCount: events.length,
    completedDays: new Set(events.filter(event => event.type === 'day_completed').map(event => event.dayId)).size,
    quizAttempts: quizzes.length,
    quizRate: quizzes.reduce((sum, event) => sum + event.score, 0) / (quizzes.reduce((sum, event) => sum + event.total, 0) || 1),
    weakDays,
    activityByLane: countBy(events, 'lane'),
    drill: { suggested: drillSuggested, opened: drillOpened, completed: drillCompleted, openRate: drillSuggested ? drillOpened / drillSuggested : null, completionRate: drillOpened ? drillCompleted / drillOpened : null },
    difficulty,
    recentEvents: events.slice().sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 12),
  };
}
