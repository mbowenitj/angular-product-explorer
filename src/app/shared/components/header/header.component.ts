import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStore, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private productService = inject(ProductService);

  // Signal from service
  favorites = this.productService.favorites;

  // Icons
  faStore = faStore;
  faUser = faUser;
  faUserShield = faUserShield;

  isAdmin = false;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  toggleAdmin(): void {
    this.isAdmin = !this.isAdmin;

    if (this.isAdmin) {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.removeItem('isAdmin');
    }
  }

}