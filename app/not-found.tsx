import type { Metadata } from 'next';
import { Fragment } from 'react';
import { Mark, vars } from '@/components/home/bits';
import { NotFoundEffects } from '@/components/NotFoundEffects';
import './not-found.css';

export const metadata: Metadata = {
  title: '404 — Cars24 Patch',
  description: 'Cool. Another thing that doesn’t work. Anyway. We’re fixing the roads first.',
  robots: { index: false },
};

const TAPE = Array.from({ length: 3 }, () => ['page not found', 'anyway', '404', 'roads first', 'cool.']).flat();

/* Copy is user-supplied and exact. Do not edit it. Links are absolute: this page is served at any depth. */
export default function NotFound() {
  return (
    <div className="nf">
      <header className="nav">
        <div className="wrap nav-in">
          <a className="logo" href="/" aria-label="Cars24 Patch — home"><Mark /><span>Cars24 Patch</span></a>
          <a className="btn btn-sm" href="/">home <span className="arr">↗</span></a>
        </div>
      </header>

      <main className="nf-stage" id="main">
        <div className="wrap">
          <span className="nf-chip pop" style={vars({ '--d': '.05s' })}>error 404</span>

          <div className="nf-num-wrap" aria-hidden="true">
            <div className="nf-num pop" style={vars({ '--d': '.15s' })}>
              <span className="nf-d">4</span>
              <span className="nf-zero" id="nf-zero">
                <span className="eye l"><i className="pupil"></i></span>
                <span className="eye r"><i className="pupil"></i></span>
                <span className="nf-mouth"></span>
                <span className="nf-fall"><span>🛵</span></span>
              </span>
              <span className="nf-d">4</span>
            </div>
          </div>

          <h1 className="nf-line pop" style={vars({ '--d': '.3s' })}>Cool. Another thing that <span className="hi">doesn’t work.</span></h1>
          <h2 className="nf-sub pop" style={vars({ '--d': '.42s' })}>Anyway. We’re fixing the <span className="squig">roads first.</span></h2>
          <p className="nf-note pop" id="nf-note" aria-hidden="true" style={vars({ '--d': '.55s' })}>(it’s giving pothole.)</p>

          <div className="nf-actions pop" style={vars({ '--d': '.65s' })}>
            <a className="btn btn-back" id="nf-back" href="/"><span className="arr">←</span> Go back</a>
          </div>
        </div>

        <div className="nf-tape" aria-hidden="true"><div className="tape-track">
          {[0, 1].map((g) => (
            <div className="tape-g" key={g}>{TAPE.map((t, i) => <Fragment key={i}><span>{t}</span><span>✦</span></Fragment>)}</div>
          ))}
        </div></div>
      </main>

      <footer className="foot">
        <div className="wrap nf-foot-in">
          <a className="logo" href="/" aria-label="Cars24 Patch — home"><Mark dark={false} /><span>Cars24 Patch</span></a>
          <p>© 2026 Cars24 Patch. All rights reserved.</p>
        </div>
      </footer>
      <NotFoundEffects />
    </div>
  );
}
