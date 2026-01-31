import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/items/[id]", () => {
  describe("Anonymous user", () => {
    test("With existent id", async () => {
      const createdItem = await orchestrator.createItem();

      const response = await fetch(
        `http://localhost:3000/api/items/${createdItem.id}`,
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdItem.id,
        name: createdItem.name,
        description: createdItem.description,
        price: createdItem.price,
        created_at: createdItem.created_at.toISOString(),
        updated_at: createdItem.updated_at.toISOString(),
      });
    });

    test("With non-existent id", async () => {
      const createdItem = await orchestrator.createItem();

      const response = await fetch("http://localhost:3000/api/items/42");
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "The provided id was not found in the system.",
        action: "Check if the id is typed correctly.",
        status_code: 404,
      });
    });
  });
});
