import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { IProp } from './interface';

const Component = ({
  showClose,
  title,
  description,
  content,
  open,
  onOpenChange,
  cssContent = `max-h-[85vh] w-[90vw] max-w-[500px]`,
}: IProp) => (
  <Dialog.Root
    open={open}
    onOpenChange={() =>
      onOpenChange
        ? onOpenChange(!open)
        : () => {
            //
          }
    }
  >
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/30 data-[state=open]:animate-overlayShow z-10" />
      <Dialog.Content
        className={`${cssContent} rounded-[16px] z-[20] bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow`}
      >
        <Dialog.Title className="m-0 text-[20px] font-medium text-[var(--black-5)] text-center flex items-center justify-center">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mb-5 mt-2.5 text-[20px] leading-normal text-[var(--black-5)] text-center">
          {description}
        </Dialog.Description>
        {content}
        {showClose && (
          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Component;
