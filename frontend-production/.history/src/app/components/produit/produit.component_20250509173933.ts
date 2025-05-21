import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { HttpClient } from '@angular/common/http';
import { NgFor ,CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AjouterProduitDialogComponent } from './ajouter-produit-dialog.component';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [NgFor,CommonModule, FormsModule,MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  produits: any[] = [];
  newProduit = {
    nom: '',
    type: '',
    stock: 0,
    fournisseur: ''
  };

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  addProduit() {
    this.produitService.createProduit(this.newProduit).subscribe(() => {
      this.newProduit = { nom: '', type: '', stock: 0, fournisseur: '' };
      this.loadProduits();
    });
  }

  deleteProduit(id: number) {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits();
    });
  }
}
