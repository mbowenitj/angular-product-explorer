import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, CommonModule, PaginationComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  private productService = inject(ProductService);
  
  // Pagination state
  currentPage = signal(1);
  pageSize = signal(8);
  
  // All favorite products
  allFavoriteProducts = computed(() => {
    const allProducts = this.productService.products().data;
    const favorites = this.productService.favorites();
    return allProducts
      .filter(p => favorites.includes(p.id))
      .map(p => ({ ...p, isFavorite: true }));
  });
  
  // Paginated favorites
  paginatedFavorites = computed(() => {
    const favorites = this.allFavoriteProducts();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return favorites.slice(start, end);
  });
  
  // Total items for pagination
  totalItems = computed(() => this.allFavoriteProducts().length);
  
  loading = computed(() => this.productService.products().loading);
  
  removeFromFavorites(productId: number): void {
    this.productService.toggleFavorite(productId);
    
    // Use setTimeout to allow the signal to update
    setTimeout(() => {
      const newTotal = this.totalItems();
      const maxPage = Math.ceil(newTotal / this.pageSize());
      
      // If current page is greater than max page and there are still items, adjust
      if (this.currentPage() > maxPage && maxPage > 0) {
        this.currentPage.set(maxPage);
      } 
      // If no items left, reset to page 1
      else if (newTotal === 0) {
        this.currentPage.set(1);
      }
    });
  }
  
  // Pagination handlers
  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}