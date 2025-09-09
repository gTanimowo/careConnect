const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const { authenticateJWT } = require("../middleware/auth");

router.get("/", authenticateJWT(), activityController.getActivities);

router.get(
  "/:id/activities",
  authenticateJWT(),
  activityController.getActivity
);

router.post("/", authenticateJWT(), activityController.createActivity);

module.exports = router;
