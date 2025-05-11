import type { Metadata } from 'next';
import { Palanquin, Roboto } from 'next/font/google';

import { Header } from '@/components/common/layout';
import { Providers } from '@/components/meta';

import './layout.scss';

// fonts
const palanquin = Palanquin({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-palanquin',
});
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
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
        {/* solves firefox flash of unstyles content */}
        <script>0</script>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
