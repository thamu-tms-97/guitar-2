import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductItem } from '../product-item/product-item';
import { Product, ProductsService, ProductType } from '../services/products';

@Component({
  selector: 'app-guitar',
  imports: [RouterModule, KeyValuePipe, ProductItem],
  templateUrl: './guitar.html',
  styleUrl: './guitar.css',
})
export class Guitar {
  constructor(private productsService: ProductsService) {}

  products: Map<number, Product> | undefined;

  ngOnInit() {
    this.products = this.productsService.filterByType(this.productsService.products, ProductType.Guitar);
  }

  get message() {
    return this.productsService.message;
  }

  clearErrorMessage() {
    this.productsService.clearErrorMessage();
  }
}
