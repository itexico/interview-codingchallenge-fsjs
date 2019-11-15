const express = require( 'express' );
const router = express.Router();
const List = require( '../models/list' );
const Item = require( '../models/item' );
const mongoose = require( 'mongoose' );
const {
  updateListItems,
  deleteMissingListItems,
  insertNewItems,
} = require( '../services/list.service' );

// Get all list
router.get( '/', async ( req, res ) => {
  try {
    const lists = await List.find().populate( 'items' );
    return res.json( lists );
  } catch ( err ) {
    return res.status( 500 ).json({ message: err.message });
  }
});

// Get one list
router.get( '/:id', getList, ( req, res ) => {
  return res.status( 200 ).json( res.list );
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
    return res.status( 200 ).json( newList );
  } catch ( err ) {
    return res.status( 400 ).json({ message: err.message });
  }

});

// Update a list
router.patch( '/:id', getList, async ( req, res ) => {

  if ( req.body.title ) res.list.title = req.body.title;

  try {

    const currentListDBItemsIds = {};
    res.list.items.forEach( item => currentListDBItemsIds[item._id] = true );

    const incomingReqItemsIds = {};
    req.body.items.forEach( item => incomingReqItemsIds[item._id] = true );

    // Update modified items from the current list.
    await Promise.all( updateListItems({
      bodyItems: req.body.items,
      currentListDBItemsIds,
      ItemModel: Item
    }) );

    // Delete the items that were removed in the frontend.
    await Promise.all( deleteMissingListItems({
      dbListItems: res.list.items,
      incomingReqItemsIds,
      ItemModel: Item,
    }) );

    // Insert the new items that were added in the frontend.
    const itemsToInsert = insertNewItems(
      { bodyItems: req.body.items,
        currentListDBItemsIds,
        ItemModel: Item,
        relatedListId: res.list._id
      },
    );

    const resultItems = await Item.insertMany( itemsToInsert );

    // Create relation for new items with the current list.
    resultItems.forEach( item => res.list.items.push( item._id ) );
    const updatedList = await res.list.save();

    return res.status( 200 ).json( updatedList );
  } catch ( err ) {
    return res.status( 400 ).json({ message: err.message });
  }

});

// Delete a list
router.delete( '/:id', getList, async ( req, res ) => {
  try {
    const listId = res.list._id;
    await Promise.all( [
      Item.deleteMany({ list: listId }).exec(),
      res.list.remove(),
    ] );
    res.status( 200 ).json({ message: `The list with ID ${res.list._id} has been deleted` });
  } catch( err ) {
    res.status( 500 ).json({ message: err.message });
  }
});

async function getList( req, res, next ) {
  let list;
  try {
    list = await List.findById( req.params.id ).populate( 'items' );
    if ( !list ) return res.status( 404 ).json({ message: 'List not found' });
  } catch( err ){
    return res.status( 500 ).json({ message: err.message });
  }

  res.list = list;
  return next();
}

module.exports = router;