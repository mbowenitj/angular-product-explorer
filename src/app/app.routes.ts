import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes'),
    title: 'Home - Product Explorer'
  },
  {
    path: 'catalog',
    loadChildren: () => import('./features/catalog/catalog.routes'),
    title: 'Product Catalog'
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./features/product-details/product-details.routes'),
    title: 'Product Details'
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.routes'),
    title: 'My Favorites'
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
    canMatch: [authGuard],
    title: 'Admin Panel'
  },
  {
    path: '**',
    loadChildren: () => import('./shared/components/not-found/not-found.routes')
  }
];