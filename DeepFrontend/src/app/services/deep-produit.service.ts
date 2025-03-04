import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeepProduit } from '../models/deep-produit.model';

@Injectable({
  providedIn: 'root'
})
export class DeepProduitService {
  private apiUrl = 'http://localhost:8080/api/produits'; // URL de l'API

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<DeepProduit[]> {
    return this.http.get<DeepProduit[]>(`${this.apiUrl}/all`);
  }

  getProduitById(id: number): Observable<DeepProduit> {
    return this.http.get<DeepProduit>(`${this.apiUrl}/${id}`);
  }

  createProduit(produit: DeepProduit, imageFile?: File): Observable<DeepProduit> {
    const formData: FormData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix.toString());
    formData.append('code', produit.code); // Ajout du champ `code`

    if (produit.category?.id) {
      formData.append('categoryId', produit.category.id.toString());
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<DeepProduit>(`${this.apiUrl}/add`, formData);
  }

  updateProduit(id: number, produit: DeepProduit, imageFile?: File): Observable<DeepProduit> {
    const formData: FormData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix.toString());
    formData.append('code', produit.code); // Ajout du champ `code`

    if (produit.category?.id) {
      formData.append('categoryId', produit.category.id.toString());
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<DeepProduit>(`${this.apiUrl}/update/${id}`, formData);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Recherche de produits par nom
  searchProduitsByName(name: string): Observable<DeepProduit[]> {
    if (!name.trim()) {
      return this.getAllProduits(); // Recharge tous les produits si la recherche est vide
    }
    const params = new HttpParams().set('name', name);
    return this.http.get<DeepProduit[]>(`${this.apiUrl}/search`, { params });
  }
  

  // Recherche de produits par ID de catégorie
  searchProduitsByCategoryId(categoryId: number): Observable<DeepProduit[]> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http.get<DeepProduit[]>(`${this.apiUrl}/search`, { params });
  }
    // Recherche d'un produit par code
    searchProduitByCode(code: string): Observable<DeepProduit> {
      const params = new HttpParams().set('code', code);
      return this.http.get<DeepProduit>(`${this.apiUrl}/searchByCode`, { params });
    }
}
