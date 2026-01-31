import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/producers/[id]", () => {
  describe("Anonymous user", () => {
    test("With new name", async () => {
      const createdProducer = await orchestrator.createProducer();
      const response = await fetch(
        `http://localhost:3000/api/producers/${createdProducer.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "New Producer Name",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdProducer.id,
        name: "New Producer Name",
        location: createdProducer.location,
        phone: createdProducer.phone,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new location", async () => {
      const createdProducer = await orchestrator.createProducer();
      const response = await fetch(
        `http://localhost:3000/api/producers/${createdProducer.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: "New Location",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdProducer.id,
        name: createdProducer.name,
        location: "New Location",
        phone: createdProducer.phone,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new phone", async () => {
      const createdProducer = await orchestrator.createProducer();
      const response = await fetch(
        `http://localhost:3000/api/producers/${createdProducer.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: "11945523435",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdProducer.id,
        name: createdProducer.name,
        location: createdProducer.location,
        phone: "11945523435",
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With non-existent id", async () => {
      const response = await fetch("http://localhost:3000/api/producers/42", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Non Existent ID",
          location: "Nowhere",
          phone: "0000000000",
        }),
      });

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
