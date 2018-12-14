// TODO: Test and make Seeder
import mongooseDelete from "mongoose-delete";
import mongoose, { Schema } from "mongoose";
import mongooseKeywords from "mongoose-keywords";
import slugify from "@sindresorhus/slugify";
import { typeCheck } from "type-check";

import { ErrorHandler } from "../utils";
import { crypto } from "../../../lib";

const checkError = error =>
  ErrorHandler.isComposed(error)
    ? error
    : new ErrorHandler(error.message, ErrorHandler.internal(), { error });
const checkEmpty = (data, message, reason) => {
  if ((Array.isArray(data) && data.length === 0) || !data) {
    throw new ErrorHandler(message, ErrorHandler.notFound(), reason);
  }
};

const skipInit = process.env.NODE_ENV === "test";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String,
      maxlength: 250
    },
    rating: {
      type: Number,
      required: true,
      max: 5
    }
  },
  { timestamps: true }
);

class Item {
  view(full = false) {
    const PROPERTIES = full
      ? ["name", "description", "rating", "createdAt"]
      : ["name", "rating", "createdAt"];

    const item = PROPERTIES.reduce((prev, curr) => {
      prev[curr] = this[curr];
      return prev;
    }, {});

    item.id = crypto.hashID(this._id);

    return item;
  }
}

ItemSchema.loadClass(Item);

const ListSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 250
    },
    items: [ItemSchema]
  },
  {
    timestamps: true
  }
);

class List {
  view(full = false) {
    const PROPERTIES = !full
      ? ["name", "description", "items"]
      : ["name", "description", "items", "createdAt"];

    const list = PROPERTIES.reduce((prev, curr) => {
      if (curr === "items") {
        prev[curr] = full
          ? this[curr].map(item => item.view())
          : this[curr].length;
        return prev;
      }

      prev[curr] = this[curr];
      return prev;
    }, {});

    list.id = crypto.hashID(this._id);

    return list;
  }

  static async getLists({
    query = {},
    cursor = { limit: 10, sort: { createdAt: -1 } }
  } = {}) {
    try {
      const lists = await this.find(query, {}, cursor);

      return lists.map(list => list.view());
    } catch (error) {
      throw checkError(error);
    }
  }

  static async findListByID(
    id = undefined,
    { full = false, hydrated = false } = {}
  ) {
    try {
      const _id = crypto.decodeID(id);
      const list = await this.findById(_id).exec();

      checkEmpty(list, "List not found", { id });

      return hydrated ? list : list.view(full);
    } catch (error) {
      throw checkError(error);
    }
  }

  static async getItemById(
    listID,
    itemID,
    { full = false, hydrated = false } = {}
  ) {
    try {
      const _listID = crypto.decodeID(listID);
      const _itemID = crypto.decodeID(itemID);
      const list = await this.findById(_listID)
        .select("items")
        .exec();

      checkEmpty(list, "List not found", { listID });

      if (hydrated) return { list, _id: _itemID };

      const item = list.items.id(_itemID);

      checkEmpty(item, "Item not found", { itemID });

      return item.view(full);
    } catch (error) {
      throw checkError(error);
    }
  }

  static async createList(data) {
    try {
      const newList = await this.create(data);

      return newList.view(true);
    } catch (error) {
      throw checkError(error);
    }
  }

  static async addItemToList(listID, itemData) {
    try {
      const list = await this.findListByID(listID, { hydrated: true });

      list.items.push(itemData);
      await list.save();

      return list.view(true);
    } catch (error) {
      throw checkError(error);
    }
  }

  static async updateList(id, newData) {
    try {
      const list = await this.findListByID(id, { hydrated: true });

      checkEmpty(list);

      list.set(newData);

      await list.save();

      return list.view();
    } catch (error) {
      throw checkError(error);
    }
  }

  static async updateItem(listId, itemId, newData, { full } = {}) {
    try {
      const { list, _id } = await this.getItemById(listId, itemId, {
        hydrated: true
      });

      const item = list.items.id(_id).set(newData);

      checkEmpty(item, "Item not found", { itemId });

      await list.save();

      return item.view(full);
    } catch (error) {
      checkError(error);
    }
  }

  static async deleteList(id) {
    try {
      const _id = crypto.decodeID(id);

      const deletedList = await this.delete({ _id }).exec();

      checkEmpty(deletedList, "List not found", { id });

      return deletedList.view();
    } catch (error) {
      checkError(error);
    }
  }

  static async deleteItem(listId, itemId) {
    try {
      const { list, _id } = await this.getItemById(listId, itemId, {
        hydrated: true
      });

      const item = list.items.id(_id).remove();

      checkEmpty(item, "Item not found", { itemId });

      await list.save();
    } catch (error) {
      checkError(error);
    }
  }
}

ListSchema.loadClass(List);

ListSchema.plugin(mongooseKeywords, {
  paths: ["name"]
});

ListSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  indexFields: true
});

const model = skipInit
  ? mongoose.model("List", ListSchema, "List", skipInit)
  : mongoose.model("List", ListSchema);

export default model;

export const PropertiesToSort = ["name", "-name", "createdAt", "-createdAt"];
