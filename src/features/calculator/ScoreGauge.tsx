import { memo } from 'react';
import { BANDS, useAnimatedNumber, type CalcScore, type ScoreFactor } from './types';

export const ScoreGauge = memo(function ScoreGauge({ result, size = 176 }: { result: CalcScore; size?: number }) {
  const shown = useAnimatedNumber(result.score);
  const stroke = Math.round(size * 0.075);
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  const color = result.band.color;
  const arcs = BANDS.map((b, i) => {
    const end = (BANDS[i + 1]?.min ?? 11) - 1;
    const from = (b.min - 1) / 10;
    return { color: b.color, len: c * (end / 10 - from) - 3, offset: -c * from };
  });
  return (
    <div className="gauge" style={{ width: size, height: size }} role="img" aria-label={`Your AI score is ${result.score} out of 10: ${result.band.label}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${mid} ${mid})`}>
          {arcs.map((a) => (
            <circle key={a.color} cx={mid} cy={mid} r={r} fill="none" stroke={a.color} strokeOpacity=".2" strokeWidth={stroke} strokeDasharray={`${a.len} ${c}`} strokeDashoffset={a.offset} />
          ))}
          <circle cx={mid} cy={mid} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - shown / 10)} />
        </g>
      </svg>
      <div className="gauge-c">
        <b style={{ color }} data-testid="calc-score">
          {Math.round(shown)}
        </b>
        <small>out of 10</small>
      </div>
    </div>
  );
});

export function BandLegend() {
  return (
    <ul className="legend">
      {BANDS.map((b, i) => (
        <li key={b.label}>
          <i style={{ background: b.color }} />
          {b.min}–{(BANDS[i + 1]?.min ?? 11) - 1} {b.label}
        </li>
      ))}
    </ul>
  );
}

export function ScoreFactors({ factors, color }: { factors: ScoreFactor[]; color: string }) {
  return (
    <div className="factors">
      {factors.map((f) => (
        <div key={f.id} className="factor">
          <div className="factor-head">
            <b>{f.label}</b>
            <span>{f.max ? `+${f.points} of ${f.max}` : f.points < 0 ? `${f.points}` : '±0'}</span>
          </div>
          {f.max > 0 && (
            <div className="factor-bar">
              <i style={{ width: (f.points / f.max) * 100 + '%', background: color }} />
            </div>
          )}
          {f.answer && <p className="factor-ans">{f.answer}</p>}
          <p className="muted">{f.reason}</p>
        </div>
      ))}
      <p className="factor-formula">Score = 1 + the points above, rounded and kept between 1 and 10. Your budget never changes it.</p>
    </div>
  );
}
