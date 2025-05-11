import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajouter-machine-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <h2>Ajouter une Machine</h2>
      <form (ngSubmit)="submit()">
        <mat-form-field class="full-width">
          <input matInput placeholder="Nom" [(ngModel)]="machine.nom" name="nom" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput placeholder="État" [(ngModel)]="machine.etat" name="etat" required>
        </mat-form-field>

     <mat-form-field class="full-width">
  <input matInput type="date" placeholder="Maintenance Prochaine" [(ngModel)]="machine.maintenanceProchaine" name="maintenanceProchaine">
</mat-form-field>

        <button mat-raised-button color="primary" type="submit">Ajouter</button>
      </form>
    </mat-card>
  `
})
export class AjouterMachineDialogComponent {
  machine = {
    nom: '',
    etat: '',
    maintenanceProchaine: ''
  };

  constructor(private dialogRef: MatDialogRef<AjouterMachineDialogComponent>) {}

  submit() {
    this.dialogRef.close(this.machine);
  }
}
