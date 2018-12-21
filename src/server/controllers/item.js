'use strict'

var Item = require('../models/item');

function getItems(req, res) {
    var listId = req.params.list;

    if (!listId) {
        var find = Item.find();
    } else {
        var find = Item.find({ list: listId });
    }

    find.populate('list').exec((err, items) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!items) {
                res.status(404).send({ message: 'No items found.' });
            } else {
                res.status(200).send({ items });
            }
        }
    });
}

function getItem(req, res){
    var itemId = req.params.id;

    Item.findById(itemId, (err, item) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!item) {
                res.status(404).send({ message: 'No item found.' });
            } else {
                res.status(200).send({ item });
            }
        }
    });
}

function saveItem(req, res) {
    var item = new Item();

    item.description = req.body.description;
    item.list = req.params.listId;

    if (item.list) {
        item.save((err, itemStored) => {
            if (err) {
                res.status(500).send({ message: 'Error in Server.' });
            } else {
                if (!itemStored) {
                    res.status(404).send({ message: 'No item was saved.' });
                } else {
                    res.status(200).send({ itemStored });
                }
            }
        });
    } else {
        res.status(404).send({ message: 'List for Item needed.'})
    }
}

function updateItem(req, res) {
    var itemId = req.params.id;
    var update = req.body;

    Item.findByIdAndUpdate(itemId, update, (err, itemUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!itemUpdated) {
                res.status(404).send({ message: 'No item was updated.' });
            } else {
                res.status(200).send({ itemUpdated });
            }
        }
    });
}

function deleteItem(req, res) {
    var itemId = req.params.id;

    Item.findByIdAndDelete(itemId, (err, itemRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!itemRemoved) {
                res.status(404).send({ message: 'No item was removed.' });
            } else {
                res.status(200).send({ itemRemoved });
            }
        }
    });        
}

module.exports = {
    getItem,
    getItems,
    saveItem,
    updateItem,
    deleteItem
}