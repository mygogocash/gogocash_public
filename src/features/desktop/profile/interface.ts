export interface ResponseGetMyOffers {
  _id: string;
  offer_id: number;
  merchant_id: number;
  user_id: string;
  deeplink: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  offer_name: string;
}

export interface ResponseConversion {
  status: string;
  message: string;
  data: ObjectConversion;
}

export interface ObjectConversion {
  page: number;
  limit: number;
  count: number;
  nextPage: null;
  data: DataConversion[];
}

export interface DataConversion {
  conversion_id: number;
  offer_id: number;
  aff_sub1: null | string;
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
