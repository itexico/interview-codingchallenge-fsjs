import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7777/api';

export default {
  async saveList(list) {
    const { data: newList } = await axios.post('/lists', list);
    return newList;
  },
  async getList(id) {
    const { data: list } = await axios.get(`/lists/${id}`);
    return list;
  },
  async getLists() {
    const { data: lists } = await axios.get('/lists');
    return lists;
  },
  async updateList(list) {
    const { data: updatedList } = await axios.put(`/lists/${list._id}`, list);
    return updatedList;
  },
  async deleteList(id) {
    const { data } = await axios.delete(`/lists/${id}`);
    return data;
  },
  async saveItem(item) {
    const { data: newItem } = await axios.post('/items', item);
    return newItem;
  },
  async getItem(id) {
    const { data: item } = await axios.get(`/items/${id}`);
    return item;
  },
  async getItems() {
    const { data: items } = await axios.get('/items');
    return items;
  },
  async updateItem(item) {
    const { data: updatedItem } = await axios.put(`/items/${item._id}`, item);
    return updatedItem;
  },
  async deleteItem(id) {
    const { data } = await axios.delete(`/items/${id}`);
    return data;
  }
};
