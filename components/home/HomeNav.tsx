'use client';

import { useEffect, useRef, useState } from 'react';
import { Mark } from './bits';

/* The homepage nav: the logo plus four lab pages (user decision, 2026-11-11; it was logo-only before).
   Below 960px the links fold into a menu, like the lab nav. The meme break never goes in here. */
const LINKS: [string, string][] = [
  ['/updates', 'updates & journey'],
  ['/research', 'research'],
  ['/case-files', 'case files'],
  ['/wall-of-holes', 'the wall'],
];

export function Nav() {
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
        <a className="logo" href="#top" aria-label="Cars24 Patch — home">
          <Mark />
          <span>Cars24 Patch</span>
        </a>
        <button className="hnav-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="hnav-links" onClick={() => setOpen((o) => !o)}>
          <span className="hnav-ico" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>{open ? 'close' : 'menu'}</span>
        </button>
        <nav className={'hnav-links' + (open ? ' open' : '')} id="hnav-links" aria-label="More from Cars24 Patch">
          {LINKS.map(([href, label]) => (
            <a key={href} className="hnav-link" href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
