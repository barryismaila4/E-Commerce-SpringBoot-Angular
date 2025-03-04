export class Commande {
    id?: number; // L'ID de la commande (optionnel car généré par la base)
    nom: string;
    prenom: string;
    email: string;
    numero: string;
    ville: string;
    adresse: string;
    codePostal: string;
    panier: string; // Contient les informations du panier sous forme de chaîne JSON
  
    constructor(
      nom: string,
      prenom: string,
      email: string,
      numero: string,
      ville: string,
      adresse: string,
      codePostal: string,
      panier: string,
      id?: number
    ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.numero = numero;
      this.ville = ville;
      this.adresse = adresse;
      this.codePostal = codePostal;
      this.panier = panier;
    }
  }
  