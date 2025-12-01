// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): boolean {
    // Simulate API call - Replace with actual HTTP request
    if (email && password) {
      // const user: User = {
      //   id: '1',
      //   email: email,
      //   role: 'admin',
      // };

      // this.currentUserSignal.set(user);
      //localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSignal.set(JSON.parse(userJson));
    }
  }
}
