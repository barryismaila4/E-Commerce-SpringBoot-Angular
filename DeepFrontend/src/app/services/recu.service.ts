// src/app/services/recu.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recu } from '../models/recu.model';

@Injectable({
  providedIn: 'root'
})
export class RecuService {
  private apiUrl = 'http://localhost:8080/api/recus'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Créer un nouveau reçu
  createRecu(recu: Recu): Observable<Recu> {
    return this.http.post<Recu>(this.apiUrl, recu);
  }

  // Récupérer tous les reçus
  getAllRecus(): Observable<Recu[]> {
    return this.http.get<Recu[]>(this.apiUrl);
  }

  // Récupérer un reçu par ID
  getRecuById(id: number): Observable<Recu> {
    return this.http.get<Recu>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un reçu
  updateRecu(id: number, recu: Recu): Observable<Recu> {
    return this.http.put<Recu>(`${this.apiUrl}/${id}`, recu);
  }

  // Supprimer un reçu
  deleteRecu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les reçus par montant
  getRecusByMontant(montant: number): Observable<Recu[]> {
    return this.http.get<Recu[]>(`${this.apiUrl}/montant/${montant}`);
  }

  // Récupérer les reçus par description
  getRecusByDescription(description: string): Observable<Recu[]> {
    return this.http.get<Recu[]>(`${this.apiUrl}/description/${description}`);
  }

  // Récupérer les reçus par date
  getRecusByDateBetween(startDate: Date, endDate: Date): Observable<Recu[]> {
    const params = { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
    return this.http.get<Recu[]>(`${this.apiUrl}/date`, { params });
  }
}