'use client';

import { motion } from 'framer-motion';
import { Navigation, Clock, ExternalLink } from 'lucide-react';
import type { Property } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import {
  buildEmbedUrlFromCoordinates,
  buildMapsLinkFromCoordinates,
} from '../../lib/maps';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

interface LocationProps {
  property: Property;
  locale: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    directions: string;
    fromSplit: string;
    fromDubrovnik: string;
    localTransport?: string;
    localTransportNote?: string;
    nearbyLabel?: string;
    nearby?: string[];
    openInMaps: string;
  };
}

export default function Location({ property, locale, dictionary }: LocationProps) {
  if (!property.location) {
    return null;
  }

  // Resolve map URLs: use custom embedUrl/linkUrl or generate from coordinates
  const hasCoordinates = property.coordinates?.latitude != null && property.coordinates?.longitude != null;
  const embedUrl =
    property.googleMaps?.embedUrl ??
    (hasCoordinates
      ? buildEmbedUrlFromCoordinates(
          property.coordinates!.latitude,
          property.coordinates!.longitude
        )
      : null);
  const linkUrl =
    property.googleMaps?.linkUrl ??
    (hasCoordinates
      ? buildMapsLinkFromCoordinates(
          property.coordinates!.latitude,
          property.coordinates!.longitude
        )
      : null);

  const showMap = embedUrl && linkUrl;

  return (
    <SectionWrapper id="location">
      <SectionHeader title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Map */}
        {showMap && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${typeof property.name === 'string' ? property.name : property.name[locale]} Google Map`}
                className="absolute inset-0 w-full h-full"
              />
            </div>
            
            {/* Open in Maps Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-6"
            >
              <Button
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {dictionary.openInMaps}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Directions */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            {dictionary.directions}
          </h3>

          <div className="space-y-6">
            {/* From Split */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-coastal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-6 h-6 text-coastal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'hr' ? 'Iz Splita' : 'From Split'}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {dictionary.fromSplit}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {locale === 'hr' ? 'Trajekt polazi 2-3 puta dnevno' : 'Ferry departs 2-3 times daily'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* From Dubrovnik */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-coastal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-6 h-6 text-coastal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'hr' ? 'Iz Dubrovnika' : 'From Dubrovnik'}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {dictionary.fromDubrovnik}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {locale === 'hr' ? 'Trajekt polazi 1-2 puta dnevno' : 'Ferry departs 1-2 times daily'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Transport */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-coastal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚗</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'hr' ? 'Lokalni prijevoz' : 'Local Transport'}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {dictionary.localTransport ?? (locale === 'hr' ? 'Od trajektne luke do vile: 5-10 minuta vožnje' : 'From ferry port to villa: 5-10 minutes drive')}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {dictionary.localTransportNote ?? (locale === 'hr' ? 'Možemo organizirati transfer iz luke' : 'We can organize transfer from port')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Attractions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-coastal-50 rounded-xl p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-4">
              {dictionary.nearbyLabel ?? (locale === 'hr' ? 'U blizini:' : 'Nearby:')}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {(dictionary.nearby ?? [
                locale === 'hr' ? 'Plaža - 2 min' : 'Beach - 2 min',
                locale === 'hr' ? 'Restorani - 5 min' : 'Restaurants - 5 min',
                locale === 'hr' ? 'Trgovina - 3 min' : 'Shop - 3 min',
                locale === 'hr' ? 'Ljekarna - 5 min' : 'Pharmacy - 5 min',
              ]).map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="text-2xl">{['🏖️', '🍽️', '🛒', '🏥'][idx] ?? '📍'}</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

