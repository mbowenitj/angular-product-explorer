import { Routes } from '@angular/router';

const productDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../product-details.component').then(m => m.ProductDetailsComponent)
  }
];

export default productDetailsRoutes;