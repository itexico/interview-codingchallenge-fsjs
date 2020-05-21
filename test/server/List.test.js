import request from "supertest";
import { connectDB, disconnectDB } from "../../src/server/database";
import app from "../../src/server/app";

const mockLists = [{ title: "My first list" }];

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
    const response = await request(app).post("/lists").send(mockLists[0]);
    const { list } = response.body;

    expect(response.statusCode).toBe(201);

    expect(list).toHaveProperty("listId");
    expect(list).toHaveProperty("title", mockLists[0].title);
    expect(list).toHaveProperty("items", 0);

    mockLists[0] = list;
  });

  it("should error if title is not sent in creation properly", async () => {
    const undefinedResponse = await request(app)
      .post("/lists")
      .send({ title: undefined });

    const nullResponse = await request(app)
      .post("/lists")
      .send({ title: null });

    const emptyResponse = await request(app).post("/lists").send({ title: "" });

    const nonStringResponse = await request(app)
      .post("/lists")
      .send({ title: 0 });

    const zeroStringResponnse = await request(app)
      .post("/lists")
      .send({ title: "0" });

    expect(undefinedResponse.statusCode).toBe(400);
    expect(nullResponse.statusCode).toBe(400);
    expect(emptyResponse.statusCode).toBe(400);
    expect(nonStringResponse.statusCode).toBe(400);
    expect(zeroStringResponnse.statusCode).toBe(201);

    expect(undefinedResponse.body).toHaveProperty("error");
    expect(nullResponse.body).toHaveProperty("error");
    expect(emptyResponse.body).toHaveProperty("error");
    expect(nonStringResponse.body).toHaveProperty("error");

    expect(zeroStringResponnse.body).toHaveProperty("list");

    mockLists.push(zeroStringResponnse.body.list);
  });

  it("should fetch 2 created lists", async () => {
    const response = await request(app).get("/lists");
    const { lists } = response.body;

    expect(response.statusCode).toBe(200);
    expect(lists.length).toBe(2);

    expect(lists[0]).toHaveProperty("listId");
    expect(lists[0].title).toBe(mockLists[0].title);
    expect(lists[0].items).toBe(0);

    expect(lists[1]).toHaveProperty("listId");
    expect(lists[1].title).toBe("0");
    expect(lists[1].items).toBe(0);
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
      .send({ title: undefined });

    const nullResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: null });

    const emptyResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: "" });

    const nonStringResponse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: 0 });

    const zeroStringResponnse = await request(app)
      .patch(`/lists/${mockLists[0].listId}`)
      .send({ title: "0" });

    expect(undefinedResponse.statusCode).toBe(400);
    expect(nullResponse.statusCode).toBe(400);
    expect(emptyResponse.statusCode).toBe(400);
    expect(nonStringResponse.statusCode).toBe(400);
    expect(zeroStringResponnse.statusCode).toBe(200);

    expect(undefinedResponse.body).toHaveProperty("error");
    expect(nullResponse.body).toHaveProperty("error");
    expect(emptyResponse.body).toHaveProperty("error");
    expect(nonStringResponse.body).toHaveProperty("error");

    expect(zeroStringResponnse.body).toHaveProperty("list");

    mockLists.push(zeroStringResponnse.body.list);
  });

  it("should error updating the list if id does not exist", async () => {
    const response = await request(app)
      .patch(`/lists/123511822291147113225734`)
      .send({ title: "My non existent list" });

    expect(response.statusCode).toBe(404);

    expect(response.body).toHaveProperty("error");
  });

  it("should fetch a list by id without populated items", async () => {
    const response = await request(app).get(`/lists/${mockLists[0].listId}`);
    const { list } = response.body;

    expect(response.statusCode).toBe(200);

    expect(list.listId).toBe(mockLists[0].listId);
    expect(list.title).toBe("0");
    expect(list.items).toEqual(0);
  });

  it("should error when fetching a list with invalid or not-found id", async () => {
    const invalidObjectIdResponse = await request(app).get(`/lists/123`);
    const notFountIdResponse = await request(app).get(
      `/lists/123511822291147113225734`
    );

    expect(notFountIdResponse.statusCode).toBe(404);
    expect(invalidObjectIdResponse.statusCode).toBe(500);

    expect(notFountIdResponse.body).toHaveProperty("error");
    expect(invalidObjectIdResponse.body).toHaveProperty("error");
  });

  it("should delete a list by id", async () => {
    const response = await request(app).delete(`/lists/${mockLists[1].listId}`);
    const { list } = response.body;

    expect(response.statusCode).toBe(200);

    expect(list.listId).toBe(mockLists[1].listId);
    expect(list.title).toBe(mockLists[1].title);
    expect(list.items).toEqual(mockLists[1].items);
  });

  it("should error when deleting a list with invalid or not-found id", async () => {
    const invalidObjectIdResponse = await request(app).delete(`/lists/123`);
    const notFountIdResponse = await request(app).delete(
      `/lists/123511822291147113225734`
    );

    expect(notFountIdResponse.statusCode).toBe(404);
    expect(invalidObjectIdResponse.statusCode).toBe(500);

    expect(notFountIdResponse.body).toHaveProperty("error");
    expect(invalidObjectIdResponse.body).toHaveProperty("error");
  });
});
