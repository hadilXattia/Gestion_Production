import { Component, OnInit, inject } from '@angular/core';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ProduitService } from '../../services/produit.service';
import { MachineService } from '../../services/machine.service';
import { AuthService } from '../../auth/auth.service'; // <-- Ajout du service d'authentification
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderAjoutDialogComponent } from './order-ajout-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog.component';
import { OrderUpdateDialogComponent } from './order-update-dialog.component';

@Component({
  selector: 'app-ordre-fabrication',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './ordre-fabrication.component.html',
  styleUrl: './ordre-fabrication.component.css'
})
export class OrdreFabricationComponent implements OnInit {
  ordres: any[] = [];
  produits: any[] = [];
  machines: any[] = [];
  displayedColumns: string[] = ['produit', 'quantite', 'date', 'machine', 'statut', 'actions'];
  totalOrdres: number = 0;
  ordresTermines: number = 0;
  ordresEnAttente: number = 0;

  private dialog = inject(MatDialog);

  constructor(
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService,
    private machineService: MachineService,
    private authService: AuthService // <-- Injection du AuthService
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadAll() {
    this.ordreService.getOrdres().subscribe(data => {
      this.ordres = data;
      this.totalOrdres = data.length;
      this.ordresTermines = data.filter(o => o.statut === 'Terminé').length;
      this.ordresEnAttente = data.filter(o => o.statut === 'En attente').length;
    });

    this.produitService.getProduits().subscribe(data => this.produits = data);
    this.machineService.getMachines().subscribe(data => this.machines = data);
  }

  deleteOrdre(id: number) {
    if (!this.isAdmin) return;
    this.ordreService.deleteOrdre(id).subscribe(() => this.loadAll());
  }

  updateStatut(id: number, statut: string) {
    if (!this.isAdmin) return;
    const ordre = this.ordres.find(o => o.id === id);
    if (ordre) {
      ordre.statut = statut;
      this.ordreService.updateOrdre(id, ordre).subscribe(() => this.loadAll());
    }
  }

  openAjouterDialog() {
    if (!this.isAdmin) return;
    const dialogRef = this.dialog.open(OrderAjoutDialogComponent, {
      width: '400px',
      data: {
        produits: this.produits,
        machines: this.machines
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ordreService.createOrdre(result).subscribe(() => this.loadAll());
      }
    });
  }

  openDetailDialog(ordre: any) {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '400px',
      data: ordre
    });
  }

  openUpdateDialog(ordre: any) {
    if (!this.isAdmin) return;
    const dialogRef = this.dialog.open(OrderUpdateDialogComponent, {
      width: '400px',
      data: {
        ordre,
        produits: this.produits,
        machines: this.machines
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ordreService.updateOrdre(result.id, result).subscribe(() => this.loadAll());
      }
    });
  }
}
