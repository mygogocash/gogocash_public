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

export interface IResponseProducts {
  success: boolean;
  message: string;
  data: DataProducts;
}

export interface DataProducts {
  pagination: Pagination;
  products: Product[];
}

export interface Pagination {
  limit: number;
  page: number;
  pages: number;
  sortBy: string;
  sortOrder: string;
  total: number;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  sku: string;
  description: string;
  brand: string;
  price: number;
  originalPrice: number;
  currency: Currency;
  cashbackPercent: number;
  cashbackFlat: number;
  categories: Category[];
  tags: Tag[];
  images: string[];
  productUrl: string;
  affiliateUrl: string;
  status: Status;
  clicksCount: number;
  meta: null;
  createdAt: Date;
  updatedAt: Date;
}

export enum Category {
  MenSShoesAndClothing = "Men's Shoes and Clothing",
}

export enum Currency {
  Thb = 'THB',
}

export enum Status {
  Active = 'active',
}

export enum Tag {
  Shopping = 'Shopping',
}

export interface IResponseAds {
  success: boolean;
  message: string;
  data: DataAds[];
}

export interface DataAds {
  id: string;
  title: string;
  description: string;
  image: string;
  position: string;
  type: string;
  url: string;
  startDate: Date;
  endDate: Date;
  status: string;
  country: string;
  costPerClick: number;
  costPerImpression: number;
  showingRatio: number;
  impressions: number;
  clicks: number;
  publisherIds: string[];
  ignoredPublisherIds: string[];
  isGlobal: boolean;
  note: string;
  meta: null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  enableTargeting: boolean;
}
