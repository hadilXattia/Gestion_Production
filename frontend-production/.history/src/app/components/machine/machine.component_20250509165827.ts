import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit {
  machines: any[] = [];

  newMachine = {
    nom: '',
    etat: '',
    maintenanceProchaine: ''
  };

  constructor(private machineService: MachineService) {}

  ngOnInit() {
    this.loadMachines();
  }

  loadMachines() {
    this.machineService.getAll().subscribe(data => {
      this.machines = data;
    });
  }

  addMachine() {
    this.machineService.create(this.newMachine).subscribe(() => {
      this.newMachine = { nom: '', etat: '', maintenanceProchaine: '' };
      this.loadMachines();
    });
  }

  deleteMachine(id: number) {
    this.machineService.delete(id).subscribe(() => {
      this.loadMachines();
    });
  }
}
