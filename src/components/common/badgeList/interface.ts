import { ReactNode } from "react";

export interface IProps {
    list: Ilist[];
    vertical?: boolean;
}

export interface Ilist {
    icon: ReactNode;
    title: string;
    subTitle: string;
}