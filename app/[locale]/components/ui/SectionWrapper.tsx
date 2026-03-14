'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  background = 'white',
}: SectionWrapperProps) {
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  
  return (
    <section id={id} className={`section-padding ${bgClass} ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </section>
  );
}

