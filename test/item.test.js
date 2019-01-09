const supertest = require("supertest");
const { app, apiRoute } = require("../src/server/index");

const listID = "5c360ebec5174c6ec4fa4637";
const someOldID = "5c360bd7b0cf476dd2535a6d";

const id = "5c361266cd15fb6ff0686448";

describe(`Unit testing the GET ${apiRoute}/items/:listId route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .get(`${apiRoute}/items/${listID}`)
      .expect("Content-Type", /json/)
      .expect(200));
});

describe(`Unit testing the POST ${apiRoute}/item/:listId route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .post(`${apiRoute}/item/${listID}`)
      .send({ title: `An item for the date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(200));
});

describe(`Unit testing the POST ${apiRoute}/item/:listId route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .post(`${apiRoute}/item/${listID}`)
      .send({ notTitleKey: `An item for the date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(500));
});

describe(`Unit testing the GET ${apiRoute}/item/:id route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .get(`${apiRoute}/item/${id}`)
      .expect("Content-Type", /json/)
      .expect(200));
});

describe(`Unit testing the GET ${apiRoute}/item/:id route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .get(`${apiRoute}/item/someInvalidId`)
      .expect("Content-Type", /json/)
      .expect(500));
});

describe(`Unit testing the PUT ${apiRoute}/item/:id route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .put(`${apiRoute}/item/${id}`)
      .send({ title: `Title changed on date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(200));
});

describe(`Unit testing the PUT ${apiRoute}/item/:id route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .put(`${apiRoute}/item/someInvalidID`)
      .send({ title: `Title changed on date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(500));
});

describe(`Unit testing the DELETE ${apiRoute}/item/:id route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .delete(`${apiRoute}/item/${id}`)
      .expect("Content-Type", /json/)
      .expect(200));
});

describe(`Unit testing the DELETE ${apiRoute}/item/:id route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .delete(`${apiRoute}/item/someInvalidID`)
      .expect("Content-Type", /json/)
      .expect(500));
});

describe(`Unit testing the DELETE ${apiRoute}/iitem/:id route`, () => {
  it("Should return 404 status", () =>
    supertest(app)
      .delete(`${apiRoute}/item/${someOldID}`)
      .expect("Content-Type", /json/)
      .expect(404));
});
