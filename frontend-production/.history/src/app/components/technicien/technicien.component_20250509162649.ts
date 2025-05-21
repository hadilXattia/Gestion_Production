import { Component, OnInit } from '@angular/core';
import { TechnicienService } from '../../services/technicien.service';
import { MachineService } from '../../services/machine.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-technicien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technicien.component.html',
  styleUrl: './technicien.component.css'
})
export class TechnicienComponent implements OnInit {
  techniciens: any[] = [];
  machines: any[] = [];

  newTechnicien = {
    nom: '',
    competences: '',
    machineAssignee: null
  };

  constructor(
    private technicienService: TechnicienService,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    this.loadTechniciens();
    this.loadMachines();
  }

  loadTechniciens() {
    this.technicienService.getAll().subscribe(data => {
      this.techniciens = data;
    });
  }

  loadMachines() {
    this.machineService.getAll().subscribe(data => {
      this.machines = data;
    });
  }

  addTechnicien() {
    this.technicienService.create(this.newTechnicien).subscribe(() => {
      this.newTechnicien = { nom: '', competences: '', machineAssignee: null };
      this.loadTechniciens();
    });
  }

  deleteTechnicien(id: number) {
    this.technicienService.delete(id).subscribe(() => {
      this.loadTechniciens();
    });
  }

  assignMachine(technicienId: number, machineId: number) {
    this.technicienService.assignMachine(technicienId, machineId).subscribe(() => {
      this.loadTechniciens();
    });
  }
}
