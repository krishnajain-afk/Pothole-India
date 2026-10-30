import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/* Only indexable pages go here. Add a lab page when its noindex comes off. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 }];
}
