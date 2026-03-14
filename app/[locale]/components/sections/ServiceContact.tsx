'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import type { Service } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils/formatPhone';
import { contactInfo } from '../../data/contact';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

interface ServiceContactProps {
  dictionary: any;
  onBookNow: () => void;
  locale: Locale;
  service: Service;
  serviceContact?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
}

export default function ServiceContact({
  dictionary,
  onBookNow,
  locale,
  service,
  serviceContact,
}: ServiceContactProps) {
  const currentContact = serviceContact || contactInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourceType: 'service',
          serviceName: service.name[locale],
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', date: '', guests: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" background="gray">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            {dictionary.contactHeading}
          </h3>
          <div className="space-y-4">
            <a
              href={getPhoneLink(currentContact.phone || contactInfo.phone)}
              className="flex items-center gap-3 text-gray-700 hover:text-coastal-600 transition-colors duration-200 p-3 rounded-lg hover:bg-gray-50"
            >
              <Icon name="phone" size="md" className="text-coastal-600" />
              <span>{currentContact.phone || contactInfo.phone}</span>
            </a>
            <a
              href={getWhatsAppLink(currentContact.whatsapp || currentContact.phone || contactInfo.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-coastal-600 transition-colors duration-200 p-3 rounded-lg hover:bg-gray-50"
            >
              <Icon name="whatsapp" size="md" className="text-coastal-600" />
              <span>{dictionary.contactInfo?.whatsapp}</span>
            </a>
            <a
              href={`mailto:${currentContact.email || contactInfo.email}`}
              className="flex items-center gap-3 text-gray-700 hover:text-coastal-600 transition-colors duration-200 p-3 rounded-lg hover:bg-gray-50"
            >
              <Icon name="mail" size="md" className="text-coastal-600" />
              <span>{currentContact.email || contactInfo.email}</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dictionary.form?.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coastal-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dictionary.form?.email}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coastal-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dictionary.form?.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coastal-600 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.form?.date}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coastal-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.form?.guests}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coastal-600 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dictionary.form?.message}
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coastal-600 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? dictionary.form?.submitting : dictionary.form?.submit}
            </Button>
            {submitStatus === 'success' && (
              <p className="text-green-600 text-sm text-center">
                {dictionary.form?.success}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-sm text-center">
                {dictionary.form?.error}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}

