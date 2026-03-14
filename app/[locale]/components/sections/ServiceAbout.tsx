'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Calendar } from 'lucide-react';
import type { Service } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

interface ServiceAboutProps {
  dictionary: any;
  service: Service;
  locale: Locale;
}

export default function ServiceAbout({ dictionary, service, locale }: ServiceAboutProps) {
  return (
    <SectionWrapper id="about" background="white">
      <SectionHeader
        title={dictionary.title ?? dictionary.overview}
        subtitle={dictionary.overview}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-gray-700 text-lg text-center leading-relaxed mb-8">
            {service.description[locale]}
          </p>
        </motion.div>

        {/* Service Details */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {service.duration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 min-w-[200px] max-w-[280px] bg-gray-50 rounded-xl p-6 text-center"
            >
              <Clock className="w-8 h-8 text-coastal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{dictionary.duration}</h3>
              <p className="text-gray-600">{service.duration[locale]}</p>
            </motion.div>
          )}

          {service.capacity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 min-w-[200px] max-w-[280px] bg-gray-50 rounded-xl p-6 text-center"
            >
              <Users className="w-8 h-8 text-coastal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{dictionary.capacity || 'Kapacitet'}</h3>
              <p className="text-gray-600">
                {service.capacity.min && service.capacity.max
                  ? `${service.capacity.min}-${service.capacity.max} ${service.capacity.unit === 'people' ? (locale === 'hr' ? 'osoba' : 'people') : service.capacity.unit}`
                  : service.capacity.max
                  ? `${locale === 'hr' ? 'Do' : 'Up to'} ${service.capacity.max} ${service.capacity.unit === 'people' ? (locale === 'hr' ? 'osoba' : 'people') : service.capacity.unit}`
                  : ''}
              </p>
            </motion.div>
          )}

          {service.availability && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-1 min-w-[200px] max-w-[280px] bg-gray-50 rounded-xl p-6 text-center"
            >
              <Calendar className="w-8 h-8 text-coastal-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{dictionary.availability}</h3>
              <p className="text-gray-600">{service.availability[locale]}</p>
            </motion.div>
          )}
        </div>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              {locale === 'hr' ? 'Značajke' : 'Features'}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-coastal-600 mt-1">✓</span>
                  <span className="text-gray-700">{feature[locale]}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}

