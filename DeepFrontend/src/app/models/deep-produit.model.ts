import { DeepCategory } from './deep-category.model';

export interface DeepProduit {
    id?: number;
    name: string;
    description: string;
    prix: number;
    code: string; // Ajout du champ `code`
    image?: any; // Pour gérer l'image en base64
    category?: DeepCategory; // Ajout d'un `?` pour éviter les erreurs d'accès à `id`
}
