import React, { useState, useMemo } from 'react';
import { ArrowLeft, Rocket, Sparkles, Zap, Check } from 'lucide-react';
import { S } from './styles.jsx';
import { Question } from './Question.jsx';
import { Bar } from './views.jsx';
import { CURRICULUM } from '../content/index.js';
import { buildSession, recordReview, REVIEW_XP } from './daily.js';

/* The daily post-homework session: a short mixed warm-up from finished work,
   then today's lesson. */

export function DailyPlan({ profile, onBack, onWarmup, onLesson }) {
  const s = useMemo(() => buildSession(profile), [profile]);

  if (s.isFirstEver) {
    const l = s.lesson;
    return (
      <div>
        <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} color="#aeb4c4" />
        </button>
        <div className="lq-rise">
          <div style={S.eyebrow}>Today</div>
          <h1 style={S.h1}>Let's start here.</h1>
          <div style={S.muted}>First one — no warm-up yet. That comes once you've finished a day.</div>
        </div>
        {l && (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: CURRICULUM[l.subj].accent, color: '#0c0e16', marginTop: 22 }}
            onClick={() => onLesson(l)}>
            <Rocket size={16} /> Start {l.title || l.day.title}
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack} aria-label="Back">
        <ArrowLeft size={18} color="#aeb4c4" />
      </button>

      <div className="lq-rise">
        <div style={S.eyebrow}>Today</div>
        <h1 style={S.h1}>Here's the plan.</h1>
        <div style={S.muted}>About ten minutes.</div>
      </div>

      <div className="lq-rise lq-card" style={{ ...S.planCard, animationDelay: '.06s' }}>
        <div style={S.planRow}>
          <div style={{ ...S.planDot, background: '#5aa9ff22', color: '#5aa9ff' }}><Zap size={15} /></div>
          <div style={{ flex: 1 }}>
            <div style={S.planTitle}>Warm-up</div>
            <div style={S.muted}>
              {s.review.length
                ? `${s.review.length} questions from things you've already finished`
                : 'Nothing to review yet'}
            </div>
          </div>
        </div>

        {s.lesson && (
          <div style={{ ...S.planRow, marginTop: 14 }}>
            <div style={{ ...S.planDot, background: CURRICULUM[s.lesson.subj].accent + '22', color: CURRICULUM[s.lesson.subj].accent }}>
              <Rocket size={15} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={S.planTitle}>{s.lesson.day.title}</div>
              <div style={S.muted}>{CURRICULUM[s.lesson.subj].name} · {s.lesson.day.tag}</div>
            </div>
          </div>
        )}

        {s.allLessonsDone && (
          <div style={{ ...S.planRow, marginTop: 14 }}>
            <div style={{ ...S.planDot, background: '#3ddc9722', color: '#3ddc97' }}><Check size={15} /></div>
            <div style={{ flex: 1 }}>
              <div style={S.planTitle}>Every lesson finished</div>
              <div style={S.muted}>All {s.totalDays} of them. Warm-ups and drills keep going.</div>
            </div>
          </div>
        )}
      </div>

      <button className="lq-tap" style={{ ...S.primaryBtn, background: '#5aa9ff', color: '#0c0e16', marginTop: 22 }}
        onClick={() => (s.review.length ? onWarmup(s.review) : s.lesson && onLesson(s.lesson))}>
        <Sparkles size={16} /> Start
      </button>
    </div>
  );
}

export function WarmupSession({ items, onDone, onExit }) {
  const [i, setI] = useState(0);
  const [results, setResults] = useState([]);
  const item = items[i];
  const accent = CURRICULUM[item.subj]?.accent || '#5aa9ff';

  function next(correct) {
    const all = [...results, { ...item, correct }];
    if (i + 1 >= items.length) { onDone(all); return; }
    setResults(all); setI(i + 1);
  }

  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit} aria-label="Leave warm-up">
          <ArrowLeft size={18} color="#aeb4c4" />
        </button>
        <div style={{ flex: 1 }}><Bar pct={i / items.length} accent="#5aa9ff" thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}/{items.length}</span>
      </div>

      <div key={i} className="lq-rise" style={{ marginTop: 26 }}>
        {/* No subject label on purpose — working out which idea applies is
            the point of a mixed warm-up. */}
        <Question q={item.q} accent={accent} eyebrow="Warm-up" xp={REVIEW_XP}
          nextLabel={i + 1 >= items.length ? 'Done' : 'Next'} onNext={next} />
      </div>
    </div>
  );
}

export function WarmupDone({ results, earned, lesson, onLesson, onBack }) {
  const right = results.filter((r) => r.correct).length;
  return (
    <div style={{ textAlign: 'center', paddingTop: 30 }}>
      <div className="lq-rise" style={{ fontSize: 48 }}>{right === results.length ? '🎯' : '💪'}</div>
      <h1 className="lq-rise" style={{ ...S.h1, marginTop: 10 }}>
        {right === results.length ? 'All of them.' : 'Warm-up done.'}
      </h1>
      <div className="lq-rise" style={S.muted}>
        {right} of {results.length} · +{earned} XP
      </div>
      <div className="lq-rise" style={{ ...S.muted, marginTop: 10, fontSize: 14 }}>
        That was work you'd already done. You still had it.
      </div>

      {lesson ? (
        <button className="lq-tap" style={{ ...S.primaryBtn, background: CURRICULUM[lesson.subj].accent, color: '#0c0e16', marginTop: 26 }}
          onClick={() => onLesson(lesson)}>
          <Rocket size={16} /> Now: {lesson.day.title}
        </button>
      ) : (
        <button className="lq-tap" style={{ ...S.primaryBtn, background: '#2a2f3d', marginTop: 26 }} onClick={onBack}>
          Back to Mission Control
        </button>
      )}
    </div>
  );
}
