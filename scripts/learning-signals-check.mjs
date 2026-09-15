import assert from 'node:assert/strict';
import {
  MAX_SIGNALS,
  appendSignal,
  createLearningSignals,
  isSignalEvent,
  normaliseLearningSignals,
  summarizeLearningSignals,
  withLearningSignals,
} from '../src/engine/learning-signals.js';

const at = '2026-09-14T19:00:00.000Z';
const quiz = { type: 'quiz_completed', dayId: 'math:m15', lane: 'mathematics', at, score: 1, total: 4 };

assert.deepEqual(createLearningSignals(), { version: 1, events: [] });
assert.equal(isSignalEvent(quiz), true);
assert.equal(isSignalEvent({ ...quiz, type: 'unknown' }), false);
assert.equal(isSignalEvent({ ...quiz, score: 5 }), false);
assert.equal(isSignalEvent({ ...quiz, at: 'not-a-date' }), false);
assert.equal(isSignalEvent({ type: 'difficulty_rated', dayId: 'math:m15', at, rating: 'too_hard' }), true);
assert.equal(isSignalEvent({ type: 'difficulty_rated', dayId: 'math:m15', at, rating: 'maybe' }), false);

const empty = createLearningSignals();
const once = appendSignal(empty, quiz, 2);
assert.deepEqual(empty, createLearningSignals());
assert.equal(once.events.length, 1);
const bounded = appendSignal(appendSignal(once, { ...quiz, dayId: 'math:m16', at: '2026-09-14T19:01:00.000Z' }, 2), { ...quiz, dayId: 'math:m17', at: '2026-09-14T19:02:00.000Z' }, 2);
assert.equal(bounded.events.length, 2);
assert.deepEqual(bounded.events.map(event => event.dayId), ['math:m16', 'math:m17']);
assert.throws(() => appendSignal(empty, { type: 'bad' }), TypeError);

const malformed = normaliseLearningSignals({ version: 44, events: [quiz, { type: 'bad' }] });
assert.equal(malformed.version, 1);
assert.deepEqual(malformed.events, [quiz]);
assert.equal(normaliseLearningSignals({ events: Array(MAX_SIGNALS + 3).fill(quiz) }).events.length, MAX_SIGNALS);

const legacy = { name: 'Learner', xp: 100, completed: { 'math:m1': true } };
const upgraded = withLearningSignals(legacy);
assert.notEqual(upgraded, legacy);
assert.deepEqual(legacy, { name: 'Learner', xp: 100, completed: { 'math:m1': true } });
assert.deepEqual(upgraded.learningSignals, createLearningSignals());

const signals = normaliseLearningSignals({ events: [
  { type: 'day_completed', dayId: 'math:m15', lane: 'mathematics', at },
  quiz,
  { type: 'quiz_completed', dayId: 'science:ch1', lane: 'chemistry', at: '2026-09-14T19:05:00.000Z', score: 4, total: 4 },
  { type: 'drill_suggested', dayId: 'math:m15', lane: 'mathematics', at: '2026-09-14T19:06:00.000Z' },
  { type: 'drill_opened', dayId: 'math:m15', lane: 'mathematics', at: '2026-09-14T19:07:00.000Z' },
  { type: 'drill_completed', dayId: 'math:m15', lane: 'mathematics', at: '2026-09-14T19:08:00.000Z' },
  { type: 'difficulty_rated', dayId: 'math:m15', lane: 'mathematics', at: '2026-09-14T19:09:00.000Z', rating: 'too_hard' },
] });
const summary = summarizeLearningSignals(signals, { now: '2026-09-15T00:00:00.000Z', days: 14 });
assert.equal(summary.completedDays, 1);
assert.equal(summary.quizAttempts, 2);
assert.equal(summary.quizRate, 0.625);
assert.equal(summary.weakDays.length, 1);
assert.equal(summary.weakDays[0].dayId, 'math:m15');
assert.equal(summary.activityByLane.mathematics, 6);
assert.deepEqual(summary.drill, { suggested: 1, opened: 1, completed: 1, openRate: 1, completionRate: 1 });
assert.deepEqual(summary.difficulty, { too_easy: 0, right_level: 0, too_hard: 1 });
assert.equal(summary.recentEvents[0].type, 'difficulty_rated');
assert.equal(summarizeLearningSignals(signals, { now: '2026-10-15T00:00:00.000Z', days: 7 }).eventCount, 0);

console.log('learning-signals-check: all assertions passed');
