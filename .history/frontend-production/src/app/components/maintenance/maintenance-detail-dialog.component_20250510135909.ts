import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Détail Maintenance</h2>
      <p><strong>Machine:</strong> {{ data.machine?.nom }}</p>
      <p><strong>Technicien:</strong> {{ data.technicien?.nom }}</p>
      <p><strong>Date:</strong> {{ data.date }}</p>
      <p><strong>Type:</strong> {{ data.type }}</p>
    </mat-card>
  `
})
export class MaintenanceDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
