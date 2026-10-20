import { Box, Container, Typography } from '@mui/material';
import type { HeadingProps, PageProps } from './types';
import { sectionStyles as S } from './styles';

export function Heading({ kick, title, hl, after, sub, align = 'left', mb = 4, h1 = false }: HeadingProps) {
  return (
    <Box sx={S.heading(align, mb)}>
      {kick && (
        <Typography variant="overline" component="div" color="text.secondary">
          {kick}
        </Typography>
      )}
      <Typography variant="h2" component={h1 ? 'h1' : 'h2'} sx={S.title}>
        {title}{' '}
        {hl && (
          <Box component="span" sx={S.hl}>
            {hl}
          </Box>
        )}
        {after ? ' ' + after : ''}
      </Typography>
      {sub && (
        <Typography color="text.secondary" sx={S.sub(align === 'center')}>
          {sub}
        </Typography>
      )}
    </Box>
  );
}

export function Page({ children, maxWidth = 'lg', py = { xs: 4, md: 7 } }: PageProps) {
  return (
    <Container maxWidth={maxWidth} sx={S.page(py)}>
      {children}
    </Container>
  );
}
