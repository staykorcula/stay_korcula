'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  href,
  target,
  rel,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[44px] flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-coastal-600 hover:bg-coastal-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-coastal-600 border-2 border-coastal-600',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target ?? (href.startsWith('http') ? '_blank' : undefined)}
        rel={rel ?? (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        className={classes}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
}

