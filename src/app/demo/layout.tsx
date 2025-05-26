import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo Features - GogoCash',
  description: 'Explore all the amazing features of GogoCash platform',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 GogoCash Demo Features
          </h1>
          <p className="text-lg text-gray-600">
            สำรวจฟีเจอร์ต่างๆ ของแพลตฟอร์ม GogoCash
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
