import type { BaseProperty, PropertyGalleryImage } from '../types';
import { contactInfo } from '../contact';

const KARBUNI = '/images/KARBUNI';

const gallery: PropertyGalleryImage[] = Array.from({ length: 38 }, (_, i) => ({
  src: `${KARBUNI}/Karbuni${i + 1}.jpeg`,
  alt: {
    hr: `Holiday House Karbuni Paradise — fotografija ${i + 1}`,
    en: `Holiday House Karbuni Paradise — photo ${i + 1}`,
  },
}));

export const holidayHouseKarbuniParadise: BaseProperty = {
  id: 'property_holiday_house_karbuni_paradise',
  slug: 'holiday-house-karbuni-paradise',
  name: {
    hr: 'Holiday House Karbuni Paradise',
    en: 'Holiday House Karbuni Paradise',
  },
  location: {
    hr: 'Karbuni, Korčula',
    en: 'Karbuni, Korčula',
  },
  coordinates: {
    latitude: 42.9564,
    longitude: 16.8797,
  },
  googleMaps: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1460.9498887057416!2d16.734398735790748!3d42.91715463933301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1shr!2shr!4v1776158751878!5m2!1shr!2shr',
    linkUrl: 'https://maps.app.goo.gl/1M6Y55TM5JKDKNuM7',
  },
  description: {
    hr: 'Holiday House Karbuni Paradise mirna je oaza s jednim od najljepših pogleda na more koje možete zamisliti. Okružena netaknutom prirodom, nudi potpuno opuštanje i privatnost za savršen bijeg na odmor. Kuća ima prekrasan bazen s vanjskom terasom odmah uz njega — idealno za jutarnju kavu ili opušteni ručak. Gosti također mogu uživati u vrtu, roštilju, vanjskom tušu i privatnom parkiranju — sve što trebate za udoban boravak. Unutra se nalaze dvije spavaće sobe (jedna bračna i jedna jednokrevetna), kao i ugaona garnitura za dodatne goste. Postoji potpuno opremljena kuhinja, kupaonica i sve potrebno za ugodan boravak. Bilo da želite opustiti se uz bazen, jesti na otvorenom ili jednostavno uživati u zadivljujućem pogledu na more, Karbuni Paradise nudi sve za nezaboravan odmor.',
    en: 'Holiday House Karbuni Paradise is a peaceful retreat with one of the most stunning sea views you can imagine. Surrounded by untouched nature, it offers complete relaxation and privacy for a perfect holiday escape. The house features a beautiful swimming pool with an outdoor terrace right beside it—ideal for enjoying your morning coffee or relaxing lunches. Guests can also enjoy a garden, BBQ area, outdoor shower, and private parking, providing everything needed for a comfortable stay. Inside, the house includes two bedrooms (one double and one single), as well as a sofa bed for additional guests. There is a fully equipped kitchen, bathroom, and all the essentials to make your stay effortless and enjoyable. Whether you are looking to unwind by the pool, dine outdoors, or simply take in the breathtaking sea view, Karbuni Paradise offers everything for an unforgettable holiday.',
  },
  shortDescription: {
    hr: 'Kuća s bazenom i pogledom na more u Karbunima — 2 sobe, privatnost i mir',
    en: 'Pool house with sea view in Karbuni — 2 bedrooms, privacy and tranquillity',
  },
  heroImage: `${KARBUNI}/Karbuni1.jpeg`,
  mainImage: `${KARBUNI}/Karbuni1.jpeg`,
  gallery,
  capacity: {
    people: 5,
    bedrooms: 2,
    bathrooms: 1,
  },
  amenities: [
    { icon: 'sun', description: { hr: 'Bazen i terasa uz bazen', en: 'Swimming pool and poolside terrace' } },
    { icon: 'beach', description: { hr: 'Zadivljujući pogled na more', en: 'Stunning sea view' } },
    { icon: 'terrace', description: { hr: 'Vanjska terasa', en: 'Outdoor terrace' } },
    { icon: 'bbq', description: { hr: 'Roštilj', en: 'BBQ area' } },
    { icon: 'shower', description: { hr: 'Vanjski tuš', en: 'Outdoor shower' } },
    { icon: 'parking', description: { hr: 'Privatno parkiranje', en: 'Private parking' } },
    { icon: 'kitchen', description: { hr: 'Potpuno opremljena kuhinja', en: 'Fully equipped kitchen' } },
    { icon: 'wifi', description: { hr: 'Wi-Fi', en: 'Wi-Fi' } },
    { icon: 'umbrella', description: { hr: 'Vrt', en: 'Garden' } },
  ],
  content: {
    location: {
      subtitle: { hr: 'U uvali Karbuni na otoku Korčuli', en: 'In Karbuni bay on the island of Korčula' },
      fromSplit: {
        hr: 'Iz Splita: trajekt do Vele Luke ili Korčule, zatim vožnja do Karbuna (~45–60 min od trajekta)',
        en: 'From Split: ferry to Vela Luka or Korčula town, then drive to Karbuni (~45–60 min from the ferry)',
      },
      fromDubrovnik: {
        hr: 'trajekt Orebić - Korčula, zatim vožnja do Karbuna',
        en: 'ferry Orebić - Korčula, then drive to Karbuni',
      },
      localTransport: {
        hr: 'Karbuni su mirna uvala blizu Blata — preporučujemo vlastiti prijevoz',
        en: 'Karbuni is a quiet bay near Blato — we recommend having your own transport',
      },
      nearby: [
        { hr: 'More i priroda — odmah uz smještaj', en: 'Sea and nature — right by the property' },
        { hr: 'Blato — trgovine i usluge (~15 min vožnje)', en: 'Blato — shops and services (~15 min drive)' },
        { hr: 'Plaže i uvale u okolici', en: 'Beaches and coves nearby' },
      ],
    },
    about: {
      subtitle: { hr: 'Vaš mirni kutak uz more', en: 'Your quiet corner by the sea' },
    },
  },
  reviews: [],
  faq: [
    {
      question: { hr: 'Kada je check-in?', en: 'What are check-in times?' },
      answer: {
        hr: 'Check-in je od 15:00, check-out do 10:00.',
        en: 'Check-in is from 15:00, check-out until 10:00.',
      },
    },
    {
      question: { hr: 'Ima li bazen?', en: 'Is there a swimming pool?' },
      answer: {
        hr: 'Da, kuća ima privatni bazen s terasom.',
        en: 'Yes, the house has a private pool with a terrace.',
      },
    },
    {
      question: { hr: 'Koliko gostiju može boraviti?', en: 'How many guests can stay?' },
      answer: {
        hr: 'Dvije spavaće sobe i ugaona garnitura — do 5 gostiju.',
        en: 'Two bedrooms plus a sofa bed — up to 5 guests.',
      },
    },
    {
      question: { hr: 'Ima li Wi-Fi?', en: 'Is there Wi-Fi?' },
      answer: {
        hr: 'Da, Wi-Fi je dostupan.',
        en: 'Yes, Wi-Fi is available.',
      },
    },
  ],
  contact: {
    phone: contactInfo.phone,
    whatsapp: contactInfo.whatsapp,
    email: contactInfo.email,
  },
  usps: [
    { key: 'seaView' },
    { key: 'privateTerrace' },
    { key: 'fastWifi' },
    { key: 'freeParking' },
  ],
  checkIn: '15:00',
  checkOut: '10:00',
  keywords: {
    hr: 'karbuni, korčula, smještaj, bazen, vila, kuća za odmor, uvala',
    en: 'karbuni, korcula, accommodation, pool, villa, holiday house, bay',
  },
};
