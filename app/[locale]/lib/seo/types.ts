/**
 * SEO Module - Type Definitions
 * Type-safe metadata and structured data types for production-grade SEO
 */

import type { Metadata } from 'next';
import type { Locale } from '../i18n/i18n';

/** Page-level SEO overrides - pages can extend this for custom metadata */
export interface PageSEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  /** Relative path for canonical (e.g. /hr/accommodations/villa-aquamare) */
  path?: string;
  /** OG image path or URL - defaults to site default if not provided */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Disable indexing for this page */
  noIndex?: boolean;
  /** Structured data to merge with page schema */
  schema?: Record<string, unknown>;
}

/** Base metadata config used by generateMetadata */
export interface MetadataConfig extends PageSEOConfig {
  locale: Locale;
  /** Absolute URL - used for canonical, OG url */
  absoluteUrl?: string;
}

/** Breadcrumb item for BreadcrumbList schema */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/** JSON-LD schema types */
export type SchemaType =
  | 'WebSite'
  | 'Organization'
  | 'LocalBusiness'
  | 'LodgingBusiness'
  | 'BreadcrumbList'
  | 'Service';

/** Re-export Next.js Metadata for convenience */
export type { Metadata };
