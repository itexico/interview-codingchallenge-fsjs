import { Item } from "../models/Item";
import { List } from "../models/List";

export const getAllItems = async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId).populate("items").exec();

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({
      items: list.items.map((item) => ({
        itemId: item._id,
        listId: item.list,
        title: item.title,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findById(itemId).exec();

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({
      item: {
        itemId: item._id,
        listId: item.list,
        title: item.title,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createSingleItem = async (req, res, next) => {
  const { listId } = req.params;
  const { title } = req.body;
  const itemId = Types.ObjectId();

  if ((!title && title !== "0") || title.length === 0) {
    return res
      .status(400)
      .json({ message: "Title property should be a non-empty string" });
  }

  try {
    const list = await List.findById(listId).exec();

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const item = new Item({ _id: itemId, title, list: listId });

    await item.save();

    list.items.push(item);
    await list.save();

    res.status(201).json({
      item: {
        itemId: item._id,
        listId: item.list,
        title: item.title,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleItem = async (req, res, next) => {
  const { itemId } = req.params;
  const { title } = req.body;

  if ((!title && title !== "0") || title.length === 0) {
    return res
      .status(400)
      .json({ message: "Title property should be a non-empty string" });
  }

  try {
    const item = await Item.findByIdAndUpdate(
      itemId,
      { title },
      { new: true, useFindAndModify: false }
    ).exec();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      item: {
        itemId: item._id,
        listId: item.list,
        title: item.title,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findByIdAndDelete(itemId, {
      useFindAndModify: false,
    }).exec();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const list = await List.findById(item.list).exec();

    list.items.pull({ _id: itemId });
    list.save();

    res.status(200).json({
      item: {
        itemId: item._id,
        listId: item.list,
        title: item.title,
      },
    });
  } catch (error) {
    next(error);
  }
};
