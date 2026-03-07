import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  
  // Simulate authentication check
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAuthenticated) {
    const userIsAdmin = confirm('This area is restricted to administrators. Click OK to continue as admin.');
    
    if (userIsAdmin) {
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    
    return false;
  }
  
  return true;
};