export interface IResponseMerchants {
  success: boolean;
  error: null;
  data: DataMerchants;
}

export interface DataMerchants {
  items: ItemMerchants[];
  pagination: PaginationMerchants;
}

export interface ItemMerchants {
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
  categories: null;
  terms: string;
  howToUse: string;
  hasCampaign: boolean;
  meta: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationMerchants {
  total: number;
  page: number;
  limit: number;
  pages: number;
  offset: number;
}

export interface IResponseCampaigns {
  success: boolean;
  error: null;
  data: IDataCampaigns[];
}

export interface IDataCampaigns {
  id: string;
  name: string;
  description: string;
  type: string;
  value: number;
  minAmount: number;
  maxAmount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  status: string;
  targetType: string;
  targetIds: string[];
  code: string;
  image: string;
  maxUses: number;
  usesCount: number;
  publisherId: string;
  isGlobal: boolean;
  termsConditions: string;
  meta: MetaCampaigns;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetaCampaigns {
  season: string;
  year: number;
}
