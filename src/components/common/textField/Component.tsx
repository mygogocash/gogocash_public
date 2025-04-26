import * as React from 'react';
import { memo } from 'react';
import * as Form from '@radix-ui/react-form';

import { IProp } from './interface';
const Component = ({
  placeholder,
  defaultValue,
  type,
  disabled,
  required,
  label,
  message,
  name,
  startIcon,
  endIcon,
  textRight,
  onChange,
}: IProp) => {
  return (
    <Form.Field name={name}>
      <div className="flex flex-col gap-1 ">
        {label && (
          <Form.Label className="text-sm font-medium">{label}</Form.Label>
        )}
        <div className="relative h-[56px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {startIcon}
          </div>
          <Form.Control asChild>
            <input
              defaultValue={defaultValue}
              disabled={disabled}
              type={type}
              required={required}
              className={`${
                textRight ? 'text-right' : ''
              } text-[16px] text-[var(--black-5)] w-full h-[56px] ${
                startIcon ? 'pl-14' : 'pl-3'
              } ${
                endIcon ? 'pr-14' : 'pr-3'
              } py-2 border border-[var(--grey-2)] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={placeholder}
              onChange={onChange}
            />
          </Form.Control>
          <div className="absolute right-3 bottom-1/2 translate-y-1/2">
            {endIcon}
          </div>
        </div>
        <Form.Message match="valueMissing" className="text-red-500 text-xs">
          {message || 'This field is required.'}
        </Form.Message>
        {type === 'email' && (
          <Form.Message match="typeMismatch" className="text-red-500 text-xs">
            Please enter a valid email.
          </Form.Message>
        )}
      </div>
    </Form.Field>
  );
};

export default memo(Component);
