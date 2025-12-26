export interface ResponseWithdrawCheck {
  netAmount: number;
  feeAmount: number;
  totalUSDAmount: number;
  feePercentage: number;
  data: DataWithdrawCheck[];
}

export interface DataWithdrawCheck {
  conversion_id: number;
  offer_id: number;
  aff_sub1: string;
  aff_sub2: null;
  aff_sub3: null;
  aff_sub4: null;
  aff_sub5: null;
  adv_sub1: string;
  adv_sub2: string;
  adv_sub3: string;
  adv_sub4: string;
  adv_sub5: string;
  datetime_conversion: Date;
  conversion_status: string;
  affiliate_remarks: null;
  currency: string;
  sale_amount: string;
  payout: string;
  base_payout: string;
  bonus_payout: string;
  merchant_id: number;
  offer_name: string;
}
