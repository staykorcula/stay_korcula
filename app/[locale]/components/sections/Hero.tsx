'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils/formatPhone';

interface HeroProps {
  headline: string;
  subheadline: string;
  heroImage: string;
  dictionary: {
    bookDirect: string;
    viewGallery: string;
    whatsapp: string;
    call: string;
  };
}

export default function Hero({ headline, subheadline, heroImage, dictionary }: HeroProps) {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('#usps');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={headline}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            {headline}
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button href="#contact" size="lg">
              {dictionary.bookDirect}
            </Button>
            
            <Button
              onClick={() => {
                const gallery = document.querySelector('#gallery');
                if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="secondary"
              size="lg"
            >
              {dictionary.viewGallery}
            </Button>
          </div>

          {/* Contact Actions */}
          <div className="flex items-center justify-center gap-6 text-sm md:text-base">
            <motion.a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-coastal-300 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-green-500 text-white p-2 rounded-full">
                <Icon name="whatsapp" size="sm" className="text-white" />
              </span>
              {dictionary.whatsapp}
            </motion.a>
            
            <motion.a
              href={getPhoneLink()}
              className="flex items-center gap-2 hover:text-coastal-300 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-coastal-600 text-white p-2 rounded-full">
                <Icon name="phone" size="sm" className="text-white" />
              </span>
              {dictionary.call}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white hover:text-coastal-300 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ y: 5 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </motion.button>
    </section>
  );
}

