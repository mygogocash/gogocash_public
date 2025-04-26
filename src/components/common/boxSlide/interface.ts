import { ReactNode } from 'react';

export interface IProp {
  onClick: () => void;
  title: string;
  icon: ReactNode;
  list: Ilist[];
}

export interface Ilist {
  percent: number;
  pic: string;
}
