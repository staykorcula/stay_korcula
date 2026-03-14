'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '../ui/Icon';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

// Minimal blur placeholder for instant visual feedback while images load
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AL+n6nqEdpDHHdzKiIFVRIQAB0BzSlKqYz//2Q==';

/** Lightbox image dimensions – must match preload to ensure cache hit */
const LIGHTBOX_WIDTH = 1920;
const LIGHTBOX_HEIGHT = 1080;

/** Number of images to preload on mount (View All + first thumbnails) */
const INITIAL_PRELOAD_COUNT = 3;

interface GalleryImage {
  src: string;
  alt: {
    hr: string;
    en: string;
  };
}

interface GalleryProps {
  images: GalleryImage[];
  title: string;
  subtitle: string;
  locale: 'hr' | 'en';
  dictionary: {
    viewAll: string;
  };
}

/** Hidden Image used to preload lightbox-sized assets – same URL as lightbox for cache hit */
function PreloadImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute -z-50 w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden>
      <Image
        src={src}
        alt={alt}
        width={LIGHTBOX_WIDTH}
        height={LIGHTBOX_HEIGHT}
        sizes="100vw"
        priority
        fetchPriority="high"
      />
    </div>
  );
}

export default function Gallery({ images, title, subtitle, locale, dictionary }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Preload first N images on mount for instant "View All" and first thumbnails
  const initialPreloadIndices = images
    .slice(0, INITIAL_PRELOAD_COUNT)
    .map((_, i) => i);

  // Indices to preload: initial + hovered + adjacent when lightbox open
  const preloadIndices = new Set<number>(initialPreloadIndices);
  if (hoveredIndex !== null) preloadIndices.add(hoveredIndex);
  if (selectedImage !== null) {
    preloadIndices.add((selectedImage + 1) % images.length);
    preloadIndices.add((selectedImage - 1 + images.length) % images.length);
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      previousImage();
    }
  };

  return (
    <SectionWrapper id="gallery" background="gray">
      {/* Preload lightbox-sized images for instant open – same URL as lightbox for cache hit */}
      <div className="fixed -left-[9999px] w-px h-px overflow-hidden" aria-hidden>
        {Array.from(preloadIndices).map((idx) => (
          <PreloadImage
            key={idx}
            src={images[idx].src}
            alt={images[idx].alt[locale]}
          />
        ))}
      </div>

      <SectionHeader title={title} subtitle={subtitle} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.2 }}
            className="group cursor-pointer"
            onClick={() => openLightbox(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 card-hover">
              <Image
                src={image.src}
                alt={image.alt[locale]}
                fill
                priority={index < 6}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="search" size="lg" className="text-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mt-12"
        >
          <Button onClick={() => openLightbox(0)} variant="secondary">
            {dictionary.viewAll}
          </Button>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-7xl max-h-full p-4">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="fixed top-20  right-4 sm:top-20 sm:right-24 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-coastal-600/50 backdrop-blur-sm text-white hover:bg-coastal-600/70 hover:text-white transition-colors duration-200"
                aria-label="Close lightbox"
              >
                <X size={28} className="flex-shrink-0" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-coastal-600/70 backdrop-blur-[2px] text-white hover:bg-coastal-600/80 hover:text-white transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} className="flex-shrink-0" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-coastal-600/70 backdrop-blur-[2px] text-white hover:bg-coastal-600/80 hover:text-white transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={32} className="flex-shrink-0" />
              </button>

              {/* Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt[locale]}
                  width={LIGHTBOX_WIDTH}
                  height={LIGHTBOX_HEIGHT}
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 1280px) 100vw, 1920px"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
