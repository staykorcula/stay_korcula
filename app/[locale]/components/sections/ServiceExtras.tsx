'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { ServiceExtra } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

interface ServiceExtrasProps {
  dictionary: any;
  extras: ServiceExtra[];
  locale: Locale;
}

export default function ServiceExtras({ dictionary, extras, locale }: ServiceExtrasProps) {
  return (
    <SectionWrapper id="extras" background="gray">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto w-full">
        {extras.map((extra, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 min-w-[280px] max-w-full md:max-w-[calc(50%-12px)] bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coastal-100 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-coastal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {extra.name[locale]}
                </h3>
              </div>
              {extra.price && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-coastal-600">
                    {extra.price.amount} {extra.price.currency}
                  </p>
                  {extra.price.unit && (
                    <p className="text-sm text-gray-500">
                      {dictionary.per} {dictionary[extra.price.unit as keyof typeof dictionary] ?? extra.price.unit}
                    </p>
                  )}
                </div>
              )}
            </div>
            {extra.description && (
              <p className="text-gray-600 mt-3">{extra.description[locale]}</p>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

