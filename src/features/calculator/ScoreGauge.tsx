import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BANDS, useAnimatedNumber, type CalcScore, type ScoreFactor } from './types';
import * as S from './styles';

export const ScoreGauge = memo(function ScoreGauge({ result, size = 168 }: { result: CalcScore; size?: number }) {
  const shown = useAnimatedNumber(result.score);
  const stroke = Math.round(size * 0.075);
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  const color = result.band.color;
  // Band arcs on the track: band i covers scores [min, next.min - 1] of 10.
  const arcs = BANDS.map((b, i) => {
    const end = (BANDS[i + 1]?.min ?? 11) - 1;
    const from = (b.min - 1) / 10;
    const to = end / 10;
    return { color: b.color, len: c * (to - from) - 3, offset: -c * from };
  });
  return (
    <Box sx={S.gauge(size)} role="img" aria-label={`Your AI score is ${result.score} out of 10: ${result.band.label}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${mid} ${mid})`}>
          {arcs.map((a) => (
            <circle key={a.color} cx={mid} cy={mid} r={r} fill="none" stroke={a.color} strokeOpacity=".18" strokeWidth={stroke} strokeDasharray={`${a.len} ${c}`} strokeDashoffset={a.offset} />
          ))}
          <circle
            cx={mid} cy={mid} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - shown / 10)} style={{ transition: 'stroke .4s' }}
          />
        </g>
      </svg>
      <Box sx={S.gaugeCenter}>
        <Box>
          <Typography sx={S.gaugeNum(color, size)} data-testid="calc-score">
            {Math.round(shown)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={S.gaugeOf}>
            out of 10
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export const BandLegend = memo(function BandLegend() {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.25} sx={S.legend}>
      {BANDS.map((b, i) => (
        <Stack key={b.label} direction="row" spacing={0.6} alignItems="center">
          <Box sx={S.legendDot(b.color)} />
          <Typography sx={S.legendText}>
            {b.min}–{(BANDS[i + 1]?.min ?? 11) - 1} {b.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
});

export const ScoreFactors = memo(function ScoreFactors({ factors, color }: { factors: ScoreFactor[]; color: string }) {
  return (
    <Stack spacing={1}>
      {factors.map((f) => (
        <Box key={f.id} sx={S.factorRow}>
          <Stack direction="row" alignItems="baseline" spacing={1} sx={S.factorHead}>
            <Typography sx={S.factorLabel}>{f.label}</Typography>
            <Typography sx={S.factorPts}>{f.max ? `+${f.points} of ${f.max}` : f.points < 0 ? `${f.points}` : '±0'}</Typography>
          </Stack>
          {f.max > 0 && (
            <Box sx={S.factorBar}>
              <Box sx={S.factorFill((f.points / f.max) * 100, color)} />
            </Box>
          )}
          {f.answer && <Typography sx={S.factorAnswer}>{f.answer}</Typography>}
          <Typography sx={S.factorReason}>{f.reason}</Typography>
        </Box>
      ))}
      <Typography sx={S.formula}>Score = 1 + the points above, rounded and kept between 1 and 10. Your budget never changes it.</Typography>
    </Stack>
  );
});
