/**
 * Localization utility for getting localized content
 * Supports fallback to default locale if translation is missing
 */

import type { Locale } from '../i18n/i18n';
import { defaultLocale } from '../i18n/i18n';

/**
 * Localized field type - can be a string or an object with locale keys
 */
export type LocalizedField<T> = T | { [key in Locale]?: T } | { [key: string]: T };

/**
 * Get localized value from a field
 * Supports:
 * - Direct value (string, number, etc.)
 * - Object with locale keys { hr: '...', en: '...' }
 * - Fallback to default locale if current locale is missing
 */
export function getLocalized<T>(
  field: LocalizedField<T>,
  locale: Locale,
  fallback?: T
): T {
  // If field is a direct value (not an object), return it
  if (typeof field !== 'object' || field === null || Array.isArray(field)) {
    return field as T;
  }

  // If field is an object with locale keys
  if (locale in field) {
    return (field as { [key: string]: T })[locale] as T;
  }

  // Try fallback to default locale
  if (defaultLocale in field) {
    return (field as { [key: string]: T })[defaultLocale] as T;
  }

  // Try provided fallback
  if (fallback !== undefined) {
    return fallback;
  }

  // Return first available value as last resort
  const values = Object.values(field);
  if (values.length > 0) {
    return values[0] as T;
  }

  // If all else fails, throw error (shouldn't happen in production)
  throw new Error(`No localized value found for locale: ${locale}`);
}

/**
 * Get localized string (convenience function)
 */
export function getLocalizedString(
  field: LocalizedField<string>,
  locale: Locale,
  fallback?: string
): string {
  return getLocalized(field, locale, fallback || '');
}

