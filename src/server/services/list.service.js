const mongoose = require( 'mongoose' );

function updateListItems({ bodyItems, currentListDBItemsIds, ItemModel }) {
  const itemsToUpdate = bodyItems.filter( item => currentListDBItemsIds[item._id] );
  return itemsToUpdate.map( ({ _id, itemDescription }) => {
      return ItemModel.findOneAndUpdate(
        { _id },
        { itemDescription },
        { upsert: true, useFindAndModify: false },
      ).exec();
    });
}

function insertNewItems({ bodyItems, currentListDBItemsIds, ItemModel, relatedListId }) {
  const newItemsToInsert = bodyItems.filter( item => !currentListDBItemsIds[item._id] );
  return newItemsToInsert.map( item => {
      return new ItemModel({
        _id: new mongoose.Types.ObjectId(),
        itemDescription: item.itemDescription,
        list: relatedListId,
      });
    });
}

function deleteMissingListItems({ dbListItems, incomingReqItemsIds, ItemModel }) {
  const itemsToDelete = dbListItems.filter( item => !incomingReqItemsIds[item._id] );
  return itemsToDelete.map( ({ _id }) => {
    return ItemModel.deleteOne({ _id }).exec();
  });
}

module.exports = {
  updateListItems,
  insertNewItems,
  deleteMissingListItems,
};