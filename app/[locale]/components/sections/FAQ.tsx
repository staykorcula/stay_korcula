'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Property, PropertyFAQItem } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils/formatPhone';
import { contactInfo } from '../../data/contact';

interface FAQProps {
  faq: NonNullable<Property['faq']>;
  locale: Locale;
  dictionary: {
    title: string;
    subtitle: string;
  };
}

export default function FAQ({ faq, locale, dictionary }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="faq">
      <SectionHeader title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faq.map((item: PropertyFAQItem, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 min-h-[44px]"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question[locale]}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-6 h-6 text-coastal-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-coastal-600" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer[locale]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 bg-coastal-50 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          {locale === 'hr' ? 'Trebate dodatnu pomoć?' : 'Need additional help?'}
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {locale === 'hr' 
            ? 'Naš tim je tu da vam pomogne oko svega što trebate. Kontaktirajte nas i odgovorit ćemo vam u najkraćem mogućem roku.'
            : 'Our team is here to help you with everything you need. Contact us and we will respond as soon as possible.'}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600"
          >
            <span className="text-xl">💬</span>
            <span>WhatsApp</span>
          </Button>
          
          <Button
            href={getPhoneLink()}
            className="inline-flex items-center space-x-2"
          >
            <span className="text-xl">📞</span>
            <span>{locale === 'hr' ? 'Pozovite nas' : 'Call us'}</span>
          </Button>
          
          <Button
            href={`mailto:${contactInfo.email}`}
            variant="secondary"
            className="inline-flex items-center space-x-2"
          >
            <span className="text-xl">✉️</span>
            <span>Email</span>
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

