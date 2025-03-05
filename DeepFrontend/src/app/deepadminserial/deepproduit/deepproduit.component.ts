import { Component, OnInit } from '@angular/core';
import { DeepProduit } from 'src/app/models/deep-produit.model';
import { DeepProduitService } from 'src/app/services/deep-produit.service';
import { DeepCategory } from 'src/app/models/deep-category.model';
import { DeepCategoryService } from 'src/app/services/deep-category.service';

@Component({
  selector: 'app-deepproduit',
  templateUrl: './deepproduit.component.html',
  styleUrls: ['./deepproduit.component.css']
})
export class DeepproduitComponent implements OnInit {
  produits: DeepProduit[] = [];
  categories: DeepCategory[] = [];
  produitsRecherche: DeepProduit[] = [];  // Liste pour afficher les résultats de la recherche
  newProduit: DeepProduit = { 
    name: '', 
    description: '', 
    prix: 0, 
    category: undefined,
    code: ''  // Ajout du champ code
  };

  selectedProduit: DeepProduit | null = null;
  selectedImage: File | null = null;
  searchCode: string = '';  // Champ de recherche par code
  searchName: string = '';  // Champ de recherche par nom

  constructor(private produitService: DeepProduitService, private categoryService: DeepCategoryService) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
  }

  loadProduits(): void {
    this.produitService.getAllProduits().subscribe(
      (data) => {
        this.produits = data.map(produit => ({
          ...produit,
          image: produit.image ? `data:image/jpeg;base64,${produit.image}` : null
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  addProduit(): void {
    if (!this.newProduit.category || !this.newProduit.category.id) {
      console.error('Veuillez sélectionner une catégorie.');
      return;
    }

    if (!this.newProduit.code || this.newProduit.code.trim() === '') {
      console.error('Veuillez entrer un code produit.');
      return;
    }

    if (this.selectedImage) {
      this.produitService.createProduit(this.newProduit, this.selectedImage).subscribe(
        (data) => {
          this.produits.push(data);
          this.newProduit = { name: '', description: '', prix: 0, category: undefined, code: '' };
          this.selectedImage = null;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
        }
      );
    } else {
      console.error('Veuillez sélectionner une image.');
    }
  }

  editProduit(produit: DeepProduit): void {
    this.selectedProduit = { ...produit, category: produit.category || undefined };
  }

  updateProduit(): void {
    if (!this.selectedProduit || !this.selectedProduit.category?.id) {
      console.error('Erreur: Produit ou catégorie non valide.');
      return;
    }

    if (!this.selectedProduit.code || this.selectedProduit.code.trim() === '') {
      console.error('Veuillez entrer un code produit.');
      return;
    }

    this.produitService.updateProduit(this.selectedProduit.id!, this.selectedProduit, this.selectedImage ?? undefined).subscribe(
      (data) => {
        const index = this.produits.findIndex(prod => prod.id === data.id);
        if (index !== -1) {
          this.produits[index] = data;
        }
        this.selectedProduit = null;
        this.selectedImage = null;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
      }
    );
  }

  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(
      () => {
        this.produits = this.produits.filter(prod => prod.id !== id);
      },
      ( error) => {
        console.error('Erreur lors de la suppression du produit', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Recherche d'un produit par code
  searchProduitByCode(): void {
    if (this.searchCode.trim()) {
      this.produitService.searchProduitByCode(this.searchCode).subscribe(
        (data) => {
          if (data) {
            this.produitsRecherche = [data];  // Si un seul produit est trouvé, on le place dans la liste
          } else {
            this.produitsRecherche = [];  // Aucun produit trouvé
            console.log('Aucun produit trouvé avec ce code.');
          }
        },
        (error) => {
          console.error('Erreur lors de la recherche par code', error);
        }
      );
    } else {
      console.log('Veuillez entrer un code pour la recherche.');
    }
  }

  // Recherche de produits par nom
  searchProduitsByName(): void {
    if (this.searchName.trim()) {
      this.produitService.searchProduitsByName(this.searchName).subscribe(
        (data) => {
          this.produitsRecherche = data;  // Met à jour la liste avec les produits trouvés
        },
        (error) => {
          console.error('Erreur lors de la recherche par nom', error);
        }
      );
    } else {
      console.log('Veuillez entrer un nom pour la recherche.');
    }
  }
}