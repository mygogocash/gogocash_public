'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Profile from '@/features/desktop/profile';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';
// const Profile = dynamic(() => import('@/features/desktop/profile'), {
//   ssr: false, // This enables SSR (default behavior)
// });
const ProfilePage = () => {
  const router = useRouter();
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp
            stroke="black"
            width={24}
            height={24}
            color="black"
            onClick={() => router.push(`/help-center`)}
          />
        }
      />
      <Profile />
    </>
  );
};

export default ProfilePage;
