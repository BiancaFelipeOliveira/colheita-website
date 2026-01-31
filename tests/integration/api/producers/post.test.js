import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/producers", () => {
  describe("Anonymous user", () => {
    test("With all parameters", async () => {
      const response = await fetch("http://localhost:3000/api/producers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Producer Name",
          location: "Test",
          phone: "1194231120",
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: 1,
        name: "Producer Name",
        location: "Test",
        phone: "1194231120",
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });

    test("With missing parameters", async () => {
      const response = await fetch("http://localhost:3000/api/producers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Missing Parameters Producer",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Some values are missing.",
        action:
          "You must provide values for name, location and phone.",
        status_code: 400,
      });
    });
  });
});
