export interface IResponseShopDetail {
  success: boolean;
  error: null;
  data: ShopDataDetail;
}

export interface ShopDataDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  type: string;
  status: string;
  cashbackPercent: number;
  cashbackFlat: number;
  currency: string;
  website: string;
  trackingDuration: number;
  showTracking: boolean;
  showCashbackTag: boolean;
  rating: number;
  affiliateType: string;
  affiliateParams: null;
  clicksCount: number;
  merchantAliases: null;
  categories: string[];
  terms: string;
  howToUse: string;
  hasCampaign: boolean;
  meta: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestGenerateDeeplink {
  offer_id: number;
  merchant_id: number;
  preview_url: string;
}

export interface ResponseGenerateDeeplink {
  _id: string;
  offer_id: number;
  merchant_id: number;
  user_id: string;
  deeplink: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
