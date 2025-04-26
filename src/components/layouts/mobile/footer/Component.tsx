import NotificationIcon from '@/components/icons/NotificationIcon';
import { Home, User2Icon, Wallet2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Component = () => {
  const pathname = usePathname();
  return (
    <div
      style={{
        boxShadow: '0px -4px 15px 0px rgba(0, 0, 0, 0.08)',
      }}
      className="sticky bottom-0 flex items-center justify-evenly w-full h-[52px] bg-white md:hidden"
    >
      <Link href={'/'}>
        <div className="flex flex-col items-center justify-center">
          <Home
            // fill={pathname === '/' ? '#00b14f' : '#FFF'}
            stroke={pathname === '/' ? '#00b14f' : '#A9A9A9'}
          />
          <p
            className={`text-[8px] text-light ${
              pathname === '/'
                ? 'text-[var(--primary-4)]'
                : 'text-[var(--black-3)]'
            }`}
          >
            Home
          </p>
        </div>
      </Link>
      <Link href={'/wallet'}>
        <div className="flex flex-col items-center justify-center">
          <Wallet2
            fill={pathname === '/wallet' ? '#00b14f' : '#FFF'}
            stroke={pathname === '/wallet' ? '#00b14f' : '#A9A9A9'}
          />
          <p
            className={`text-[8px] text-light ${
              pathname === '/wallet'
                ? 'text-[var(--primary-4)]'
                : 'text-[var(--black-3)]'
            }`}
          >
            Wallet
          </p>
        </div>
      </Link>
      <Link href={'/notification'}>
        <div className="flex flex-col items-center justify-center">
          <NotificationIcon
            width={24}
            height={23}
            fill={pathname === '/notification' ? '#00b14f' : '#A9A9A9'}
            stroke={pathname === '/notification' ? '#00b14f' : '#A9A9A9'}
          />
          <p
            className={`text-[8px] text-light ${
              pathname === '/notification'
                ? 'text-[var(--primary-4)]'
                : 'text-[var(--black-3)]'
            }`}
          >
            Notification
          </p>
        </div>
      </Link>
      <Link href={'/profile'}>
        <div className="flex flex-col items-center justify-center">
          <User2Icon
            fill={pathname === '/profile' ? '#00b14f' : '#FFF'}
            stroke={pathname === '/profile' ? '#00b14f' : '#A9A9A9'}
          />
          <p
            className={`text-[8px] text-light ${
              pathname === '/profile'
                ? 'text-[var(--primary-4)]'
                : 'text-[var(--black-3)]'
            }`}
          >
            Profile
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Component;
