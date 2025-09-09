const express = require("express");
const activityNotesController = require("../controllers/activityNotesController");

const router = express.Router();

router.get("/:id/notes", activityNotesController.getNotes); 
router.post("/:id/notes", activityNotesController.addNote); 

module.exports = router;
