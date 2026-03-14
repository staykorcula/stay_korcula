'use client';

import { motion } from 'framer-motion';
import Icon from '../../ui/Icon';
import type { Locale } from '../../../lib/i18n/i18n';
import { getWhatsAppLink, getPhoneLink } from '../../../lib/utils/formatPhone';
import { contactInfo } from '../../../data/contact';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';
import Button from '../../ui/Button';

interface LandingContactProps {
  dictionary: any;
  locale: Locale;
}

export default function LandingContact({ dictionary, locale }: LandingContactProps) {
  return (
    <SectionWrapper id="contact" background="white">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <p className="text-center text-gray-700 mb-8">
            {dictionary.quickResponse}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <a
              href={getPhoneLink()}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-coastal-100 flex items-center justify-center">
                <Icon name="phone" size="xl" className="text-coastal-600" />
              </div>
              <span className="font-semibold text-gray-900">{dictionary.phone}</span>
              <span className="text-coastal-600">{contactInfo.phoneFormatted}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="whatsapp" size="xl" className="text-green-600" />
              </div>
              <span className="font-semibold text-gray-900">{dictionary.whatsapp}</span>
              <span className="text-green-600">{dictionary.sendMessage}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon name="mail" size="xl" className="text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900">{dictionary.email}</span>
              <span className="text-blue-600 text-sm break-all">{contactInfo.email}</span>
            </a>
          </div>

          <div className="text-center mt-8">
            <a href={`/${locale}/accommodations`}>
              <Button variant="primary" size="lg">
                {dictionary.bookNow}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

