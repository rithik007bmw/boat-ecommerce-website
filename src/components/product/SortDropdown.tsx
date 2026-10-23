import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sortVal: any) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-[#E6E1D8] text-xs font-semibold text-[#292929] shadow-2xs">
      <ArrowUpDown className="w-3.5 h-3.5 text-[#706B65]" />
      <span className="text-[#706B65] hidden sm:inline">Sort:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-transparent border-none outline-none font-bold text-[#292929] cursor-pointer"
      >
        <option value="featured">Featured / Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Customer Rating</option>
        <option value="newest">New Arrivals</option>
      </select>
    </div>
  );
};
