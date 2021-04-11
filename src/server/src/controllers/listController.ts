import asyncHandler from 'express-async-handler';
import { List } from '../models/listModel';

// @desc fetch all the lists
// @desc GET /api/lists
// @access Public
const getLists = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await List.countDocuments({ ...keyword });
  const lists = await List.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ lists, page, pages: Math.ceil(count / pageSize) });
});

// @desc fetch a single list
// @desc GET /api/lists/:id
// @access Public
const getListById = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    res.json(list);
  } else {
    res.status(404);
    throw new Error('List not found');
  }
});

// @desc delete a list
// @desc DELETE /api/lists/:id
// @access Public
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    await list.remove();
    res.json({ message: 'List Removed' });
  } else {
    res.status(404);
    throw new Error('List not found');
  }
});

// @desc Create a list
// @desc POST /api/lists
// @access Public
const createList = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const list = await List.create({
    title,
    description,
    category,
  });

  if (list) {
    res.status(201).json({
      _id: list._id,
      user: list.user,
      title: list.title,
      description: list.description,
      numItems: list.numItems,
      items: [],
    });
  } else {
    res.status(400);
    throw new Error('List not found');
  }
});

// @desc Update a list
// @desc UPDATE /api/lists
// @access Public
const updateList = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const list = await List.findById(req.params.id);

  if (list) {
    list.title = title;
    list.description = description;
    list.category = category;

    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error('List not found');
  }
});

export { getLists, getListById, createList, updateList, deleteList };
