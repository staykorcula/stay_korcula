/**
 * sitemap.xml - Tells search engines which pages to crawl
 * Improves indexing speed and ensures all important pages are discovered
 */
import { MetadataRoute } from 'next';
import { siteConfig } from './[locale]/data/config';
import { getAllPropertySlugs } from './[locale]/data/properties';
import { getAllServiceSlugs } from './[locale]/data/services';

const locales = ['hr', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const propertySlugs = getAllPropertySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const routes: MetadataRoute.Sitemap = [];

  // Root pages per locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    // Accommodations listing
    routes.push({
      url: `${baseUrl}/${locale}/accommodations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Services listing
    routes.push({
      url: `${baseUrl}/${locale}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Property pages per locale
  propertySlugs.forEach((slug) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/accommodations/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Service pages per locale
  serviceSlugs.forEach((slug) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  return routes;
}

