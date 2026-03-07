import catalogRoutes from "./catalog.routes";

describe('Catalog Routes', () => {
  it('should have correct route configuration', () => {
    expect(catalogRoutes.length).toBe(1);
    expect(catalogRoutes[0].path).toBe('');
    expect(catalogRoutes[0].loadComponent).toBeDefined();
  });
});