'use strict';
module.exports = function (app) {
    var Item = require('../controllers/itemController');
    
    app.route('/items')
            .get(Item.index)
            .post(Item.create);

    app.route('/items/:id')
            .put(Item.update)
            .delete(Item.destroy);
};
