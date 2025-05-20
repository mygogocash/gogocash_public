import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { memo, useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import BoxProfile from '../boxProfile';
import { useRouter } from 'next/navigation';
import { useCrossmintLoginContext } from '@/providers/CrossmintLoginContext';
const Component = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { signOutAuth } = useCrossmintLoginContext();
  return (
    <>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger className="p-2 ">
          <BoxProfile src="/logo.svg" open={open} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={30}
            align="end"
            className="rounded-[8px] min-w-[300px] p-2 bg-white shadow-lg "
          >
            <DropdownMenu.Item
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push('/profile');
              }}
            >
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push('/history');
              }}
            >
              History
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-[1px] bg-gray-200 my-1" />
            <DropdownMenu.Item
              className="flex items-center gap-2 p-2  hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                signOutAuth();
              }}
            >
              <LogOutIcon />
              Log Out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default memo(Component);
