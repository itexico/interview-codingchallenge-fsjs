const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Item = require('../models/list');

router.get('/', async (req, res) => {
    const lists = await List.find().populate('_owner').exec();
    res.json(lists);
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    const list = new List({title});
    await list.save();    
    res.json({status: 'List saved'});
});

router.post('/item', async (req, res) => {
    const { _owner, title } = req.body;
    const item = new Item({_owner, title});
    await item.save();    
    res.json({status: 'Item saved'});
});

 
module.exports = router