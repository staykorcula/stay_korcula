'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { Property, PropertyReview } from '../../data/types';
import type { Locale } from '../../lib/i18n/i18n';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils/formatPhone';
import { contactInfo } from '../../data/contact';

interface ReviewsProps {
  reviews: NonNullable<Property['reviews']>;
  locale: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    rating: string;
    stars: string;
  };
}

export default function Reviews({ reviews, locale, dictionary }: ReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Calculate average rating
  const avgRating = reviews.reduce((sum: number, review: PropertyReview) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <SectionWrapper id="reviews" background="gray">
      <SectionHeader title={dictionary.title} subtitle={dictionary.subtitle} />

      {/* Overall Rating */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-12"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            {renderStars(Math.round(avgRating))}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{avgRating.toFixed(1)}</div>
          <div className="text-gray-600 mb-4">
            {locale === 'hr' ? `Odlično • ${totalReviews} recenzija` : `Excellent • ${totalReviews} reviews`}
          </div>
          <div className="text-sm text-gray-500">
            {locale === 'hr' ? 'Preporučuje 98% gostiju' : '98% of guests recommend'}
          </div>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: PropertyReview, index: number) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
          >
            {/* Quote Icon */}
            <div className="mb-4">
              <Quote className="w-8 h-8 text-coastal-600/30" />
            </div>

            {/* Review Text */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              "{review.text[locale]}"
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              {renderStars(review.rating)}
            </div>

            {/* Reviewer Info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-600">{review.location}</p>
              </div>
              <div className="text-sm text-gray-500">
                {review.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-coastal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⭐</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            {locale === 'hr' ? '5/5 Ocjena' : '5/5 Rating'}
          </h4>
          <p className="text-gray-600 text-sm">
            {locale === 'hr' ? 'Prosječna ocjena od gostiju' : 'Average rating from guests'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-coastal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            {locale === 'hr' ? `${totalReviews}+ Gostiju` : `${totalReviews}+ Guests`}
          </h4>
          <p className="text-gray-600 text-sm">
            {locale === 'hr' ? 'Zadovoljnih posjetitelja' : 'Satisfied visitors'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-coastal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            {locale === 'hr' ? '98% Preporučuje' : '98% Recommend'}
          </h4>
          <p className="text-gray-600 text-sm">
            {locale === 'hr' ? 'Gosti preporučuju našu vilu' : 'Guests recommend our villa'}
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-gray-600 mb-6">
          {locale === 'hr' 
            ? 'Pridružite se našim zadovoljnim gostima i rezervirajte svoj odmor danas!'
            : 'Join our satisfied guests and book your stay today!'}
        </p>
        <Button href="#contact">
          {locale === 'hr' ? 'Rezervirajte svoj odmor' : 'Book Your Stay'}
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}

