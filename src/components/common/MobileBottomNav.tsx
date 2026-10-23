import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const { summary } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Explore', icon: Grid, path: '/products' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist', badge: wishlistCount },
    { label: 'Cart', icon: ShoppingBag, path: '/cart', badge: summary.totalItems },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F7F5EF]/95 backdrop-blur-lg border-t border-[#E6E1D8] lg:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center w-14 h-full py-1 transition-all ${
                isActive
                  ? 'text-[#A94F55] font-semibold'
                  : 'text-[#706B65] hover:text-[#292929]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                    }`}
                  />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-[#A94F55] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight leading-none">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#A94F55]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
