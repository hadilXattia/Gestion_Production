import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon style="margin-right: 16px;">precision_manufacturing</mat-icon>
      <span style="margin-right: 24px; font-weight: bold;">Production</span>

      <ng-container *ngIf="authService.isAuthenticated()">
        <button mat-button routerLink="/produits">Produits</button>
        <button mat-button routerLink="/machines">Machines</button>
        <button mat-button routerLink="/techniciens">Techniciens</button>
        <button mat-button routerLink="/ordres">Ordres</button>
        <button mat-button routerLink="/maintenances">Maintenances</button>
        <button mat-button routerLink="/register" *ngIf="authService.isAdmin()">Créer un compte</button>
        <button mat-button (click)="logout()">Déconnexion</button>
      </ng-container>

      <ng-container *ngIf="!authService.isAuthenticated()">
        <button mat-button routerLink="/login">Se connecter</button>
      </ng-container>
    </mat-toolbar>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
