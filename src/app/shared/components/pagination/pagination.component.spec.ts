import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 100;
    component.pageSize = 10;
    component.ngOnInit();
    expect(component.totalPages).toBe(10);
  });

  it('should generate visible pages correctly for small total', () => {
    component.totalItems = 30;
    component.pageSize = 10;
    component.currentPage = 2;
    component.maxVisiblePages = 5;
    component.ngOnInit();
    
    expect(component.visiblePages).toEqual([1, 2, 3]);
  });

  it('should generate visible pages correctly for large total', () => {
    component.totalItems = 100;
    component.pageSize = 10;
    component.currentPage = 5;
    component.maxVisiblePages = 5;
    component.ngOnInit();
    
    expect(component.visiblePages).toEqual([3, 4, 5, 6, 7]);
  });

  it('should emit pageChange when going to next page', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.ngOnInit();
    
    spyOn(component.pageChange, 'emit');
    component.goToNext();
    
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChange when going to previous page', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.currentPage = 3;
    component.ngOnInit();
    
    spyOn(component.pageChange, 'emit');
    component.goToPrevious();
    
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChange when going to first page', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.currentPage = 3;
    component.ngOnInit();
    
    spyOn(component.pageChange, 'emit');
    component.goToFirst();
    
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should emit pageChange when going to last page', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.ngOnInit();
    
    spyOn(component.pageChange, 'emit');
    component.goToLast();
    
    expect(component.pageChange.emit).toHaveBeenCalledWith(5);
  });

  it('should emit pageSizeChange when page size changes', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.ngOnInit();
    
    spyOn(component.pageSizeChange, 'emit');
    spyOn(component.pageChange, 'emit');
    
    component.onPageSizeChange(20);
    
    expect(component.pageSize).toBe(20);
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(20);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should calculate correct start and end items', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.currentPage = 3;
    component.ngOnInit();
    
    expect(component.startItem).toBe(21);
    expect(component.endItem).toBe(30);
  });

  it('should disable previous and first buttons on first page', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.currentPage = 1;
    component.ngOnInit();
    
    expect(component.isFirstPage()).toBeTrue();
    expect(component.isLastPage()).toBeFalse();
  });

  it('should disable next and last buttons on last page', () => {
    component.totalItems = 50;
    component.pageSize = 10;
    component.currentPage = 5;
    component.ngOnInit();
    
    expect(component.isFirstPage()).toBeFalse();
    expect(component.isLastPage()).toBeTrue();
  });
});