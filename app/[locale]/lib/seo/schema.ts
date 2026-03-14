/**
 * Structured Data (JSON-LD) Schemas
 * WebSite, Organization, BreadcrumbList for rich search results
 */

import { siteConfig } from '../../data/config';
import { contactInfo } from '../../data/contact';
import type { Locale } from '../i18n/i18n';
import { getAbsoluteUrl } from './utils';
import type { BreadcrumbItem } from './types';

/**
 * BreadcrumbList schema - improves search result display with breadcrumb trail
 * Helps Google understand site hierarchy
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  locale: Locale
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  };
}

/**
 * WebSite schema - enables sitelinks search box in Google
 * Defines site structure and search potential
 */
export function generateWebSiteSchema(locale: Locale): Record<string, unknown> {
  const isCroatian = locale === 'hr';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description[locale],
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/accommodations?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization schema - entity for the business
 * Used in Knowledge Graph and rich results
 */
export function generateOrganizationSchema(locale: Locale): Record<string, unknown> {
  const isCroatian = locale === 'hr';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactInfo.phone,
      contactType: 'customer service',
      email: contactInfo.email,
      availableLanguage: ['hr', 'en'],
      areaServed: isCroatian ? 'HR' : 'Croatia',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: contactInfo.address.city,
      addressRegion: 'Korčula',
      addressCountry: isCroatian ? 'HR' : 'Croatia',
      streetAddress: contactInfo.address.full[locale],
    },
    sameAs: [contactInfo.social.instagram, contactInfo.social.facebook],
  };
}

/**
 * Build breadcrumb items for a property page
 */
export function getPropertyBreadcrumbItems(
  locale: Locale,
  propertyName: string,
  slug: string
): BreadcrumbItem[] {
  const isCroatian = locale === 'hr';
  return [
    { name: isCroatian ? 'Početna' : 'Home', url: `/${locale}` },
    { name: isCroatian ? 'Smještaj' : 'Accommodations', url: `/${locale}/accommodations` },
    { name: propertyName, url: `/${locale}/accommodations/${slug}` },
  ];
}

/**
 * Build breadcrumb items for a service page
 */
export function getServiceBreadcrumbItems(
  locale: Locale,
  serviceName: string,
  slug: string
): BreadcrumbItem[] {
  const isCroatian = locale === 'hr';
  return [
    { name: isCroatian ? 'Početna' : 'Home', url: `/${locale}` },
    { name: isCroatian ? 'Usluge' : 'Services', url: `/${locale}/services` },
    { name: serviceName, url: `/${locale}/services/${slug}` },
  ];
}
