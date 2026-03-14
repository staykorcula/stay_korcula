'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '../ui/Icon';
import type { Locale } from '../../lib/i18n/i18n';
import { siteConfig } from '../../data/config';
import { contactInfo } from '../../data/contact';
import { getPhoneLink } from '../../lib/utils/formatPhone';

interface FooterProps {
  locale: Locale;
  dictionary?: {
    footer: {
      address: string;
      email: string;
      phone: string;
      social: string;
      copyright: string;
      privacy: string;
      terms: string;
    };
    nav: {
      home: string;
      accommodations: string;
      services: string;
      contact: string;
    };
  };
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footerDict = dictionary?.footer || {
    address: contactInfo.address.full[locale],
    email: contactInfo.email,
    phone: contactInfo.phoneFormatted,
    social: locale === 'hr' ? 'Društvene mreže' : 'Social Media',
    copyright: `© ${currentYear} ${siteConfig.name}. ${locale === 'hr' ? 'Sva prava pridržana.' : 'All rights reserved.'}`,
    privacy: locale === 'hr' ? 'Privatnost' : 'Privacy',
    terms: locale === 'hr' ? 'Uvjeti korištenja' : 'Terms of Service',
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {siteConfig.description[locale]}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="map-pin" size="md" className="text-coastal-400" />
                <span className="text-gray-300">{contactInfo.address.full[locale]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="phone" size="md" className="text-coastal-400" />
                <a href={getPhoneLink()} className="text-gray-300 hover:text-coastal-400 transition-colors duration-200">
                  {contactInfo.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="mail" size="md" className="text-coastal-400" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-coastal-400 transition-colors duration-200">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {locale === 'hr' ? 'Brzi linkovi' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={`/${locale}`}
                  className="text-gray-300 hover:text-coastal-400 transition-colors duration-200 block py-2 min-h-[44px] flex items-center"
                >
                  {dictionary?.nav?.home || (locale === 'hr' ? 'Početna' : 'Home')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/accommodations`}
                  className="text-gray-300 hover:text-coastal-400 transition-colors duration-200 block py-2 min-h-[44px] flex items-center"
                >
                  {dictionary?.nav?.accommodations || (locale === 'hr' ? 'Smještaj' : 'Accommodations')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/services`}
                  className="text-gray-300 hover:text-coastal-400 transition-colors duration-200 block py-2 min-h-[44px] flex items-center"
                >
                  {dictionary?.nav?.services || (locale === 'hr' ? 'Usluge' : 'Services')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}#contact`}
                  className="text-gray-300 hover:text-coastal-400 transition-colors duration-200 block py-2 min-h-[44px] flex items-center"
                >
                  {dictionary?.nav?.contact || (locale === 'hr' ? 'Kontakt' : 'Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footerDict.social}</h4>
            <div className="space-y-3 mb-6">
              <motion.a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-coastal-400 transition-colors duration-200 py-2 min-h-[44px]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="instagram" size="md" />
                <span>Instagram</span>
              </motion.a>
              <motion.a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-coastal-400 transition-colors duration-200 py-2 min-h-[44px]"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="facebook" size="md" />
                <span>Facebook</span>
              </motion.a>
            </div>

            <h4 className="text-lg font-semibold mb-4">
              {locale === 'hr' ? 'Pravne informacije' : 'Legal Information'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-300 hover:text-coastal-400 transition-colors duration-200 block py-2 min-h-[44px] flex items-center">
                  {footerDict.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-300 hover:text-coastal-400 transition-colors duration-200 block py-2 min-h-[44px] flex items-center">
                  {footerDict.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              {footerDict.copyright}
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-400 text-sm">
                  {locale === 'hr' ? '5.0 (127 recenzija)' : '5.0 (127 reviews)'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-gray-400 text-sm">
                  {locale === 'hr' ? 'Verificiran smještaj' : 'Verified accommodation'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 