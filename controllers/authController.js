require("dotenv").config();
const User = require("../models/userModel");
const { passwordHash, comparePasswords } = require("../utils/helper");
const { jwtExpire } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_JWTSECRET;

const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  const hash = await passwordHash(password);

  const safeRole =
    role && req.user && req.user.role === "admin" ? role : "worker";

  try {
    const user = await User.createUser({
      name,
      email,
      password: hash,
      role: safeRole,
    });

    res.status(201).json({
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: jwtExpire,
    });

    res.json({
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  if (req.role != "admin") {
    return res.status(403).send("Admin rights only!");
  }
  try {
    const users = await User.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getUsers };
