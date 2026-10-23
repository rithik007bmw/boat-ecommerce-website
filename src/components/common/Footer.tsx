import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw, Truck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E6E1D8] mt-16 pb-20 lg:pb-8">
      {/* Trust Badges */}
      <div className="border-b border-[#E6E1D8] bg-[#F3EFEA]/60">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A94F55]/10 text-[#A94F55] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#292929]">1 Year Warranty</h4>
                <p className="text-[11px] text-[#706B65]">100% Genuine Brand Coverage</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A94F55]/10 text-[#A94F55] flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#292929]">7-Day Replacement</h4>
                <p className="text-[11px] text-[#706B65]">Hassle-free easy returns</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A94F55]/10 text-[#A94F55] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#292929]">Free Express Delivery</h4>
                <p className="text-[11px] text-[#706B65]">On all orders nationwide</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A94F55]/10 text-[#A94F55] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#292929]">India’s No. 1 Brand</h4>
                <p className="text-[11px] text-[#706B65]">Loved by 10M+ boAtheads</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#A94F55] flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2 17h20M4 17l2 4h12l2-4M12 3v14M12 4l7 9h-7M12 7L6 13h6" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-[#292929]">
                bo<span className="text-[#A94F55]">A</span>t
              </span>
            </div>
            <p className="text-sm text-[#706B65] max-w-sm leading-relaxed">
              Plug Into Nirvana with industry-leading audio technology, ultra-clear microphones, and deep bass engineered for Indian audiophiles and everyday music lovers.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#A94F55] uppercase tracking-wider">Demo Store Simulation</p>
              <p className="text-xs text-[#8E8983] mt-0.5">Built based on the boAt Figma mobile reference design.</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#292929] uppercase tracking-wider mb-4">Shop Products</h3>
            <ul className="space-y-2.5 text-sm text-[#706B65]">
              <li><Link to="/category/headphones" className="hover:text-[#A94F55] transition-colors">Wireless Headphones</Link></li>
              <li><Link to="/category/earbuds" className="hover:text-[#A94F55] transition-colors">True Wireless Earbuds</Link></li>
              <li><Link to="/category/speakers" className="hover:text-[#A94F55] transition-colors">Bluetooth Speakers</Link></li>
              <li><Link to="/category/smartwatches" className="hover:text-[#A94F55] transition-colors">Smartwatches</Link></li>
              <li><Link to="/products" className="hover:text-[#A94F55] transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#292929] uppercase tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-sm text-[#706B65]">
              <li><Link to="/profile" className="hover:text-[#A94F55] transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-[#A94F55] transition-colors">Track Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#A94F55] transition-colors">My Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-[#A94F55] transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#292929] uppercase tracking-wider mb-4">Exclusive Coupons</h3>
            <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#E6E1D8] space-y-2">
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-[#A94F55] bg-white px-2 py-0.5 rounded border border-[#E6E1D8]">BOATVIP</code>
                <span className="text-[11px] font-medium text-[#706B65]">15% OFF</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-[#A94F55] bg-white px-2 py-0.5 rounded border border-[#E6E1D8]">SOUND500</code>
                <span className="text-[11px] font-medium text-[#706B65]">₹500 OFF</span>
              </div>
              <p className="text-[10px] text-[#8E8983] pt-1">Apply these codes at checkout or cart.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E6E1D8] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8983] gap-4">
          <p>© 2026 Imagine Marketing Limited. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Recreated with love for audio excellence and seamless UX.
          </p>
        </div>
      </div>
    </footer>
  );
};
