import React from 'react';
import { ProductColor } from '../../types/product';
import { Check } from 'lucide-react';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#706B65] uppercase tracking-wider">
          Color Variant:
        </span>
        <span className="font-extrabold text-[#292929]">{selectedColor.name}</span>
      </div>

      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor.name === color.name;
          return (
            <button
              key={color.name}
              onClick={() => onSelectColor(color)}
              className={`group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                isSelected
                  ? 'border-[#A94F55] bg-[#F7EAEB] shadow-2xs ring-1 ring-[#A94F55]'
                  : 'border-[#E6E1D8] bg-white hover:border-[#D99A9E]'
              }`}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center border border-black/10 shrink-0"
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${
                      color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#f4f1ea'
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  />
                )}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isSelected ? 'text-[#A94F55]' : 'text-[#292929]'
                }`}
              >
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
