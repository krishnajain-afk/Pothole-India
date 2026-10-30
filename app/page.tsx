import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Cta, Footer, Nav, RebBand, Receipts, Swerve, Tapes } from '@/components/home/Sections';
import { HomeEffects } from '@/components/home/HomeEffects';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const DESCRIPTION = 'India has swerved, slowed down and suffered enough. The potholes are getting fixed. Cars24 Patch, coming soon.';

export const metadata: Metadata = {
  title: 'Cars24 Patch — shut up ***hole. Coming soon.',
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
    title: 'Shut up ***hole. — Cars24 Patch, coming soon',
    description: 'India has swerved, slowed down and suffered enough. The potholes are getting fixed.',
    locale: 'en_IN',
  },
  twitter: { card: 'summary' },
};

/* structured data: tells search engines what this site is. Only facts already on the page. */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: 'en-IN',
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className="skip" href="#main">Skip to content</a>
      <div className="cursor" id="cursor" aria-hidden="true"></div>
      <Nav />
      <main id="main">
        <Hero />
        <Tapes />
        <Receipts />
        <Swerve />
        <Cta />
        <RebBand />
      </main>
      <Footer />
      <HomeEffects />
    </>
  );
}
