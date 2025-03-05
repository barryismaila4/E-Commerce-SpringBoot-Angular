// src/app/models/user.model.ts
export class User {
    profileImage: string;
    nom: string;
    prenom: string;
    email: string | null;
    numero: string;
    secretCode: string;
  
    constructor(profileImage: string, nom: string, prenom: string, email: string | null, numero: string, secretCode: string) {
      this.profileImage = profileImage;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.numero = numero;
      this.secretCode = secretCode;
    }
  }
  