import { CartItem } from "../types/cart.types";
import { Product } from "../types/product.types";
import { StorageService } from "../services/StorageService";

export class CartModel {
  private cartItems: CartItem[] = [];

  constructor() {
    this.cartItems = StorageService.loadCart();
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addProduct(product: Product) {
    const item = this.cartItems.find((i) => i.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.save();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.cartItems = this.cartItems.filter((i) => i.product.id !== productId);
    } else {
      const item = this.cartItems.find((i) => i.product.id === productId);
      if (item) item.quantity = quantity;
    }
    this.save();
  }

  getTotalSum(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  private save() {
    StorageService.saveCart(this.cartItems);
  }
}
