import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';
import { MachineService } from '../../services/machine.service';
import { TechnicienService } from '../../services/technicien.service';
import { AuthService } from '../../auth/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MaintenanceAjoutDialogComponent } from './maintenance-ajout-dialog.component';
import { MaintenanceDetailDialogComponent } from './maintenance-detail-dialog.component';
import { MaintenanceUpdateDialogComponent } from './maintenance-update-dialog.component';

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

  totalMaintenances: number = 0;
  preventives: number = 0;
  curatives: number = 0;

  constructor(
    private maintenanceService: MaintenanceService,
    private machineService: MachineService,
    private technicienService: TechnicienService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadAll() {
    this.maintenanceService.getMaintenances().subscribe(data => {
      this.maintenances = data;
      this.totalMaintenances = data.length;
      this.preventives = data.filter(m => m.type === 'Préventive').length;
      this.curatives = data.filter(m => m.type === 'Curative').length;
    });

    this.machineService.getMachines().subscribe(data => this.machines = data);
    this.technicienService.getTechniciens().subscribe(data => this.techniciens = data);
  }

  deleteMaintenance(id: number) {
    if (!this.isAdmin) return;

    this.maintenanceService.deleteMaintenance(id).subscribe(() => this.loadAll());
  }

  openAjouterDialog() {
    if (!this.isAdmin) return;

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

  openUpdateDialog(maintenance: any) {
    if (!this.isAdmin) return;

    const dialogRef = this.dialog.open(MaintenanceUpdateDialogComponent, {
      width: '400px',
      data: {
        maintenance,
        techniciens: this.techniciens
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.maintenanceService.updateMaintenance(result.id, result).subscribe(() => this.loadAll());
      }
    });
  }
}
