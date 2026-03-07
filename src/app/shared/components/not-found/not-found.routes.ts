import { Routes } from '@angular/router';

const notFoundRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./not-found.component').then(m => m.NotFoundComponent)
  }
];

export default notFoundRoutes;