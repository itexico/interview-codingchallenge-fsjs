// Import npm modules
const express = require("express");

// Initialize express router
const router = express.Router();


/*
  NOTE ROUTES [5]
*/

// retrieve a list of all notes
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "All notes were fetched"
  });
});

// create a note
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Note was created"
  });
});

// retrieve a specific note 
router.get("/:noteId", (req, res, next) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `Note ${noteId} fetched`
  });
});

// update a specific note
router.patch("/:noteId", (req, res, next) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `Note ${noteId} updated`
  });
});


// removes a specific note
router.delete("/:noteId", (req, res, next) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `Note ${noteId} deleted`
  });
});


/*
  ENTRY ROUTES [5]
*/

// retrieve a list of entries from a specific note
router.get("/:noteId/entries", (req, res, next) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `All entries from note ${noteId} were fetched`
  });
});

// create an entry from a specific note 
router.post("/:noteId/entries", (req, res, next) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `A new entry to note ${noteId} was created`
  });
});

// retrieve a specific entry from a specific note
router.get('/:noteId/entries/:entryNumber', (req, res, next) => {
  const noteId = req.params.noteId;
  const entryNumber =  req.params.entryNumber;
  res.status(200).json({
    message: `Entry number ${entryNumber}, from note ${noteId}, fetched`
  })
})

// updates a specific entry from a specific note
router.patch('/:noteId/entries/:entryNumber', (req, res, next) => {
  const noteId = req.params.noteId;
  const entryNumber =  req.params.entryNumber;
  res.status(200).json({
    message: `Entry number ${entryNumber}, from note ${noteId}, updated`
  })
})

// deletes a specific entry from a specific note
router.delete('/:noteId/entries/:entryNumber', (req, res, next) => {
  const noteId = req.params.noteId;
  const entryNumber =  req.params.entryNumber;
  res.status(200).json({
    message: `Entry number ${entryNumber}, from note ${noteId}, deleted`
  })
})



module.exports = router;
