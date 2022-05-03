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

// UPDATE NOTE OF A USER | /api/v1/notes/updatenote/:id | auth required | PUT
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // Create a updatedValues onject with values which need to be updated
    const updatedValues = {};
    const { title, description, tag } = req.body;
    if (tag) updatedValues.tag = tag;
    if (title) updatedValues.title = title;
    if (description) updatedValues.description = description;

    // If note to update doesn't exists
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // If the note to be updated is not owned by the user return error
    if (note.user.toString() !== req.user.id) return res.status(401).send("Not allowed");

    note = await Note.findByIdAndUpdate(req.params.id, { $set: updatedValues }, { new: true });
    res.json(note);
  } catch (error) {
    // TODO: Add Logger
    console.error(error);
    res.status(500).send("Some Internal Error Occured in API: ");
  }
});

// DELETE NOTE OF A USER | /api/v1/notes/deletenote/:id | auth required | DELETE
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // If the note to be deleted is not owned by the user return error
    if (note.user.toString() !== req.user.id) return res.status(401).send("Not allowed");

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note });
  } catch (error) {
    // TODO: Add Logger
    console.error(error);
    res.status(500).send("Some Internal Error Occured in API: ");
  }
});

module.exports = router;
