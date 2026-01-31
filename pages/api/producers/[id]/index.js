import { createRouter } from "next-connect";
import controller from "infra/controller";
import producer from "models/producer";

const router = createRouter();

router.get(getHandler);
router.patch(patchHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const id = request.query.id;
  const producerFound = await producer.findOneById(id);
  response.status(200).json(producerFound);
}

async function patchHandler(request, response) {
  const id = request.query.id;
  const producerInputValues = request.body;

  const updatedProducer = await producer.update(id, producerInputValues);
  response.status(200).json(updatedProducer);
}

async function deleteHandler(request, response) {
  const id = request.query.id;
  await producer.deleteProducer(id);

  response.status(204).end();
}
