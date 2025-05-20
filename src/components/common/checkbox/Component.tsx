import { memo } from 'react';
import * as React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';

import { IProp } from './interface';
const Component = ({
  defaultChecked,
  id,
  label,
  name,
  required,
  message,
  onChange,
}: IProp) => {
  return (
    <Form.Field name={name}>
      <label className={`flex items-center gap-2`}>
        <Form.Control asChild required>
          <Checkbox.Root
            required={required}
            className={`flex size-[20px] appearance-none  items-center justify-center rounded-[4px]
              hover:bg-violet3 outline outline-[var(--primary-4)] focus:shadow-[0_0_0_2px_var(--primary-4)]
              ${!defaultChecked ? 'bg-white' : 'bg-[var(--primary-4)]'}`}
            defaultChecked={defaultChecked}
            id={id}
            name={name}
            onChange={onChange}
          >
            <Checkbox.Indicator className="text-violet11">
              <CheckIcon
                className={`${
                  defaultChecked ? 'text-white' : 'text-[var(--primary-4)]'
                }`}
              />
            </Checkbox.Indicator>
          </Checkbox.Root>
          {/* Native input used by Form.Control for validation */}
        </Form.Control>
        <span>{label}</span>
      </label>
      <Form.Message
        match="valueMissing"
        // match={(value, _formData) => {
        //   console.log('value', value);
        //   console.log('value', _formData);

        //   return value == 'on';
        // }}
        className="text-red-500 text-xs"
      >
        {message || 'Please select an option'}
      </Form.Message>
    </Form.Field>
  );
};

export default memo(Component);
