/**
 * Internationalization utilities
 */

import { resolveLocale, type Locale } from '../utils/resolveLocale';

export type { Locale };

export const defaultLocale: Locale = 'hr';
export const locales: Locale[] = ['hr', 'en'];

/**
 * Get locale dictionary
 */
export async function getLocaleDictionary(locale: string) {
  const resolvedLocale = resolveLocale(locale);
  const { dictionaries } = await import('./dict');
  return dictionaries[resolvedLocale];
}

/**
 * Check if locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return resolveLocale(locale) === locale;
}

/**
 * Dictionary type
 */
export type Dictionary = Awaited<ReturnType<typeof getLocaleDictionary>>;

