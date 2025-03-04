// src/app/models/facture.ts
export class Facture {
    totalproduit: number;
    produits: Produit[];
    totalprix: number;
  
    constructor(totalproduit: number, produits: Produit[], totalprix: number) {
      this.totalproduit = totalproduit;
      this.produits = produits;
      this.totalprix = totalprix;
    }
  }
  
  export class Produit {
    produit: string;
    prix: number;
    description: string;
    totalprix: number;
  
    constructor(produit: string, prix: number, description: string, totalprix: number) {
      this.produit = produit;
      this.prix = prix;
      this.description = description;
      this.totalprix = totalprix;
    }
  }
  