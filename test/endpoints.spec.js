require('babel-register')();
const api = require('../src/client/api').default;
const axios = require('axios');
const expect = require('chai').expect;
const assert = require('assert');

describe('Should show error without cookie', async () => {
  const response = await api.getLists();
  expect(response).to.be.an('object');
  expect(response.message).to.be.equals('missing cookie');
});

describe('Testing endpoints', async () => {
  axios.defaults.headers.Cookie = 'auth=some_value';

  it('Should return an array of lits', async () => {
    const lists = await api.getLists();
    expect(lists).to.be.an('array');
  });

  it('Should return a specific list', async () => {
    const lists = await api.getLists();
    if (lists.length) {
      const list = lists[0];
      const retrievedList = await api.getList(list._id);
      expect(retrievedList._id).to.be.equals(list._id);
    }
  });

  it('Should save a list, if it exists error of duplicate key should arise', async () => {
    try {
      const list = {
        type: 'Awesome list'
      };
      const newList = await api.saveList(list);
      expect(newList).to.have.property('_id');
      expect(newList.type).to.be.equals(list.type);
      expect(newList.items).to.be.an('array');
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  it('Should update a list', async () => {
    const lists = await api.getLists();

    if (lists.length) {
      const list = lists[0];
      list.type = 'New type';
      const updatedList = await api.updateList(list);
      expect(updatedList.type).to.be.equals(list.type);
    }
  });

  it('Should delete a list', async () => {
    let lists = await api.getLists();

    if (lists.length) {
      let list = lists[0];
      await api.deleteList(list._id);
      lists = await api.getItems();
      list = lists.find(i => i._id === list._id);
      expect(list).to.be.equals(undefined);
    }
  });

  it('Should return an array of items', async () => {
    const items = await api.getItems();
    expect(items).to.be.an('array');
  });

  it('Should return a specific item', async () => {
    const items = await api.getItems();
    if (items.length) {
      const item = items[0];
      const retrievedItem = await api.getItem(item._id);
      expect(retrievedItem._id).to.be.equals(item._id);
    }
  });

  it('Should save an item', async () => {
    const lists = await api.getLists();
    const list = lists[0];
    const item = {
      name: 'Awesome item',
      list: list._id
    };
    const newItem = await api.saveItem(item);
    expect(newItem).to.have.property('_id');
    expect(newItem.name).to.be.equals('Awesome item');
    expect(newItem.list).to.be.equals(list._id);
  });

  it('Should update an item', async () => {
    const items = await api.getItems();

    if (items.length) {
      const item = items[0];
      item.name = 'New Name';
      const updatedItem = await api.updateItem(item);
      expect(updatedItem.name).to.be.equals(item.name);
    }
  });

  it('Should delete an item', async () => {
    let items = await api.getItems();

    if (items.length) {
      let item = items[0];
      await api.deleteItem(item._id);
      items = await api.getItems();
      item = items.find(i => i._id === item._id);
      expect(item).to.be.equals(undefined);
    }
  });
});
