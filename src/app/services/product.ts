// Product data structure
enum ProductType {
  Guitar = 'guitar',
  Pick = 'pick',
  Strap = 'strap',
  Strings = 'strings',
}

class Product {
  private _id: number;
  private _name: string;
  private _type: ProductType;
  private _price: number;
  private _currentQuantity: number;
  private _initialQuantity: number;

  constructor(id: number, name: string, type: ProductType, price: number, initialQuantity: number = 0) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._price = price;
    this._currentQuantity = initialQuantity;
    this._initialQuantity = initialQuantity;
  }

  // Getters and setters
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get price() {
    return this._price;
  }

  get initialQuantity() {
    return this._initialQuantity;
  }

  get currentQuantity() {
    return this._currentQuantity;
  }

  set currentQuantity(newQuantity: number) {
    this._currentQuantity = newQuantity;
  }
}

export { Product, ProductType };
