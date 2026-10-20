import { memo } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import type { Course } from '../types';
import { useCoursePromo } from './types';
import { promoStyles as S } from './styles';

function CoursePromo({ c, compact = false }: { c: Course; compact?: boolean }) {
  const { p, save, href, linkText } = useCoursePromo(c);
  return (
    <Box sx={S.card(compact)}>
      <Box component="img" src="/assets/logo-mark-dark.webp" alt="" aria-hidden sx={S.mark} />
      <Typography sx={S.label}>{p.label}</Typography>
      <Typography component="h3" className="notranslate" sx={S.title(compact)}>
        {p.title}
      </Typography>
      <Typography sx={S.sub}>{p.sub}</Typography>
      <Box sx={S.rule} />
      {p.hook.length > 0 && (
        <Stack spacing={1.25} sx={S.hooks}>
          {p.hook.map((h) => (
            <Typography key={h} sx={S.hook(compact)}>
              {h}
            </Typography>
          ))}
        </Stack>
      )}
      {p.flow.length > 0 && <Typography sx={S.flow}>{p.flow.join(' → ')}</Typography>}
      <Box sx={S.spacer} />
      <Stack direction="row" sx={S.facts}>
        <Box sx={S.fact}>
          <Typography sx={S.hours}>{p.hours}</Typography>
          <Typography sx={S.small}>Practical Learning</Typography>
        </Box>
        <Box sx={S.fact}>
          <Typography sx={S.priceLabel}>{c.price ? 'SPECIAL PRICE' : 'PRICE'}</Typography>
          <Typography sx={S.price}>{c.price ? '₹' + c.price : 'FREE'}</Typography>
          {save > 0 && (
            <Typography sx={S.small}>
              Regular ₹{c.was} · Save {save}%
            </Typography>
          )}
        </Box>
      </Stack>
      <Button fullWidth component="a" href={href} rel="noopener" sx={S.enroll}>
        ENROLL NOW
      </Button>
      <Typography component="a" href={href} rel="noopener" className="notranslate" sx={S.link}>
        {linkText}
      </Typography>
    </Box>
  );
}

export default memo(CoursePromo);
