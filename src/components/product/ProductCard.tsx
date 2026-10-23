import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../../types/product';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { RatingStars } from '../common/RatingStars';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], 1);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[#E6E1D8] hover:border-[#D99A9E] transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl bg-[#F4F1EA] overflow-hidden flex items-center justify-center p-2 sm:p-4">
        {/* Product image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isBestseller && (
            <span className="bg-[#292929] text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#A94F55] text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            isFavorited
              ? 'bg-[#A94F55] text-white'
              : 'bg-white/90 text-[#706B65] hover:text-[#A94F55] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Floating Button (desktop hover) */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick add to cart"
          className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-[#A94F55] text-white flex items-center justify-center shadow-md transform sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-[#8E3E43]"
          title="Add to cart"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 pt-3">
        {/* Rating */}
        <div className="mb-1.5">
          <RatingStars rating={product.rating} count={product.reviewsCount} size="sm" />
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold text-[#292929] line-clamp-1 group-hover:text-[#A94F55] transition-colors">
          {product.name}
        </h3>

        {!compact && (
          <p className="text-[11px] sm:text-xs text-[#706B65] line-clamp-1 mt-0.5 mb-2">
            {product.tagline}
          </p>
        )}

        {/* Color preview dots */}
        <div className="flex items-center gap-1.5 my-1.5">
          {product.colors.slice(0, 3).map((col, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs"
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-[10px] text-[#8E8983] font-medium">
              +{product.colors.length - 3}
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-extrabold text-[#292929]">
              {formatPrice(product.price)}
            </span>
            <span className="text-[11px] sm:text-xs text-[#8E8983] line-through font-normal">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold text-[#A94F55] bg-[#F7EAEB] px-1.5 py-0.5 rounded-md">
            {product.discountPercent}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};
