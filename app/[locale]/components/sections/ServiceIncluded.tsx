'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ServiceIncluded } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

interface ServiceIncludedProps {
  dictionary: any;
  included: ServiceIncluded[];
  locale: Locale;
}

export default function ServiceIncluded({ dictionary, included, locale }: ServiceIncludedProps) {
  return (
    <SectionWrapper id="included" background="white">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {included.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-6 flex items-start gap-4 hover:bg-gray-100 transition-colors duration-200"
          >
            {item.icon ? (
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
            ) : (
              <div className="w-10 h-10 rounded-full bg-coastal-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-coastal-600" />
              </div>
            )}
            <p className="text-gray-700 font-medium">{item.text[locale]}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

