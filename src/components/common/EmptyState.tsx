import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = ShoppingBag,
  title,
  description,
  actionText = 'Start Shopping',
  actionLink = '/products',
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-3xl border border-[#E6E1D8] shadow-2xs max-w-lg mx-auto">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F7EAEB] text-[#A94F55] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-[#292929] mb-1">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#706B65] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 bg-[#A94F55] hover:bg-[#8E3E43] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md active:scale-95"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};
