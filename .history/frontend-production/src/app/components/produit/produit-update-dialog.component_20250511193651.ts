import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-produit-update-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <h2>Modifier Produit</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="produit.nom" name="nom" required>
        </mat-form-field>

        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Description</mat-label>
          <input matInput [(ngModel)]="produit.description" name="description">
        </mat-form-field>

        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Prix</mat-label>
          <input matInput type="number" [(ngModel)]="produit.prix" name="prix" required>
        </mat-form-field>

        <div style="text-align: right; margin-top: 16px;">
          <button mat-button type="button" (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit">Mettre à jour</button>
        </div>
      </form>
    </mat-card>
  `
  ,
  styles: [`
    .form-container {
      padding: 20px;
    }
    h2 {
      padding: 20px 20px 0 20px;
    }
  `]
})
export class ProduitUpdateDialogComponent {
  produit: any;

  constructor(
    public dialogRef: MatDialogRef<ProduitUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produit = { ...data }; // clone to avoid binding directly to original object
  }

  onSubmit() {
    this.dialogRef.close(this.produit);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
