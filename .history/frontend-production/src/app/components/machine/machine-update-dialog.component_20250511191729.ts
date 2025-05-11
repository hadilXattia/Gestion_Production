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
  selector: 'app-machine-update-dialog',
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
      <h2>Modifier la Machine</h2>
      <form (ngSubmit)="onSubmit()" class="form-container">

        <!-- Nom -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="machine.nom" name="nom" required>
        </mat-form-field>

        <!-- État -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>État</mat-label>
          <mat-select [(ngModel)]="machine.etat" name="etat" required>
            <mat-option value="Active">Active</mat-option>
            <mat-option value="En panne">En panne</mat-option>
            <mat-option value="En maintenance">En maintenance</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Maintenance Prochaine -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Maintenance Prochaine</mat-label>
          <input matInput [value]="machine.maintenanceProchaine | date:'yyyy-MM-dd'" disabled>
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
export class MachineUpdateDialogComponent {
  machine: any;

  constructor(
    public dialogRef: MatDialogRef<MachineUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.machine = { ...data }; 
  }

  onSubmit() {
    this.dialogRef.close(this.machine);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
