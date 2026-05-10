import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Product, ProductType } from './product';

// Maps product type -> number of products of each type
const maxQuantity: Record<ProductType, number> = {
  [ProductType.Guitar]: 33,
  [ProductType.Pick]: 25,
  [ProductType.Strap]: 30,
  [ProductType.Strings]: 10,
};

// Total number of products
const nProducts = Object.values(maxQuantity).reduce((sum, max) => sum + max, 0);

// Current count of products of each type
const count: Record<ProductType, number> = {
  [ProductType.Guitar]: 0,
  [ProductType.Pick]: 0,
  [ProductType.Strap]: 0,
  [ProductType.Strings]: 0,
};

enum ProductAlertType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

interface Alert {
  show: boolean;
  type: ProductAlertType;
  text: string;
}

const defaultAlert: Alert = {
  show: false,
  type: ProductAlertType.Info,
  text: '',
};

// Angular service which is a singleton to manage products data that can be used any component
@Injectable({
  providedIn: 'root',
})
class ProductsService {
  private _products: Map<number, Product> = new Map();

  // Message from components to be displayed globally
  private _message: Alert = defaultAlert;

  // Getters and setters
  get products() {
    return this._products;
  }

  get message() {
    return this._message;
  }

  set message(msg: Alert) {
    this._message = msg;
  }

  constructor() {
    this.setFakeProducts();
  }

  clearErrorMessage() {
    this._message = defaultAlert;
  }

  // Return a products map filtered by product type
  filterByType(products: Map<number, Product>, type: ProductType): Map<number, Product> {
    const filtered = new Map([...products].filter(([key, product]) => product.type === type));
    return filtered;
  }

  randomNumber(min: number, max: number) {
    return parseFloat((min + Math.random() * (max - min)).toFixed(2));
  }

  private randomProductType() {
    // randomly pick a type while count < maxCount
    const values = Object.values(ProductType);

    // while count < maxCount
    let found = false;
    while (!found) {
      const randomIndex = Math.floor(Math.random() * values.length);
      const type = values[randomIndex];
      if (count[type] < maxQuantity[type]) {
        // increment count
        count[type] += 1;
        return type;
      }
    }

    // should never reach here, if we do pick something
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  private randomPrice(type: ProductType) {
    // Maps product type -> min, max range
    const minMax: Record<ProductType, [number, number]> = {
      [ProductType.Guitar]: [700, 2000],
      [ProductType.Pick]: [7.5, 40.0],
      [ProductType.Strap]: [120, 1000],
      [ProductType.Strings]: [40, 200],
    };

    const [minVal, maxVal] = minMax[type];
    const res = this.randomNumber(minVal, maxVal);
    return res;
  }

  setFakeProducts() {
    for (let i = 0; i < nProducts; i++) {
      const name = faker.animal.rabbit() + ' ' + faker.music.genre();
      const type = this.randomProductType();
      const price = this.randomPrice(type);
      const quantity = Math.floor(this.randomNumber(1, maxQuantity[type]));
      const product = new Product(i, name, type, price, quantity);
      this.products.set(product.id, product);
    }
  }
}

export { defaultAlert, Product, ProductAlertType, ProductsService, ProductType };
