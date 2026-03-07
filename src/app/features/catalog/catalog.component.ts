import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHeart as faHeartRegular 
} from '@fortawesome/free-regular-svg-icons';
import { 
  faHeart as faHeartSolid, 
  faStar, 
  faSearch, 
  faTag, 
  faSort, 
  faBox, 
  faChevronDown, 
  faTimesCircle, 
  faSpinner, 
  faExclamationCircle, 
  faRedoAlt, 
  faBoxOpen, 
  faFilter,
  faList,
  faEye,
  faTrashAlt,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, PaginationComponent, FontAwesomeModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  private productService = inject(ProductService);
  
  // icons for template
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faStar = faStar;
  faSearch = faSearch;
  faTag = faTag;
  faSort = faSort;
  faBox = faBox;
  faChevronDown = faChevronDown;
  faTimesCircle = faTimesCircle;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;
  faRedoAlt = faRedoAlt;
  faBoxOpen = faBoxOpen;
  faFilter = faFilter;
  faList = faList;
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  
  // Pagination state
  currentPage = signal(1);
  pageSize = signal(8);
  
  // Expose signals
  allFilteredProducts = this.productService.filteredProducts;
  availableCategories = this.productService.availableCategories;
  
  // Paginated products
  paginatedProducts = computed(() => {
    const products = this.allFilteredProducts();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return products.slice(start, end);
  });
  
  totalItems = computed(() => this.allFilteredProducts().length);
  
  // Local signals for form bindings
  searchTerm = computed(() => this.productService.filters().searchTerm);
  selectedCategory = computed(() => this.productService.filters().category);
  sortBy = computed(() => this.productService.filters().sortBy);
  inStockOnly = computed(() => this.productService.filters().inStockOnly);
  
  loading = computed(() => this.productService.products().loading);
  error = computed(() => this.productService.products().error);
  
  onSearchChange(term: string): void {
    this.productService.updateFilters({ searchTerm: term });
    this.currentPage.set(1);
  }
  
  onCategoryChange(category: string): void {
    this.productService.updateFilters({ category: category || null });
    this.currentPage.set(1);
  }
  
  onSortChange(sortBy: string): void {
    this.productService.updateFilters({ sortBy: sortBy as any });
    this.currentPage.set(1);
  }
  
  onInStockChange(inStockOnly: boolean): void {
    this.productService.updateFilters({ inStockOnly });
    this.currentPage.set(1);
  }
  
  toggleFavorite(productId: number): void {
    this.productService.toggleFavorite(productId);
  }
  
  resetFilters(): void {
    this.productService.resetFilters();
    this.currentPage.set(1);
  }
  
  retry(): void {
    window.location.reload();
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