import { CartItem } from "../types/cart.types";

export class CartView {
  private container: HTMLElement;
  private onUpdateQuantity: (productId: number, quantity: number) => void;

  constructor(
    containerId: string,
    onUpdateQuantity: (productId: number, quantity: number) => void
  ) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error("Cart container not found");
    this.container = el;
    this.onUpdateQuantity = onUpdateQuantity;
  }

  render(cartItems: CartItem[], totalSum: number) {
    this.container.innerHTML = "<h2>Корзина</h2>";

    if (cartItems.length === 0) {
      this.container.innerHTML += "<p>Корзина пуста</p>";
      return;
    }

    const list = document.createElement("ul");
    list.className = "cart-list";

    cartItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";

      li.innerHTML = `
        <img src="${item.product.image}" alt="${
        item.product.title
      }" class="cart-image" />
        <div>
          <p>${item.product.title}</p>
          <p>${item.product.price.toFixed(2)} ₽ x ${item.quantity} = ${(
        item.product.price * item.quantity
      ).toFixed(2)} ₽</p>
          <button class="btn-dec">-</button>
          <span>${item.quantity}</span>
          <button class="btn-inc">+</button>
          <button class="btn-remove">Удалить</button>
        </div>
      `;

      li.querySelector(".btn-dec")!.addEventListener("click", () =>
        this.onUpdateQuantity(item.product.id, item.quantity - 1)
      );
      li.querySelector(".btn-inc")!.addEventListener("click", () =>
        this.onUpdateQuantity(item.product.id, item.quantity + 1)
      );
      li.querySelector(".btn-remove")!.addEventListener("click", () =>
        this.onUpdateQuantity(item.product.id, 0)
      );

      list.appendChild(li);
    });

    this.container.appendChild(list);

    const totalEl = document.createElement("p");
    totalEl.textContent = `Итоговая сумма: ${totalSum.toFixed(2)} ₽`;
    this.container.appendChild(totalEl);
  }
}
