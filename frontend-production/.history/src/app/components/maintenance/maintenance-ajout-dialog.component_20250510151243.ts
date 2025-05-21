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
   <h2 mat-dialog-title>Ajouter Maintenance</h2>
  < divmat-dialog-content>
    <mat-form-field style="width: 100%;">
      <mat-label>Machine</mat-label>
      <mat-select [(ngModel)]="data.maintenance.machine">
        <mat-option *ngFor="let m of data.machines" [value]="m">{{ m.nom }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field style="width: 100%;">
      <mat-label>Technicien</mat-label>
      <mat-select [(ngModel)]="data.maintenance.technicien">
        <mat-option *ngFor="let t of data.techniciens" [value]="t">{{ t.nom }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field style="width: 100%;">
      <mat-label>Date</mat-label>
      <input matInput [(ngModel)]="data.maintenance.date" type="date" />
    </mat-form-field>

    <mat-form-field style="width: 100%;">
      <mat-label>Type</mat-label>
      <input matInput [(ngModel)]="data.maintenance.type" />
    </mat-form-field>
  </>
  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef.close()">Annuler</button>
    <button mat-raised-button color="primary" (click)="dialogRef.close(data.maintenance)">Ajouter</button>
  </mat-dialog-actions>







      <h2 mat-dialog-title>Ajouter un Technicien</h2>

    <div mat-dialog-content>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="data.nom" name="nom" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Compétences</mat-label>
          <input matInput [(ngModel)]="data.competences" name="competences" required />
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
