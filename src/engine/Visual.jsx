import React from 'react';
import { S } from './styles.jsx';

/* Named SVG diagrams. Union of both prototypes' cases — the three that
   appeared in both (branches, supplydemand, strata) were byte-identical. */
export function Visual({ v, accent }) {
  const wrap = (children, h = 150) => (
    <div style={S.vizBox}><svg viewBox={`0 0 320 ${h}`} width="100%" style={{ display: 'block' }}>{children}</svg></div>
  );
  if (v.kind === 'bars') {
    const unit = 30, y1 = v.scaled ? 28 : 44, y2 = v.scaled ? 88 : 96;
    const Row = ({ y, n, color, label, max }) => (
      <g>
        {Array.from({ length: n }).map((_, i) => (
          <rect key={i} x={14 + i * (unit + 4)} y={y} width={unit} height={26} rx={6} fill={color} opacity={.9} />
        ))}
        <text x={14} y={y - 8} fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{label}</text>
      </g>
    );
    if (v.scaled) return wrap(<>
      <Row y={y1} n={Math.min(v.a, 8)} color={accent} label={v.labelA} />
      <Row y={y2} n={Math.min(v.a2, 8)} color={accent + '88'} label={`${v.labelB} — same ratio, scaled up`} />
    </>, 130);
    return wrap(<>
      <Row y={y1} n={v.a} color={accent} label={v.labelA} />
      <Row y={y2} n={v.b} color="#5aa9ff" label={v.labelB} />
    </>, 140);
  }
  if (v.kind === 'scale') return wrap(<>
    <line x1="160" y1="34" x2="160" y2="96" stroke="#3a4154" strokeWidth="6" strokeLinecap="round" />
    <rect x="118" y="96" width="84" height="10" rx="5" fill="#3a4154" />
    <line x1="60" y1="40" x2="260" y2="40" stroke="#8b91a3" strokeWidth="5" strokeLinecap="round" />
    <line x1="78" y1="40" x2="78" y2="56" stroke="#8b91a3" strokeWidth="3" />
    <line x1="242" y1="40" x2="242" y2="56" stroke="#8b91a3" strokeWidth="3" />
    <rect x="36" y="56" width="84" height="30" rx="9" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
    <text x="78" y="76" textAnchor="middle" fill={accent} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.left}</text>
    <rect x="200" y="56" width="84" height="30" rx="9" fill="#5aa9ff33" stroke="#5aa9ff" strokeWidth="1.5" />
    <text x="242" y="76" textAnchor="middle" fill="#5aa9ff" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.right}</text>
    <text x="160" y="128" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">balanced — both sides equal</text>
  </>, 140);
  if (v.kind === 'atom') {
    const shells = [[2, 30], [4, 56]];
    return wrap(<>
      <circle cx="160" cy="74" r="14" fill={accent} opacity=".9" />
      <text x="160" y="78" textAnchor="middle" fill="#0c0e16" fontSize="10" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.protons}p</text>
      {shells.map(([n, r], si) => (
        <g key={si}>
          <circle cx="160" cy="74" r={r} fill="none" stroke="#3a4154" strokeWidth="1.5" strokeDasharray="3 4" />
          {Array.from({ length: n }).map((_, i) => {
            const a = (i / n) * Math.PI * 2 + si;
            return <circle key={i} cx={160 + r * Math.cos(a)} cy={74 + r * Math.sin(a)} r="5" fill="#5aa9ff" style={{ animation: `drift ${3 + si}s ease-in-out infinite` }} />;
          })}
        </g>
      ))}
      <text x="160" y="146" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">carbon: 6 protons · electrons in shells</text>
    </>, 156);
  }
  if (v.kind === 'particles') {
    const Box = ({ x, label, dots }) => (
      <g>
        <rect x={x} y="22" width="88" height="78" rx="10" fill="#161a28" stroke="#2a2f3d" />
        {dots}
        <text x={x + 44} y="120" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{label}</text>
      </g>
    );
    const grid = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(<circle key={`s${r}${c}`} cx={26 + c * 24} cy={40 + r * 24} r="6" fill={accent} />);
    const liq = [[36, 78], [58, 84], [80, 76], [44, 58], [70, 60], [58, 40]].map(([x, y], i) => <circle key={`l${i}`} cx={x + 102} cy={y} r="6" fill={accent} style={{ animation: `drift ${2.4 + i * .3}s ease-in-out infinite` }} />);
    const gas = [[228, 36], [262, 52], [240, 78], [286, 34], [292, 86], [256, 92]].map(([x, y], i) => <circle key={`g${i}`} cx={x} cy={y} r="5" fill={accent} opacity=".85" style={{ animation: `drift ${1.2 + i * .2}s ease-in-out infinite` }} />);
    return wrap(<>
      <Box x={12} label="solid" dots={grid} />
      <Box x={114} label="liquid" dots={liq} />
      <Box x={216} label="gas" dots={gas} />
    </>, 134);
  }
  if (v.kind === 'graph') {
    const pts = [[0, 1], [1, 3], [2, 5]];
    const px = (x) => 60 + x * 84, py = (y) => 124 - y * 17;
    return wrap(<>
      <line x1="48" y1="124" x2="300" y2="124" stroke="#3a4154" strokeWidth="2" />
      <line x1="60" y1="18" x2="60" y2="136" stroke="#3a4154" strokeWidth="2" />
      <line x1={px(-0.1)} y1={py(0.8)} x2={px(2.6)} y2={py(6.2)} stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={px(x)} cy={py(y)} r="6" fill={accent} stroke="#0c0e16" strokeWidth="2" />
          <text x={px(x) + 11} y={py(y) - 7} fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">({x},{y})</text>
        </g>
      ))}
      <text x="174" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{v.label} — every input lands on the line</text>
    </>, 156);
  }
  if (v.kind === 'rtriangle') return wrap(<>
    <polygon points="62,118 62,42 256,118" fill={accent + '22'} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <rect x="62" y="102" width="16" height="16" fill="none" stroke={accent} strokeWidth="1.5" />
    <text x="46" y="84" fill="#8b91a3" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">a</text>
    <text x="150" y="134" fill="#8b91a3" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">b</text>
    <text x="166" y="74" fill={accent} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">c</text>
    <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">a² + b² = c²</text>
  </>, 156);
  if (v.kind === 'parabola') {
    const pts = [-3, -2, -1, 0, 1, 2, 3].map((x) => [160 + x * 38, 122 - x * x * 11]);
    const d = pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
    return wrap(<>
      <line x1="34" y1="122" x2="286" y2="122" stroke="#3a4154" strokeWidth="2" />
      <line x1="160" y1="14" x2="160" y2="134" stroke="#3a4154" strokeWidth="2" />
      <path d={d} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="160" cy="122" r="5" fill={accent} stroke="#0c0e16" strokeWidth="2" />
      <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">y = x² — a parabola, not a line</text>
    </>, 156);
  }
  if (v.kind === 'branches') {
    const Box = (x, label, sub) => (
      <g>
        <rect x={x} y="72" width="80" height="36" rx="8" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
        <text x={x + 40} y="89" textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{label}</text>
        <text x={x + 40} y="102" textAnchor="middle" fill="#8b91a3" fontSize="8.5" fontFamily="JetBrains Mono, monospace">{sub}</text>
      </g>
    );
    return wrap(<>
      <rect x="118" y="14" width="84" height="30" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
      <text x="160" y="33" textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">GOVERNMENT</text>
      <line x1="160" y1="44" x2="160" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1="50" y1="56" x2="270" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1="50" y1="56" x2="50" y2="72" stroke="#3a4154" strokeWidth="2" />
      <line x1="160" y1="56" x2="160" y2="72" stroke="#3a4154" strokeWidth="2" />
      <line x1="270" y1="56" x2="270" y2="72" stroke="#3a4154" strokeWidth="2" />
      {Box(10, 'LEGIS.', 'makes laws')}
      {Box(120, 'EXEC.', 'enforces')}
      {Box(230, 'JUDIC.', 'interprets')}
    </>, 124);
  }
  if (v.kind === 'flow') return wrap(<>
    <ellipse cx="58" cy="38" rx="38" ry="17" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
    <text x="58" y="42" textAnchor="middle" fill={accent} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">START</text>
    <line x1="58" y1="55" x2="58" y2="72" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)" />
    <rect x="20" y="72" width="76" height="30" rx="6" fill="#161a28" stroke={accent} strokeWidth="1.5" />
    <text x="58" y="91" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">do a step</text>
    <line x1="96" y1="87" x2="148" y2="87" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)" />
    <polygon points="200,66 242,87 200,108 158,87" fill={accent + '18'} stroke={accent} strokeWidth="1.5" />
    <text x="200" y="90" textAnchor="middle" fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">done?</text>
    <text x="250" y="90" fill="#3ddc97" fontSize="10" fontFamily="JetBrains Mono, monospace">yes</text>
    <text x="200" y="128" textAnchor="middle" fill="#8b91a3" fontSize="9.5" fontFamily="JetBrains Mono, monospace">no → loop back</text>
    <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker></defs>
  </>, 138);
  if (v.kind === 'supplydemand') return wrap(<>
    <line x1="52" y1="120" x2="290" y2="120" stroke="#3a4154" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="130" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="116" x2="268" y2="34" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="72" y1="34" x2="268" y2="116" stroke="#5aa9ff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="170" cy="75" r="6" fill="#fff" stroke="#0c0e16" strokeWidth="1.5" />
    <text x="240" y="30" fill={accent} fontSize="10" fontFamily="JetBrains Mono, monospace">supply</text>
    <text x="232" y="128" fill="#5aa9ff" fontSize="10" fontFamily="JetBrains Mono, monospace">demand</text>
    <text x="160" y="150" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">they cross at the equilibrium price</text>
  </>, 158);
  if (v.kind === 'strata') {
    const layers = [['#d3ab78', 30], ['#bf9568', 56], ['#a37f58', 82], ['#876a4c', 108]];
    return wrap(<>
      {layers.map(([c, y], i) => <rect key={i} x="40" y={y} width="240" height="24" fill={c} stroke="#0c0e16" strokeWidth="1" />)}
      <circle cx="118" cy="120" r="6" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
      <text x="134" y="124" fill="#1a1208" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">older</text>
      <circle cx="210" cy="42" r="5" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
      <text x="224" y="46" fill="#1a1208" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">younger</text>
      <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">deeper = older (law of superposition)</text>
    </>, 156);
  }
  if (v.kind === 'machine') return wrap(<>
    <rect x="104" y="34" width="112" height="64" rx="14" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
    <text x="160" y="60" textAnchor="middle" fill={accent} fontSize="13" fontWeight="800" fontFamily="JetBrains Mono, monospace">RULE</text>
    <text x="160" y="82" textAnchor="middle" fill="#e7e9f0" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.rule}</text>
    <text x="46" y="72" textAnchor="middle" fill="#5aa9ff" fontSize="20" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.inn}</text>
    <text x="276" y="72" textAnchor="middle" fill="#3ddc97" fontSize="20" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.out}</text>
    <path d={v.reverse ? 'M212 110 H 108' : 'M66 66 H 100'} stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#arr)" fill="none" />
    <path d={v.reverse ? 'M104 110 H 96' : 'M220 66 H 254'} stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#arr)" fill="none" opacity={v.reverse ? 0 : 1} />
    {v.reverse && <text x="160" y="128" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">run it backward: undo the rule</text>}
    <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker></defs>
  </>, v.reverse ? 140 : 120);
  if (v.kind === 'orbit') return wrap(<>
    <circle cx="160" cy="78" r="22" fill="#f6b73c" opacity=".95" />
    <circle cx="160" cy="78" r="30" fill="#f6b73c" opacity=".15" />
    <ellipse cx="160" cy="78" rx="120" ry="52" fill="none" stroke="#3a4154" strokeWidth="1.5" strokeDasharray="4 5" />
    <g style={{ transformOrigin: '160px 78px', animation: 'orbitSpin 14s linear infinite' }}>
      <g>
        <circle cx="280" cy="78" r="10" fill="#5aa9ff" />
        <circle cx="280" cy="78" r="10" fill="none" stroke="#5aa9ff55" strokeWidth="4" />
      </g>
    </g>
    <text x="160" y="144" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">one lap = one year · one spin = one day</text>
  </>, 152);
  if (v.kind === 'gravity') return wrap(<>
    <circle cx="92" cy="70" r="30" fill={accent} opacity=".9" />
    <circle cx="236" cy="70" r="15" fill="#5aa9ff" />
    <path d="M130 70 H 174" stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#ar2)" fill="none" />
    <path d="M214 70 H 196" stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#ar3)" fill="none" />
    <text x="92" y="116" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">more mass = bigger pull</text>
    <text x="236" y="116" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">pulled too</text>
    <defs>
      <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker>
      <marker id="ar3" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto-start-reverse"><path d="M8,0 L0,4 L8,8 z" fill="#8b91a3" /></marker>
    </defs>
  </>, 130);

  if (v.kind === 'cell') return wrap(<>
    <ellipse cx="160" cy="78" rx="118" ry="62" fill={accent + '18'} stroke={accent} strokeWidth="2.5" />
    <circle cx="140" cy="72" r="26" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
    <circle cx="140" cy="72" r="8" fill={accent} opacity="0.5" />
    <text x="140" y="76" textAnchor="middle" fill="#e7e9f0" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">DNA</text>
    <ellipse cx="222" cy="60" rx="20" ry="11" fill="#0c0e16" stroke={accent} strokeWidth="1.5" transform="rotate(-18 222 60)" />
    <ellipse cx="96" cy="106" rx="18" ry="10" fill="#0c0e16" stroke={accent} strokeWidth="1.5" transform="rotate(14 96 106)" />
    <text x="140" y="44" textAnchor="middle" fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">nucleus</text>
    <text x="222" y="40" textAnchor="middle" fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">mitochondria</text>
    <text x="160" y="156" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">the membrane controls what goes in and out</text>
  </>, 166);

  if (v.kind === 'punnett') {
    const cells = [['BB', 1], ['Bb', 1], ['Bb', 1], ['bb', 0]];
    return wrap(<>
      <text x="122" y="26" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">B</text>
      <text x="196" y="26" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">b</text>
      <text x="70" y="66" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">B</text>
      <text x="70" y="122" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">b</text>
      {cells.map((c, i) => {
        const x = 86 + (i % 2) * 74, y = 36 + Math.floor(i / 2) * 56;
        return (
          <g key={i}>
            <rect x={x} y={y} width="72" height="54" rx="6" fill={c[1] ? accent + '2a' : '#1b2030'} stroke={c[1] ? accent : '#3a4154'} strokeWidth="1.5" />
            <text x={x + 36} y={y + 33} textAnchor="middle" fill={c[1] ? accent : '#8b91a3'} fontSize="16" fontWeight="700" fontFamily="JetBrains Mono, monospace">{c[0]}</text>
          </g>
        );
      })}
      <text x="160" y="166" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">3 dominant to 1 recessive — a 3:1 ratio</text>
    </>, 176);
  }

  if (v.kind === 'pyramid') {
    const rows = [['Top predators', '0.1%', 74], ['Secondary consumers', '1%', 122], ['Primary consumers', '10%', 170], ['Producers (plants)', '100%', 218]];
    return wrap(<>
      {rows.map((r, i) => {
        const y = 20 + i * 32, w = r[2];
        return (
          <g key={i}>
            <rect x={160 - w / 2} y={y} width={w} height="27" rx="4" fill={accent + (0x18 + i * 0x10).toString(16)} stroke={accent} strokeWidth="1.4" />
            <text x="160" y={y + 18} textAnchor="middle" fill="#e7e9f0" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
            <text x={160 + w / 2 + 8} y={y + 18} fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">{r[1]}</text>
          </g>
        );
      })}
      <text x="160" y="172" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">only ~10% of energy reaches the next level</text>
    </>, 182);
  }

  if (v.kind === 'funnel') {
    const rows = [['AWARE', 250], ['INTERESTED', 190], ['DECIDING', 130], ['BUYS', 70]];
    return wrap(<>
      {rows.map((r, i) => {
        const y = 18 + i * 34, w = r[1];
        return (
          <g key={i}>
            <rect x={160 - w / 2} y={y} width={w} height="28" rx="5" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
            <text x="160" y={y + 19} textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
          </g>
        );
      })}
      <text x="160" y="172" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">many hear of you · fewer buy</text>
    </>, 182);
  }

  if (v.kind === 'paragraph') {
    const rows = [['TOPIC SENTENCE', 'states the one idea'], ['EVIDENCE', 'facts, examples, quotes'], ['ANALYSIS', 'why the evidence proves it'], ['CLOSING', 'wraps up or bridges on']];
    return wrap(<>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="30" y={16 + i * 38} width="260" height="30" rx="7" fill={accent + '1e'} stroke={accent} strokeWidth="1.4" />
          <text x="42" y={35 + i * 38} fill={accent} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
          <text x="278" y={35 + i * 38} textAnchor="end" fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">{r[1]}</text>
        </g>
      ))}
    </>, 172);
  }

  if (v.kind === 'argument') return wrap(<>
    <rect x="96" y="14" width="128" height="34" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.6" />
    <text x="160" y="36" textAnchor="middle" fill={accent} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">CLAIM</text>
    <line x1="160" y1="48" x2="160" y2="60" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="60" x2="248" y2="60" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="60" x2="72" y2="74" stroke="#3a4154" strokeWidth="2" />
    <line x1="248" y1="60" x2="248" y2="74" stroke="#3a4154" strokeWidth="2" />
    <rect x="20" y="74" width="104" height="32" rx="7" fill="#161a28" stroke={accent} strokeWidth="1.4" />
    <text x="72" y="94" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">REASON</text>
    <rect x="196" y="74" width="104" height="32" rx="7" fill="#161a28" stroke={accent} strokeWidth="1.4" />
    <text x="248" y="94" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">EVIDENCE</text>
    <rect x="86" y="118" width="148" height="30" rx="7" fill="#1b2030" stroke="#5b6275" strokeWidth="1.4" strokeDasharray="4 3" />
    <text x="160" y="137" textAnchor="middle" fill="#aeb4c4" fontSize="9.5" fontFamily="JetBrains Mono, monospace">COUNTERARGUMENT</text>
    <text x="160" y="166" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">answer the objection to get stronger</text>
  </>, 176);

  /* ---- primitives added for the days he is actually failing -------------
   *
   * Every diagram below exists because his progress data showed a day scored
   * under 60% whose idea is natively spatial and was being taught as
   * paragraphs. They are built as general shapes rather than one-off pictures
   * so the next lane that needs a number line or a grid does not get another
   * bespoke SVG. */

  /* A number line with a marked point and a shaded direction.
     Inequalities are the textbook case of an idea that is nearly invisible in
     prose and obvious in one picture: the open circle IS the difference
     between < and <=, and no sentence makes that as clear as the hole. */
  if (v.kind === 'numberline') {
    const min = v.min ?? -5, max = v.max ?? 5, at = v.at ?? 0;
    const x0 = 26, x1 = 294, span = max - min;
    const px = (n) => x0 + ((n - min) / span) * (x1 - x0);
    const ticks = [];
    for (let n = min; n <= max; n++) ticks.push(n);
    const op = v.op || 'gt';
    const goesRight = op === 'gt' || op === 'gte';
    const closed = op === 'gte' || op === 'lte';
    const sym = { gt: '>', gte: '≥', lt: '<', lte: '≤' }[op];
    return wrap(<>
      {/* shaded solution region, drawn under the axis so the line stays crisp */}
      <rect x={goesRight ? px(at) : x0} y={46} width={Math.max(0, goesRight ? x1 - px(at) : px(at) - x0)}
            height={18} fill={accent} opacity={.18} />
      <line x1={x0} y1={55} x2={x1} y2={55} stroke="#3a4154" strokeWidth="2" />
      {ticks.map((n) => (
        <g key={n}>
          <line x1={px(n)} y1={49} x2={px(n)} y2={61} stroke="#3a4154" strokeWidth="1.5" />
          <text x={px(n)} y={76} textAnchor="middle" fill="#8b91a3" fontSize="10"
                fontFamily="JetBrains Mono, monospace">{n}</text>
        </g>
      ))}
      {/* the arrow showing the region continues forever that way */}
      <line x1={goesRight ? px(at) : px(at)} y1={55} x2={goesRight ? x1 - 4 : x0 + 4} y2={55}
            stroke={accent} strokeWidth="3" markerEnd="url(#nlArrow)" />
      <circle cx={px(at)} cy={55} r={6.5} fill={closed ? accent : '#10131d'} stroke={accent} strokeWidth="2.5" />
      <text x="160" y="24" textAnchor="middle" fill="#e7e9f0" fontSize="13" fontWeight="700"
            fontFamily="JetBrains Mono, monospace">{v.label || `x ${sym} ${at}`}</text>
      <text x="160" y="100" textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">
        {closed ? 'filled circle: ' + at + ' is included' : 'open circle: ' + at + ' is NOT included'}
      </text>
      <defs><marker id="nlArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 z" fill={accent} /></marker></defs>
    </>, 112);
  }

  /* A labelled grid. Serves truth tables and any "who does what to whom"
     matrix — the same shape answers both, so logic and civics share one
     renderer instead of two bespoke ones. Cells reading T or F get coloured;
     everything else renders as plain text. */
  if (v.kind === 'grid') {
    const cols = v.cols || [], rows = v.rows || [];
    const x0 = 12, wTotal = 296;
    const cw = wTotal / cols.length;
    const headH = 24, rowH = v.rowH || 24;
    const h = headH + rows.length * rowH + (v.caption ? 30 : 12);
    const cell = (t, cx, cy, isHead) => {
      const str = String(t);
      const tf = str === 'T' || str === 'F';
      return (
        <text x={cx} y={cy} textAnchor="middle"
              fill={isHead ? accent : tf ? (str === 'T' ? '#3ddc97' : '#ff6b6b') : '#e7e9f0'}
              fontSize={isHead ? 10 : str.length > 9 ? 8 : 11}
              fontWeight={isHead || tf ? 700 : 400}
              fontFamily="JetBrains Mono, monospace">{str}</text>
      );
    };
    return wrap(<>
      <rect x={x0} y={8} width={wTotal} height={headH} fill={accent + '1a'} rx={5} />
      {cols.map((c, i) => cell(c, x0 + cw * (i + .5), 24, true))}
      {rows.map((r, ri) => (
        <g key={ri}>
          {ri % 2 === 1 && <rect x={x0} y={8 + headH + ri * rowH} width={wTotal} height={rowH} fill="#ffffff06" />}
          {r.map((t, ci) => cell(t, x0 + cw * (ci + .5), 8 + headH + ri * rowH + rowH / 2 + 4, false))}
        </g>
      ))}
      {cols.map((_, i) => i > 0 && (
        <line key={'v' + i} x1={x0 + cw * i} y1={8} x2={x0 + cw * i} y2={8 + headH + rows.length * rowH}
              stroke="#1f2433" strokeWidth="1" />
      ))}
      <line x1={x0} y1={8 + headH} x2={x0 + wTotal} y2={8 + headH} stroke="#3a4154" strokeWidth="1.5" />
      {v.caption && (
        <text x="160" y={h - 10} textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">{v.caption}</text>
      )}
    </>, h);
  }

  /* Inputs on the left, outputs on the right, arrows between. The whole
     definition of a function is a rule about these arrows — one out of each
     input, never two — and that is a picture, not a sentence. `bad` draws the
     case that breaks the rule so the two can be compared directly. */
  if (v.kind === 'mapping') {
    const ins = v.inputs || [], outs = v.outputs || [], links = v.links || [];
    const top = 34, gap = v.gap || 26;
    const iy = (i) => top + i * gap, oy = (i) => top + i * gap;
    const h = top + Math.max(ins.length, outs.length) * gap + 34;
    const bad = !!v.bad;
    return wrap(<>
      <text x="70" y="20" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.inLabel || 'input'}</text>
      <text x="250" y="20" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.outLabel || 'output'}</text>
      <ellipse cx="70" cy={top + (ins.length - 1) * gap / 2} rx="46" ry={ins.length * gap / 2 + 10}
               fill="none" stroke="#2a2f3d" strokeWidth="1.3" />
      <ellipse cx="250" cy={top + (outs.length - 1) * gap / 2} rx="46" ry={outs.length * gap / 2 + 10}
               fill="none" stroke="#2a2f3d" strokeWidth="1.3" />
      {links.map(([a, b], i) => {
        const dup = links.filter((l) => l[0] === a).length > 1;
        const col = bad && dup ? '#ff6b6b' : accent;
        return <line key={i} x1={96} y1={iy(a)} x2={224} y2={oy(b)} stroke={col} strokeWidth="1.8"
                     markerEnd={bad && dup ? 'url(#mapBad)' : 'url(#mapOk)'} opacity={.95} />;
      })}
      {ins.map((t, i) => (
        <g key={'i' + i}>
          <circle cx="70" cy={iy(i)} r="4" fill={accent} />
          <text x="58" y={iy(i) + 4} textAnchor="end" fill="#e7e9f0" fontSize="11" fontFamily="JetBrains Mono, monospace">{t}</text>
        </g>
      ))}
      {outs.map((t, i) => (
        <g key={'o' + i}>
          <circle cx="250" cy={oy(i)} r="4" fill="#5aa9ff" />
          <text x="262" y={oy(i) + 4} fill="#e7e9f0" fontSize="11" fontFamily="JetBrains Mono, monospace">{t}</text>
        </g>
      ))}
      <text x="160" y={h - 12} textAnchor="middle" fill={bad ? '#ff6b6b' : '#8b91a3'} fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || (bad ? 'two arrows from one input — NOT a function' : 'exactly one arrow out of each input')}</text>
      <defs>
        <marker id="mapOk" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill={accent} /></marker>
        <marker id="mapBad" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#ff6b6b" /></marker>
      </defs>
    </>, h);
  }

  /* A quantity, then the same quantity after one or more percentage moves,
     drawn to scale. The trap in percent change is that the SECOND percentage
     is taken from a different number than the first, which is invisible in
     symbols and unmissable when the bars are different lengths. */
  if (v.kind === 'percentbar') {
    const steps = v.steps || [];
    let val = v.base ?? 100;
    const seq = [{ val, note: v.baseLabel || 'start' }];
    for (const st of steps) { val = val * (1 + st.pct / 100); seq.push({ val, note: st.label || `${st.pct > 0 ? '+' : ''}${st.pct}%`, from: seq[seq.length - 1].val, pct: st.pct }); }
    const maxV = Math.max(...seq.map((x) => x.val));
    const x0 = 14, wMax = 214, rowH = 34;
    const h = 16 + seq.length * rowH + 26;
    const money = (n) => (v.prefix || '$') + (Math.round(n * 100) / 100).toLocaleString();
    return wrap(<>
      {seq.map((st, i) => (
        <g key={i}>
          <rect x={x0} y={16 + i * rowH} width={Math.max(3, (st.val / maxV) * wMax)} height={20} rx={4}
                fill={i === 0 ? accent : accent} opacity={i === 0 ? .95 : .55 + .15 * i} />
          <text x={x0 + 6} y={16 + i * rowH + 14} fill="#0c0e16" fontSize="10" fontWeight="700"
                fontFamily="JetBrains Mono, monospace">{money(st.val)}</text>
          <text x={x0 + wMax + 12} y={16 + i * rowH + 14} fill="#8b91a3" fontSize="9.5"
                fontFamily="JetBrains Mono, monospace">{st.note}</text>
          {st.from !== undefined && (
            <text x={x0 + wMax + 12} y={16 + i * rowH + 25} fill="#5b6275" fontSize="8"
                  fontFamily="JetBrains Mono, monospace">of {money(st.from)}</text>
          )}
        </g>
      ))}
      <text x="160" y={h - 8} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || 'each % is taken from the bar above it'}</text>
    </>, h);
  }

  /* Atoms before and after. A physical change moves the same groupings
     around; a chemical change breaks them and builds different ones. Said in
     words those two sentences sound almost identical, which is exactly why
     the day scored badly. Drawn, they are obviously different pictures. */
  if (v.kind === 'rearrange') {
    const COL = { A: accent, B: '#5aa9ff', C: '#f6b73c' };
    /* A group is either a plain list of atoms or {a, dx, dy} so the physical
       case can actually MOVE things. Drawing before and after identically
       under the caption "same groupings, just moved" teaches the opposite of
       the intended lesson — the picture has to show the motion the words
       claim. */
    const norm = (g) => (Array.isArray(g) ? { a: g, dx: 0, dy: 0 } : { dx: 0, dy: 0, ...g });
    const mol = (g, cx, cy, k) => {
      const { a, dx, dy } = norm(g);
      return (
        <g key={k}>
          {a.map((at, i) => (
            <circle key={i} cx={cx + dx + (i - (a.length - 1) / 2) * 13} cy={cy + dy} r="6.5"
                    fill={COL[at] || accent} opacity={.92} stroke="#0c0e16" strokeWidth="1" />
          ))}
        </g>
      );
    };
    const before = v.before || [], after = v.after || [];
    const lay = (groups, y) => groups.map((g, i) => mol(g, 52 + i * 62, y, y + '-' + i));
    return wrap(<>
      <text x="16" y="22" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">BEFORE</text>
      {lay(before, 46)}
      <line x1="150" y1="70" x2="170" y2="70" stroke="#5b6275" strokeWidth="2" markerEnd="url(#reArrow)" />
      <text x="16" y="100" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">AFTER</text>
      {lay(after, 122)}
      <text x="160" y={152} textAnchor="middle" fill={v.chemical ? '#f6b73c' : '#3ddc97'} fontSize="10"
            fontWeight="700" fontFamily="JetBrains Mono, monospace">
        {v.caption || (v.chemical ? 'CHEMICAL — atoms regrouped' : 'PHYSICAL — same groups, moved')}
      </text>
      <text x="160" y={168} textAnchor="middle" fill="#8b91a3" fontSize="9.5"
            fontFamily="JetBrains Mono, monospace">{v.note || 'same atoms either way — count them'}</text>
      <defs><marker id="reArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5b6275" /></marker></defs>
    </>, 180);
  }

  /* Two curves on one pair of axes, plotted from real functions rather than
     drawn by hand. Built because the advanced maths days needed to SHOW an
     exponential overtaking a line, and the existing `graph` kind is a
     hardcoded straight line for day 6 — using it here would have drawn a
     straight line and labelled it exponential. */
  if (v.kind === 'curves') {
    const x0 = 44, x1 = 300, yBase = 128, yTop = 22;
    const xs = Array.from({ length: 60 }, (_, i) => (i / 59) * (v.xMax || 6));
    const fns = {
      linear: (x) => (v.m || 2) * x + (v.b || 1),
      exponential: (x) => (v.a || 1) * Math.pow(v.base || 2, x),
      decay: (x) => (v.a || 16) * Math.pow(0.5, x),
    };
    const series = (v.series || ['linear', 'exponential']).map((k) => ({ k, ys: xs.map(fns[k]) }));
    const yMax = v.yMax || Math.max(...series.flatMap((s) => s.ys).filter((y) => Number.isFinite(y)));
    const px = (x) => x0 + (x / (v.xMax || 6)) * (x1 - x0);
    const py = (y) => yBase - Math.min(1, y / yMax) * (yBase - yTop);
    const COL = { linear: '#5aa9ff', exponential: accent, decay: accent };
    const path = (ys) => ys.map((y, i) => `${i ? 'L' : 'M'}${px(xs[i]).toFixed(1)},${py(y).toFixed(1)}`).join(' ');
    return wrap(<>
      <line x1={x0} y1={yBase} x2={x1} y2={yBase} stroke="#3a4154" strokeWidth="2" />
      <line x1={x0} y1={yTop - 4} x2={x0} y2={yBase} stroke="#3a4154" strokeWidth="2" />
      {series.map((s, i) => (
        <path key={i} d={path(s.ys)} fill="none" stroke={COL[s.k]} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {/* Labels sit left: a growth curve leaves the upper left empty, and
          right-anchored labels clipped the viewBox edge. */}
      {series.map((s, i) => (
        <text key={'l' + i} x={x0 + 10} y={yTop + 2 + i * 14} textAnchor="start" fill={COL[s.k]}
              fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {s.k === 'linear' ? (v.linearLabel || 'y = 2x + 1') : s.k === 'decay' ? (v.decayLabel || 'halving') : (v.expLabel || 'y = 2ˣ')}
        </text>
      ))}
      <text x="172" y={yBase + 22} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || 'the curve starts lower and never gives the lead back'}</text>
    </>, 158);
  }

  /* ---- primitives added to close the prose-only gap ---------------------
     73 days still had no picture. These three unlock the clusters the
     existing set could not reach: layered objects, code, and spectrums. */

  /* A layered object, either stacked or concentric. Earth's interior, a
     pencil, a battery, a touchscreen — all of them are "what is inside what",
     which is a cross-section and not a sentence. */
  if (v.kind === 'layers') {
    const items = v.items || [];
    const concentric = v.shape === 'concentric';
    const h = concentric ? 190 : 34 + items.length * 30 + (v.caption ? 24 : 8);
    if (concentric) {
      const cx = 84, cy = 92, rMax = 66;
      return wrap(<>
        {items.map((it, i) => {
          const r = rMax * (1 - i / items.length);
          return <circle key={i} cx={cx} cy={cy} r={r} fill={it.color || '#2a2f3d'}
                         stroke="#0c0e16" strokeWidth="1.5" />;
        })}
        {items.map((it, i) => {
          const y = 34 + i * 26;
          return (
            <g key={'l' + i}>
              <rect x={168} y={y - 9} width={11} height={11} rx={2} fill={it.color || '#2a2f3d'} />
              <text x={185} y={y} fill="#e7e9f0" fontSize="11" fontFamily="JetBrains Mono, monospace">{it.name}</text>
              {it.note && <text x={185} y={y + 11} fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">{it.note}</text>}
            </g>
          );
        })}
        {v.caption && <text x="160" y={178} textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
      </>, h);
    }
    return wrap(<>
      {items.map((it, i) => {
        const y = 14 + i * 30;
        return (
          <g key={i}>
            <rect x={14} y={y} width={92} height={24} rx={5} fill={it.color || '#2a2f3d'} stroke="#0c0e16" strokeWidth="1.5" />
            <text x={116} y={y + 12} fill="#e7e9f0" fontSize="11.5" fontFamily="JetBrains Mono, monospace">{it.name}</text>
            {it.note && <text x={116} y={y + 23} fill="#8b91a3" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{it.note}</text>}
          </g>
        );
      })}
      {v.caption && <text x="160" y={h - 8} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
    </>, h);
  }

  /* Code with its parts named. A for loop has three jobs packed into one
     line, and pointing at them is worth more than describing them. */
  if (v.kind === 'codeshape') {
    const lines = v.lines || [];
    /* Tags sit on their own row UNDER the line they annotate. The first
       version right-anchored them on the same row, where a normal-length
       line of code ran straight into them — caught by looking at it, not by
       any assertion. */
    const rows = [];
    for (const l of lines) {
      const text = typeof l === 'string' ? l : l.t;
      const tag = typeof l === 'string' ? null : l.tag;
      rows.push({ text, tag: null });
      if (tag) rows.push({ text: null, tag });
    }
    const rowH = 19;
    const boxH = rows.length * rowH + 12;
    const h = 16 + boxH + (v.caption ? 22 : 6);
    return wrap(<>
      <rect x={10} y={8} width={300} height={boxH} rx={8} fill="#0c0e16" stroke="#1f2433" />
      {rows.map((r, i) => {
        const y = 26 + i * rowH;
        if (r.tag) {
          return (
            <text key={i} x={30} y={y} fill="#8b91a3" fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace">{'↳ ' + r.tag}</text>
          );
        }
        return (
          <text key={i} x={20} y={y} fill="#c9cee0" fontSize="11.5"
                fontFamily="JetBrains Mono, monospace" xmlSpace="preserve">{r.text}</text>
        );
      })}
      {v.caption && <text x="160" y={h - 7} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
    </>, h);
  }

  /* A line with named zones. Tone, formality, confidence — things that are
     not true or false but somewhere along a range. */
  if (v.kind === 'spectrum') {
    const zones = v.zones || [];
    const x0 = 20, x1 = 300, w = x1 - x0;
    const seg = w / Math.max(1, zones.length);
    return wrap(<>
      {zones.map((z, i) => (
        <rect key={i} x={x0 + i * seg} y={40} width={seg - 2} height={22} rx={4}
              fill={accent} opacity={0.5 + (i / Math.max(1, zones.length - 1)) * 0.5} />
      ))}
      {zones.map((z, i) => (
        <text key={'t' + i} x={x0 + i * seg + seg / 2} y={55} textAnchor="middle" fill="#0c0e16"
              fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{z.label}</text>
      ))}
      {zones.map((z, i) => z.note ? (
        <text key={'n' + i} x={x0 + i * seg + seg / 2} y={78} textAnchor="middle" fill="#8b91a3"
              fontSize="9" fontFamily="JetBrains Mono, monospace">{z.note}</text>
      ) : null)}
      <text x={x0} y={30} fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.left || ''}</text>
      <text x={x1} y={30} textAnchor="end" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.right || ''}</text>
      {v.caption && <text x="160" y={100} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
    </>, 112);
  }

  return null;
}