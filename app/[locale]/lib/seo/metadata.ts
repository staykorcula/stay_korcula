/**
 * Central Metadata Generator
 * Produces Next.js Metadata with Open Graph, Twitter, canonical, robots
 * Avoids duplication via shared defaults and page-level overrides
 */

import type { Metadata } from 'next';
import type { Locale } from '../i18n/i18n';
import { siteConfig } from '../../data/config';
import {
  getAbsoluteUrl,
  resolveImageUrl,
  getLocalizedPath,
} from './utils';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  FORMAT_DETECTION,
  TITLE_TEMPLATE,
} from './constants';
import type { PageSEOConfig } from './types';

/** Base metadata applied to all pages */
const BASE_METADATA: Partial<Metadata> = {
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: FORMAT_DETECTION,
};

/**
 * Generate full metadata for any page
 * Merges page overrides with defaults - supports dynamic routes
 */
export function generateMetadata(config: {
  locale: Locale;
  title: string;
  description: string;
  keywords?: string;
  /** Relative path e.g. /accommodations/villa-aquamare */
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  noIndex?: boolean;
}): Metadata {
  const {
    locale,
    title,
    description,
    keywords,
    path,
    image,
    imageAlt,
    imageWidth = DEFAULT_OG_IMAGE.width,
    imageHeight = DEFAULT_OG_IMAGE.height,
    noIndex = false,
  } = config;

  const pathSegments = path.replace(/^\//, '').split('/').filter(Boolean);
  const canonicalPath = getLocalizedPath(locale, pathSegments);
  const absoluteUrl = getAbsoluteUrl(canonicalPath);
  const imageUrl = resolveImageUrl(image || DEFAULT_OG_IMAGE.path);
  const alt = imageAlt || DEFAULT_OG_IMAGE.alt[locale];

  return {
    ...BASE_METADATA,
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: absoluteUrl,
      languages: {
        hr: getAbsoluteUrl(getLocalizedPath('hr', pathSegments)),
        en: getAbsoluteUrl(getLocalizedPath('en', pathSegments)),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : DEFAULT_ROBOTS,
  };
}

/**
 * Generate homepage metadata
 */
export function generateHomeMetadata(locale: Locale): Metadata {
  const isCroatian = locale === 'hr';
  const base = generateMetadata({
    locale,
    title: siteConfig.name, // placeholder, overridden below
    description: siteConfig.description[locale],
    keywords: isCroatian
      ? 'smještaj, korčula, vela luka, hrvatska, vile, apartmani, odmor, mediteran'
      : 'accommodation, korcula, vela luka, croatia, villas, apartments, vacation, mediterranean',
    path: '',
    image: DEFAULT_OG_IMAGE.path,
    imageAlt: isCroatian ? `${siteConfig.name} - Pogled na more` : `${siteConfig.name} - Sea view`,
  });

  // Use absolute title to avoid "StayKorčula | StayKorčula" from root layout template
  return {
    ...base,
    title: { absolute: siteConfig.name },
  };
}

/**
 * Generate metadata for listing pages (accommodations, services)
 */
export function generateListingMetadata(
  locale: Locale,
  type: 'accommodations' | 'services'
): Metadata {
  const isCroatian = locale === 'hr';
  const paths = {
    accommodations: { path: 'accommodations', title: isCroatian ? 'Smještaj' : 'Accommodations' },
    services: { path: 'services', title: isCroatian ? 'Usluge' : 'Services' },
  };
  const { path, title } = paths[type];

  const descriptions = {
    accommodations: isCroatian
      ? 'Odaberite savršenu opciju za vaš odmor. Moderne vile i apartmani uz more u Veloj Luci na otoku Korčuli.'
      : 'Choose the perfect option for your stay. Modern villas and apartments by the sea in Vela Luka, Korčula.',
    services: isCroatian
      ? 'Otkrijte naše usluge: iznajmljivanje čamaca, transferi, taxi usluge i više. Sve što trebate za kompletan odmor na Korčuli.'
      : 'Discover our services: boat rentals, transfers, taxi services and more. Everything you need for a complete vacation on Korčula.',
  };

  const keywords = {
    accommodations: isCroatian
      ? 'smještaj, korčula, vela luka, vile, apartmani, hrvatska'
      : 'accommodation, korcula, vela luka, villas, apartments, croatia',
    services: isCroatian
      ? 'usluge, korčula, iznajmljivanje čamaca, transfer, taxi, hrvatska'
      : 'services, korcula, boat rental, transfer, taxi, croatia',
  };

  return generateMetadata({
    locale,
    title: `${title} | ${siteConfig.name}`,
    description: descriptions[type],
    keywords: keywords[type],
    path,
    image: DEFAULT_OG_IMAGE.path,
  });
}
