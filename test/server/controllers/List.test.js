import request from "supertest";
import { connectDB, disconnectDB } from "../../../src/server/database";
import app from "../../../src/server/app";

const mockLists = [];

const nonExistentId = "523510229168172350112114";
const invalidId = "123";

describe("List Model Operations", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should fetch 0 created lists without erroring", async () => {
    const response = await request(app).get("/lists");
    const { lists } = response.body;

    expect(response.statusCode).toBe(200);
    expect(lists.length).toBe(0);
  });

  it("should create a new list", async () => {
    const response = await request(app)
      .post("/lists")
      .send({ title: "My first list" });
    const { list } = response.body;

    expect(response.statusCode).toBe(201);

    expect(list).toHaveProperty("listId");
    expect(list).toHaveProperty("title", "My first list");
    expect(list).toHaveProperty("items", 0);

    mockLists.push(list);
  });

  it("should error if title is not sent in creation properly", async () => {
    const undefinedResponse = await request(app).post("/lists").send({});

    const nullResponse = await request(app)
      .post("/lists")
      .send({ title: null });

    const emptyResponse = await request(app).post("/lists").send({ title: "" });

    const nonStringResponse = await request(app)
      .post("/lists")
      .send({ title: 0 });

    expect(undefinedResponse.statusCode).toBe(400);
    expect(nullResponse.statusCode).toBe(400);
    expect(emptyResponse.statusCode).toBe(400);
    expect(nonStringResponse.statusCode).toBe(400);

    expect(undefinedResponse.body).toHaveProperty("error");
    expect(nullResponse.body).toHaveProperty("error");
    expect(emptyResponse.body).toHaveProperty("error");
    expect(nonStringResponse.body).toHaveProperty("error");
  });

  it("should fetch the created lists", async () => {
    const response = await request(app).get("/lists");
    const { lists } = response.body;

    expect(response.statusCode).toBe(200);
    expect(lists.length).toBe(1);

    expect(lists[0]).toHaveProperty("listId");
    expect(lists[0].title).toBe("My first list");
    expect(lists[0].items).toBe(0);
  });

  it("should update the list title", async () => {
    const newTitle = "My first list updated";

    const response = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: newTitle });
    const { list } = response.body;

    expect(response.statusCode).toBe(200);

    expect(list.listId).toBe(mockLists[0].listId);
    expect(list.title).toBe(newTitle);
    expect(list.items).toBe(mockLists[0].items);
  });

  it("should error if title is not sent in update properly", async () => {
    const undefinedResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({});

    const nullResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: null });

    const emptyResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: "" });

    const nonStringResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: 99 });

    expect(undefinedResponse.statusCode).toBe(400);
    expect(nullResponse.statusCode).toBe(400);
    expect(emptyResponse.statusCode).toBe(400);
    expect(nonStringResponse.statusCode).toBe(400);

    expect(undefinedResponse.body).toHaveProperty("error");
    expect(nullResponse.body).toHaveProperty("error");
    expect(emptyResponse.body).toHaveProperty("error");
    expect(nonStringResponse.body).toHaveProperty("error");
  });

  it("should error updating the list with invalid id", async () => {
    const nonExistentIdResponse = await request(app)
      .patch(`/lists/${nonExistentId}`)
      .send({ title: "My non existent list" });

    const invalidIdResponse = await request(app)
      .patch(`/lists/${invalidId}`)
      .send({ title: "My non existent list" });

    expect(invalidIdResponse.statusCode).toBe(500);
    expect(nonExistentIdResponse.statusCode).toBe(404);

    expect(invalidIdResponse.body).toHaveProperty("error");
    expect(nonExistentIdResponse.body).toHaveProperty("error");
  });

  it("should fetch a list by id without populated items", async () => {
    const response = await request(app).get(`/lists/${mockLists[0].listId}`);
    const { list } = response.body;

    expect(response.statusCode).toBe(200);

    expect(list.listId).toBe(mockLists[0].listId);
    expect(list.title).toBe("My first list updated");
    expect(list.items).toEqual(0);
  });

  it("should error when fetching a list with invalid id", async () => {
    const invalidObjectIdResponse = await request(app).get(
      `/lists/${invalidId}`
    );
    const notFountIdResponse = await request(app).get(
      `/lists/${nonExistentId}`
    );

    expect(notFountIdResponse.statusCode).toBe(404);
    expect(invalidObjectIdResponse.statusCode).toBe(500);

    expect(notFountIdResponse.body).toHaveProperty("error");
    expect(invalidObjectIdResponse.body).toHaveProperty("error");
  });

  it("should delete a list by id", async () => {
    const response = await request(app).delete(`/lists/${mockLists[0].listId}`);
    const { list } = response.body;

    expect(response.statusCode).toBe(200);

    expect(list.listId).toBe(mockLists[0].listId);
    expect(list.title).toBe("My first list updated");
    expect(list.items).toEqual(0);
  });

  it("should error when deleting a list with invalid or not-found id", async () => {
    const invalidObjectIdResponse = await request(app).delete(
      `/lists/${invalidId}`
    );
    const notFountIdResponse = await request(app).delete(
      `/lists/${nonExistentId}`
    );

    expect(notFountIdResponse.statusCode).toBe(404);
    expect(invalidObjectIdResponse.statusCode).toBe(500);

    expect(notFountIdResponse.body).toHaveProperty("error");
    expect(invalidObjectIdResponse.body).toHaveProperty("error");
  });
});
