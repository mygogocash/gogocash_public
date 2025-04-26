import { ReactNode } from 'react';

export interface IProp {
  onClick?: () => void;
  icon: ReactNode;
  radius?: string;
  border?: boolean;
}
