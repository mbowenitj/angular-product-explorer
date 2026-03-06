import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  
  featuredProducts = this.productService.featuredProducts;
  loading = this.productService.products;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  
  toggleFavorite(productId: number): void {
    this.productService.toggleFavorite(productId);
  }
}