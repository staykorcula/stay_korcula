'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Bed, Bath } from 'lucide-react';
import Icon from '../../ui/Icon';
import type { Property } from '../../../data/types';
import type { Locale } from '../../../lib/i18n/i18n';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';
import Button from '../../ui/Button';

interface LandingFeaturedPropertiesProps {
  dictionary: any;
  properties: Property[];
  locale: Locale;
}

export default function LandingFeaturedProperties({
  dictionary,
  properties,
  locale,
}: LandingFeaturedPropertiesProps) {
  // Show first 3 properties
  const featuredProperties = properties.slice(0, 3);

  return (
    <SectionWrapper id="featured-properties" background="white">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map((property, index) => {
          const propertyName = typeof property.name === 'string' ? property.name : property.name[locale];
          const maxGuests = property.capacity?.people || 0;
          const totalBedrooms = property.capacity?.bedrooms || 0;
          const totalBathrooms = property.capacity?.bathrooms || 0;

          return (
            <motion.div
              key={property.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover overflow-hidden"
            >
              <Link href={`/${locale}/accommodations/${property.slug}`} className="block">
                <div className="relative h-60 w-full">
                  <Image
                    src={property.mainImage || property.heroImage}
                    alt={propertyName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {propertyName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description[locale].substring(0, 100)}...
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Icon name="map-pin" size="sm" className="mr-2 text-coastal-600" />
                    <span>{property.location[locale]}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-gray-700 text-sm mb-6">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-coastal-600" />
                      <span>{maxGuests} {dictionary.guests}</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1 text-coastal-600" />
                      <span>{totalBedrooms} {locale === 'hr' ? 'sobe' : 'bedrooms'}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1 text-coastal-600" />
                      <span>{totalBathrooms} {dictionary.bathrooms}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="secondary">
                    {dictionary.viewDetails}
                  </Button>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {properties.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href={`/${locale}/accommodations`}>
            <Button variant="primary" size="lg">
              {dictionary.viewAll}
            </Button>
          </Link>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
