import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2>Détails de l'Ordre</h2>
    <p><strong>Produit:</strong> {{ data.produit?.nom }}</p>
    <p><strong>Quantité:</strong> {{ data.quantite }}</p>
    <p><strong>Date:</strong> {{ data.date }}</p>
    <p><strong>Machine:</strong> {{ data.machine?.nom }}</p>
    <p><strong>Statut:</strong> {{ data.statut }}</p>
  `
})
export class OrderDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
