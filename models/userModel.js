const pool = require("../config/db");

const createUser = async (users) => {
  const { name, email, password, role } = users;

  const results = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, role]
  );
  return results.rows[0];
};

const getUsers = async () => {
  const results = await pool.query("SELECT * FROM users");
  return results.rows;
};

const getUsersbyId = async (id) => {
  const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return results.rows[0];
};

const getUserByEmail = async (email) => {
  const results = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return results.rows[0];
};

const updateUserbyId = async (id, user) => {
  const { name, email, role } = user;
  const results = await pool.query(
    "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
    [name, email, role, id]
  );
  return results.rows[0];
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1 ", [id]);
  return;
};

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  getUsersbyId,
  updateUserbyId,
  deleteUser,
};
