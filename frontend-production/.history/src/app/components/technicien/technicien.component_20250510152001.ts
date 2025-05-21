import { Component, OnInit } from '@angular/core';
import { TechnicienService } from '../../services/technicien.service';
import { MachineService } from '../../services/machine.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TechnicienDetailDialogComponent } from './technicien-detail-dialog.component';
import { TechnicienAjoutDialogComponent } from './technicien-ajout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-technicien',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
      MatIconModule,
    MatCardModule
  ],
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
toggleAssignSelect(id: number) {
  this.assigningMachineId = this.assigningMachineId === id ? null : id;
}
  constructor(
    private technicienService: TechnicienService,
    private machineService: MachineService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTechniciens();
    this.loadMachines();
  }

  loadTechniciens() {
    this.technicienService.getTechniciens().subscribe(data => {
      this.techniciens = data;
    });
  }

  loadMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }

  addTechnicien() {
    this.technicienService.createTechnicien(this.newTechnicien).subscribe(() => {
      this.newTechnicien = { nom: '', competences: '', machineAssignee: null };
      this.loadTechniciens();
    });
  }
  

  deleteTechnicien(id: number) {
    this.technicienService. deleteTechnicien(id).subscribe(() => {
      this.loadTechniciens();
    });
  }

  assignMachine(technicienId: number, machineId: number) {
    this.technicienService.assignMachine(technicienId, machineId).subscribe(() => {
      this.loadTechniciens();
    });
  }
openAjouterDialog() {
  const dialogRef = this.dialog.open(TechnicienAjoutDialogComponent, {
    width: '400px',
    data: { nom: '', competences: '' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.technicienService.createTechnicien(result).subscribe(() => {
        this.loadTechniciens();
      });
    }
  });
} // <-- ✅ This closing brace was missing!

openDetailDialog(technicien: any) {
  this.dialog.open(TechnicienDetailDialogComponent, {
    width: '400px',
    data: technicien
  });
}
}
