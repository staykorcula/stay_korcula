/**
 * Testimonials data for landing page
 * Can be shared across properties or be property-specific
 */

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: {
    hr: string;
    en: string;
  };
  date: string;
  property?: string; // Optional: which property they stayed at
  avatar?: string; // Optional: avatar image URL
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ana & Marko',
    location: 'Zagreb, Hrvatska',
    rating: 5,
    text: {
      hr: 'Savršen odmor! Vila je prekrasna, direktno uz more. Uživali smo u svakom trenutku. Vlasnici su bili vrlo gostoljubivi i pomogli su nam oko svega što smo trebali. Definitivno ćemo se vratiti!',
      en: 'Perfect vacation! The villa is beautiful, directly by the sea. We enjoyed every moment. The owners were very hospitable and helped us with everything we needed. We will definitely come back!',
    },
    date: 'Kolovoz 2023',
    property: 'Villa Aquamare',
  },
  {
    id: 2,
    name: 'Sarah & James',
    location: 'London, UK',
    rating: 5,
    text: {
      hr: 'Nevjerojatno iskustvo! Otok Korčula je prekrasan, a smještaj je bio savršen. Preporučujemo iznajmljivanje čamca - najbolji dio našeg odmora!',
      en: 'Amazing experience! The island of Korčula is beautiful, and the accommodation was perfect. We recommend renting a boat - the best part of our vacation!',
    },
    date: 'Srpanj 2023',
  },
  {
    id: 3,
    name: 'Petra & Tomislav',
    location: 'Split, Hrvatska',
    rating: 5,
    text: {
      hr: 'Odličan odmor s obitelji. Lokacija je savršena, more je čisto, a usluga je bila izvrsna. Hvala StayKorčula timu na svemu!',
      en: 'Great vacation with the family. The location is perfect, the sea is clean, and the service was excellent. Thank you StayKorčula team for everything!',
    },
    date: 'Rujan 2023',
    property: 'Villa Aquamare',
  },
  {
    id: 4,
    name: 'Michael & Lisa',
    location: 'Berlin, Germany',
    rating: 5,
    text: {
      hr: 'Prekrasan otok, prekrasan smještaj. Transfer iz zračne luke je bio organiziran savršeno. Sve je bilo jednostavno i profesionalno.',
      en: 'Beautiful island, beautiful accommodation. The airport transfer was organized perfectly. Everything was simple and professional.',
    },
    date: 'Lipanj 2023',
  },
];

/**
 * Get featured testimonials (for landing page)
 */
export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  return testimonials.slice(0, count);
}

