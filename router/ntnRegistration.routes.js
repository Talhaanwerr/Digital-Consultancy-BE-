const express = require("express");
const router = express.Router();
const NtnRegistrationController = require("../controllers/NtnRegistrationController");
const authenticateToken = require("../middlewares/auth.middleware");

// Create or update NTN registration
router.post("/", authenticateToken, NtnRegistrationController.createOrUpdateNtnRegistration);

// Get all NTN registrations for the authenticated user with optional filters
router.get("/", authenticateToken, NtnRegistrationController.getNtnRegistrations);

// Get a specific NTN registration by ID
router.get("/:id", authenticateToken, NtnRegistrationController.getNtnRegistrationById);

// Update a specific NTN registration by ID
router.put("/:id", authenticateToken, NtnRegistrationController.updateNtnRegistration);

module.exports = router; 