const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateJWT } = require("../middleware/auth");

router.post("/login", authController.loginUser);

router.post("/register", authController.registerUser);

router.post("/logout", authController.logoutUser);

router.get("/workers", authenticateJWT(), authController.getUsers);

module.exports = router;
