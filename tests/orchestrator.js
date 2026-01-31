import retry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "infra/database";
import migrator from "models/migrator";
import product from "models/product";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/status");

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function createProduct(productObject) {
  return await product.create({
    name: productObject?.name || faker.commerce.product(),
    description:
      productObject?.description || faker.commerce.productDescription(),
    price: productObject?.price || faker.commerce.price(),
  });
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createProduct,
};

export default orchestrator;
