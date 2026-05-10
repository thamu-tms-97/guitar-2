import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductItem } from '../product-item/product-item';
import { Product, ProductsService, ProductType } from '../services/products';

@Component({
  selector: 'app-straps',
  imports: [RouterModule, KeyValuePipe, ProductItem],
  templateUrl: './straps.html',
  styleUrl: './straps.css',
})
export class Straps {
  constructor(private productsService: ProductsService) {}

  products: Map<number, Product> | undefined;

  ngOnInit() {
    this.products = this.productsService.filterByType(
      this.productsService.products,
      ProductType.Strap,
    );
  }

  get message() {
    return this.productsService.message;
  }

  clearErrorMessage() {
    this.productsService.clearErrorMessage();
  }
}
