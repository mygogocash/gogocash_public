import * as React from 'react';
import { IProp } from './interface';
import { Drawer } from 'vaul';
import { X } from 'lucide-react';

const Component = ({ children, isOpen, setIsOpen, direction }: IProp) => {
  return (
    <Drawer.Root
      fixed
      direction={direction || 'right'}
      dismissible={true}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[9]" />
        <Drawer.Content
          className=" max-h-[80vh] overflow-y-auto overflow-x-hidden bg-white min-h-screen max-w-[555px] w-full md:w-[555px] fixed top-0 right-0 
        outline-none z-[9] rounded-l-[40px]"
        >
          <X
            className="absolute top-6 right-6 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          {/* Content */}
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export { Component };
