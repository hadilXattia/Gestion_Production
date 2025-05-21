import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from './machine.service';
import { Technicien } from './technicien.service';

export interface Maintenance {
  id?: number;
  machine: Machine;
  technicien: Technicien;
  date: string; // ISO date string
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:8080/api/maintenances';

  constructor(private http: HttpClient) {}

  getMaintenances(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.apiUrl);
  }

  createMaintenance(m: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(this.apiUrl, m);
  }

  updateMaintenance(id: number, m: Maintenance): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${this.apiUrl}/${id}`, m);
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPlanned(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/planifiee`);
  }
}
