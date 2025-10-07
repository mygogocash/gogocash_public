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

export default function DebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Debug Integrations
          </h1>
          <p className="text-gray-600">
            ทดสอบและตรวจสอบ integrations ทั้งหมดในระบบ
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
