import React from 'react';
import { ReviewItem } from '../../types/product';
import { RatingStars } from '../common/RatingStars';
import { CheckCircle2, ThumbsUp } from 'lucide-react';

interface ReviewsSectionProps {
  rating: number;
  reviewsCount: number;
  reviews?: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewsCount,
  reviews = [],
}) => {
  return (
    <div className="space-y-6 pt-6 border-t border-[#E6E1D8]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#292929]">
            Customer Reviews & Ratings
          </h3>
          <p className="text-xs text-[#706B65] mt-0.5">
            Verified ratings from boAt listeners across India
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#F7F5EF] p-3 rounded-2xl border border-[#E6E1D8]">
          <span className="text-3xl font-black text-[#292929]">{rating.toFixed(1)}</span>
          <div>
            <RatingStars rating={rating} count={reviewsCount} size="sm" showCount={false} />
            <p className="text-[11px] text-[#706B65] mt-0.5">{reviewsCount.toLocaleString()} Verified ratings</p>
          </div>
        </div>
      </div>

      {/* Review breakdown bars */}
      <div className="bg-[#F7F5EF] p-4 sm:p-6 rounded-3xl border border-[#E6E1D8] grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {[
            { stars: '5★', pct: 78 },
            { stars: '4★', pct: 16 },
            { stars: '3★', pct: 4 },
            { stars: '2★', pct: 1 },
            { stars: '1★', pct: 1 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs">
              <span className="w-6 font-bold text-[#292929]">{bar.stars}</span>
              <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-[#E6E1D8]">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-8 text-right font-medium text-[#706B65]">{bar.pct}%</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#E6E1D8] md:pl-6 pt-3 md:pt-0 space-y-2">
          <p className="text-xs font-bold text-[#292929]">Verified Customer Satisfaction</p>
          <p className="text-xs text-[#706B65] leading-relaxed">
            94% of customers recommend this boAt audio product for sound clarity, battery longevity, and comfortable ear cushion ergonomics.
          </p>
        </div>
      </div>

      {/* Testimonials list */}
      {reviews.length > 0 && (
        <div className="space-y-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6E1D8] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RatingStars rating={rev.rating} size="sm" showCount={false} />
                  <span className="text-xs font-bold text-[#292929]">{rev.title}</span>
                </div>
                <span className="text-[11px] text-[#8E8983]">{rev.date}</span>
              </div>

              <p className="text-xs text-[#706B65] leading-relaxed">{rev.comment}</p>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#8E8983]">
                <div className="flex items-center gap-1.5 font-semibold text-[#292929]">
                  <span>{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Buyer
                    </span>
                  )}
                </div>

                <button className="flex items-center gap-1 hover:text-[#292929]">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
