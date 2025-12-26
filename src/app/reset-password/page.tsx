'use client';
import { ResetPassword } from '@/features/desktop/profile/views/form/resetPassword';
import { ResetPasswordMobile } from '@/features/mobile/reset-password';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <div className={`w-full hidden md:block`}>
        <ResetPassword />
      </div>
      <div
        className={`w-full md:hidden block flex flex-col items-center justify-center`}
      >
        <ResetPasswordMobile />
      </div>
    </>
  );
}
