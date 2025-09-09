const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

router.get("/", activityController.getActivities);

router.get("/:id/activities", activityController.getActivity);

router.post("/", activityController.createActivity);

module.exports = router;
