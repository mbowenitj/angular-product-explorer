import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ProductService } from '../../core/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { signal, computed } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      description: 'Description 1',
      price: 100,
      category: 'Electronics',
      imageUrl: 'test1.jpg',
      rating: 4.5,
      inStock: true,
      tags: ['tag1'],
      createdAt: new Date(),
      isFavorite: false
    },
    {
      id: 2,
      name: 'Test Product 2',
      description: 'Description 2',
      price: 200,
      category: 'Books',
      imageUrl: 'test2.jpg',
      rating: 3.5,
      inStock: false,
      tags: ['tag2'],
      createdAt: new Date(),
      isFavorite: true
    }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', 
      ['updateFilters', 'resetFilters', 'toggleFavorite']
    );

    // Mock signals
    const filteredProductsSignal = computed(() => mockProducts);
    const availableCategoriesSignal = computed(() => ['Electronics', 'Books']);
    const productsSignal = signal({ data: mockProducts, loading: false, error: null });
    const filtersSignal = signal({ 
      searchTerm: '', 
      category: null, 
      sortBy: 'name-asc' as const, 
      inStockOnly: false 
    });

    Object.defineProperty(productServiceSpy, 'filteredProducts', {
      get: () => filteredProductsSignal
    });
    
    Object.defineProperty(productServiceSpy, 'availableCategories', {
      get: () => availableCategoriesSignal
    });
    
    Object.defineProperty(productServiceSpy, 'products', {
      get: () => productsSignal.asReadonly()
    });
    
    Object.defineProperty(productServiceSpy, 'filters', {
      get: () => filtersSignal.asReadonly()
    });

    await TestBed.configureTestingModule({
      imports: [
        CatalogComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        FontAwesomeModule,
        PaginationComponent
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render catalog title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.catalog__title')?.textContent).toContain('Product Catalog');
  });

  it('should render search input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector('#search');
    expect(searchInput).toBeTruthy();
    expect(searchInput?.getAttribute('placeholder')).toBe('Search products...');
  });

  it('should render category filter with All Categories option', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('#category option');
    expect(options[0]?.textContent).toContain('All Categories');
  });

  it('should call onSearchChange when search input changes', () => {
    const spy = spyOn(component, 'onSearchChange');
    const searchInput = fixture.debugElement.query(By.css('#search')).nativeElement;
    
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should call productService.updateFilters when search changes', () => {
    component.onSearchChange('test');
    expect(productService.updateFilters).toHaveBeenCalledWith({ searchTerm: 'test' });
  });

  it('should call toggleFavorite when favorite button clicked', () => {
    const spy = spyOn(component, 'toggleFavorite');
    const favoriteButton = fixture.debugElement.queryAll(By.css('.product-card__favorite'))[0];
    favoriteButton.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call productService.toggleFavorite when toggling favorite', () => {
    component.toggleFavorite(1);
    expect(productService.toggleFavorite).toHaveBeenCalledWith(1);
  });

  it('should reset to page 1 when page size changes', () => {
    component['currentPage'].set(3);
    component.onPageSizeChange(12);
    expect(component.currentPage()).toBe(1);
    expect(component.pageSize()).toBe(12);
  });
});