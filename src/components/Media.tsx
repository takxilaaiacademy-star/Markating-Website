import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/** Muted looping clip that only downloads once it scrolls into view. */
export function LazyLoop({ src, label, poster }: { src: string; label: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setOn(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={on ? src : undefined} poster={poster} preload="none" muted loop playsInline autoPlay aria-label={label} />;
}

/** Course cover with a play button; the summary video loads only when the visitor asks for it. */
export function VideoPreview({ src, cover, title }: { src: string; cover: string; title: string }) {
  const [play, setPlay] = useState(false);
  if (play) return <video className="vp-video" src={src} controls autoPlay playsInline aria-label={'Summary video: ' + title} />;
  return (
    <button type="button" className="vp" onClick={() => setPlay(true)} aria-label={'Play the summary video: ' + title}>
      <img src={cover} alt="" width="2250" height="660" />
      <span className="vp-btn">
        <Icon name="play" size={20} filled />
      </span>
      <span className="vp-cap">Summary video</span>
    </button>
  );
}
