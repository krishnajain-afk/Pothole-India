import { Starburst, SubscribeForm, vars } from './bits';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="h1">
      <div className="wrap">
        <div className="hero-grid">

          <div className="hero-copy">
            <div className="chips"><span className="tag-chip slap" style={vars({ '--r': '-2deg', '--d': '.05s' })}>coming soon</span></div>

            <div className="hl-wrap">
              <h1 className="hl" id="h1" aria-label="Shut up, pothole.">
                <span className="hl-line" aria-hidden="true"><span className="w pop" style={vars({ '--d': '.12s' })}>shut</span> <span className="w pop" style={vars({ '--d': '.2s' })}>up</span></span>
                <span className="hl-line" aria-hidden="true"><span className="censor pop" id="censor" style={vars({ '--d': '.3s' })}><span className="face stars">***</span><span className="face pot">pot</span></span><span className="w pop" style={vars({ '--d': '.38s' })}>hole</span></span>
              </h1>
              <div className="note-pot" id="note" aria-hidden="true">
                <svg viewBox="0 0 44 30" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M42 24C30 26 14 22 6 8" /><path d="M4 16L6 6l10 4" /></svg>
                (it’s “pot”. relax.)
              </div>
            </div>

            <p className="lead" id="lead">India has <mark className="m-pink" style={vars({ '--c': 'var(--pink)', '--d': '.9s' })}>swerved</mark>, <mark style={vars({ '--c': 'var(--white)', '--d': '1.15s' })}>slowed down</mark> and <mark className="m-blue" style={vars({ '--c': 'var(--acc)', '--d': '1.4s' })}>suffered enough</mark>.</p>
            <p className="big-line pop" style={vars({ '--d': '.7s' })}>The potholes are <span className="squig">getting fixed.</span></p>

            <SubscribeForm id="hero-form" idSuffix="hero" source="hero" className="sub pop" style={vars({ '--d': '.85s' })} />
          </div>

          {/* the pothole has opinions */}
          <div className="art" aria-hidden="true">
            <svg className="ring" viewBox="-100 -100 200 200"><defs><path id="ringPath" d="M0,-86 a86,86 0 1,1 0,172 a86,86 0 1,1 0,-172" /></defs><text><textPath href="#ringPath" textLength="536" lengthAdjust="spacing">COMING SOON ✦ POTHOLES GETTING FIXED ✦ COMING SOON ✦ POTHOLES GETTING FIXED ✦ </textPath></text></svg>
            <div className="hole" id="hole">
              <div className="face-wrap">
                <span className="eye l"><i className="pupil"></i></span>
                <span className="eye r"><i className="pupil"></i></span>
                <span className="mouth"></span>
              </div>
            </div>
            <div className="px burst slap" style={vars({ '--d': '.2s', '--r': '-12deg' })}>
              <Starburst fill="#FF5FA2" lines={['fill', '’em up']} />
            </div>
            <ul className="px checks slap" id="checks" style={vars({ '--d': '.55s', '--r': '4deg' })}>
              <li><i></i>swerved</li>
              <li><i></i>slowed down</li>
              <li><i></i>suffered enough</li>
            </ul>
            <div className="scoot"><span>🛵</span></div>
          </div>

        </div>
      </div>
    </section>
  );
}
