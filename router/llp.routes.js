const express = require("express");
const router = express.Router();
const LlpRegistrationController = require("../controllers/LlpRegistrationController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Create a new LLP registration with partners
router.post("/", authenticateToken, LlpRegistrationController.createLlpRegistration);

// Update an LLP registration and replace its partners
router.put("/:id", authenticateToken, LlpRegistrationController.updateLlpRegistration);

// Get all LLP registrations for the current user
router.get("/", authenticateToken, LlpRegistrationController.getAllLlpRegistrations);

// Get a specific LLP registration by ID
router.get("/:id", authenticateToken, LlpRegistrationController.getLlpRegistrationById);

module.exports = router; 