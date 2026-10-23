import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../../types/cart';
import { formatPrice } from '../../utils/formatters';
import { QuantitySelector } from '../product/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-3 sm:gap-4 p-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E6E1D8] shadow-2xs hover:border-[#D99A9E] transition-all">
      {/* Product Thumbnail */}
      <Link
        to={`/product/${item.product.id}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F4F1EA] p-2 flex items-center justify-center shrink-0 overflow-hidden"
      >
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/product/${item.product.id}`}
              className="text-xs sm:text-sm font-bold text-[#292929] hover:text-[#A94F55] transition-colors line-clamp-1"
            >
              {item.product.name}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: item.selectedColor.hex }}
              />
              <span className="text-[11px] text-[#706B65] font-medium">
                {item.selectedColor.name}
              </span>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-[#8E8983] hover:text-[#C62828] p-1.5 rounded-lg transition-colors shrink-0"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Pricing and Stepper */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#F1ECE4]">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-[#292929]">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="text-[11px] text-[#8E8983]">
                ({formatPrice(item.product.price)} each)
              </span>
            )}
          </div>

          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
