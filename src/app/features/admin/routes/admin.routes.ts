import { Routes } from '@angular/router';

const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../admin.component').then(m => m.AdminComponent)
  }
];

export default adminRoutes;