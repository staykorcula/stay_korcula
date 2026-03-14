/**
 * Centralized contact information
 * All phone numbers, emails, addresses, and social links
 */

export const contactInfo = {
  // Primary contact
  email: 'staykorcula@gmail.com',
  phone: '+385 95 822 3830',
  phoneFormatted: '+385 95 822 3830',
  phoneRaw: '385958223830', // For tel: links without spaces
  whatsapp: '385958223830', // For WhatsApp links
  
  // Address
  address: {
    street: 'Vela Luka',
    city: 'Vela Luka',
    region: 'Korčula',
    country: 'Hrvatska',
    countryEn: 'Croatia',
    full: {
      hr: 'Vela Luka, Korčula, Hrvatska',
      en: 'Vela Luka, Korčula, Croatia',
    },
  },
  
  // Coordinates
  coordinates: {
    latitude: 42.9631,
    longitude: 16.7222,
  },
  
  // Google Maps
  googleMaps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14559.582017316408!2d16.711350429310116!3d42.958613119434006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a713378eda8ef%3A0x9918a273998bc1a2!2sVilla%20Aquamare!5e0!3m2!1shr!2shr!4v1755541633084!5m2!1shr!2shr',
    linkUrl: 'https://maps.app.goo.gl/BJEZmcu8VxmjRSFd8',
  },
  
  // Social media
  social: {
    instagram: 'https://instagram.com/staykorcula',
    facebook: 'https://facebook.com/staykorcula',
  },
  
  // Business hours (if applicable)
  businessHours: {
    hr: 'Dostupni smo 24/7 za vaše upite',
    en: 'Available 24/7 for your inquiries',
  },
} as const;

