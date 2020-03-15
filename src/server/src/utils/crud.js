import { connect } from './db';
import config from '../config';

export const fetchById = model => async (req, res) => {
  console.log('Model => Read fetchById');
  try {
    await connect(config.dbUrl);
    const id = req.params.id;
    const document = await model.findOne({ _id: id }).exec();

    if (!document) {
      return res.status(404).send({
        title: 'Not found',
        message: "Couldn't find the resource you are looking for"
      });
    }

    res.status(200).send(document);
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

export const fetchAll = model => async (req, res) => {
  console.log('Model => Read fetchAll');
  try {
    await connect(config.dbUrl);
    const documents = await model.find().exec();
    res.status(200).json(documents);
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

export const create = model => async (req, res) => {
  console.log('Model => Create');
  try {
    await connect(config.dbUrl);
    const document = await model.create(req.body);
    res.status(200).send(document);
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

export const update = model => async (req, res) => {
  console.log('Model => Update');
  try {
    const document = await model
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .exec();

    if (!document) {
      return res.status(404).send({
        title: 'Not found',
        message: "Couldn't find the resource you are looking for"
      });
    }

    res.status(200).send(document);
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

export const remove = model => async (req, res) => {
  console.log('Model => Destroy');
  try {
    const list = await model
      .remove(
        {
          _id: req.params.id
        },
        {
          justOne: true
        }
      )
      .exec();

    res.status(200).send(list);
  } catch (e) {
    res.status(500).send({ title: 'Internal Error', message: e.message });
  }
};

export const crudControllers = model => ({
  remove: remove(model),
  update: update(model),
  fetchAll: fetchAll(model),
  fetchById: fetchById(model),
  create: create(model)
});
