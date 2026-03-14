import type { Metadata } from 'next';
import type { Property } from '../../data/types';
import type { Locale } from '../i18n/i18n';
import { siteConfig } from '../../data/config';
import { contactInfo } from '../../data/contact';
import { generateMetadata as generateSEOMetadata } from '../seo';

export function generatePropertyMetadata(property: Property, locale: Locale): Metadata {
  const propertyName = typeof property.name === 'string' ? property.name : property.name[locale];
  const propertyNameLower = propertyName.toLowerCase();

  return generateSEOMetadata({
    locale,
    title: `${propertyName} | ${siteConfig.name}`,
    description: property.shortDescription[locale],
    keywords:
      locale === 'hr'
        ? `${propertyNameLower}, korčula, vela luka, hrvatska, smještaj, vila, apartman`
        : `${propertyNameLower}, korcula, vela luka, croatia, accommodation, villa, apartment`,
    path: `accommodations/${property.slug}`,
    image: (property.mainImage || property.heroImage).startsWith('http') ? undefined : (property.mainImage || property.heroImage),
    imageAlt: propertyName,
  });
}

export function generatePropertySchema(property: Property, locale: Locale) {
  const isCroatian = locale === 'hr';
  
  // Handle both old format (string) and new format (LocalizedString)
  const propertyName = typeof property.name === 'string' ? property.name : property.name[locale];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: propertyName,
    description: property.description[locale],
    url: `${siteConfig.url}/${locale}/accommodations/${property.slug}`,
    telephone: property.contact?.phone || contactInfo.phone,
    email: property.contact?.email || contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location[locale],
      addressRegion: 'Korčula',
      addressCountry: isCroatian ? 'HR' : 'HR',
      streetAddress: property.location[locale],
    },
    ...(property.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: property.coordinates.latitude,
        longitude: property.coordinates.longitude,
      },
    }),
    image: property.gallery?.slice(0, 4).map((img) => 
      img.src.startsWith('http') ? img.src : `${siteConfig.url}${img.src}`
    ) || [`${siteConfig.url}${property.mainImage || property.heroImage}`],
    priceRange: property.priceRange ? `€${property.priceRange.from}+` : '€€',
    amenityFeature: property.amenities?.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.icon,
      value: true,
    })) || [],
    areaServed: {
      '@type': 'Country',
      name: isCroatian ? 'Hrvatska' : 'Croatia',
    },
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    checkinTime: property.checkIn || '15:00',
    checkoutTime: property.checkOut || '10:00',
    numberOfRooms: property.capacity?.bedrooms || 1,
    petsAllowed: false,
    smokingAllowed: false,
    wheelchairAccessible: false,
  };
}

