import { Coupon } from '../types/cart';

export const DEMO_COUPONS: Coupon[] = [
  {
    code: 'BOATVIP',
    description: '15% instant discount on all audio gear',
    discountType: 'percentage',
    discountValue: 15,
  },
  {
    code: 'SOUND500',
    description: 'Flat ₹500 off on orders above ₹1,999',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 1999,
  },
  {
    code: 'WELCOME10',
    description: '10% welcome discount for new boAtheads',
    discountType: 'percentage',
    discountValue: 10,
  },
];
