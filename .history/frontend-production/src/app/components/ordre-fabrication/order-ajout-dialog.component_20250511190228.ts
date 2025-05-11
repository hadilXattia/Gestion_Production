import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-ajout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Ajouter un Ordre de Fabrication</h2>
    <form #ordreForm="ngForm" (ngSubmit)="onSubmit(ordreForm)" class="form-container">
      
      <!-- Produit -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Produit</mat-label>
        <mat-select [(ngModel)]="ordre.produit" name="produit" #produit="ngModel" required>
          <mat-option *ngFor="let p of data.produits" [value]="p">{{ p.nom }}</mat-option>
        </mat-select>
        <div class="error" *ngIf="produit.invalid && produit.touched">Le produit est requis.</div>
      </mat-form-field>

      <!-- Quantité -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Quantité</mat-label>
        <input matInput type="number" [(ngModel)]="ordre.quantite" name="quantite" #quantite="ngModel" required min="1" />
        <div class="error" *ngIf="quantite.invalid && quantite.touched">
          La quantité est requise et doit être supérieure à 0.
        </div>
      </mat-form-field>

      <!-- Date -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Date</mat-label>
        <input matInput type="date" [(ngModel)]="ordre.date" name="date" #date="ngModel" required />
        <div class="error" *ngIf="date.invalid && date.touched">La date est requise.</div>
      </mat-form-field>

      <!-- Machine -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Machine</mat-label>
        <mat-select [(ngModel)]="ordre.machine" name="machine" #machine="ngModel" required>
          <mat-option *ngFor="let m of data.machines" [value]="m">{{ m.nom }}</mat-option>
        </mat-select>
        <div class="error" *ngIf="machine.invalid && machine.touched">La machine est requise.</div>
      </mat-form-field>

      <!-- Statut -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Statut</mat-label>
        <mat-select [(ngModel)]="ordre.statut" name="statut" #statut="ngModel" required>
          <mat-option value="En attente">En attente</mat-option>
          <mat-option value="En cours">En cours</mat-option>
          <mat-option value="Terminé">Terminé</mat-option>
        </mat-select>
        <div class="error" *ngIf="statut.invalid && statut.touched">Le statut est requis.</div>
      </mat-form-field>

      <!-- Submit Button -->
      <button mat-raised-button color="primary" type="submit" [disabled]="ordreForm.invalid">
        Ajouter
      </button>
    </form>
  `,
  styles: [`
    .form-container {
      padding: 20px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 4px;
    }
    h2 {
      padding: 20px;
    }
  `]
})
export class OrderAjoutDialogComponent {
  ordre = {
    produit: null,
    quantite: null,
    date: '',
    machine: null,
    statut: 'En attente'
  };

  constructor(
    public dialogRef: MatDialogRef<OrderAjoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.ordre);
    }
  }
}
