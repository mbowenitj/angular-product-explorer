import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ProductService } from '../../../core/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let productServiceMock: any;
  let favoritesSignal: any;

  beforeEach(async () => {
    localStorage.clear();
    favoritesSignal = signal([]);
    productServiceMock = {
      favorites: favoritesSignal.asReadonly()
    };

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();

  });

  function createComponent(isAdmin: boolean = false): void {
    localStorage.setItem('isAdmin', isAdmin.toString());
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();

  });

  describe('Admin State', () => {
    it('should be false when localStorage not set', () => {
      localStorage.removeItem('isAdmin');
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      expect(component.isAdmin).toBeFalse();
    });
    it('should be true when localStorage set to true', () => {
      localStorage.setItem('isAdmin', 'true');
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      expect(component.isAdmin).toBeTrue();

    });

  });

  describe('Navigation Links', () => {

    it('should show 3 links for non-admin', () => {

      createComponent(false);

      const links = fixture.debugElement.queryAll(
        By.css('.nav__list a[routerLink]')
      );
      expect(links.length).toBe(3);
      expect(links[0].attributes['routerLink']).toBe('/');
      expect(links[1].attributes['routerLink']).toBe('/catalog');
      expect(links[2].attributes['routerLink']).toBe('/favorites');

      const adminLink = fixture.debugElement.query(
        By.css('a[routerLink="/admin"]')
      );
      expect(adminLink).toBeNull();
    });

    it('should show 4 links for admin', () => {
      createComponent(true);
      const links = fixture.debugElement.queryAll(
        By.css('.nav__list a[routerLink]')
      );

      expect(links.length).toBe(4);
      expect(links[0].attributes['routerLink']).toBe('/');
      expect(links[1].attributes['routerLink']).toBe('/catalog');
      expect(links[2].attributes['routerLink']).toBe('/favorites');
      expect(links[3].attributes['routerLink']).toBe('/admin');
      const adminLink = fixture.debugElement.query(
        By.css('a[routerLink="/admin"]')
      );
      expect(adminLink).not.toBeNull();
    });
  });

  describe('Logo', () => {

    it('should display logo text', () => {
      createComponent();
      const logo = fixture.debugElement.query(
        By.css('.header__logo-text')
      );
      expect(logo.nativeElement.textContent).toContain('Product Explorer');
    });

  });

  describe('Favorites Badge', () => {
    it('should not show badge when count is 0', () => {
      createComponent();
      const badge = fixture.debugElement.query(
        By.css('.nav__badge')
      );
      expect(badge).toBeNull();
    });

    it('should show badge when count > 0', () => {
      favoritesSignal.set([1, 2]);
      createComponent();
      const badge = fixture.debugElement.query(
        By.css('.nav__badge')
      );
      expect(badge).not.toBeNull();
      expect(badge.nativeElement.textContent.trim()).toBe('2');

    });

  });

  describe('Toggle Button', () => {
    it('should exist', () => {
      createComponent();
      const toggle = fixture.debugElement.query(
        By.css('.mode-toggle')
      );
      expect(toggle).not.toBeNull();
    });

    it('should show correct text for non-admin', () => {
      createComponent(false);
      const toggleText = fixture.debugElement
        .query(By.css('.mode-toggle span'))
        .nativeElement.textContent
        .trim();

      expect(toggleText).toBe('Switch to Admin');

    });

    it('should show correct text for admin', () => {
      createComponent(true);
      const toggleText = fixture.debugElement
        .query(By.css('.mode-toggle span'))
        .nativeElement.textContent
        .trim();
      expect(toggleText).toBe('Switch to User');
    });

    it('should call toggleAdmin when clicked', () => {
      createComponent();
      spyOn(component, 'toggleAdmin');
      const toggle = fixture.debugElement.query(
        By.css('.mode-toggle')
      );
      toggle.nativeElement.click();
      expect(component.toggleAdmin).toHaveBeenCalled();
    });
  });

  describe('toggleAdmin method', () => {
    it('should update localStorage when enabling admin', () => {
      createComponent(false);
      spyOn(localStorage, 'setItem');
      component.toggleAdmin();
      expect(localStorage.setItem).toHaveBeenCalledWith('isAdmin', 'true');

    });

    it('should remove admin flag when disabling admin', () => {
      createComponent(true);
      spyOn(localStorage, 'removeItem');
      component.toggleAdmin();
      expect(localStorage.removeItem).toHaveBeenCalledWith('isAdmin');
    });
  });

  describe('Icons', () => {
    it('should have store icon', () => {
      createComponent();
      expect(component.faStore).toBeDefined();
    });

    it('should have user icon', () => {
      createComponent();
      expect(component.faUser).toBeDefined();
    });

    it('should have user shield icon', () => {
      createComponent();
      expect(component.faUserShield).toBeDefined();
    });
  });

});