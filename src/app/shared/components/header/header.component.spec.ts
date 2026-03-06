import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ProductService } from '../../../core/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let productService: any;

  beforeEach(async () => {
    const favoritesSignal = signal([]);

    productService = {
      favorites: favoritesSignal.asReadonly()
    };

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.header__logo-text');
    expect(logo?.textContent).toContain('Product Explorer');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav__link');
    expect(navLinks.length).toBe(4);
    expect(navLinks[0]?.textContent).toContain('Home');
    expect(navLinks[1]?.textContent).toContain('Catalog');
    expect(navLinks[2]?.textContent).toContain('Favorites');
    expect(navLinks[3]?.textContent).toContain('Admin');
  });

  it('should not show badge when favorites count is 0', () => {
    const badge = fixture.debugElement.query(By.css('.nav__badge'));
    expect(badge).toBeNull();
  });

  it('should show badge when favorites count > 0', () => {
    // Create new service with non-empty favorites
    const newFavoritesSignal = signal([1, 2]);
    const newService = {
      favorites: newFavoritesSignal.asReadonly()
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: ProductService, useValue: newService }]
    });

    const newFixture = TestBed.createComponent(HeaderComponent);
    newFixture.detectChanges();
    
    const badge = newFixture.debugElement.query(By.css('.nav__badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('2');
  });

  it('should have correct router links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a[routerLink="/"]');
    const catalogLink = compiled.querySelector('a[routerLink="/catalog"]');
    const favoritesLink = compiled.querySelector('a[routerLink="/favorites"]');
    const adminLink = compiled.querySelector('a[routerLink="/admin"]');
    
    expect(homeLink).toBeTruthy();
    expect(catalogLink).toBeTruthy();
    expect(favoritesLink).toBeTruthy();
    expect(adminLink).toBeTruthy();
  });
});