const express = require( 'express' );
const router = express.Router();
const List = require( '../models/list' );
const Item = require( '../models/item' );
const mongoose = require( 'mongoose' );

// Get all list
router.get( '/', async ( req, res ) => {
  try {
    const lists = await List.find().populate( 'items' );
    res.json( lists );
  } catch ( err ) {
    res.status( 500 ).json({ message: err.message });
  }
});

// Get one list
router.get( '/:id', ( req, res ) => {
});

// Create one list
router.post( '/', async ( req, res ) => {

  const list = new List({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
  });

  const items = req.body.items.map( item => {
    return new Item({
      _id: new mongoose.Types.ObjectId(),
      itemDescription: item.itemDescription,
      list: list._id,
    });
  });

  const resultItems = await Item.insertMany( items );

  try {
    resultItems.forEach( item => list.items.push( item._id ) );
    const newList = await list.save();
    res.status( 200 ).json( newList );
  } catch ( err ) {
    res.status( 400 ).json({ message: err.message });
  }

});

// Update a list
router.patch( '/:id', ( req, res ) => {
});

// Delete a list
router.delete( '/:id', ( req, res ) => {
});

module.exports = router;