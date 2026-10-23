import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemCard } from '../components/cart/CartItemCard';
import { OrderSummaryCard } from '../components/cart/OrderSummaryCard';
import { CouponForm } from '../components/cart/CouponForm';
import { EmptyState } from '../components/common/EmptyState';

export const CartPage: React.FC = () => {
  const { items, clearCart, summary } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header matching Figma Screen 4 */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E6E1D8]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white border border-[#E6E1D8] flex items-center justify-center text-[#292929] hover:bg-[#F3EFEA] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight">
              Your Cart
            </h1>
            <p className="text-xs text-[#706B65]">
              {summary.totalItems} {summary.totalItems === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-[#8E8983] hover:text-[#C62828] flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Bag</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven’t added any audio gear to your bag yet. Explore our bestsellers and plug into nirvana!"
          actionText="Shop Headphones & Earbuds"
          actionLink="/products"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List & Coupon */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-3">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Coupon Application Form */}
            <CouponForm />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 sticky top-24">
            <OrderSummaryCard showCheckoutButton={true} />
          </div>
        </div>
      )}
    </div>
  );
};
