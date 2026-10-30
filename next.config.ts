import type { NextConfig } from 'next';

/* Pages that are still plain HTML in /public, served at their clean routes.
   Each one moves into app/ as it gets ported; delete its line here when it does. */
const STATIC_PAGES = ['lab', 'updates', 'research', 'case-files', 'wall-of-holes', 'dodge', 'on-the-move', 'know-who'];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/genz', destination: '/', permanent: false },
      // the .html names still work, but the clean route is the real address
      ...STATIC_PAGES.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        ...STATIC_PAGES.map((p) => ({ source: `/${p}`, destination: `/${p}.html` })),
        // the lab nav uses the local file names on localhost (index-genz.html = /, index-genz-meme.html = /lab)
        { source: '/index-genz.html', destination: '/' },
        { source: '/index-genz-meme.html', destination: '/lab.html' },
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
