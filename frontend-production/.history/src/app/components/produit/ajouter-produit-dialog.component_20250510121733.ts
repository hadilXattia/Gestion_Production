import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-produit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Ajouter un Produit</h2>
    <form (ngSubmit)="submit()">
      <mat-form-field appearance="outline" class="form-field" style="display:block">
        <mat-label>Nom</mat-label>
        <input matInput [(ngModel)]="produit.nom" name="nom" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="form-field" style="display:block">
        <mat-label>Type</mat-label>
        <input matInput [(ngModel)]="produit.type" name="type" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="form-field" style="display:block">
        <mat-label>Stock</mat-label>
        <input matInput type="number" [(ngModel)]="produit.stock" name="stock" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="form-field" style="display:block">
        <mat-label>Fournisseur</mat-label>
        <input matInput [(ngModel)]="produit.fournisseur" name="fournisseur" required>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Ajouter</button>
    </form>
  `
})
export class AjouterProduitDialogComponent {
  produit = { nom: '', type: '', stock: 0, fournisseur: '' };

  constructor(public dialogRef: MatDialogRef<AjouterProduitDialogComponent>) {}

  submit() {
    this.dialogRef.close(this.produit);
  }
}
