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
    <mat-card class="detail-card">
      <mat-card-header>
        <mat-card-title>Détail de la Maintenance</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="detail-group">
          <div class="detail-item">
            <strong>Machine:</strong>
            <span>{{ data.machine?.nom }}</span>
          </div>
          <div class="detail-item">
            <strong>Technicien:</strong>
            <span>{{ data.technicien?.nom }}</span>
          </div>
          <div class="detail-item">
            <strong>Date:</strong>
            <span>{{ data.date }}</span>
          </div>
          <div class="detail-item">
            <strong>Type:</strong>
            <span>{{ data.type }}</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .detail-card {
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    mat-card-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .detail-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 16px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class MaintenanceDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
