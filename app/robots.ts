import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/* Everything may be crawled. The lab and calm pages keep their own noindex tags, so only the homepage is indexed. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
