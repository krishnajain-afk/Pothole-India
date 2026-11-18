'use client';

import { useEffect, useState } from 'react';

/* The filter chips and deep links of the hub pages (case files, the diary), ported from their old page scripts.
   - The chips hide the cards (matched by `cards`) whose data-type doesn't include the chosen filter, and count the rest.
   - A link to #cf-02 / #u-dodge (from this page or another one) opens that card, and shows it if a filter hid it.
   - <a href="#u-list" data-open> opens that card on click, even when the address already ends in #u-list.
   The cards are server-rendered; this only toggles their hidden attribute and details. Everything is undone on leaving. */
export function HubFilters({ cards, filters, unit, countId, label, total }: {
  cards: string;                 // CSS selector of the filterable cards, e.g. '.cf-grid > .cfile'
  filters: [string, string][];   // [data-type value, chip label]; the first is 'all'
  unit: [string, string];        // singular and plural, e.g. ['case file', 'case files']
  countId: string;
  label: string;                 // aria-label of the chip group
  total: number;                 // number of cards, shown before any filter
}) {
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(total);

  /* hide the cards that don't match, and count the ones left (done in the click, so the count never lags) */
  function apply(f: string) {
    let n = 0;
    document.querySelectorAll<HTMLElement>(cards).forEach((c) => {
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
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[data-open]');
      if (a) openFor(document.getElementById((a.getAttribute('href') || '').slice(1)));
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', fromHash); document.removeEventListener('click', onClick); };
  }, []);

  return (
    <div className="cf-top reveal">
      <p className="cf-count" id={countId} aria-live="polite">{count} {count === 1 ? unit[0] : unit[1]}</p>
      <div className="cf-filters" role="group" aria-label={label}>
        {filters.map(([f, text]) => (
          <button key={f} className="cf-f" type="button" data-f={f} aria-pressed={filter === f} onClick={() => apply(f)}>{text}</button>
        ))}
      </div>
    </div>
  );
}
