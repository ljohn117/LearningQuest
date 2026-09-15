# Local learning signals: integration contract

This foundation is deliberately isolated. It records anonymous, local-only learning events that may later help a parent view show recent activity, weak concepts, practice uptake, and learner calibration. It does not currently write to storage or render UI.

## Non-negotiable safeguards

- Keep all events in the existing learner profile only; do not add accounts, remote analytics, network calls, SDKs, or third-party tracking.
- Treat `learningSignals` as additive optional data. Existing backups without it must restore unchanged.
- Do not change any established progress key, including day IDs, quiz ordering or length, score fields, XP, streaks, finished-day records, recall history, or write-prompt keys.
- Never collect free-form learner text in signal events.
- Add event hooks only after reading the actual store, restore, DailyQuest, Duel, and ParentView interfaces.
- Extend existing profile/restore checks with a legacy-profile fixture before shipping integration.

## Event contract

The module accepts these types: `day_opened`, `day_completed`, `quiz_completed`, `drill_suggested`, `drill_opened`, `drill_completed`, and `difficulty_rated`. Every event requires `type`, `dayId`, and ISO `at`; `lane` is optional. Quiz events can include `score` and `total`. Difficulty events require `rating`: `too_easy`, `right_level`, or `too_hard`.

## Suggested integration sequence

1. On profile load, call `withLearningSignals(profile)` once, then persist only through the app's existing storage route.
2. Emit `quiz_completed` from the established final-score path, not per answer.
3. Emit drill events from the existing suggested-drill and Duel routes.
4. Add the optional difficulty tap after lesson completion, with no default selection and no penalty.
5. Render `summarizeLearningSignals(profile.learningSignals)` in the parent view only.
6. Run this check plus existing test, smoke, restore, profile, visual, interactive, and motion checks.

## Retention

`appendSignal` keeps only the newest 250 valid events. This prevents unbounded local storage while preserving a useful recent history. The summary defaults to a 14-day window and does not make recommendations, schedule reviews, score the learner, or gate access.
