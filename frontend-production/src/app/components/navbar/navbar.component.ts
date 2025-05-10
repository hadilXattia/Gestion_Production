import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon style="margin-right: 16px;">precision_manufacturing</mat-icon>
      <span style="margin-right: 24px; font-weight: bold;">Production</span>

      <button mat-button routerLink="/produits">Produits</button>
      <button mat-button routerLink="/machines">Machines</button>
      <button mat-button routerLink="/techniciens">Techniciens</button>
      <button mat-button routerLink="/ordres">Ordres</button>
      <button mat-button routerLink="/maintenances">Maintenances</button>
    </mat-toolbar>
  `
})
export class NavbarComponent {}
