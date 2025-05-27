import { CartItem } from "../types/cart.types";

export class StorageService {
  private static CART_KEY = "cart";

  static saveCart(cart: CartItem[]) {
    localStorage.setItem(StorageService.CART_KEY, JSON.stringify(cart));
  }

  static loadCart(): CartItem[] {
    const data = localStorage.getItem(StorageService.CART_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as CartItem[];
    } catch {
      return [];
    }
  }
}
