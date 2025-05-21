// src/app/pages/produit/produit-detail-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-produit-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Détails du Produit</h2>
      <div class="container"></div>
      <p><strong>Nom:</strong> {{ data.nom }}</p>
      <p><strong>Type:</strong> {{ data.type }}</p>
      <p><strong>Stock:</strong> {{ data.stock }}</p>
      <p><strong>Fournisseur:</strong> {{ data.fournisseur }}</p>
      <div *ngIf="data.image">
        <p><strong>Image:</strong></p>
        <img [src]="data.image" alt="Image produit" style="max-width: 100%; max-height: 300px;">
      </div>
    </mat-card>
    
  `,
    styles: [`
    p{
      padding: 20px;
    }
      h2{
      padding: 20px;
      }
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 4px;
    }
  `]
})
export class ProduitDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
