'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Icon from '../ui/Icon';
import type { Locale } from '../../lib/i18n/i18n';
import { siteConfig } from '../../data/config';
import { getPhoneLink, getWhatsAppLink } from '../../lib/utils/formatPhone';
import { contactInfo } from '../../data/contact';
import LanguageSwitch from './LanguageSwitch';

interface HeaderProps {
  locale: Locale;
  dictionary?: {
    nav: {
      home: string;
      accommodations: string;
      services: string;
      contact: string;
    };
    common: {
      book: string;
    };
  };
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  // Check if we're on a property page (has sections) or listing page
  const isPropertyPage = pathname?.includes('/accommodations/') && pathname !== `/${locale}/accommodations`;
  const isListingPage = pathname === `/${locale}/accommodations` || pathname === `/${locale}/services`;

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMobileMenuOpen]);

  // Handle window resize and orientation change
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu if window is resized to desktop size
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isMobileMenuOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Navigation items - different for property pages vs listing pages
  const navItems = isPropertyPage
    ? [
        { href: '#about', label: locale === 'hr' ? 'O nama' : 'About', type: 'anchor' as const },
        { href: '#gallery', label: locale === 'hr' ? 'Galerija' : 'Gallery', type: 'anchor' as const },
        { href: '#amenities', label: locale === 'hr' ? 'Sadržaji' : 'Amenities', type: 'anchor' as const },
        { href: '#location', label: locale === 'hr' ? 'Lokacija' : 'Location', type: 'anchor' as const },
        { href: '#reviews', label: locale === 'hr' ? 'Recenzije' : 'Reviews', type: 'anchor' as const },
        { href: '#faq', label: 'FAQ', type: 'anchor' as const },
        { href: '#contact', label: locale === 'hr' ? 'Kontakt' : 'Contact', type: 'anchor' as const },
      ]
    : [
        { href: `/${locale}`, label: dictionary?.nav?.home || (locale === 'hr' ? 'Početna' : 'Home'), type: 'link' as const },
        { href: `/${locale}/accommodations`, label: dictionary?.nav?.accommodations || (locale === 'hr' ? 'Smještaj' : 'Accommodations'), type: 'link' as const },
        { href: `/${locale}/services`, label: dictionary?.nav?.services || (locale === 'hr' ? 'Usluge' : 'Services'), type: 'link' as const },
        { href: `/${locale}#contact`, label: dictionary?.nav?.contact || (locale === 'hr' ? 'Kontakt' : 'Contact'), type: 'link' as const },
      ];

  const handleNavClick = (href: string, type: 'anchor' | 'link') => {
    if (type === 'anchor') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleBookDirect = () => {
    if (isPropertyPage) {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to accommodations or contact page
      window.location.href = `/${locale}/accommodations`;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'lg:bg-transparent bg-white/95 backdrop-blur-sm'
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-12">
        <div className="flex items-center h-14 sm:h-16 lg:h-16">
          {/* Logo - Left side */}
          <motion.div
            className="flex items-center flex-shrink-0 mr-4 sm:mr-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/${locale}`}
              className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-coastal-600 whitespace-nowrap tracking-tight min-h-[44px] flex items-center relative z-10"
              aria-label={`${siteConfig.name} Home`}
            >
              {siteConfig.name}
            </Link>
          </motion.div>

          {/* Navigation - Center */}
          <nav 
            className="hidden lg:flex items-center space-x-6 flex-1 justify-center pr-6 xl:pr-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-coastal-600 font-medium text-sm transition-all duration-200 relative group whitespace-nowrap min-h-[44px] flex items-center"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coastal-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                );
              }
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.type);
                  }}
                  className="text-gray-700 hover:text-coastal-600 font-medium text-sm transition-all duration-200 relative group whitespace-nowrap min-h-[44px] flex items-center"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coastal-600 transition-all duration-200 group-hover:w-full"></span>
                </motion.a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto pl-6 xl:pl-8 flex-shrink-0">
            <LanguageSwitch currentLocale={locale} />
            
            <div className="flex items-center space-x-4">
              <motion.a
                href="tel:+385958223830"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-coastal-100 text-gray-600 hover:text-coastal-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Call us"
              >
                <Icon name="phone" size={18} />
              </motion.a>

              <motion.a
                href="https://wa.me/385958223830"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-coastal-600 transition-all duration-200 min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                aria-label="Contact us on WhatsApp"
              >
                <Icon name="whatsapp" size={18} />
                <span className="hidden xl:inline text-sm font-medium">WhatsApp</span>
              </motion.a>
            </div>

            <motion.button
              onClick={handleBookDirect}
              className="bg-coastal-600 hover:bg-coastal-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {locale === 'hr' ? 'Rezervirajte' : 'Book Direct'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-auto relative z-[100]">
            <motion.button
              ref={menuButtonRef}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen(prev => !prev);
              }}
              className="p-3 text-gray-700 hover:text-coastal-600 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg shadow-sm lg:bg-transparent"
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>

    {/* Mobile Menu Backdrop - Outside header for proper z-index stacking */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-0 bg-black/40 z-[75]"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ 
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none'
          }}
        />
      )}
    </AnimatePresence>

    {/* Mobile Menu - Outside header for proper z-index stacking */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-14 sm:top-16 max-h-[85vh] bg-white border-t border-gray-200 overflow-y-auto z-[80] shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="navigation"
          aria-label="Mobile navigation"
          onClick={(e) => {
            // Prevent closing when clicking inside the menu
            e.stopPropagation();
          }}
        >
          <div className="container-custom py-6">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.href, item.type);
                      }}
                      className="text-gray-700 hover:text-coastal-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200 min-h-[44px] flex items-center active:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNavClick(item.href, item.type);
                    }}
                    className="text-gray-700 hover:text-coastal-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200 min-h-[44px] flex items-center active:bg-gray-50"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <LanguageSwitch currentLocale={locale} />
                  <div className="flex space-x-3">
                    <a
                      href={getPhoneLink()}
                      className="text-gray-700 hover:text-coastal-600 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Call us"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="phone" size="md" />
                    </a>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-coastal-600 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Contact us on WhatsApp"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="whatsapp" size="md" />
                    </a>
                  </div>
                </div>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookDirect();
                  }}
                  className="w-full btn-primary min-h-[44px]"
                  whileTap={{ scale: 0.95 }}
                >
                  {dictionary?.common?.book || (locale === 'hr' ? 'Rezervirajte direktno' : 'Book Direct')}
                </motion.button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
} 