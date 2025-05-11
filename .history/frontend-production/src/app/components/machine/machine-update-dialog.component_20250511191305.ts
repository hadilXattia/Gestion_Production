import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-machine-update-dialog',
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
      <h2>Modifier la Machine</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="machine.nom" name="nom" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>État</mat-label>
          <input matInput [(ngModel)]="machine.etat" name="etat" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Maintenance Prochaine</mat-label>
          <input matInput [value]="machine.maintenanceProchaine | date:'yyyy-MM-dd'" disabled />
        </mat-form-field>

        <div style="text-align: right; margin-top: 16px;">
          <button mat-button type="button" (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit">Mettre à jour</button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    h2 {
      padding-bottom: 10px;
    }
  `]
})
export class MachineUpdateDialogComponent {
  machine: any;

  constructor(
    public dialogRef: MatDialogRef<MachineUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.machine = { ...data }; // clone to avoid editing original before save
  }

  onSubmit() {
    this.dialogRef.close(this.machine);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
