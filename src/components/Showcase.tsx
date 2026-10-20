import { memo } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
  Stack, Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HourglassIcon from '@mui/icons-material/HourglassEmptyRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/HighlightOff';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PeopleIcon from '@mui/icons-material/PeopleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import { COMPARE_COLS, COMPARE_PRICE, COMPARE_ROWS, COMPARE_SAVE, COURSE_FAQ, PACK_GROUPS, PERKS, durationText, type Pack } from '../data/showcase';
import type { Course } from '../types';
import { CourseIcon } from './CourseIcon';
import { LogoFull } from './Logo';
import { TESTIMONIALS } from '../config/marketing';
import { comparisonCta, fmt, howItWorksFor, packDeal, PERK_ICONS, STEP_ICONS, useComboPacks, usePackDialog, usePlans, usePreview } from './types';
import { showcaseStyles as S } from './styles';

export const NumberedCourse = memo(function NumberedCourse({ c, n, index = 0, action }: { c: Course; n: number; index?: number; action?: (c: Course) => void }) {
  const preview = usePreview();
  return (
    <Box onClick={() => (action ? action(c) : preview(c.id))} sx={S.tile(index)}>
      <Typography className="tx-num" sx={S.tileNum}>
        {n}
      </Typography>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={S.tileHead}>
        <CourseIcon c={c} size={44} />
        <Typography sx={S.tileTitle}>{c.title}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.75} alignItems="center" sx={S.tileMeta}>
        <HourglassIcon sx={S.tileIcon} />
        <Box component="span" sx={S.ellipsis}>
          {durationText(c)}
        </Box>
        <Box sx={S.spacer} />
        <Typography component="span" sx={S.tilePrice(!c.price)}>
          {c.price ? fmt(c.price) : 'FREE'}
        </Typography>
      </Stack>
      <Button variant="outlined" color="secondary" endIcon={<ChevronRightIcon />} sx={S.tileBtn} tabIndex={-1}>
        Curriculum
      </Button>
    </Box>
  );
});

export function NumberedGrid({ courses, start = 1, action }: { courses: Course[]; start?: number; action?: (c: Course) => void }) {
  return (
    <Box sx={S.grid}>
      {courses.map((c, i) => (
        <NumberedCourse key={c.id} c={c} n={start + i} index={i} action={action} />
      ))}
    </Box>
  );
}

