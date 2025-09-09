const express = require("express");
const activityNotesController = require("../controllers/activityNotesController");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

router.get("/:id/notes", authenticateJWT(), activityNotesController.getNotes);
router.post("/:id/notes", authenticateJWT(), activityNotesController.addNote);

module.exports = router;
