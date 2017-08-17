const listRoutes = require('./list_route');
module.exports = function (app, db) {
  listRoutes(app, db);
  // Other route groups could go here, in the future
};