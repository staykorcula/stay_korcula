'use client';

import { motion } from 'framer-motion';
import type { Locale } from '../../../lib/i18n/i18n';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';

interface IslandHighlightsProps {
  dictionary: any;
  locale: Locale;
}

export default function IslandHighlights({ dictionary, locale }: IslandHighlightsProps) {
  const highlights = dictionary.highlights || [];

  return (
    <SectionWrapper id="island-highlights" background="gray">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {highlights.map((highlight: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200 text-center"
          >
            <div className="text-5xl mb-4">{highlight.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {highlight.title}
            </h3>
            <p className="text-gray-600">
              {highlight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

