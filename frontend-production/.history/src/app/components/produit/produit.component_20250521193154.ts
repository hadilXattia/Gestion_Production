import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterProduitDialogComponent } from './ajouter-produit-dialog.component';
import { ProduitDetailDialogComponent } from './produit-detail-dialog.component';
import { ProduitUpdateDialogComponent } from './produit-update-dialog.component';
import { TokenService } from '../../services/token.service'; // <-- Assurez-vous que ce service existe

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule,
    MatFormFieldModule, MatDialogModule, MatInputModule, MatCardModule,
    MatIconModule
  ],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  produits: any[] = [];
  totalProduits: number = 0;
  typesUnite: number = 0;
  produitsFaibleStock: number = 0;

  isAdmin: boolean = false;

  constructor(
    private produitService: ProduitService,
    private dialog: MatDialog,
    private tokenService: TokenService // <-- injecté ici
  ) {}

  ngOnInit() {
    this.loadProduits();
    this.checkRole();
  }

  checkRole() {
    this.isAdmin = this.tokenService.getRole() === 'ADMIN'; // ou ROLE_ADMIN selon le format
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
      this.totalProduits = data.length;
      this.typesUnite = new Set(data.map(p => p.type)).size;
      this.produitsFaibleStock = data.filter(p => p.stock < 10).length;
    });
  }

  openAjouterDialog() {
    const dialogRef = this.dialog.open(AjouterProduitDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.createProduit(result).subscribe(() => {
          this.loadProduits();
        });
      }
    });
  }

  openDetailDialog(produit: any) {
    this.dialog.open(ProduitDetailDialogComponent, {
      width: '500px',
      data: produit
    });
  }

  deleteProduit(id: number) {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits();
    });
  }

  openUpdateDialog(produit: any) {
    const dialogRef = this.dialog.open(ProduitUpdateDialogComponent, {
      width: '400px',
      data: produit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.updateProduit(result.id, result).subscribe(() => {
          this.loadProduits();
        });
      }
    });
  }
}
