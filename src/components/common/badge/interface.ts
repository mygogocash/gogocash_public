export type Status = 'pending' | 'info' | 'approved' | 'error';

export interface IProps {
  status: Status;
  text: string;
}
