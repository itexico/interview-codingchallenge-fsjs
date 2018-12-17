// Import npm modules
const express = require("express");
const mongoose = require("mongoose");

const checkAuth = require('../middleware/check-auth')

// Initialize express router
const router = express.Router();

const Note = require("../models/note");

// Import controllers
const NotesControllers = require("../controllers/notes")


/*
  NOTE ROUTES [5]
*/

// Retrieve a list of all notes
router.get("/", checkAuth, NotesControllers.notes_get_all);

// Create a note
router.post("/", checkAuth, NotesControllers.notes_create_note);

// Retrieve a specific note
router.get("/:noteId", checkAuth, NotesControllers.notes_get_note);

// Update a specific note
router.patch("/:noteId", checkAuth, NotesControllers.notes_update_note);

// Remove a specific note
router.delete("/:noteId", checkAuth, NotesControllers.notes_remove_note);

/*
   ENTRY ROUTES [5]
*/

// Retrieve a list of entries from a specific note
router.get("/:noteId/entries", checkAuth, NotesControllers.entries_get_all);

// Create an entry from a specific note
router.post("/:noteId/entries", checkAuth, NotesControllers.entries_create_entry);

// Retrieve a specific entry from a specific note
router.get("/:noteId/entries/:itemIndex", checkAuth, NotesControllers.entries_get_entry);

// Update a specific entry from a specific note
router.patch("/:noteId/entries/:itemIndex", checkAuth, NotesControllers.entries_update_entry);

// Remove a specific entry from a specific note
router.delete("/:noteId/entries/:itemIndex", checkAuth, NotesControllers.entries_remove_entry);

module.exports = router;
