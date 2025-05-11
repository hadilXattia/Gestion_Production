import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
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
    <form (ngSubmit)="onSubmit()" #ordreForm="ngForm">
      <mat-form-field appearance="fill">
        <mat-label>Produit</mat-label>
        <mat-select [(ngModel)]="ordre.produit" name="produit" required>
          <mat-option *ngFor="let p of data.produits" [value]="p">{{ p.nom }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Quantité</mat-label>
        <input matInput type="number" [(ngModel)]="ordre.quantite" name="quantite" required>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Date</mat-label>
        <input matInput type="date" [(ngModel)]="ordre.date" name="date" required>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Machine</mat-label>
        <mat-select [(ngModel)]="ordre.machine" name="machine" required>
          <mat-option *ngFor="let m of data.machines" [value]="m">{{ m.nom }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Statut</mat-label>
        <mat-select [(ngModel)]="ordre.statut" name="statut" required>
          <mat-option value="En attente">En attente</mat-option>
          <mat-option value="En cours">En cours</mat-option>
          <mat-option value="Terminé">Terminé</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Ajouter</button>
    </form>
  `
})
export class OrderAjoutDialogComponent {
  ordre = {
    produit: null,
    quantite: 0,
    date: '',
    machine: null,
    statut: 'En attente'
  };

  constructor(
    public dialogRef: MatDialogRef<OrderAjoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit() {
    this.dialogRef.close(this.ordre);
  }
}
