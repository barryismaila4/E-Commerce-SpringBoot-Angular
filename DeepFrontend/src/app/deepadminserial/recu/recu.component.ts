import { Component, OnInit } from '@angular/core';
import { Recu } from 'src/app/models/recu.model';
import { RecuService } from 'src/app/services/recu.service';


@Component({
  selector: 'app-recu',
  templateUrl: './recu.component.html',
  styleUrls: ['./recu.component.css']
})
export class RecuComponent implements OnInit {
  recus: Recu[] = [];
  newRecu: Recu = new Recu(0, 0, new Date(), ''); // Initialisation d'un nouveau reçu

  montantFilter: number | null = null;
  descriptionFilter: string = '';
  startDateFilter: Date | null = null;
  endDateFilter: Date | null = null;

  constructor(private recuService: RecuService) {}

  ngOnInit(): void {
    this.getAllRecus();  // Appel pour récupérer tous les reçus
  }

  // Récupérer tous les reçus
  getAllRecus(): void {
    this.recuService.getAllRecus().subscribe((data) => {
      this.recus = data;
    });
  }

  // Créer un nouveau reçu
  createRecu(): void {
    this.recuService.createRecu(this.newRecu).subscribe((data) => {
      this.recus.push(data);  // Ajouter le nouveau reçu à la liste
      this.newRecu = new Recu(0, 0, new Date(), ''); // Réinitialiser le formulaire
    });
  }

  // Supprimer un reçu
  deleteRecu(id: number): void {
    this.recuService.deleteRecu(id).subscribe(() => {
      this.recus = this.recus.filter(recu => recu.id !== id);  // Retirer le reçu de la liste
    });
  }

  // Mettre à jour un reçu
  updateRecu(id: number): void {
    const updatedRecu: Recu = new Recu(id, 100, new Date(), 'Description mise à jour');
    this.recuService.updateRecu(id, updatedRecu).subscribe((data) => {
      const index = this.recus.findIndex(recu => recu.id === id);
      if (index !== -1) {
        this.recus[index] = data;  // Mettre à jour le reçu dans la liste
      }
    });
  }

  // Récupérer les reçus par montant
  filterByMontant(): void {
    if (this.montantFilter !== null) {
      this.recuService.getRecusByMontant(this.montantFilter).subscribe((data) => {
        this.recus = data;
      });
    }
  }

  // Récupérer les reçus par description
  filterByDescription(): void {
    if (this.descriptionFilter) {
      this.recuService.getRecusByDescription(this.descriptionFilter).subscribe((data) => {
        this.recus = data;
      });
    }
  }

  // Récupérer les reçus par date
  filterByDate(): void {
    if (this.startDateFilter && this.endDateFilter) {
      this.recuService.getRecusByDateBetween(this.startDateFilter, this.endDateFilter).subscribe((data) => {
        this.recus = data;
      });
    }
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.montantFilter = null;
    this.descriptionFilter = '';
    this.startDateFilter = null;
    this.endDateFilter = null;
    this.getAllRecus(); // Réinitialiser la liste des reçus
  }
}
