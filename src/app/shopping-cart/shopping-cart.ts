import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ProductItem } from '../product-item/product-item';
import { CartService } from '../services/cart';
import { CartItem } from '../services/cartItem';
import { Product, ProductsService } from '../services/products';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterModule, KeyValuePipe, CurrencyPipe, ProductItem],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private logger: NGXLogger,
  ) {}

  products: Map<number, Product> = new Map<number, Product>();
  cart: CartItem[] = [];

  ngOnInit() {
    const allProducts = this.productsService.products;
    this.cart = this.cartService.cart;

    if (allProducts && this.cart) {
      for (const [id, product] of allProducts) {
        if (this.cart.some((item) => item.productId === id)) {
          this.products.set(id, product);
        }
      }
    } else {
      this.logger.error('Products or cart is undefined in ShoppingCart component');
    }
  }

  quantity(productId: number): number {
    return this.cartService.quantity(productId);
  }

  productSubtotal(productId: number): number {
    const product = this.productsService.products.get(productId);

    if (!product) {
      return 0;
    }

    return product.price * this.quantity(productId);
  }

  subtotal(): number {
    let total = 0;

    for (const item of this.cartService.cart) {
      total += this.productSubtotal(item.productId);
    }

    return total;
  }

  tax(): number {
    return this.subtotal() * 0.0925;
  }

  total(): number {
    return this.subtotal() + this.tax();
  }

  processOrder() {
    for (const item of this.cartService.cart) {
      const product = this.productsService.products.get(item.productId);

      if (product) {
        product.currentQuantity -= item.quantity;
      }
    }

    this.cartService.cart.length = 0;
    this.products.clear();
  }

  orderPlaced() {
    this.processOrder();
    this.router.navigate(['/order-placed']);
  }
}
