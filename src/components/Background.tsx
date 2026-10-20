import { Box } from '@mui/material';
import { backgroundStyles as S } from './styles';

export default function Background() {
  return (
    <>
      <Box aria-hidden sx={S.orb1} />
      <Box aria-hidden sx={S.orb2} />
      <Box aria-hidden sx={S.orb3} />
    </>
  );
}
