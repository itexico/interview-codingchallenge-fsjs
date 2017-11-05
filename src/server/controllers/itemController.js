const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const List = mongoose.model('List');

exports.createItem = async (req, res) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'There must be a name').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.json({ message: errors });
    return;
  }
  const item = await new Item(req.body).save();
  await List.findByIdAndUpdate(item.list, {
    $addToSet: { items: item._id }
  });
  res.json(item);
};

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

exports.updateItem = async (req, res) => {
  delete req.body.list;
  const item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id).exec();
  await List.findByIdAndUpdate(
    { _id: item.list },
    {
      $pull: { items: item._id }
    }
  ).exec();
  res.json({ success: true });
};
