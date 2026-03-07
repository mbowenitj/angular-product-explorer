import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/routes/home.routes'),
    title: 'Home - Product Explorer'
  },
  {
    path: 'catalog',
    loadChildren: () => import('./features/catalog/routes/catalog.routes'),
    title: 'Product Catalog'
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./features/product-details/routes/product-details.routes'),
    title: 'Product Details'
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/routes/favorites.routes'),
    title: 'My Favorites'
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/routes/admin.routes'),
    canMatch: [authGuard],
    title: 'Admin Panel'
  },
  {
    path: '**',
    loadChildren: () => import('./shared/components/not-found/routes/not-found.routes')
  }
];