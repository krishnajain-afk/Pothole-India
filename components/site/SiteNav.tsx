'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Mark } from '@/components/home/bits';

/* The site nav: the logo plus the four hub pages (user decision, 2026-11-11). Shared by the homepage and every
   ported hub page. Below 960px the links fold into a menu. The lab, dodge, rishta and the meme never go in here.
   Pages already ported to Next.js are opened with <Link>, so moving between them does not reload the page.
   The others are still HTML in /public and need a plain link: add a route to PORTED when its page is ported. */
const LINKS: [string, string][] = [
  ['/updates', 'updates & journey'],
  ['/research', 'research'],
  ['/case-files', 'case files'],
  ['/wall-of-holes', 'the wall'],
];
export const PORTED = new Set(['/', '/wall-of-holes', '/case-files', '/updates']);

/** A link that stays inside the app when its target page is ported, and is a plain link otherwise. */
export function PageLink({ href, ...rest }: React.ComponentProps<'a'> & { href: string }) {
  const path = href.split('#')[0] || '/';
  return PORTED.has(path) ? <Link href={href} {...rest} /> : <a href={href} {...rest} />;
}

export function Nav({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (header.current && !header.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const wide = window.matchMedia('(min-width: 960px)');
    const onWide = () => setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); wide.removeEventListener('change', onWide); };
  }, [open]);

  return (
    <header className="nav" ref={header}>
      <div className="wrap nav-in">
        {current ? (
          <Link className="logo" href="/" aria-label="Cars24 Patch — home"><Mark /><span>Cars24 Patch</span></Link>
        ) : (
          <a className="logo" href="#top" aria-label="Cars24 Patch — home"><Mark /><span>Cars24 Patch</span></a>
        )}
        <button className="hnav-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="hnav-links" onClick={() => setOpen((o) => !o)}>
          <span className="hnav-ico" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>{open ? 'close' : 'menu'}</span>
        </button>
        <nav className={'hnav-links' + (open ? ' open' : '')} id="hnav-links" aria-label="More from Cars24 Patch">
          {LINKS.map(([href, label]) => (
            <PageLink key={href} className="hnav-link" href={href} aria-current={href === current ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</PageLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
