import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Radio, Watch, Disc } from 'lucide-react';
import { ProductCategory } from '../../types/product';

interface CategoryItem {
  id: ProductCategory;
  label: string;
  icon: React.ElementType;
  count: string;
  image: string;
}

export const CategoryList: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: 'headphones',
      label: 'Headphones',
      icon: Headphones,
      count: '6 Products',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'earbuds',
      label: 'Earbuds',
      icon: Disc,
      count: '4 Products',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'speakers',
      label: 'Speakers',
      icon: Radio,
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'smartwatches',
      label: 'Smartwatches',
      icon: Watch,
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#292929] tracking-tight">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-[#706B65] mt-0.5">
            Explore authentic boAt audio & wearable collections
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-[#A94F55] hover:underline"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="group relative flex flex-col items-center text-center p-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E6E1D8] hover:border-[#D99A9E] transition-all duration-300 hover:shadow-md overflow-hidden"
          >
            {/* Category image thumbnail in soft circular frame */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4F1EA] p-2 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-[#292929] group-hover:text-[#A94F55] transition-colors">
              {cat.label}
            </h3>
            <span className="text-[11px] text-[#8E8983] mt-0.5">
              {cat.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
