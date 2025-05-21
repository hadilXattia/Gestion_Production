import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Ton service d'authentification

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // méthode qui retourne l’utilisateur connecté (ex : { username, role })

    if (user && user.role === 'ADMIN') {
      return true;
    }

    // Si l'utilisateur n'est pas admin, rediriger ailleurs (ex : login ou page d’accueil)
    this.router.navigate(['/login']);
    return false;
  }
}
