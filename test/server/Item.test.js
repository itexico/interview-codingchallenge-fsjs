import request from "supertest";
import { connectDB, disconnectDB } from "../../src/server/database";
import app from "../../src/server/app";

const mockLists = [];
const mockItems = [];

const nonExistentId = "523510229168172350112114";
const invalidId = "123";

describe("Item Model Operations", () => {
  beforeAll(async () => {
    await connectDB();

    const response = await request(app)
      .post("/lists")
      .send({ title: "My first list" });

    mockLists.push(response.body.list);
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

  it("should add a new item to a list", async () => {
    const { listId } = mockLists[0];

    const itemResponse = await request(app)
      .post(`/lists/${listId}/items`)
      .send({ title: "My first item" });

    const { item } = itemResponse.body;

    expect(itemResponse.statusCode).toBe(201);

    expect(item).toHaveProperty("itemId");
    expect(item).toHaveProperty("listId", listId);
    expect(item).toHaveProperty("title", "My first item");

    mockItems.push(item);
  });

  it("should error when adding an item with invalid list id", async () => {
    const nonExistentResponse = await request(app)
      .post(`/lists/${nonExistentId}/items`)
      .send({ title: "My first item" });

    const invalidResponse = await request(app)
      .post(`/lists/${invalidId}/items`)
      .send({ title: "My first item" });

    expect(nonExistentResponse.statusCode).toBe(404);
    expect(invalidResponse.statusCode).toBe(500);

    expect(nonExistentResponse.body).toHaveProperty("message");
    expect(invalidResponse.body).toHaveProperty("message");
  });

  it("should error when adding an item with invalid title", async () => {
    const { listId } = mockLists[0];

    const emptyResponse = await request(app)
      .post(`/lists/${listId}/items`)
      .send({ title: "" });

    const undefinedResponse = await request(app)
      .post(`/lists/${listId}/items`)
      .send({});

    const nullResponse = await request(app)
      .post(`/lists/${listId}/items`)
      .send({ title: null });

    const nonStringResponse = await request(app)
      .post(`/lists/${listId}/items`)
      .send({ title: 0 });

    const zeroStringResponse = await request(app)
      .post(`/lists/${listId}/items`)
      .send({ title: "0" });

    expect(undefinedResponse.statusCode).toBe(400);
    expect(nullResponse.statusCode).toBe(400);
    expect(emptyResponse.statusCode).toBe(400);
    expect(nonStringResponse.statusCode).toBe(400);
    expect(zeroStringResponse.statusCode).toBe(201);

    expect(undefinedResponse.body).toHaveProperty("message");
    expect(nullResponse.body).toHaveProperty("message");
    expect(emptyResponse.body).toHaveProperty("message");
    expect(nonStringResponse.body).toHaveProperty("message");

    expect(zeroStringResponse.body).toHaveProperty("item");

    mockItems.push(zeroStringResponse.body.item);
  });

  it("should return the 2 items created in the list", async () => {
    const { listId } = mockLists[0];

    const response = await request(app).get(`/lists/${listId}/items`);
    const { items } = response.body;

    expect(response.statusCode).toBe(200);

    expect(items[0]).toHaveProperty("itemId");
    expect(items[0]).toHaveProperty("listId", listId);
    expect(items[0]).toHaveProperty("title", "My first item");

    expect(items[1]).toHaveProperty("itemId");
    expect(items[1]).toHaveProperty("listId", listId);
    expect(items[1]).toHaveProperty("title", "0");
  });

  it("should update an item by item id", async () => {
    const { listId } = mockLists[0];
    const { itemId } = mockItems[0];

    const itemResponse = await request(app)
      .patch(`/items/${itemId}`)
      .send({ title: "My first item updated" });

    const { item } = itemResponse.body;

    expect(itemResponse.statusCode).toBe(200);

    expect(item).toHaveProperty("itemId");
    expect(item).toHaveProperty("listId", listId);
    expect(item).toHaveProperty("title", "My first item updated");

    mockItems[0] = item;
  });

  it("should error when updating an item with invalid item id", async () => {
    const invalidResponse = await request(app)
      .patch(`/items/${invalidId}`)
      .send({ title: "My invalid item" });

    const nonExistentResponse = await request(app)
      .patch(`/items/${nonExistentId}`)
      .send({ title: "My non existent item" });

    expect(invalidResponse.statusCode).toBe(500);
    expect(nonExistentResponse.statusCode).toBe(404);

    expect(invalidResponse.body).toHaveProperty("message");
    expect(nonExistentResponse.body).toHaveProperty("message");
  });

  it("should error when updating an item with invalid title", async () => {
    const { itemId } = mockItems[1];

    const emptyResponse = await request(app)
      .patch(`/items/${itemId}`)
      .send({ title: "" });

    const undefinedResponse = await request(app)
      .patch(`/items/${itemId}`)
      .send({});

    const nullResponse = await request(app)
      .patch(`/items/${itemId}`)
      .send({ title: null });

    const nonStringResponse = await request(app)
      .patch(`/items/${itemId}`)
      .send({ title: 0 });

    const zeroStringResponse = await request(app)
      .patch(`/items/${itemId}`)
      .send({ title: "My second item updated" });

    expect(undefinedResponse.statusCode).toBe(400);
    expect(nullResponse.statusCode).toBe(400);
    expect(emptyResponse.statusCode).toBe(400);
    expect(nonStringResponse.statusCode).toBe(400);
    expect(zeroStringResponse.statusCode).toBe(200);

    expect(undefinedResponse.body).toHaveProperty("message");
    expect(nullResponse.body).toHaveProperty("message");
    expect(emptyResponse.body).toHaveProperty("message");
    expect(nonStringResponse.body).toHaveProperty("message");

    expect(zeroStringResponse.body).toHaveProperty("item");

    mockItems[1] = zeroStringResponse.body.item;
  });

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
