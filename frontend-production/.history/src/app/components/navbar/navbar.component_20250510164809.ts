import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <img src="../../../asstes/" alt="Logo" height="40" style="margin-right: 16px;" />
      <button mat-button routerLink="/produits">Produits</button>
      <button mat-button routerLink="/machines">Machines</button>
      <button mat-button routerLink="/techniciens">Techniciens</button>
      <button mat-button routerLink="/ordres">Ordres</button>
      <button mat-button routerLink="/maintenances">Maintenances</button>
    </mat-toolbar>
  `
})
export class NavbarComponent {}
