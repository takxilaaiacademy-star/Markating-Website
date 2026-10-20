import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Chip, Container, Grid, Link, Skeleton, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/LockOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideoOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import UpdateIcon from '@mui/icons-material/Update';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link as RouterLink } from 'react-router-dom';
import { Price } from '../components/CourseCard';
import { BlobImg, CourseVideo } from '../components/Media';
import { usePreview } from '../components/Preview';
import { ComparisonTable, CourseFaq } from '../components/Showcase';
import CoursePromo from '../components/CoursePromo';
import type { CourseContent } from '../data/courseContent';
import { priceText } from '../data/recommend';
import { ALL_ACCESS_PRICE, COURSE_FAQ, PAID } from '../data/showcase';
import type { Course as CourseT } from '../types';
import { courseLd, faqLd, usePageMeta } from '../utils/seo';
import { NotFound } from './Info';
import { COURSE_CONFIG, fmtClock, fmtLen, relatedTopics, useCourseDetail, useCurriculum, useDescription } from './types';
import { courseDetailStyles as S } from './styles';

function CourseMeta({ c }: { c: CourseT }) {
  usePageMeta({
    title: c.title + ' · online AI course',
    description: `${c.short} ${c.desc}`.slice(0, 300),
    path: '/course/' + c.id,
    image: c.img,
    type: 'article',
    jsonLd: [courseLd(c), faqLd(COURSE_FAQ)],
  });
  return null;
}

