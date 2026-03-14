'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '../../../lib/i18n/i18n';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';

interface LandingAboutProps {
  dictionary: any;
  locale: Locale;
}

export default function LandingAbout({ dictionary, locale }: LandingAboutProps) {
  return (
    <SectionWrapper id="about" background="white">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/velaluka4.jpg"
              alt="Korčula Island"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {dictionary.description}
            </p>
            
            {dictionary.mission && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === 'hr' ? 'Naša misija' : 'Our Mission'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {dictionary.mission}
                </p>
              </div>
            )}

            {dictionary.why && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {dictionary.why.title}
                </h3>
                <ul className="space-y-3">
                  {Object.entries(dictionary.why).map(([key, value]: [string, any]) => {
                    if (key === 'title') return null;
                    return (
                      <li key={key} className="flex items-start gap-3">
                        <span className="text-coastal-600 mt-1">✓</span>
                        <span className="text-gray-700">{value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

