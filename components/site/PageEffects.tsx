'use client';

import { useEffect } from 'react';

/* The behaviour every hub page shares: .reveal blocks slide in as you scroll, and the #censor in the hero flips
   *** <-> pot (auto every few seconds, on hover with a mouse, click to pin), sized so "***" hugs the word.
   Same trick as the homepage (lib/home-behaviour.js). Everything it starts is stopped when you leave the page. */
export function PageEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ac = new AbortController(), timers: number[] = [];
    let alive = true;
    const later = (fn: () => void, ms: number) => { const id = window.setTimeout(() => { if (alive) fn(); }, ms); timers.push(id); return id; };

    /* reveal on scroll */
    const items = Array.from(document.querySelectorAll('.reveal'));
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((en) => en.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io?.unobserve(e.target);
      }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      items.forEach((n) => io!.observe(n));
    } else items.forEach((n) => n.classList.add('in'));

    /* the censor: *** <-> pot */
    const censor = document.getElementById('censor');
    let ro: ResizeObserver | null = null;
    if (censor) {
      let auto = false, hover = false, pinned = false;
      const render = () => censor.classList.toggle('is-pot', auto || hover || pinned);
      const cycle = () => {
        if (reduce) return;
        later(() => { auto = true; render(); later(() => { auto = false; render(); cycle(); }, 1900); }, 2600);
      };
      const opt = { signal: ac.signal };
      censor.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hover = true; render(); } }, opt);
      censor.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hover = false; render(); } }, opt);
      censor.addEventListener('click', () => { pinned = !pinned; render(); }, opt);
      later(cycle, 1400);
      const size = () => {
        if (!alive) return;
        const s = censor.querySelector<HTMLElement>('.stars'), p = censor.querySelector<HTMLElement>('.pot');
        if (!s || !p) return;
        censor.style.setProperty('--ws', s.offsetWidth + 'px');
        censor.style.setProperty('--wp', (p.offsetWidth + parseFloat(getComputedStyle(censor).fontSize) * 0.08) + 'px');
      };
      document.fonts?.ready.then(size);
      window.addEventListener('load', size, opt);
      const h1 = censor.closest('h1');
      if (window.ResizeObserver && h1) { ro = new ResizeObserver(size); ro.observe(h1); } else window.addEventListener('resize', size, opt);
      size();
    }

    return () => { alive = false; ac.abort(); timers.forEach(clearTimeout); io?.disconnect(); ro?.disconnect(); };
  }, []);
  return null;
}
