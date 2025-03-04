import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: Contact = new Contact();
  successMessage: string = '';
  errorMessage: string = '';
  isContactVisible: boolean = true; // Contrôle de la visibilité du formulaire

  constructor(private contactService: ContactService) {}

  // Méthode pour créer un contact
  createContact(form: NgForm): void {
    if (form.valid) { // Vérifier si le formulaire est valide
      this.contactService.createContact(this.contact).subscribe(
        (response) => {
          this.successMessage = 'Votre message est envoyé, vous serez répondu dès que possible!';
          this.errorMessage = ''; 
          this.contact = new Contact(); // Réinitialiser l'objet contact après succès
          form.resetForm(); // Réinitialiser le formulaire
        },
        (error) => {
          this.errorMessage = 'Une erreur est survenue lors de la création du contact.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      this.successMessage = '';
    }
  }

  // Méthode pour fermer la zone de contact et recharger la page
  closeContactForm(): void {
    this.isContactVisible = false;
    // Recharger la page actuelle
    window.location.reload();
  }
}
