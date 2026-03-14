'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../../lib/validations';
import Icon from '../ui/Icon';
import type { Property } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils/formatPhone';
import { contactInfo } from '../../data/contact';

interface ContactProps {
  property: Property;
  locale: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      checkIn: string;
      checkOut: string;
      guests: string;
      message: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    trustElements: {
      bestPrice: string;
      noFees: string;
      instantConfirmation: string;
    };
    contactInfo: {
      email: string;
      phone: string;
      whatsapp: string;
      instagram: string;
    };
  };
}

export default function Contact({ property, locale, dictionary }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          sourceType: 'accommodation',
          propertyName:
            typeof property.name === 'string'
              ? property.name
              : property.name[locale],
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const propertyContact = property.contact || {
    phone: contactInfo.phone,
    whatsapp: contactInfo.whatsapp,
    email: contactInfo.email,
  };

  return (
    <SectionWrapper id="contact" background="gray">
      <SectionHeader title={dictionary.title} subtitle={dictionary.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="min-w-0"
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              {locale === 'hr' ? 'Rezervirajte svoj odmor' : 'Book Your Stay'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.name}
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                    placeholder={locale === 'hr' ? 'Vaše ime i prezime' : 'Your full name'}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.email}
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.form.phone}
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                  placeholder={propertyContact.phone || '+385 95 822 3830'}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.checkIn}
                  </label>
                  <input
                    type="date"
                    {...register('checkIn')}
                    className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[44px] [color-scheme:light]"
                  />
                  {errors.checkIn && (
                    <p className="mt-1 text-sm text-red-600">{errors.checkIn.message}</p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary.form.checkOut}
                  </label>
                  <input
                    type="date"
                    {...register('checkOut')}
                    className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[44px] [color-scheme:light]"
                  />
                  {errors.checkOut && (
                    <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.form.guests}
                </label>
                <select
                  {...register('guests', { valueAsNumber: true })}
                  className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                >
                  <option value="">{locale === 'hr' ? 'Odaberite broj gostiju' : 'Select number of guests'}</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? (locale === 'hr' ? 'gost' : 'guest') : (locale === 'hr' ? 'gosti' : 'guests')}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                )}
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.form.message}
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full min-w-0 px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-coastal-500 focus:border-transparent transition-all duration-200 min-h-[120px]"
                  placeholder={locale === 'hr' ? 'Dodatne napomene ili zahtjevi...' : 'Additional notes or requests...'}
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-800">{dictionary.form.success}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800">{dictionary.form.error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? dictionary.form.submitting : dictionary.form.submit}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Trust Elements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              {locale === 'hr' ? 'Zašto rezervirati direktno?' : 'Why book direct?'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700">{dictionary.trustElements.bestPrice}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700">{dictionary.trustElements.noFees}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700">{dictionary.trustElements.instantConfirmation}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              {locale === 'hr' ? 'Kontakt informacije' : 'Contact Information'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="phone" size="md" className="text-coastal-600" />
                <a href={getPhoneLink(propertyContact.phone)} className="text-gray-700 hover:text-coastal-600 transition-colors duration-200">
                  {propertyContact.phone || contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="mail" size="md" className="text-coastal-600" />
                <a href={`mailto:${propertyContact.email || contactInfo.email}`} className="text-gray-700 hover:text-coastal-600 transition-colors duration-200">
                  {propertyContact.email || contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="map-pin" size="md" className="text-coastal-600" />
                <span className="text-gray-700">{property.location[locale]}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
              {locale === 'hr' ? 'Brzi kontakt' : 'Quick Contact'}
            </h3>
            <div className="space-y-3">
              <motion.a
                href={getWhatsAppLink(propertyContact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 min-h-[44px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon name="whatsapp" size="md" className="mr-2" />
                <span>{dictionary.contactInfo.whatsapp}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

