export type Status = 'warning' | 'info' | 'success' | 'error';

export interface IProps {
  status: Status;
  text: string;
}
