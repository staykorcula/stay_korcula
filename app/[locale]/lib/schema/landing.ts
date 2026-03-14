import { Locale } from '../i18n/i18n';
import { siteConfig } from '../../data/config';
import { contactInfo } from '../../data/contact';

export function generateLandingSchema(locale: Locale) {
  const isCroatian = locale === 'hr';

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/images/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": contactInfo.phone,
          "contactType": "customer service",
          "email": contactInfo.email,
          "availableLanguage": ["hr", "en"],
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": contactInfo.address.city,
          "addressRegion": "Korčula",
          "addressCountry": isCroatian ? "HR" : "Croatia",
          "streetAddress": contactInfo.address.full[locale],
        },
        "sameAs": [
          contactInfo.social.instagram,
          contactInfo.social.facebook,
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        "name": siteConfig.name,
        "image": `${siteConfig.url}/images/dron.jpg`,
        "description": siteConfig.description[locale],
        "url": siteConfig.url,
        "telephone": contactInfo.phone,
        "email": contactInfo.email,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": contactInfo.address.city,
          "addressRegion": "Korčula",
          "addressCountry": isCroatian ? "HR" : "Croatia",
          "streetAddress": contactInfo.address.full[locale],
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 42.9586,
          "longitude": 16.7114,
        },
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.name,
        "description": siteConfig.description[locale],
        "publisher": {
          "@id": `${siteConfig.url}/#organization`,
        },
        "inLanguage": locale,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteConfig.url}/${locale}/accommodations?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

