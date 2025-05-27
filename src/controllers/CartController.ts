import { CartModel } from "../models/CartModel";
import { CartView } from "../views/CartView";

export class CartController {
  private cartModel: CartModel;
  private cartView: CartView;

  constructor(cartModel: CartModel, cartView: CartView) {
    this.cartModel = cartModel;
    this.cartView = cartView;
  }

  init() {
    this.render();

    // Обработка изменения количества
    this.cartView = new CartView(
      this.cartView["container"].id,
      (productId: number, quantity: number) => {
        this.updateQuantity(productId, quantity);
      }
    );
  }

  addProduct(product: any) {
    this.cartModel.addProduct(product);
    this.render();
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartModel.updateQuantity(productId, quantity);
    this.render();
  }

  private render() {
    this.cartView.render(
      this.cartModel.getItems(),
      this.cartModel.getTotalSum()
    );
  }
}
