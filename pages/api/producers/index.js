import { createRouter } from "next-connect";
import controller from "infra/controller";
import producer from "models/producer";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const producersFound = await producer.listAll();
  response.status(200).json(producersFound);
}

async function postHandler(request, response) {
  const producerInputValues = request.body;
  const newProducer = await producer.create(producerInputValues);
  response.status(201).json(newProducer);
}
