import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/items/[id]", () => {
  describe("Anonymous user", () => {
    test("With new name", async () => {
      const createdItem = await orchestrator.createItem();
      const response = await fetch(
        `http://localhost:3000/api/items/${createdItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "New Item Name",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdItem.id,
        name: "New Item Name",
        description: createdItem.description,
        price: createdItem.price,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new description", async () => {
      const createdItem = await orchestrator.createItem();
      const response = await fetch(
        `http://localhost:3000/api/items/${createdItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: "This is the new item description",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdItem.id,
        name: createdItem.name,
        description: "This is the new item description",
        price: createdItem.price,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new description", async () => {
      const createdItem = await orchestrator.createItem();
      const response = await fetch(
        `http://localhost:3000/api/items/${createdItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: 4.2,
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdItem.id,
        name: createdItem.name,
        description: createdItem.description,
        price: "4.20",
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With non-existent id", async () => {
      const response = await fetch("http://localhost:3000/api/items/42", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Non Existent ID",
          description: "This item should not exists",
          price: 0.0,
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
