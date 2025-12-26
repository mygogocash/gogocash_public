import Layout from '@/components/layouts';

import { METADATA } from '@/constants/Metadata';
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
  return <Layout>{children}</Layout>;
}
