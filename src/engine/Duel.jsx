import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Zap, Sparkles } from 'lucide-react';
import { S } from './styles.jsx';
import { Question } from './Question.jsx';
import { DRILLS as MATH_DRILLS, Bar } from './views.jsx';
import { EXTRA_DRILLS, rnd, pickOne } from './drills.js';
import { CURRICULUM, SUBJECT_ORDER } from '../content/index.js';
import { COMPANIONS, GUARDIANS, earnedCompanions } from '../content/companions.js';
import { dayKey, PRACTICE_XP } from './progress.js';

/* Math drills predate the others and carry no subject field. */
const ALL_DRILLS = [
  ...MATH_DRILLS.map((d) => ({ ...d, subj: 'math' })),
  ...EXTRA_DRILLS,
];
const isUnlocked = (profile, d) => !!profile.completed?.[dayKey(d.subj, d.day)];

/* Skill Duel — a battle wrapper around the procedural drill generators.
 *
 * Borrowed from the games he already likes: your answer is an action, it
 * lands visibly, and there is something on screen reacting to it. What is
 * deliberately NOT borrowed is losing. The guardian has no attack and deals
 * no damage; its health only ever goes down. A wrong answer fizzles and the
 * next question comes.
 *
 * So every duel is winnable, and the only thing accuracy changes is the
 * rank at the end. For a kid who already assumes he'll fail, a battle he
 * could lose is a battle he won't start. */

const HP = 8;            // correct answers needed
const CHARGE_AT = 5;     // in a row before a charged hit

