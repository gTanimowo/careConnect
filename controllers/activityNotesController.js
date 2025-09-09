const ActivityNotes = require("../models/activityNotesModel");

const getNotes = async (req, res, next) => {
  const residentId = parseInt(req.params.id, 10);

  if (isNaN(residentId)) {
    return res.status(400).json({ error: "Invalid resident ID" });
  }

  try {
    const notes = await ActivityNotes.getNotesByResident(residentId);
    if (!notes || notes.length === 0) {
      return res
        .status(404)
        .json({ message: "No activity notes found for this resident." });
    }
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

const addNote = async (req, res, next) => {
  const { activity_id, worker_id, note } = req.body;
  try {
    const newNote = await ActivityNotes.addNote(activity_id, worker_id, note);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotes, addNote };
