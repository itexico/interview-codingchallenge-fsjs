import request from "supertest";
import { connectDB, disconnectDB } from "../../src/server/database";
import app from "../../src/server/app";

const mockLists = [];

const nonExistentId = "523510229168172350112114";
const invalidId = "123";

describe("Item Model Operations", () => {
  beforeAll(async () => {
    await connectDB();

    const response = await request(app)
      .post("/lists")
      .send({ title: "My first list" });

    mockLists[0] = response.body.list;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should fetch an empty list without erroring", async () => {
    const { listId } = mockLists[0];

    const response = await request(app).get(`/lists/${listId}/items`);
    const { items } = response.body;

    expect(response.statusCode).toBe(200);

    expect(items.length).toBe(0);
  });

  it("should error fetching an empty list with invalid list id", async () => {
    const nonExistentResponse = await request(app).get(
      `/lists/${nonExistentId}/items`
    );

    const invalidResponse = await request(app).get(`/lists/${invalidId}/items`);

    expect(nonExistentResponse.statusCode).toBe(404);
    expect(invalidResponse.statusCode).toBe(500);

    expect(nonExistentResponse.body).toHaveProperty("message");
    expect(invalidResponse.body).toHaveProperty("message");
  });

  // it("should add a new item to a list", async () => {
  //   const { listId } = mockLists[0];

  //   const itemResponse = await request(app)
  //     .post(`/lists/${listId}/items`)
  //     .send({ title: "My first item" });
  //   const { item } = itemResponse.body;

  //   expect(itemResponse.statusCode).toBe(201);

  //   expect(item).toHaveProperty("itemId");
  //   expect(item).toHaveProperty("listId", listId);
  //   expect(item).toHaveProperty("title", "My first item");
  // });

  // it("should error when adding an item with invalid list id", () => {
  //   expect(false).toBe(true);
  // });

  // it("should error when adding an item with invalid title", () => {
  //   expect(false).toBe(true);
  // });

  // it("should return the 2 items created in the list", () => {
  //   expect(false).toBe(true);
  // });

  // it("should update an item by item id", () => {
  //   expect(false).toBe(true);
  // });

  // it("should error when updating an item with invalid item id", () => {
  //   expect(false).toBe(true);
  // });

  // it("should error when updating an item with invalid title", () => {
  //   expect(false).toBe(true);
  // });

  // it("should fetch an item by item id", () => {
  //   expect(false).toBe(true);
  // });

  // it("should error when fetching an item with invalid item id", () => {
  //   expect(false).toBe(true);
  // });

  // it("should delete an item by item id", () => {
  //   expect(false).toBe(true);
  // });

  // it("should error when deleting an item with invalid item id", () => {
  //   expect(false).toBe(true);
  // });
});
