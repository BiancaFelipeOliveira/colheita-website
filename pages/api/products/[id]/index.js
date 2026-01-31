import { createRouter } from "next-connect";
import controller from "infra/controller";
import product from "models/product";

const router = createRouter();

router.get(getHandler);
router.patch(patchHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const id = request.query.id;
  const productFound = await product.findOneById(id);
  response.status(200).json(productFound);
}

async function patchHandler(request, response) {
  const id = request.query.id;
  const productInputValues = request.body;

  const updatedProduct = await product.update(id, productInputValues);
  response.status(200).json(updatedProduct);
}

async function deleteHandler(request, response) {
  const id = request.query.id;
  await product.deleteProduct(id);

  response.status(204).end();
}
