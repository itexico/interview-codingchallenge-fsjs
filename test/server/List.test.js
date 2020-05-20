import request from "supertest";
import { connectDB, disconnectDB } from "../../src/server/database";
import app from "../../src/server/app";

const mockLists = [{ title: "My first list" }];

describe("ENDPOINTS LIST /lists*", () => {
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

    expect(undefinedResponse.body).toHaveProperty("message");
    expect(nullResponse.body).toHaveProperty("message");
    expect(emptyResponse.body).toHaveProperty("message");
    expect(nonStringResponse.body).toHaveProperty("message");

    expect(zeroStringResponnse.body).toHaveProperty("list");

    mockLists.push(zeroStringResponnse.body.list);
  });

  it("should fetch 2 created lists", async () => {
    const response = await request(app).get("/lists");
    const { lists } = response.body;

    expect(response.statusCode).toBe(200);
    expect(lists.length).toBe(2);

    expect(lists[0].title).toBe(mockLists[0].title);
    expect(lists[1].title).toBe("0");
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

    expect(undefinedResponse.body).toHaveProperty("message");
    expect(nullResponse.body).toHaveProperty("message");
    expect(emptyResponse.body).toHaveProperty("message");
    expect(nonStringResponse.body).toHaveProperty("message");

    expect(zeroStringResponnse.body).toHaveProperty("list");

    mockLists.push(zeroStringResponnse.body.list);
  });
});
