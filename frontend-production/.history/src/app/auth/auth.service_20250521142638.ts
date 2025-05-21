import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        const role = this.getRoleFromToken(res.token);
        if (role) {
          localStorage.setItem('role', role);
        }
      })
    );
  }

  registerAdmin(user: any) {
    return this.http.post(`${this.apiUrl}/register-admin`, user);
  }

  registerTechnicien(user: any) {
    return this.http.post(`${this.apiUrl}/register-technicien`, user);
  }

  // Appel générique, redirige selon rôle
  register(user: any) {
    if (user.role === 'ADMIN') {
      return this.registerAdmin(user);
    } else if (user.role === 'TECHNICIEN') {
      return this.registerTechnicien(user);
    } else {
      throw new Error('Role non supporté');
    }
  }

  logout() {
    localStorage.clear();
  }

  getCurrentUser() {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (token && role) {
      return { role, token };
    }
    return null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

private getRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    let role = null;

    if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
      role = payload.roles[0];
    } else if (payload.authorities && Array.isArray(payload.authorities) && payload.authorities.length > 0) {
      role = payload.authorities[0];
    }

    // Normalize role to always have "ROLE_" prefix
    if (role && !role.startsWith('ROLE_')) {
      role = `ROLE_${role}`;
    }

    return role;
  } catch (e) {
    console.error('Error decoding token', e);
    return null;
  }
}

}
