import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from './machine.service';

export interface Technicien {
  id?: number;
  nom: string;
  competences: string;
  machineAssignee?: Machine;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  private apiUrl = 'http://localhost:8080/api/techniciens';

  constructor(private http: HttpClient) {}

  getTechniciens(): Observable<Technicien[]> {
    return this.http.get<Technicien[]>(this.apiUrl);
  }

  createTechnicien(technicien: Technicien): Observable<Technicien> {
    return this.http.post<Technicien>(this.apiUrl, technicien);
  }

  updateTechnicien(id: number, technicien: Technicien): Observable<Technicien> {
    return this.http.put<Technicien>(`${this.apiUrl}/${id}`, technicien);
  }

  deleteTechnicien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignMachine(id: number, machineId: number): Observable<Technicien> {
    return this.http.patch<Technicien>(`${this.apiUrl}/${id}/assigner-machine/${machineId}`, {});
  }
}
