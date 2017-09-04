'use strict';
module.exports = function (app) {
    var List = require('../controllers/listController');

    app.route('/lists')
            .get(List.index)
            .post(List.create);

    app.route('/lists/:id')
            .put(List.update)
            .delete(List.destroy);

};
