// src/app/deepcategory/deepcategory.component.ts
import { Component, OnInit } from '@angular/core';
import { DeepCategory } from 'src/app/models/deep-category.model';
import { DeepCategoryService } from 'src/app/services/deep-category.service';

@Component({
  selector: 'app-deepcategory',
  templateUrl: './deepcategory.component.html',
  styleUrls: ['./deepcategory.component.css']
})
export class DeepcategoryComponent implements OnInit {
  categories: DeepCategory[] = [];
  newCategory: DeepCategory = { name: '' }; // Pour ajouter une nouvelle catégorie
  selectedCategory: DeepCategory | null = null; // Pour modifier une catégorie

  constructor(private categoryService: DeepCategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
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

  addCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe(
      (data) => {
        this.categories.push(data);
        this.newCategory = { name: '' }; // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
      }
    );
  }

  editCategory(category: DeepCategory): void {
    this.selectedCategory = { ...category }; // Créer une copie pour l'édition
  }

  updateCategory(): void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory.id!, this.selectedCategory).subscribe(
        (data) => {
          const index = this.categories.findIndex(cat => cat.id === data.id);
          if (index !== -1) {
            this.categories[index] = data; // Mettre à jour la catégorie dans la liste
          }
          this.selectedCategory = null; // Réinitialiser la sélection
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la catégorie', error);
        }
      );
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter(cat => cat.id !== id); // Supprimer de la liste
      },
      (error) => {
        console.error('Erreur lors de la suppression de la catégorie', error);
      }
    );
  }
}