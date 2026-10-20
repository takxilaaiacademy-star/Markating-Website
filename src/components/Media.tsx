import { memo } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { asArray, useCourseVideo, useImg, type BlobImgProps, type VideoProps } from './types';
import { mediaStyles as S } from './styles';

export const BlobImg = memo(function BlobImg({ src, alt, ratio, sx, onClick, eager }: BlobImgProps) {
  const img = useImg(src);
  return (
    <Box onClick={onClick} sx={[S.frame(ratio, !img.loaded), ...asArray(sx)]}>
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        ref={img.imgRef}
        onLoad={img.onLoad}
        onError={img.onError}
        sx={S.img(img.loaded)}
      />
    </Box>
  );
});

export function CourseVideo(props: VideoProps) {
  const v = useCourseVideo(props);
  const { src, poster, title } = props;
  return (
    <Box sx={S.video}>
      {!v.failed && (
        <video
          ref={v.ref}
          src={src}
          poster={poster}
          muted={v.muted}
          playsInline
          controls={v.started}
          preload="none"
          onPlay={v.onPlay}
          onError={v.onError}
          style={S.videoEl}
          aria-label={title ? 'Summary video: ' + title : 'Course summary video'}
        />
      )}
      {v.failed && <Box component="img" src={poster} alt="" sx={S.poster} />}
      {!v.started && !v.failed && (
        <Stack onClick={v.play} alignItems="center" justifyContent="center" sx={S.cover} data-testid="video-play">
          <Box sx={S.playBtn}>
            <PlayArrowRoundedIcon sx={S.playIcon} />
          </Box>
          <Typography sx={S.watch}>Watch the course summary</Typography>
        </Stack>
      )}
      {v.started && (
        <IconButton onClick={v.toggleMute} aria-label={v.muted ? 'Unmute' : 'Mute'} sx={S.mute}>
          {v.muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      )}
    </Box>
  );
}
