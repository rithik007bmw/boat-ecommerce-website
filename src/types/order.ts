import { CartItem } from './cart';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Order {
  id: string; // e.g., BOAT-89412
  createdAt: string;
  estimatedDeliveryDate: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  totalSavings: number;
  couponCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}
