import notFoundRoutes from "./not-found.routes";

describe('Not Found Routes', () => {
  it('should have correct route configuration', () => {
    expect(notFoundRoutes.length).toBe(1);
    expect(notFoundRoutes[0].path).toBe('');
    expect(notFoundRoutes[0].loadComponent).toBeDefined();
  });
});