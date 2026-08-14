import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getSitemapEntries } from '@/lib/registry/data';

const docsPages = [
  '/docs',
  '/docs/getting-started',
  '/docs/cli',
  '/docs/components',
  '/docs/customization',
  '/docs/registry',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...docsPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const registryEntries = getSitemapEntries(baseUrl) as MetadataRoute.Sitemap;

  return [...staticEntries, ...registryEntries];
}