export function ComparisonTable() {
  const { cta, href } = comparisonCta();
  return (
    <Box sx={S.table}>
      <Box sx={S.tableGrid}>
        <Box sx={S.featureHead}>Features</Box>
        <Box sx={S.logoHead}>
          <LogoFull width={86} />
        </Box>
        {COMPARE_COLS.slice(1).map((c) => (
          <Box key={c} sx={S.colHead}>
            {c}
          </Box>
        ))}
        <Box sx={S.contents}>
          <Box sx={S.rowLabel(-1)}>Price</Box>
          {COMPARE_PRICE.map((v, i) => (
            <Box key={i} sx={S.priceCell(i)}>
              {v}
            </Box>
          ))}
        </Box>
        {COMPARE_ROWS.map(([label, ...vals], r) => (
          <Box key={label} sx={S.contents}>
            <Box sx={S.rowLabel(r)}>{label}</Box>
            {vals.map((ok, i) => (
              <Box key={i} sx={S.checkCell(i)}>
                {ok ? <CheckCircleIcon sx={S.yes(r)} aria-label="Yes" /> : <CancelIcon sx={S.no} aria-label="No" />}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={S.save}>
        <Box>
          <Typography sx={S.saveKick}>YOU SAVE UP TO</Typography>
          <Typography sx={S.saveNum}>{fmt(COMPARE_SAVE)}</Typography>
        </Box>
        <Box sx={S.center}>
          <Button variant="contained" component="a" href={href} rel="noopener" sx={S.saveBtn}>
            {cta}
          </Button>
          <Typography sx={S.saveNote}>
            <BoltIcon sx={S.bolt} /> No hidden charges after enrollment
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function PackCard({ p, onOpen, index }: { p: Pack; onOpen: (p: Pack) => void; index: number }) {
  const { list, off, shown, more } = packDeal(p);
  return (
    <Box sx={S.pack(index)}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={S.packCount}>
          <PeopleIcon sx={S.packCountIcon} /> {p.courses.length} courses
        </Typography>
        <Chip label={off + '% OFF'} size="small" color="success" sx={S.offChip} />
      </Stack>
      <Box>
        <Typography sx={S.packTitle}>{p.title}</Typography>
        <Typography sx={S.packKick}>COMBO PACK</Typography>
      </Box>
      <Stack direction="row" spacing={1} sx={S.packDeal}>
        <StarIcon sx={S.star} />
        <span>{p.rating} rating</span>
        <Box sx={S.spacer} />
        <span>
          <b>{fmt(p.price)}</b>{' '}
          <Box component="s" sx={S.muted}>
            {fmt(list)}
          </Box>
        </span>
      </Stack>
      <Box sx={S.packGrid}>
        {shown.map((c) => (
          <Stack key={c.id} direction="row" spacing={0.75} alignItems="center" sx={S.packCourse}>
            <CourseIcon c={c} size={22} />
            <Typography sx={S.packCourseName}>{c.title}</Typography>
          </Stack>
        ))}
        {more > 0 && <Typography sx={S.packMore}>+{more} more</Typography>}
      </Box>
      <Button variant="contained" size="small" endIcon={<ChevronRightIcon />} onClick={() => onOpen(p)} sx={S.packBtn}>
        Explore this pack
      </Button>
    </Box>
  );
}

export function ComboPacks() {
  const { group, setGroup, open, setOpen, row, packs, scroll } = useComboPacks();
  return (
    <Box>
      <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center" sx={S.filters}>
        {PACK_GROUPS.map(([id, label]) => (
          <Chip key={id} label={label} clickable color={group === id ? 'primary' : 'default'} variant={group === id ? 'filled' : 'outlined'} onClick={() => setGroup(id)} />
        ))}
      </Stack>
      <Box sx={S.rel}>
        <Box ref={row} sx={S.packRow} key={group}>
          {packs.map((p, i) => (
            <PackCard key={p.id} p={p} index={i} onOpen={setOpen} />
          ))}
        </Box>
        <Stack direction="row" spacing={1} justifyContent="center" sx={S.arrows}>
          <IconButton aria-label="Previous packs" onClick={() => scroll(-1)} sx={S.arrow}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton aria-label="Next packs" onClick={() => scroll(1)} sx={S.arrow}>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Box>
      {open && <PackDialog p={open} onClose={() => setOpen(null)} />}
    </Box>
  );
}

function PackDialog({ p, onClose }: { p: Pack; onClose: () => void }) {
  const { list, courses, preview, href } = usePackDialog(p);
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={S.dialogTitle}>
        {p.title} combo pack
        <Typography color="text.secondary">
          {p.courses.length} courses · <b>{fmt(p.price)}</b> instead of <s>{fmt(list)}</s>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          {courses.map((c, i) => (
            <Stack key={c.id} direction="row" spacing={1.5} alignItems="center" sx={S.dialogRow(i)}>
              <CourseIcon c={c} size={36} />
              <Box sx={S.dialogText}>
                <Typography sx={S.dialogName} noWrap>
                  {c.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {durationText(c)} · {fmt(c.price)}
                </Typography>
              </Box>
              <Button size="small" onClick={() => preview(c.id)}>
                Preview
              </Button>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={S.dialogActions}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" component="a" href={href} rel="noopener">
          Get this pack · {fmt(p.price)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function Plans() {
  const plans = usePlans();
  return (
    <Grid container spacing={2.5} justifyContent="center">
      {plans.map((p, i) => (
        <Grid item xs={12} sm={6} md={4} key={p.title}>
          <Box sx={S.plan(i === 0)}>
            <Chip label={p.tag} size="small" color={i === 0 ? 'primary' : 'secondary'} sx={S.planTag} />
            <Typography variant="h6" sx={S.planTitle}>
              {p.title}
            </Typography>
            <Typography color="text.secondary">{p.sub}</Typography>
            <Typography variant="body2" sx={S.planNote}>
              {p.note}
            </Typography>
            <Box sx={S.spacer} />
            {p.price ? (
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography sx={S.planPrice}>{fmt(p.price)}</Typography>
                <Typography color="text.secondary" sx={S.strike}>
                  {fmt(p.was ?? 0)}
                </Typography>
                <Chip size="small" color="success" label={Math.round((1 - p.price / (p.was ?? 1)) * 100) + '% off'} />
              </Stack>
            ) : (
              <Typography sx={S.planPrice}>25% off</Typography>
            )}
            <Button variant={i === 0 ? 'contained' : 'outlined'} size="large" component="a" href={p.href} rel="noopener">
              {p.cta}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export function HowItWorks({ c }: { c: Course }) {
  const { steps, name } = howItWorksFor(c);
  return (
    <Box sx={S.how}>
      <Typography variant="h4" sx={S.howTitle}>
        How {name} works
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            {steps.map(([a, hl, b], i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Stack key={i} direction="row" spacing={2} alignItems="center" sx={S.step(i)}>
                  <Box sx={S.stepIcon}>
                    <Icon />
                  </Box>
                  <Typography sx={S.stepText}>
                    {a}
                    <Box component="span" sx={S.stepHl}>
                      {hl}
                    </Box>
                    {b}
                  </Typography>
                  <Typography sx={S.stepNum}>{i + 1}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={12} md={5} sx={S.sealCol}>
          <Box sx={S.seal}>
            <Box sx={S.sealRing} />
            <Box sx={S.sealDisc} />
            <Box sx={S.sealText}>
              <WorkspacePremiumIcon sx={S.sealIcon} />
              <Typography sx={S.sealBig}>CERTIFIED</Typography>
              <Typography sx={S.sealSmall}>TAKXILA AI ACADEMY</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export function Perks() {
  return (
    <Box sx={S.perks}>
      {PERKS.map((p, i) => {
        const Icon = PERK_ICONS[i % PERK_ICONS.length];
        return (
          <Stack key={p} direction="row" spacing={1.5} alignItems="center" sx={S.perk(i, i === PERKS.length - 1 && PERKS.length % 2 === 1)}>
            <Box sx={S.perkIcon}>
              <Icon fontSize="small" />
            </Box>
            <Typography sx={S.perkText}>{p}</Typography>
          </Stack>
        );
      })}
    </Box>
  );
}

export function CourseFaq({ skip = [] }: { skip?: string[] }) {
  return COURSE_FAQ.filter(([q]) => !skip.includes(q)).map(([q, a], i) => (
    <Accordion key={q} defaultExpanded={i === 0} disableGutters sx={S.faq}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={S.faqSummary}>
        <Typography sx={S.faqQ}>{q}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={S.faqDetails}>
        <Typography color="text.secondary">{a}</Typography>
      </AccordionDetails>
    </Accordion>
  ));
}

export function Testimonials() {
  return (
    <Box sx={S.quotes}>
      {TESTIMONIALS.map((q) => (
        <Box key={q.name + q.course} component="figure" sx={S.quoteCard}>
          <FormatQuoteIcon sx={S.quoteIcon} />
          <Typography component="blockquote" sx={S.quoteText}>
            {q.quote}
          </Typography>
          <Stack direction="row" spacing={0.25} sx={S.stars} aria-label="5 out of 5">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} fontSize="small" />
            ))}
          </Stack>
          <Typography component="figcaption" sx={S.quoteName}>
            {q.name}
            <Box component="span" sx={S.quoteRole}>
              {q.role} · {q.course}
            </Box>
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
