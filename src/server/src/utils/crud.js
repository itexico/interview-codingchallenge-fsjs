import { connect } from './db';
import config from '../config';

export const fetchById = model => async (req, res) => {
  await connect(config.dbUrl);

  console.log('Model => Read fetchById');
  const id = req.params.id;
  const document = await model.findOne({ _id: id }).exec();

  if (!document) {
    return res.status(404).end();
  }

  res.status(200).send(document);
};

export const fetchAll = model => async (req, res) => {
  await connect(config.dbUrl);

  console.log('Model => Read fetchAll');
  const documents = await model.find().exec();

  res.status(200).json(documents);
};

export const create = model => async (req, res) => {
  await connect(config.dbUrl);

  console.log('Model => Create');
  try {
    const document = await model.create(req.body);
    res.status(200).send(document);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const update = model => async (req, res) => {
  console.log('Model => Update');
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
    return res.status(404).end();
  }

  res.status(200).send(document);
};

export const remove = model => async (req, res) => {
  console.log('Model => Destroy');
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
};

export const crudControllers = model => ({
  remove: remove(model),
  update: update(model),
  fetchAll: fetchAll(model),
  fetchById: fetchById(model),
  create: create(model)
});
