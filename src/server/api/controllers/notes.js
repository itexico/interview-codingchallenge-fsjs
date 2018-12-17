const mongoose = require("mongoose");

const Note = require("../models/note");

exports.notes_get_all = (req, res, next) => {
  Note.find()
    .select("title items _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        notes: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.notes_create_note = (req, res, next) => {
  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    items: req.body.items
  });
  note
    .save()
    .then(result => {
      res.status(201).json({
        message: "Note created successfully!",
        createdNote: {
          title: result.title,
          items: result.items,
          _id: result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.notes_get_note = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .select("title items _id")
    .exec()
    .then(note => {
      if (note) {
        res.status(200).json({
          message: "Note found!",
          note: note
        });
      } else {
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.notes_update_note = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.update({ _id: noteId }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Note updated successfully!"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.notes_remove_note = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.deleteOne({ _id: noteId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Note deleted successfully!"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

/*-------------------------*/

exports.entries_get_all = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .select("title items _id")
    .exec()
    .then(note => {
      if (note) {
        res.status(200).json({
          message: "Note successfully found",
          note: note
        });
      } else {
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.entries_create_entry = (req, res, next) => {
  const noteId = req.params.noteId;
  const newItem = req.body.item;
  if (!newItem)
    return res.status(400).json({
      // handle incorrect request
      message: "Invalid body request, 'item' field is required"
    });
  Note.findById(noteId)
    .exec()
    .then(note => {
      if (note) {
        note.items.push(newItem); //adds new item to the note's items
        note
          .save()
          .then(result => {
            res.status(201).json({
              message: "New item was added to the note successfully!",
              updatedNote: {
                title: result.title,
                items: result.items,
                _id: result._id
              }
            });
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      } else {
        // Note ID No Found
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

exports.entries_get_entry = (req, res, next) => {
  const noteId = req.params.noteId;
  const itemIndex = req.params.itemIndex;

  Note.findById(noteId)
    .select('title items _id')
    .exec()
    .then(note => {
      if (note) {
        const item = note.items[itemIndex]; // retrieving item from the note
        if (item === undefined)
          return res.status(400).json({ message: "Wrong entry index" });
        res.status(200).json({
          message: "Item successfully found!",
          item: item,
          note: note
        });
      } else {
        // Note ID No Found
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.entries_update_entry = (req, res, next) => {
  const noteId = req.params.noteId;
  const itemIndex = req.params.itemIndex;
  const updatedItem = req.body.item;
  if (!updatedItem)
    return res.status(400).json({
      // handle incorrect request
      message: "Invalid body request, 'item' field is required"
    });
  Note.findById(noteId)
    .exec()
    .then(note => {
      if (note) {
        // handle wrong index
        if (note.items[itemIndex] === undefined)
          return res.status(400).json({ message: "Wrong entry index" });
        // update the item from the note
        note.items.splice(itemIndex, 1, updatedItem);
        note
          .save()
          .then( result => {
            console.log(result);
            res.status(200).json({
              message: "Item successfully updated!",
              updatedItem: updatedItem,
              updatedNote: {
                title: result.title,
                items: result.items,
                _id: result._id
              } 
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      } else {
        // Note ID No Found
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.entries_remove_entry = (req, res, next) => {
  const noteId = req.params.noteId;
  const itemIndex = req.params.itemIndex;

  Note.findById(noteId)
    .exec()
    .then(note => {
      if (note) {
        // handle wrong index
        if (note.items[itemIndex] === undefined)
          return res.status(400).json({ message: "Wrong entry index" });

        // remove the item from the note
        note.items.splice(itemIndex, 1);
        note
          .save()
          .then( result => {
            console.log(result);
            res.status(200).json({
              message: "Item removed successfully!",
              updatedNote: {
                title: result.title,
                items: result.items,
                _id: result._id
              } 
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
        
      } else {
        // Note ID No Found
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}