/**
 * SEO Constants
 * Default values and configuration for SEO across the site
 */

import { siteConfig } from '../../data/config';

/** Default OG image dimensions - 1200x630 is optimal for social sharing */
export const DEFAULT_OG_IMAGE = {
  path: '/images/korcula.jpg',
  width: 1200,
  height: 630,
  alt: {
    hr: `${siteConfig.name} - Pogled na more, Korčula`,
    en: `${siteConfig.name} - Sea view, Korčula`,
  },
} as const;

/** Page-specific OG images for optimal social sharing per route */
export const PAGE_OG_IMAGES = {
  home: '/images/korcula.jpg',
  accommodations: '/images/dron.jpg',
  'villa-aquamare': '/images/dron.jpg',
  'villa-prigradica-paradise': '/images/PRIGRADICA/prigradica1.jpg',
  'holiday-house-kata-babina': '/images/BABINA/babina20.jpg',
  'holiday-house-karbuni-paradise': '/images/KARBUNI/Karbuni1.jpeg',
} as const;

/** Title template - {page} | {site} for consistency */
export const TITLE_TEMPLATE = {
  default: `%s | ${siteConfig.name}`,
  /** For homepage - no page prefix */
  home: `${siteConfig.name} - %s`,
} as const;

/** Default robots - allow indexing, following, full preview */
export const DEFAULT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
} as const;

/** Format detection - disable auto-linking of emails/phones in metadata */
export const FORMAT_DETECTION = {
  email: false,
  address: false,
  telephone: false,
} as const;
