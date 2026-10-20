import { memo } from 'react';
import { Box } from '@mui/material';
import type { Course } from '../types';
import { CAT_COLORS, iconFor } from './types';
import { courseIconStyles as S } from './styles';

export { CAT_COLORS, iconFor } from './types';

export const CourseIcon = memo(function CourseIcon({ c, size = 48 }: { c: Course; size?: number }) {
  const Icon = iconFor(c);
  const [a, b] = CAT_COLORS[c.cat];
  return (
    <Box aria-hidden className="tx-cicon" sx={S.tile(size, a, b)}>
      <Icon sx={S.icon(size)} />
    </Box>
  );
});
