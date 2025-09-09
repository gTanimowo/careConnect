const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");
const { authenticateJWT, authorizeRoles } = require("../middleware/auth");

router.get("/", authenticateJWT(), residentController.getResidents);

router.get("/:id", authenticateJWT(), residentController.getResident);

router.post(
  "/",
  authenticateJWT(),
  authorizeRoles("admin"),
  residentController.createResident
);

router.put(
  "/:id",
  authenticateJWT(),
  authorizeRoles("admin"),
  residentController.updateResident
);

router.delete(
  "/:id",
  authenticateJWT(),
  authorizeRoles("admin"),
  residentController.deleteResident
);

module.exports = router;
