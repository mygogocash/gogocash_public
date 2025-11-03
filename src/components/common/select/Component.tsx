import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';
import { IProp } from './interface';

export default function Component({
  open,
  name,
  onOpenChange,
  options,
  value,
  onClick,
  _optionInModal,
}: IProp) {
  return (
    <Form.Field name={name}>
      <Select.Root
        open={open}
        onOpenChange={onOpenChange}
        onValueChange={(val) => {
          onClick?.(val as string | number);
        }}
      >
        <Select.Trigger
          className="z-[9999] inline-flex items-center text-black-500 text-[16px] justify-between w-full h-[56px] px-3 py-2 border border-grey-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary-4"
          // className="inline-flex items-center justify-between w-48 px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {value && options.find((opt) => opt.value == value) ? (
            <p>{options.find((opt) => opt.value == value)?.label}</p>
          ) : (
            <Select.Value placeholder="Select an option" />
          )}
          <Select.Icon>
            <ChevronDownIcon className="w-5 h-5 text-black-500" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="w-full rounded-[8px] bg-white border border-grey-2 shadow-lg top-10">
            <Select.Viewport className="p-2">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value as string}
                  className=" text-[16px] text-black-5 flex items-center justify-between px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon className="w-4 h-4 text-primary-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Form.Field>
  );
}
