import faker from "faker";

import { List } from "../List";

const createItem = () => {
  return {
    name: faker.random.words(3),
    description: faker.lorem.words(faker.random.number({ max: 10, min: 1 })),
    rating: faker.random.number({ max: 5, min: 1 })
  };
};

const createList = (nItems = 5) => {
  const items = Array.from({ length: nItems }).map(() => createItem());

  return {
    name: faker.random.words(3),
    description: faker.lorem.words(faker.random.number({ max: 10, min: 1 })),
    items
  };
};

const seedDB = async (nLists = 5) => {
  const lists = Array.from({ length: nLists }).map(() =>
    createList(faker.random.number({ min: 1, max: 15 }))
  );

  const savedLists = await List.insertMany(lists).catch(error => {
    console.error(error);
  });

  return savedLists;
};

export default {
  createItem,
  createList,
  seedDB
};
