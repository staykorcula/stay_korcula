'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { Service } from '../../../data/types';
import type { Locale } from '../../../lib/i18n/i18n';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';
import Button from '../../ui/Button';

interface LandingFeaturedServicesProps {
  dictionary: any;
  services: Service[];
  locale: Locale;
}

export default function LandingFeaturedServices({
  dictionary,
  services,
  locale,
}: LandingFeaturedServicesProps) {
  // Show first 3 services
  const featuredServices = services.slice(0, 3);

  const formatPrice = (service: Service) => {
    if (!service.price) return dictionary.services?.contactForPrice ?? '';
    const { from, currency, unit } = service.price;
    if (!from) return dictionary.services?.contactForPrice ?? '';
    const unitLabel = unit ? (dictionary.services?.[unit] ?? unit) : '';
    return `${dictionary.services?.from ?? ''} ${from} ${currency}${unitLabel ? ` ${dictionary.services?.per ?? ''} ${unitLabel}` : ''}`;
  };

  return (
    <SectionWrapper id="featured-services" background="gray">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredServices.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover overflow-hidden"
          >
            <Link href={`/${locale}/services/${service.slug}`} className="block">
              <div className="relative h-48 w-full">
                {service.heroImage ? (
                  <Image
                    src={service.heroImage}
                    alt={service.name[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-coastal-400 to-coastal-600 flex items-center justify-center">
                    {service.icon && (
                      <span className="text-6xl">{service.icon}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  {service.name[locale]}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.shortDescription[locale]}
                </p>
                {service.price && (
                  <div className="flex items-center text-coastal-600 text-sm font-semibold mb-4">
                    <span>{formatPrice(service)}</span>
                  </div>
                )}
                {service.bookingRequired && (
                  <div className="flex items-center text-amber-600 text-xs mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{dictionary.services?.bookingRequired}</span>
                  </div>
                )}
                <Button className="w-full" variant="secondary">
                  {dictionary.learnMore}
                </Button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {services.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href={`/${locale}/services`}>
            <Button variant="primary" size="lg">
              {dictionary.viewAll}
            </Button>
          </Link>
        </motion.div>
      )}
    </SectionWrapper>
  );
}

