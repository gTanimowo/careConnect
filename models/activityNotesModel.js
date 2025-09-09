const pool = require("../config/db");

const getNotesByResident = async (residentId) => {
  const result = await pool.query(
    `SELECT 
    r.name AS resident_name,
    u.name AS worker_name,
    a.activity_type AS activity_name,
    an.note,
    an.created_at
FROM activity_notes an
JOIN activities a ON an.activity_id = a.id
JOIN residents r ON a.resident_id = r.id
JOIN users u ON an.worker_id = u.id
WHERE r.id = $1
ORDER BY an.created_at DESC;

`,
    [residentId]
  );
  return result.rows;
};

const addNote = async (activity_id, worker_id, note) => {
  const result = await pool.query(
    "INSERT INTO activity_notes (activity_id, worker_id, note) VALUES ($1, $2, $3) RETURNING *",
    [activity_id, worker_id, note]
  );
  return result.rows[0];
};

module.exports = { getNotesByResident, addNote };
