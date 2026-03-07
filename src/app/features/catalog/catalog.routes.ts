import { Routes } from '@angular/router';

const catalogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./catalog.component').then(m => m.CatalogComponent)
  }
];

export default catalogRoutes;