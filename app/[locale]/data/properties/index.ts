/**
 * Properties aggregator
 * Imports all properties and provides helper functions
 */

import type { BaseProperty } from '../types';
import type { Locale } from '../../lib/i18n/i18n';
import { villaAquamare } from './villa-aquamare';
import { holidayHouseKataBabina } from './holiday-house-kata-babina';
import { villaPrigradicaParadise } from './villa-prigradica-paradise';
import { holidayHouseKarbuniParadise } from './holiday-house-karbuni-paradise';

// Import all properties here
const allProperties: BaseProperty[] = [
  villaAquamare,
  holidayHouseKataBabina,
  villaPrigradicaParadise,
  holidayHouseKarbuniParadise,
];

/**
 * Get all properties
 */
export function getAllProperties(locale?: Locale): BaseProperty[] {
  return allProperties as BaseProperty[];
}

/**
 * Get property by slug
 */
export function getPropertyBySlug(slug: string): BaseProperty | undefined {
  return allProperties.find((p) => p.slug === slug);
}

/**
 * Get property by ID
 */
export function getPropertyById(id: string): BaseProperty | undefined {
  return allProperties.find((p) => p.id === id);
}

/**
 * Get all property slugs (for static generation)
 */
export function getAllPropertySlugs(): string[] {
  return allProperties.map((p) => p.slug);
}

/**
 * Get all property IDs
 */
export function getAllPropertyIds(): string[] {
  return allProperties.map((p) => p.id);
}

// Export types
export type { BaseProperty as Property };
export type * from '../types';

// Export individual properties (for direct imports if needed)
export {
  villaAquamare,
  holidayHouseKataBabina,
  villaPrigradicaParadise,
  holidayHouseKarbuniParadise,
};

