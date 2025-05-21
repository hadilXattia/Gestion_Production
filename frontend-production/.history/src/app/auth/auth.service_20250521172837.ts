import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // 🔁 adapte l'URL si besoin

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

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
    const roles = decoded?.roles || decoded?.role || [];
    return Array.isArray(roles)
      ? roles.includes('ROLE_ADMIN')
      : roles === 'ROLE_ADMIN';
  }

  isTechnicien(): boolean {
    const decoded = this.getDecodedToken();
    const roles = decoded?.roles || decoded?.role || [];
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
