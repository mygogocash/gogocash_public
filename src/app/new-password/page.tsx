'use client';
import { NewPasswordMobile } from '@/features/mobile/new-password';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <div className={`w-full hidden md:block`}></div>
      <div
        className={`w-full md:hidden block flex flex-col items-center justify-center`}
      >
        <NewPasswordMobile />
      </div>
    </>
  );
}
