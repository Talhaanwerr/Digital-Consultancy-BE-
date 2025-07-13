const express = require("express");
const router = express.Router();
const PvtLtdRegistrationController = require("../controllers/PvtLtdRegistrationController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Create a new Private Limited Company registration with directors and nominee
router.post("/", authenticateToken, PvtLtdRegistrationController.createPvtLtdRegistration);

// Update a Private Limited Company registration and replace its directors and nominee
router.put("/:id", authenticateToken, PvtLtdRegistrationController.updatePvtLtdRegistration);

// Get all Private Limited Company registrations for the current user
router.get("/", authenticateToken, PvtLtdRegistrationController.getAllPvtLtdRegistrations);

// Get a specific Private Limited Company registration by ID
router.get("/:id", authenticateToken, PvtLtdRegistrationController.getPvtLtdRegistrationById);

module.exports = router; 