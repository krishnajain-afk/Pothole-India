import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFD60A',
};

/* Yellow is the look. ?theme=blue shows the alternative (nothing is saved). Set before first paint, as before. */
const THEME = `(function(){var t='yellow';try{if(new URLSearchParams(location.search).get('theme')==='blue')t='blue';}catch(e){}document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('js');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the theme script changes <html> before React loads, so React must not complain about it
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Permanent+Marker&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
