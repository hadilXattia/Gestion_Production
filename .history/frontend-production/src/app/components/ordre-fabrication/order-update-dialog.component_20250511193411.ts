import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-update-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  template: `
    <mat-card>
      <h2>Modifier l'Ordre de Fabrication</h2>
      <form (ngSubmit)="onSubmit()" class="form-container">
        <!-- Produit -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Produit</mat-label>
          <mat-select [(ngModel)]="ordre.produit" name="produit" required>
            <mat-option *ngFor="let p of produits" [value]="p">
              {{ p.nom }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Quantité -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Quantité</mat-label>
          <input matInput type="number" [(ngModel)]="ordre.quantite" name="quantite" required>
        </mat-form-field>

        <!-- Date -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Date</mat-label>
          <input matInput type="date" [(ngModel)]="ordre.date" name="date" required>
        </mat-form-field>

        <!-- Machine -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Machine</mat-label>
          <mat-select [(ngModel)]="ordre.machine" name="machine" required>
            <mat-option *ngFor="let m of machines" [value]="m">
              {{ m.nom }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Statut -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Statut</mat-label>
          <mat-select [(ngModel)]="ordre.statut" name="statut">
            <mat-option value="PLANIFIE">Planifié</mat-option>
            <mat-option value="EN_COURS">En cours</mat-option>
            <mat-option value="TERMINE">Terminé</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Buttons -->
        <div style="text-align: right; margin-top: 16px;">
          <button mat-button type="button" (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit">Mettre à jour</button>
        </div>
      </form>
    </mat-card>
  `,
})
export class OrderUpdateDialogComponent {
  ordre: any;
  produits: any[];
  machines: any[];

  constructor(
    public dialogRef: MatDialogRef<OrderUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ordre = { ...data.ordre };
    this.produits = data.produits;
    this.machines = data.machines;
  }

  onSubmit() {
    this.dialogRef.close(this.ordre);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
