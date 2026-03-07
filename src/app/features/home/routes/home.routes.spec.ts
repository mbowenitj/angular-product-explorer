import homeRoutes from './home.routes';

describe('Home Routes', () => {
  it('should have correct route configuration', () => {
    expect(homeRoutes.length).toBe(1);
    expect(homeRoutes[0].path).toBe('');
    expect(homeRoutes[0].loadComponent).toBeDefined();
  });
});