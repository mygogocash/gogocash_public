'use client';
import Layout from '@/components/layouts';
import Help from '@/features/desktop/help';

export default function Index() {

  return (
    <Layout>
      <div className={`w-full hidden md:block`}>
        <Help />
      </div>
    </Layout>
  );
}
