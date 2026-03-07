import { Routes } from '@angular/router';

const favoritesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../favorites.component').then(m => m.FavoritesComponent)
  }
];

export default favoritesRoutes;