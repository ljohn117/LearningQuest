import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowLeft, Zap, Sparkles } from 'lucide-react';
import { S } from './styles.jsx';
import { Question } from './Question.jsx';
import { Bar } from './views.jsx';
import { EXTRA_DRILLS, MATH_DRILLS, rnd, pickOne, clampLevel, MAX_LEVEL, asQuestion } from './drills.js';
import { CURRICULUM, SUBJECT_ORDER } from '../content/index.js';
import { COMPANIONS, GUARDIANS, earnedCompanions } from '../content/companions.js';
import { dayKey, PRACTICE_XP } from './progress.js';
import { play } from './sound.js';

const ALL_DRILLS = [...MATH_DRILLS, ...EXTRA_DRILLS];
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

/* Difficulty follows him rather than the clock.
 *
 * Two right in a row raises the level, a miss drops it. The rise is what
 * makes this practice rather than repetition — the same idea keeps arriving
 * in a harder form for as long as he keeps handling it, so he cannot settle
 * into recognising one shape.
 *
 * The fall is the half that had to be right. Getting something wrong makes
 * the next question EASIER, which is the only version of adaptive difficulty
 * that belongs in this app: it reads as the app steadying him, never as a
 * penalty, and it makes a bad run impossible to spiral. */
const levelFor = (streak) => clampLevel(Math.floor(streak / 2) + 1);

