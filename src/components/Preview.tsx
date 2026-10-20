import type { ReactNode } from 'react';
import { Box, Button, Chip, Dialog, DialogContent, Grid, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';
import { CourseVideo } from './Media';
import { Price } from './CourseCard';
import { PreviewContext, usePreviewDialog, usePreviewProvider } from './types';
import { previewStyles as S } from './styles';

export { usePreview } from './types';

export function PreviewProvider({ children }: { children: ReactNode }) {
  const { id, open, close } = usePreviewProvider();
  return (
    <PreviewContext.Provider value={open}>
      {children}
      {id && <PreviewDialog id={id} onClose={close} />}
    </PreviewContext.Provider>
  );
}

function PreviewDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { c, full, lessonCount, href } = usePreviewDialog(id);
  if (!c) return null;
  return (
    <Dialog open onClose={onClose} fullScreen={full} maxWidth="md" fullWidth>
      <DialogContent sx={S.body}>
        <Stack direction="row" alignItems="center" sx={S.head}>
          <Typography variant="overline" color="text.secondary" sx={S.kicker}>
            COURSE PREVIEW · {c.catLabel}
          </Typography>
          <IconButton onClick={onClose} aria-label="Close preview">
            <CloseIcon />
          </IconButton>
        </Stack>
        <CourseVideo src={c.video} poster={c.img} autoPlay title={c.title} />
        <Grid container spacing={3} sx={S.grid}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={S.title}>
              {c.title}
            </Typography>
            <Typography color="text.secondary" sx={S.desc}>
              {c.desc}
            </Typography>
            <Stack spacing={0.75}>
              {c.learn.map((l) => (
                <Stack key={l} direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon color="secondary" fontSize="small" />
                  <Typography>{l}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack direction="row" gap={0.75} flexWrap="wrap" sx={S.chips}>
              {c.meta.map((m) => (
                <Chip key={m} label={m} size="small" variant="outlined" />
              ))}
              <Chip label={lessonCount + ' lessons'} size="small" variant="outlined" />
            </Stack>
            <Price c={c} size={28} />
            <Stack spacing={1.25} sx={S.actions}>
              <Button variant="contained" size="large" component="a" href={href} rel="noopener">
                {c.price === 0 ? 'Enroll free on the academy' : 'Enroll on the academy'}
              </Button>
              <Button variant="outlined" component={RouterLink} to={'/course/' + c.id} onClick={onClose}>
                See full course details
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={S.end} />
      </DialogContent>
    </Dialog>
  );
}
