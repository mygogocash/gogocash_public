import { ReactNode } from 'react';

export interface IProp {
  showClose?: boolean;
  title?: string | ReactNode;
  description?: string | ReactNode;
  content?: string | ReactNode;
  onOpenChange?: (val: boolean) => void;
  open: boolean;
  cssContent?: string
}
