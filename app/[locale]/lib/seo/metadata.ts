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
  PAGE_OG_IMAGES,
} from './constants';
import type { PageSEOConfig } from './types';

/** Base metadata applied to all pages */
const BASE_METADATA: Partial<Metadata> = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: FORMAT_DETECTION,
  category: 'travel',
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
 * Uses korcula.jpg aerial view of Korčula old town for OG/Twitter
 */
export function generateHomeMetadata(locale: Locale): Metadata {
  const isCroatian = locale === 'hr';
  const base = generateMetadata({
    locale,
    title: siteConfig.name,
    description: siteConfig.description[locale],
    keywords: isCroatian
      ? 'smještaj Korčula, vela luka, hrvatska, vile, apartmani, odmor, mediteran, otok Korčula, Jadransko more'
      : 'accommodation Korcula, vela luka, croatia, villas, apartments, vacation, mediterranean, Korcula island, Adriatic sea',
    path: '',
    image: PAGE_OG_IMAGES.home,
    imageAlt: isCroatian
      ? `${siteConfig.name} - Pogled na staru grad Korčulu i Jadransko more`
      : `${siteConfig.name} - Aerial view of Korčula old town and Adriatic Sea`,
  });

  return {
    ...base,
    title: { absolute: siteConfig.name },
  };
}

/**
 * Generate metadata for accommodations listing page
 * Presents our accommodations and StayKorčula — uses dron.jpg aerial coastal view
 */
export function generateAccommodationsMetadata(locale: Locale): Metadata {
  const isCroatian = locale === 'hr';
  return generateMetadata({
    locale,
    title: isCroatian ? `Smještaj | ${siteConfig.name}` : `Accommodations | ${siteConfig.name}`,
    description: isCroatian
      ? 'Upoznajte naše smještaje i nas. StayKorčula nudi moderne vile i apartmane uz more na otoku Korčuli — Villa Aquamare, Villa Prigradica Paradise, Holiday House Kata Babina i Holiday House Karbuni Paradise. Rezervirajte direktno po najboljoj cijeni.'
      : 'Discover our accommodations and who we are. StayKorčula offers modern villas and apartments by the sea on Korčula island — Villa Aquamare, Villa Prigradica Paradise, Holiday House Kata Babina, and Holiday House Karbuni Paradise. Book direct for the best rate.',
    keywords: isCroatian
      ? 'smještaj Korčula, StayKorčula, vila Aquamare, vila Prigradica, Kata Babina, Karbuni, vela luka, apartmani, hrvatska'
      : 'accommodation Korcula, StayKorcula, Villa Aquamare, Villa Prigradica, Kata Babina, Karbuni, vela luka, apartments, croatia',
    path: 'accommodations',
    image: PAGE_OG_IMAGES.accommodations,
    imageAlt: isCroatian
      ? `${siteConfig.name} - Naši smještaji uz Jadransko more na Korčuli`
      : `${siteConfig.name} - Our accommodations by the Adriatic Sea on Korčula`,
  });
}

/**
 * Generate metadata for services listing page
 */
export function generateServicesMetadata(locale: Locale): Metadata {
  const isCroatian = locale === 'hr';
  return generateMetadata({
    locale,
    title: isCroatian ? `Usluge | ${siteConfig.name}` : `Services | ${siteConfig.name}`,
    description: isCroatian
      ? 'Otkrijte naše usluge: iznajmljivanje čamaca, transferi, taxi usluge i više. Sve što trebate za kompletan odmor na Korčuli.'
      : 'Discover our services: boat rentals, transfers, taxi services and more. Everything you need for a complete vacation on Korčula.',
    keywords: isCroatian
      ? 'usluge, korčula, iznajmljivanje čamaca, transfer, taxi, hrvatska'
      : 'services, korcula, boat rental, transfer, taxi, croatia',
    path: 'services',
    image: DEFAULT_OG_IMAGE.path,
  });
}

/**
 * Generate metadata for listing pages (accommodations, services)
 * @deprecated Use generateAccommodationsMetadata or generateServicesMetadata for page-specific images
 */
export function generateListingMetadata(
  locale: Locale,
  type: 'accommodations' | 'services'
): Metadata {
  return type === 'accommodations'
    ? generateAccommodationsMetadata(locale)
    : generateServicesMetadata(locale);
}
