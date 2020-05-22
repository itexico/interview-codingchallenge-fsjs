import "core-js/stable";
import "regenerator-runtime/runtime";

import { authenticated } from "../../../src/server/middlewares/auth";

describe("Authenticated Middleware", () => {
  let tempConsoleLog = null;
  let log = null;

  beforeEach(() => {
    console["log"] = jest.fn((input) => (log = input));
  });

  afterEach(() => {
    log = null;
    console["log"] = tempConsoleLog;
  });

  it("should log true if auth cookie exists", async () => {
    const req = { cookies: { auth: true } };
    const res = {};
    const next = jest.fn();

    authenticated(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(log).toBe(true);
  });

  it("should log undefined if auth cookie does not exist but another does", async () => {
    const req = { cookies: { another: true } };
    const res = {};
    const next = jest.fn();

    authenticated(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(log).toBe(undefined);
  });

  it("should log undefined if there are no cookies at all", async () => {
    const req = { cookies: {} };
    const res = {};
    const next = jest.fn();

    authenticated(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(log).toBe(undefined);
  });
});
