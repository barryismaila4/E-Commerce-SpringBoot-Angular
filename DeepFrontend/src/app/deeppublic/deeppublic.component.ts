import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeepCategoryService } from '../services/deep-category.service';
import { DeepProduitService } from '../services/deep-produit.service';
import { CommandeService } from '../services/commande.service';
import { DeepCategory } from '../models/deep-category.model';
import { DeepProduit } from '../models/deep-produit.model';
import { Commande } from '../models/Commande';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-deeppublic',
  templateUrl: './deeppublic.component.html',
  styleUrls: ['./deeppublic.component.css']
})
export class DeeppublicComponent implements OnInit {
  categories: DeepCategory[] = [];
  produits: DeepProduit[] = [];
  searchTerm: string = '';
  isChatbotVisible: boolean = false;
  isProductVisible: boolean = true;
  isContactVisible: boolean = false;
  isCodeFormVisible: boolean = false;
  code: string = '';
  errorMessage: string = '';
  produitByCode: DeepProduit | null = null;
  selectedProduit: DeepProduit | null = null;
  isCartVisible: boolean = false;
  isOrderFormVisible: boolean = false;

  nom: string = '';
  prenom: string = '';
  email: string = '';
  numero: string = '';
  ville: string = '';
  adresse: string = '';
  codePostal: string = '';

  constructor(
    private categoryService: DeepCategoryService,
    private produitService: DeepProduitService,
    private router: Router,
    private cartService: CartService,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProduits();
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

  loadProduits(): void {
    this.produitService.getAllProduits().subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  showOrderForm(): void {
    this.isOrderFormVisible = !this.isOrderFormVisible;
  }

  searchCategory(): void {
    if (this.searchTerm.trim()) {
      this.categoryService.getCategoryByName(this.searchTerm).subscribe(
        (data) => this.categories = data,
        (error) => console.error('Erreur lors de la recherche', error)
      );
    } else {
      this.loadCategories();
    }
  }

  showProduitsByCategory(categoryId: number): void {
    this.produitService.searchProduitsByCategoryId(categoryId).subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors de la recherche des produits', error);
      }
    );
  }

  searchProduitsByName(name: string): void {
    if (!name.trim()) {
      this.loadProduits();
      return;
    }

    this.produitService.searchProduitsByName(name).subscribe(
      (data) => {
        console.log('Résultats trouvés :', data);
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors de la recherche des produits', error);
      }
    );
  }

  toggleChatbot(): void {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

  showContactForm(): void {
    this.isContactVisible = true;
    this.isProductVisible = false;
    this.toggleAbout();  // Ajout de cette ligne pour fermer la section "À Propos"
  }
  

  showProducts(): void {
    this.isContactVisible = false;
    this.isProductVisible = true;
  }

  toggleCodeForm(): void {
    this.isCodeFormVisible = !this.isCodeFormVisible;
  }

  checkCode(): void {
    const validCodes = ['AmadouDialloDeepBarry', 'IsmailaBarryDeepDiallo'];
    if (validCodes.includes(this.code)) {
      this.router.navigate(['/deepadminserial']);
    } else {
      this.errorMessage = 'Code incorrect, veuillez réessayer.';
    }
  }

  searchProduitByCode(): void {
    if (this.code.trim()) {
      this.produitService.searchProduitByCode(this.code).subscribe(
        (data) => {
          this.produitByCode = data;
          this.produits = [data];
        },
        (error) => {
          console.error('Erreur lors de la recherche du produit par code', error);
          this.errorMessage = 'Produit non trouvé avec ce code.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez entrer un code valide.';
    }
  }

  showProduitDetails(produit: DeepProduit): void {
    this.selectedProduit = produit;
  }

  hideProduitDetails(): void {
    this.selectedProduit = null;
  }

  addToCart(produit: DeepProduit): void {
    if (produit.id !== undefined) {
      this.cartService.addToCart({
        id: produit.id,
        name: produit.name,
        price: produit.prix,
        code: produit.code,
        quantity: 1
      });
      console.log('Produit ajouté au panier:', produit);
    } else {
      console.error('Produit sans ID, impossible de l\'ajouter au panier');
    }
  }

  getCartItems() {
    return this.cartService.getCartItems();
  }

  calculateTotal() {
    return this.cartService.calculateTotal();
  }

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }
  placeOrder(): void {
    // Validation de la saisie
    if (this.nom.trim() === '' || this.prenom.trim() === '' || this.email.trim() === '' || this.numero.trim() === '' || this.ville.trim() === '' || this.adresse.trim() === '' || this.codePostal.trim() === '') {
        alert('Veuillez remplir tous les champs avant de valider votre commande.');
        return; // Stopper l'exécution si des champs sont manquants
    }

    const panier = JSON.stringify(this.getCartItems());

    const commande = new Commande(
      this.nom,
      this.prenom,
      this.email,
      this.numero,
      this.ville,
      this.adresse,
      this.codePostal,
      panier
    );

    // Envoi de la commande
    this.commandeService.createCommande(commande).subscribe(
      (response) => {
        console.log('Commande passée avec succès:', response);

        // Afficher un message de confirmation
        alert('Commande validée! Vous allez recevoir une confirmation par email.');

        // Réinitialiser le panier et le formulaire
        this.resetCartAndForm();
      },
      (error) => {
        console.error('Erreur lors de la commande:', error);
        alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
      }
    );
  }
  isAboutVisible: boolean = false; // Variable pour contrôler la visibilité de la section About Us

  // Méthode pour afficher ou masquer la section About Us
  toggleAbout(): void {
    this.isAboutVisible = !this.isAboutVisible;
  }

  resetCartAndForm(): void {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.numero = '';
    this.ville = '';
    this.adresse = '';
    this.codePostal = '';
    this.cartService.clearCart();
    this.isOrderFormVisible = false;
    this.isCartVisible = false;
  }
}

