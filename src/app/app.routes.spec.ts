import { routes } from './app.routes';
import { authGuard } from './core/guards/auth.guard';

describe('App Routes', () => {
  it('should have correct number of routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should have home route with lazy loading', () => {
    const homeRoute = routes.find(r => r.path === '');
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.loadChildren).toBeDefined();
    expect(homeRoute?.title).toBe('Home - Product Explorer');
  });

  it('should have catalog route with lazy loading', () => {
    const catalogRoute = routes.find(r => r.path === 'catalog');
    expect(catalogRoute).toBeDefined();
    expect(catalogRoute?.loadChildren).toBeDefined();
    expect(catalogRoute?.title).toBe('Product Catalog');
  });

  it('should have product details route with lazy loading', () => {
    const productRoute = routes.find(r => r.path === 'product/:id');
    expect(productRoute).toBeDefined();
    expect(productRoute?.loadChildren).toBeDefined();
    expect(productRoute?.title).toBe('Product Details');
  });

  it('should have favorites route with lazy loading', () => {
    const favoritesRoute = routes.find(r => r.path === 'favorites');
    expect(favoritesRoute).toBeDefined();
    expect(favoritesRoute?.loadChildren).toBeDefined();
    expect(favoritesRoute?.title).toBe('My Favorites');
  });

  it('should have admin route with auth guard', () => {
    const adminRoute = routes.find(r => r.path === 'admin');
    expect(adminRoute).toBeDefined();
    expect(adminRoute?.loadChildren).toBeDefined();
    expect(adminRoute?.canMatch).toBeDefined();
    expect(adminRoute?.canMatch).toContain(authGuard);
    expect(adminRoute?.title).toBe('Admin Panel');
  });

  it('should have wildcard route for not found', () => {
    const notFoundRoute = routes.find(r => r.path === '**');
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute?.loadChildren).toBeDefined();
  });
});