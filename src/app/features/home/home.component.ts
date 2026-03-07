import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHeart as faHeartRegular 
} from '@fortawesome/free-regular-svg-icons';
import { 
  faHeart as faHeartSolid,
  faStar,
  faSearch,
  faTag,
  faMobileAlt,
  faBolt,
  faSpinner,
  faExclamationCircle,
  faArrowRight,
  faTimesCircle, 
  faBox,
  faFilter,
  faRedoAlt,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  
  // Icons
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faStar = faStar;
  faSearch = faSearch;
  faTag = faTag;
  faMobileAlt = faMobileAlt;
  faBolt = faBolt;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;
  faArrowRight = faArrowRight;
  faTimesCircle = faTimesCircle; 
  faBox = faBox;
  faFilter = faFilter;
  faRedoAlt = faRedoAlt;
  faBoxOpen = faBoxOpen;
  
  featuredProducts = this.productService.featuredProducts;
  loading = this.productService.products;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  
  toggleFavorite(productId: number): void {
    this.productService.toggleFavorite(productId);
  }
}