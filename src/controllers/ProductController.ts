import { ProductModel } from "../models/ProductModel";
import { ProductView } from "../views/ProductView";
import { CartController } from "./CartController";

export class ProductController {
  private productModel: ProductModel;
  private productView: ProductView;
  private cartController: CartController;

  constructor(
    productModel: ProductModel,
    productView: ProductView,
    cartController: CartController
  ) {
    this.productModel = productModel;
    this.productView = productView;
    this.cartController = cartController;
  }

  async init() {
    await this.productModel.loadProducts();
    this.productView.render(this.productModel.getAll());
  }
}
