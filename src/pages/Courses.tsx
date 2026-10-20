import { Box, Button, Chip, InputAdornment, MenuItem, Pagination, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import { CourseGrid } from '../components/CourseCard';
import { Heading, Page } from '../components/Section';
import { courseListLd, usePageMeta } from '../utils/seo';
import { SORTS, useCourses, type SortKey } from './types';
import { coursesStyles as S } from './styles';

export default function Courses() {
  const c = useCourses();
  usePageMeta({
    title: 'All AI courses',
    description: `Browse ${c.counts.all} practical AI courses by category: AI challenges, AI agents, AI tools, AI careers and AI filmmaking. Free starter courses and prices from ₹159.`,
    path: '/courses',
    jsonLd: [courseListLd(c.list)],
  });
  return (
    <Page>
      <Heading kick="COURSE CATALOG" title="Find your next" hl="AI skill" sub="Filter by track, search by tool or skill, and open any course to watch its summary video." h1 />
      <Stack direction="row" gap={1} flexWrap="wrap" sx={S.pills} role="group" aria-label="Category">
        {c.pills.map(([id, label], i) => (
          <Chip
            key={id}
            label={`${label} (${c.counts[id] || 0})`}
            clickable
            onClick={() => c.pickCat(id)}
            color={c.cat === id ? 'primary' : 'default'}
            variant={c.cat === id ? 'filled' : 'outlined'}
            sx={S.pill(i)}
            data-testid={'cat-' + id}
          />
        ))}
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={S.bar} alignItems={{ sm: 'center' }}>
        <TextField
          size="small"
          placeholder="Search courses, tools or skills"
          value={c.q}
          onChange={(e) => c.setQ(e.target.value)}
          sx={S.search}
          inputProps={{ 'aria-label': 'Search courses', 'data-testid': 'course-search' }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
        <TextField select size="small" value={c.sort} onChange={(e) => c.pickSort(e.target.value)} sx={S.sort} inputProps={{ 'aria-label': 'Sort courses' }}>
          {(Object.keys(SORTS) as SortKey[]).map((k) => (
            <MenuItem key={k} value={k}>
              {SORTS[k]}
            </MenuItem>
          ))}
        </TextField>
        <Typography color="text.secondary" sx={S.count} data-testid="course-count">
          {c.countText}
        </Typography>
      </Stack>
      <Box key={c.cat + c.sort + c.cur} sx={S.grid(c.stale)}>
        <CourseGrid courses={c.shown} />
      </Box>
      {!c.list.length && (
        <Box sx={S.empty}>
          <Typography variant="h6">No courses match “{c.q}”.</Typography>
          <Typography color="text.secondary" sx={S.emptyText}>
            Try another word, or let the AI course finder pick for you.
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center">
            <Button variant="outlined" onClick={c.clear}>
              Clear filters
            </Button>
            <Button variant="contained" component={RouterLink} to="/ai-course-finder">
              Find my course
            </Button>
          </Stack>
        </Box>
      )}
      {c.pages > 1 && (
        <Stack alignItems="center" sx={S.pager}>
          <Pagination count={c.pages} page={c.cur} onChange={(_, p) => c.goPage(p)} color="primary" shape="rounded" siblingCount={0} />
        </Stack>
      )}
    </Page>
  );
}
