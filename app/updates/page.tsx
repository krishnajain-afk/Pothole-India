import type { Metadata } from 'next';
import { vars } from '@/components/home/bits';
import { Nav, PageLink } from '@/components/site/SiteNav';
import { PageFooter } from '@/components/site/PageFooter';
import { PageEffects } from '@/components/site/PageEffects';
import { HubFilters } from '@/components/site/HubFilters';
import '@/components/site/hub.css';

/* The diary (updates & journey), ported from public/updates.html. Styles: components/site/hub.css (shared with case
   files and, once ported, the research library). Still a draft: noindex until the entries are reviewed and approved. */
export const metadata: Metadata = {
  title: 'Updates & journey — Cars24 Patch',
  description: 'Dear ***hole: the Cars24 Patch diary. Everything we’ve done on the way to fixing potholes ourselves, dumb bits included.',
  robots: { index: false },
  alternates: { canonical: '/updates' },
  openGraph: {
    type: 'website',
    siteName: 'Cars24 Patch',
    title: 'Updates & journey — Cars24 Patch',
    description: 'Dear ***hole: the Cars24 Patch diary. Everything we’ve done on the way to fixing potholes ourselves, dumb bits included.',
  },
  twitter: { card: 'summary' },
};

const TOTAL = 6;   // the number of updates in the feed (the count shown before any filter)
const FILTERS: [string, string][] = [['all', 'all'], ['research', 'research'], ['field', 'field visits'], ['experiment', 'experiments'], ['milestone', 'milestones']];

