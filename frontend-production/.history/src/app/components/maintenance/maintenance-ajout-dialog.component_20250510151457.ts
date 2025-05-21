import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-maintenance-ajout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
      MatDialogModule, 
    MatButtonModule
  ],
  template: `
<h2 mat-dialog-title>Ajouter une Maintenance</h2>

<div mat-dialog-content>
  <form (ngSubmit)="onSubmit()">
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Machine</mat-label>
      <mat-select [(ngModel)]="data.maintenance.machine" name="machine" required>
        <mat-option *ngFor="let m of data.machines" [value]="m">{{ m.nom }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Technicien</mat-label>
      <mat-select [(ngModel)]="data.maintenance.technicien" name="technicien" required>
        <mat-option *ngFor="let t of data.techniciens" [value]="t">{{ t.nom }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Date</mat-label>
      <input matInput [(ngModel)]="data.maintenance.date" name="date" type="date" required />
    </mat-form-field>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Type</mat-label>
      <input matInput [(ngModel)]="data.maintenance.type" name="type" required />
    </mat-form-field>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-raised-button color="primary" type="submit">Ajouter</button>
    </div>
  </form>
</div>








  `
})
export class MaintenanceAjoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MaintenanceAjoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
