const supertest = require("supertest");
const { app, apiRoute } = require("../src/server/index");
const someOldID = "5c360bd7b0cf476dd2535a6d";

const id = "5c3612da6cc8577026ab9dad";

describe(`Unit testing the GET ${apiRoute}/lists route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .get(`${apiRoute}/lists`)
      .expect("Content-Type", /json/)
      .expect(200));
});

describe(`Unit testing the POST ${apiRoute}/list route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .post(`${apiRoute}/list`)
      .send({ title: `A list for the date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(200));
});

describe(`Unit testing the POST ${apiRoute}/list route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .post(`${apiRoute}/list`)
      .send({ notTitleKey: `A list for the date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(500));
});

describe(`Unit testing the GET ${apiRoute}/list/:id route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .get(`${apiRoute}/list/${id}`)
      .expect("Content-Type", /json/)
      .expect(200));
});

describe(`Unit testing the GET ${apiRoute}/list/:id route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .get(`${apiRoute}/list/someInvalidID`)
      .expect("Content-Type", /json/)
      .expect(500));
});

describe(`Unit testing the PUT ${apiRoute}/list/:id route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .put(`${apiRoute}/list/${id}`)
      .send({ title: `Title changed on date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(200));
});

describe(`Unit testing the PUT ${apiRoute}/list/:id route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .put(`${apiRoute}/list/someInvalidID`)
      .send({ title: `Title changed on date ${new Date()}` })
      .set("Accept", "application/json")
      .expect(500));
});

describe(`Unit testing the DELETE ${apiRoute}/list/:id route`, () => {
  it("Should return OK status", () =>
    supertest(app)
      .delete(`${apiRoute}/list/${id}`)
      .expect("Content-Type", /json/)
      .expect(200));
});

describe(`Unit testing the DELETE ${apiRoute}/list/:id route`, () => {
  it("Should return 500 status", () =>
    supertest(app)
      .delete(`${apiRoute}/list/someInvalidID`)
      .expect("Content-Type", /json/)
      .expect(500));
});

describe(`Unit testing the DELETE ${apiRoute}/list/:id route`, () => {
  it("Should return 404 status", () =>
    supertest(app)
      .delete(`${apiRoute}/list/${someOldID}`)
      .expect("Content-Type", /json/)
      .expect(404));
});
