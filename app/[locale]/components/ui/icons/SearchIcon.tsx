import type { SVGProps } from 'react';

const SearchPath =
  'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7';

export interface SearchIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function SearchIcon({ size = 24, className = '', ...props }: SearchIconProps) {
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
      <path d={SearchPath} />
    </svg>
  );
}
