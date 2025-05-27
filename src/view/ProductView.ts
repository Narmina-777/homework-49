import { Product } from "../types/product.types";

export class ProductView {
  private container: HTMLElement;
  private onAddToCart: (product: Product) => void;

  constructor(containerId: string, onAddToCart: (product: Product) => void) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error("Product container not found");
    this.container = el;
    this.onAddToCart = onAddToCart;
  }

  render(products: Product[]) {
    // Очищаем контейнер, кроме заголовка
    this.container.innerHTML = "<h2>Товары</h2>";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.price.toFixed(2)} ₽</p>
        <button>В корзину</button>
      `;

      const btn = card.querySelector("button")!;
      btn.addEventListener("click", () => this.onAddToCart(product));

      this.container.appendChild(card);
    });
  }
}
