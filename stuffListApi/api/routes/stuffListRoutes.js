'use strict';
module.exports = function(app) {
    var stuffList = require('../controllers/stuffListController');

    app.route('/stuffs')
        .get(stuffList.list_all_stuffs)
        .delete(stuffList.delete_all_stuffs)
        .post(stuffList.create_stuff);

    app.route('/stuffs/:stuffId')
        .get(stuffList.read_stuff)
        .put(stuffList.update_stuff)
        .delete(stuffList.delete_stuff);
};