import favoritesRoutes from './favorites.routes';

describe('Favorites Routes', () => {
  it('should have correct route configuration', () => {
    expect(favoritesRoutes.length).toBe(1);
    expect(favoritesRoutes[0].path).toBe('');
    expect(favoritesRoutes[0].loadComponent).toBeDefined();
  });
});