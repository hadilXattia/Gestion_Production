import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';
import { MachineService } from '../../services/machine.service';
import { TechnicienService } from '../../services/technicien.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent implements OnInit {
  maintenances: any[] = [];
  machines: any[] = [];
  techniciens: any[] = [];

  newMaintenance = {
    machine: null,
    technicien: null,
    date: '',
    type: ''
  };

  constructor(
    private maintenanceService: MaintenanceService,
    private machineService: MachineService,
    private technicienService: TechnicienService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.maintenanceService.getMaintenances().subscribe(data => this.maintenances = data);
    this.machineService.getMachines().subscribe(data => this.machines = data);
    this.technicienService.getTec().subscribe(data => this.techniciens = data);
  }

  addMaintenance() {
    this.maintenanceService.createMaintenance(this.newMaintenance).subscribe(() => {
      this.newMaintenance = { machine: null, technicien: null, date: '', type: '' };
      this.loadAll();
    });
  }

  deleteMaintenance(id: number) {
    this.maintenanceService.deleteMaintenance(d).subscribe(() => this.loadAll());
  }
}
