const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const getValidationError = require("../middleware/get-validation-error");
const Note = require("../models/Note");
const addNoteChecksArray = require("../validator/note/addnotecheck");

// Ceating express router for routing
const router = express.Router();

// CREATE NEW NOTE FOR A USER | /api/v1/notes/addnote | auth required | POST
router.post("/addnote", addNoteChecksArray, getValidationError, fetchuser, async (req, res) => {
  try {
    // Get the datas from the req and create a new note in the logged in user account and send the note
    const { title, description, tag } = req.body;
    const note = await Note.create({ title, description, tag, user: req.user.id });
    res.json(note);
  } catch (error) {
    // TODO: Add Logger
    console.error(error);
    res.status(500).send("Some Internal Error Occured in API: ");
  }
});

// FETCH ALL NOTES OF A USER | /api/v1/notes/getnotes | auth required | GET
router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    // Fetch notes of a logged in user with his id and return the notes
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // TODO: Add Logger
    console.error(error);
    res.status(500).send("Some Internal Error Occured in API: ");
  }
});

module.exports = router;
