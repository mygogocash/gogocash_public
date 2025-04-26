export interface IProp {
  name: string;
  open: boolean;
  onOpenChange?(open: boolean): void;
  options: IOptions[];
  _optionInModal?: boolean;
  // onClick?:() => boolean;
}

export interface IOptions {
  label: string;
  value: string | number;
}
