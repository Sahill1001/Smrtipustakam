const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route 1 : Get All notes with end-point using GET: /api/v1/notes/fetchAllNotes . loggin require
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    console.error("Error" + error.message);
    return res.status(500).send("Internal server error");
  }
});

//Route 2 : Get a notes using id with end-point using GET: /api/v1/notes/fetchOneNote/:id . loggin require
router.get("/fetchOneNote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    return res.json(note);
  } catch (error) {
    console.error("Error" + error.message);
    return res.status(500).send("Internal server error");
  }
});

//Route 3 : Add note with end-point using POST: /api/v1/notes/addNote . loggin require
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 character")
      .trim()
      .isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character")
      .trim()
      .isLength({
        min: 5,
      }),
  ],
  async (req, res) => {
    //Check and valid request data or req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Destructuring title,description and tag from req.body;
      const { title, description, tag } = req.body;
      //add data in Schema
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //save the note into database
      const savedNote = await note.save();
      return res.json(savedNote);
    } catch (error) {
      console.error("ERROR " + error.message);
      return res.status(500).send("Internal Server error");
    }
  }
);

//Route 4 : Update existing note with end-point using PUT: /api/v1/notes/updateNote/:id . loggin require

router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    //Destructuring title,description and tag from req.body;
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    console.error("ERROR " + error.message);
    return res.status(500).send("Internal Server error");
  }
});

//Route 5 : Delete existing note with end-point using DELETE: /api/v1/notes/deleteNote/:id . loggin require

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //Note exist or note
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //check is the right user?
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    //Delete note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note  has been deleted successfully", note: note });
  } catch (error) {
    console.error("ERROR " + error.message);
    return res.status(500).send("Internal Server error");
  }
});

module.exports = router;
