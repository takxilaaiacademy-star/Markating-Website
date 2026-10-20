import { Box, Button, Card, CardContent, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { courseById, priceText } from '../data/recommend';
import type { Recommendation } from '../types';
import { BlobImg } from './Media';
import { recHref, usePlanStats } from './types';
import { recStyles as S } from './styles';

export function PlanStats({ recs }: { recs: Recommendation[] }) {
  const { p, stats, href, cta } = usePlanStats(recs);
  if (!p.n) return null;
  return (
    <Paper variant="outlined" sx={S.plan}>
      <Grid container spacing={2} alignItems="center">
        {stats.map(([v, l]) => (
          <Grid item xs={6} md={2.25} key={l}>
            <Typography sx={S.stat}>{v}</Typography>
            <Typography variant="body2" color="text.secondary">
              {l}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12} md={3}>
          <Button fullWidth variant="contained" component="a" href={href} rel="noopener">
            {cta}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export function RecCard({ r }: { r: Recommendation }) {
  const c = courseById(r.id);
  if (!c) return null;
  return (
    <Card sx={S.card}>
      <Box sx={S.media}>
        <BlobImg src={c.img} alt="" ratio="375 / 110" />
        <Chip label={r.match + '% match'} color="primary" size="small" sx={S.match} />
      </Box>
      <CardContent sx={S.content}>
        <Typography variant="overline" color="text.secondary" sx={S.cat}>
          {c.catLabel}
        </Typography>
        <Typography sx={S.title}>{c.title}</Typography>
        <Stack direction="row" gap={0.75} flexWrap="wrap">
          {r.why.map((w) => (
            <Chip key={w} label={w} size="small" variant="outlined" sx={S.why} />
          ))}
        </Stack>
      </CardContent>
      <Stack direction="row" spacing={1} alignItems="center" sx={S.actions}>
        <Typography sx={S.price}>{priceText(c)}</Typography>
        <Button size="small" variant="outlined" component={RouterLink} to={'/course/' + c.id}>
          Details
        </Button>
        <Button size="small" variant="contained" component="a" href={recHref(c)} rel="noopener">
          {c.price === 0 ? 'Enroll free' : 'Enroll'}
        </Button>
      </Stack>
    </Card>
  );
}

export function RecGrid({ recs }: { recs: Recommendation[] }) {
  return (
    <Grid container spacing={2.5}>
      {recs.map((r) => (
        <Grid item xs={12} sm={6} md={4} key={r.id}>
          <RecCard r={r} />
        </Grid>
      ))}
    </Grid>
  );
}
