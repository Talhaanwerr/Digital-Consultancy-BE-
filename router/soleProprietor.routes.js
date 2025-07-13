const express = require("express");
const router = express.Router();
const SoleProprietorRegistrationController = require("../controllers/SoleProprietorRegistrationController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const isAdmin = require("../middlewares/admin.middleware.js");

// Create or update a sole proprietor registration
router.post("/", authenticateToken, SoleProprietorRegistrationController.createOrUpdateSoleProprietorRegistration);

// Get all sole proprietor registrations for the current user
router.get("/", authenticateToken, SoleProprietorRegistrationController.getAllSoleProprietorRegistrations);

// Get a specific sole proprietor registration by ID
router.get("/:id", authenticateToken, SoleProprietorRegistrationController.getSoleProprietorRegistrationById);

// Update a sole proprietor registration (admin only)
router.put("/:id", authenticateToken, isAdmin, SoleProprietorRegistrationController.updateSoleProprietorRegistration);

module.exports = router; 