export default function Course() {
  const d = useCourseDetail();
  const { c, content } = d;
  if (!c) return <NotFound />;
  const showAllAccess = c.price > 0;

  return (
    <Box>
      <CourseMeta c={c} />
      <Box sx={S.hero}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Button onClick={d.back} startIcon={<ArrowBackRoundedIcon />} sx={S.back}>
                All courses
              </Button>
              <Typography variant="h3" component="h1" sx={S.title}>
                {c.title}
              </Typography>
              <Typography sx={S.subtitle}>{content ? content.subtitle : c.short}</Typography>
              <Stack direction="row" gap={1} flexWrap="wrap" sx={S.chips}>
                {c.featured && <Chip size="small" label="Featured" sx={S.featured} />}
                {c.price === 0 && <Chip size="small" label="Free course" sx={S.free} />}
                <Chip size="small" label={c.kicker} sx={S.kicker} />
              </Stack>
              <Typography sx={S.createdBy}>
                Created by{' '}
                <Link component={RouterLink} to="/about" sx={S.createdLink}>
                  Takxila AI Academy
                </Link>
              </Typography>
              {c.idNumber && (
                <Typography variant="caption" sx={S.courseId}>
                  Course ID: {c.idNumber}
                </Typography>
              )}
              <Stack direction="row" gap={2.5} flexWrap="wrap" sx={S.meta}>
                <span>
                  <UpdateIcon /> Last updated {COURSE_CONFIG.lastUpdated}
                </span>
                <span>
                  <LanguageIcon /> {content?.language ?? (c.id === 'junior' ? 'Regional language' : 'English')}
                </span>
                {content?.level && (
                  <span>
                    <SignalCellularAltIcon /> {content.level}
                  </span>
                )}
                <span>
                  <OndemandVideoIcon /> {c.meta[0]}
                </span>
              </Stack>
            </Grid>
          </Grid>

          {showAllAccess && (
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={S.banner}>
              <Stack alignItems="center" justifyContent="center" sx={S.bannerBadge}>
                <WorkspacePremiumIcon />
                <Typography sx={S.bold}>All Access</Typography>
              </Stack>
              <Typography sx={S.bannerText}>
                Get this course and all {PAID.length - 1} other paid courses for ₹{ALL_ACCESS_PRICE}, with every future update.
              </Typography>
              <Stack direction="row" divider={<Box sx={S.bannerDivider} />} sx={S.bannerStats}>
                <Stat value={content ? String(content.sections.length || c.learn.length) : '…'} label={content?.sections.length ? 'sections' : 'modules'} />
                <Stat value={content ? String(d.lectureCount || c.learn.length) : '…'} label="lectures" />
              </Stack>
            </Stack>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={S.main}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={S.sideCol}>
            <Box sx={S.sticky(showAllAccess)}>
              <BuyCard c={c} enroll={d.enroll} allAccess={d.allAccess} />
            </Box>
          </Grid>

          <Grid item xs={12} md={8} sx={S.mainCol}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" component="h2" sx={S.h5}>
                  Course summary video
                </Typography>
                <CourseVideo src={c.video} poster={c.img} title={c.title} />
              </Box>

              <CoursePromo c={c} />

              {content === undefined ? (
                <ContentSkeleton />
              ) : (
                <>
                  <Box sx={S.bordered}>
                    <Typography variant="h5" component="h2" sx={S.h5}>
                      What you&apos;ll learn
                    </Typography>
                    <Grid container columnSpacing={3} rowSpacing={1.25}>
                      {content.learn.map((l) => (
                        <Grid item xs={12} sm={6} key={l}>
                          <Stack direction="row" spacing={1.25}>
                            <CheckIcon fontSize="small" sx={S.learnIcon} />
                            <Typography sx={S.small}>{l}</Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box>
                    <Typography variant="h5" component="h2" sx={S.h5Tight}>
                      Explore related topics
                    </Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                      {relatedTopics(c).map((t) => (
                        <Chip key={t} label={t} variant="outlined" clickable onClick={() => d.searchTopic(t)} sx={S.topic} />
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="h5" component="h2" sx={S.h5Tight}>
                      This course includes:
                    </Typography>
                    <Grid container rowSpacing={1.25} columnSpacing={3} sx={S.features}>
                      {d.features.map(([Icon, text]) => (
                        <Grid item xs={12} sm={6} key={text}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Icon />
                            <Typography sx={S.body}>{text}</Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {content.sections.length > 0 && <Curriculum content={content} minutes={d.minutes} lectures={d.lectureCount} />}

                  {content.requirements.length > 0 && (
                    <Box>
                      <Typography variant="h5" component="h2" sx={S.h5Small}>
                        Requirements
                      </Typography>
                      <Box component="ul" sx={S.list}>
                        {content.requirements.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </Box>
                    </Box>
                  )}
                  <Description paragraphs={content.description} audience={content.audience} />
                </>
              )}

              {d.related.length > 0 && <AlsoLike courses={d.related} />}

              <Box>
                <Typography variant="h5" component="h2" sx={S.h5}>
                  Questions about this course
                </Typography>
                <CourseFaq />
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={S.compare}>
          <Typography variant="h4" component="h2" sx={S.compareTitle}>
            Why learners{' '}
            <Box component="span" sx={S.hl}>
              trust Takxila
            </Box>
          </Typography>
          <ComparisonTable />
        </Box>
      </Container>
    </Box>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Box sx={S.stat}>
      <Typography sx={S.statValue}>{value}</Typography>
      <Typography sx={S.statLabel}>{label}</Typography>
    </Box>
  );
}

function BuyCard({ c, enroll, allAccess }: { c: CourseT; enroll: string; allAccess: string }) {
  const preview = usePreview();
  return (
    <Card sx={S.buyCard}>
      <Box sx={S.previewBox} onClick={() => preview(c.id)}>
        <BlobImg src={c.img} alt={c.title} ratio="375 / 110" eager />
        <Stack alignItems="center" justifyContent="flex-end" sx={S.previewShade}>
          <PlayCircleIcon className="tx-pv" sx={S.previewIcon} />
          <Typography sx={S.previewText}>Preview this course</Typography>
        </Stack>
      </Box>
      <Box sx={S.buyBody}>
        {c.price === 0 ? <Typography sx={S.freeTitle}>FREE COURSE</Typography> : <Price c={c} size={26} />}
        <Stack spacing={1.25} sx={S.mt2}>
          <Button variant="contained" size="large" component="a" href={enroll} rel="noopener" data-testid="course-enroll">
            {c.price === 0 ? 'Enroll now for free' : 'Enroll now'}
          </Button>
          {c.price > 0 && (
            <Button variant="outlined" size="large" component="a" href={allAccess} rel="noopener">
              All Access · every course ₹{ALL_ACCESS_PRICE}
            </Button>
          )}
          <Button variant="text" component={RouterLink} to="/ai-course-finder">
            Not sure? Take the 2-minute course finder
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={S.secure}>
          You enroll on the Takxila AI Academy · secure payment by UPI, cards or net banking
        </Typography>
      </Box>
    </Card>
  );
}

function Curriculum({ content, minutes, lectures }: { content: CourseContent; minutes: number; lectures: number }) {
  const cur = useCurriculum(content);
  return (
    <Box>
      <Typography variant="h5" component="h2" sx={S.h5Small}>
        Course content
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={S.curriculumHead}>
        <Typography color="text.secondary" sx={S.small}>
          {cur.totalSections} sections · {lectures} lectures · {fmtLen(minutes)} total length
        </Typography>
        <Button size="small" onClick={cur.toggleAll}>
          {cur.allOpen ? 'Collapse all sections' : 'Expand all sections'}
        </Button>
      </Stack>
      <Box sx={S.curriculumBox}>
        {cur.shown.map((section, i) => {
          const sectionMins = section.lectures.reduce((acc, l) => acc + l[1], 0);
          return (
            <Accordion key={i} disableGutters square elevation={0} expanded={cur.open.includes(i)} onChange={() => cur.toggle(i)} TransitionProps={{ unmountOnExit: true }} sx={S.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={S.accordionSummary}>
                <Typography sx={S.sectionTitle}>{section.title}</Typography>
                <Typography color="text.secondary" sx={S.sectionMeta}>
                  {section.lectures.length} lectures · {fmtLen(sectionMins)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={S.details}>
                {section.lectures.map(([title, min], j) => (
                  <Stack key={j} direction="row" spacing={1.5} alignItems="center" sx={S.lecture}>
                    {i === 0 && j === 0 ? <PlayCircleIcon fontSize="small" color="action" /> : <LockIcon fontSize="small" color="disabled" />}
                    <Typography sx={S.lectureTitle}>{title}</Typography>
                    {i === 0 && j === 0 && <Chip size="small" label="Preview" variant="outlined" color="primary" sx={S.chip22} />}
                    <Typography color="text.secondary" sx={S.lectureLen}>
                      {fmtClock(min)}
                    </Typography>
                  </Stack>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      {cur.hidden > 0 && (
        <Button fullWidth variant="outlined" sx={S.moreSections} onClick={cur.showMore}>
          {cur.hidden} more sections
        </Button>
      )}
    </Box>
  );
}

function Description({ paragraphs, audience }: { paragraphs: string[]; audience: string[] }) {
  const { more, toggle } = useDescription();
  return (
    <Box>
      <Typography variant="h5" component="h2" sx={S.h5Small}>
        Description
      </Typography>
      <Box sx={S.description(more)}>
        {paragraphs.map((p, i) => (
          <Typography key={i} sx={S.para(p.startsWith('• '))}>
            {p}
          </Typography>
        ))}
        {audience.length > 0 && (
          <>
            <Typography variant="h6" component="h3" sx={S.audienceTitle}>
              Who this course is for:
            </Typography>
            <Box component="ul" sx={S.list}>
              {audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </Box>
          </>
        )}
      </Box>
      <Button size="small" endIcon={<ExpandMoreIcon sx={S.chevron(more)} />} onClick={toggle} sx={S.moreBtn}>
        {more ? 'Show less' : 'Show more'}
      </Button>
    </Box>
  );
}

function AlsoLike({ courses }: { courses: CourseT[] }) {
  return (
    <Box>
      <Typography variant="h5" component="h2" sx={S.h5}>
        Learners also explore
      </Typography>
      <Stack spacing={1.5}>
        {courses.map((r) => (
          <Stack key={r.id} direction="row" spacing={2} alignItems="center" sx={S.related}>
            <Box component={RouterLink} to={'/course/' + r.id} sx={S.relatedImg} aria-label={r.title}>
              <BlobImg src={r.img} alt="" ratio="375 / 110" />
            </Box>
            <Box sx={S.relatedMain}>
              <Typography component={RouterLink} to={'/course/' + r.id} sx={S.relatedTitle}>
                {r.title}
              </Typography>
              <Stack direction="row" gap={0.75} flexWrap="wrap" sx={S.relatedChips}>
                {r.featured && <Chip size="small" label="Featured" sx={S.featured} />}
                <Chip size="small" variant="outlined" label={r.meta[0]} sx={S.chip22} />
              </Stack>
            </Box>
            <Stack alignItems="flex-end" spacing={0.5} sx={S.relatedSide}>
              <Typography sx={S.bold}>{priceText(r)}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function ContentSkeleton() {
  return (
    <Stack spacing={2} role="status" aria-label="Loading course content">
      <Skeleton variant="rounded" height={220} />
      <Skeleton width="40%" height={36} />
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} variant="rounded" height={52} />
      ))}
    </Stack>
  );
}
