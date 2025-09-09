const pool = require("../config/db");

const createActivities = async (resident_id, worker_id, activity_type) => {
  const results = await pool.query(
    "INSERT INTO activities (resident_id, worker_id, activity_type ) VALUES ($1, $2, $3) RETURNING *",
    [resident_id, worker_id, activity_type]
  );
  return results.rows;
};

const getAllActivities = async () => {
  const results = await pool.query(
    ` SELECT 
        activities.id AS activity_id, 
        residents.name AS resident_name, 
        users.name AS workers_name,
        activities.activity_type,
        activities.timestamp 
    FROM activities 
    JOIN residents ON activities.resident_id = residents.id 
    JOIN users ON activities.worker_id = users.id
    ORDER BY activities.id ASC`
  );
  return results.rows;
};

const getAllActivitiesbyResidentId = async (residentId) => {
  const results = await pool.query(
    `SELECT 
         activities.id AS activity_id,
         residents.name AS resident_name,
         users.name AS worker_name,
         activities.activity_type,
         activities.timestamp
       FROM activities
       JOIN residents ON activities.resident_id = residents.id
       JOIN users ON activities.worker_id = users.id
       WHERE residents.id = $1
       ORDER BY activities.timestamp DESC`,
    [residentId]
  );
  return results.rows;
};

module.exports = {
  createActivities,
  getAllActivities,
  getAllActivitiesbyResidentId,
};
