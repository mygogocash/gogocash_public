import { ReactNode } from 'react';

export interface IProp {
  onClick: () => void;
  title: string;
  icon: ReactNode;
  list: IList[];
}

export interface IList {
  percent: string;
  pic: string;
  name: string;
  shopName: string;
  link: string;
  type: string;
  like?: boolean;
}
