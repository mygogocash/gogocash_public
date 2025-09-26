import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';
import { IProp } from './interface';

import { useFormContext } from 'react-hook-form';

export default function Component({
  open,
  name,
  onOpenChange,
  options,
}: IProp) {
  const { setValue, watch } = useFormContext();
  return (
    <Form.Field name={name} className="relative">
      <div
        className="flex items-center justify-between px-3  border border-grey-1 rounded-[8px] bg-white h-[52px]"
        onClick={() => onOpenChange?.(!open)}
      >
        <p className="text-[14px] md:text-[24px] text-black-4">
          {watch(name)?.label || 'Please select'}
        </p>
        <ChevronDownIcon className="rotate-[270deg]" />
      </div>
      {open && (
        <ul className="absolute z-[9] top-[3rem] w-full mt-2 shadow-lg flex items-center flex-col  justify-between   border border-grey-1 rounded-[8px] bg-white max-h-[200px] h-auto overflow-y-scroll">
          {options.map((option, _index) => (
            <li
              key={option.value}
              onClick={() => {
                setValue(name, option);
                onOpenChange?.(!open);
              }}
              className={`flex items-center justify-between border-b w-full border-grey-1 h-[52px] px-3 hover:bg-black-1`}
            >
              {option.label}
              {watch(name)?.value === option.value && (
                <CheckIcon className="text-primary-4" />
              )}
            </li>
          ))}
        </ul>
      )}
    </Form.Field>
  );
}
