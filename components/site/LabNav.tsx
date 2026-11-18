'use client';

import { useEffect, useRef, useState } from 'react';
import { PageLink } from './SiteNav';
import './lab.css';

/* The lab nav (the lab bar + six links), ported from the LAB-NAV blocks of the lab pages. Shared by /lab now, and by
   /dodge and /rishta once they're ported. The four hub pages use SiteNav instead and never link back here.
   Below 1100px the links fold into a menu: it closes on a link click, an outside click, Esc (focus returns to the
   button) and on resizing to desktop. Rishta is deliberately not in the nav: only its card on /lab links to it. */
const LINKS: [string, string][] = [
  ['/lab', 'the lab'],
  ['/updates', 'updates & journey'],
  ['/research', 'research'],
  ['/case-files', 'case files'],
  ['/wall-of-holes', 'the wall'],
  ['/dodge', 'dodge'],
];

const LOGO = (
  <svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="22" rx="18" ry="14" fill="#121212" /><circle cx="14" cy="19.5" r="4.6" fill="#fff" /><circle cx="26" cy="19.5" r="4.6" fill="#fff" /><circle cx="15" cy="20.2" r="2.1" fill="#121212" /><circle cx="27" cy="20.2" r="2.1" fill="#121212" /><path d="M14 28.5q6 4 12 0" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg>
);

export function LabNav({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (nav.current && !nav.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    const wide = window.matchMedia('(min-width: 1100px)');
    const onWide = () => setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); wide.removeEventListener('change', onWide); };
  }, [open]);

  const onLab = current === '/lab';
  return (
    <>
      <div className="lab-bar">the lab: stuff we’re still testing. not the official homepage. <PageLink href="/">the real one is over here →</PageLink></div>
      <header className="nav" ref={nav}>
        <div className="wrap nav-in">
          {onLab
            ? <a className="logo" href="#top" aria-label="Cars24 Patch lab — back to top">{LOGO}<span>Cars24 Patch</span></a>
            : <PageLink className="logo" href="/lab" aria-label="Cars24 Patch lab — home">{LOGO}<span>Cars24 Patch</span></PageLink>}
          <button className="nav-toggle" id="nav-toggle" ref={btn} type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
            <span className="nav-ico" aria-hidden="true"><i></i><i></i><i></i></span><span className="nav-toggle-t">{open ? 'close' : 'menu'}</span>
          </button>
          <nav className={'nav-links' + (open ? ' open' : '')} id="nav-links" aria-label="The lab pages">
            {LINKS.map(([href, label]) => (
              <PageLink key={href} className="nav-link" href={href} aria-current={href === current ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</PageLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
