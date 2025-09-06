const pool = require("../config/db");

const createUser = async (users) => {
  const { name, email, hashed_password, role } = users;
  const results = await pool.query(
    "INSERT INTO users (name, email, hashed_password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashed_password, role]
  );
  return results;
};

const getUsers = async () => {
  const results = await pool.query("SELECT * FROM users");
  return results;
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

module.exports = { createUser, getUsers, getUsersbyId, getUserByEmail };
