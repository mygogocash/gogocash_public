export interface ResponseWithdrawHistory {
  data: DataWithdrawHistory[];
  pagination: Pagination;
}

export interface DataWithdrawHistory {
  _id: string;
  address: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  amount_total: number;
  amount_net: number;
  percent_fee: number;
  status: string;
  method: string;
  tx_hash: string;
  user_id: string;
  conversion_id: number[];
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