export function DuelIntro({ profile, onBack, onStart }) {
  const unlocked = useMemo(
    () => ALL_DRILLS.filter((d) => isUnlocked(profile, d)),
    [profile]
  );
  const companions = earnedCompanions(profile, CURRICULUM, SUBJECT_ORDER);

  return (
    <div>
      <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack}>
        <ArrowLeft size={18} color="#aeb4c4" />
      </button>

      <div className="lq-rise">
        <div style={S.eyebrow}>Skill Duel</div>
        <h1 style={S.h1}>Pick your ground.</h1>
        <div style={S.muted}>
          {unlocked.length
            ? 'Every question is generated fresh, so there is nothing to memorize.'
            : 'Finish a math day to unlock your first duel.'}
        </div>
      </div>

      {companions.length > 0 && (
        <div className="lq-rise" style={{ ...S.companionRow, animationDelay: '.04s' }}>
          {companions.map((c) => (
            <div key={c} style={S.companionChip} title={`${COMPANIONS[c].name} — ${COMPANIONS[c].title}`}>
              <span style={{ fontSize: 19 }}>{COMPANIONS[c].glyph}</span>
              <span style={{ fontSize: 12.5, color: '#aeb4c4' }}>{COMPANIONS[c].name}</span>
            </div>
          ))}
        </div>
      )}

      {unlocked.length > 0 && (
        <button className="lq-tap lq-card" style={{ ...S.duelCard, marginTop: 18 }} onClick={() => onStart(null)}>
          <div style={{ fontSize: 26 }}>🌀</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={S.planTitle}>Mixed Duel</div>
            <div style={{ ...S.muted, fontSize: 13 }}>Everything you've unlocked, shuffled</div>
          </div>
        </button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {unlocked.map((d) => (
          <button key={d.id} className="lq-tap" style={S.duelRow} onClick={() => onStart(d.id)}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: CURRICULUM[d.subj]?.accent || '#5aa9ff', flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: 'left' }}>{d.name}</span>
            <span style={{ ...S.muted, fontSize: 12 }}>{CURRICULUM[d.subj]?.name}</span>
            <Zap size={14} color="#5aa9ff" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function DuelSession({ drillId, profile, onExit, onDone }) {
  const pool = useMemo(() => {
    const unlocked = ALL_DRILLS.filter((d) => isUnlocked(profile, d));
    const p = drillId ? ALL_DRILLS.filter((d) => d.id === drillId) : unlocked;
    return p.length ? p : [ALL_DRILLS[0]];
  }, [drillId, profile]);

  const guardian = useMemo(() => GUARDIANS[rnd(0, GUARDIANS.length - 1)], []);
  const ally = useMemo(() => {
    const earned = earnedCompanions(profile, CURRICULUM, SUBJECT_ORDER);
    return COMPANIONS[earned[0] || 'math'];
  }, [profile]);

  const [hp, setHp] = useState(HP);
  const [q, setQ] = useState(() => ({ ...pickOne(pool).gen(), type: 'numeric' }));
  const [asked, setAsked] = useState(0);
  const [right, setRight] = useState(0);
  const [streak, setStreak] = useState(0);
  const bestStreak = useRef(0);
  const [flash, setFlash] = useState(null);   // 'hit' | 'charged' | 'fizzle'

  const charged = streak >= CHARGE_AT;

  function answered(ok) {
    const nextAsked = asked + 1;
    setAsked(nextAsked);

    if (!ok) {
      setStreak(0);
      setFlash('fizzle');
      setQ({ ...pickOne(pool).gen(), type: 'numeric' });
      return;
    }

    const dmg = charged ? 2 : 1;
    const nextHp = Math.max(0, hp - dmg);
    const nextStreak = streak + 1;
    bestStreak.current = Math.max(bestStreak.current, nextStreak);

    setRight(right + 1);
    setStreak(nextStreak);
    setHp(nextHp);
    setFlash(dmg === 2 ? 'charged' : 'hit');

    if (nextHp <= 0) {
      onDone({ right: right + 1, asked: nextAsked, bestStreak: bestStreak.current, guardian });
      return;
    }
    setQ({ ...pickOne(pool).gen(), type: 'numeric' });
  }

  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit}>
          <ArrowLeft size={18} color="#aeb4c4" />
        </button>
        <div style={{ flex: 1 }}><Bar pct={(HP - hp) / HP} accent="#ff9f5a" thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{hp} left</span>
      </div>

      <div style={S.duelStage}>
        <div key={flash + asked} className={flash === 'fizzle' ? '' : 'lq-hit'} style={{ fontSize: 54, lineHeight: 1 }}>
          {guardian.glyph}
        </div>
        <div style={{ ...S.eyebrow, color: '#ff9f5a', marginTop: 6 }}>{guardian.name}</div>
        <div style={{ ...S.muted, fontSize: 13 }}>{guardian.line}</div>

        <div style={S.duelAlly}>
          <span style={{ fontSize: 20 }}>{ally.glyph}</span>
          <span style={{ fontSize: 12.5, color: '#aeb4c4' }}>{ally.name}</span>
          {charged && (
            <span style={S.chargeTag}><Sparkles size={11} /> Charged</span>
          )}
        </div>

        {flash && (
          <div key={'f' + asked} className="lq-rise" style={{
            ...S.duelFlash,
            color: flash === 'fizzle' ? '#8b91a3' : flash === 'charged' ? '#ffd76a' : '#3ddc97',
          }}>
            {flash === 'fizzle' ? 'Fizzled — go again' : flash === 'charged' ? 'Charged hit! ×2' : 'Direct hit'}
          </div>
        )}
      </div>

      <div key={asked} className="lq-rise" style={{ marginTop: 18 }}>
        <Question q={q} accent="#ff9f5a" eyebrow={charged ? 'Charged' : 'Your move'}
          xp={PRACTICE_XP} nextLabel="Cast" onNext={answered} />
      </div>
    </div>
  );
}

export function DuelWon({ result, earned, onContinue }) {
  const acc = result.asked ? result.right / result.asked : 1;
  const rank = acc === 1 ? 'Flawless' : acc >= 0.8 ? 'Clean' : acc >= 0.6 ? 'Hard-won' : 'Stubborn';
  const note = acc === 1
    ? 'Not one wasted move.'
    : acc >= 0.8 ? 'Barely broke stride.'
    : acc >= 0.6 ? 'It put up a fight. You won anyway.'
    : 'It took a while. You still finished it.';

  return (
    <div style={{ textAlign: 'center', paddingTop: 26 }}>
      <div className="lq-rise" style={{ fontSize: 50 }}>{result.guardian.glyph}</div>
      <div className="lq-rise" style={{ ...S.eyebrow, color: '#ff9f5a', marginTop: 8 }}>Defeated</div>
      <h1 className="lq-rise" style={{ ...S.h1, marginTop: 2 }}>{rank}</h1>
      <div className="lq-rise" style={S.muted}>
        {result.right} of {result.asked} · best run {result.bestStreak} · +{earned} XP
      </div>
      <div className="lq-rise" style={{ ...S.muted, marginTop: 10, fontSize: 14 }}>{note}</div>
      <button className="lq-tap" style={{ ...S.primaryBtn, background: '#ff9f5a', color: '#0c0e16', marginTop: 26 }}
        onClick={onContinue}>
        Again
      </button>
    </div>
  );
}
