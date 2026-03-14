'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { ServiceGalleryImage } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AL+n6nqEdpDHHdzKiIFVRIQAB0BzSlKqYz//2Q==';

interface ServiceGalleryProps {
  dictionary: any;
  galleryImages: ServiceGalleryImage[];
  locale?: Locale;
}

export default function ServiceGallery({ dictionary, galleryImages, locale = 'hr' }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const getAlt = (alt: ServiceGalleryImage['alt']) =>
    typeof alt === 'string' ? alt : alt[locale];

  useEffect(() => {
    if (selectedImage === null || galleryImages.length === 0) return;
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    const nextIdx = (selectedImage + 1) % galleryImages.length;
    const prevIdx = (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    preload(galleryImages[nextIdx].src);
    preload(galleryImages[prevIdx].src);
  }, [selectedImage, galleryImages]);

  return (
    <SectionWrapper id="gallery" background="gray">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.viewAll}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.2 }}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={getAlt(image.alt)}
              fill
              priority={index < 6}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close"
            >
              <X size={32} />
            </motion.button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={getAlt(galleryImages[selectedImage].alt)}
                fill
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

