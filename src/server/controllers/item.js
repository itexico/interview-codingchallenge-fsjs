const Item = require("../schemas/Item");

function readAll(req, res) {
  const listId = req.params.listId;

  Item.find({ list: listId }, (err, allItems) => {
    if (err) {
      console.log("Error on item readAll");
      res.status(500).send({ errorMessage: "Internal Server Error; readAll" });
      return;
    }
    if (!allItems) {
      console.log("There's no items");
      res.status(404).send({ errorMessage: "Items not found" });
      return;
    }
    console.log(`Items found: ${allItems}`);
    res.status(200).send({ allItems });
  });
}

function create(req, res) {
  const item = new Item();
  item.title = req.body.title;
  item.list = req.params.listId;

  if (!item.title || !item.list) {
    console.log("Error on item create");
    res.status(500).send({ errorMessage: "Internal Server Error; create" });
    return;
  }
  item.save((err, createdItem) => {
    if (err) {
      console.log("Error on item create");
      res.status(500).send({ errorMessage: "Internal Server Error; create" });
      return;
    }
    console.log(`Item created: ${createdItem}`);
    res.status(200).send({ createdItem });
  });
}

function read(req, res) {
  const id = req.params.id;
  Item.findById(id, (err, item) => {
    if (err) {
      console.log("Error on item read");
      res.status(500).send({ errorMessage: "Internal Server Error; read" });
      return;
    }
    if (!item) {
      console.log("Item not found");
      res.status(404).send({ errorMessage: "Item not found" });
      return;
    }
    console.log(`Item found: ${item}`);
    res.status(200).send({ item });
  });
}

function update(req, res) {
  const id = req.params.id;
  const newTitle = req.body;

  Item.findOneAndUpdate({ _id: id }, newTitle, (err, updatedItem) => {
    if (err) {
      console.log("Error on item update");
      res.status(500).send({ errorMessage: "Internal Server Error; update" });
      return;
    }
    if (!updatedItem) {
      console.log("Item not found");
      res.status(404).send({ errorMessage: "Item not found" });
      return;
    }
    console.log(`Item updated: ${updatedItem}`);
    res.status(200).send({ updatedItem });
  });
}

function destroy(req, res) {
  const id = req.params.id;
  Item.findByIdAndDelete(id, (err, deletedItem) => {
    if (err) {
      console.log("Error on item destroy");
      res.status(500).send({ errorMessage: "Internal Server Error; destroy" });
      return;
    }
    if (!deletedItem) {
      console.log("Item not found");
      res.status(404).send({ errorMessage: "Item not found" });
      return;
    }
    console.log(`Item deleted: ${deletedItem}`);
    res.status(200).send({ deletedItem });
  });
}

module.exports = { readAll, create, read, update, destroy };
