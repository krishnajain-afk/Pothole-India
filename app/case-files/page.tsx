import type { Metadata } from 'next';
import { vars } from '@/components/home/bits';
import { Nav, PageLink } from '@/components/site/SiteNav';
import { PageFooter } from '@/components/site/PageFooter';
import { PageEffects } from '@/components/site/PageEffects';
import { HubFilters } from '@/components/site/HubFilters';
import '@/components/site/hub.css';

/* The case files, ported from public/case-files.html. Styles: components/site/hub.css (shared with the diary and the
   research library once they are ported). Still a draft: noindex until the case files are reviewed and approved. */
export const metadata: Metadata = {
  title: 'Case files — Cars24 Patch',
  description: 'The ***hole files: every idea Cars24 Patch tried on the way to fixing potholes ourselves. The failures stay in.',
  robots: { index: false },
  alternates: { canonical: '/case-files' },
  openGraph: {
    type: 'website',
    siteName: 'Cars24 Patch',
    title: 'Case files — Cars24 Patch',
    description: 'Every idea we tried on the way to fixing potholes ourselves. The failures stay in.',
  },
  twitter: { card: 'summary' },
};

const TOTAL = 5;   // the number of case files below (the count shown before any filter)
const FILTERS: [string, string][] = [['all', 'all'], ['study', 'studies'], ['experiment', 'experiments'], ['landing', 'landings']];

