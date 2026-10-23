import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 items-center">
      {/* Thumbnail list */}
      <div className="flex sm:flex-col gap-3 overflow-x-auto py-1 sm:py-0 w-full sm:w-20 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border p-1.5 transition-all flex items-center justify-center shrink-0 ${
              selectedImageIndex === idx
                ? 'border-[#A94F55] ring-2 ring-[#A94F55]/20 shadow-xs'
                : 'border-[#E6E1D8] opacity-70 hover:opacity-100 hover:border-[#D99A9E]'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>

      {/* Main big image container */}
      <div className="relative aspect-square w-full rounded-3xl bg-white border border-[#E6E1D8] p-6 sm:p-10 flex items-center justify-center shadow-xs overflow-hidden group">
        <img
          src={images[selectedImageIndex] || images[0]}
          alt={productName}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
};
