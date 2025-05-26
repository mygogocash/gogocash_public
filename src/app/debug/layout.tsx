import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debug - Integrations',
  description: 'Debug page for all integrations',
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
