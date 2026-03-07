import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<{ username: string; role: string } | null>(
    this.getUserFromStorage()
  );

  private getUserFromStorage() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      return { username: 'Admin', role: 'admin' };
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  setAdminStatus(isAdmin: boolean): void {
    if (isAdmin) {
      this.currentUser.set({ username: 'Admin', role: 'admin' });
      localStorage.setItem('isAdmin', 'true');
    } else {
      this.currentUser.set(null);
      localStorage.removeItem('isAdmin');
    }
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('isAdmin');
  }
}