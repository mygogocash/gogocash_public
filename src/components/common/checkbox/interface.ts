import { CheckedState } from '@radix-ui/react-checkbox';
import { FormEventHandler } from 'react';

export interface IProp {
  defaultChecked?: CheckedState;
  id: string;
  label: string;
  // onCheckedChange?(checked: CheckedState): void;
  name: string;
  required?: boolean;
  message?: string;
  onChange?: FormEventHandler<HTMLButtonElement>;
}
