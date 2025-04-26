import { ReactNode } from 'react';

export interface IProp {
  icon?: ReactNode;
  onClick?: () => void;
  text: string;
  backgroundColor?: string;
  fullWidth?: boolean;
  center?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
}
