import { MetadataRoute } from 'next';

const baseUrl = 'https://calcfi.io';
const locales = ['en', 'es'];
const tools = [
  'mortgage', 'compound-interest', 'loan', 'bitcoin-profit', 'dca', 'financial-advisor',
  'fire', 'savings', 'net-worth', 'currency-converter',
];
const staticPages = ['about', 'privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    for (const tool of tools) {
      entries.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
