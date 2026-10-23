import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { summary } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Headphones', path: '/category/headphones' },
    { label: 'Earbuds', path: '/category/earbuds' },
    { label: 'Speakers', path: '/category/speakers' },
    { label: 'Smartwatches', path: '/category/smartwatches' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#E6E1D8] transition-all">
      {/* Top micro-bar */}
      <div className="bg-[#A94F55] text-white text-[11px] font-medium py-1 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Summer Bass Festival: Flat 15% OFF with code <strong>BOATVIP</strong> | Free Shipping Across India</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#A94F55] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              {/* boAt Sailboat Symbol */}
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17h20" />
                <path d="M4 17l2 4h12l2-4" />
                <path d="M12 3v14" />
                <path d="M12 4l7 9h-7" fill="currentColor" fillOpacity="0.3" />
                <path d="M12 7L6 13h6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#292929] leading-none">
                bo<span className="text-[#A94F55]">A</span>t
              </span>
              <span className="text-[9px] tracking-wider uppercase font-semibold text-[#706B65]">
                Plug into Nirvana
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors hover:text-[#A94F55] ${
                location.pathname === '/' ? 'text-[#A94F55]' : 'text-[#292929]'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-[#A94F55] ${
                  location.pathname === link.path ? 'text-[#A94F55]' : 'text-[#292929]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md hidden sm:block relative"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#706B65] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search headphones, earbuds, speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 text-[#292929] placeholder-[#8E8983] text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#E6E1D8] focus:outline-none focus:border-[#A94F55] focus:ring-2 focus:ring-[#A94F55]/20 transition-all shadow-xs"
              />
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-[#292929] hover:bg-white/80 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#292929]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A94F55] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Live Badge */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-[#292929] hover:bg-white/80 transition-colors group"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#292929] group-hover:text-[#A94F55] transition-colors" />
              {summary.totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A94F55] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {summary.totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="p-2.5 rounded-full text-[#292929] hover:bg-white/80 transition-colors hidden sm:flex items-center"
              title="My Account"
              aria-label="My Account"
            >
              <User className="w-5 h-5 text-[#292929]" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar (under logo on small screens) */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#706B65] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search boAt audio gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[#292929] placeholder-[#8E8983] text-sm pl-10 pr-4 py-2 rounded-full border border-[#E6E1D8] focus:outline-none focus:border-[#A94F55] focus:ring-1 focus:ring-[#A94F55]"
            />
          </form>
        </div>
      </div>
    </header>
  );
};
