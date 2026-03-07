import { Routes } from '@angular/router';

const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../home.component').then(m => m.HomeComponent)
  }
];

export default homeRoutes;