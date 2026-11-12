import type { Metadata } from 'next';
import { vars } from '@/components/home/bits';
import { Nav, PageLink } from '@/components/site/SiteNav';
import { PageFooter } from '@/components/site/PageFooter';
import { PageEffects } from '@/components/site/PageEffects';
import { Photo } from '@/components/site/Photo';
import { HOLES } from './holes';
import './wall.css';

/* The wall of holes, ported from public/wall-of-holes.html. The homepage CSS is global, so wall-only classes
   carry the wh- prefix (wall.css). Still a draft: noindex until the wall holds real, permitted photos. */
export const metadata: Metadata = {
  title: 'Biggest ***holes of the year — Cars24 Patch',
  description: 'The nominees for the biggest ***holes of the year: real potholes on real Indian roads. And your ex. Cars24 Patch.',
  robots: { index: false },
  alternates: { canonical: '/wall-of-holes' },
  openGraph: {
    type: 'website',
    siteName: 'Cars24 Patch',
    title: 'Biggest ***holes of the year — Cars24 Patch',
    description: 'The nominees for the biggest ***holes of the year. Real potholes, real Indian roads. And your ex.',
  },
  twitter: { card: 'summary' },
};

/* only https links become links (as before: the CC0 licence page is http, so it stays plain text) */
function Linked({ text, url }: { text: string; url: string }) {
  return /^https:\/\//.test(url) ? <a href={url} target="_blank" rel="noopener noreferrer">{text}</a> : <span>{text}</span>;
}

const EX_ART = '<circle cx="50" cy="38" r="17" fill="#D9D4C7"/><path d="M16 92c0-20 15-32 34-32s34 12 34 32z" fill="#D9D4C7"/><circle cx="50" cy="50" r="41" fill="none" stroke="#FF2D2D" stroke-width="7"/><path d="M21 79L79 21" stroke="#FF2D2D" stroke-width="7" stroke-linecap="round"/>';

export default function WallOfHoles() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current="/wall-of-holes" />

      <main id="main">
        <section className="wh-hero" aria-labelledby="h1">
          <div className="wrap">
            <div className="wh-chips pop"><span className="wh-chip">2026 edition</span><span className="wh-chip alt">your ex is nominated too</span></div>
            <h1 className="wh-h1 pop" id="h1" style={vars({ '--d': '.15s' })}>
              <span className="sr-only">Biggest potholes of the year</span>
              <span aria-hidden="true">biggest <span className="wh-nb"><span className="censor" id="censor"><span className="face stars">***</span><span className="face pot">pot</span></span>holes</span> <span className="hi">of the year.</span></span>
            </h1>
            <p className="wh-lead pop" style={vars({ '--d': '.3s' })}>the nominees are in. real potholes on real Indian roads. and, obviously, your ex.</p>
          </div>
        </section>

        <section className="wh-wall" aria-labelledby="h-wall">
          <div className="wrap">
            <div className="wh-head reveal">
              <div>
                <span className="kicker">the nominees</span>
                <h2 className="h2" id="h-wall">meet the <span className="hi">holes.</span></h2>
              </div>
              <p className="sec-lead">tap a name under a photo to see the original. your ex needs no introduction.</p>
            </div>
            <ul className="wh-grid" id="wall">
              {HOLES.map((h, i) => (
                <li key={i} className={'wh-tile reveal' + (h.ex ? ' wh-tile-ex' : '')}
                  style={vars({ '--r': h.ex ? '0deg' : ((((i * 7) % 5) - 2) * 1.2) + 'deg', '--tr': ((((i * 3) % 5) - 2) * 2) + 'deg', '--d': ((i % 3) * 0.08) + 's' })}>
                  {h.ex ? (
                    <div className="wh-tile-ph wh-blank" role="img" aria-label="A blank profile picture with a block sign over it, stamped unfixable: your ex">
                      <svg viewBox="0 0 100 100" aria-hidden="true" dangerouslySetInnerHTML={{ __html: EX_ART }} />
                      <span className="wh-stamp wh-no">unfixable</span>
                    </div>
                  ) : (
                    <div className="wh-tile-ph">
                      <Photo file={h.file} src={h.src} alt={h.alt} />
                      {h.fixed && <span className="wh-stamp">fixed</span>}
                    </div>
                  )}
                  <div className="wh-tile-meta">
                    <span className="wh-tile-city">{(h.ex ? 'your ex' : h.place).toLowerCase()}</span>
                    {h.ex && <span className="wh-tile-by">the other kind of ***hole</span>}
                  </div>
                  {h.ex ? (
                    <p className="wh-tile-credit">photo: deleted. we don’t talk about them.</p>
                  ) : (
                    <p className="wh-tile-credit">photo: <Linked text={h.by} url={h.link} /> · <Linked text={h.lic} url={h.licUrl} /></p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec wh-how" aria-labelledby="h-how">
          <div className="wrap">
            <div className="reveal">
              <span className="kicker">how to get nominated</span>
              <h2 className="h2" id="h-how">snap. pin. <span className="hi">fixed.</span></h2>
            </div>
            <ol className="wh-steps">
              <li className="wh-step reveal" style={vars({ '--r': '-1.2deg', '--d': '0s' })}><span className="wh-step-n">01</span><h3>snap it. safely.</h3><p>stand on the footpath or somewhere safe. get the pothole and a bit of the road in the frame. daylight helps.</p></li>
              <li className="wh-step reveal" style={vars({ '--r': '1deg', '--d': '.12s' })}><span className="wh-step-n">02</span><h3>we pin it.</h3><p>it goes on the wall with the city it’s from, and your handle if you want one.</p></li>
              <li className="wh-step reveal" style={vars({ '--r': '-.8deg', '--d': '.24s' })}><span className="wh-step-n">03</span><h3>watch it get fixed.</h3><p>when one gets repaired, its tile gets a FIXED stamp. that’s the whole point.</p></li>
            </ol>
          </div>
        </section>

        <section className="sec wh-safe" aria-labelledby="h-safe">
          <div className="wrap">
            <div className="wh-safe-card reveal">
              <span className="kicker">read this first</span>
              <h2 className="h2" id="h-safe">no heroics. <span className="hi">footpath only.</span></h2>
              <ul className="wh-safe-list">
                <li>stay on the footpath or another safe spot. never stand or stop on the road.</li>
                <li>never take the photo while you’re driving or riding. a friend or passenger does it.</li>
                <li>daylight, no rush hour, and nobody (especially kids) near moving traffic.</li>
                <li>keep other people’s faces and number plates out of the shot.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sec wh-cta" aria-labelledby="h-cta">
          <div className="wrap wh-cta-grid">
            <div className="reveal">
              <span className="kicker">got a bigger one?</span>
              <h2 className="h2" id="h-cta">nominations open <span className="hi">soon.</span></h2>
              <p className="sec-lead">drop your email on the homepage and we’ll tell you the day nominations open.</p>
              <p className="wh-cta-btn"><PageLink className="btn" href="/#subscribe">get notified <span className="arr">↗</span></PageLink></p>
            </div>
            <div className="wh-credit reveal" style={vars({ '--d': '.12s' })}>
              <h3>about the photos</h3>
              <p>the photos here are openly licensed (from Wikimedia Commons), credited under each tile and cropped to fit. photos you send in only go up with your permission.</p>
              {/* TAKEDOWN LINE hidden on purpose until there is a contact email. When there is one, add this sentence back
                  to the paragraph above: "want one off the wall? tell us and it comes down." and add
                  <p className="wh-credit-mail">the address</p> here. */}
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
      <PageEffects />
    </>
  );
}
