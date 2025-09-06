const pool = require("../config/db");

const createResidents = async (resident) => {
  const { name, dob, room, notes, care_plan } = resident;
  const results = await pool.query(
    "INSERT INTO residents (name, dob, room, notes, care_plan) VALUES ($1, $2, $3, $4. $5) RETURNING *",
    [name, dob, room, notes, care_plan]
  );
  return results;
};

const getAllResidents = async () => {
  const results = await pool.query("SELECT * FROM residents ORDER BY id ASC");
  return results;
};

const getResidentsbyId = async (id) => {
  const results = pool.query("SELECT * FROM residents WHERE id = $1", [id]);
  return results;
};

const updateResidentbyId = async (id, resident) => {
  const { name, dob, room, notes, care_plan } = resident;
  const results = pool.query(
    "UPDATE residents SET (name = $1, dob = $2, room = $3, notes = $4, care_plan = $5) WHERE id = $6",
    [name, dob, room, notes, care_plan, id]
  );
  return results;
};

const deleteResident = async (id) => {
  await pool.query("DELETE FROM residents WHERE id = $1 ", [id]);
  return results;
};

module.exports = {
  createResidents,
  getAllResidents,
  getResidentsbyId,
  updateResidentbyId,
  deleteResident,
};
