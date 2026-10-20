import { memo } from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Link as RouterLink } from 'react-router-dom';
import { offText, priceText } from '../data/recommend';
import type { Course } from '../types';
import { BlobImg } from './Media';
import { titleCase, useCourseCard } from './types';
import { cardStyles as S } from './styles';

export function Price({ c, size = 22 }: { c: Course; size?: number }) {
  return (
    <Stack direction="row" spacing={1} alignItems="baseline" flexWrap="wrap">
      <Typography sx={S.priceText(c.price === 0, size)}>{c.price === 0 ? 'FREE COURSE' : priceText(c)}</Typography>
      {c.was ? (
        <Typography color="text.secondary" sx={S.priceWas(size)}>
          ₹{c.was}
        </Typography>
      ) : null}
      {c.was && c.price ? <Chip size="small" color="success" label={offText(c)} sx={S.offChip} /> : null}
    </Stack>
  );
}

export const CourseCard = memo(function CourseCard({ c, index = 0 }: { c: Course; index?: number }) {
  const v = useCourseCard(c);
  return (
    <Card sx={S.card(index)} data-testid="course-card">
      <Box sx={S.media}>
        <BlobImg src={c.img} alt={c.title} ratio="375 / 110" onClick={v.preview} sx={S.pointer} />
        <Box className="tx-play" onClick={v.preview} sx={S.play}>
          <PlayArrowRoundedIcon fontSize="small" /> Preview
        </Box>
        {c.featured && <Chip size="small" color="secondary" label="Popular" sx={S.badge} />}
      </Box>
      <CardContent sx={S.content}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {c.kicker}
        </Typography>
        <Typography variant="h6" component={RouterLink} to={'/course/' + c.id} sx={S.title}>
          {c.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={S.cat}>
          {titleCase(c.catLabel)}
        </Typography>
        <Typography variant="body2" sx={S.bold}>
          Duration:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={S.duration}>
          {c.meta.join(' | ')}
        </Typography>
        <Price c={c} size={20} />
      </CardContent>
      <Stack direction="row" spacing={1} sx={S.actions}>
        <Button variant="contained" component="a" href={v.href} rel="noopener" sx={S.mainBtn} data-testid="enroll-link">
          {v.label}
        </Button>
        <Button variant="outlined" component={RouterLink} to={'/course/' + c.id}>
          Details
        </Button>
      </Stack>
    </Card>
  );
});

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <Box sx={S.grid}>
      {courses.map((c, i) => (
        <CourseCard key={c.id} c={c} index={i} />
      ))}
    </Box>
  );
}
