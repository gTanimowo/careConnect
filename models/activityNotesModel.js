const pool = require("../config/db");

const getNotesByResident = async (residentId) => {
  const result = await pool.query(
    `SELECT 
    an.resident_id,
    r.name AS resident_name,
    u.name AS worker_name,
    an.note,
    an.created_at
  FROM activity_notes an
  JOIN residents r ON an.resident_id = r.id
  JOIN users u ON an.worker_id = u.id
  WHERE an.resident_id = $1
  ORDER BY an.created_at DESC;
`,
    [residentId]
  );
  return result.rows;
};

const addNote = async (resident_id, worker_id, note) => {
  const result = await pool.query(
    "INSERT INTO activity_notes (resident_id, worker_id, note) VALUES ($1, $2, $3) RETURNING *",
    [resident_id, worker_id, note]
  );
  return result.rows[0];
};

module.exports = { getNotesByResident, addNote };
