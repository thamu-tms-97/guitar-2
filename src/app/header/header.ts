import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart';
import { CartItem } from '../services/cartItem';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cart: CartItem[];
  constructor(protected cartService: CartService) {
    this.cart = this.cartService.cart;
  }
}
