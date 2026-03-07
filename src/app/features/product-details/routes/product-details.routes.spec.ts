import productDetailsRoutes from "./product-details.routes";

describe('Product Details Routes', () => {
  it('should have correct route configuration', () => {
    expect(productDetailsRoutes.length).toBe(1);
    expect(productDetailsRoutes[0].path).toBe('');
    expect(productDetailsRoutes[0].loadComponent).toBeDefined();
  });
});