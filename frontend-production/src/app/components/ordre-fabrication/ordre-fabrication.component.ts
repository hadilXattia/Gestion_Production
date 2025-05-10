import { Component, OnInit, inject } from '@angular/core';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ProduitService } from '../../services/produit.service';
import { MachineService } from '../../services/machine.service';
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

  private dialog = inject(MatDialog);

  constructor(
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.ordreService.getOrdres().subscribe(data => this.ordres = data);
    this.produitService.getProduits().subscribe(data => this.produits = data);
    this.machineService.getMachines().subscribe(data => this.machines = data);
  }

  deleteOrdre(id: number) {
    this.ordreService.deleteOrdre(id).subscribe(() => this.loadAll());
  }

  updateStatut(id: number, statut: string) {
    const ordre = this.ordres.find(o => o.id === id);
    if (ordre) {
      ordre.statut = statut;
      this.ordreService.updateOrdre(id, ordre).subscribe(() => this.loadAll());
    }
  }

  openAjouterDialog() {
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
}
