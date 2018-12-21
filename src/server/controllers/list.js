'use strict'

var List = require('../models/list');
var Item = require('../models/item');

function getList(req, res){
    var listId = req.params.id;

    List.findById(listId, (err, list) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!list) {
                res.status(404).send({ message: 'No list found.' });
            } else {
                res.status(200).send({ list });
            }
        }
    });
}

function getLists(req, res) {
    var listId = req.params.id;

    if (!listId) {
        var find = List.find();
    } else {
        var find = List.find({ _id: listId });
    }

    find.exec((err, lists) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!lists) {
                res.status(404).send({ message: 'No list found.' });
            } else {
                res.status(200).send({ lists });
            }
        }
    });
}

function saveList(req, res) {
    var list = new List();

    list.name = req.body.name;

    list.save((err, listSaved) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!listSaved) {
                res.status(404).send({ message: 'No list was saved.' });
            } else {
                res.status(200).send({ listSaved });
            }
        }
    });
}

function updateList(req, res) {
    var listId = req.params.id;
    var update = req.body;

    List.findByIdAndUpdate(listId, update, (err, listUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!listUpdated) {
                res.status(404).send({ message: 'No list was updated.' });
            } else {
                res.status(200).send({ listUpdated });
            }
        }
    });
}

function deleteList(req, res) {
    var listId = req.params.id;

    List.findByIdAndDelete(listId, (err, listRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error in Server.' });
        } else {
            if (!listRemoved) {
                res.status(404).send({ message: 'No list was removed.' });
            } else {
                Item.find({ list: listRemoved._id }).remove((err, itemRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error in Server.' });
                    } else {
                        if (!itemRemoved) {
                            res.status(404).send({ message: 'No item was removed.' });
                        } else {
                            res.status(200).send({ listRemoved });
                        }
                    }
                });
            }
        }
    });
}

module.exports = {
    getList,
    getLists,
    saveList,
    updateList,
    deleteList
}