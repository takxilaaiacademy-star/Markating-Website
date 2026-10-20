import { Box, Button, Card, Grid, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import { Heading, Page } from '../components/Section';
import { ABOUT_SIGNOFF, ABOUT_STORY, ABOUT_TAGLINE } from '../data/about';
import { allCoursesUrl } from '../utils/links';
import { usePageMeta } from '../utils/seo';
import { ABOUT_PILLARS, CONTACT_INFO, POLICIES } from './types';
import { infoStyles as S } from './styles';

function AboutStory() {
  return (
    <Card sx={S.story}>
      <Box sx={S.storyHero}>
        <Typography variant="overline" sx={S.storyKick}>
          OUR STORY
        </Typography>
        <Typography component="h2" sx={S.storyTitle}>
          About TAKXILA
        </Typography>
        <Typography sx={S.storyTagline}>{ABOUT_TAGLINE}</Typography>
      </Box>
      <Box sx={S.storyBody}>
        {ABOUT_STORY.map((blk, i) => (
          <Box key={i} sx={S.storyBlock}>
            {blk.heading && (
              <Typography component="h3" sx={S.storyHeading(i === 0)}>
                {blk.heading}
              </Typography>
            )}
            {blk.paras.map((para, j) => (
              <Typography key={j} color="text.secondary" sx={S.storyPara}>
                {para}
              </Typography>
            ))}
            {blk.quote && (
              <Box sx={S.quote}>
                <Typography sx={S.quoteText}>{blk.quote}</Typography>
              </Box>
            )}
          </Box>
        ))}
        <Box sx={S.signoff}>
          <Typography sx={S.signoffBrand}>{ABOUT_SIGNOFF.brand}</Typography>
          <Typography sx={S.signoffLine}>{ABOUT_SIGNOFF.line}</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export function About() {
  usePageMeta({
    title: 'About us',
    description: 'Takxila AI Academy teaches practical AI: agents, automation and everyday AI skills, for working professionals, business owners and kids aged 8 to 12.',
    path: '/about',
  });
  return (
    <Page>
      <Heading
        kick="ABOUT US"
        title="The AI skills academy for"
        hl="real people."
        sub="Takxila AI Academy teaches practical AI: agents, automation and everyday AI skills, for working professionals, business owners and kids aged 8 to 12."
        h1
      />
      <AboutStory />
      <Grid container spacing={2.5} sx={S.pillars}>
        {ABOUT_PILLARS.map(([Icon, t, d]) => (
          <Grid item xs={12} md={4} key={t}>
            <Card sx={S.pillar}>
              <Icon color="secondary" sx={S.pillarIcon} />
              <Typography variant="h6" component="h3">
                {t}
              </Typography>
              <Typography color="text.secondary">{d}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button variant="contained" size="large" component={RouterLink} to="/courses">
          See the courses
        </Button>
        <Button variant="outlined" size="large" component="a" href={allCoursesUrl()} rel="noopener">
          Open the academy
        </Button>
      </Stack>
    </Page>
  );
}

export function Contact() {
  usePageMeta({
    title: 'Contact us',
    description: 'Questions about a course, a payment or which AI course to pick? Write to Takxila AI Academy by email, phone or WhatsApp.',
    path: '/contact',
  });
  return (
    <Page>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Heading kick="CONTACT US" title="Let's" hl="talk." sub="Questions about a course, a payment or which course to pick? Write to us and we will reply within one working day." h1 />
          <Stack spacing={2}>
            {CONTACT_INFO.map(([Icon, t, href]) => (
              <Stack direction="row" spacing={1.5} alignItems="center" key={t}>
                <Icon color="secondary" />
                <Link href={href} target={href.startsWith('https') ? '_blank' : undefined} rel="noopener noreferrer" color="inherit" sx={S.contactLink}>
                  {t}
                </Link>
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={S.form}>
            <LeadForm
              source="contact"
              fields={['name', 'email', 'phone', 'message']}
              required={['name', 'email', 'message']}
              cta="Send message"
              done="Message sent. We will reply to you by email soon."
              testId="contact-form"
            />
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}

export function Policies() {
  usePageMeta({ title: 'Policies', description: 'Privacy policy, terms of use and refund policy of the Takxila AI Academy website.', path: '/policies' });
  return (
    <Page maxWidth="md">
      <Heading kick="POLICIES" title="The" hl="fine print" h1 />
      <Stack spacing={2.5}>
        {POLICIES.map(([id, t, paras]) => (
          <Card key={id} id={id} sx={S.policy}>
            <Typography variant="h5" component="h2" sx={S.policyTitle}>
              {t}
            </Typography>
            {paras.map((p) => (
              <Typography key={p} color="text.secondary" sx={S.policyPara}>
                {p}
              </Typography>
            ))}
          </Card>
        ))}
      </Stack>
    </Page>
  );
}

export function NotFound() {
  usePageMeta({ title: 'Page not found', description: 'This page does not exist. Browse the Takxila AI Academy courses instead.', path: '/404' });
  return (
    <Page maxWidth="sm">
      <Box sx={S.notFound}>
        <Typography variant="h1" sx={S.notFoundCode}>
          404
        </Typography>
        <Typography color="text.secondary" sx={S.notFoundText}>
          This page does not exist.
        </Typography>
        <Stack direction="row" spacing={1.5} justifyContent="center">
          <Button variant="contained" component={RouterLink} to="/">
            Go home
          </Button>
          <Button variant="outlined" component={RouterLink} to="/courses">
            Browse courses
          </Button>
        </Stack>
      </Box>
    </Page>
  );
}
