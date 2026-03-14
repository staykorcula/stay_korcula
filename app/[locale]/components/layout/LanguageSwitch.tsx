'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '../../lib/i18n/i18n';

interface LanguageSwitchProps {
  currentLocale: Locale;
}

export default function LanguageSwitch({ currentLocale }: LanguageSwitchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    // Remove current locale from path and add new one
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-0.5 bg-white/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20">
      <motion.button
        onClick={() => handleLanguageChange('hr')}
        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          currentLocale === 'hr'
            ? 'bg-coastal-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-coastal-600 hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        HR
      </motion.button>
      
      <motion.button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          currentLocale === 'en'
            ? 'bg-coastal-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-coastal-600 hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        EN
      </motion.button>
    </div>
  );
} 