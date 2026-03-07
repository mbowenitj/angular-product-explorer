import adminRoutes from "./admin.routes";

describe('Admin Routes', () => {
  it('should have correct route configuration', () => {
    expect(adminRoutes.length).toBe(1);
    expect(adminRoutes[0].path).toBe('');
    expect(adminRoutes[0].loadComponent).toBeDefined();
  });
});