export default function Updates() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current="/updates" />

      <main id="main">
        <section className="cfp-hero" aria-labelledby="h1">
          <div className="wrap">
            <div className="cfp-chips pop"><span className="cfp-chip">the diary</span><span className="cfp-chip alt">draft</span></div>
            <h1 className="cfp-h1 pop" id="h1" style={vars({ '--d': '.15s' })}><span className="sr-only">Dear pothole,</span><span aria-hidden="true">dear <span className="nb"><span className="censor" id="censor"><span className="face stars">***</span><span className="face pot">pot</span></span>hole,</span></span></h1>
            <p className="cfp-lead pop" style={vars({ '--d': '.3s' })}>the potholes are winning. for now. this is us keeping score.</p>
          </div>
        </section>

        <section className="sec-upd cfp-body" id="updates" aria-labelledby="h-upd">
          <div className="wrap">
            <h2 className="sr-only" id="h-upd">The road to launch and what just happened</h2>
            <nav className="hub-nav reveal" aria-label="On this page">
              <a href="#journey">are we there yet?</a>
              <a href="#updates-feed">plot twists</a>
              <PageLink href="/research">research ↗</PageLink>
              <PageLink href="/case-files">case files ↗</PageLink>
            </nav>

            {/*
              THIS PAGE HAS TWO PARTS, AND IT GROWS WHENEVER WE HAVE SOMETHING:
                1. are we there yet? (#journey)       6 steps. data-s = done | doing | next. Each step links to an update, a case file or the research.
                2. plot twists       (#updates-feed)  dated cards, newest first. To add one: copy an <li className="upd reveal"> block, paste it at
                                                      the TOP of the feed and raise TOTAL. Set data-type to research | field | experiment | milestone:
                                                      it drives the filter chips. One event per card, with one real detail or twist in the summary.
              Where things go: an event goes here, a lesson goes in app/case-files/page.tsx, the evidence itself on the research page.
              Never publish names or contact details of officials, scientists or companies, costs or quotes, or plans we haven't finalised.
              Link to a case file with <PageLink href="/case-files#cf-01">: it opens that card. <a href="#u-list" data-open=""> opens a card here.
              Entries marked "draft" are written from what actually happened. Check the wording, then delete the draft chip.
              Never add numbers, findings or activities that did not happen.
            */}

            {/* 1. THE ROAD TO LAUNCH */}
            <div className="hub-block" id="journey">
              <div className="hub-bh reveal"><h3 className="hub-h">are we there yet?</h3><span className="hub-goal">destination: launch · eta: soon</span><span className="hub-draft">draft steps</span></div>
              <div className="jr-bar" aria-hidden="true"><i data-s="done"></i><i data-s="done"></i><i data-s="done"></i><i data-s="doing"></i><i data-s="next"></i><i data-s="next"></i></div>
              <ol className="jr">
                <li className="jr-step reveal" data-s="done" style={vars({ '--r': '-1deg', '--d': '0s' })}>
                  <span className="jr-n">step 01</span><span className="jr-tag">done</span>
                  <h4 className="jr-t">read the receipts</h4>
                  <p>the official numbers, 2020 to 2024. then the sums, with our working shown. nobody trusts a number that won’t show its working.</p>
                  <p className="jr-l"><PageLink href="/case-files#cf-01">case file 01 →</PageLink></p>
                </li>
                <li className="jr-step reveal" data-s="done" style={vars({ '--r': '.8deg', '--d': '.08s' })}>
                  <span className="jr-n">step 02</span><span className="jr-tag">done</span>
                  <h4 className="jr-t">hang the sign</h4>
                  <p>this site, a sign-up list and a 404 page with opinions. all live. you’re standing in it.</p>
                  <p className="jr-l"><a href="#u-list" data-open="">the update →</a></p>
                </li>
                <li className="jr-step reveal" data-s="done" style={vars({ '--r': '-.6deg', '--d': '.16s' })}>
                  <span className="jr-n">step 03</span><span className="jr-tag">done</span>
                  <h4 className="jr-t">nerd out, properly</h4>
                  <p>forty-one pages on how roads fall apart. then a trip to a road lab to watch a pothole machine at work. we took notes. a concerning amount of notes.</p>
                  <p className="jr-l"><PageLink href="/research">the research ↗</PageLink> <PageLink href="/case-files#cf-04">04 →</PageLink> <PageLink href="/case-files#cf-05">05 →</PageLink></p>
                </li>
                <li className="jr-step reveal" data-s="doing" style={vars({ '--r': '1deg', '--d': '.24s' })}>
                  <span className="jr-n">step 04</span><span className="jr-tag">doing</span>
                  <h4 className="jr-t">break things on purpose</h4>
                  <p>a wall of potholes, a swerve game, a game you steer with your head. and asking people for real photos, politely. still finding out which ideas are dumb.</p>
                  <p className="jr-l"><PageLink href="/case-files#cf-02">case file 02 →</PageLink> <PageLink href="/case-files#cf-03">03 →</PageLink></p>
                </li>
                <li className="jr-step reveal" data-s="next" style={vars({ '--r': '-.8deg', '--d': '.32s' })}>
                  <span className="jr-n">step 05</span><span className="jr-tag">next</span>
                  <h4 className="jr-t">fix one. then check it stays fixed.</h4>
                  <p>a real road, the permission in writing, and someone with no stake in it checking months later if the patch is still there. filling a hole is easy. staying filled is the whole game.</p>
                  <p className="jr-l"><PageLink href="/research#test">how a fair test works →</PageLink></p>
                </li>
                <li className="jr-step reveal" data-s="next" style={vars({ '--r': '.6deg', '--d': '.4s' })}>
                  <span className="jr-n">step 06</span><span className="jr-tag">next</span>
                  <h4 className="jr-t">launch</h4>
                  <p>the day we start fixing for real, and the list gets its email. date: soon. we know. we know.</p>
                  <p className="jr-l"><PageLink href="/#subscribe">get on the list ↗</PageLink></p>
                </li>
              </ol>
            </div>

            {/* 2. LATEST UPDATES */}
            <div className="hub-block" id="updates-feed">
              <div className="hub-bh reveal"><h3 className="hub-h">plot twists</h3><span className="hub-draft">newest first</span></div>
              <HubFilters cards=".upd-feed > .upd" filters={FILTERS} unit={['update', 'updates']} countId="uf-count" label="Filter the updates" total={TOTAL} />
              <ol className="upd-feed">

                {/* date is month-only until the exact day is confirmed */}
                <li className="upd reveal" id="u-research" data-s="found" data-type="research" style={vars({ '--r': '-.6deg', '--d': '0s' })}>
                  <div className="upd-when"><time className="upd-date" dateTime="2026-10">oct<br />2026</time></div>
                  <article className="upd-card" aria-labelledby="u-research-t">
                    <div className="upd-top"><span className="upd-tag">found</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="u-research-t">we read forty-one pages about potholes. on purpose.</h3>
                    <p className="upd-sum">about fifteen ways to fix one. zero independent studies in India on how long any of them last. that zero is the headline.</p>
                    <details>
                      <summary><span className="w-closed">the details</span><span className="w-open">close it</span></summary>
                      <div className="upd-body">
                        <p>the short version: it’s mostly water, and nobody is counting which repairs survive. the long version is on the research page.</p>
                        <p>every claim wears a stamp that says how much weight it can carry. some say established. some say claim. a worrying number say not found.</p>
                        <p className="cf-links"><PageLink href="/research">read the research ↗</PageLink> · <PageLink href="/case-files#cf-04">case file 04 →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd reveal" id="u-visit" data-s="done" data-type="field" style={vars({ '--r': '.6deg', '--d': '.08s' })}>
                  <div className="upd-when"><time className="upd-date" dateTime="2026-10">oct<br />2026</time></div>
                  <article className="upd-card" aria-labelledby="u-visit-t">
                    <div className="upd-top"><span className="upd-tag">done</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="u-visit-t">we met a pothole machine. it was busy.</h3>
                    <p className="upd-sum">a government road lab, a machine filling holes, and us with too many questions. everything they told us is stamped “told to us”, because hearing isn’t testing.</p>
                    <details>
                      <summary><span className="w-closed">the details</span><span className="w-open">close it</span></summary>
                      <div className="upd-body">
                        <p>we visited a government road research lab and watched a pothole-repair machine work. the scientists told us where it works and where it doesn’t. honestly the most useful sentence anyone has said to us about a pothole fix.</p>
                        <p>everything we heard is marked “told to us”, not “tested by us”. the lessons are in case file 05.</p>
                        <p className="cf-links"><PageLink href="/case-files#cf-05">case file 05 →</PageLink> · <PageLink href="/research">the research ↗</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd reveal" id="u-dodge" data-s="doing" data-type="experiment" style={vars({ '--r': '-.8deg', '--d': '0s' })}>
                  <div className="upd-when"><time className="upd-date" dateTime="2026-10-22">22 oct<br />2026</time></div>
                  <article className="upd-card" aria-labelledby="u-dodge-t">
                    <div className="upd-top"><span className="upd-tag">doing</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="u-dodge-t">your head is now a steering wheel.</h3>
                    <p className="upd-sum">lean left, lean right, miss the pothole. it’s a game, so it’s pretend. the number at the end isn’t.</p>
                    <details>
                      <summary><span className="w-closed">the details</span><span className="w-open">close it</span></summary>
                      <div className="upd-body">
                        <p>it runs in your browser. your camera feed never leaves your device: nothing is recorded or uploaded, and it switches off when you leave.</p>
                        <p>still testing. play sitting or standing still, indoors. never while walking, riding or driving. the potholes in the game are fake. the ones outside aren’t.</p>
                        <p className="cf-links"><PageLink href="/case-files#cf-03">case file 03 →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd reveal" id="u-wall" data-s="doing" data-type="experiment" style={vars({ '--d': '.08s' })}>
                  <div className="upd-when"><time className="upd-date" dateTime="2026-10-16">16 oct<br />2026</time></div>
                  <article className="upd-card" aria-labelledby="u-wall-t">
                    <div className="upd-top"><span className="upd-tag">doing</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="u-wall-t">potholes got their own awards show.</h3>
                    <p className="upd-sum">eight real potholes from six places in India, every photo credited. plus one nominee with no photo: your ex.</p>
                    <details>
                      <summary><span className="w-closed">the details</span><span className="w-open">close it</span></summary>
                      <div className="upd-body">
                        <p>every photo is openly licensed and credited under its tile. nothing lifted from google or instagram. photos you send in only go up if you say yes.</p>
                        <p className="cf-links"><PageLink href="/wall-of-holes">see the wall ↗</PageLink> · <PageLink href="/case-files#cf-02">case file 02 →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd reveal" id="u-found" data-s="found" data-type="research" style={vars({ '--d': '.16s' })}>
                  <div className="upd-when"><time className="upd-date" dateTime="2026-10-01">1 oct<br />2026</time></div>
                  <article className="upd-card" aria-labelledby="u-found-t">
                    <div className="upd-top"><span className="upd-tag">found</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="u-found-t">it’s getting worse, not better.</h3>
                    <p className="upd-sum">pothole deaths have gone up every year since 2021. <span className="nw">1,555 → 2,385.</span></p>
                    <details>
                      <summary><span className="w-closed">the details</span><span className="w-open">close it</span></summary>
                      <div className="upd-body">
                        <p>okay, serious for a sec. the official count of pothole-related deaths, 2020 to 2024. every number below is Ministry of Road Transport and Highways data.</p>
                        <ul className="upd-nums" aria-label="Pothole deaths by year">
                          <li><b>2020</b>1,555</li><li><b>2021</b>1,481</li><li><b>2022</b>1,856</li><li><b>2023</b>2,161</li><li><b>2024</b>2,385</li>
                        </ul>
                        <p>that’s <strong>+53%</strong> in four years. about <strong>6.5 people a day</strong> in 2024. and that’s only the crashes somebody wrote down.</p>
                        <p className="upd-src">source: MoRTH data from the Union Minister’s written reply in Parliament, reported by The Tribune · <a href="#src-1">source 1</a></p>
                        <p className="cf-links"><PageLink href="/case-files#cf-01">case file 01 →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd reveal" id="u-list" data-s="done" data-type="milestone" style={vars({ '--d': '.24s' })}>
                  <div className="upd-when"><time className="upd-date" dateTime="2026-10-01">1 oct<br />2026</time></div>
                  <article className="upd-card" aria-labelledby="u-list-t">
                    <div className="upd-top"><span className="upd-tag">done</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="u-list-t">the list is open. no bouncer.</h3>
                    <p className="upd-sum">drop your email. you hear first when we start fixing. no spam.</p>
                    <details>
                      <summary><span className="w-closed">the details</span><span className="w-open">close it</span></summary>
                      <div className="upd-body">
                        <p>the sign-up form on the homepage is live. add your email and we’ll tell you the day we start fixing.</p>
                        <p><PageLink href="/#subscribe">jump to the form ↗</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

              </ol>
            </div>

            {/* 3. WHERE NEXT */}
            <div className="hub-block" id="more">
              <div className="hub-bh reveal"><h3 className="hub-h">more behind the tape</h3></div>
              <p className="more-go reveal">
                <PageLink className="btn btn-sm btn-yellow" href="/research">the research <span className="arr">↗</span></PageLink>
                <PageLink className="btn btn-sm btn-yellow" href="/case-files">all case files <span className="arr">↗</span></PageLink>
                <PageLink className="btn btn-sm btn-yellow" href="/wall-of-holes">the wall of holes <span className="arr">↗</span></PageLink>
              </p>
            </div>
          </div>
        </section>
      </main>

      <PageFooter>
        <div className="src">
          <h2>sources &amp; notes</h2>
          <ol>
            <li id="src-1">Pothole-related deaths, 2020–2024 (1,555 · 1,481 · 1,856 · 2,161 · 2,385): Ministry of Road Transport and Highways data, from the Union Minister’s written reply in Parliament; reported by <a href="https://www.tribuneindia.com/news/uttar-pradesh/pothole-deaths-rise-53-per-cent-in-5-years-up-accounts-for-over-half-of-9400-fatalities" target="_blank" rel="noopener">The Tribune</a>, updated 14 February 2026. Recorded crashes only.</li>
            <li id="src-2">Derived by Cars24 Patch from source 1: +53% = (2,385 − 1,555) ÷ 1,555; 6.5 a day = 2,385 ÷ 366 days (2024 was a leap year).</li>
          </ol>
        </div>
      </PageFooter>
      <PageEffects />
    </>
  );
}
