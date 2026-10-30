import { Fragment } from 'react';
import { Mark, Starburst, SubscribeForm, vars } from './bits';

/* Each tape group has to be wider than any screen (or a gap shows at 2560px), and the track holds two copies so the
   -50% loop is seamless. So: one phrase list, repeated `times` per group, two groups per tape. */
function Tape({ className, phrases, times }: { className: string; phrases: string[]; times: number }) {
  const group = Array.from({ length: times }, () => phrases).flat();
  return (
    <div className={className}><div className="tape-track">
      {[0, 1].map((g) => (
        <div className="tape-g" key={g}>
          {group.map((p, i) => <Fragment key={i}><span>{p}</span><span>✦</span></Fragment>)}
        </div>
      ))}
    </div></div>
  );
}

export function Tapes() {
  return (
    <div className="tapes" aria-hidden="true">
      <Tape className="tape t1" times={2} phrases={['coming soon', 'potholes: getting fixed', 'your spine says thanks', 'coming soon', 'potholes: getting fixed', 'arrive in one piece']} />
      <Tape className="tape t2" times={6} phrases={['shut up pothole', 'shut up ***hole']} />
    </div>
  );
}

export function Receipts() {
  return (
    <section className="sec sec-paper" id="receipts" aria-labelledby="h-rec">
      <div className="wrap">
        <div className="reveal">
          <span className="kicker">the receipts</span>
          <h2 className="h2" id="h-rec">okay, <span className="hi">serious</span> for a sec.</h2>
          <p className="sec-lead">the swerving isn’t a joke. neither are the numbers.</p>
        </div>

        <div className="cards">
          <article className="card c-red reveal" style={vars({ '--r': '-1.5deg', '--d': '0s' })}>
            <div className="n" data-count="2385" aria-label="2,385">2,385</div>
            <p>people died in pothole crashes in India in 2024.</p>
            <p className="src">official MoRTH data · <a href="#src-1">source 1</a></p>
          </article>
          <article className="card c-blue reveal" style={vars({ '--r': '1.2deg', '--d': '.12s' })}>
            <div className="n"><span data-count="53" data-prefix="+" data-suffix="%">+53%</span></div>
            <p>more than in 2020. and it’s gone up every year since 2021.</p>
            <p className="src">1,555 → 2,385 · <a href="#src-2" style={{ color: 'inherit' }}>source 2</a></p>
          </article>
          <article className="card c-pink reveal" style={vars({ '--r': '-1deg', '--d': '.24s' })}>
            <div className="n"><span data-count="6.5" data-decimals="1">6.5</span></div>
            <p>people. every single day.</p>
            <p className="src">2,385 ÷ 366 days · <a href="#src-2" style={{ color: 'inherit' }}>source 2</a></p>
          </article>
        </div>

        <p className="closer reveal">every one of those roads has an owner. <span>time everyone knew who.</span></p>
      </div>
    </section>
  );
}

export function Swerve() {
  return (
    <section className="sec sec-blue" id="swerve" aria-labelledby="h-game">
      <div className="wrap">
        <div className="game-grid">
          <div className="game-copy reveal">
            <div className="chips"><span className="kicker">side quest</span><span className="patch-chip">by Cars24 Patch</span></div>
            <h2 className="h2" id="h-game">swerve practice.</h2>
            <p className="sec-lead">you’ve been doing this daily for years. let’s see the score.</p>
            <div className="game-score" aria-live="polite">
              <span className="pill">dodged <b id="g-score">0</b></span>
              <span className="pill">best <b id="g-best">0</b></span>
            </div>
            <p className="hint">← → or A / D to swerve. on a phone, tap the left or right side.</p>
          </div>

          <div className="reveal" style={vars({ '--d': '.12s' })}>
            <div className="game-frame">
              <canvas id="game" aria-label="Swerve practice: a small game where you steer a scooter between three lanes to dodge potholes." role="img"></canvas>
              <div className="game-ov" id="game-ov">
                <h3 id="ov-title">ready?</h3>
                <p id="ov-sub">three lanes. loads of potholes. zero chill.</p>
                <button className="btn btn-yellow" id="play" type="button">play <span className="arr">↗</span></button>
              </div>
            </div>
            <div className="game-ctl">
              <button className="btn btn-yellow" id="g-left" type="button" aria-label="Swerve left">←</button>
              <button className="btn btn-yellow" id="g-right" type="button" aria-label="Swerve right">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="sec sec-yellow cta" id="subscribe" aria-labelledby="h-cta">
      <div className="cta-sticker" aria-hidden="true"><Starburst fill="#fff" lines={['coming', 'soon']} /></div>
      <div className="wrap">
        <div className="cta-grid">
          <div className="reveal">
            <span className="kicker">don’t miss it</span>
            <h2 className="h2" id="h-cta">potholes: getting fixed.<br /><span className="blue">you: getting notified.</span></h2>
          </div>
          <div className="reveal" style={vars({ '--d': '.12s' })}>
            <SubscribeForm id="final-form" idSuffix="final" source="footer" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function RebBand() {
  return (
    <section className="reb-band" aria-label="A Cars24 Rebellion">
      <div className="wrap">
        <span className="reb-tag reveal">a Cars24 Rebellion</span>
      </div>
    </section>
  );
}

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="logo" href="#top" aria-label="Cars24 Patch — home">
          <Mark />
          <span>Cars24 Patch</span>
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <a className="logo" href="#top" aria-label="Cars24 Patch — back to top">
            <Mark dark={false} />
            <span>Cars24 Patch</span>
          </a>
          <p className="foot-tag">made by people who are tired of swerving.<br /><span className="reb">Cars24 Patch · a Cars24 Rebellion.</span></p>
        </div>

        <div className="src">
          <h2>sources &amp; notes</h2>
          <ol>
            <li id="src-1">Pothole-related deaths, 2020–2024 (1,555 · 1,481 · 1,856 · 2,161 · 2,385): Ministry of Road Transport and Highways data, from the Union Minister’s written reply in Parliament; reported by <a href="https://www.tribuneindia.com/news/uttar-pradesh/pothole-deaths-rise-53-per-cent-in-5-years-up-accounts-for-over-half-of-9400-fatalities" target="_blank" rel="noopener">The Tribune</a>, updated 14 February 2026. Recorded crashes only.</li>
            <li id="src-2">Derived by Cars24 Patch from source 1: +53% = (2,385 − 1,555) ÷ 1,555; 6.5 a day = 2,385 ÷ 366 days (2024 was a leap year).</li>
          </ol>
        </div>

        <div className="foot-b"><span>© 2026 Cars24 Patch. All rights reserved.</span><span>coming soon.</span></div>
      </div>
    </footer>
  );
}
