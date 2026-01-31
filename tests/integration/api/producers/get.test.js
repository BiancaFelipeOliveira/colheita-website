import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/producers", () => {
  describe("Anonymous user", () => {
    test("With empty database", async () => {
      const response = await fetch("http://localhost:3000/api/producers");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual([]);
    });

    test("With non-empty database", async () => {
      const createdProducer = await orchestrator.createProducer();

      const response = await fetch("http://localhost:3000/api/producers");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual([
        {
          id: createdProducer.id,
          name: createdProducer.name,
          location: createdProducer.location,
          phone: createdProducer.phone,
          created_at: createdProducer.created_at.toISOString(),
          updated_at: createdProducer.updated_at.toISOString(),
        },
      ]);
    });
  });
});
