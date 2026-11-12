'use client';

import { useEffect, useRef } from 'react';

/* A photo that never shows blank. It tries, in order: our own copy (downloaded at build time into /rishta-photos/
   by scripts/fetch-rishta-photos.mjs), this site's image service (Vercel fetches the Commons file and serves it from
   our domain), then the Commons file itself. */
export function Photo({ file, src, alt, lazy = true }: { file?: string; src: string; alt: string; lazy?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const tries = useRef<string[]>([]);
  const own = file && /^[a-z0-9-]+\.jpg$/.test(file) ? '/rishta-photos/' + file : '';
  const first = own || src;

  useEffect(() => {
    tries.current = [...(own ? ['/_next/image?url=' + encodeURIComponent(src) + '&w=828&q=75'] : []), src];
    const img = ref.current;
    // the first try may have failed before React was listening: catch up
    if (img && img.complete && img.naturalWidth === 0) next();
  }, [own, src]);

  function next() {
    const img = ref.current, t = tries.current.shift();
    if (img && t) img.src = t;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={first} alt={alt} loading={lazy ? 'lazy' : undefined} decoding="async" referrerPolicy="no-referrer" onError={next} />;
}
