import { ProductModel } from "./models/ProductModel";
import { CartModel } from "./models/CartModel";
import { ProductView } from "./views/ProductView";
import { CartView } from "./views/CartView";
import { ProductController } from "./controllers/ProductController";
import { CartController } from "./controllers/CartController";

async function main() {
  const productModel = new ProductModel();
  const cartModel = new CartModel();

  const cartView = new CartView("cart-container", (productId, quantity) => {
    cartController.updateQuantity(productId, quantity);
  });
  const cartController = new CartController(cartModel, cartView);
  cartController.init();

  const productView = new ProductView("products-container", (product) => {
    cartController.addProduct(product);
  });

  const productController = new ProductController(
    productModel,
    productView,
    cartController
  );
  await productController.init();
}

main();
