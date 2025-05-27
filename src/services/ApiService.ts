import { Product } from "../types/product.types";

export class ApiService {
  private static API_URL = "https://fakestoreapi.com/products";

  static async fetchProducts(): Promise<Product[]> {
    const response = await fetch(ApiService.API_URL);
    if (!response.ok) throw new Error("Ошибка загрузки товаров");
    return response.json();
  }
}
