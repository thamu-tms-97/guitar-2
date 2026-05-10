class CartItem {
  private _productId: number;
  private _quantity: number;

  constructor(productId: number, quantity: number) {
    this._productId = productId;
    this._quantity = quantity;
  }

  get productId() {
    return this._productId;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(newQuantity: number) {
    this._quantity = newQuantity;
  }
}

export { CartItem };
