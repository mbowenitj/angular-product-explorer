import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHeart as faHeartRegular 
} from '@fortawesome/free-regular-svg-icons';
import { 
  faHeart as faHeartSolid,
  faArrowLeft,
  faSpinner,
  faExclamationCircle,
  faTag,
  faStar,
  faFolder,
  faCheckCircle,
  faTimesCircle,
  faAlignLeft,
  faTags,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private location = inject(Location);
  
  // Icons
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faArrowLeft = faArrowLeft;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;
  faTag = faTag;
  faStar = faStar;
  faFolder = faFolder;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faAlignLeft = faAlignLeft;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;
  
  product = this.productService.selectedProduct;
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id);
    }
  }
  
  toggleFavorite(productId: number): void {
    this.productService.toggleFavorite(productId);
  }
  
  goBack(): void {
    this.location.back();
  }
}