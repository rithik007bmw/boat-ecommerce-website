import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, Coupon, CartSummary } from '../types/cart';
import { Product, ProductColor } from '../types/product';
import { DEMO_COUPONS } from '../data/coupons';
import { PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color?: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  summary: CartSummary;
}

const CART_STORAGE_KEY = 'boat_cart_items_v1';
const COUPON_STORAGE_KEY = 'boat_applied_coupon_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading cart from localStorage', e);
    }
    // Default demo item matching Figma reference screen 4
    const defaultProduct = PRODUCTS.find((p) => p.id === 'boat-nirvana-751-anc') || PRODUCTS[0];
    return [
      {
        id: `${defaultProduct.id}_${defaultProduct.colors[0].name}`,
        product: defaultProduct,
        selectedColor: defaultProduct.colors[0],
        quantity: 1,
      },
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed saving cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed saving coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const addToCart = useCallback(
    (product: Product, color?: ProductColor, quantity: number = 1) => {
      const selectedColor = color || product.colors[0];
      const cartItemId = `${product.id}_${selectedColor.name}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIndex].quantity + quantity;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          return updated;
        } else {
          return [
            ...prevItems,
            {
              id: cartItemId,
              product,
              selectedColor,
              quantity,
            },
          ];
        }
      });

      showToast(`Added ${product.name} to cart!`, 'success');
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setItems((prevItems) => {
        const itemToRemove = prevItems.find((i) => i.id === cartItemId);
        if (itemToRemove) {
          showToast(`Removed ${itemToRemove.product.name} from cart`, 'info');
        }
        return prevItems.filter((i) => i.id !== cartItemId);
      });
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const cleanCode = code.trim().toUpperCase();
      const found = DEMO_COUPONS.find((c) => c.code === cleanCode);

      if (!found) {
        return {
          success: false,
          message: `Coupon "${cleanCode}" is invalid. Try "BOATVIP" or "SOUND500".`,
        };
      }

      // Check minimum order value if applicable
      const currentSubtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      if (found.minOrderValue && currentSubtotal < found.minOrderValue) {
        return {
          success: false,
          message: `Coupon "${cleanCode}" requires a minimum order of ₹${found.minOrderValue}.`,
        };
      }

      setAppliedCoupon(found);
      showToast(`Coupon "${cleanCode}" applied successfully! 🎉`, 'success');
      return {
        success: true,
        message: `${found.description} applied!`,
      };
    },
    [items, showToast]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  }, [showToast]);

  const summary = useMemo<CartSummary>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const originalSubtotal = items.reduce(
      (sum, item) => sum + item.product.originalPrice * item.quantity,
      0
    );
    const productSavings = originalSubtotal - subtotal;

    let couponDiscount = 0;
    if (appliedCoupon && subtotal > 0) {
      if (appliedCoupon.discountType === 'percentage') {
        couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      } else {
        couponDiscount = Math.min(appliedCoupon.discountValue, subtotal);
      }
    }

    const deliveryFee = 0; // Free delivery for boat products
    const taxes = 0; // GST included in price
    const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);
    const totalSavings = productSavings + couponDiscount;

    return {
      totalItems,
      subtotal,
      originalSubtotal,
      discountAmount: productSavings,
      couponDiscount,
      deliveryFee,
      taxes,
      finalTotal,
      totalSavings,
    };
  }, [items, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        summary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
