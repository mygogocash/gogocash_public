import { Inter } from 'next/font/google';
import '@/styles/global.css';
import '@/styles/lib/embla.css';
import '@/styles/lib/deals.css';
import '@/styles/lib/product.css';
import '@/styles/lib/offer.css';
import Provider from './provider';
import { METADATA } from '@/constants/Metadata';

const inter = Inter({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'block',
  variable: '--font-inter',
});

export const metadata = {
  title: METADATA.title,
  description: METADATA.description,
  icons: {
    icon: METADATA.icon,
    apple: METADATA.icon,
    other: [
      { rel: 'apple-touch-icon', url: METADATA.icon },
      { rel: 'shortcut icon', url: METADATA.icon },
    ],
  },
  openGraph: {
    title: METADATA.title,
    description: METADATA.description,
    images: [
      {
        url: METADATA.banner,
        width: 800,
        height: 600,
      },
      {
        url: METADATA.banner,
        width: 1800,
        height: 1600,
        alt: 'Og Image Alt',
      },
    ],
    siteName: 'GoGoCash',
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.title,
    description: METADATA.description,
    images: [METADATA.banner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="relative flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
