import { Injectable } from '@angular/core';
import { CartItem } from './cartItem';

// Angular service which is a singleton to manage shopping cart data that can be used any component
@Injectable({
  providedIn: 'root',
})
class CartService {
  // Inorder list of items in the cart
  private _cart: CartItem[] = [];

  constructor() {}

  get cart() {
    return this._cart;
  }

  findItem(productId: number): CartItem | undefined {
    return this._cart.find((item) => item.productId === productId);
  }

  findIndex(productId: number): number {
    return this._cart.findIndex((item) => item.productId === productId);
  }

  // Add a product to the cart. If the product is already in the cart, increase its quantity
  add(productId: number, quantity: number) {
    const index = this.findIndex(productId);

    if (index >= 0) {
      this._cart[index].quantity += quantity;
    } else {
      const newItem = new CartItem(productId, quantity);
      this._cart.push(newItem);
    }
  }

  quantity(productId: number): number {
    const item = this.findItem(productId);
    return item ? item.quantity : 0;
  }

  has(productId: number): boolean {
    return this.findItem(productId) !== undefined;
  }

  // Get the sum total number of items in the cart (not distinct products)
  totalItems(): number {
    let total = 0;
    for (const item of this._cart.values()) {
      total += item.quantity;
    }

    return total;
  }

  // Check if the cart has any items
  length(): number {
    return this._cart.length;
  }
}

export { CartService };
