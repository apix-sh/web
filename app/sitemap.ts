import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const baseUrl = 'https://apix.sh';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    ...docs,
  ];
}
