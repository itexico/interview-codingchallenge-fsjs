/* eslint-disable-next-line */
import jest from "jest";
import chalk from "chalk";

import { mongoose } from "../../../lib";
import { seed } from "./";

/* eslint-disable no-console */
describe("Test for Utils Component", () => {
  const checkItem = item => {
    expect(item).toBeDefined();
    expect(Object.keys(item).length).toBeGreaterThan(0);
    expect(item.name).toBeDefined();
    expect(item.name.constructor).toBe(String);
    expect(item.description).toBeDefined();
    expect(item.description.constructor).toBe(String);
    expect(item.rating).toBeDefined();
    expect(item.rating.constructor).toBe(Number);
  };

  const checkList = (list, nItems) => {
    expect(list).toBeDefined();
    expect(Object.keys(list).length).toBeGreaterThan(0);
    expect(list.name).toBeDefined();
    expect(list.name.constructor).toBe(String);
    expect(list.description).toBeDefined();
    expect(list.description.constructor).toBe(String);
    expect(list.items).toBeDefined();

    if (nItems !== undefined) {
      expect(Array.isArray(list.items)).toBeTruthy();
      expect(list.items.length).toBe(nItems);
    }
  };

  afterAll(() => {
    console.log(chalk.yellow("Dropping database after finish tests..."));
    return mongoose.dropDatabase().then(() => {
      console.log(chalk.green("Database dropped!"));
      console.log(chalk.yellow("Closing MongoDB connection..."));
      mongoose.close(true);
    });
  });

  describe("Testing Lists and Item generator", () => {
    it("Should create one Item object", () => {
      const item = seed.createItem();
      checkItem(item);
    });

    it("Should create one List with 5 items", () => {
      const list = seed.createList();
      checkList(list, 5);
      list.items.forEach(item => checkItem(item));
    });

    it("Should create one list with 15 items", () => {
      const list = seed.createList(15);
      checkList(list, 15);
      list.items.forEach(item => checkItem(item));
    });

    it("Should create one list with 0 items", () => {
      const list = seed.createList(0);
      checkList(list, 0);
      list.items.forEach(item => checkItem(item));
    });
  });

  describe("Testing List seeder", () => {
    it("Should create 1 List", async () => {
      const savedList = await seed.seedDB(1);
      expect(savedList).toBeDefined();
      expect(Array.isArray(savedList)).toBeTruthy();
      expect(savedList.length).toBe(1);

      savedList.forEach(list => checkList(list));
    });

    it("Should create 5 Lists", async () => {
      const savedList = await seed.seedDB();
      expect(savedList).toBeDefined();
      expect(Array.isArray(savedList)).toBeTruthy();
      expect(savedList.length).toBe(5);

      savedList.forEach(list => checkList(list));
    });

    it("Should create 20 Lists", async () => {
      const savedList = await seed.seedDB(20);
      expect(savedList).toBeDefined();
      expect(Array.isArray(savedList)).toBeTruthy();
      expect(savedList.length).toBe(20);

      savedList.forEach(list => checkList(list));
    });

    it("Should create cero Lists array", async () => {
      const savedList = await seed.seedDB(0);
      expect(savedList).toBeDefined();
      expect(Array.isArray(savedList)).toBeTruthy();
      expect(savedList.length).toBe(0);

      savedList.forEach(list => checkList(list));
    });
  });
});
