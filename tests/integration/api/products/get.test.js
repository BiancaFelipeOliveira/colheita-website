import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/products", () => {
  describe("Anonymous user", () => {
    test("With empty database", async () => {
      const response = await fetch("http://localhost:3000/api/products");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual([]);
    });

    test("With non-empty database", async () => {
      const createdProduct = await orchestrator.createProduct();

      const response = await fetch("http://localhost:3000/api/products");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual([
        {
          id: createdProduct.id,
          name: createdProduct.name,
          category: createdProduct.category,
          price: createdProduct.price,
          description: createdProduct.description,
          quantity: createdProduct.quantity,
          producerId: createdProduct.producerId,
          created_at: createdProduct.created_at.toISOString(),
          updated_at: createdProduct.updated_at.toISOString(),
        },
      ]);
    });
  });
});
