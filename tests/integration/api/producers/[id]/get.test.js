import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/producers/[id]", () => {
  describe("Anonymous user", () => {
    test("With existent id", async () => {
      const createdProducer = await orchestrator.createProducer();

      const response = await fetch(
        `http://localhost:3000/api/producers/${createdProducer.id}`,
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdProducer.id,
        name: createdProducer.name,
        location: createdProducer.location,
        phone: createdProducer.phone,
        created_at: createdProducer.created_at.toISOString(),
        updated_at: createdProducer.updated_at.toISOString(),
      });
    });

    test("With non-existent id", async () => {
      const response = await fetch("http://localhost:3000/api/producers/42");
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
