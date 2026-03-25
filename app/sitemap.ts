import { MetadataRoute } from 'next';

const baseUrl = 'https://calcfi.io';
const locales = ['en', 'es'];
const tools = ['mortgage', 'compound-interest', 'loan', 'bitcoin-profit', 'dca', 'financial-advisor'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    for (const tool of tools) {
      entries.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
