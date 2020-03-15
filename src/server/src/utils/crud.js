export const fetchById = model => async (req, res) => {};

export const fetchAll = model => async (req, res) => {};

export const create = model => async (req, res) => {};

export const update = model => async (req, res) => {};

export const remove = model => async (req, res) => {};

export const crudControllers = model => ({
  remove: remove(model),
  update: update(model),
  fetchAll: fetchAll(model),
  fetchById: fetchById(model),
  create: create(model)
});
