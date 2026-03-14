import type { Service } from '../../data/types';
import { Locale } from '../i18n/i18n';
import { siteConfig } from '../../data/config';
import { contactInfo } from '../../data/contact';

export function generateServiceSchema(service: Service, locale: Locale) {
  const isCroatian = locale === 'hr';
  const serviceContact = service.contact || contactInfo;

  // Determine service type based on category
  let serviceType = 'Service';
  if (service.category === 'boat') {
    serviceType = 'BoatRentalService';
  } else if (service.category === 'transport') {
    serviceType = 'TaxiService';
  }

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": serviceType,
    "name": service.name[locale],
    "description": service.description[locale],
    "url": `${siteConfig.url}/${locale}/services/${service.slug}`,
    "provider": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "telephone": serviceContact.phone,
      "email": serviceContact.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": contactInfo.address.city,
        "addressCountry": isCroatian ? "HR" : "Croatia",
      },
    },
    "areaServed": {
      "@type": "City",
      "name": isCroatian ? "Korčula" : "Korcula",
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${siteConfig.url}/${locale}/services/${service.slug}`,
      "servicePhone": serviceContact.phone,
    },
  };

  // Add price information if available
  if (service.price && service.price.from) {
    schema.offers = {
      "@type": "Offer",
      "price": service.price.from,
      "priceCurrency": service.price.currency,
      "availability": "https://schema.org/InStock",
      "url": `${siteConfig.url}/${locale}/services/${service.slug}`,
    };
  }

  // Add image
  if (service.heroImage) {
    schema.image = `${siteConfig.url}${service.heroImage}`;
  }

  // Add duration if available
  if (service.duration) {
    schema.duration = service.duration[locale];
  }

  // Add capacity if available
  if (service.capacity) {
    schema.audience = {
      "@type": "Audience",
      "audienceType": "People",
    };
    if (service.capacity.min && service.capacity.max) {
      (schema.audience as Record<string, string>).name = `${service.capacity.min}-${service.capacity.max} ${service.capacity.unit === 'people' ? (isCroatian ? 'osoba' : 'people') : service.capacity.unit}`;
    }
  }

  return schema;
}

