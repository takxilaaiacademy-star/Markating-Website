import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/ReplayRounded';
import { PlanStats, RecGrid } from '../components/Recommendations';
import { Page } from '../components/Section';
import { Analysing, FunnelTop, InfoScreen, LeadGate, QuestionScreen } from '../features/calculator/Funnel';
import { BandLegend, ScoreFactors, ScoreGauge } from '../features/calculator/ScoreGauge';
import { useCalcFunnel } from '../features/calculator/types';
import { registerUrl } from '../utils/links';
import { usePageMeta } from '../utils/seo';
import * as S from '../features/calculator/styles';

export default function Quiz() {
  const f = useCalcFunnel();
  usePageMeta({
    title: 'Free AI course finder · get your AI score',
    description: 'Answer 11 quick questions and get your AI score out of 10, the courses that fit your goal, time and budget, and a full learning plan. Free, 2 minutes.',
    path: '/ai-course-finder',
  });
  const { result } = f;

  if (f.phase !== 'result' || !result) {
    return (
      <Page maxWidth="md" py={{ xs: 2, md: 5 }}>
        <Box sx={S.funnel}>
          {f.phase === 'analysing' ? (
            <Analysing f={f} />
          ) : f.phase === 'lead' ? (
            <LeadGate f={f} />
          ) : (
            <>
              <FunnelTop f={f} />
              {f.screen.kind === 'q' ? <QuestionScreen key={f.idx} f={f} q={f.screen.q} /> : <InfoScreen key={f.idx} f={f} info={f.screen.info} />}
            </>
          )}
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <Box sx={S.resultHead} data-testid="quiz-result">
        <Typography variant="overline" sx={S.resultKick}>
          YOUR AI SCORE IS READY
        </Typography>
        <Typography component="h1" ref={f.headRef} tabIndex={-1} sx={S.resultHeadline}>
          Your plan to{' '}
          <Box component="span" sx={S.accent}>
            {f.goalLine}
          </Box>
        </Typography>
        <Typography sx={S.resultLead}>
          You scored {result.score} out of 10, which makes you a {result.band.label.toLowerCase()}. {result.band.blurb}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={S.resultBtns}>
          <Button variant="contained" component="a" href={registerUrl('quiz_result')} rel="noopener">
            Create my free account
          </Button>
          <Button variant="outlined" startIcon={<ReplayIcon />} onClick={f.retake} data-testid="calc-retake">
            Retake the quiz
          </Button>
        </Stack>
      </Box>

      <Box sx={S.scoreCard} data-testid="calc-score-card">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} sx={S.gaugeCol}>
            <ScoreGauge result={result} />
            <Typography sx={S.bandLabel(result.band.color)}>{result.band.label}</Typography>
            <BandLegend />
          </Grid>
          <Grid item xs={12} md={7}>
            <Accordion disableGutters sx={S.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={S.subHead}>How we worked out your score</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ScoreFactors factors={result.factors} color={result.band.color} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>

      <Box sx={S.block}>
        <Box sx={S.sectionHead}>
          <Typography variant="h5" component="h2" sx={S.sectionTitle}>
            Courses for your score
          </Typography>
          <Typography color="text.secondary">Made for learners at score {result.score}, best topic match first.</Typography>
        </Box>
        <RecGrid recs={f.scoreRecs} />
      </Box>

      <Box sx={S.sectionHead}>
        <Typography variant="h5" component="h2" sx={S.sectionTitle}>
          Your learning plan
        </Typography>
        <Typography color="text.secondary">Matched to your topics, goal, pace and budget.</Typography>
      </Box>
      <PlanStats recs={f.recs} />
      <RecGrid recs={f.recs} />
    </Page>
  );
}
