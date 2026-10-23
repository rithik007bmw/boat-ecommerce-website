import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/product/FilterDrawer';
import { SortDropdown } from '../components/product/SortDropdown';
import { EmptyState } from '../components/common/EmptyState';

export const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search query from URL or state
  const queryParam = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Sync category param with filter state
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [category]);

  // Sync query param
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      navigate('/products');
    } else {
      navigate(`/category/${cat}`);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory(category || 'all');
    setPriceRange('all');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchTagline = product.tagline.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        if (!matchName && !matchTagline && !matchCategory) return false;
      }

      // Price range
      if (priceRange === 'under-1500' && product.price >= 1500) return false;
      if (priceRange === '1500-3000' && (product.price < 1500 || product.price > 3000)) return false;
      if (priceRange === 'above-3000' && product.price <= 3000) return false;

      // Rating
      if (minRating > 0 && product.rating < minRating) return false;

      // In-stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  // Page title
  const pageTitle = useMemo(() => {
    if (selectedCategory === 'headphones') return 'Headphones';
    if (selectedCategory === 'earbuds') return 'Wireless Earbuds';
    if (selectedCategory === 'speakers') return 'Bluetooth Speakers';
    if (selectedCategory === 'smartwatches') return 'Smartwatches';
    return 'All Products';
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header matching Figma Screen 2 */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-white border border-[#E6E1D8] flex items-center justify-center text-[#292929] hover:bg-[#F3EFEA] transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-xs text-[#706B65]">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-2xl border border-[#E6E1D8] text-xs font-bold text-[#292929] shadow-2xs hover:border-[#D99A9E]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A94F55]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Search input within listing */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#706B65] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search within ${pageTitle.toLowerCase()}...`}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-2xl border border-[#E6E1D8] focus:outline-none focus:border-[#A94F55] shadow-2xs font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8E8983] hover:text-[#292929]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area: Sidebar + Products Grid */}
      <div className="flex items-start gap-8">
        {/* Desktop Sidebar & Mobile Drawer */}
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          priceRange={priceRange}
          onSelectPriceRange={setPriceRange}
          minRating={minRating}
          onSelectRating={setMinRating}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          onResetFilters={handleResetFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description="We could not find any products matching your selected filters or search terms. Try clearing filters or searching for something else."
              actionText="Reset All Filters"
              actionLink="#"
            />
          ) : (
            /* 2-column on mobile (as in Figma Screen 2), 3 on tablet, 3 on desktop with sidebar */
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
