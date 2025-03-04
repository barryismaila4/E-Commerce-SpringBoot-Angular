// deep-category.model.ts
import { DeepProduit } from './deep-produit.model';

export interface DeepCategory {
    id?: number; // Optionnel pour les nouvelles catégories
    name: string;
    produits?: DeepProduit[]; // Optionnel, car cela peut ne pas être toujours chargé
}