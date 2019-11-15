const express = require( 'express' );
const router = express.Router();

const mongoose = require( 'mongoose' );
const Item = require( '../models/item' );

// Get all items
router.get( '/', async ( req, res ) => {
  try {
    const items = await Item.find();
    return res.json( items );
  } catch ( err ) {
    return res.status( 500 ).json({ message: err.message });
  }
});

// Get one item
router.get( '/:id', getItem, ( req, res ) => {
  return res.status( 200 ).json( res.item );
});

// Create one item
router.post( '/', async ( req, res ) => {

  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    itemDescription: req.body.itemDescription,
  });

  try {
    const newItem = await item.save();
    return res.status( 200 ).json( newItem );
  } catch ( err ) {
    return res.status( 400 ).json({ message: err.message });
  }

});

// Update an item
router.patch( '/:id', getItem, async ( req, res ) => {

  if ( req.body.itemDescription ) res.item.itemDescription = req.body.itemDescription;

  try {
    const updatedItem = await res.item.save();
    return res.status( 200 ).json( updatedItem );
  } catch ( err ) {
    return res.status( 400 ).json({ message: err.message });
  }

});

// Delete an item
router.delete( '/:id', getItem, async ( req, res ) => {
  try {
    res.item.remove();
    res.status( 200 ).json({ message: `The item with ID ${res.item._id} has been deleted` });
  } catch( err ) {
    res.status( 500 ).json({ message: err.message });
  }
});

async function getItem( req, res, next ) {
  let item;
  try {
    item = await Item.findById( req.params.id );
    if ( !item ) return res.status( 404 ).json({ message: 'Item not found' });
  } catch( err ){
    return res.status( 500 ).json({ message: err.message });
  }

  res.item = item;
  return next();
}

module.exports = router;