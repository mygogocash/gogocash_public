import { TypeOpen } from '../interface';

export interface IProp {
  _isOpen?: TypeOpen;
  setIsOpen?: React.Dispatch<React.SetStateAction<TypeOpen>>;
  handleModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
