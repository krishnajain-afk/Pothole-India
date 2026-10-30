import type { CSSProperties } from 'react';

/* style={vars({ '--r': '-2deg' })}: CSS custom properties, which React's style type doesn't know about */
export function vars(v: Record<string, string>): CSSProperties {
  return v as CSSProperties;
}

/* the pothole face: dark on the yellow nav, yellow on the black footer */
export function Mark({ dark = true }: { dark?: boolean }) {
  const hole = dark ? '#121212' : '#FFD60A';
  const eye = dark ? '#fff' : '#121212';
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <ellipse cx="20" cy="22" rx="18" ry="14" fill={hole} />
      <circle cx="14" cy="19.5" r="4.6" fill={eye} />
      <circle cx="26" cy="19.5" r="4.6" fill={eye} />
      <circle cx="15" cy="20.2" r="2.1" fill={hole} />
      <circle cx="27" cy="20.2" r="2.1" fill={hole} />
      <path d="M14 28.5q6 4 12 0" fill="none" stroke={eye} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const STAR =
  '50.0,2.0 57.4,12.7 68.4,5.7 71.1,18.4 83.9,16.1 81.6,28.9 94.3,31.6 87.3,42.6 98.0,50.0 87.3,57.4 94.3,68.4 81.6,71.1 83.9,83.9 71.1,81.6 68.4,94.3 57.4,87.3 50.0,98.0 42.6,87.3 31.6,94.3 28.9,81.6 16.1,83.9 18.4,71.1 5.7,68.4 12.7,57.4 2.0,50.0 12.7,42.6 5.7,31.6 18.4,28.9 16.1,16.1 28.9,18.4 31.6,5.7 42.6,12.7';

/* 20-point starburst sticker with two lines of text */
export function Starburst({ fill, lines }: { fill: string; lines: [string, string] }) {
  return (
    <svg viewBox="0 0 100 100">
      <polygon points={STAR} fill={fill} stroke="#121212" strokeWidth="2.6" strokeLinejoin="round" />
      <text x="50" y="47" textAnchor="middle">{lines[0]}</text>
      <text x="50" y="62" textAnchor="middle">{lines[1]}</text>
    </svg>
  );
}

/* the sign-up form. The behaviour script finds it by .sub and reads data-source. */
export function SubscribeForm({ id, idSuffix, source, className = 'sub', style }: { id: string; idSuffix: string; source: string; className?: string; style?: CSSProperties }) {
  return (
    <form className={className} style={style} id={id} noValidate data-source={source} aria-label="Get notified when Cars24 Patch launches">
      <div className="sub-row">
        <label className="sr-only" htmlFor={`email-${idSuffix}`}>Email address</label>
        <input id={`email-${idSuffix}`} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} maxLength={254} placeholder="drop your email" required aria-describedby={`msg-${idSuffix}`} />
        <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn" type="submit"><span className="lbl">notify me</span><span className="arr">↗</span><span className="spin" aria-hidden="true"></span></button>
      </div>
      <p className="sub-msg" id={`msg-${idSuffix}`} role="status" aria-live="polite"></p>
      <p className="sub-note">no spam. just potholes (getting fixed).</p>
      <div className="sub-done" role="status"><b>you’re on the list.</b><span>ride safe. we’ll email you when it’s live.</span></div>
    </form>
  );
}
