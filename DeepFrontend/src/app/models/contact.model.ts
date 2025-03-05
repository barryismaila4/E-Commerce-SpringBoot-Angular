export class Contact {
    id?: number;  // L'ID reste optionnel
    nom: string;
    email: string;
    numero: string;
    message: string;
  
    constructor(nom: string = '', email: string = '', numero: string = '', message: string = '') {
      this.nom = nom;
      this.email = email;
      this.numero = numero;
      this.message = message;
    }
  }
  