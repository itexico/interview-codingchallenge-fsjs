import request from "supertest";
import { connectDB, disconnectDB } from "../../src/server/database";
import app from "../../src/server/app";

const mockLists = [{ title: "My first list" }, { title: "My second list" }];

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
  });
});
