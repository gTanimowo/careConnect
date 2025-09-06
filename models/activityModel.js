const pool = require("../config/db");

const createActivities = async (req, res) => {
  const { resident_id, activity_type, notes, timestamp } = req.body;
  const results = await pool.query(
    "INSERT INTO activities (activity_type, notes, timestamp) VALUES ($1, $2, $3) RETURNING *",
    [resident_id, activity_type, notes, timestamp]
  );
  res.status(201).send(results.row);
};

const getAllActivities = async (req, res) => {
  const results = await pool.query(
    ` SELECT 
        activities.id AS activity_id, 
        residents.name AS resident_name, 
        activities.activity_type,
        activities.notes,
        activities.timestamp 
    FROM activities JOIN residents ON activities.resident_id = residents.id ORDER BY id ASC`
  );
  res.status(200).json(results.rows);
};

const getAllActivitiesbyResidentId = async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await pool.query(
    `SELECT 
         activities.id AS activity_id,
         residents.name AS resident_name,
         activities.activity_type,
         activities.notes,
         activities.timestamp
       FROM activities
       JOIN residents ON activities.resident_id = residents.id
       WHERE residents.id = $1
       ORDER BY activities.timestamp DESC`,
    [id]
  );
  res.status(200).json(results.rows);
};

module.exports = {
  createActivities,
  getAllActivities,
  getAllActivitiesbyResidentId,
};
