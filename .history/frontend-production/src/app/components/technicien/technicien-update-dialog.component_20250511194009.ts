import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-technicien-update-dialog',
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
      <h2>Modifier Technicien</h2>
      <form (ngSubmit)="onSubmit()" class="form-container">
        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="technicien.nom" name="nom" required>
        </mat-form-field>

        <mat-form-field appearance="outline" style="display: block;">
          <mat-label>Compétences</mat-label>
          <input matInput [(ngModel)]="technicien.competences" name="competences">
        </mat-form-field>

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
export class TechnicienUpdateDialogComponent {
  technicien: any;

  constructor(
    public dialogRef: MatDialogRef<TechnicienUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.technicien = { ...data }; // clone to avoid mutating the original
  }

  onSubmit() {
    this.dialogRef.close(this.technicien);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
