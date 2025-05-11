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
    <mat-card class="detail-card">
      <mat-card-header>
        <mat-card-title>Détails du Produit</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="detail-group">
          <div class="detail-item">
            <strong>Nom:</strong>
            <span>{{ data.nom }}</span>
          </div>
          <div class="detail-item">
            <strong>Type:</strong>
            <span>{{ data.type }}</span>
          </div>
          <div class="detail-item">
            <strong>Stock:</strong>
            <span>{{ data.stock }}</span>
          </div>
          <div class="detail-item">
            <strong>Fournisseur:</strong>
            <span>{{ data.fournisseur }}</span>
          </div>
          <div class="detail-item" *ngIf="data.image">
            <strong>Image:</strong>
            <div class="image-preview">
              <img [src]="data.image" alt="Image produit" />
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .detail-card {
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    mat-card-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .detail-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 16px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
    }

    .image-preview {
      margin-top: 8px;
    }

    .image-preview img {
      max-width: 100%;
      max-height: 300px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
  `]
})
export class ProduitDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
