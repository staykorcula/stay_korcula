'use client';

import { motion } from 'framer-motion';
import { 
  Waves, 
  Wifi, 
  Snowflake, 
  Car, 
  Utensils, 
  Home, 
  Flame, 
  Coffee,
  Tv,
  Droplets,
  Sun,
  Umbrella,
  LucideIcon
} from 'lucide-react';
import type { Property } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

interface AmenitiesProps {
  amenities: Property['amenities'];
  additionalServices?: Property['additionalServices'];
  locale: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    [key: string]: string;
  };
}

const iconMap: Record<string, LucideIcon> = {
  beach: Waves,
  wifi: Wifi,
  ac: Snowflake,
  parking: Car,
  kitchen: Utensils,
  terrace: Home,
  bbq: Flame,
  coffee: Coffee,
  tv: Tv,
  shower: Droplets,
  sun: Sun,
  umbrella: Umbrella,
};

const colorMap: Record<string, { color: string; bgColor: string }> = {
  beach: { color: 'text-blue-500', bgColor: 'bg-blue-50' },
  wifi: { color: 'text-orange-500', bgColor: 'bg-orange-50' },
  ac: { color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  parking: { color: 'text-purple-500', bgColor: 'bg-purple-50' },
  kitchen: { color: 'text-green-500', bgColor: 'bg-green-50' },
  terrace: { color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  bbq: { color: 'text-red-500', bgColor: 'bg-red-50' },
  coffee: { color: 'text-amber-500', bgColor: 'bg-amber-50' },
  tv: { color: 'text-gray-500', bgColor: 'bg-gray-50' },
  shower: { color: 'text-teal-500', bgColor: 'bg-teal-50' },
  sun: { color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  umbrella: { color: 'text-pink-500', bgColor: 'bg-pink-50' },
};

export default function Amenities({ amenities, additionalServices, locale, dictionary }: AmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="amenities" background="gray">
      <SectionHeader title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity, index) => {
          const Icon = iconMap[amenity.icon] || Waves;
          const colors = colorMap[amenity.icon] || { color: 'text-gray-500', bgColor: 'bg-gray-50' };
          
          return (
            <motion.div
              key={amenity.icon}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover h-full">
                <div className={`w-16 h-16 ${colors.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${colors.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {dictionary[amenity.icon] || amenity.icon}
                </h3>
                <p className="text-sm text-gray-600">
                  {amenity.description[locale]}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Services */}
      {additionalServices && additionalServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
            {locale === 'hr' ? 'Dodatne usluge' : 'Additional Services'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-coastal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">
                    {index === 0 ? '🚗' : index === 1 ? '🚤' : index === 2 ? '🍽️' : index === 3 ? '🎯' : index === 4 ? '🧺' : '🛒'}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {service[locale].split(' - ')[0]}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {service[locale].split(' - ')[1] || service[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}

