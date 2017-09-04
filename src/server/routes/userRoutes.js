'use strict';
module.exports = function (app) {
    var User = require('../controllers/userController');

    app.route('/users')
            .get(User.index)
            .post(User.create);

    app.route('/users/:id')
            .get(User.show)
            .delete(User.destroy);
};
