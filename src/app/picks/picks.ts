import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductItem } from '../product-item/product-item';
import { Product, ProductsService, ProductType } from '../services/products';

@Component({
  selector: 'app-picks',
  imports: [RouterModule, KeyValuePipe, ProductItem],
  templateUrl: './picks.html',
  styleUrl: './picks.css',
})
export class Picks {
  constructor(private productsService: ProductsService) {}

  products: Map<number, Product> | undefined;

  ngOnInit() {
    this.products = this.productsService.filterByType(
      this.productsService.products,
      ProductType.Pick,
    );
  }

  get message() {
    return this.productsService.message;
  }

  clearErrorMessage() {
    this.productsService.clearErrorMessage();
  }
}
