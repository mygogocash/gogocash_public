import { TypeOpen } from "../interface";

export interface IProp {
  isOpen?: TypeOpen;
  setIsOpen?: React.Dispatch<React.SetStateAction<TypeOpen>>;
};
