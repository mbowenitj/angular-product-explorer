import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: any;
  let location: Location;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'Electronics',
    imageUrl: 'test.jpg',
    rating: 4.5,
    inStock: true,
    tags: ['tag1', 'tag2'],
    createdAt: new Date(),
    isFavorite: false
  };

  const createComponentWithState = (state: any) => {
    const selectedProductSignal = signal(state);
    
    const service = {
      selectedProduct: selectedProductSignal.asReadonly(),
      getProductById: jasmine.createSpy('getProductById'),
      toggleFavorite: jasmine.createSpy('toggleFavorite')
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        ProductDetailsComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: service },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  };

  it('should create', () => {
    createComponentWithState({ data: mockProduct, error: null, loading: false });
    expect(component).toBeTruthy();
  });

  it('should call getProductById on init', () => {
    createComponentWithState({ data: mockProduct, error: null, loading: false });
    expect(productService.getProductById).toHaveBeenCalledWith(1);
  });

  it('should display product details', () => {
    createComponentWithState({ data: mockProduct, error: null, loading: false });
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.product__title')?.textContent).toContain('Test Product');
    expect(compiled.querySelector('.product__price-value')?.textContent).toContain('R 100.00');
  });

  it('should show loading state', () => {
    createComponentWithState({ data: null, error: null, loading: true });
    const loadingEl = fixture.debugElement.query(By.css('.product-details__loading'));
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.nativeElement.textContent).toContain('Loading product details');
  });

  it('should show error state', () => {
    createComponentWithState({ data: null, error: 'Test error', loading: false });
    const errorEl = fixture.debugElement.query(By.css('.product-details__error'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Test error');
  });

  it('should call toggleFavorite when favorite button clicked', () => {
    createComponentWithState({ data: mockProduct, error: null, loading: false });
    const favoriteButton = fixture.debugElement.query(By.css('.product__favorite'));
    favoriteButton.nativeElement.click();
    expect(productService.toggleFavorite).toHaveBeenCalledWith(1);
  });

  it('should call location.back when back button clicked', () => {
    createComponentWithState({ data: mockProduct, error: null, loading: false });
    const locationSpy = spyOn(location, 'back');
    const backButton = fixture.debugElement.query(By.css('.back-button'));
    backButton.nativeElement.click();
    expect(locationSpy).toHaveBeenCalled();
  });
});