/**
 * SEO Utilities
 * Canonical URL detection, image URL resolution, and helpers
 */

import { siteConfig } from '../../data/config';
import type { Locale } from '../i18n/i18n';

/**
 * Build absolute URL from path
 * Ensures canonical and OG URLs are always absolute for proper indexing
 */
export function getAbsoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Resolve image URL - handles relative paths and absolute URLs
 * Required for OG images and structured data
 */
export function resolveImageUrl(
  image: string | undefined,
  fallback = `${siteConfig.url}/images/dron.jpg`
): string {
  if (!image) return fallback;
  if (image.startsWith('http')) return image;
  return `${siteConfig.url}${image.startsWith('/') ? '' : '/'}${image}`;
}

/**
 * Build hreflang alternate URLs for a path
 * Helps search engines serve correct language version
 */
export function getAlternateUrls(
  path: string,
  locales: readonly Locale[]
): Record<string, string> {
  const base = siteConfig.url.replace(/\/$/, '');
  const result: Record<string, string> = {};
  for (const locale of locales) {
    result[locale] = `${base}/${locale}${path}`;
  }
  return result;
}

/**
 * Build path for a locale (e.g. /accommodations/villa-aquamare)
 * Used for canonical and alternates
 */
export function getLocalizedPath(
  locale: Locale,
  segments: string[]
): string {
  const path = segments.filter(Boolean).join('/');
  return `/${locale}${path ? `/${path}` : ''}`;
}
