export interface IProp {
  isChecked?: boolean;
  name: string;
  setIsChecked?(checked: boolean): void;
}
