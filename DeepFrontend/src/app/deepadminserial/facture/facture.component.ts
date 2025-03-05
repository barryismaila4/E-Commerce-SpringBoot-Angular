import { Component, ViewChild, ElementRef } from '@angular/core';
import { Produit, Facture } from 'src/app/models/facture';
import { FactureService } from 'src/app/services/facture.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent {
  totalproduit: number = 1; // Valeur initiale
  produits: Produit[] = [];
  facture: Facture | null = null;

  @ViewChild('factureTicket', { static: false }) factureTicket!: ElementRef;

  constructor(private factureService: FactureService) {}

  // Méthode pour ajouter un produit vide
  ajouterProduit(): void {
    this.produits.push(new Produit('', 0, '', 0));
  }

  // Méthode pour créer la facture
  creerFacture(): void {
    this.facture = this.factureService.creerFacture(this.totalproduit, this.produits);
  }

  // Méthode pour télécharger la facture en image (JPG ou PNG)
  telechargerFacture(): void {
    if (this.factureTicket) {
      html2canvas(this.factureTicket.nativeElement).then(canvas => {
        // Convertir l'image en format PNG/JPG
        const imageUrl = canvas.toDataURL('image/png'); // ou 'image/jpeg' pour JPG
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = 'facture.png'; // Le nom du fichier téléchargé
        a.click();
      });
    }
  }
}
