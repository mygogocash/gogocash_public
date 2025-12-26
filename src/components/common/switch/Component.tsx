import * as React from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Form from '@radix-ui/react-form';
import { IProp } from './interface';

const Component = ({ isChecked, name, setIsChecked }: IProp) => {
  return (
    <Form.Field name={name} className="relative" asChild>
      <Switch.Root
        checked={isChecked}
        onCheckedChange={setIsChecked}
        className={`relative h-[25px] w-[42px] cursor-default rounded-full ${
          isChecked ? 'bg-primary-4' : 'bg-[white]'
        } shadow-[0_2px_10px] shadow-primary-4 outline-none focus:shadow-[0_0_0_1px] focus:shadow-primary-4 data-[state=checked]:bg-primary-4`}
        id="airplane-mode"
      >
        <Switch.Thumb
          className={`block size-[21px] translate-x-0.5 rounded-full  ${
            isChecked ? 'bg-white border border-primary-4' : ' bg-primary-4'
          } transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]`}
        />
      </Switch.Root>
    </Form.Field>
  );
};

export default Component;
