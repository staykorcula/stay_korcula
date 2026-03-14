'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Icon from '../ui/Icon';
import type { Service } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import type { Dictionary } from '../../lib/i18n/dict';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils/formatPhone';
import { contactInfo } from '../../data/contact';
import Button from '../ui/Button';

interface ServiceHeroProps {
  dictionary: Dictionary;
  onBookNow: () => void;
  service: Service;
  locale: Locale;
}

const DEFAULT_HERO_IMAGE = '/images/korcula.jpg';

export default function ServiceHero({ dictionary, onBookNow, service, locale }: ServiceHeroProps) {
  const serviceContact = service.contact || contactInfo;
  const heroImage = service.heroImage ?? DEFAULT_HERO_IMAGE;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={service.name[locale]}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {service.icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-7xl mb-6"
            >
              {service.icon}
            </motion.div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            {service.name[locale]}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {service.description[locale]}
          </p>

          {/* Price Badge */}
          {service.price && service.price.from && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            >
              <span className="text-2xl font-bold">
                {dictionary.service?.pricing?.from} {service.price.from} {service.price.currency}
                {service.price.unit && ` ${dictionary.services?.per} ${dictionary.services?.[service.price.unit] ?? service.price.unit}`}
              </span>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={onBookNow}
              variant="primary"
              size="lg"
              className="min-w-[200px]"
            >
              {dictionary.common?.bookNow ?? dictionary.service?.hero?.bookNow}
            </Button>

            <div className="flex items-center gap-4">
              <a
                href={getWhatsAppLink(serviceContact.whatsapp || serviceContact.phone || contactInfo.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
              >
                <Icon name="whatsapp" size="md" />
                <span>{dictionary.service?.hero?.whatsapp}</span>
              </a>

              <a
                href={getPhoneLink(serviceContact.phone || contactInfo.phone)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
              >
                <Icon name="phone" size="md" />
                <span>{dictionary.service?.hero?.call}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

