export interface IProp {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}
