'use client';
import { SignUp } from '@/features/desktop/profile/views/form/signUp';
import { SignUpMobile } from '@/features/mobile/register';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <div className={`w-full hidden md:block`}>
        <SignUp />
      </div>
      <div
        className={`w-full md:hidden block flex flex-col items-center justify-center`}
      >
        <SignUpMobile />
      </div>
    </>
  );
}
