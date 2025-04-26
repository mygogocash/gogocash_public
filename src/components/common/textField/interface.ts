import { ChangeEventHandler, ReactNode } from 'react';

export interface IProp {
  placeholder: string;
  defaultValue?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  message?: string;
  name: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  textRight?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
