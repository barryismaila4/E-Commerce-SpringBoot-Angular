import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  // Ajouter un produit au panier
  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;  // Si l'élément existe, incrémenter la quantité
    } else {
      this.cart.push({ ...item, quantity: 1 });  // Sinon, ajouter un nouvel élément avec une quantité de 1
    }
  }

  // Retourner les éléments du panier
  getCartItems(): CartItem[] {
    return this.cart;
  }

  // Calculer le total du panier
  calculateTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Vider le panier
  clearCart(): void {
    this.cart = [];
  }

  // Retourner le nombre total d'articles dans le panier
  getCartItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
