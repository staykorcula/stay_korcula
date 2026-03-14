'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Testimonial } from '../../../data/testimonials';
import type { Locale } from '../../../lib/i18n/i18n';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionHeader from '../../ui/SectionHeader';

interface LandingTestimonialsProps {
  dictionary: any;
  testimonials: Testimonial[];
  locale: Locale;
}

export default function LandingTestimonials({
  dictionary,
  testimonials,
  locale,
}: LandingTestimonialsProps) {
  // Show first 3 testimonials
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <SectionWrapper id="testimonials" background="gray">
      <SectionHeader
        title={dictionary.title}
        subtitle={dictionary.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-700 mb-4 line-clamp-4">
              "{testimonial.text[locale]}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-coastal-100 flex items-center justify-center">
                <span className="text-coastal-600 font-semibold">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

