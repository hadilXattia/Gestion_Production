import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { HttpClient } from '@angular/common/http';
import { NgFor ,CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [NgFor,CommonModule, FormsModule],
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
