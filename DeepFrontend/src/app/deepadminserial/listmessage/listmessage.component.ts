import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-listmessage',
  templateUrl: './listmessage.component.html',
  styleUrls: ['./listmessage.component.css']
})
export class ListmessageComponent implements OnInit {
  contacts: Contact[] = [];
  errorMessage: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts(); // Charger tous les contacts au démarrage
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des contacts', error);
        this.errorMessage = 'Une erreur est survenue lors du chargement des contacts.';
      }
    );
  }

  deleteContact(id: number | undefined): void {
    if (id !== undefined) {
      this.contactService.deleteContact(id).subscribe(
        () => {
          // Après suppression, on recharge la liste des contacts
          this.loadContacts();
        },
        (error) => {
          console.error('Erreur lors de la suppression du contact', error);
          this.errorMessage = 'Une erreur est survenue lors de la suppression du contact.';
        }
      );
    } else {
      console.error('ID de contact manquant');
      this.errorMessage = 'ID de contact manquant';
    }
  }
}
