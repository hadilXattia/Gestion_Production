import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterMachineDialogComponent } from './ajouter-machine-dialog.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MachineDetailDialogComponent } from './machine-detail-dialog.component';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit {
  machines: any[] = [];

  constructor(
    private machineService: MachineService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMachines();
  }

  loadMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }

  get totalMachines(): number {
    return this.machines.length;
  }

  get machinesEnPanne(): number {
    return this.machines.filter(m => m.etat.toLowerCase() === 'en panne').length;
  }

  get machinesActives(): number {
    return this.machines.filter(m => m.etat.toLowerCase() === 'active').length;
  }

  openAjouterMachineDialog() {
    const dialogRef = this.dialog.open(AjouterMachineDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.machineService.createMachine(result).subscribe(() => {
          this.loadMachines();
        });
      }
    });
  }

  openMachineDetailDialog(machine: any) {
    this.dialog.open(MachineDetailDialogComponent, {
      width: '400px',
      data: machine
    });
  }

  deleteMachine(id: number) {
    this.machineService.deleteMachine(id).subscribe(() => {
      this.loadMachines();
    });
  }
}
