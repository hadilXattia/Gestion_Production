import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
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
    <form #produitForm="ngForm" (ngSubmit)="submit(produitForm)">
      <!-- Nom -->
      <mat-form-field appearance="outline" style="display:block">
        <mat-label>Nom</mat-label>
        <input matInput [(ngModel)]="produit.nom" name="nom" #nom="ngModel" required>
        <div class="error" *ngIf="nom.invalid && nom.touched">Le nom est requis.</div>
      </mat-form-field>

      <!-- Type -->
      <mat-form-field appearance="outline" style="display:block">
        <mat-label>Type</mat-label>
        <input matInput [(ngModel)]="produit.type" name="type" #type="ngModel" required>
        <div class="error" *ngIf="type.invalid && type.touched">Le type est requis.</div>
      </mat-form-field>

      <!-- Stock -->
      <mat-form-field appearance="outline" style="display:block">
        <mat-label>Stock</mat-label>
        <input matInput type="number" [(ngModel)]="produit.stock" name="stock" #stock="ngModel" required min="0">
        <div class="error" *ngIf="stock.invalid && stock.touched">
          Le stock est requis et doit être un nombre positif.
        </div>
      </mat-form-field>

      <!-- Fournisseur -->
      <mat-form-field appearance="outline" style="display:block">
        <mat-label>Fournisseur</mat-label>
        <input matInput [(ngModel)]="produit.fournisseur" name="fournisseur" #fournisseur="ngModel" required>
        <div class="error" *ngIf="fournisseur.invalid && fournisseur.touched">Le fournisseur est requis.</div>
      </mat-form-field>

      <!-- Submit Button -->
      <button mat-raised-button color="primary" type="submit" [disabled]="produitForm.invalid">
        Ajouter
      </button>
    </form>
  `,
  styles: [`
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 4px;
    }
  `]
})
export class AjouterProduitDialogComponent {
  produit = { nom: '', type: '', stock: null, fournisseur: '' };

  constructor(public dialogRef: MatDialogRef<AjouterProduitDialogComponent>) {}

  submit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.produit);
    }
  }
}
