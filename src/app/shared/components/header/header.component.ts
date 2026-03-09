import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  private router = inject(Router);

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
      this.router.navigate(['/admin']);

    } else {

      localStorage.removeItem('isAdmin');

      // redirect away from admin page
      this.router.navigate(['/']);

    }

  }

}