/**
 * SEO Module - Central Export
 * Production-grade SEO utilities for Next.js App Router
 *
 * Usage:
 * - generateMetadata() for page metadata
 * - generate*Schema() for JSON-LD structured data
 * - getAbsoluteUrl(), resolveImageUrl() for URL helpers
 */

export {
  generateMetadata,
  generateHomeMetadata,
  generateListingMetadata,
} from './metadata';

export {
  generateBreadcrumbSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
  getPropertyBreadcrumbItems,
  getServiceBreadcrumbItems,
} from './schema';

export { getAbsoluteUrl, resolveImageUrl, getAlternateUrls, getLocalizedPath } from './utils';

export { DEFAULT_OG_IMAGE, TITLE_TEMPLATE, DEFAULT_ROBOTS } from './constants';

export type { PageSEOConfig, BreadcrumbItem, MetadataConfig } from './types';
