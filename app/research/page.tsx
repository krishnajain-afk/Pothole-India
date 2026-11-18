import type { Metadata } from 'next';
import { vars } from '@/components/home/bits';
import { Nav, PageLink } from '@/components/site/SiteNav';
import { PageFooter } from '@/components/site/PageFooter';
import { PageEffects } from '@/components/site/PageEffects';
import '@/components/site/hub.css';

/* The research library, ported from public/research.html. Styles: components/site/hub.css (shared with case files
   and the diary; the res-, legend, shelf rules are this page's). The public edition of the Crashfree India brief:
   every number checked against it, no product names, no costs, no pilot city (BRAND-GUIDE §12.6).
   ADD A STUDY: copy a <li className="res-card reveal"> on the shelf (#shelf) and put it ABOVE the first one; add the
   matching update in app/updates and, if there's a lesson, a case file. Still a draft: noindex. */
export const metadata: Metadata = {
  title: 'The research — Cars24 Patch',
  description: '***hole studies: why potholes keep coming back, and what makes a fix last. Every claim has a source and a stamp. From Cars24 Patch.',
  robots: { index: false },
  alternates: { canonical: '/research' },
  openGraph: {
    type: 'website',
    siteName: 'Cars24 Patch',
    title: 'The research — Cars24 Patch',
    description: 'Why potholes keep coming back, and what makes a fix last. Every claim has a source and a stamp.',
  },
  twitter: { card: 'summary' },
};

