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
  selector: 'app-maintenance-update-dialog',
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
      <h2>Modifier la Maintenance</h2>
      <form (ngSubmit)="onSubmit()" class="form-container">

        <!-- Machine (disabled) -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Machine</mat-label>
          <input matInput [value]="maintenance.machine?.nom" disabled>
        </mat-form-field>

        <!-- Technicien -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Technicien</mat-label>
          <mat-select [(ngModel)]="maintenance.technicien" name="technicien" required>
            <mat-option *ngFor="let tech of techniciens" [value]="tech">
              {{ tech.nom }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Date -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Date</mat-label>
          <input matInput type="date" [(ngModel)]="maintenance.date" name="date" required>
        </mat-form-field>

        <!-- Type -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Type</mat-label>
          <input matInput [(ngModel)]="maintenance.type" name="type" required>
        </mat-form-field>

        <!-- Buttons -->
        <div style="text-align: right; margin-top: 16px;">
          <button mat-button type="button" (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit">Mettre à jour</button>
        </div>

      </form>
    </mat-card>
  `,
  styles: [`
    .form-container {
      padding: 20px;
    }
    h2 {
      padding: 20px 20px 0 20px;
    }
  `]
})
export class MaintenanceUpdateDialogComponent {
  maintenance: any;
  techniciens: any[];

  constructor(
    public dialogRef: MatDialogRef<MaintenanceUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maintenance = { ...data.maintenance }; // clone
    this.techniciens = data.techniciens;
  }

  onSubmit() {
    this.dialogRef.close(this.maintenance);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
