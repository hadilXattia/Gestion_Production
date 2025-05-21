import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      })
    );
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
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
    return localStorage.getItem('role') === 'ADMIN';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