export function DuelIntro({ profile, onBack, onStart }) {
  const unlocked = useMemo(
    () => ALL_DRILLS.filter((d) => isUnlocked(profile, d)),
    [profile]
  );
  const companions = earnedCompanions(profile, CURRICULUM, SUBJECT_ORDER)
    .filter((c) => COMPANIONS[c]);
  const [ally, setAlly] = useState(null);

  /* A companion that only sat there being decorative was a collection with
     no verbs. Bringing one now does two things: it fights alongside you and
     says so in its own lane's voice, and where its lane has drills of its
     own it brings those instead of the mixed pool. Earning it is what
     unlocks the ability to aim your practice. */
  const allyDrills = (c) => unlocked.filter((d) => d.subj === c);

  return (
    <div>
      <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack} aria-label="Back">
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
        <>
          <div style={S.sectionLabel}>Who comes with you</div>
          <div className="lq-rise" style={{ ...S.companionRow, animationDelay: '.04s' }}>
            {companions.map((c) => {
              const on = ally === c, comp = COMPANIONS[c], mine = allyDrills(c).length;
              return (
                <button key={c} type="button" className="lq-tap"
                  aria-pressed={on}
                  aria-label={`${comp.name}, ${comp.title}${mine ? ` — brings ${mine} of its own drills` : ''}`}
                  onClick={() => setAlly(on ? null : c)}
                  style={{ ...S.cardBtn, ...S.companionChip, cursor: 'pointer',
                    borderColor: on ? (CURRICULUM[c]?.accent || '#5aa9ff') : '#262c3d',
                    background: on ? (CURRICULUM[c]?.accent || '#5aa9ff') + '18' : 'transparent' }}>
                  <span style={{ fontSize: 19 }}>{comp.glyph}</span>
                  <span style={{ fontSize: 12.5, color: on ? '#e7e9f0' : '#aeb4c4' }}>{comp.name}</span>
                </button>
              );
            })}
          </div>
          <div style={{ ...S.muted, fontSize: 13, marginTop: 8, lineHeight: 1.55 }}>
            {!ally
              ? 'Tap one to bring it along. Optional — a duel works fine without.'
              : allyDrills(ally).length
                ? `${COMPANIONS[ally].name} brings ${allyDrills(ally).length} drill${allyDrills(ally).length > 1 ? 's' : ''} of its own. Start a mixed duel and you will get those.`
                : `${COMPANIONS[ally].name} has no drills of its own yet, but it will fight alongside you.`}
          </div>
        </>
      )}

      {unlocked.length > 0 && (
        <button className="lq-tap lq-card" style={{ ...S.duelCard, marginTop: 18 }} onClick={() => onStart(null, ally)}>
          <div style={{ fontSize: 26 }}>🌀</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={S.planTitle}>Mixed Duel</div>
            <div style={{ ...S.muted, fontSize: 13 }}>Everything you've unlocked, shuffled</div>
          </div>
        </button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {unlocked.map((d) => (
          <button key={d.id} className="lq-tap" style={S.duelRow} onClick={() => onStart(d.id, ally)}>
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

export function DuelSession({ drillId, allyKey, profile, onExit, onDone }) {
  const pool = useMemo(() => {
    const unlocked = ALL_DRILLS.filter((d) => isUnlocked(profile, d));
    if (drillId) {
      const one = ALL_DRILLS.filter((d) => d.id === drillId);
      if (one.length) return one;
    }
    /* A chosen companion narrows the mixed pool to its own lane, when it has
       one. Falls through to everything unlocked when it does not. */
    const mine = allyKey ? unlocked.filter((d) => d.subj === allyKey) : [];
    if (mine.length) return mine;
    return unlocked.length ? unlocked : [ALL_DRILLS[0]];
  }, [drillId, allyKey, profile]);

  const guardian = useMemo(() => GUARDIANS[rnd(0, GUARDIANS.length - 1)], []);
  const ally = useMemo(() => {
    if (allyKey && COMPANIONS[allyKey]) return COMPANIONS[allyKey];
    const earned = earnedCompanions(profile, CURRICULUM, SUBJECT_ORDER);
    return COMPANIONS[earned.find((c) => COMPANIONS[c])] || COMPANIONS.math;
  }, [allyKey, profile]);

  const [say, setSay] = useState(() => ally.lines?.open || null);

  const [hp, setHp] = useState(HP);
  const [level, setLevel] = useState(1);
  const [q, setQ] = useState(() => asQuestion(pickOne(pool), 1));
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
      setSay(pickOne(ally.lines?.miss || ['Go again.']));
      const eased = clampLevel(level - 1);
      setLevel(eased);
      setQ(asQuestion(pickOne(pool), eased));
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
    play(dmg === 2 ? 'charged' : 'hit');
    setSay(nextStreak === CHARGE_AT && ally.lines?.charge
      ? ally.lines.charge
      : pickOne(ally.lines?.hit || ['Hit.']));

    if (nextHp <= 0) {
      onDone({ right: right + 1, asked: nextAsked, bestStreak: bestStreak.current, guardian, ally });
      return;
    }
    const next = levelFor(nextStreak);
    setLevel(next);
    setQ(asQuestion(pickOne(pool), next));
  }

  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit} aria-label="Leave duel">
          <ArrowLeft size={18} color="#aeb4c4" />
        </button>
        <div style={{ flex: 1 }}><Bar pct={(HP - hp) / HP} accent="#ff9f5a" thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{hp} left</span>
        <span style={{ ...S.mono, fontSize: 11, color: level > 1 ? '#ffd76a' : '#5b6275', letterSpacing: '.5px' }}
          title={`Questions get harder as you keep them coming, and easier if one slips. Level ${level} of ${MAX_LEVEL}.`}>
          LV{level}
        </span>
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

        {say && (
          <div key={'s' + asked} className="lq-rise" style={S.allyLine}>“{say}”</div>
        )}

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
  useEffect(() => { play('win'); }, []);
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
      {result.ally?.lines?.win && (
        <div className="lq-rise" style={{ ...S.allyLine, marginTop: 14, justifyContent: 'center' }}>
          <span style={{ fontSize: 16, marginRight: 7 }}>{result.ally.glyph}</span>
          “{result.ally.lines.win}”
        </div>
      )}
      <button className="lq-tap" style={{ ...S.primaryBtn, background: '#ff9f5a', color: '#0c0e16', marginTop: 26 }}
        onClick={onContinue}>
        Again
      </button>
    </div>
  );
}
