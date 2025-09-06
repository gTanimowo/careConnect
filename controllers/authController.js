const User = require("../models/userModel");
const { passwordHash, comparePasswords } = require("../utils/helper");
const { jwtExpire } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET;

const registerUser = async (req, res) => {
  const { name, email, hashed_password, role } = req.body;
  const hash = passwordHash(hashed_password);

  const safeRole =
    role && req.user && req.user.role === "admin" ? role : "worker";

  try {
    const user = await User.createUser(name, email, hash, safeRole);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, hashed_password } = req.body;

  try {
    const user = await helper.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await comparePasswords(
      hashed_password,
      user.hashed_password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: jwtExpire,
    });

    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser };
