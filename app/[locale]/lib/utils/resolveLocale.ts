/**
 * Locale resolution utilities
 */

import { siteConfig } from '../../data/config';

export type Locale = typeof siteConfig.locales[number];

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return siteConfig.locales.includes(locale as Locale);
}

/**
 * Get default locale
 */
export function getDefaultLocale(): Locale {
  return siteConfig.defaultLocale;
}

/**
 * Resolve locale from string, fallback to default
 */
export function resolveLocale(locale: string | undefined): Locale {
  if (!locale) return getDefaultLocale();
  return isValidLocale(locale) ? locale : getDefaultLocale();
}

