const List = require("../schemas/List");
const Item = require("../schemas/Item");

function readAll(req, res) {
  List.find({}, (err, allLists) => {
    if (err) {
      console.log("Error on list readAll");
      res.status(500).send({ errorMessage: "Internal Server Error; readAll" });
      return;
    }
    if (!allLists) {
      console.log("There's no lists");
      res.status(404).send({ errorMessage: "Lists not found" });
      return;
    }
    console.log(`Lists found: ${allLists}`);
    res.status(200).send({ allLists });
  });
}

function create(req, res) {
  const list = new List();
  list.title = req.body.title;

  if (!list.title) {
    console.log("Error on list create");
    res.status(500).send({ errorMessage: "Internal Server Error; create" });
    return;
  }
  list.save((err, createdList) => {
    if (err) {
      console.log("Error on list create");
      res.status(500).send({ errorMessage: "Internal Server Error; create" });
      return;
    }
    console.log(`List created: ${createdList}`);
    res.status(200).send({ createdList });
  });
}

function read(req, res) {
  const id = req.params.id;
  List.findById(id, (err, list) => {
    if (err) {
      console.log("Error on list read");
      res.status(500).send({ errorMessage: "Internal Server Error; read" });
      return;
    }
    console.log(`List found: ${list}`);
    res.status(200).send({ list });
  });
}

function update(req, res) {
  const id = req.params.id;
  const newTitle = req.body;

  if (!newTitle) {
    console.log("Error on list update");
    res.status(500).send({ errorMessage: "Internal Server Error; update" });
    return;
  }
  List.findOneAndUpdate({ _id: id }, newTitle, (err, updatedList) => {
    if (err) {
      console.log("Error on list update");
      res.status(500).send({ errorMessage: "Internal Server Error; update" });
      return;
    }
    console.log(`List updated: ${updatedList}`);
    res.status(200).send({ updatedList });
  });
}

function destroy(req, res) {
  const id = req.params.id;
  List.findByIdAndDelete(id, (listErr, deletedList) => {
    if (listErr) {
      console.log("Error on list destroy");
      res.status(500).send({ errorMessage: "Internal Server Error; destroy" });
      return;
    }
    if (!deletedList) {
      console.log("List not found");
      res.status(404).send({ errorMessage: "List not found" });
      return;
    }

    // Find items of this list and deletes them
    Item.deleteMany({ list: deletedList._id }, (itemErr, deletedItems) => {
      if (itemErr) {
        console.log("Error on list items destroy");
        res
          .status(500)
          .send({ errorMessage: "Internal Server Error; destroy" });
        return;
      }
      console.log(`List deleted: ${deletedItems}`);
      res.status(200).send({ deletedItems });
    });
  });
}

module.exports = { readAll, create, read, update, destroy };
