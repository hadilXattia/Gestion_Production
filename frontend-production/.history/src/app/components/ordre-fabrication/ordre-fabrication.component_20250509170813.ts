import { Component, OnInit } from '@angular/core';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ProduitService } from '../../services/produit.service';
import { MachineService } from '../../services/machine.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ordre-fabrication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordre-fabrication.component.html',
  styleUrl: './ordre-fabrication.component.css'
})
export class OrdreFabricationComponent implements OnInit {
  ordres: any[] = [];
  produits: any[] = [];
  machines: any[] = [];

  newOrdre = {
    produit: null,
    quantite: 0,
    date: '',
    machine: null,
    statut: ''
  };

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

  addOrdre() {
    this.ordreService.createOrdre(this.newOrdre).subscribe(() => {
      this.newOrdre = {
        produit: null,
        quantite: 0,
        date: '',
        machine: null,
        statut: ''
      };
      this.loadAll();
    });
  }

  deleteOrdre(id: number) {
    this.ordreService.deleteOrdre(id).subscribe(() => this.loadAll());
  }

  updateStatut(id: number, statut: string) {
    const ordre = this.ordres.find(o => o.id === id);
    if (ordre) {
      ordre.statut = statut;
      this.ordreService.update(id, ordre).subscribe(() => this.loadAll());
    }
  }
}
