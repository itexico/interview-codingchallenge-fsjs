const supertest = require("supertest");
const { app } = require("../src/server/index");
const auth = require("../src/server/middleware/auth_cookie");

describe("Testing when there is no cookie set", () => {
  app.get("/clearCookie", (req, res, next) => {
    res.clearCookie("auth");
    res.send("No cookies for you");
  });

  const agent = supertest.agent(app);

  it("should not have a cookie set", done => {
    agent.get("/clearCookie").expect("No cookies for you", done);
  });
});

describe('Testing where the user has a cookie named "auth"', () => {
  // Saving the cookie
  app.get("/", (req, res) => {
    res.cookie("auth", "some value");
    res.send();
  });

  app.get("/return", function(req, res, next) {
    if (req.cookies.auth) {
      //auth.validate(req, res, next);
      res.send(req.cookies.auth);
    } else {
      res.send(":(");
    }
  });

  const agent = supertest.agent(app);

  it("should save cookies", done => {
    agent.get("/").expect("set-cookie", "auth=some%20value; Path=/", done);
  });

  it('should have the "auth" cookie set', done => {
    agent.get("/return").expect("some value", done);
  });
});

describe("Testing where the user has cookies with other names", () => {
  let cookies;

  app.get("/otherCookie", function(req, res) {
    res.cookie("name", "some value");
    res.send();
  });

  app.get("/returnOtherCookie", function(req, res, next) {
    if (req.cookies.name) {
      auth.validate(req, res, next);
      res.send(req.cookies.name);
    } else {
      res.send(":(");
    }
  });

  const agent = supertest.agent(app);

  it("should save cookies", done => {
    agent
      .get("/otherCookie")
      .expect("set-cookie", "name=some%20value; Path=/", done);
  });

  it("should have some cookie", done => {
    agent.get("/returnOtherCookie").expect("some value", done);
  });
});
