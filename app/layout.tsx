import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from './[locale]/data/config';

const inter = Inter({ subsets: ['latin'] });

/**
 * Root layout metadata - default for all pages
 * Page-level generateMetadata overrides these values
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline.hr}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.hr,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 