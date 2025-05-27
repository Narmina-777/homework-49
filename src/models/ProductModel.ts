import { Product } from "../types/product.types";
import { ApiService } from "../services/ApiService";

export class ProductModel {
  private products: Product[] = [];

  async loadProducts(): Promise<void> {
    this.products = await ApiService.fetchProducts();
  }

  getAll(): Product[] {
    return this.products;
  }
}
