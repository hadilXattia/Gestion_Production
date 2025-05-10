import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from './produit.service';
import { Machine } from './machine.service';

export interface OrdreFabrication {
  id?: number;
  produit: Produit | null;
  quantite: number;
  date: string; // ISO date string
   machine: Machine | null;
  statut: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdreFabricationService {
  private apiUrl = 'http://localhost:8080/api/ordres';

  constructor(private http: HttpClient) {}

  getOrdres(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(this.apiUrl);
  }

  createOrdre(ordre: OrdreFabrication): Observable<OrdreFabrication> {
    return this.http.post<OrdreFabrication>(this.apiUrl, ordre);
  }

  updateOrdre(id: number, ordre: OrdreFabrication): Observable<OrdreFabrication> {
    return this.http.put<OrdreFabrication>(`${this.apiUrl}/${id}`, ordre);
  }

  deleteOrdre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStatut(id: number, statut: string): Observable<OrdreFabrication> {
    return this.http.patch<OrdreFabrication>(`${this.apiUrl}/${id}/statut`, statut, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  getByStatut(statut: string): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${this.apiUrl}/statut/${statut}`);
  }
}
