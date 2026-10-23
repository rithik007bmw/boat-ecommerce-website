import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

interface OrderSummaryCardProps {
  showCheckoutButton?: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  showCheckoutButton = true,
}) => {
  const { summary, appliedCoupon } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E6E1D8] shadow-xs space-y-4">
      <h3 className="text-base sm:text-lg font-extrabold text-[#292929] pb-3 border-b border-[#E6E1D8]">
        Order Summary
      </h3>

      <div className="space-y-2.5 text-xs sm:text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-[#706B65]">
          <span>Price ({summary.totalItems} items)</span>
          <span className="font-semibold text-[#292929]">
            {formatPrice(summary.originalSubtotal)}
          </span>
        </div>

        {/* Product Discount */}
        <div className="flex items-center justify-between text-[#2E7D32]">
          <span>Product Discount</span>
          <span className="font-semibold">
            -{formatPrice(summary.discountAmount)}
          </span>
        </div>

        {/* Coupon Discount if active */}
        {summary.couponDiscount > 0 && (
          <div className="flex items-center justify-between text-[#A94F55]">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Coupon ({appliedCoupon?.code})
            </span>
            <span className="font-bold">
              -{formatPrice(summary.couponDiscount)}
            </span>
          </div>
        )}

        {/* Delivery Fee */}
        <div className="flex items-center justify-between text-[#706B65]">
          <span>Delivery Charges</span>
          <span className="font-bold text-[#2E7D32] uppercase text-xs">
            FREE
          </span>
        </div>

        {/* Tax Note */}
        <div className="flex items-center justify-between text-[11px] text-[#8E8983]">
          <span>GST / Taxes</span>
          <span>Included</span>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E6E1D8] pt-3 flex items-baseline justify-between">
          <div>
            <span className="text-sm sm:text-base font-extrabold text-[#292929]">
              Total Amount
            </span>
            <p className="text-[10px] text-[#8E8983]">All taxes included</p>
          </div>
          <span className="text-lg sm:text-xl font-black text-[#A94F55]">
            {formatPrice(summary.finalTotal)}
          </span>
        </div>
      </div>

      {/* Total Savings Alert */}
      {summary.totalSavings > 0 && (
        <div className="bg-[#E8F5E9] text-[#2E7D32] px-3.5 py-2.5 rounded-2xl text-xs font-bold text-center border border-[#C8E6C9] flex items-center justify-center gap-1.5">
          <span>🎉 You will save {formatPrice(summary.totalSavings)} on this order!</span>
        </div>
      )}

      {/* Action Buttons */}
      {showCheckoutButton && (
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => navigate('/checkout')}
            disabled={summary.totalItems === 0}
            className="w-full bg-[#A94F55] hover:bg-[#8E3E43] disabled:opacity-40 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#A94F55]/20 active:scale-98 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/products"
            className="w-full inline-flex items-center justify-center text-xs font-bold text-[#706B65] hover:text-[#292929] py-2 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Safe Trust Note */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-[#8E8983] pt-2 border-t border-[#F1ECE4]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
        <span>Safe & Secure 256-Bit SSL Checkout</span>
      </div>
    </div>
  );
};
