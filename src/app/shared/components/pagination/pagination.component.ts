import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faAngleDoubleLeft, 
  faAngleDoubleRight, 
  faChevronLeft, 
  faChevronRight,
  faList,
  faEye
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 8;
  @Input() currentPage: number = 1;
  @Input() maxVisiblePages: number = 5;
  @Input() showFirstLast: boolean = true;
  @Input() showPrevNext: boolean = true;
  @Input() showPageNumbers: boolean = true;
  @Input() showItemsPerPage: boolean = true;
  @Input() itemsPerPageOptions: number[] = [4, 8, 12, 24];
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  
  // Icons
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faList = faList;
  faEye = faEye;
  
  totalPages: number = 1;
  visiblePages: number[] = [];
  startItem: number = 0;
  endItem: number = 0;
  
  ngOnInit() {
    this.calculatePages();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['pageSize'] || changes['currentPage']) {
      this.calculatePages();
    }
  }
  
  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    
    // Ensure current page is within bounds
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    
    // Calculate visible page numbers
    this.visiblePages = [];
    
    if (this.totalPages <= this.maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        this.visiblePages.push(i);
      }
    } else {
      // Show window of pages
      const halfVisible = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(this.currentPage - halfVisible, 1);
      let end = Math.min(start + this.maxVisiblePages - 1, this.totalPages);
      
      // Adjust if we're near the end
      if (end - start + 1 < this.maxVisiblePages) {
        start = Math.max(this.totalPages - this.maxVisiblePages + 1, 1);
        end = this.totalPages;
      }
      
      for (let i = start; i <= end; i++) {
        this.visiblePages.push(i);
      }
    }
    
    // Calculate displayed items range
    this.startItem = this.totalItems > 0 ? (this.currentPage - 1) * this.pageSize + 1 : 0;
    this.endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      this.calculatePages();
    }
  }
  
  goToFirst() {
    this.goToPage(1);
  }
  
  goToLast() {
    this.goToPage(this.totalPages);
  }
  
  goToPrevious() {
    this.goToPage(this.currentPage - 1);
  }
  
  goToNext() {
    this.goToPage(this.currentPage + 1);
  }
  
  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(this.currentPage);
    this.calculatePages();
  }
  
  isFirstPage(): boolean {
    return this.currentPage === 1;
  }
  
  isLastPage(): boolean {
    return this.currentPage === this.totalPages || this.totalPages === 0;
  }
}