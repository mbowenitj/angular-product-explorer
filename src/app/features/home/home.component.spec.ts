import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductService } from '../../core/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal, computed } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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
      rating: 4.8,
      inStock: true,
      tags: ['tag2'],
      createdAt: new Date(),
      isFavorite: true
    }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['toggleFavorite']);

    // Mock signals
    const featuredProductsSignal = computed(() => mockProducts);
    const productsSignal = signal({ data: mockProducts, loading: false, error: null });

    Object.defineProperty(productServiceSpy, 'featuredProducts', {
      get: () => featuredProductsSignal
    });
    
    Object.defineProperty(productServiceSpy, 'products', {
      get: () => productsSignal.asReadonly()
    });

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero__title')?.textContent).toContain('Welcome to Product Explorer');
  });

  it('should render hero buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.hero__actions .button');
    expect(buttons.length).toBe(2);
    expect(buttons[0]?.textContent).toContain('Browse Catalog');
    expect(buttons[1]?.textContent).toContain('View Favorites');
  });

  it('should render features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    expect(featureCards.length).toBe(4);
  });

  it('should render featured products section', () => {
    const productCards = fixture.debugElement.queryAll(By.css('.featured-products .product-card'));
    expect(productCards.length).toBe(2);
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

  it('should have correct router links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroLinks = compiled.querySelectorAll('.hero__actions a');
    expect(heroLinks[0]?.getAttribute('href')).toBe('/catalog');
    expect(heroLinks[1]?.getAttribute('href')).toBe('/favorites');
  });

  it('should call window.scrollTo on init', () => {
    const scrollSpy = spyOn(window, 'scrollTo');
    component.ngOnInit();
    expect(scrollSpy).toHaveBeenCalledWith(0, 0);
  });
});