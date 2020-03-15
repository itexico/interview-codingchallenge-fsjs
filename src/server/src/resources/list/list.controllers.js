import config from '../../config';
import { List } from './list.model';
import { Item } from '../item/item.model';
import { connect } from '../../utils/db';
import { crudControllers } from '../../utils/crud';

// Overrides the fetchById method to include
// the items that belong to the list
export const fetchById = async (req, res) => {
  console.log('Model => Read fetchById');
  try {
    await connect(config.dbUrl);
    const id = req.params.id;
    const list = await List.findOne({ _id: id }).exec();
    const items = await Item.find({ list: id }).exec();

    if (!list) {
      return res.status(404).send({
        title: 'Not found',
        message: "Couldn't find the resource you are looking for"
      });
    }

    res.status(200).send({ ...list._doc, items });
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

// Overrides the remove method to remove also
// all the items that belong to the list
export const remove = async (req, res) => {
  console.log('Model => Destroy');
  try {
    await connect(config.dbUrl);
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
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

export default {
  ...crudControllers(List),
  fetchById,
  remove
};
