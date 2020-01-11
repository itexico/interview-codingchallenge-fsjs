import * as chai from "chai";
import * as express from "express";
import chaiHttp = require("chai-http");
import { server } from "../../../src/server/index";
import "mocha";
import { OK, getStatusText, CREATED } from "http-status-codes";
import { ROUTE_LISTS } from "../../../src/server/utils/constants";
import { ResponseTest } from "../../../src/types/types";
import { logger } from "../../../src/server/utils/logger";
chai.use(chaiHttp);
const { expect } = chai;

describe("Once the user gets into: ", () => {
    it("`/` the server should return a status code", () => {
        return chai
            .request(server)
            .get("/")
            .set("Content-Type", "application/json")
            .then((res) => {
                expect(res.status).to.be.equal(OK);
            });
    });

    it("When the user reaches his/hers `list` there must be none", () => {
        return chai
            .request(server)
            .get(ROUTE_LISTS)
            .set("Content-Type", "Application/json")
            .set("Accept", "Application/json")
            .then((res: unknown) => {
                const result = res as ResponseTest<undefined>;
                expect(result.result).to.be.undefined;

                expect(result.status).to.be.equal(OK);
            });
    });

    it("when the user creates the first list, the status code should be `CREATED`", () => {
        return chai
            .request(server)
            .post(ROUTE_LISTS)
            .set("Content-Type", "Application/json")
            .set("Accept", "Application/json")
            .send(JSON.stringify({ name: "movies" }))
            .then((res: unknown) => {
                const result = res as ResponseTest<string>;

                expect(result.status).to.be.equal(CREATED);
            });
    });
});
