import type { ReactNode } from 'react';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { FREE_ROADMAP } from '../config/marketing';
import { COURSES, GROUP_PILLS } from '../data/courses';
import { FAQ } from '../data/content';
import { courseById } from '../data/recommend';
import { CourseIcon } from '../components/CourseIcon';
import Faq from '../components/Faq';
import LeadForm from '../components/LeadForm';
import { BlobImg, CourseVideo } from '../components/Media';
import { CountUp } from '../components/Motion';
import { LogoFull } from '../components/Logo';
import { usePreview } from '../components/Preview';
import { ComboPacks, ComparisonTable, CourseFaq, HowItWorks, NumberedGrid, Perks, Plans, Testimonials } from '../components/Showcase';
import { FlipWords, GradientText, GridBackdrop, InfiniteRow, Lamp, Meteors, MovingBorderButton, Sparkles, Spotlight, Steps, TextGenerate, TiltCard } from '../components/fx';
import { totalLessons } from '../components/types';
import { courseListLd, faqLd, usePageMeta } from '../utils/seo';
import { BENTO, HERO_WORDS, heroStats, homeLinks, JOURNEY, ORBIT, proofStats, useChallenge, useCourseShowcase } from './types';
import { landingStyles as S } from './styles';

function Section({ id, kick, title, hl, sub, children }: { id?: string; kick: string; title: string; hl: string; sub?: string; children: ReactNode }) {
  return (
    <Box id={id} component="section" sx={S.section}>
      <Container maxWidth="lg">
        <Box sx={S.sectionHead}>
          <Chip label={kick} size="small" variant="outlined" sx={S.kick} />
          <Typography variant="h2" sx={S.sectionTitle}>
            {title} <GradientText>{hl}</GradientText>
          </Typography>
          {sub && (
            <Typography color="text.secondary" sx={S.sectionSub}>
              {sub}
            </Typography>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}

function Hero() {
  const links = homeLinks();
  return (
    <Box component="section" sx={S.hero}>
      <GridBackdrop />
      <Spotlight sx={S.spotlight} />
      <Meteors n={12} />
      <Container maxWidth="lg" sx={S.heroInner}>
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Chip icon={<SchoolIcon />} label={`${COURSES.length} courses · ${GROUP_PILLS.length} tracks · ${totalLessons()}+ lessons`} variant="outlined" sx={S.heroChip} />
            <Typography variant="h1" sx={S.heroTitle}>
              <TextGenerate text="Master the AI frameworks." hl={['AI']} />
              <br />
              <TextGenerate text="Own the AI future." delay={320} sx={S.heroHl} />
            </Typography>
            <Typography color="text.secondary" sx={S.heroSub}>
              Learn <FlipWords words={HERO_WORDS} sx={S.flip} /> step by step, with summary videos, hands-on projects, grades and a certificate.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={S.heroCtas}>
              <MovingBorderButton filled href={links.register}>
                Start learning free <ArrowForwardIcon fontSize="small" />
              </MovingBorderButton>
              <MovingBorderButton to="/ai-course-finder">
                <QuizIcon fontSize="small" /> Find my AI course
              </MovingBorderButton>
            </Stack>
            <Stack direction="row" spacing={{ xs: 3, md: 5 }} sx={S.heroStats}>
              {heroStats().map(([v, pre, suf, l]) => (
                <Box key={l}>
                  <Typography sx={S.heroStat}>
                    <CountUp value={v} prefix={pre} suffix={suf} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {l}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={S.orbitBox}>
              <Box sx={S.orbitGlow} />
              <Box sx={S.ringOuter} />
              <Box sx={S.ringInner} />
              <Sparkles n={18} />
              <Box sx={S.logoFloat}>
                <LogoFull width={190} />
              </Box>
              <Box sx={S.orbit}>
                {ORBIT.map((id, i) => {
                  const c = courseById(id);
                  return c ? (
                    <Box key={id} sx={S.orbitIcon(i, ORBIT.length)}>
                      <CourseIcon c={c} size={44} />
                    </Box>
                  ) : null;
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function BannerRows() {
  const preview = usePreview();
  const half = Math.ceil(COURSES.length / 2);
  const row = (list: typeof COURSES) =>
    list.map((c) => (
      <Box key={c.id} onClick={() => preview(c.id)} sx={S.banner} role="button" aria-label={'Preview ' + c.title}>
        <BlobImg src={c.img} alt={c.title} ratio="375 / 110" />
      </Box>
    ));
  return (
    <Box sx={S.banners}>
      <InfiniteRow seconds={70}>{row(COURSES.slice(0, half))}</InfiniteRow>
      <InfiniteRow seconds={80} reverse>
        {row(COURSES.slice(half))}
      </InfiniteRow>
    </Box>
  );
}

function ProofStats() {
  return (
    <Box sx={S.proof} data-testid="proof-stats">
      {proofStats().map(([v, pre, suf, l]) => (
        <Box key={l} sx={S.proofCell}>
          <Typography sx={S.proofNum}>
            <CountUp value={v} prefix={pre} suffix={suf} />
          </Typography>
          <Typography color="text.secondary" sx={S.proofLabel}>
            {l}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function Bento() {
  return (
    <Box sx={S.bento}>
      {BENTO.map((b) => (
        <Box key={b.title} sx={S.bentoCell(b.span)}>
          <TiltCard sx={S.bentoCard}>
            <Box sx={S.bentoIcon(b.color)}>
              <b.icon />
            </Box>
            <Typography variant="h6" component="h3" sx={S.bentoTitle}>
              {b.title}
            </Typography>
            <Typography color="text.secondary" sx={S.bentoText}>
              {b.text}
            </Typography>
          </TiltCard>
        </Box>
      ))}
    </Box>
  );
}

function CourseShowcase() {
  const { cat, setCat, list, shown, open } = useCourseShowcase();
  return (
    <>
      <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center" sx={S.pills}>
        <Chip label={'All (' + COURSES.length + ')'} clickable color={cat === 'all' ? 'primary' : 'default'} variant={cat === 'all' ? 'filled' : 'outlined'} onClick={() => setCat('all')} />
        {GROUP_PILLS.map(([id, label]) => (
          <Chip key={id} label={label} clickable color={cat === id ? 'primary' : 'default'} variant={cat === id ? 'filled' : 'outlined'} onClick={() => setCat(id)} />
        ))}
      </Stack>
      <Box key={cat}>
        <NumberedGrid courses={shown} action={open} />
      </Box>
      <Box sx={S.more}>
        <Button variant="outlined" size="large" component={RouterLink} to={cat === 'all' ? '/courses' : '/courses?cat=' + cat} endIcon={<ArrowForwardIcon />}>
          {list.length > shown.length ? `See all ${list.length} courses` : 'Search and filter courses'}
        </Button>
      </Box>
    </>
  );
}

function Challenge() {
  const { c, off, href } = useChallenge();
  return (
    <Stack spacing={{ xs: 5, md: 7 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Chip label="Most joined challenge" size="small" color="secondary" variant="outlined" sx={S.challengeChip} />
          <Typography variant="h3" sx={S.challengeTitle}>
            28 days challenge to become <GradientText>AI-ready</GradientText>
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="baseline" sx={S.priceRow}>
            {c.was && (
              <Typography color="text.secondary" sx={S.strike}>
                ₹{c.was}
              </Typography>
            )}
            <Typography sx={S.price}>₹{c.price}</Typography>
            {off > 0 && <Chip size="small" color="success" label={off + '% OFF'} />}
          </Stack>
          <Typography color="text.secondary" sx={S.challengeDesc}>
            {c.desc}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component="a" href={href} rel="noopener">
              Join the 28 days challenge
            </Button>
            <Button variant="outlined" size="large" component={RouterLink} to={'/course/' + c.id}>
              See the curriculum
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <CourseVideo src={c.video} poster={c.img} title={c.title} />
        </Grid>
      </Grid>
      <HowItWorks c={c} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={S.subTitle}>
            Everything you get <GradientText>inside</GradientText>
          </Typography>
          <Perks />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={S.subTitle}>
            Questions, <GradientText>answered</GradientText>
          </Typography>
          <CourseFaq />
        </Grid>
      </Grid>
    </Stack>
  );
}

function Roadmap() {
  return (
    <Box sx={S.roadmap} id="roadmap">
      <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <Chip label="FREE DOWNLOAD" size="small" color="secondary" sx={S.challengeChip} />
          <Typography variant="h3" sx={S.challengeTitle}>
            {FREE_ROADMAP.title}
          </Typography>
          <Typography color="text.secondary">{FREE_ROADMAP.sub}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <LeadForm
            source="roadmap"
            fields={['name', 'email', 'phone']}
            required={['name', 'email']}
            cta="Send me the free roadmap"
            done="Done! We will email your free AI roadmap shortly."
            testId="roadmap-form"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const journeyItems = JOURNEY.map(({ title, body, Icon }) => ({ title, body, icon: <Icon fontSize="small" /> }));

export default function Home() {
  const links = homeLinks();
  usePageMeta({
    title: 'Takxila AI Academy · Practical AI courses, challenges and certificates',
    description: `${COURSES.length} hands-on AI courses: AI agents, Claude AI, ChatGPT, Midjourney, AI filmmaking and AI for careers. Summary videos, projects and a verifiable certificate. Start free.`,
    path: '/',
    jsonLd: [courseListLd(COURSES.filter((c) => c.featured)), faqLd(FAQ)],
  });
  return (
    <Box sx={S.page}>
      <Hero />
      <BannerRows />
      <Container maxWidth="lg">
        <ProofStats />
      </Container>

      <Section id="highlights" kick="WHY TAKXILA" title="Your learning," hl="all in one place" sub="A personal dashboard on the academy with your courses, streak, grades, certificates and leaderboard rank.">
        <Bento />
      </Section>

      <Section id="courses" kick="ALL COURSES" title="Pick your next" hl="AI skill" sub="Tap any course to watch its summary video and see the full curriculum.">
        <CourseShowcase />
      </Section>

      <Section id="challenges" kick="CHALLENGES" title="Learn daily." hl="Finish strong.">
        <Challenge />
      </Section>

      <Section id="testimonials" kick="LEARNER STORIES" title="Learners who" hl="got AI-ready">
        <Testimonials />
      </Section>

      <Section id="packs" kick="COMBO PACKS" title="Career-focused" hl="combo packs" sub="Bundles built around a role. The discount is applied in your academy cart automatically.">
        <ComboPacks />
        <Typography variant="h4" sx={S.plansTitle}>
          Choose your perfect <GradientText>plan</GradientText>
        </Typography>
        <Plans />
      </Section>

      <Section id="compare" kick="COMPARE" title="Why learners" hl="trust Takxila">
        <ComparisonTable />
      </Section>

      <Section id="journey" kick="HOW IT WORKS" title="From curious to" hl="certified">
        <Steps items={journeyItems} />
      </Section>

      <Container maxWidth="lg">
        <Roadmap />
      </Container>

      <Section id="faq" kick="FAQ" title="Questions," hl="answered">
        <Box sx={S.faqWrap}>
          <Faq />
        </Box>
      </Section>

      <Lamp>
        <Container maxWidth="md" sx={S.rel}>
          <Sparkles n={30} />
          <Typography variant="h2" sx={S.closingTitle}>
            Start learning AI <GradientText>today.</GradientText>
          </Typography>
          <Typography color="text.secondary" sx={S.closingText}>
            Your first AI agent course is free. It takes 30 minutes.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={S.rel}>
            <MovingBorderButton filled href={links.free}>
              Start the free course <ArrowForwardIcon fontSize="small" />
            </MovingBorderButton>
            <MovingBorderButton href={links.closing}>
              <PlayCircleIcon fontSize="small" /> Create my free account
            </MovingBorderButton>
          </Stack>
        </Container>
      </Lamp>
    </Box>
  );
}
