'use client';

import { motion } from 'framer-motion';
import { Waves, Eye, Home, Car, Wifi, Snowflake, LucideIcon } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

interface USPItem {
  icon: LucideIcon;
  key: string;
  color: string;
  bgColor: string;
}

const iconMap: Record<string, LucideIcon> = {
  beachfront: Waves,
  seaView: Eye,
  privateTerrace: Home,
  freeParking: Car,
  fastWifi: Wifi,
  airConditioning: Snowflake,
};

interface USPGridProps {
  usps: string[]; // Array of USP keys
  dictionary: {
    [key: string]: string;
  };
  title?: string;
  subtitle?: string;
}

export default function USPGrid({ usps, dictionary, title, subtitle }: USPGridProps) {
  const uspItems: USPItem[] = usps.map((key) => {
    const icon = iconMap[key] || Waves;
    const colors = {
      beachfront: { color: 'text-blue-500', bgColor: 'bg-blue-50' },
      seaView: { color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
      privateTerrace: { color: 'text-green-500', bgColor: 'bg-green-50' },
      freeParking: { color: 'text-purple-500', bgColor: 'bg-purple-50' },
      fastWifi: { color: 'text-orange-500', bgColor: 'bg-orange-50' },
      airConditioning: { color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
    }[key] || { color: 'text-gray-500', bgColor: 'bg-gray-50' };
    
    return {
      icon,
      key,
      ...colors,
    };
  });

  return (
    <SectionWrapper id="usps" background="gray">
      {title && <SectionHeader title={title} subtitle={subtitle} />}
      
      <div className="flex flex-wrap justify-center gap-6">
        {uspItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group w-full min-w-0 sm:w-[180px] sm:min-w-[180px] flex-shrink-0"
            >
              <div className="min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-words line-clamp-3">
                  {dictionary[item.key] || item.key}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

