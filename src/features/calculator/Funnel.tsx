import { Box, Button, ButtonBase, CircularProgress, IconButton, LinearProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import PendingIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import LockOpenIcon from '@mui/icons-material/LockOpenRounded';
import LeadForm from '../../components/LeadForm';
import type { Question } from '../../types';
import { ANALYSE_STEPS, INFO_HUES, lookOf, type CalcFunnel, type Insight } from './types';
import * as S from './styles';

export function FunnelTop({ f }: { f: CalcFunnel }) {
  return (
    <>
      <Box sx={S.topBar}>
        <IconButton onClick={f.back} disabled={!f.canBack} aria-label="Previous question" sx={S.backBtn(f.canBack)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={S.stepCount} aria-live="polite">
          {f.qNum}{' '}
          <Box component="span" sx={S.stepOf}>
            / {f.total}
          </Box>
        </Typography>
        <span />
      </Box>
      <LinearProgress variant="determinate" value={f.progress} sx={S.bar} aria-label={`Question ${f.qNum} of ${f.total}`} />
    </>
  );
}

export function QuestionScreen({ f, q }: { f: CalcFunnel; q: Question }) {
  const grid = q.opts.length > 6;
  const multi = !!q.multi;
  return (
    <Box sx={S.screenIn}>
      <Typography component="h1" ref={f.headRef} tabIndex={-1} sx={S.qTitle}>
        {q.q}
      </Typography>
      <Typography sx={S.qSub}>{q.sub}</Typography>
      <Box sx={grid ? S.optGrid : S.optList} role="group" aria-label={q.q}>
        {q.opts.map(([v, label], i) => {
          const on = f.isOn(v);
          const { icon: Icon, color } = lookOf(q.id, v, i);
          return (
            <ButtonBase key={v} focusRipple aria-pressed={on} onClick={() => f.pick(v)} sx={grid ? S.optTile(on) : S.optRow(on)} data-testid={`opt-${q.id}-${v}`}>
              <Box sx={S.iconTile(color, grid)} aria-hidden>
                <Icon />
              </Box>
              <Typography component="span" sx={grid ? S.tileLabel : S.optLabel}>
                {label}
              </Typography>
              <Box sx={S.mark(on, multi, grid)} aria-hidden>
                {on && <CheckIcon />}
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
      {multi && (
        <Box sx={S.continueBar}>
          <Button fullWidth size="large" variant="contained" disabled={!f.canContinue} onClick={f.cont} sx={S.continueBtn} data-testid="calc-continue">
            Continue
          </Button>
        </Box>
      )}
    </Box>
  );
}

export function InfoScreen({ f, info }: { f: CalcFunnel; info: Insight }) {
  const [Main, ...rest] = info.icons;
  return (
    <Box sx={S.info}>
      <Box sx={S.infoArt} aria-hidden>
        <Box sx={S.infoHalo}>
          <Main />
        </Box>
        {rest.map((Icon, i) => (
          <Box key={i} sx={S.infoBubble(i, INFO_HUES[i])}>
            <Icon />
          </Box>
        ))}
      </Box>
      <Typography variant="overline" sx={S.infoKick}>
        {info.kick}
      </Typography>
      <Typography component="h1" ref={f.headRef} tabIndex={-1} sx={S.infoTitle}>
        {info.title}
      </Typography>
      <Typography sx={S.infoText}>{info.text}</Typography>
      <Box sx={S.infoCta}>
        <Button fullWidth size="large" variant="contained" onClick={f.cont} sx={S.continueBtn} data-testid="calc-continue">
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export function Analysing({ f }: { f: CalcFunnel }) {
  return (
    <Box sx={S.analyse} role="status" aria-live="polite">
      <Box sx={S.ring}>
        <CircularProgress variant="determinate" value={100} size={132} thickness={3.2} sx={S.ringTrack} />
        <CircularProgress variant="determinate" value={f.pct} size={132} thickness={3.2} sx={S.ringFill} />
        <Typography sx={S.ringNum}>{Math.round(f.pct)}%</Typography>
      </Box>
      <Typography component="h1" ref={f.headRef} tabIndex={-1} sx={S.qTitle}>
        Analysing your answers…
      </Typography>
      <Typography sx={S.qSub}>Picking the right level and courses for you.</Typography>
      <Box sx={S.checklist}>
        {ANALYSE_STEPS.map((t, i) => {
          const done = i < f.doneSteps;
          return (
            <Box key={t} sx={S.checkRow(done || i === f.doneSteps)}>
              {done ? <CheckCircleIcon sx={S.checkIcon(true)} /> : <PendingIcon sx={S.checkIcon(false)} />}
              <Typography sx={S.checkText}>{t}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function LeadGate({ f }: { f: CalcFunnel }) {
  return (
    <Box sx={S.gate} data-testid="quiz-lead">
      <Box sx={S.gateBadge} aria-hidden>
        <LockOpenIcon />
      </Box>
      <Typography variant="overline" sx={S.infoKick}>
        YOUR RESULT IS READY
      </Typography>
      <Typography component="h1" ref={f.headRef} tabIndex={-1} sx={S.qTitle}>
        Where should we send your AI plan?
      </Typography>
      <Typography sx={S.qSub}>Get your AI score, matched courses and a copy of your plan by email. A mentor can also help you on WhatsApp.</Typography>
      <LeadForm
        source="quiz"
        fields={['name', 'email', 'phone']}
        required={['name', 'email', 'phone']}
        cta="Show my result"
        done="Thanks! Your AI plan is on its way to your inbox."
        extra={f.leadExtra}
        onSent={() => f.showResult(true)}
        testId="quiz-lead-form"
      />
      <Button size="small" color="inherit" onClick={() => f.showResult(false)} sx={S.skip} data-testid="quiz-skip">
        Skip and see my result
      </Button>
    </Box>
  );
}
