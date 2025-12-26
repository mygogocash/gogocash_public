export interface IProp {
  min: number;
  max: number;
  onClick?: () => boolean;
  totalPage?: number;
  currentPage?: number;
}
