import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-technicien-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Détails du Technicien</h2>
      <p><strong>Nom:</strong> {{ data.nom }}</p>
      <p><strong>Compétences:</strong> {{ data.competences }}</p>
      <p><strong>Machine Assignée:</strong> {{ data.machineAssignee?.nom || 'Non assignée' }}</p>
    </mat-card>
  `
})
export class TechnicienDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
