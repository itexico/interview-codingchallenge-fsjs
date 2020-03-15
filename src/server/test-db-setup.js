import mongoose from 'mongoose';
import _ from 'lodash';
import { connect } from './src/utils/db';
import { Item } from './src/resources/item/item.model';
import { List } from './src/resources/list/list.model';

const models = { List, Item };

global.newId = () => {
  return mongoose.Types.ObjectId();
};

// Saves Db ids to use later in the tests
global.listId = global.listId || global.newId();
global.itemId1 = global.itemId1 || global.newId();
global.itemId2 = global.itemId2 || global.newId();

const remove = collection =>
  new Promise((resolve, reject) => {
    collection.deleteMany(err => {
      if (err) return reject(err);
      resolve();
    });
  });

beforeEach(async done => {
  const initializeCollections = async () => {
    const listId = global.listId;
    await mongoose.models.list.create({
      _id: listId,
      name: 'My first list'
    });

    await mongoose.models.item.create({
      _id: global.itemId1,
      list: listId,
      name: 'My first list item'
    });

    await mongoose.models.item.create({
      _id: global.itemId2,
      list: listId,
      name: 'My second list item'
    });
  };

  const resetDB = async () => {
    await Promise.all(_.map(mongoose.connection.collections, c => remove(c)));
    await initializeCollections();
  };

  if (mongoose.connection.readyState === 0) {
    try {
      await connect();
      await resetDB();
      await Promise.all(Object.keys(models).map(name => models[name].init()));
    } catch (e) {
      console.log('Connection error');
      console.error(e);
      throw e;
    }
  } else {
    await resetDB();
  }
  done();
});
afterEach(async done => {
  await mongoose.connection.db.dropDatabase(() =>
    console.log(`DB Dropped: ${mongoose.connection.db.databaseName}`)
  );
  return done();
});
afterAll(done => {
  return done();
});
