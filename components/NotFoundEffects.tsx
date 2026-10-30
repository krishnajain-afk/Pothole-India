'use client';

import { useEffect } from 'react';

const LINES = ['(it’s giving pothole.)', '(no notes. just a hole.)', '(bestie, this isn’t it.)', '(404, but make it a pothole.)', '(we’ll patch this too. eventually.)'];

/* The 404 pothole watches you, changes its note when you tap it (or every few seconds) and rolls its eyes.
   "Go back" goes back when you came from this site, and goes home when you did not. Ported from the old 404.html. */
export function NotFoundEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const zero = document.getElementById('nf-zero'), note = document.getElementById('nf-note'), back = document.getElementById('nf-back');
    if (!zero || !note || !back) return;
    const pupils = Array.from(zero.querySelectorAll<HTMLElement>('.pupil')), eyes = Array.from(zero.querySelectorAll<HTMLElement>('.eye'));
    let lastMove = 0, li = 0;
    const look = (dx: number, dy: number, m: number) => pupils.forEach((p) => { p.style.transform = `translate(${dx * m * 55}%,${dy * m * 55}%)`; });
    const onMove = (e: PointerEvent) => {
      lastMove = Date.now();
      const r = zero.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1;
      look(dx / d, dy / d, Math.min(1, d / 260));
    };
    const nextLine = () => { li = (li + 1) % LINES.length; note.textContent = LINES[li]; note.classList.remove('swap'); void note.offsetWidth; note.classList.add('swap'); };
    const rollEyes = () => { if (reduce) return; eyes.forEach((e) => { e.classList.remove('roll'); void e.offsetWidth; e.classList.add('roll'); }); };
    const onTap = () => { nextLine(); rollEyes(); };
    const onBack = (e: MouseEvent) => {
      try { if (history.length > 1 && document.referrer && new URL(document.referrer).origin === location.origin) { e.preventDefault(); history.back(); } } catch {}
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    zero.addEventListener('click', onTap);
    back.addEventListener('click', onBack);
    const timers = reduce ? [] : [
      window.setInterval(() => { if (Date.now() - lastMove < 3000) return; const a = Math.random() * Math.PI * 2; look(Math.cos(a), Math.sin(a), Math.random()); }, 1700),
      window.setInterval(nextLine, 4200),
    ];
    return () => { window.removeEventListener('pointermove', onMove); zero.removeEventListener('click', onTap); back.removeEventListener('click', onBack); timers.forEach(clearInterval); };
  }, []);
  return null;
}
