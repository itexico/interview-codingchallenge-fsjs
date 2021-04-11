import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel';
import { List } from '../models/listModel';

// @desc Get list item
// @desc GET /api/lists/:id/items
// @access Public
const getListItems = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id).populate('items').exec();

  if (list) {
    res.json(list.items);
  } else {
    res.status(400);
    throw new Error('Items not found');
  }
});

// @desc Get list item by ID
// @desc GET /api/lists/:id/items
// @access Public
const getListItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('List not found');
  }
});

// @desc Create new item
// @desc POST /api/lists/:id/items
// @access Public
const createListItem = asyncHandler(async (req, res) => {
  const { title, featuredImage, description } = req.body;
  const list = await List.findById(req.params.id);

  const item = await Item.create({
    title,
    featuredImage,
    description,
    list: list,
  });

  if (item) {
    list.items.push(item);

    list.numItems = list.items.length;

    await list.save();

    res.status(201).json({
      _id: item._id,

      title: item.title,
      featuredImage: item.featuredImage,
      description: item.description,
      list: item.list,
    });
  } else {
    res.status(400);
    throw new Error('Item not found');
  }
});

// @desc Update a list item
// @desc UPDATE /api/lists/:id/items/:id
// @access Public
const updateItemList = asyncHandler(async (req, res) => {
  const { title, featuredImage, description } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    item.title = title;
    item.featuredImage = featuredImage;
    item.description = description;

    const updateItem = await item.save();
    res.json(updateItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc delete a list item
// @desc DELETE /api/lists/:id/items/:id
// @access Public
const deleteItemList = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: 'Item Removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

export {
  getListItems,
  getListItemById,
  createListItem,
  updateItemList,
  deleteItemList,
};
