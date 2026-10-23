import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center rounded-2xl bg-white border border-[#E6E1D8] shadow-2xs ${
        isSm ? 'p-1' : 'p-1.5'
      }`}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`rounded-xl flex items-center justify-center text-[#292929] hover:bg-[#F3EFEA] disabled:opacity-30 disabled:hover:bg-transparent transition-colors ${
          isSm ? 'w-6 h-6' : 'w-8 h-8'
        }`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      <span
        className={`font-extrabold text-[#292929] text-center select-none ${
          isSm ? 'w-7 text-xs' : 'w-10 text-sm'
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`rounded-xl flex items-center justify-center text-[#292929] hover:bg-[#F3EFEA] disabled:opacity-30 disabled:hover:bg-transparent transition-colors ${
          isSm ? 'w-6 h-6' : 'w-8 h-8'
        }`}
        aria-label="Increase quantity"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
    </div>
  );
};
