import { jwt_decode  } from 'jwt-decode';
// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (e) {
        console.error('Invalid token', e);
        return null;
      }
    }
    return null;
  }

  isAdmin(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;

    const roles = decoded.roles || decoded.role || [];
    return Array.isArray(roles)
      ? roles.includes('ROLE_ADMIN')
      : roles === 'ROLE_ADMIN';
  }

  isTechnicien(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;

    const roles = decoded.roles || decoded.role || [];
    return Array.isArray(roles)
      ? roles.includes('ROLE_TECHNICIEN')
      : roles === 'ROLE_TECHNICIEN';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any {
    return this.getDecodedToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
