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
    private logger: NGXLogger
  ) {}

  products: Map<number, Product> = new Map<number, Product>();
  cart: CartItem[] = [];

  ngOnInit() {
    const allProducts = this.productsService.products;
    this.cart = this.cartService.cart;

    if (allProducts && this.cart) {
      for (const [id, product] of allProducts) {
        // Check if cart contains a CartItem with this product id
        if (this.cart.some((item) => item.productId === id)) {
          this.products.set(id, product);
        }
      }
    } else {
      this.logger.error('Products or cart is undefined in ShoppingCart component');
    }
  }

  quantity(productId: number): number {
    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */
    let res = 222;
    return res;
  }

  productSubtotal(productId: number): number {
    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */
    let res = 333;
    return res;
  }

  subtotal(): number {
    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */
    let total = 123.45;
    return total;
  }

  tax(): number {
    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */
    return 543.21;
  }

  total(): number {
    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */
    let res = 999.99;
    return res;
  }

  processOrder() {}

  orderPlaced() {
    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */
  }
}
