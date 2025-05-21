import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';
import { MachineService } from '../../services/machine.service';
import { TechnicienService } from '../../services/technicien.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent implements OnInit {
  maintenances: any[] = [];
  machines: any[] = [];
  techniciens: any[] = [];

  constructor(
    private maintenanceService: MaintenanceService,
    private machineService: MachineService,
    private technicienService: TechnicienService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.maintenanceService.getMaintenances().subscribe(data => this.maintenances = data);
    this.machineService.getMachines().subscribe(data => this.machines = data);
    this.technicienService.getTechniciens().subscribe(data => this.techniciens = data);
  }

  deleteMaintenance(id: number) {
    this.maintenanceService.deleteMaintenance(id).subscribe(() => this.loadAll());
  }

  openAjouterDialog() {
    const dialogRef = this.dialog.open(MaintenanceAjoutDialogComponent, {
      width: '400px',
      data: {
        machines: this.machines,
        techniciens: this.techniciens,
        maintenance: { machine: null, technicien: null, date: '', type: '' }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.maintenanceService.createMaintenance(result).subscribe(() => this.loadAll());
      }
    });
  }

  openDetailDialog(maintenance: any) {
    this.dialog.open(MaintenanceDetailDialogComponent, {
      width: '400px',
      data: maintenance
    });
  }
}
