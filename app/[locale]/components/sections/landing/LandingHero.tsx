'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '../../../lib/i18n/i18n';
import type { Dictionary } from '../../../lib/i18n/dict';
import { getWhatsAppLink, getPhoneLink } from '../../../lib/utils/formatPhone';
import { siteConfig } from '../../../data/config';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

interface LandingHeroProps {
  dictionary: Pick<Dictionary['landing']['hero'], 'title' | 'subtitle' | 'ctaAccommodations' | 'ctaServices' | 'whatsapp' | 'call'>;
  locale: Locale;
}

export default function LandingHero({ dictionary, locale }: LandingHeroProps) {
  const heroImage = '/images/korcula.jpg'; // Default hero image

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={siteConfig.name}
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            {dictionary.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {dictionary.subtitle}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link href={`/${locale}/accommodations`}>
              <Button variant="primary" size="lg" className="min-w-[200px]">
                {dictionary.ctaAccommodations}
              </Button>
            </Link>

            <Link href={`/${locale}/services`}>
              <Button variant="secondary" size="lg" className="min-w-[200px] bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                {dictionary.ctaServices}
              </Button>
            </Link>
          </motion.div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
            >
              <Icon name="whatsapp" size="md" className="text-white" />
              <span>{dictionary.whatsapp}</span>
            </a>

            <a
              href={getPhoneLink()}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
            >
              <Icon name="phone" size="md" className="text-white" />
              <span>{dictionary.call}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

