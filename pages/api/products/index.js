import { createRouter } from "next-connect";
import controller from "infra/controller";
import product from "models/product";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const productsFound = await product.listAll();
  response.status(200).json(productsFound);
}

async function postHandler(request, response) {
  const productInputValues = request.body;

  const newProduct = await product.create(productInputValues);
  response.status(201).json(newProduct);
}
