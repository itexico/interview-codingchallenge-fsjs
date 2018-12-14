/* eslint-disable-next-line */
import jest from "jest";
import chalk from "chalk";
import validator from "validator";
import faker from "faker";
import bson from "bson-objectid";
import expressValidator from "express-validator";

import { mongoose, crypto } from "../../../lib";
import { seed } from "../utils";

import { List } from ".";
import { randomBytes } from "crypto";

/* eslint-disable no-console */
describe("Testing List Component", () => {
  const checkList = list => {
    expect(list).toBeDefined();
    expect(Array.isArray(list.items)).toBeTruthy();
    expect(list.items.length).toBe(5);
    expect(list.name).toBeDefined();
    expect(list.name.constructor).toBe(String);
    expect(list.description).toBeDefined();
    expect(list.description.constructor).toBe(String);
  };

  const getRandomItem = list => {
    const length = list.items.length;
    const item = list.items[faker.random.number({ max: length - 1 })];

    return { item, _id: crypto.hashID(item._id) };
  };

  beforeAll(() => {
    console.log(chalk.cyan("Seeding DB..."));
    return seed
      .seedDB(faker.random.number({ min: 5, max: 30 }))
      .then(() => console.log(chalk.green("DB Seeded")))
      .catch(err => console.error(chalk.red(err)));
  });

  afterAll(() => {
    console.log(chalk.yellow("Dropping database after finish tests..."));
    return mongoose.dropDatabase().then(() => {
      console.log(chalk.green("Database dropped!"));
      console.log(chalk.yellow("Closing MongoDB connection..."));
      mongoose.close(true);
    });
  });
  describe("Testing Model", () => {
    it("Should create a List object", async () => {
      try {
        const raw = seed.createList();
        const list = new List(raw);

        await list.save();

        checkList(list);
      } catch (error) {
        throw error;
      }
    });

    it.only("Should get an Item by id", async () => {
      try {
        const raw = seed.createList();
        const list = new List(raw);

        await list.save();

        checkList(list);

        // console.log(list);

        const randomItem = getRandomItem(list);

        // console.log(randomItem);

        const item = await List.getItemById(
          crypto.hashID(list._id),
          randomItem._id
        );
      } catch (error) {}
    });
  });
});
