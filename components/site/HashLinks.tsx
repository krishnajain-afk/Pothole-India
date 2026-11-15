'use client';

import { useEffect } from 'react';

/* In-page links (#src-1, #subscribe, #main, #cf-02 …) are plain browser jumps, which add a history entry that the
   Next.js router knows nothing about. After such a jump, going to another page and pressing back showed the other
   page's content under this page's address. So same-page # links go through history.pushState (which Next.js tracks),
   then scroll, focus and fire hashchange exactly as the browser would. Renders nothing. */
export function HashLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const id = decodeURIComponent(a.getAttribute('href')!.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (id && !el) return;                      // nothing to jump to: leave it to the browser
      e.preventDefault();
      if (location.hash !== '#' + id) {
        history.pushState(null, '', '#' + id);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
      if (!el) { window.scrollTo(0, 0); return; }
      el.scrollIntoView();                          // follows the page's scroll-behavior (smooth, or instant with reduced motion)
      if (!el.matches('a, button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });            // like a real anchor jump: Tab carries on from here (the skip link needs this)
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
