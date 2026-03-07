import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product, ProductFilters, ApiResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'favorites';
  
  // State signals
  private productsSignal = signal<ApiResponse<Product[]>>({
    data: [],
    error: null,
    loading: true
  });
  
  private filtersSignal = signal<ProductFilters>({
    searchTerm: '',
    category: null,
    sortBy: 'name-asc',
    inStockOnly: false
  });
  
  private selectedProductSignal = signal<ApiResponse<Product | null>>({
    data: null,
    error: null,
    loading: false
  });
  
  // Favorites with localStorage persistence
  private favoritesSignal = signal<number[]>(this.loadFavorites());
  
  // Computed signals for filtered products
  filteredProducts = computed(() => {
    const products = this.productsSignal().data;
    const filters = this.filtersSignal();
    const favorites = this.favoritesSignal();
    
    if (!products.length) return [];
    
    return products
      .filter(product => this.filterProduct(product, filters))
      .sort((a, b) => this.sortProducts(a, b, filters.sortBy))
      .map(product => ({
        ...product,
        isFavorite: favorites.includes(product.id)
      }));
  });
  
  readonly products = this.productsSignal.asReadonly();
  readonly filters = this.filtersSignal.asReadonly();
  readonly selectedProduct = this.selectedProductSignal.asReadonly();
  readonly favorites = this.favoritesSignal.asReadonly();
  
  // Available categories computed from products
  readonly availableCategories = computed(() => {
    const products = this.productsSignal().data;
    return [...new Set(products.map(p => p.category))].sort();
  });
  
  // Featured products for home page
  readonly featuredProducts = computed(() => {
    const products = this.productsSignal().data;
    return products
      .filter(p => p.rating >= 4.5)
      .slice(0, 4)
      .map(p => ({ ...p, isFavorite: this.favoritesSignal().includes(p.id) }));
  });
  
  constructor() {
    this.loadProducts();
  }
  
  private loadProducts(): void {
    this.http.get<Product[]>('/assets/data/products.json')
      .pipe(
        delay(800),
        map(data => data.map(product => ({
          ...product,
          createdAt: new Date(product.createdAt)
        }))),
        catchError(error => {
          console.error('Failed to load products', error);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.productsSignal.update(state => ({
            ...state,
            data,
            loading: false,
            error: data.length ? null : 'No products found'
          }));
        },
        error: (error) => {
          this.productsSignal.update(state => ({
            ...state,
            loading: false,
            error: 'Failed to load products. Please try again.'
          }));
        }
      });
  }
  
  getProductById(id: number): void {
    this.selectedProductSignal.set({ data: null, error: null, loading: true });
    
    setTimeout(() => {
      const product = this.productsSignal().data.find(p => p.id === id);
      
      if (product) {
        this.selectedProductSignal.set({
          data: { ...product, isFavorite: this.favoritesSignal().includes(id) },
          error: null,
          loading: false
        });
      } else {
        this.selectedProductSignal.set({
          data: null,
          error: 'Product not found',
          loading: false
        });
      }
    }, 500);
  }
  
  updateFilters(partialFilters: Partial<ProductFilters>): void {
    this.filtersSignal.update(current => ({
      ...current,
      ...partialFilters
    }));
  }
  
  resetFilters(): void {
    this.filtersSignal.set({
      searchTerm: '',
      category: null,
      sortBy: 'name-asc',
      inStockOnly: false
    });
  }
  
  toggleFavorite(productId: number): void {
    this.favoritesSignal.update(current => {
      const newFavorites = current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId];
      
      this.saveFavorites(newFavorites);
      return newFavorites;
    });
  }
  
  private filterProduct(product: Product, filters: ProductFilters): boolean {
    if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }
    
    return true;
  }
  
  private sortProducts(a: Product, b: Product, sortBy: string): number {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  }
  
  private loadFavorites(): number[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  
  private saveFavorites(favorites: number[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites', error);
    }
  }
}