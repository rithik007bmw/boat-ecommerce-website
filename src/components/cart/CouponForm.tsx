import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { DEMO_COUPONS } from '../../data/coupons';

export const CouponForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const res = applyCoupon(code);
    if (res.success) {
      setMessage({ text: res.message, error: false });
      setCode('');
    } else {
      setMessage({ text: res.message, error: true });
    }
  };

  const handleApplyQuick = (quickCode: string) => {
    const res = applyCoupon(quickCode);
    if (res.success) {
      setMessage({ text: res.message, error: false });
    } else {
      setMessage({ text: res.message, error: true });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E6E1D8] space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-[#292929]">
        <Tag className="w-4 h-4 text-[#A94F55]" />
        <span>Have a Promo or Coupon Code?</span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-[#F7EAEB] p-3 rounded-xl border border-[#D99A9E]">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-mono font-bold text-xs text-[#A94F55]">
                {appliedCoupon.code}
              </span>
              <p className="text-[10px] text-[#706B65]">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="text-xs text-[#C62828] font-bold hover:underline p-1"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setMessage(null);
            }}
            placeholder="Enter code (e.g. BOATVIP)"
            className="flex-1 bg-[#F7F5EF] text-xs font-mono font-semibold px-3.5 py-2.5 rounded-xl border border-[#E6E1D8] uppercase focus:outline-none focus:border-[#A94F55]"
          />
          <button
            type="submit"
            disabled={!code.trim()}
            className="bg-[#A94F55] hover:bg-[#8E3E43] disabled:opacity-40 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0"
          >
            Apply
          </button>
        </form>
      )}

      {message && (
        <p
          className={`text-xs font-medium ${
            message.error ? 'text-[#C62828]' : 'text-[#2E7D32]'
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Quick suggestions */}
      {!appliedCoupon && (
        <div className="pt-2 border-t border-[#F1ECE4]">
          <p className="text-[10px] font-bold text-[#8E8983] uppercase mb-1.5">
            Available coupons:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_COUPONS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleApplyQuick(c.code)}
                className="text-[10px] font-mono font-bold bg-[#F7F5EF] hover:bg-[#F3EFEA] text-[#A94F55] px-2 py-1 rounded-lg border border-[#E6E1D8] transition-colors"
              >
                {c.code} ({c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
