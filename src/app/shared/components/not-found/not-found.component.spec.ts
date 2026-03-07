import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NotFoundComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.not-found__title')?.textContent).toContain('Page Not Found');
    expect(compiled.querySelector('.not-found__code')?.textContent).toContain('404');
  });

  it('should render error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.not-found__message')?.textContent)
      .toContain('Oops! The page you\'re looking for doesn\'t exist');
  });

  it('should have link to homepage', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a[routerLink="/"]');
    expect(homeLink).toBeTruthy();
    expect(homeLink?.textContent).toContain('Go to Homepage');
  });

  it('should call goBack when back button clicked', () => {
    const locationSpy = spyOn(location, 'back');
    const backButton = fixture.debugElement.query(By.css('.not-found__back'));
    backButton.nativeElement.click();
    expect(locationSpy).toHaveBeenCalled();
  });
});