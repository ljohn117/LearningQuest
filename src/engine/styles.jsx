import React from 'react';

/* Shared style object + injected stylesheet. Extracted from the prototypes. */
export const S = {
  labBox: { marginTop: 14, marginBottom: 14, background: '#0f1220', border: '1px solid #262c3d', borderRadius: 14, padding: 14 },
  labTask: { display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, color: '#c9cee0', lineHeight: 1.5, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" },
  labEditor: { width: '100%', boxSizing: 'border-box', background: '#080a12', color: '#e7e9f0', border: '1px solid #2a2f3d', borderRadius: 10, padding: '11px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.65, resize: 'vertical', outline: 'none' },
  labOut: { marginTop: 12, background: '#080a12', border: '1px solid #262c3d', borderRadius: 10, padding: '10px 12px' },
  labOutLbl: { fontSize: 10, letterSpacing: '.14em', color: '#5b6275', fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 },
  labLine: { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#e7e9f0', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
  labPass: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: '#3ddc97', fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" },
  labTry: { marginTop: 8, color: '#f6b73c', fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
  bg: { minHeight: '100vh', width: '100%', backgroundColor: '#0c0e16', backgroundImage: 'radial-gradient(1200px 600px at 50% -10%, #1a2030 0%, rgba(12,14,22,0) 55%), radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: 'auto, 22px 22px', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#e7e9f0' },
  col: { maxWidth: 560, margin: '0 auto', padding: '24px 18px 56px' },
  loading: { textAlign: 'center', padding: '80px 0', color: '#8b91a3', fontFamily: "'JetBrains Mono', monospace" },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#8b91a3', marginBottom: 6 },
  h1: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.1, margin: '0 0 4px', letterSpacing: -.5 },
  heroCard: { marginTop: 16, padding: 18, borderRadius: 18, background: 'linear-gradient(180deg, #181d2c, #12151f)', border: '1px solid #262b3a', boxShadow: '0 18px 40px -22px rgba(0,0,0,.8)' },
  heroTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  rankRow: { display: 'flex', alignItems: 'center', gap: 6 },
  rankName: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: '#f6b73c' },
  lvlBig: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, marginTop: 2 },
  barLabel: { display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 },
  track: { width: '100%', background: '#252a38', borderRadius: 99, overflow: 'hidden' },
  mono: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 },
  muted: { color: '#8b91a3', fontSize: 13 },
  streak: { display: 'flex', alignItems: 'center', gap: 8 },
  streakLbl: { fontSize: 10, color: '#6b7281', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  sectionLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6b7281', margin: '26px 0 12px' },
  subjCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, background: '#141826', border: '1px solid #232838', transition: 'transform .15s ease' },
  subjIcon: { width: 46, height: 46, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  subjName: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 17 },
  subjBlurb: { color: '#8b91a3', fontSize: 13, marginTop: 1 },
  subjMeta: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 },
  dayCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 14, background: '#141826', border: '1px solid #232838' },
  dayNode: { width: 30, height: 30, borderRadius: 99, border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  daySub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7281', letterSpacing: .5 },
  dayTitle: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, marginTop: 3 },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 6, border: '1px solid' },
  body: { fontSize: 15.5, lineHeight: 1.6, color: '#cfd3df', margin: 0 },
  concept: { padding: 14, borderRadius: 13, background: '#12151f', border: '1px solid' },
  conceptTerm: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, marginBottom: 4 },
  example: { padding: 14, borderRadius: 13, background: '#13182a', border: '1px solid #232c44' },
  exTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#5aa9ff', background: '#5aa9ff1c', padding: '3px 7px', borderRadius: 6 },
  callout: { display: 'flex', gap: 10, padding: 14, borderRadius: 13, background: 'linear-gradient(180deg,#1d1a13,#161310)', border: '1px solid #3a3320' },
  formula: { padding: '16px 14px', borderRadius: 13, background: '#10131d', border: '1.5px dashed' },
  formulaText: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 19, textAlign: 'center', letterSpacing: .5 },
  vizBox: { padding: '10px 6px', borderRadius: 13, background: '#10131d', border: '1px solid #1f2433' },
  recapItem: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12, borderRadius: 12, background: '#141826', border: '1px solid #232838' },
  recapCheck: { width: 24, height: 24, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  primaryBtn: { width: '100%', border: 'none', borderRadius: 14, padding: '15px 18px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: '#0c0e16', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  secondaryBtn: { border: '1px solid #2a2f3d', background: '#161a28', borderRadius: 14, padding: '15px 18px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: '#aeb4c4', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 },
  iconBtn: { width: 40, height: 40, borderRadius: 11, background: '#161a28', border: '1px solid #262b3a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
  quizTop: { display: 'flex', alignItems: 'center', gap: 12 },
  qPrompt: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, lineHeight: 1.25, margin: '8px 0 0' },
  /* The text a question is ABOUT, as opposed to the question itself.
     Set in body type, not the 22px display face — a four-sentence paragraph
     in the prompt heading is a wall.

     A FILLED ROUNDED BOX WAS WRONG. The first version used the same dark fill
     and rounded border as S.choice, and on screen the sentence under analysis
     read as one more thing to click: "What is missing here?" sat above four
     identical boxes, only three of which were answers. A left rule in the
     question's accent colour with no fill reads as quoted material instead,
     and cannot be confused with a button. */
  qPassage: { marginTop: 14, padding: '2px 0 2px 14px', borderLeft: '3px solid', borderColor: '#3a4154', fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.55, color: '#c3c8d6', whiteSpace: 'pre-line' },
  choice: { textAlign: 'left', padding: '15px 16px', borderRadius: 13, border: '1.5px solid', fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#e7e9f0' },
  numInput: { width: '100%', marginTop: 18, padding: '15px 16px', borderRadius: 13, border: '1.5px solid', background: '#161a28', color: '#fff', fontSize: 18, fontFamily: "'JetBrains Mono', monospace", outline: 'none' },
  miniInput: { padding: '8px 12px', borderRadius: 10, border: '1px solid #3a4154', background: '#161a28', color: '#fff', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', width: 150 },
  hintBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, background: 'transparent', border: '1px dashed #2f3a4d', color: '#5aa9ff', padding: '8px 14px', borderRadius: 10, fontSize: 13.5, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  hintBox: { display: 'flex', gap: 9, marginTop: 16, padding: 12, borderRadius: 12, background: '#5aa9ff10', border: '1px dashed #5aa9ff44' },
  feedback: { marginTop: 18, padding: 14, borderRadius: 13, border: '1px solid' },
  fbTitle: { display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15 },
  medal: { width: 88, height: 88, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18, padding: '10px 18px', borderRadius: 99, background: '#1d1a13', border: '1px solid #3a3320' },
  levelUp: { marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: '#1d1a13', border: '1px solid #4a3f1f', color: '#f6b73c', fontWeight: 600, fontSize: 14, animation: 'glow 2s ease-in-out infinite' },
  ghostBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid #2a2f3d', color: '#8b91a3', padding: '8px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' },
  dangerBtn: { background: '#ff6b6b22', border: '1px solid #ff6b6b66', color: '#ff8f8f', padding: '8px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' },
  planCard: { background: '#12151f', border: '1px solid #262c3d', borderRadius: 18, padding: 18 },
  planRow: { display: 'flex', alignItems: 'center', gap: 13 },
  planDot: { width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  planTitle: { fontSize: 15.5, fontWeight: 600, color: '#e7e9f0', marginBottom: 2 },
  dailyBtn: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', background: 'linear-gradient(135deg, #5aa9ff22, #12151f)', border: '1px solid #5aa9ff55', borderRadius: 18, padding: '16px 18px', cursor: 'pointer', marginBottom: 16 },
  duelCard: { display: 'flex', alignItems: 'center', gap: 13, width: '100%', background: 'linear-gradient(135deg, #ff9f5a22, #12151f)', border: '1px solid #ff9f5a55', borderRadius: 16, padding: '14px 16px', cursor: 'pointer' },
  duelRow: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: '#12151f', border: '1px solid #262c3d', borderRadius: 12, padding: '12px 14px', cursor: 'pointer', color: '#e7e9f0', fontSize: 14.5, fontFamily: "'DM Sans', sans-serif" },
  duelStage: { textAlign: 'center', padding: '22px 10px 16px', background: 'radial-gradient(340px 150px at 50% 0%, #ff9f5a18, rgba(12,14,22,0))', borderRadius: 18, marginTop: 14 },
  duelAlly: { display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 14, background: '#12151f', border: '1px solid #262c3d', borderRadius: 999, padding: '6px 12px' },
  chargeTag: { display: 'inline-flex', alignItems: 'center', gap: 3, marginLeft: 4, background: '#ffd76a22', border: '1px solid #ffd76a66', color: '#ffd76a', borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 700 },
  duelFlash: { marginTop: 12, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" },
  companionRow: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  companionChip: { display: 'inline-flex', alignItems: 'center', gap: 7, background: '#12151f', border: '1px solid #262c3d', borderRadius: 999, padding: '6px 12px' },
  cardBtn: { font: 'inherit', color: 'inherit', textAlign: 'left', width: '100%', appearance: 'none', WebkitAppearance: 'none' },
  pRow: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: '#12151f', border: '1px solid #1e2331', borderRadius: 10, fontSize: 14.5 },
  pCard: { background: '#12151f', border: '1px solid #262c3d', borderRadius: 11, padding: '10px 12px' },
  stopNote: { marginTop: 22, background: '#12151f', border: '1px solid #262c3d', borderRadius: 13, padding: '12px 15px', fontSize: 14, color: '#aeb4c4', lineHeight: 1.55, maxWidth: 340, marginLeft: 'auto', marginRight: 'auto' },
  allyLine: { display: 'flex', alignItems: 'center', marginTop: 9, fontSize: 13.5, color: '#aeb4c4', fontStyle: 'italic', lineHeight: 1.5, maxWidth: 320, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' },
  warnBar: { display: 'flex', gap: 10, alignItems: 'flex-start', background: '#1c1708', border: '1px solid #4a3a12', borderRadius: 12, padding: '12px 14px', marginBottom: 16, fontSize: 13.5, color: '#e7e9f0', lineHeight: 1.55 },
  skipChip: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, marginLeft: 10, paddingLeft: 10, borderLeft: '1px solid #262c3d' },
  teaser: { display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', textAlign: 'center', background: '#12151f', border: '1px solid #232936', borderRadius: 14, padding: '15px 17px', maxWidth: 360, margin: '22px auto 0' },
  teaserLbl: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, letterSpacing: '1.1px', color: '#5b6275' },
  ladTabs: { display: 'flex', gap: 6, margin: '20px 0 16px' },
  ladTab: { font: 'inherit', fontSize: 13.5, color: '#8b91a3', background: 'transparent', border: '1px solid #262c3d', borderRadius: 999, padding: '7px 15px', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' },
  ladTabOn: { color: '#e7e9f0', borderColor: '#3a4154', background: '#191d29' },
  ladWrap: { display: 'flex', flexDirection: 'column' },
  ladRow: { display: 'flex', gap: 12, alignItems: 'stretch', textAlign: 'left', background: 'transparent', border: 'none', padding: 0, width: '100%' },
  ladRail: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 13, flexShrink: 0 },
  ladDot: { width: 11, height: 11, borderRadius: 6, border: '1.5px solid', flexShrink: 0, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  ladLine: { width: 1.5, flex: 1, marginTop: 3, borderRadius: 1 },
  scaleBox: { position: 'relative', background: 'linear-gradient(160deg,#141826,#10131d)', border: '1px solid #2a2f3d', borderRadius: 16, padding: '17px 17px 15px', margin: '14px 0', overflow: 'hidden' },
  scaleNum: { fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 30, lineHeight: 1.05, letterSpacing: '-0.5px' },
  scaleUnit: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, color: '#8b91a3', marginTop: 5, textTransform: 'uppercase', letterSpacing: '.7px' },
  scaleNote: { fontSize: 14, color: '#c7cbd6', lineHeight: 1.6, marginTop: 11 },
  scaleTag: { position: 'absolute', top: 13, right: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, letterSpacing: '.9px', color: '#5b6275' },
  calBox: { marginTop: 24, background: '#12151f', border: '1px solid #262c3d', borderRadius: 15, padding: '15px 15px 12px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' },
  calRow: { display: 'flex', gap: 7, marginTop: 11 },
  calBtn: { flex: 1, font: 'inherit', color: '#aeb4c4', background: 'transparent', border: '1px solid #2a2f3d', borderRadius: 11, padding: '10px 4px 9px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, appearance: 'none', WebkitAppearance: 'none' },
  writeBox: { background: '#12151f', border: '1px solid #2a2f3d', borderRadius: 16, padding: 16 },
  writeTask: { display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 15, color: '#e7e9f0', lineHeight: 1.5, marginBottom: 10 },
  writeStarter: { fontSize: 14, color: '#aeb4c4', fontStyle: 'italic', borderLeft: '2px solid #2a2f3d', paddingLeft: 11, marginBottom: 11, lineHeight: 1.55 },
  writeArea: { width: '100%', background: '#0c0e16', color: '#e7e9f0', border: '1px solid #2a2f3d', borderRadius: 11, padding: 12, fontSize: 15, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", resize: 'vertical', outline: 'none', boxSizing: 'border-box' },
  writeMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 7, fontSize: 12 },
  writeKind: { display: 'inline-block', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, border: '1px solid', marginBottom: 10, fontWeight: 600 },
  writeClaim: { background: '#0c0e16', border: '1px solid #3a2f2f', borderLeft: '3px solid #b4564e', borderRadius: 11, padding: '12px 14px', marginBottom: 12, fontSize: 15, lineHeight: 1.6, color: '#d6d2cf' },
  writeClaimTag: { fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: '#b4564e', fontWeight: 600, marginBottom: 6 },
  writeCheck: { marginTop: 14, paddingTop: 13, borderTop: '1px solid #1e2331' },
  writeCheckRow: { display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #262c3d', borderRadius: 10, padding: '9px 11px', marginBottom: 7, cursor: 'pointer' },
  writeCheckBox: { width: 19, height: 19, borderRadius: 6, border: '1.5px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  confirmRow: { display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  backupBox: { marginTop: 18, background: '#12151f', border: '1px solid #262c3d', borderRadius: 14, padding: 14, textAlign: 'left' },
  backupTa: { width: '100%', height: 90, margin: '9px 0', background: '#0c0e16', color: '#8b91a3', border: '1px solid #2a2f3d', borderRadius: 9, padding: 9, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' },
  demoBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '8px 12px', borderRadius: 10, background: '#5aa9ff14', border: '1px dashed #5aa9ff55', color: '#9cc6ff', fontSize: 13, marginBottom: 16 },
  demoExit: { background: 'transparent', border: '1px solid #5aa9ff66', color: '#9cc6ff', borderRadius: 8, padding: '3px 12px', fontSize: 12, cursor: 'pointer' },
  profileCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, background: '#141826', border: '1px solid #232838', width: '100%', textAlign: 'left', cursor: 'pointer' },
  avatar: { width: 44, height: 44, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, flexShrink: 0 },
  importBox: { marginTop: 20, background: '#12151f', border: '1px solid #262c3d', borderRadius: 16, padding: 16 },
  importTitle: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#e7e9f0', marginBottom: 4 },
  importRow: { display: 'flex', alignItems: 'center', gap: 11, border: '1px solid #262c3d', borderRadius: 11, padding: '11px 12px', marginBottom: 8, cursor: 'pointer' },
  importCheck: { width: 20, height: 20, borderRadius: 6, border: '1.5px solid #3a4154', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  importLabel: { fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600, color: '#e7e9f0' },
  importNote: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b91a3', marginTop: 2 },
};

export function Shell({ children }) { return <div style={S.bg}><div style={S.col}>{children}</div></div>; }
export function FontAndStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..600&family=JetBrains+Mono:wght@500..700&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      @keyframes fadeUp { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:none;} }
      @keyframes lqHit { 0%{transform:none;} 25%{transform:translateX(-7px) scale(1.06);} 55%{transform:translateX(6px) scale(1.03);} 100%{transform:none;} }
      .lq-hit { animation: lqHit .34s ease-out; }
      @keyframes pop { 0%{transform:scale(.8);opacity:0;} 60%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
      @keyframes flicker { 0%,100%{ transform: scale(1) rotate(-2deg);} 50%{ transform: scale(1.12) rotate(2deg);} }
      @keyframes glow { 0%,100%{ box-shadow:0 0 0 0 rgba(246,183,60,0);} 50%{ box-shadow:0 0 28px 2px rgba(246,183,60,.35);} }
      @keyframes drift { 0%{transform:translate(0,0);} 25%{transform:translate(3px,-2px);} 50%{transform:translate(-2px,3px);} 75%{transform:translate(2px,2px);} 100%{transform:translate(0,0);} }
      @keyframes orbitSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      .lq-rise { animation: fadeUp .5s cubic-bezier(.2,.7,.2,1) both; }
      :focus-visible { outline: 3px solid #5aa9ff; outline-offset: 3px; border-radius: 8px; }
      .lq-tap { transition: transform .12s ease, filter .15s ease, background .15s ease; cursor:pointer; }
      .lq-tap:active { transform: scale(.97); }
      .lq-card:hover { transform: translateY(-2px); }
      input::placeholder { color:#5b6275; }
    `}</style>
  );
}

