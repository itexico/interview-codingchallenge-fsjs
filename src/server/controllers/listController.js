const mongoose = require('mongoose');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

exports.createList = async (req, res) => {
  req.sanitizeBody('type');
  req.checkBody('type', 'There must be a type').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.json({ message: errors });
    return;
  }
  const list = await new List(req.body).save();
  res.json(list);
};

exports.getLists = async (req, res) => {
  const lists = await List.find();
  res.json(lists);
};

exports.getList = async (req, res) => {
  const list = await List.findById(req.params.id);
  res.json(list);
};

exports.updateList = async (req, res) => {
  const list = await List.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.json(list);
};

exports.deleteList = async (req, res) => {
  await List.remove({ _id: req.params.id }).exec();
  await Item.remove({ list: req.params.id }).exec();
  res.json({ success: true });
};
