'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import SectionWrapper from '../ui/SectionWrapper';

interface AboutProps {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  image?: string;
  stats?: {
    rooms?: number;
    people?: string;
    [key: string]: string | number | undefined;
  };
  dictionary: {
    learnMore: string;
  };
}

export default function About({
  title,
  subtitle,
  description,
  location,
  image = '/images/221928316.webp',
  stats,
  dictionary,
}: AboutProps) {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {title}
          </h2>
          
          <h3 className="text-xl md:text-2xl font-medium text-coastal-600 mb-6">
            {subtitle}
          </h3>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {description}
          </p>

          {/* Location Info */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-coastal-100 rounded-full flex items-center justify-center">
              <Icon name="map-pin" size="lg" className="text-coastal-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{location}</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => {
              const locationSection = document.querySelector('#location');
              if (locationSection) locationSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2"
          >
            <span>{dictionary.learnMore}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Overlay with stats */}
            {stats && Object.keys(stats).length > 0 && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(stats).slice(0, 3).map(([key, value], index) => (
                      <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-coastal-600">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

