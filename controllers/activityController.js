const Activities = require("../models/activityModel");

const createActivity = async (req, res, next) => {
  const { resident_id, worker_id, activity_type } = req.body;

  if (!resident_id || !worker_id || !activity_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const activity = await Activities.createActivities(
      resident_id,
      worker_id,
      activity_type
    );

    return res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
};

const getActivities = async (req, res, next) => {
  try {
    const activities = await Activities.getAllActivities();
    return res.status(200).json(activities);
  } catch (err) {
    next(err);
  }
};

const getActivity = async (req, res, next) => {

  const residentId = parseInt(req.params.id, 10);
  if (isNaN(residentId)) {
    return res.status(400).json({ error: "Invalid resident ID" });
  }
  try {
    const activity = await Activities.getAllActivitiesbyResidentId(residentId);
    res.status(200).json(activity);
  } catch (err) {
    next(err);
  }
};

module.exports = { createActivity, getActivities, getActivity };
