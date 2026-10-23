export type ProductCategory = 'headphones' | 'earbuds' | 'speakers' | 'smartwatches';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  highlights: string[];
  specs: Record<string, string>;
  warranty: string;
  recommendedIds?: string[];
  reviews?: ReviewItem[];
}

export interface ProductFilterOptions {
  category?: ProductCategory | 'all';
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';
}
