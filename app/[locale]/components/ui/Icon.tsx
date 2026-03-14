'use client';

import {
  WhatsAppIcon,
  PhoneIcon,
  SearchIcon,
  MailIcon,
  MapPinIcon,
  InstagramIcon,
  FacebookIcon,
} from './icons';

export const iconNames = [
  'whatsapp',
  'phone',
  'search',
  'mail',
  'map-pin',
  'instagram',
  'facebook',
] as const;

export type IconName = (typeof iconNames)[number];

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export interface IconProps {
  name: IconName;
  size?: keyof typeof sizeMap | number;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

const iconComponents: Record<
  IconName,
  React.ComponentType<{ size?: number; className?: string; 'aria-label'?: string; 'aria-hidden'?: boolean }>
> = {
  whatsapp: WhatsAppIcon,
  phone: PhoneIcon,
  search: SearchIcon,
  mail: MailIcon,
  'map-pin': MapPinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

function Icon({
  name,
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
}: IconProps) {
  const IconComponent = iconComponents[name];
  if (!IconComponent) return null;

  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <IconComponent
      size={pixelSize}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  );
}

export default Icon;
export { Icon };
