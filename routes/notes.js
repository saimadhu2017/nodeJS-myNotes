const express = require("express");
const notesRouting = express.Router();
const notesControllers = require("../controllers/notes");

notesRouting.get("/notes", notesControllers.getNotes);

notesRouting.post("/notes", notesControllers.postNotes);

notesRouting.put("/notes/:id", notesControllers.putNotes);

notesRouting.delete("/notes/:id", notesControllers.deleteNotes);

notesRouting.all("*", notesControllers.invalidNotes);

module.exports = notesRouting;