export interface Tab {
  title: string;
  id: string | number;
  content?: React.ReactNode;
  disabled?: boolean;
  link?: string;
}
export interface IProp {
  list: Tab[];
}
