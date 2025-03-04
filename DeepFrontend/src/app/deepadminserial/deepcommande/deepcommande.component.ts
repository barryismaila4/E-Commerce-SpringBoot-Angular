import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/Commande';
import { CommandeService } from 'src/app/services/commande.service';


@Component({
  selector: 'app-deepcommande',
  templateUrl: './deepcommande.component.html',
  styleUrls: ['./deepcommande.component.css']
})
export class DeepcommandeComponent implements OnInit {

  commandes: Commande[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe(
      (commandes) => {
        this.commandes = commandes;
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes', error);
        this.errorMessage = 'Erreur lors du chargement des commandes.';
      }
    );
  }

  deleteCommande(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.commandeService.deleteCommande(id).subscribe(
        () => {
          this.successMessage = 'Commande supprimée avec succès.';
          this.errorMessage = '';
          this.loadCommandes(); // Refresh the list after deletion
          setTimeout(() => {
            this.successMessage = ''; // Clear the success message after a delay
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la commande', error);
          this.errorMessage = 'Erreur lors de la suppression de la commande.';
          this.successMessage = '';
        }
      );
    }
  }
}

