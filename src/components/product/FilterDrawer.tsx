import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { ProductCategory } from '../../types/product';

interface FilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  priceRange: string;
  onSelectPriceRange: (range: string) => void;
  minRating: number;
  onSelectRating: (rating: number) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  onResetFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterProps> = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onSelectPriceRange,
  minRating,
  onSelectRating,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  isOpen = false,
  onClose,
}) => {
  const categories: { label: string; value: string }[] = [
    { label: 'All Audio & Wearables', value: 'all' },
    { label: 'Headphones', value: 'headphones' },
    { label: 'Earbuds (TWS)', value: 'earbuds' },
    { label: 'Bluetooth Speakers', value: 'speakers' },
    { label: 'Smartwatches', value: 'smartwatches' },
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹1,500', value: 'under-1500' },
    { label: '₹1,500 to ₹3,000', value: '1500-3000' },
    { label: 'Above ₹3,000', value: 'above-3000' },
  ];

  const ratingOptions = [
    { label: 'Any Rating', value: 0 },
    { label: '4.5★ & above', value: 4.5 },
    { label: '4.0★ & above', value: 4.0 },
  ];

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
        <h3 className="font-extrabold text-base text-[#292929]">Filters</h3>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-[#A94F55] hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#706B65] mb-3">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => onSelectCategory(c.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.value
                  ? 'bg-[#A94F55] text-white shadow-xs'
                  : 'text-[#292929] hover:bg-[#F3EFEA]'
              }`}
            >
              <span>{c.label}</span>
              {selectedCategory === c.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#706B65] mb-3">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map((p) => (
            <button
              key={p.value}
              onClick={() => onSelectPriceRange(p.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                priceRange === p.value
                  ? 'bg-[#A94F55] text-white shadow-xs'
                  : 'text-[#292929] hover:bg-[#F3EFEA]'
              }`}
            >
              <span>{p.label}</span>
              {priceRange === p.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#706B65] mb-3">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {ratingOptions.map((r) => (
            <button
              key={r.value}
              onClick={() => onSelectRating(r.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                minRating === r.value
                  ? 'bg-[#A94F55] text-white shadow-xs'
                  : 'text-[#292929] hover:bg-[#F3EFEA]'
              }`}
            >
              <span>{r.label}</span>
              {minRating === r.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-2 border-t border-[#E6E1D8]">
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs font-bold text-[#292929]">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 accent-[#A94F55] rounded"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-5 rounded-3xl border border-[#E6E1D8] shadow-xs self-start sticky top-24">
        {content}
      </aside>

      {/* Mobile Slide-Over Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6E1D8]">
              <h3 className="font-bold text-lg text-[#292929]">Filter Products</h3>
              <button
                onClick={onClose}
                className="p-1.5 text-[#706B65] hover:text-[#292929] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="mt-8 pt-4 border-t border-[#E6E1D8]">
              <button
                onClick={onClose}
                className="w-full bg-[#A94F55] text-white font-bold py-3 rounded-full hover:bg-[#8E3E43]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
