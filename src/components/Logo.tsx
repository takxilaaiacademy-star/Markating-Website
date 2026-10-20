import { Box, Typography } from '@mui/material';
import { useLogo, useLogoFull } from './types';
import { logoStyles as S } from './styles';

export default function Logo({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  const { src, blue } = useLogo();
  return (
    <Box sx={S.wrap(blue)}>
      <Box className="tx-mark" sx={S.mark(size)}>
        <Box component="img" src={src} alt="Takxila" width={size} height={size} sx={S.markImg} />
      </Box>
      {withText && (
        <Box sx={S.words} className="notranslate">
          <Typography sx={S.name}>
            TAK
            <Box component="span" sx={S.blue(blue)}>
              X
            </Box>
            ILA
          </Typography>
          <Typography sx={S.tagline(blue)}>AI ACADEMY</Typography>
        </Box>
      )}
    </Box>
  );
}

export function LogoFull({ width = 320 }: { width?: number }) {
  const src = useLogoFull();
  return (
    <Box sx={S.full(width)}>
      <Box component="img" src={src} alt="Takxila AI Academy: Master the AI frameworks. Own the AI future." sx={S.fullImg} />
    </Box>
  );
}
