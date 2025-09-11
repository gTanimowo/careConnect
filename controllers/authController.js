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
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
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
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const updated = await User.updateUserbyId(id, user);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    User.deleteUser(req.params.id);
    return res.status(204).send("User Deleted");
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  logoutUser,
  deleteUser,
  updateUser,
};
