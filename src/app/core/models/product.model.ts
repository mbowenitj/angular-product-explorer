export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  isFavorite?: boolean;
}

export interface ProductFilters {
  searchTerm: string;
  category: string | null;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';
  inStockOnly: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}