export default function Research() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current="/research" />

      <main id="main">
        <section className="cfp-hero" aria-labelledby="h1">
          <div className="wrap">
            <div className="cfp-chips pop"><span className="cfp-chip">the library</span><span className="cfp-chip alt">draft</span></div>
            <h1 className="cfp-h1 pop" id="h1" style={vars({ '--d': '.15s' })}><span className="sr-only">Pothole studies.</span><span aria-hidden="true"><span className="nb"><span className="censor" id="censor"><span className="face stars">***</span><span className="face pot">pot</span></span>hole</span> <span className="hi">studies.</span></span></h1>
            <p className="cfp-lead pop" style={vars({ '--d': '.3s' })}>self-taught. forty-one pages, zero chill, and a receipt on every claim. where the receipt is missing, we say so.</p>
          </div>
        </section>

        <section className="sec-upd cfp-body" id="library" aria-labelledby="h-lib">
          <div className="wrap">
            <h2 className="sr-only" id="h-lib">The research library</h2>
            <nav className="hub-nav reveal" aria-label="On this page">
              <a href="#tldr">the 30-second version</a>
              <a href="#shelf">on the shelf</a>
              <a href="#stamps">the stamps</a>
              <a href="#edition">the public edition</a>
              <a href="#fixes">how potholes get fixed</a>
              <a href="#test">testing without fooling ourselves</a>
              <a href="#not-found">what we couldn’t find</a>
              <a href="#sources">sources</a>
            </nav>
            {/* THE 30-SECOND VERSION: the whole page in five lines, for people who won't scroll. Every line repeats a finding
                 that is sourced and stamped further down, and links to it. Change a finding below, change it here too. */}
            <div className="hub-block" id="tldr">
              <div className="hub-bh reveal"><h3 className="hub-h">the 30-second version.</h3><span className="hub-draft">tl;dr</span></div>
              <div className="res-card reveal" style={vars({ 'marginTop': '22px' })}>
                <ol className="res-steps" style={vars({ 'marginTop': '0' })}>
                  <li><b>it’s mostly water.</b>it gets under the surface, and every passing tyre pumps it in and out until the road breaks. <a href="#how-forms">how →</a></li>
                  <li><b>a patch on a wet base sits on nothing.</b>if the layers underneath are soft, the hole comes back. <a href="#surface-or-structural">why →</a></li>
                  <li><b>the weather beats the method.</b>85% of patches survived at dry sites, 48% at wet ones (about 1,250 patches, US and Canada). <a href="#fixes">the methods →</a></li>
                  <li><b>nobody in India has checked what lasts.</b>zero independent studies on how long repairs survive. we looked. <a href="#india-knows">the search →</a></li>
                  <li><b>so we’ll fix them ourselves.</b>properly, in dry weather, with permission, and checked months later by someone with no stake in it. <a href="#test">the plan →</a></li>
                </ol>
              </div>
            </div>
            <div className="hub-block" id="shelf">
              <div className="hub-bh reveal"><h3 className="hub-h">on the shelf</h3><span className="hub-draft">newest first</span></div>
              <p className="sec-lead reveal" style={vars({ 'marginTop': '14px' })}>a library, not a blog. new studies go on top. old ones never get quietly deleted.</p>
              {/*
                ADD A STUDY: copy an <li className="res-card reveal"> block below and paste it at the top of the list (above the first one).
                  data-s only sets the card colour: found = pink, doing = main colour, next = accent, done = paper.
                  Types we use: desk research · field notes · experiment · data. Keep every number and claim exactly as sourced, and give it a stamp.
                The matching update goes on updates.html, and the lesson on case-files.html. This page is where the evidence itself lives.
                Never publish names or contact details of officials, scientists or companies, costs or quotes, or plans we haven't finalised.
              */}
              <ul className="shelf">
                <li className="res-card reveal" data-s="found">
                  <div className="shelf-top"><span className="shelf-type">desk research</span><span className="shelf-date"><time dateTime="2026-10">oct 2026</time></span><span className="upd-sample">draft</span></div>
                  <h4 className="res-h" style={vars({ 'marginTop': '14px', 'fontSize': 'clamp(1.5rem,1rem + 1.6vw,2.2rem)' })}>why potholes come back, and what would make a repair last.</h4>
                  <p style={vars({ 'marginTop': '10px' })}>forty-one pages. one stubborn question: why does the same hole keep coming back? written by Crashfree India. the readable version is right below.</p>
                  <p className="shelf-go"><a className="btn btn-sm" href="#edition">read it <span className="arr">↓</span></a></p>
                </li>
                <li className="res-card reveal" data-s="doing">
                  <div className="shelf-top"><span className="shelf-type">field notes</span><span className="shelf-date"><time dateTime="2026-10">oct 2026</time></span><span className="upd-sample">draft</span></div>
                  <h4 className="res-h" style={vars({ 'marginTop': '14px', 'fontSize': 'clamp(1.5rem,1rem + 1.6vw,2.2rem)' })}>a visit to a government road lab.</h4>
                  <p style={vars({ 'marginTop': '10px' })}>we watched a pothole machine work and wrote down what the scientists told us. every point is marked as told to us, not tested by us.</p>
                  <p className="shelf-go"><PageLink className="btn btn-sm" href="/case-files#cf-05">read the lessons <span className="arr">↗</span></PageLink></p>
                </li>
              </ul>
            </div>
            <div className="hub-block" id="stamps">
              <div className="hub-bh reveal"><h3 className="hub-h">how to read the stamps</h3></div>
              <p className="sec-lead reveal" style={vars({ 'marginTop': '14px' })}>every claim wears a stamp: how much weight it can carry before it cracks. (yes, like a road.) where the evidence is thin or missing, the stamp says so.</p>
              <ul className="legend reveal">
                <li><span className="stamp" data-k="established">established</span> established: stated in a standard, regulation, court order or controlled study.</li>
                <li><span className="stamp" data-k="corroborated">corroborated</span> corroborated: two or more independent sources agree.</li>
                <li><span className="stamp" data-k="single">single source</span> single source: one study, agency statement or news report.</li>
                <li><span className="stamp" data-k="claim">claim</span> claim: asserted by an interested party, like a maker describing its own product, and not independently tested.</li>
                <li><span className="stamp" data-k="inference">inference</span> inference: our reasoning from the evidence.</li>
                <li><span className="stamp" data-k="unknown">not found</span> not found: nothing reliable could be found.</li>
              </ul>
            </div>
            <div className="hub-block" id="edition">
              <div className="hub-bh reveal"><h3 className="hub-h">the public edition</h3><span className="hub-goal">oct 2026</span><span className="hub-draft">draft</span></div>
              <p className="sec-lead reveal" style={vars({ 'marginTop': '14px' })}>the research brief by Crashfree India, minus the contact details and anything we haven’t locked in yet.</p>
            </div>
            <div className="res-stack">
            <article className="res-card reveal" id="short-answer" data-s="found" aria-labelledby="short-answer-h">
              <h3 className="res-h" id="short-answer-h">the short answer. (it’s not a gadget.)</h3>
              <p>no product or machine on the market fixes India’s pothole problem on its own, and we couldn’t find one independent study in India that measured how long pothole repairs last. the few Indian field observations we found cover one to three patches, over one to six months.</p>
              <p>what the evidence does support is a system: work out why each hole formed, fix the cause when it lies below the surface, make proper repairs in suitable weather, and measure what survives.</p>
              <ul className="upd-nums" aria-label="The problem in numbers" style={vars({ 'marginTop': '18px' })}>
                <li><b>2,385</b>deaths police recorded as pothole-related in 2024 (about 1.3% of 1,77,175 road deaths)</li>
                <li><b>9,438</b>over 2020–24</li>
              </ul>
              <div className="res-note">some states report no pothole deaths at all, so these numbers are a floor, not a full count. <span className="stamp" data-k="established">established</span> <br /><span style={vars({ 'fontWeight': '500', 'fontSize': '.95em' })}>sources: <a href="https://morth.gov.in/backend/documents/uploaded/Road%20Accidents%20in%20India%202024.pdf" target="_blank" rel="noopener">MoRTH, Road Accidents in India 2024, Table 3.5</a> · <a href="https://theprint.in/india/pothole-deaths-rise-53-in-5-years-up-accounts-for-over-half-of-9400-fatalities/2854367/" target="_blank" rel="noopener">Lok Sabha reply, 12 Feb 2026, via ThePrint</a></span></div>
            </article>
            <article className="res-card reveal" id="what-is" data-s="doing" aria-labelledby="what-is-h">
              <h3 className="res-h" id="what-is-h">1. when is a hole a pothole?</h3>
              <p>the definitions are close everywhere. what differs is the trigger: how deep a hole has to be before anyone has to act, and how fast.</p>
              <p>India’s maintenance code (<a href="https://law.resource.org/pub/in/bis/irc/irc.gov.in.082.2015.pdf" target="_blank" rel="noopener">IRC:82-2015</a>) describes a pothole as a bowl-shaped cavity in the bituminous surface, sometimes reaching into the layers below. it sizes them: small is up to 25 mm deep and 200 mm wide, medium is 25–50 mm deep and 500 mm wide, large is over 50 mm deep.</p>
              <p>the same 40 mm-deep hole counts as moderate in US and NHAI schemes, triggers action in most UK councils, and wouldn’t breach Ontario’s standard until it reached 8 cm. so any comparison of pothole counts across cities or countries has to check which definition was used. <span className="stamp" data-k="established">established</span></p>
              <p>on paper, India’s highway contract standard is among the strictest: a 10 mm limit and repair within 48 hours. we couldn’t find any record of how often it is enforced. <span className="stamp" data-k="unknown">not found</span></p>
            </article>
            <article className="res-card reveal" id="how-forms" data-s="found" aria-labelledby="how-forms-h">
              <h3 className="res-h" id="how-forms-h">2. how a road becomes a pothole.</h3>
              <p>a pothole is the last step in a chain of damage. the sources agree on the sequence. <span className="stamp" data-k="corroborated">corroborated</span></p>
              <ol className="res-steps">
                <li><b>water gets in.</b>the surface is meant to be a waterproof lid. cracks, open joints or a mix with too many air pockets let water through. once the air pockets pass about 8%, they tend to link up into channels (<a href="https://pavementinteractive.org/reference-desk/testing/asphalt-tests/moisture-susceptibility/" target="_blank" rel="noopener">Pavement Interactive</a>).</li>
                <li><b>the bitumen lets go.</b>water creeps between the bitumen and the stone and peels it away, and softens the binder that holds the mix together.</li>
                <li><b>traffic pumps it.</b>each passing tyre pushes water in and out of the surface, scouring the binder and washing out the fine material (<a href="https://repository.tudelft.nl/file/File_77f831c3-e2a0-4397-8626-71ff1039678e?preview=1" target="_blank" rel="noopener">Kringos 2007, TU Delft</a>).</li>
                <li><b>stones fly out.</b>stones come loose and tyres throw them out. the hole now holds more water, which speeds up the damage.</li>
                <li><b>the base gives way.</b>if water reaches the stone base and the soil beneath, they lose strength. each wheel pushes muddy water up through the cracks, and the surface loses its support.</li>
              </ol>
              <div className="res-note">monsoon rain, waterlogged streets and heavy trucks combine exactly the conditions this needs. <span className="stamp" data-k="inference">inference</span> one Indian engineer’s plain-language version of the same physics ends: “drainage, drainage, drainage” (<a href="https://scroll.in/article/1071798/" target="_blank" rel="noopener">Shirish Patel, Scroll, 2024</a>).</div>
              <details id="worse">
                <summary><span className="w-closed">what makes it worse</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <ul className="res-ul">
                    <li><b>overloaded vehicles and thin pavements.</b> a road too weak for its traffic bends and cracks into a chicken-wire pattern.</li>
                    <li><b>poor drainage, flat camber, ponding.</b> water stays on or beside the road and soaks in.</li>
                    <li><b>a weak or saturated base.</b> the stone layers and soil lose strength when wet.</li>
                    <li><b>poor construction.</b> too little bitumen, poor compaction, a segregated mix, weak joints.</li>
                    <li><b>utility trenches refilled badly.</b> loose refill keeps settling under traffic, so the surface sinks and cracks at the edges.</li>
                    <li><b>ageing.</b> sun and air make bitumen stiff and brittle. freeze–thaw matters in India only at altitude.</li>
                  </ul>
                </div>
              </details>
              <div className="res-note">you may have read that “70–80% of potholes form during the monsoon”. that claim traces back only to an unsourced website, so we didn’t use it. and no study measures how much of India’s pothole damage is down to the monsoon, overloading or poor construction. <span className="stamp" data-k="unknown">not found</span></div>
            </article>
            <article className="res-card reveal" id="surface-or-structural" data-s="doing" aria-labelledby="surface-or-structural-h">
              <h3 className="res-h" id="surface-or-structural-h">3. a scratch, or a broken bone?</h3>
              <p>the Indian Roads Congress separates two kinds. non-structural potholes stay in the top layers. structural ones involve the base, sub-base and subgrade, and for those, treating the top layer “doesn’t last long” (<a href="https://www.irc.nic.in/admnis/admin/showimg.aspx?ID=471" target="_blank" rel="noopener">Indian Highways, Dec 2017</a>). the fix is to remove the saturated layers and rebuild.</p>
              <p>a patch is a plug in the lid. if what lies beneath is wet and soft, the plug sits on nothing, the edges crack and the hole comes back. a South African guide is blunter: surface repair without fixing the cause is “normally a complete waste of time” (<a href="https://www.csir.co.za/sites/default/files/Documents/Pothole_CSIR_tech_guide.pdf" target="_blank" rel="noopener">CSIR South Africa, 2010</a>).</p>
              <div className="res-pair">
                <div><h4>probably a surface problem. a good patch can work</h4>
                  <ul><li>an isolated hole in otherwise sound road</li><li>the road sheds water, no ponding nearby</li><li>the first failure at that spot</li><li>shallow, within the asphalt layers</li></ul></div>
                <div><h4>probably structural or drainage. a patch only buys time</h4>
                  <ul><li>surrounded by interconnected “alligator” cracks, ruts or sagging</li><li>standing water, blocked drains, or mud pumping up through cracks</li><li>repeated failure at the same spot, along a utility trench or near a leaking pipe</li><li>deep, exposing a soft or muddy base</li></ul></div>
              </div>
              <div className="res-note">how often Indian potholes are structural is unknown. no dataset in India or abroad measures it. <span className="stamp" data-k="unknown">not found</span></div>
              <p><b>can a pothole turn into a sinkhole?</b> not directly. potholes form from the top down and are rarely deeper than 150–200 mm. a road cave-in forms from below: a leaking water main or broken sewer washes soil away and a void grows under an intact-looking surface. a hole that keeps sinking, or a dip over a pipeline, needs engineers and the utility, not a patch.</p>
            </article>
            <article className="res-card reveal" id="network" data-s="next" aria-labelledby="network-h">
              <h3 className="res-h" id="network-h">4. how much of India is asphalt?</h3>
              <p>there is no recent official split of India’s road length by surface type that we could access. so we built an estimate. the network was about 63.31 lakh km in March 2019, about 65% of it surfaced (<a href="https://factly.in/data-by-march-2019-surfaced-roads-constituted-65-of-the-total-road-length-in-india" target="_blank" rel="noopener">Factly, from MoRTH Basic Road Statistics</a>).</p>
              <ul className="upd-nums" aria-label="Estimated road network by length" style={vars({ 'marginTop': '16px' })}>
                <li><b>40–55%</b>bituminous</li><li><b>2–5%</b>concrete</li><li><b>10–20%</b>water-bound macadam</li><li><b>~35%</b>unsurfaced</li>
              </ul>
              <div className="res-note">counting only asphalt and concrete, asphalt is roughly 90–96% of paved length. about 95% of India’s road length is non-concrete, and can develop potholes. concrete is common only in a few cities and parts of the national highway network. <span className="stamp" data-k="inference">inference</span></div>
            </article>
            <article className="res-card reveal" id="fixes" data-s="found" aria-labelledby="fixes-h">
              <h3 className="res-h" id="fixes-h">5. how potholes get fixed. and un-fixed.</h3>
              <p>about fifteen repair approaches are in use worldwide. they differ mostly in how the bitumen is made workable, and how it then hardens. Indian codes still treat hot mix as the preferred patching material, and cold mixes as the fallback where cold weather or heavy rain rule it out (<a href="https://law.resource.org/pub/in/bis/irc/irc.gov.in.sp.100.2014.pdf" target="_blank" rel="noopener">IRC:SP:100-2014</a>).</p>
              <details id="harden">
                <summary><span className="w-closed">how each material hardens</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <ul className="res-ul">
                    <li><b>hot mix.</b> bitumen heated and laid at about 135–148 °C. cools within minutes. the edges cool first, which weakens the bond and compaction there.</li>
                    <li><b>mastic asphalt.</b> a binder-rich mix poured hot. it levels itself, so it is floated, not rolled.</li>
                    <li><b>cutback cold mix.</b> bitumen thinned with a solvent (kerosene in the Indian code). the solvent evaporates over days to weeks. fire hazard: no open flame.</li>
                    <li><b>emulsion cold mix.</b> tiny bitumen droplets in water. it hardens as the emulsion “breaks” and the water leaves, over hours to weeks, slower in cold, damp or humid air.</li>
                    <li><b>reactive (“instant”) mix.</b> the binder reacts with water, or contains cement. opened to traffic in 3–35 minutes in a Japanese trial. full cure took about 3–5 days in a 2025 study.</li>
                    <li><b>cement-type (rapid-set concrete, geopolymer).</b> sets in 15–60 minutes. much stiffer than asphalt, so the joint can crack.</li>
                  </ul>
                </div>
              </details>
              <div className="res-note">two points. every material has a hardening phase: cold mixes just slow down most in cold, damp weather. and “open to traffic in 10 minutes” is not the same as “fully cured”. some products carry traffic within minutes, but full strength takes days (<a href="https://www.hkd.mlit.go.jp/ky/jg/gijyutu/splaat000000rvo0-att/splaat000000rvvr.pdf" target="_blank" rel="noopener">Otaru Road Office</a>; <a href="https://ira.lib.polyu.edu.hk/bitstream/10397/115030/1/1-s2.0-S2214509525004279-main.pdf" target="_blank" rel="noopener">Xu et al. 2025</a>).</div>
              <details id="methods">
                <summary><span className="w-closed">the methods, compared</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <p style={vars({ 'marginTop': '0' })}>sources: <a href="https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-RD-98-073.pdf" target="_blank" rel="noopener">FHWA-RD-98-073</a>, <a href="https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-RD-99-168.pdf" target="_blank" rel="noopener">FHWA-RD-99-168</a>, <a href="https://law.resource.org/pub/in/bis/irc/irc.gov.in.116.2014.pdf" target="_blank" rel="noopener">IRC:116</a>, <a href="https://rosap.ntl.bts.gov/view/dot/36064/dot_36064_DS1.pdf" target="_blank" rel="noopener">MnDOT 2018</a>, <a href="https://files.library.northwestern.edu/transportation/online/unrestricted/2014/FHWA-OH-2014-2.pdf" target="_blank" rel="noopener">Ohio DOT 2014</a>.</p>
                  <ul className="res-meth">
                    <li><b>throw-and-go</b><span className="stamp" data-k="established">established</span><p>mix shovelled into an uncleaned hole and left for traffic to compact. lasts “a few hours to a few weeks”, and is the dearest over its life once re-patching is counted. not a repair: use it only to make a hazard safe.</p></li>
                    <li><b>throw-and-roll</b><span className="stamp" data-k="established">established (US)</span><p>the same, then the truck drives over the patch. with good material it matched the careful method in a large US study. with a poor mix, or in winter, it did much worse.</p></li>
                    <li><b>prepared cold-mix patch</b><span className="stamp" data-k="established">standard established</span> <span className="stamp" data-k="unknown">life: not found</span><p>clean the hole, remove the water, tack coat, layers up to 75 mm, compact the edges first. a damp hole is allowed under the Indian code.</p></li>
                    <li><b>hot-mix cut-and-patch</b><span className="stamp" data-k="corroborated">corroborated</span><p>saw-cut to sound road, clean, rebuild the lower layers, tack, place hot mix in layers, roll, seal the joint. needs a dry hole and air above 10 °C. the best-supported permanent repair, and the lowest cost per year of life in one Canadian comparison.</p></li>
                    <li><b>edge or joint seal</b><span className="stamp" data-k="mixed">mixed</span><p>a band of binder and sand over the joint. needs a dry surface. mostly no significant benefit in the US study.</p></li>
                    <li><b>spray injection (jet patching)</b><span className="stamp" data-k="established">established abroad</span> <span className="stamp" data-k="claim">claim in india</span><p>an air blast clears water and debris, emulsion is sprayed as tack, coated stone is blown in at speed, no roller. as good as control patches at all sites in the US study, but it depends on the operator, and it isn’t suited to deep holes.</p></li>
                    <li><b>automated truck patchers</b><span className="stamp" data-k="claim">claim</span><p>one vehicle cuts, cleans, tacks, places and compacts hot mix, logging GPS and photos. no independent durability data. one Canadian city withdrew its unit after it was out of service for 127 days in its first nine months.</p></li>
                    <li><b>machine-mixed cold mix</b><span className="stamp" data-k="claim">claim</span><p>a truck-mounted unit mixes emulsion cold mix on site. we found no independent field test.</p></li>
                    <li><b>infrared pre-heating</b><span className="stamp" data-k="mixed">mixed</span><p>a heater softens the old asphalt around the hole so it can be reworked with new mix. 14 of 15 patches survived 188 days in one Ohio winter trial, but 18 of the first 26 at the main site of a Texas heat trial were badly damaged. no Indian deployment found.</p></li>
                    <li><b>mastic asphalt</b><span className="stamp" data-k="claim">claim</span><p>hot, binder-rich mix poured into a cut hole. used at city scale in at least one very wet metro. no independent survival data.</p></li>
                    <li><b>engineered proprietary cold mixes</b><span className="stamp" data-k="established">tested products only</span><p>bagged or bulk mixes with modified binders. in Virginia, all 13 products beat the state’s standard mix, which failed within 14 days. how they do in Indian conditions: unknown.</p></li>
                    <li><b>reactive / water-activated mixes</b><span className="stamp" data-k="claim">claim</span><p>the binder cures on contact with water. fast reopening shown, full cure takes days, no long-term field data.</p></li>
                    <li><b>rapid-set cementitious</b><span className="stamp" data-k="claim">claim</span><p>cement-type fill setting in minutes to an hour. stiffer than asphalt, so joints crack. no patch survival data. suits concrete roads, not general asphalt potholes.</p></li>
                    <li><b>steel-slag instant mix</b><span className="stamp" data-k="claim">claim</span><p>processed steel slag with a polymer binder, poured from bags. claimed to work without drying the hole or a tack coat. no published lab or field results. steel slag can contain free lime that swells with water.</p></li>
                    <li><b>full-depth repair</b><span className="stamp" data-k="established">code-based</span><p>remove the failed layers to firm ground, fix the drainage, rebuild in compacted layers. the only durable option where the base or soil has failed.</p></li>
                    <li><b>preventive treatments</b><span className="stamp" data-k="mixed">indirect</span><p>crack sealing, slurry, surface dressing: seal the surface before water gets in. extends pavement life by about 2–3 years. no study directly counts the potholes prevented.</p></li>
                  </ul>
                </div>
              </details>
              <h4 className="res-sub">five things decide whether a patch lasts</h4>
              <ol className="res-steps">
                <li><b>preparation.</b>remove loose material and water. cut back to sound road with vertical edges. clean with compressed air. water and debris at the bottom stop the patch bonding.</li>
                <li><b>bond at the edge.</b>tack coat on the base and the sides. heat or seal the joint. the joint is “the area that fails most frequently”.</li>
                <li><b>material.</b>a mix suited to the conditions, tested with the local stone, and no non-bituminous fill. cheap local cold mix did significantly worse at three of eight US sites.</li>
                <li><b>compaction.</b>compact the edges first, in layers. a roller, not a hand tamper, for hot mix. poor compaction causes dips, shoving and ravelling.</li>
                <li><b>support and drainage.</b>diagnose first. repair the base and drains where they caused the hole. otherwise the patch only treats the symptom.</li>
              </ol>
              <h4 className="res-sub">and the weather decides a lot</h4>
              <p>in the largest controlled study (about 1,250 patches, US and Canada), site conditions and material quality mattered more than the method’s name. patches at dry sites survived 85% of the time. at wet sites, 48%. <span className="stamp" data-k="corroborated">corroborated</span> the effect of monsoon rain itself: <span className="stamp" data-k="unknown">not found</span></p>
              <details id="conditions">
                <summary><span className="w-closed">more conditions</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <ul className="res-ul">
                    <li><b>cold.</b> at 0 °C all tested materials were very weak. patches placed in snowy months lasted 10–25 days, against 60–100 days in other months. India’s road specification bars bituminous laying below 10 °C. <span className="stamp" data-k="corroborated">corroborated</span></li>
                    <li><b>heat.</b> we found no field study above 40 °C air temperature. <span className="stamp" data-k="unknown">not found</span></li>
                    <li><b>heavy traffic.</b> the busiest US site lost most of its patches by 133 weeks. <span className="stamp" data-k="single">single source</span></li>
                    <li><b>tropical monsoon.</b> no rigorous field study found. <span className="stamp" data-k="unknown">not found</span></li>
                    <li><b>hills and steep grades.</b> no study of patch life on slopes found. <span className="stamp" data-k="unknown">not found</span></li>
                    <li><b>deep holes.</b> fill holes deeper than 50 mm in two layers. <span className="stamp" data-k="corroborated">corroborated</span></li>
                    <li><b>weak base, poor drainage.</b> identical patches at one site survived anywhere from 30% to 80%, depending on support and drainage. <span className="stamp" data-k="established">established</span></li>
                  </ul>
                </div>
              </details>
              <details id="qa">
                <summary><span className="w-closed">three questions people ask</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <p style={vars({ 'marginTop': '0' })}><b>is quick “throw-and-roll” really as good as a careful repair?</b> sometimes. in the large US study it “proved just as effective” as the semi-permanent method for the materials compared directly, and was about five times faster. it matches the careful method only with high-quality material and real compaction. the careful method is more forgiving of everything else.</p>
                  <p><b>how do humid countries make sure the hole is dry?</b> mostly they wait for dry weather, add crews and use temporary fills in between. Singapore’s transport authority told its Parliament that patching materials only bond properly on a dry surface. drying tools exist (compressed air, hot-air lances, the air blast of jet patchers, infrared heaters), but no study measures how much they extend patch life in the tropics.</p>
                  <p><b>does compaction matter for every method?</b> for hot mix it is critical, and only possible while the mix is hot. for cold mix it matters because loose patches let water in and sink. spray injection compacts by the force of placement. mastic is poured and floated, not rolled.</p>
                </div>
              </details>
            </article>
            <article className="res-card reveal" id="india-knows" data-s="doing" aria-labelledby="india-knows-h">
              <h3 className="res-h" id="india-knows-h">6. does anyone know how long a repair lasts? (we couldn’t find anyone.)</h3>
              <p>we searched Indian journals, institutional repositories, court records, government-lab publications and the reporting on each city programme. we found no independent, systematic field study in India of how long pothole repairs survive. <span className="stamp" data-k="unknown">not found</span></p>
              <p>the few field observations that exist are very small and short. the best documented checked three patches on a busy Delhi highway: after six months of heavy rain the material hadn’t come out (<a href="https://nopr.niscpr.res.in/bitstream/123456789/45713/1/BVAAP%2026%281%29%2037-42.pdf" target="_blank" rel="noopener">Gola et al. 2018</a>). there is a student project on three potholes over one month. there is an expert-opinion survey of 23 experts, which is not field measurement. and there is a government-funded project (2023–26) with planned field validation, whose field results aren’t out yet (<a href="https://www.indiascienceandtechnology.gov.in/research/evaluation-advanced-pothole-patching-materials-and-methods-bituminous-pavements" target="_blank" rel="noopener">SRM University-AP project page</a>).</p>
              <p>a 2026 review of cold-mix repair by Indian researchers also cites no Indian field study of patch performance (<a href="https://link.springer.com/article/10.1007/s42947-026-00884-6" target="_blank" rel="noopener">Manjushree &amp; Lokeshwari 2026</a>). claims of “long-lasting” repairs from developers and agencies come with no published data. <span className="stamp" data-k="claim">claim</span></p>
              <div className="res-note">the repair figures we found count potholes filled. we couldn’t find any that counted how many stayed filled. the gap in evidence is itself a central finding. <span className="stamp" data-k="unknown">not found</span></div>
            </article>
            <article className="res-card reveal" id="ideal" data-s="next" aria-labelledby="ideal-h">
              <h3 className="res-h" id="ideal-h">7. what would actually work.</h3>
              <p>no single method or product fits every Indian condition, least of all the monsoon. the ideal is a system in which each method does the job it is best at. <span className="stamp" data-k="inference">inference</span></p>
              <ol className="res-steps">
                <li><b>prevent.</b>seal cracks, clear drains and resurface on schedule. the Indian Roads Congress calls this “a stitch in time”.</li>
                <li><b>triage.</b>classify each pothole as surface or structural. flag trenches, ponding and repeat failures.</li>
                <li><b>make safe.</b>in wet weather, use a tested interim material, logged as temporary and scheduled for permanent repair.</li>
                <li><b>repair permanently.</b>in a dry window, to the national specification: cut to sound road, tack, compact, seal the joint.</li>
                <li><b>fix the cause.</b>full-depth repair, drainage and properly refilled utility trenches. engineering work, not patching.</li>
                <li><b>verify and pay for survival.</b>independent sample inspections. guarantees and deductions for repeat failure.</li>
                <li><b>certify materials.</b>an Indian “monsoon patch” approval with a monitored road trial. the UK requires a two-year one (<a href="https://www.bbacerts.co.uk/files/2020/09/HAPAS-SG8-Permanent-cold-lay-surfacing.pdf" target="_blank" rel="noopener">HAPAS SG8</a>).</li>
              </ol>
              <div className="res-note">the missing piece is a proven wet-season material. no product has independent survival data under monsoon conditions. that is the central research question. <span className="stamp" data-k="inference">inference</span></div>
              <p>what we can do ourselves, now: triage, making safe, permanent repair in dry windows, and independent checks, all with written permission. prevention and structural repair need engineers and budgets far bigger than ours.</p>
            </article>
            <article className="res-card reveal" id="test" data-s="found" aria-labelledby="test-h">
              <h3 className="res-h" id="test-h">8. how to test a fix without fooling yourself.</h3>
              <p>a pilot that produces the missing evidence would be valuable in its own right. here is what a fair test needs.</p>
              <details id="fair-test">
                <summary><span className="w-closed">the six rules of a fair test</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <ol className="res-steps">
                    <li><b>matched arms.</b>three or four options at comparable sites (same road class, traffic and pothole sizes), plus the usual local repair as a control. randomise which method goes where, if possible.</li>
                    <li><b>triage first.</b>for each pothole, record depth, size, surrounding cracking, ponding, trenches and repeat failure. analyse structural and waterlogged spots separately, because no patch can be judged fairly there.</li>
                    <li><b>define failure in advance.</b>inspect at fixed intervals (for example 1, 3, 6, 9 and 12 months), through at least one monsoon.</li>
                    <li><b>measure what matters.</b>survival rate, time to make safe, cost per durable repair including repeat visits, and incidents at the sites. geo-tagged photos prove time and place, not quality, so add random independent checks.</li>
                    <li><b>an independent evaluator.</b>someone with no commercial stake. makers shouldn’t choose the sites or inspect their own patches.</li>
                    <li><b>enough patches.</b>the big US study used about 1,250. one Ohio trial’s 15 per method was too few to generalise. aim for dozens per method per city.</li>
                  </ol>
                </div>
              </details>
              <p>and nobody gets to work on a public road without permission. we found no published route for NGOs, so a written MoU or work order is the realistic one. work on most public roads is judged against the national specification (<a href="https://law.resource.org/pub/in/bis/irc/mort.250.2013.pdf" target="_blank" rel="noopener">MoRTH Specifications cl. 3004.2</a>): vertical edges, tack coat, compaction, no non-bituminous fill.</p>
              <details id="questions">
                <summary><span className="w-closed">what we ask before we trust a product</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <p style={vars({ 'marginTop': '0' })}>“works in water” and “ready in minutes” claims are common. none of the products we found has public, independent Indian survival data. before any product goes into a test, we ask for:</p>
                  <ol className="res-steps">
                    <li>the binder type and curing mechanism (emulsion, cutback, polymer-reactive, cementitious, slag-based) and the safety data sheet.</li>
                    <li>time to traffic and time to full cure at about 5 °C and 35 °C, and in a wet hole.</li>
                    <li>independent test reports, not the maker’s own: coating and stripping, bond to old asphalt, rutting at 60 °C and, for slag products, volume stability.</li>
                    <li>field survival data: how many patches, where, the climate, the traffic, the follow-up period, the definition of failure and who inspected.</li>
                    <li>any accreditation or approval, and the standard it was tested against.</li>
                    <li>a written guarantee with re-repair at the maker’s cost, and agreement to independent inspection.</li>
                    <li>for cutback-based mixes, fire and storage precautions.</li>
                  </ol>
                </div>
              </details>
            </article>
            <article className="res-card reveal" id="not-found" data-s="doing" aria-labelledby="not-found-h">
              <h3 className="res-h" id="not-found-h">9. what we looked for and couldn’t find.</h3>
              <p>the gaps are part of the result. these are things we searched for and came back empty.</p>
              <ul className="res-ul res-miss">
                <li>how long a patch lasts in tropical monsoon conditions, on slopes, or above 40 °C.</li>
                <li>independent tests of any Indian “instant” or steel-slag mix.</li>
                <li>how often Indian potholes are structural. no dataset in India or abroad measures it.</li>
                <li>how much of India’s pothole damage comes from the monsoon, from overloading or from poor construction.</li>
                <li>an official split of India’s roads by surface type. our section above is an estimate.</li>
                <li>a pothole death count that isn’t a floor. some states report none at all.</li>
                <li>the current edition of India’s maintenance code (IRC:82-2023), and the list of accredited pothole products. we couldn’t get either.</li>
              </ul>
            </article>
            <article className="res-card reveal" id="words" data-s="done" aria-labelledby="words-h">
              <h3 className="res-h" id="words-h">the words.</h3>
              <details id="glossary">
                <summary><span className="w-closed">open the glossary</span><span className="w-open">close it</span></summary>
                <div className="res-body"><dl>
                  <div><dt>aggregate</dt><dd>crushed stone, gravel and sand: the part of asphalt that carries the load.</dd></div>
                  <div><dt>bitumen</dt><dd>the black, sticky crude-oil product that binds stones together (“asphalt binder” in North America).</dd></div>
                  <div><dt>cutback</dt><dd>bitumen thinned with a solvent such as kerosene so it can be used cold. hardens as the solvent evaporates.</dd></div>
                  <div><dt>emulsion</dt><dd>tiny bitumen droplets suspended in water. hardens when the droplets merge and the water leaves.</dd></div>
                  <div><dt>hot mix</dt><dd>stone and bitumen mixed and laid hot (about 135–148 °C). hardens on cooling.</dd></div>
                  <div><dt>mastic asphalt</dt><dd>a binder-rich hot mix that is poured and smoothed, not rolled.</dd></div>
                  <div><dt>base, sub-base, subgrade</dt><dd>the stone layers and natural soil beneath the asphalt surface.</dd></div>
                  <div><dt>stripping</dt><dd>water separating bitumen from stone.</dd></div>
                  <div><dt>ravelling</dt><dd>stones coming loose and being lost from the surface.</dd></div>
                  <div><dt>alligator cracking</dt><dd>interconnected cracks like crocodile skin, usually a sign of structural weakness.</dd></div>
                  <div><dt>pumping</dt><dd>water and fine material forced up through cracks by passing wheels.</dd></div>
                  <div><dt>tack coat / prime coat</dt><dd>a thin spray of binder that helps new material stick to old asphalt (tack) or seals a stone base (prime).</dd></div>
                  <div><dt>debonding</dt><dd>a patch coming loose from the road around it.</dd></div>
                  <div><dt>throw-and-go / throw-and-roll</dt><dd>shovelled repairs, either left alone or compacted by the truck’s tyres.</dd></div>
                  <div><dt>spray injection (jet patching)</dt><dd>a machine blows the hole clean and sprays in binder-coated stone.</dd></div>
                  <div><dt>full-depth repair</dt><dd>removing and rebuilding all failed layers.</dd></div>
                </dl></div>
              </details>
            </article>
            <article className="res-card reveal" id="sources" data-s="done" aria-labelledby="sources-h">
              <h3 className="res-h" id="sources-h">sources.</h3>
              <p>the brief links every factual statement to its source. these are the ones used on this page.</p>
              <details id="all-sources">
                <summary><span className="w-closed">all 27 sources</span><span className="w-open">close it</span></summary>
                <div className="res-body">
                  <ul className="res-src">
                    <li><a href="https://morth.gov.in/backend/documents/uploaded/Road%20Accidents%20in%20India%202024.pdf" target="_blank" rel="noopener">MoRTH, Road Accidents in India 2024, Table 3.5</a></li>
                    <li><a href="https://theprint.in/india/pothole-deaths-rise-53-in-5-years-up-accounts-for-over-half-of-9400-fatalities/2854367/" target="_blank" rel="noopener">Lok Sabha Unstarred Question 2175, 12 Feb 2026, as reported by ThePrint</a></li>
                    <li><a href="https://law.resource.org/pub/in/bis/irc/irc.gov.in.082.2015.pdf" target="_blank" rel="noopener">IRC:82-2015, code of practice for maintenance of bituminous roads</a></li>
                    <li><a href="https://law.resource.org/pub/in/bis/irc/irc.gov.in.sp.100.2014.pdf" target="_blank" rel="noopener">IRC:SP:100-2014, use of cold mix technology in construction and maintenance</a></li>
                    <li><a href="https://law.resource.org/pub/in/bis/irc/irc.gov.in.116.2014.pdf" target="_blank" rel="noopener">IRC:116-2014, specifications for readymade bituminous pothole patching mix</a></li>
                    <li><a href="https://law.resource.org/pub/in/bis/irc/mort.250.2013.pdf" target="_blank" rel="noopener">MoRTH Specifications for Road and Bridge Works (cl. 3004.2, 501.5.1, 518.2.3.1)</a></li>
                    <li><a href="https://civilengghub.in/wp-content/uploads/2025/09/NHAI-Maintenance-Manual-2025.pdf" target="_blank" rel="noopener">NHAI Maintenance Manual 2025</a></li>
                    <li><a href="https://www.irc.nic.in/admnis/admin/showimg.aspx?ID=471" target="_blank" rel="noopener">Indian Highways, Indian Roads Congress, December 2017</a></li>
                    <li><a href="https://www.csir.co.za/sites/default/files/Documents/Pothole_CSIR_tech_guide.pdf" target="_blank" rel="noopener">CSIR (South Africa), pothole technical guide, 2010</a></li>
                    <li><a href="https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-RD-98-073.pdf" target="_blank" rel="noopener">FHWA-RD-98-073, the SHRP H-106 pothole repair field study</a></li>
                    <li><a href="https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-RD-99-168.pdf" target="_blank" rel="noopener">FHWA-RD-99-168, materials and procedures for rapid repair of pavement potholes</a></li>
                    <li><a href="https://www.njdottechtransfer.net/wp-content/uploads/2024/02/NJDOT_Pothole-Repair_Final-Report-Volume-I.pdf" target="_blank" rel="noopener">NJDOT / Rutgers, pothole repair final report, 2024</a></li>
                    <li><a href="https://rosap.ntl.bts.gov/view/dot/36064/dot_36064_DS1.pdf" target="_blank" rel="noopener">MnDOT 2018, pothole patching cost and durability</a></li>
                    <li><a href="https://rosap.ntl.bts.gov/view/dot/32722/dot_32722_DS1.pdf" target="_blank" rel="noopener">MnDOT 2017, pothole repair field study</a></li>
                    <li><a href="https://files.library.northwestern.edu/transportation/online/unrestricted/2014/FHWA-OH-2014-2.pdf" target="_blank" rel="noopener">Ohio DOT 2014, winter pothole repair trial</a></li>
                    <li><a href="https://rosap.ntl.bts.gov/view/dot/19402/dot_19402_DS1.pdf" target="_blank" rel="noopener">VTRC, evaluation of pothole repair products</a></li>
                    <li><a href="https://rosap.ntl.bts.gov/view/dot/24509/dot_24509_DS1.pdf" target="_blank" rel="noopener">TTI, Texas pothole repair study</a></li>
                    <li><a href="https://www.hkd.mlit.go.jp/ky/jg/gijyutu/splaat000000rvo0-att/splaat000000rvvr.pdf" target="_blank" rel="noopener">Otaru Road Office (Japan), cold mix benchmark</a></li>
                    <li><a href="https://ira.lib.polyu.edu.hk/bitstream/10397/115030/1/1-s2.0-S2214509525004279-main.pdf" target="_blank" rel="noopener">Xu et al. 2025, performance of reactive pothole repair</a></li>
                    <li><a href="https://repository.tudelft.nl/file/File_77f831c3-e2a0-4397-8626-71ff1039678e?preview=1" target="_blank" rel="noopener">Kringos 2007, TU Delft, on water damage in asphalt</a></li>
                    <li><a href="https://nottingham-repository.worktribe.com/OutputFile/22453108" target="_blank" rel="noopener">Abed et al. 2023, potholes on London’s main roads</a></li>
                    <li><a href="https://www.bbacerts.co.uk/files/2020/09/HAPAS-SG8-Permanent-cold-lay-surfacing.pdf" target="_blank" rel="noopener">HAPAS SG8, permanent cold-lay surfacing (UK)</a></li>
                    <li><a href="https://scroll.in/article/1071798/" target="_blank" rel="noopener">Shirish Patel, Scroll, 2024</a></li>
                    <li><a href="https://factly.in/data-by-march-2019-surfaced-roads-constituted-65-of-the-total-road-length-in-india" target="_blank" rel="noopener">Factly, from MoRTH Basic Road Statistics</a></li>
                    <li><a href="https://nopr.niscpr.res.in/bitstream/123456789/45713/1/BVAAP%2026%281%29%2037-42.pdf" target="_blank" rel="noopener">Gola et al. 2018, a field check of three patches</a></li>
                    <li><a href="https://link.springer.com/article/10.1007/s42947-026-00884-6" target="_blank" rel="noopener">Manjushree &amp; Lokeshwari 2026, review of cold-mix pothole repair</a></li>
                    <li><a href="https://www.indiascienceandtechnology.gov.in/research/evaluation-advanced-pothole-patching-materials-and-methods-bituminous-pavements" target="_blank" rel="noopener">SRM University-AP, project on advanced pothole patching materials</a></li>
                  </ul>
                </div>
              </details>
            </article>
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
      <PageEffects threshold={0.08} />
    </>
  );
}
