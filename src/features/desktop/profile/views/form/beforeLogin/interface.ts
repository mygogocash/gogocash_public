import React from "react";
import { TypeOpen } from "../interface";

export interface IProps {
  title: string;
  subTitle: string;
  isLogin?: boolean;
  isOpen?: TypeOpen;
  setIsOpen?: React.Dispatch<React.SetStateAction<TypeOpen>>;
  handleModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
