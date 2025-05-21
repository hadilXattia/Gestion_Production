import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-ajouter-machine-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule, MatDatepickerModule,  // <-- ici
    MatNativeDateModule,
  ],
  template: `
    <mat-card>
      <h2>Ajouter une Machine</h2>
      <form #machineForm="ngForm" (ngSubmit)="submit(machineForm)" class="form-container">

        <!-- Nom -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="machine.nom" name="nom" #nom="ngModel" required>
          <div class="error" *ngIf="nom.invalid && nom.touched">Le nom est requis.</div>
        </mat-form-field>

        <!-- État -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>État</mat-label>
          <input matInput [(ngModel)]="machine.etat" name="etat" #etat="ngModel" required>
          <div class="error" *ngIf="etat.invalid && etat.touched">L'état est requis.</div>
        </mat-form-field>

        <!-- Maintenance Prochaine -->
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Maintenance Prochaine</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            [(ngModel)]="machine.maintenanceProchaine"
            name="maintenanceProchaine"
            #maintenanceProchaine="ngModel"
          />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <!-- Submit Button -->
        <button mat-raised-button color="primary" type="submit" [disabled]="machineForm.invalid">
          Ajouter
        </button>

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
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 4px;
    }
  `]
})
export class AjouterMachineDialogComponent {
  machine = {
    nom: '',
    etat: '',
    maintenanceProchaine: ''
  };

  constructor(private dialogRef: MatDialogRef<AjouterMachineDialogComponent>) {}

  submit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.machine);
    }
  }
}