export default function CaseFiles() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current="/case-files" />

      <main id="main">
        <section className="cfp-hero" aria-labelledby="h1">
          <div className="wrap">
            <div className="cfp-chips pop"><span className="cfp-chip">the truth is down there</span><span className="cfp-chip alt">draft</span></div>
            <h1 className="cfp-h1 pop" id="h1" style={vars({ '--d': '.15s' })}><span className="sr-only">The pothole files.</span><span aria-hidden="true">the <span className="nb"><span className="censor" id="censor"><span className="face stars">***</span><span className="face pot">pot</span></span>hole</span> <span className="hi">files.</span></span></h1>
            <p className="cfp-lead pop" style={vars({ '--d': '.3s' })}>every idea we tried, filed. the good ones, the dumb ones, and the one where a missing letter made us look ridiculous.</p>
          </div>
        </section>

        <section className="sec-upd cfp-body" id="case-files" aria-labelledby="h-cfl">
          <div className="wrap">
            <h2 className="sr-only" id="h-cfl">All case files</h2>
            {/*
              ADD A CASE FILE: copy the last <li className="upd cfile reveal" ...> block and paste it below, then:
                id        cf-06, cf-07 ... (links like /case-files#cf-06 open that card)
                data-type study | experiment | landing (space separated) drives the filter chips; update TOTAL above
                data-s    found | doing | done | next (sets the colour)
              Keep every number and finding real, with a source. Entries marked "draft" are wording written from what happened.
              The four parts are always: the hunch / what we tried / what turned up / what it taught us.
            */}
            <HubFilters cards=".cf-grid > .cfile" filters={FILTERS} unit={['case file', 'case files']} countId="cf-count" label="Filter the case files" total={TOTAL} />
            <ul className="cf-grid">

                <li className="upd cfile reveal" id="cf-01" data-type="study" data-s="found" style={vars({ '--r': '-.6deg', '--d': '0s' })}>
                  <article className="upd-card" aria-labelledby="cf-01-t">
                    <div className="upd-top"><span className="upd-tag">study</span><span className="cf-no">case file 01</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="cf-01-t">2,385 people. one table.</h3>
                    <p className="upd-sum">we went looking for one number. we found five years of them, and a gap nobody counts.</p>
                    <details>
                      <summary><span className="w-closed">open the file</span><span className="w-open">shut it</span></summary>
                      <div className="upd-body">
                        <div className="cf-sec"><h5>the hunch</h5><p>everyone agrees potholes are bad. “bad” isn’t a number. we wanted the real one: how many people die in pothole crashes in India, and is it getting better?</p></div>
                        <div className="cf-sec"><h5>what we tried</h5><p>found the official figures for 2020–2024 (Ministry of Road Transport and Highways, from the Union Minister’s written reply in Parliament, reported by The Tribune, updated 14 February 2026). then did the sums ourselves and put the working in the footer, so you don’t have to take our word for it.</p></div>
                        <div className="cf-sec"><h5>what turned up</h5>
                          <div className="cf-bars" role="img" aria-label="Pothole deaths by year: 2020, 1,555. 2021, 1,481. 2022, 1,856. 2023, 2,161. 2024, 2,385.">
                            <div className="cf-bar"><b>1,555</b><i style={vars({ '--h': '78px' })}></i><span>2020</span></div>
                            <div className="cf-bar"><b>1,481</b><i style={vars({ '--h': '74px' })}></i><span>2021</span></div>
                            <div className="cf-bar"><b>1,856</b><i style={vars({ '--h': '93px' })}></i><span>2022</span></div>
                            <div className="cf-bar"><b>2,161</b><i style={vars({ '--h': '109px' })}></i><span>2023</span></div>
                            <div className="cf-bar"><b>2,385</b><i style={vars({ '--h': '120px' })}></i><span>2024</span></div>
                          </div>
                          <ul className="upd-nums" aria-label="Key figures">
                            <li><b>+53%</b>2020 → 2024</li><li><b>6.5</b>people a day in 2024</li><li><b>9,438</b>in five years</li><li><b>~1.2%</b>of road deaths (2023)</li>
                          </ul>
                        </div>
                        <div className="cf-sec"><h5>what it taught us</h5>
                          <ol className="cf-learn">
                            <li>it’s not a blip. it has gone up every year since 2021.</li>
                            <li>a pothole death only counts if somebody writes it down. the number is the written-down ones. anything that never made it onto paper isn’t in there.</li>
                            <li>a number hits harder when you can see the sum behind it. so every figure we worked out has its working at the bottom of the page. receipts, remember?</li>
                          </ol>
                        </div>
                        <p className="upd-src">source: MoRTH data, via the Union Minister’s written reply in Parliament; reported by The Tribune · <a href="#src-1">source 1</a> · <a href="#src-2">source 2</a></p>
                        <p className="cf-links"><PageLink href="/#receipts">see it on the homepage ↗</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd cfile reveal" id="cf-02" data-type="experiment landing" data-s="doing" style={vars({ '--r': '.6deg', '--d': '.1s' })}>
                  <article className="upd-card" aria-labelledby="cf-02-t">
                    <div className="upd-top"><span className="upd-tag">experiment</span><span className="upd-tag alt">landing</span><span className="cf-no">case file 02</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="cf-02-t">the wall of holes.</h3>
                    <p className="upd-sum">what if potholes got famous instead of ignored?</p>
                    <details>
                      <summary><span className="w-closed">open the file</span><span className="w-open">shut it</span></summary>
                      <div className="upd-body">
                        <div className="cf-sec"><h5>the hunch</h5><p>we’ve all stopped noticing potholes. could a joke make people look again, and then look at the numbers?</p></div>
                        <div className="cf-sec"><h5>what we tried</h5><p>built an awards wall: “biggest ***holes of the year”. real potholes from real Indian roads, every photo credited. one nominee has no photo and a blocked profile picture: your ex.</p></div>
                        <div className="cf-sec"><h5>what turned up</h5>
                          <ul className="upd-nums" aria-label="The wall in numbers">
                            <li><b>8</b>photos</li><li><b>6</b>places</li><li><b>3</b>licences</li><li><b>1</b>ex. photo: deleted.</li>
                          </ul>
                        </div>
                        <div className="cf-sec"><h5>what it taught us</h5>
                          <ol className="cf-learn">
                            <li>google images and instagram were out. those photos belong to whoever took them, and plenty show somebody’s face or number plate. so every photo here is openly licensed (Wikimedia Commons) and credited.</li>
                            <li>a blank frame isn’t a joke. it’s a blank frame. “your ex” only worked once it had a blocked profile picture, an UNFIXABLE stamp and the line “the other kind of ***hole”.</li>
                            <li>one clipped letter flips a joke. on small screens our UNFIXABLE stamp got cut off and read FIXABLE. the opposite joke, on a page about fixing things. it now shrinks with its tile.</li>
                            <li>safety is the one thing we won’t joke about. footpath only. never in traffic. never while driving.</li>
                          </ol>
                        </div>
                        <p className="cf-links"><PageLink href="/wall-of-holes">see the wall ↗</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd cfile reveal" id="cf-03" data-type="experiment landing" data-s="doing" style={vars({ '--r': '-.4deg', '--d': '.2s' })}>
                  <article className="upd-card" aria-labelledby="cf-03-t">
                    <div className="upd-top"><span className="upd-tag">experiment</span><span className="upd-tag alt">landing</span><span className="cf-no">case file 03</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="cf-03-t">dodge with your head.</h3>
                    <p className="upd-sum">can a game make you feel a pothole before you read the number?</p>
                    <details>
                      <summary><span className="w-closed">open the file</span><span className="w-open">shut it</span></summary>
                      <div className="upd-body">
                        <div className="cf-sec"><h5>the hunch</h5><p>numbers are easy to scroll past. a pothole you just hit is not. we wanted the hit first and the number second.</p></div>
                        <div className="cf-sec"><h5>what we tried</h5><p>built a game that runs in your browser. your camera is the road. lean your head to switch between three lanes of potholes. hit one and the screen says “that was pretend.” then it shows 2,385, and “people it wasn’t.”</p></div>
                        <div className="cf-sec"><h5>what turned up</h5>
                          <ul className="upd-nums" aria-label="The game in numbers">
                            <li><b>3</b>lanes</li><li><b>478</b>face points tracked</li><li><b>~30</b>checks a second</li><li><b>0</b>video uploaded</li>
                          </ul>
                        </div>
                        <div className="cf-sec"><h5>what it taught us</h5>
                          <ol className="cf-learn">
                            <li>our first face tracker was jumpy: a 12 px head move read as about 25 px, so half-leans got lost. a sharper one that tracks 478 points on your face fixed it.</li>
                            <li>your head tilts when you lean, so we count the tilt too. a tiny wobble is ignored, so it won’t swerve you.</li>
                            <li>people slouch. the game’s idea of “straight” slowly follows you as you shift in your seat.</li>
                            <li>your camera stays your camera. nothing is recorded or uploaded, and it switches off when you leave.</li>
                            <li>safety, again: play sitting still, indoors. never while walking, riding or driving. the fake potholes are the safe ones.</li>
                          </ol>
                        </div>
                        <p className="cf-links"><PageLink href="/updates#u-dodge">the update →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd cfile reveal" id="cf-04" data-type="study" data-s="found" style={vars({ '--r': '.5deg', '--d': '.3s' })}>
                  <article className="upd-card" aria-labelledby="cf-04-t">
                    <div className="upd-top"><span className="upd-tag">study</span><span className="cf-no">case file 04</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="cf-04-t">the comeback nobody asked for.</h3>
                    <p className="upd-sum">it’s mostly water. and, as far as we can find, nobody in India has measured how long the fixes last.</p>
                    <details>
                      <summary><span className="w-closed">open the file</span><span className="w-open">shut it</span></summary>
                      <div className="upd-body">
                        <div className="cf-sec"><h5>the hunch</h5><p>same hole. same spot. again. like a sequel nobody ordered. we wanted to know why it keeps coming back, and what would make a fix stick.</p></div>
                        <div className="cf-sec"><h5>what we tried</h5><p>read everything we could get: Indian road codes and court orders, government data, international field studies, academic research and city reporting. every claim got a source and a stamp: established, corroborated, single source, claim, inference or not found.</p></div>
                        <div className="cf-sec"><h5>what turned up</h5>
                          <ul className="upd-nums" aria-label="The research in numbers">
                            <li><b>~15</b>ways to repair a pothole</li><li><b>85%</b>of patches survived at dry sites (US and Canada, ~1,250 patches)</li><li><b>48%</b>survived at wet sites</li><li><b>0</b>independent Indian studies on how long repairs last. we looked.</li>
                          </ul>
                        </div>
                        <div className="cf-sec"><h5>what it taught us</h5>
                          <ol className="cf-learn">
                            <li>it’s water. it gets in through cracks, loosens the bitumen, and passing tyres pump it in and out until the road falls apart. as one Indian engineer put it: drainage, drainage, drainage.</li>
                            <li>a patch on a wet base is a plug sitting on nothing. the Indian Roads Congress itself says treating the surface of a structural failure “doesn’t last long”.</li>
                            <li>the method’s name matters less than the weather and the prep. in the biggest controlled study, patches at wet sites survived 48% of the time. at dry sites, 85%.</li>
                            <li>five things decide whether a patch lasts: preparation, the bond at the edge, the material, compaction and what’s underneath. they all matter.</li>
                            <li>“works in water, ready in 10 minutes” is a claim, not a result. “open to traffic” isn’t “fully cured”, and none of the instant mixes we found has independent Indian survival data.</li>
                            <li>the repair figures we found count holes filled. we couldn’t find any that counted holes that stayed filled. that gap is the finding.</li>
                          </ol>
                        </div>
                        <div className="cf-sec"><h5>what we couldn’t find</h5>
                          <ul className="cf-learn cf-miss">
                            <li>how long a patch lasts in monsoon rain, on a steep slope, or above 40 °C.</li>
                            <li>independent tests of any Indian “instant” mix.</li>
                            <li>how often Indian potholes are structural.</li>
                            <li>a pothole death count that isn’t a floor: some states report none at all.</li>
                          </ul>
                        </div>
                        <p className="upd-src">sources and stamps for every claim are on <PageLink href="/research">the research page</PageLink>.</p>
                        <p className="cf-links"><PageLink href="/research">read the research ↗</PageLink> · <PageLink href="/updates#u-research">the update →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

                <li className="upd cfile reveal" id="cf-05" data-type="study" data-s="done" style={vars({ '--r': '-.5deg', '--d': '.4s' })}>
                  <article className="upd-card" aria-labelledby="cf-05-t">
                    <div className="upd-top"><span className="upd-tag">study</span><span className="upd-tag alt">field visit</span><span className="cf-no">case file 05</span><span className="upd-sample">draft</span></div>
                    <h3 className="upd-title" id="cf-05-t">we met a pothole machine.</h3>
                    <p className="upd-sum">a government road lab, one machine, and the question every fix should be asked: where doesn’t it work?</p>
                    <details>
                      <summary><span className="w-closed">open the file</span><span className="w-open">shut it</span></summary>
                      <div className="upd-body">
                        <div className="cf-sec"><h5>the hunch</h5><p>a lot of people sell a pothole fix. what does one actually look like, and where does it stop working?</p></div>
                        <div className="cf-sec"><h5>what we tried</h5><p>visited a government road research lab, watched a pothole-repair machine at work, and talked to the scientists behind it.</p></div>
                        <div className="cf-sec"><h5>what turned up</h5>
                          <ul className="cf-told" aria-label="What we were told, and how it stacks up">
                            <li>about 9 in 10 paved roads in India are bituminous (asphalt), not concrete, and concrete roads fail differently.<span className="stamps"><span className="stamp" data-k="told">told to us</span> <span className="stamp" data-k="corroborated">our research agrees</span></span></li>
                            <li>a proper repair has five or six steps, not one.<span className="stamps"><span className="stamp" data-k="told">told to us</span> <span className="stamp" data-k="corroborated">our research agrees</span></span></li>
                            <li>cold mix is quicker and needs no hot-mix plant. the catch, as they put it: it wears out faster on busy roads, so hot mix suits those better. our research doesn’t settle this either way.<span className="stamps"><span className="stamp" data-k="told">told to us</span></span></li>
                            <li>hauling hot mix from a plant to the site only makes sense if the plant is close.<span className="stamps"><span className="stamp" data-k="told">told to us</span> <span className="stamp" data-k="corroborated">our research agrees</span></span></li>
                            <li>a hole past a certain size isn’t a pothole any more. the whole road needs repairing.<span className="stamps"><span className="stamp" data-k="told">told to us</span> <span className="stamp" data-k="corroborated">our research agrees</span></span></li>
                          </ul>
                        </div>
                        <div className="cf-sec"><h5>what it taught us</h5>
                          <ol className="cf-learn">
                            <li>a machine working on the day is a demo, not a result. the test is whether the patch is still there months later, and someone with no stake in the product has to do the checking.</li>
                            <li>we mark everything we heard as “told to us”, not “tested by us”. that’s not distrust. it’s how you keep receipts.</li>
                            <li>the quick fix and the lasting fix aren’t always the same fix. where it’s used matters as much as what it is.</li>
                            <li>permission comes first. you can’t just fix a public road, even with good intentions. we want the yes in writing.</li>
                          </ol>
                        </div>
                        <p className="upd-src">“our research agrees” points to <PageLink href="/research">the research page</PageLink>, where every claim has a source and a stamp.</p>
                        <p className="cf-links"><PageLink href="/research">the research ↗</PageLink> · <PageLink href="/updates#u-visit">the update →</PageLink></p>
                      </div>
                    </details>
                  </article>
                </li>

              </ul>
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
