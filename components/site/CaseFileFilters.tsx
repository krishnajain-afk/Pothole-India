'use client';

import { useEffect, useState } from 'react';

const FILTERS: [string, string][] = [['all', 'all'], ['study', 'studies'], ['experiment', 'experiments'], ['landing', 'landings']];

/* The case file filters and deep links, ported from the old page script. Filters hide the cards whose data-type
   doesn't match. A link to #cf-02 (from this page or another one) opens that card, and shows it if a filter hid it.
   The cards are server-rendered; this only toggles their hidden attribute. Everything is undone on leaving. */
export function CaseFileFilters({ total }: { total: number }) {
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(total);

  /* hide the cards that don't match, and count the ones left (done in the click, so the count never lags) */
  function apply(f: string) {
    let n = 0;
    document.querySelectorAll<HTMLElement>('.cf-grid > .cfile').forEach((c) => {
      const ok = f === 'all' || (c.dataset.type || '').split(' ').includes(f);
      c.hidden = !ok;
      if (ok && !c.classList.contains('upd-slot')) n++;
    });
    setFilter(f);
    setCount(n);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const openFor = (el: HTMLElement | null) => {
      if (!el) return;
      if (el.hidden) apply('all');
      const d = el.tagName === 'DETAILS' ? (el as HTMLDetailsElement) : el.querySelector('details');
      if (d) d.open = true;
    };
    const fromHash = () => { if (location.hash.length > 1) openFor(document.getElementById(decodeURIComponent(location.hash.slice(1)))); };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  return (
    <div className="cf-top reveal">
      <p className="cf-count" id="cf-count" aria-live="polite">{count} {count === 1 ? 'case file' : 'case files'}</p>
      <div className="cf-filters" role="group" aria-label="Filter the case files">
        {FILTERS.map(([f, label]) => (
          <button key={f} className="cf-f" type="button" data-f={f} aria-pressed={filter === f} onClick={() => apply(f)}>{label}</button>
        ))}
      </div>
    </div>
  );
}
