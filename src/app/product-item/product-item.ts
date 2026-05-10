import { CurrencyPipe, KeyValue, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CartService } from '../services/cart';
import {
  defaultAlert,
  Product,
  ProductAlertType,
  ProductsService,
  ProductType,
} from '../services/products';

@Component({
  selector: 'app-product-item',
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  selected: number = 1;
  numbers: number[] = [];
  pathToImage: string = '';

  // Any component that uses this component must provide a product as input
  @Input() prod: KeyValue<number, Product> | undefined;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    if (this.prod) {
      const maxSize: number = Math.min(5, this.prod.value.currentQuantity);
      this.numbers = Array.from({ length: maxSize }, (_, i) => i + 1);
      this.pathToImage = this.imagePath();
      this.logger.debug('pathToImage=', this.pathToImage);
    } else {
      this.logger.error('Error, component must be provided a product as input');
    }
  }

  private generateHash(nameId: string): number {
    // Generates a repeteable-random non-negative integer value based on
    // the string s, which is the concatenation of product name and id.

    /*
     * STUDENTS MUST WRITE CODE FOR THIS FUNCTION
     */

    let hash: number = 2;
    return hash;
  }

  // Calculates image number for this specific product.
  // For example, a specific guitar may use image 3 of 7 for its image.
  private imageNum() {
    // Generate a hash number based on product name and id
    const prodValue = this.prod!.value;
    const name = prodValue.name;
    const id = prodValue.id;
    const nameId = name + id.toString();
    const hash = this.generateHash(nameId);

    // Maps product type -> number of images for each product type in public/images
    const numImagesMap: Record<ProductType, number> = {
      [ProductType.Guitar]: 7,
      [ProductType.Strings]: 6,
      [ProductType.Pick]: 5,
      [ProductType.Strap]: 7,
    };

    // Calculate image number for product
    const numImages = numImagesMap[prodValue.type];
    const imageNum = hash % numImages!;

    return imageNum;
  }

  // Maps a product to an image path
  imagePath(): string {
    const num = this.imageNum().toString();
    const prodValue = this.prod!.value;
    const imageName = prodValue.type.toString();

    const res = `images/${imageName}/${imageName}${num}.png`;
    return res;
  }

  onQuantitySelect(value: number) {
    this.selected = value;
  }

  // if the user clicks "Add to Cart" button, make sure there are enough items in stock
  // by checking the selected quantity against currentQuantity - quantity currently in cart
  availableQuantity(): boolean {
    const currentQuantity = this.prod!.value.currentQuantity;
    const inCartQuantity = this.cartService.findItem(this.prod!.value.id)?.quantity ?? 0;
    const availableQuantity = currentQuantity - inCartQuantity;
    const res = this.selected <= availableQuantity;
    return res;
  }

  addErrorMessage() {
    const name = this.prod!.value.name;
    const quantityInCart = this.cartService.quantity(this.prod!.value.id);
    const available = this.prod!.value.currentQuantity;
    let canAdd = available - quantityInCart;
    if (canAdd < 0) {
      canAdd = 0;
    }
    const msg = `Unable to add ${this.selected} ${this.prod!.value.name} to cart. ${
      this.prod!.value.currentQuantity
    } are in stock, and ${this.cartService.quantity(
      this.prod!.value.id
    )} are already in your cart. You can add up to ${canAdd} more.`;
    this.productsService.message = { show: true, type: ProductAlertType.Danger, text: msg };
    this.logger.error(msg);
  }

  onAddToCart() {
    // Check if there is enough quantity available to add to cart
    if (!this.availableQuantity()) {
      this.addErrorMessage();
      return;
    }

    // Add item to cart
    this.logger.debug(`Adding ${this.selected} ${this.prod!.value.name} to cart`);
    this.cartService.add(this.prod!.value.id, this.selected);
    this.productsService.message = defaultAlert;
  }
}
