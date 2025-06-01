export interface IResponseProductDetail {
  success: boolean;
  message: string;
  data: ProductDetailData;
}

export interface ProductDetailData {
  id: string;
  merchantId: string;
  name: string;
  sku: string;
  description: string;
  brand: string;
  price: number;
  originalPrice: number;
  currency: string;
  cashbackPercent: number;
  cashbackFlat: number;
  categories: string[];
  tags: string[];
  images: string[];
  productUrl: string;
  affiliateUrl: string;
  status: string;
  clicksCount: number;
  meta: null;
  createdAt: Date;
  updatedAt: Date;
  stats: Stats;
}

export interface Stats {
  clicksLast7Days: number;
  clicksLast30Days: number;
  purchaseCount: number;
  conversionRate: number;
  totalRevenue: number;
  totalCashback: number;
}
