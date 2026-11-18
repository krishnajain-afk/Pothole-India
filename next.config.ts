import type { NextConfig } from 'next';

/* Pages that are still plain HTML in /public, served at their clean routes.
   Each one moves into app/ as it gets ported: move its name from STATIC_PAGES to PORTED (so the old .html address
   still redirects) and add its route to PORTED in components/site/SiteNav.tsx. */
const STATIC_PAGES = ['dodge', 'rishta', 'on-the-move', 'know-who'];
const PORTED = ['wall-of-holes', 'case-files', 'updates', 'research', 'lab'];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    // fallback for the rishta and wall photos: if a build-time copy is missing, the photo loads through /_next/image
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/commons/**' },
      { protocol: 'https', hostname: 'thumb.wikimedia.org', pathname: '/wikipedia/commons/**' },   // Commons' newer thumbnail host
    ],
  },
  async redirects() {
    return [
      { source: '/genz', destination: '/', permanent: false },
      // the .html names still work, but the clean route is the real address
      ...[...STATIC_PAGES, ...PORTED].map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        ...STATIC_PAGES.map((p) => ({ source: `/${p}`, destination: `/${p}.html` })),
        // the lab nav uses the local file names on localhost (index-genz.html = /, index-genz-meme.html = /lab)
        { source: '/index-genz.html', destination: '/' },
        { source: '/index-genz-meme.html', destination: '/lab' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

export default nextConfig;
