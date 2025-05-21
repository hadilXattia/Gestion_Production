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
        // Extraire le rôle depuis le token JWT (payload)
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
      // payload.roles ou payload.authorities suivant ta config JWT
      // Ici backend stocke les rôles dans "roles"
      if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
        return payload.roles[0]; // on prend le premier rôle, adapter si plusieurs
      }
      // Ou "authorities"
      if (payload.authorities && Array.isArray(payload.authorities) && payload.authorities.length > 0) {
        return payload.authorities[0];
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
