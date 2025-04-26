'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Profile from '@/features/desktop/profile';
import { CircleHelp } from 'lucide-react';
// const Profile = dynamic(() => import('@/features/desktop/profile'), {
//   ssr: false, // This enables SSR (default behavior)
// });
const ProfilePage = () => {
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp stroke="black" width={24} height={24} color="black" />
        }
      />
      <Profile />
    </>
  );
};

export default ProfilePage;
