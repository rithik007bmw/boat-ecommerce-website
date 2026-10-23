import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductColor, Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import { RatingStars } from '../components/common/RatingStars';
import { ProductGallery } from '../components/product/ProductGallery';
import { ColorSelector } from '../components/product/ColorSelector';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { PinCodeChecker } from '../components/product/PinCodeChecker';
import { ReviewsSection } from '../components/product/ReviewsSection';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Reset color and quantity when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.tagline,
          url: window.location.href,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Recommended products
  const recommendedProducts = PRODUCTS.filter(
    (p) => product.recommendedIds?.includes(p.id) || (p.category === product.category && p.id !== product.id)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Top Bar with Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white border border-[#E6E1D8] flex items-center justify-center text-[#292929] hover:bg-[#F3EFEA] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Breadcrumbs */}
          <nav className="text-xs font-semibold text-[#706B65] flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-[#A94F55]">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-[#A94F55] capitalize">
              {product.categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-[#292929] truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-white border border-[#E6E1D8] text-[#706B65] hover:text-[#292929] transition-colors"
          title="Share Product"
          aria-label="Share Product"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Product Layout: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#A94F55] bg-[#F7EAEB] px-2.5 py-0.5 rounded-full">
                boAt Signature Sound
              </span>
              {product.isBestseller && (
                <span className="text-xs font-semibold text-white bg-[#292929] px-2 py-0.5 rounded-full">
                  Bestseller
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#292929] tracking-tight leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#706B65] mt-1 leading-relaxed">
              {product.tagline}
            </p>

            {/* Ratings */}
            <div className="mt-2.5 flex items-center gap-3">
              <RatingStars rating={product.rating} count={product.reviewsCount} size="md" />
              <span className="text-xs text-[#2E7D32] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified boAt Product
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6E1D8] space-y-1 shadow-2xs">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#292929]">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm sm:text-base text-[#8E8983] line-through font-normal">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-extrabold text-[#A94F55] bg-[#F7EAEB] px-2 py-1 rounded-md">
                {product.discountPercent}% OFF
              </span>
            </div>
            <p className="text-[11px] text-[#2E7D32] font-bold">
              You Save {formatPrice(product.originalPrice - product.price)} (inclusive of all taxes)
            </p>
          </div>

          {/* Color Selector */}
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Quantity & Stock Status */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E6E1D8]">
            <div>
              <span className="text-xs font-bold text-[#706B65] uppercase tracking-wider block mb-1">
                Quantity
              </span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => Math.min(10, q + 1))}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#2E7D32] flex items-center justify-end gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                In Stock
              </span>
              <p className="text-[11px] text-[#8E8983] mt-0.5">
                Ready to ship from boAt warehouse
              </p>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-[#F3EFEA] text-[#292929] border-2 border-[#292929] font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                  isFavorited
                    ? 'bg-[#A94F55] text-white border-[#A94F55] shadow-xs'
                    : 'bg-white text-[#292929] border-[#E6E1D8] hover:border-[#D99A9E]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Buy Now (prominent boat red) */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-[#A94F55] hover:bg-[#8E3E43] text-white font-extrabold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#A94F55]/25 active:scale-98 transition-all"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Buy Now &bull; {formatPrice(product.price * quantity)}</span>
            </button>
          </div>

          {/* Delivery PIN Code Checker */}
          <PinCodeChecker />

          {/* Key Trust Highlights */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="bg-white p-2.5 rounded-xl border border-[#E6E1D8]">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#A94F55] mb-1" />
              <p className="text-[10px] font-bold text-[#292929]">1 Year Warranty</p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E6E1D8]">
              <RotateCcw className="w-4 h-4 mx-auto text-[#A94F55] mb-1" />
              <p className="text-[10px] font-bold text-[#292929]">7 Days Return</p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E6E1D8]">
              <Truck className="w-4 h-4 mx-auto text-[#A94F55] mb-1" />
              <p className="text-[10px] font-bold text-[#292929]">Free Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Highlights & Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6E1D8]">
        {/* Highlights */}
        <div>
          <h3 className="text-lg font-extrabold text-[#292929] mb-4">
            Product Highlights
          </h3>
          <ul className="space-y-3">
            {product.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#706B65]">
                <CheckCircle2 className="w-4 h-4 text-[#A94F55] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications Table */}
        <div>
          <h3 className="text-lg font-extrabold text-[#292929] mb-4">
            Technical Specifications
          </h3>
          <div className="divide-y divide-[#E6E1D8] text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="py-2.5 flex justify-between gap-4">
                <span className="font-semibold text-[#706B65]">{key}</span>
                <span className="font-bold text-[#292929] text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ReviewsSection
        rating={product.rating}
        reviewsCount={product.reviewsCount}
        reviews={product.reviews}
      />

      {/* Frequently Bought Together / Recommendations */}
      {recommendedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
