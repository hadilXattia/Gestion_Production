import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-machine-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Détails de la Machine</h2>
      <p><strong>Nom:</strong> {{ data.nom }}</p>
      <p><strong>État:</strong> {{ data.etat }}</p>
      <p><strong>Maintenance Prochaine:</strong> {{ data.maintenanceProchaine | date }}</p>
    </mat-card>
  `
})
export class MachineDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
