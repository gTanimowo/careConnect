const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateJWT, authorizeRoles } = require("../middleware/auth");

router.post("/login", authController.loginUser);

router.post("/register", authController.registerUser);

router.post("/logout", authController.logoutUser);

router.get("/workers", authenticateJWT(), authController.getUsers);

router.put(
  "/:id",
  authenticateJWT(),
  authorizeRoles("admin"),
  authController.updateUser
);

router.delete(
  "/:id",
  authenticateJWT(),
  authorizeRoles("admin"),
  authController.deleteUser
);

module.exports = router;
