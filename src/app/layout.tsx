import type { Metadata } from 'next';
import { Palanquin, Roboto } from 'next/font/google';

import { Providers } from '@/components/meta/Providers';

import './globalStyles/globals.scss';

// fonts
const palanquin = Palanquin({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-palanquin',
  display: 'swap',
});
const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

// metadata (<meta> tags)
export const metadata: Metadata = {
  metadataBase: new URL('https://desbordante.unidata-platform.ru/'),
  title: 'Desbordante | Open-source data profiling tool',
  description: 'Open-source data profiling tool',
  icons: ['/static/images/logo.svg'],
  openGraph: {
    type: 'website',
    url: 'https://desbordante.unidata-platform.ru/',
    title: 'Desbordante',
    description: 'Open-source data profiling tool',
    images: [{ url: '/static/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://desbordante.unidata-platform.ru',
    title: 'Desbordante',
    description: 'Open-source data profiling tool',
    images: 'static/images/og-image.jpg',
  },
};

// root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${palanquin.variable} ${roboto.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
