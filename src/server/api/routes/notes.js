// Import npm modules
const express = require("express");
const mongoose = require("mongoose");

// Initialize express router
const router = express.Router();

const Note = require("../models/note");

/*
  NOTE ROUTES [5]
*/

// ----------------------------
// Retrieve a list of all notes
// ----------------------------
router.get("/", (req, res, next) => {
  Note.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// -------------
// Create a note
// -------------
router.post("/", (req, res, next) => {
  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    items: req.body.items
  });
  note
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "a note was created",
        note: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// ------------------------
// Retrieve a specific note
// ------------------------
router.get("/:noteId", (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .exec()
    .then(note => {
      console.log(note);
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//-----------------------
// Update a specific note
//-----------------------
router.patch("/:noteId", (req, res, next) => {
  const noteId = req.params.noteId;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  Note.update({ _id: noteId }, { $set: req.body })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// -----------------------
// Remove a specific note
// -----------------------
router.delete("/:noteId", (req, res, next) => {
  const noteId = req.params.noteId;
  Note.remove({ _id: noteId })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/*
   ENTRY ROUTES [5]
*/

// -----------------------------------------------
// Retrieve a list of entries from a specific note
// -----------------------------------------------
router.get("/:noteId/entries", (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .exec()
    .then(note => {
      console.log(note);
      if (note) {
        res.status(200).json({
          title: note.title,
          items: note.items
        });
      } else {
        res.status(404).json({ message: "Invalid ID for note" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// ------------------------------------
// Create an entry from a specific note
// ------------------------------------
router.post("/:noteId/entries", (req, res, next) => {
  const noteId = req.params.noteId;
  const newItem = req.body.item;

  if (!newItem)
    return res.status(400).json({
      // handle incorrect request
      message: "invalid body request, use the 'item' key"
    });

  Note.findById(noteId)
    .exec()
    .then(note => {
      if (note) {
        note.items.push(newItem); //adds new item to the note's items
        note
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "a new item was added to the note",
              updatedNote: result
            });
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
});

// ----------------------------------------------
// Retrieve a specific entry from a specific note
// ----------------------------------------------
router.get("/:noteId/entries/:itemIndex", (req, res, next) => {
  const noteId = req.params.noteId;
  const itemIndex = req.params.itemIndex;

  Note.findById(noteId)
    .exec()
    .then(note => {
      if (note) {
        const item = note.items[itemIndex]; // retrieving item from the note
        if (item === undefined)
          return res.status(400).json({ message: "Wrong entry index" });
        res.status(200).json({
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
});

// ---------------------------------------------
// Update a specific entry from a specific note
// ---------------------------------------------
router.patch("/:noteId/entries/:itemIndex", (req, res, next) => {
  const noteId = req.params.noteId;
  const itemIndex = req.params.itemIndex;
  const updatedItem = req.body.item;

  if (!updatedItem)
    return res.status(400).json({
      // handle incorrect request
      message: "invalid body request, use the 'item' key"
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
              updatedItem: updatedItem,
              updatedNote: result 
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
});

// ---------------------------------------------
// Remove a specific entry from a specific note
// ---------------------------------------------
router.delete("/:noteId/entries/:itemIndex", (req, res, next) => {
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
              message: "Item removed",
              updatedNote: result 
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
});

module.exports = router;
