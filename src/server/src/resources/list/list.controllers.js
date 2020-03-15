import config from '../../config';
import { List } from './list.model';
import { Item } from '../item/item.model';
import { connect } from '../../utils/db';
import { crudControllers } from '../../utils/crud';

// Overloads fetchById method to include
// the items that belong to the list
export const fetchById = async (req, res) => {
  await connect(config.dbUrl);

  console.log('Model => Read fetchById');
  const id = req.params.id;
  const list = await List.findOne({ _id: id }).exec();
  const items = await Item.find({ list: id }).exec();

  if (!list) {
    return res.status(404).end();
  }

  res.status(200).send({ ...list._doc, items });
};

// Overloads remove method to remove also
// all the items that belong to the list
export const remove = async (req, res) => {
  await connect(config.dbUrl);

  console.log('Model => Destroy');
  const list = await List.remove(
    {
      _id: req.params.id
    },
    {
      justOne: true
    }
  ).exec();

  await Item.remove({
    list: req.params.id
  }).exec();

  res.status(200).send(list);
};

export default {
  ...crudControllers(List),
  fetchById,
  remove
};
