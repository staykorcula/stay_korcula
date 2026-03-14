'use client';

import { motion } from 'framer-motion';
import type { Locale } from '../../../lib/i18n/i18n';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';

interface LandingUSPGridProps {
  dictionary: any;
  locale: Locale;
}

export default function LandingUSPGrid({ dictionary, locale }: LandingUSPGridProps) {
  const items = dictionary.items || [];

  return (
    <SectionWrapper id="why-us" background="white">
      <SectionHeader
        title={dictionary.title}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

