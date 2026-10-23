import { Product, ProductColor } from './product';

export interface CartItem {
  id: string; // generated as `${product.id}_${selectedColor.name}`
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
}

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  originalSubtotal: number;
  discountAmount: number;
  couponDiscount: number;
  deliveryFee: number;
  taxes: number;
  finalTotal: number;
  totalSavings: number;
}
