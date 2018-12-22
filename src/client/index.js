import Vue from 'vue';
import api from './api';
import List from './components/List';
import Item from './components/Item';

new Vue({
  el: '#app',
  data() {
    return {
      lists: [],
      items: [],
      selectedListId: '',
      isModalActive: false,
      isListModalActive: false,
      itemName: '',
      listType: '',
      errors: []
    };
  },
  async created() {
    await this.getLists().catch(this.showErrors);
    await this.getItems().catch(this.showErrors);
    if (this.lists.length) {
      this.selectedListId = this.lists[0]._id;
    }
  },
  computed: {
    listItems() {
      if (this.selectedListId === undefined) return [];
      if (!this.items.length) return [];

      return this.items.filter(item => item.list === this.selectedListId);
    },
    isListTypeEmpty() {
      return this.listType === '';
    },
    isItemNameEmpty() {
      return this.itemName === '';
    },
    isSelectedListEmpty() {
      return this.selectedListId === '';
    }
  },
  watch: {
    errors(oldValue, newValue) {
      if (!newValue) {
        return;
      }

      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.errors = [];
      }, 3000);
    }
  },
  methods: {
    showErrors(error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      this.errors.push(new Error(message));
      return;
    },
    async getLists() {
      const lists = await api.getLists();
      this.lists = lists;
    },
    async getItems() {
      const items = await api.getItems();
      this.items = items;
    },
    async saveItem() {
      if (this.isSelectedListEmpty) {
        this.errors.push(new Error('Please select a list first'));
        return;
      }

      if (this.isItemNameEmpty) {
        this.errors.push(new Error(`Please fill in the item's name`));
        return;
      }

      const item = { name: this.itemName, list: this.selectedListId };
      const newItem = await api.saveItem(item);
      this.items.push(newItem);
      this.reset();
    },
    async deleteItem(item) {
      await api.deleteItem(item._id);
      const index = this.items.findIndex(i => i._id === item._id);
      this.items.splice(index, 1);
    },
    async editItem(item) {
      const newItem = await api.updateItem(item);
      const index = this.items.findIndex(i => i._id === item._id);
      this.items.splice(index, 1, newItem);
    },
    async saveList() {
      if (this.isListTypeEmpty) {
        this.errors.push(new Error(`Please fill in the list's name`));
        return;
      }
      const list = { type: this.listType };
      const newList = await api.saveList(list);
      this.lists.push(newList);
      this.reset();
    },
    async deleteList() {
      if (this.isSelectedListEmpty) {
        this.errors.push(new Error('Please select a list first'));
        return;
      }

      await api.deleteList(this.selectedListId);
      const index = this.lists.findIndex(
        list => list._id === this.selectedListId
      );
      this.lists.splice(index, 1);
      this.selectedListId = '';
    },
    async editList() {
      if (this.isSelectedListEmpty) {
        this.errors.push(new Error('Please select a list first'));
        return;
      }

      if (this.isListTypeEmpty) {
        this.errors.push(new Error(`Please fill in the list's name`));
        return;
      }

      const list = { type: this.listType, _id: this.selectedListId };
      const newList = await api.updateList(list);
      const index = this.lists.findIndex(l => l._id === this.selectedListId);
      this.lists.splice(index, 1, newList);
      this.reset();
    },
    reset() {
      this.isModalActive = false;
      this.isListModalActive = false;
      this.itemName = '';
      this.listType = '';
    },
    selectList(_id) {
      if (!this.lists) return;

      const list = this.lists.find(list => list._id === _id);
      this.selectedListId = list._id;
    }
  }
});
