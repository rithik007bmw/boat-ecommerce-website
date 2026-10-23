import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WISHLIST_STORAGE_KEY = 'boat_wishlist_items';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['boat-nirvana-751-anc', 'boat-rockerz-550'];
    } catch {
      return ['boat-nirvana-751-anc', 'boat-rockerz-550'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = useCallback((productId: string, productName?: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (productName) showToast(`Removed ${productName} from Wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (productName) showToast(`Added ${productName} to Wishlist! ❤️`, 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
