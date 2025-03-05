// deep-category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeepCategory } from '../models/deep-category.model';


@Injectable({
  providedIn: 'root'
})
export class DeepCategoryService {
  private apiUrl = 'http://localhost:8080/categories'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Lister toutes les catégories
  getAllCategories(): Observable<DeepCategory[]> {
    return this.http.get<DeepCategory[]>(this.apiUrl);
  }

  // Ajouter une nouvelle catégorie
  createCategory(category: DeepCategory): Observable<DeepCategory> {
    return this.http.post<DeepCategory>(this.apiUrl, category);
  }

  // Modifier une catégorie
  updateCategory(id: number, category: DeepCategory): Observable<DeepCategory> {
    return this.http.put<DeepCategory>(`${this.apiUrl}/${id}`, category);
  }

  // Supprimer une catégorie
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Trouver une catégorie par ID
  getCategoryById(id: number): Observable<DeepCategory> {
    return this.http.get<DeepCategory>(`${this.apiUrl}/${id}`);
  }
    // Trouver une catégorie par nom
    getCategoryByName(name: string): Observable<DeepCategory[]> {
      return this.http.get<DeepCategory[]>(`${this.apiUrl}/search?name=${name}`);
    }
}