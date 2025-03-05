// src/app/services/facture.service.ts
import { Injectable } from '@angular/core';
import { Facture, Produit } from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  constructor() { }

  // Calcul du total prix basé sur les produits
  calculerTotal(facture: Facture): number {
    let total = 0;
    facture.produits.forEach(produit => {
      total += produit.totalprix;
    });
    return total;
  }

  // Créer une facture
  creerFacture(totalproduit: number, produits: Produit[]): Facture {
    let totalprix = this.calculerTotal({ totalproduit, produits, totalprix: 0 });
    return new Facture(totalproduit, produits, totalprix);
  }
}
