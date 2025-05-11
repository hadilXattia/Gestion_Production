import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-technicien-ajout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>Ajouter un Technicien</h2>

    <div mat-dialog-content>
      <form #technicienForm="ngForm" (ngSubmit)="onSubmit(technicienForm)">
        <!-- Nom -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="data.nom" name="nom" #nom="ngModel" required />
          <div class="error" *ngIf="nom.invalid && nom.touched">Le nom est requis.</div>
        </mat-form-field>

        <!-- Compétences -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Compétences</mat-label>
          <input matInput [(ngModel)]="data.competences" name="competences" #competences="ngModel" required />
          <div class="error" *ngIf="competences.invalid && competences.touched">Les compétences sont requises.</div>
        </mat-form-field>

        <!-- Actions -->
        <div mat-dialog-actions align="end">
          <button mat-button type="button" (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="technicienForm.invalid">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 4px;
    }
  `]
})
export class TechnicienAjoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TechnicienAjoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.data);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
