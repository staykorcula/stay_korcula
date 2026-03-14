import type { SVGProps } from 'react';

const MapPinPath =
  'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z';

export interface MapPinIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function MapPinIcon({ size = 24, className = '', ...props }: MapPinIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path d={MapPinPath} />
    </svg>
  );
}
