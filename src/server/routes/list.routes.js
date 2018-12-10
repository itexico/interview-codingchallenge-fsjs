const express = require('express');
const router = express.Router();
const List = require('../models/list');

router.get('/', async (req, res) => {
    const lists = await List.find();
    res.json(lists);
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    const list = new List({title});
    await list.save();    
    res.json({status: 'List saved'});
});

router.post('/item/:id', async (req, res) => {
    const { title } = req.body;
    await List.findById(req.params.id).then(record => {
        record.items.push({title});
        record.save();
    }) 
    res.json({status: 'Item saved'});
});

router.delete('/:id', async (req, res) => {
    await List.findByIdAndDelete(req.params.id);
    res.json({status: 'List Deleted'});
});

router.delete('/item/:id/:idItem', async (req, res) => {
    await List.findById(req.params.id).then(record => {
        for (let index = 0; index < record.items.length; index++) {
            if (record.items[index]._id == req.params.idItem) {
                record.items[index].remove();
                record.save();
            }
        }
    }) 
    res.json({status: 'Item deleted'})
});

 
module.exports = router