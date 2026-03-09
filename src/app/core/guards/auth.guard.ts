import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
  
  console.log('Auth guard check - isAdmin:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to home');
    router.navigate(['/']);
    return false;
  }
  
  console.log('Authenticated, allowing access');
  return true;
};