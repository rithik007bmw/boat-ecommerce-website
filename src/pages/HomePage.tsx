import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryList } from '../components/home/CategoryList';
import { PromoBanner } from '../components/home/PromoBanner';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Zap, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.rating >= 4.8).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Category Shortcuts */}
      <CategoryList />

      {/* 3. Featured Products / Trending */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A94F55]/10 text-[#A94F55] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight">
                Trending Right Now
              </h2>
              <p className="text-xs sm:text-sm text-[#706B65]">
                Most popular active noise cancelling headphones & earbuds
              </p>
            </div>
          </div>
          <Link
            to="/category/headphones"
            className="text-xs sm:text-sm font-bold text-[#A94F55] hover:underline flex items-center gap-1"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-column mobile, 3-column tablet, 4-column desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <PromoBanner />

      {/* 5. Best Sellers Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight">
                boAt Hall of Fame
              </h2>
              <p className="text-xs sm:text-sm text-[#706B65]">
                Over 500,000+ units sold across India
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-bold text-[#A94F55] hover:underline flex items-center gap-1"
          >
            <span>All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. New Arrivals Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A94F55]/10 text-[#A94F55] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight">
                New Releases
              </h2>
              <p className="text-xs sm:text-sm text-[#706B65]">
                Freshly dropped wireless audio & smart wearable gear
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-bold text-[#A94F55] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
