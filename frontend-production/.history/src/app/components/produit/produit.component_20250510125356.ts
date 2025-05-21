import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterProduitDialogComponent } from './ajouter-produit-dialog.component';

import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProduitDetailDialogComponent } from './produit-detail-dialog.component';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [
    NgFor, CommonModule, FormsModule, MatTableModule,
    MatButtonModule, MatFormFieldModule, MatDialogModule,
    MatInputModule, MatCardModule, MatIconModule
  ],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  produits: any[] = [];

  constructor(private produitService: ProduitService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  openAjouterDialog() {
    const dialogRef = this.dialog.open(AjouterProduitDialogComponent, {
      width: '400px'
    });
    openDetailDialog(produit: any) {
  this.dialog.open(ProduitDetailDialogComponent, {
    width: '400px',
    data: produit
  });
}

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.createProduit(result).subscribe(() => {
          this.loadProduits();
        });
      }
    });
  }

  deleteProduit(id: number) {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits();
    });
  }
}
