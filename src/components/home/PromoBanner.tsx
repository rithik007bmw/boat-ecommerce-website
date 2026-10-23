import React from 'react';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PromoBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#A94F55] to-[#8E3E43] text-white p-6 sm:p-8 mb-12 shadow-md">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Limited Period Offer</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Get Flat 15% OFF On Your Entire First Order
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg">
            Use code <strong className="text-white underline underline-offset-2">BOATVIP</strong> during checkout to unlock VIP discounts across all premium headphones and earbuds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-2xl flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-300" />
            <span className="font-mono font-bold tracking-wider text-sm">BOATVIP</span>
          </div>

          <Link
            to="/category/headphones"
            className="inline-flex items-center gap-2 bg-white text-[#A94F55] font-bold text-xs sm:text-sm px-5 py-3 rounded-full hover:bg-white/95 transition-all active:scale-95 shadow-sm"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
