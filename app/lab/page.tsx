import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Cta, Footer, RebBand, Receipts, Swerve, Tapes } from '@/components/home/Sections';
import { HomeEffects } from '@/components/home/HomeEffects';
import { vars } from '@/components/home/bits';
import { LabNav } from '@/components/site/LabNav';
import { PageLink } from '@/components/site/SiteNav';
import { MEME_HTML } from './meme';
import '@/components/site/hub.css';

/* The lab's front page, ported from public/lab.html: the homepage (same components, same behaviour script) plus the
   lab nav, the cards that open each lab page (#inside) and the meme break. Experiments go live here first; nothing is
   promoted to the homepage without the owner's OK. Unlisted: noindex. */
export const metadata: Metadata = {
  title: 'Cars24 Patch lab — experiments before they go live',
  description: 'India has swerved, slowed down and suffered enough. So we’re fixing the potholes ourselves. Cars24 Patch, coming soon.',
  robots: { index: false },
  alternates: { canonical: '/lab' },
  openGraph: {
    type: 'website',
    siteName: 'Cars24 Patch',
    title: 'The lab — Cars24 Patch',
    description: 'Experiments before they go live: games, case files and a wall of holes. Not the official homepage.',
  },
  twitter: { card: 'summary' },
};

export default function Lab() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="cursor" id="cursor" aria-hidden="true"></div>
      <LabNav current="/lab" />
      <main id="main">
        <Hero />
        <Tapes />
        <Receipts />

        <section className="sec-upd" id="inside" aria-labelledby="h-in">
          <div className="wrap">
            <div className="upd-head reveal">
              <span className="upd-stamp" aria-hidden="true">a Cars24<br />rebellion</span>
              <div className="upd-chips"><span className="kicker">behind the tape</span><span className="upd-chip">pick a door</span></div>
              <h2 className="h2" id="h-in">while you were swerving, <span className="hi">we were building.</span></h2>
              <p className="sec-lead">we fell into a pothole. it went deeper than expected. this is everything we dragged out.</p>
            </div>

            {/*
              ADD A PAGE: build it in app/<route>/ with <LabNav current="/<route>" /> (see BRAND-GUIDE.md, "Lab pages and the nav"), then add a card here.
              data-s only sets the card colour: found = pink, doing = main colour, next = accent, done = paper.
              Write the card like the wall does: one real image or one twist, not a description of the page.
            */}
            <ul className="in-grid">
              <li className="upd in-card reveal" data-s="doing" style={vars({ '--r': '-.6deg', '--d': '0s' })}>
                <article className="upd-card">
                  <div className="upd-top"><span className="upd-tag">diary</span><span className="upd-sample">draft</span></div>
                  <h3 className="upd-title">the diary.</h3>
                  <p className="upd-sum">dear diary. today we read forty-one pages about bitumen. voluntarily.</p>
                  <p className="in-go"><PageLink className="btn btn-sm" href="/updates">open it <span className="arr">↗</span></PageLink></p>
                </article>
              </li>
              <li className="upd in-card reveal" data-s="found" style={vars({ '--r': '.6deg', '--d': '.08s' })}>
                <article className="upd-card">
                  <div className="upd-top"><span className="upd-tag">library</span><span className="upd-sample">draft</span></div>
                  <h3 className="upd-title">the research.</h3>
                  <p className="upd-sum">we read the boring stuff so you don’t have to. every claim gets a receipt, or gets called out.</p>
                  <p className="in-go"><PageLink className="btn btn-sm" href="/research">open it <span className="arr">↗</span></PageLink></p>
                </article>
              </li>
              <li className="upd in-card reveal" data-s="next" style={vars({ '--r': '-.4deg', '--d': '.16s' })}>
                <article className="upd-card">
                  <div className="upd-top"><span className="upd-tag">evidence</span><span className="upd-sample">draft</span></div>
                  <h3 className="upd-title">case files.</h3>
                  <p className="upd-sum">every idea we tried, including the dumb ones. especially the dumb ones.</p>
                  <p className="in-go"><PageLink className="btn btn-sm" href="/case-files">open it <span className="arr">↗</span></PageLink></p>
                </article>
              </li>
              <li className="upd in-card reveal" data-s="done" style={vars({ '--r': '.5deg', '--d': '.24s' })}>
                <article className="upd-card">
                  <div className="upd-top"><span className="upd-tag">photos</span><span className="upd-sample">draft</span></div>
                  <h3 className="upd-title">the wall of holes.</h3>
                  <p className="upd-sum">biggest ***holes of the year. your ex is nominated too.</p>
                  <p className="in-go"><PageLink className="btn btn-sm" href="/wall-of-holes">open it <span className="arr">↗</span></PageLink></p>
                </article>
              </li>
              <li className="upd in-card reveal" data-s="doing" style={vars({ '--r': '-.7deg', '--d': '.32s' })}>
                <article className="upd-card">
                  <div className="upd-top"><span className="upd-tag">game</span><span className="upd-sample">draft</span></div>
                  <h3 className="upd-title">dodge with your head.</h3>
                  <p className="upd-sum">lean left, lean right, miss the potholes. it’s pretend. the number at the end isn’t.</p>
                  <p className="in-go"><PageLink className="btn btn-sm" href="/dodge">play it <span className="arr">↗</span></PageLink></p>
                </article>
              </li>
              <li className="upd in-card reveal" data-s="found" style={vars({ '--r': '.6deg', '--d': '.4s' })}>
                <article className="upd-card">
                  <div className="upd-top"><span className="upd-tag">game</span><span className="upd-sample">draft</span></div>
                  <h3 className="upd-title">pothole se rishta.</h3>
                  <p className="upd-sum">swipe left to patch. swipe right to regret it. settled hai, kahin nahi jayega.</p>
                  <p className="in-go"><PageLink className="btn btn-sm" href="/rishta">swipe it <span className="arr">↗</span></PageLink></p>
                </article>
              </li>
            </ul>
          </div>
        </section>

        <Swerve />
        <section className="sec-meme" id="meme" aria-labelledby="h-meme" dangerouslySetInnerHTML={{ __html: MEME_HTML }} />
        <Cta />
        <RebBand />
      </main>
      <Footer />
      <HomeEffects />
    </>
  );
}
