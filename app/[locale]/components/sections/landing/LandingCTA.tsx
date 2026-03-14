'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../../ui/Icon';
import type { Locale } from '../../../lib/i18n/i18n';
import { getWhatsAppLink, getPhoneLink } from '../../../lib/utils/formatPhone';
import Button from '../../ui/Button';

interface LandingCTAProps {
  dictionary: any;
  locale: Locale;
}

export default function LandingCTA({ dictionary, locale }: LandingCTAProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/korculaparadise.jpg"
          alt="Korčula"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            {dictionary.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {dictionary.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/accommodations`}>
              <Button variant="primary" size="lg" className="min-w-[200px]">
                {dictionary.contactUs}
              </Button>
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
            >
              <Icon name="whatsapp" size="md" />
              <span>{dictionary.whatsapp}</span>
            </a>

            <a
              href={getPhoneLink()}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
            >
              <Icon name="phone" size="md" />
              <span>{dictionary.call}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

