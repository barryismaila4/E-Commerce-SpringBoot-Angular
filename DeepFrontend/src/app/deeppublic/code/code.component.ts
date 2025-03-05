import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent {
  code: string = '';   // Variable pour stocker le code saisi
  errorMessage: string = '';  // Message d'erreur si le code est incorrect

  constructor(private router: Router) {}

  checkCode(): void {
    // Liste des codes valides
    const validCodes = ['AmadouDialloDeepBarry', 'IsmailaBarryDeepDiallo',];

    // Supprimer les espaces avant et après le code saisi
    const trimmedCode = this.code.trim();

    console.log('Code saisi:', trimmedCode);  // Vérifier la valeur du code saisi

    // Vérification du code : on s'assure que la chaîne ne contient que des lettres et des chiffres
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(trimmedCode)) {
      this.errorMessage = 'Le code ne doit contenir que des lettres et des chiffres.';
      return;
    }

    // Vérification du code
    if (validCodes.includes(trimmedCode)) {
      // Si le code est correct, redirection vers deepadminserial
      this.router.navigate(['/deepadminserial']);
    } else {
      // Sinon, afficher un message d'erreur
      this.errorMessage = 'Code incorrect, veuillez réessayer.';
    }
  }
}
