const pool = require("../config/db");

const createResidents = async (resident) => {
  const { name, dob, room, care_plan } = resident;
  const results = await pool.query(
    "INSERT INTO residents (name, dob, room, care_plan) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, dob, room, care_plan]
  );
  return results.rows[0];
};

const getAllResidents = async () => {
  const results = await pool.query("SELECT * FROM residents ORDER BY id ASC");
  return results.rows;
};

const getResidentsbyId = async (id) => {
  const results = await pool.query("SELECT * FROM residents WHERE id = $1", [
    id,
  ]);
  return results.rows[0];
};

const updateResidentbyId = async (id, resident) => {
  const { name, dob, room, care_plan } = resident;
  const results = await pool.query(
    "UPDATE residents SET name = $1, dob = $2, room = $3, care_plan = $4 WHERE id = $5 RETURNING *",
    [name, dob, room, care_plan, id]
  );
  return results.rows[0];
};

const deleteResident = async (id) => {
  await pool.query("DELETE FROM residents WHERE id = $1 ", [id]);
  return;
};

module.exports = {
  createResidents,
  getAllResidents,
  getResidentsbyId,
  updateResidentbyId,
  deleteResident,
};
