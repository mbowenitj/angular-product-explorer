import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();
    
    await TestBed.configureTestingModule({
      imports: [AdminComponent, RouterTestingModule, FontAwesomeModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render admin panel title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.admin__title')?.textContent).toContain('Admin Panel');
  });

  it('should render stats cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Count only the stat-card elements, not the icons
    const statCards = compiled.querySelectorAll('.stat-card');
    expect(statCards.length).toBe(4);
    
    const titles = ['Total Products', 'Total Users', 'Orders', 'Revenue'];
    statCards.forEach((card, index) => {
      const titleElement = card.querySelector('.stat-card__title');
      expect(titleElement?.textContent?.trim()).toBe(titles[index]);
    });
  });

  it('should render stat values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const statValues = compiled.querySelectorAll('.stat-card__value');
    expect(statValues.length).toBe(4);
    expect(statValues[0]?.textContent?.trim()).toBe('150');
    expect(statValues[1]?.textContent?.trim()).toBe('1,234');
    expect(statValues[2]?.textContent?.trim()).toBe('89');
    expect(statValues[3]?.textContent?.trim()).toBe('R12,345');
  });

  it('should render quick actions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Count only the action-card elements, not the icons
    const actionCards = compiled.querySelectorAll('.action-card');
    expect(actionCards.length).toBe(4);
    
    const actions = ['Add Product', 'Manage Orders', 'Manage Users', 'View Reports'];
    actionCards.forEach((card, index) => {
      const labelElement = card.querySelector('.action-card__label');
      expect(labelElement?.textContent?.trim()).toBe(actions[index]);
    });
  });

  it('should render action card icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const actionIcons = compiled.querySelectorAll('.action-card fa-icon');
    expect(actionIcons.length).toBe(4);
  });

  it('should render recent activity', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Count only the activity-item elements, not the icons
    const activityItems = compiled.querySelectorAll('.activity-item');
    expect(activityItems.length).toBe(3);
  });

  it('should render activity item details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const activityItems = compiled.querySelectorAll('.activity-item');
    
    const times = ['2 min ago', '15 min ago', '1 hour ago'];
    const descriptions = [
      'New order #1234 received',
      'Product "Smart Watch" updated',
      'New user registered'
    ];
    
    activityItems.forEach((item, index) => {
      const timeElement = item.querySelector('.activity-item__time');
      const descElement = item.querySelector('.activity-item__description');
      
      expect(timeElement?.textContent?.trim()).toBe(times[index]);
      expect(descElement?.textContent?.trim()).toBe(descriptions[index]);
    });
  });

  it('should have logout button with correct text and icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('.button--secondary');
    expect(logoutButton).toBeTruthy();
    expect(logoutButton?.textContent).toContain('Logout');
    
    // Check for icon inside logout button
    const logoutIcon = logoutButton?.querySelector('fa-icon');
    expect(logoutIcon).toBeTruthy();
  });

  describe('logout', () => {
    it('should remove isAdmin from localStorage and navigate to home', () => {
      const routerSpy = spyOn(router, 'navigate');
      
      // Set admin in localStorage
      localStorage.setItem('isAdmin', 'true');
      
      component.logout();
      
      expect(localStorage.getItem('isAdmin')).toBeNull();
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    });

    it('should handle logout when no admin in localStorage', () => {
      const routerSpy = spyOn(router, 'navigate');
      
      component.logout();
      
      expect(localStorage.getItem('isAdmin')).toBeNull();
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    });
  });

  it('should call logout when button clicked', () => {
    const logoutSpy = spyOn(component, 'logout');
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('.button--secondary') as HTMLButtonElement;
    
    logoutButton.click();
    
    expect(logoutSpy).toHaveBeenCalled();
  });
});