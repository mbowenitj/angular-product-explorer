import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { ProductService } from '../../core/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let productService: any;

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
      createdAt: new Date()
    }
  ];

  beforeEach(async () => {
    // mock service with signals
    const productsSignal = signal({ data: mockProducts, loading: false, error: null });
    const favoritesSignal = signal([1]);

    productService = {
      products: productsSignal.asReadonly(),
      favorites: favoritesSignal.asReadonly(),
      toggleFavorite: jasmine.createSpy('toggleFavorite').and.callFake(() => {
        favoritesSignal.set([]);
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        FavoritesComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        PaginationComponent
      ],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    
    // Set pagination to 1 item per page for testing
    component.pageSize.set(1);
    component.currentPage.set(2);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should adjust current page when removing last item on page', fakeAsync(() => {
    // Verify initial state
    expect(component.currentPage()).toBe(2);
    expect(component.totalItems()).toBe(1);
    
    // Call removeFromFavorites
    component.removeFromFavorites(1);
    
    // Tick to allow setTimeout to execute
    tick();
    
    // Verify page was adjusted to 1
    expect(component.currentPage()).toBe(1);
  }));

  it('should call productService.toggleFavorite when removing', () => {
    component.removeFromFavorites(1);
    expect(productService.toggleFavorite).toHaveBeenCalledWith(1);
  });

  it('should change page when onPageChange called', () => {
    component.onPageChange(2);
    expect(component.currentPage()).toBe(2);
  });

  it('should reset to page 1 when page size changes', () => {
    component.currentPage.set(3);
    component.onPageSizeChange(12);
    expect(component.currentPage()).toBe(1);
    expect(component.pageSize()).toBe(12);
  });
});