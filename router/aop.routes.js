const express = require("express");
const router = express.Router();
const AopRegistrationController = require("../controllers/AopRegistrationController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Create a new AOP registration with partners
router.post("/", authenticateToken, AopRegistrationController.createAopRegistration);

// Update an AOP registration and replace its partners
router.put("/:id", authenticateToken, AopRegistrationController.updateAopRegistration);

// Get all AOP registrations for the current user
router.get("/", authenticateToken, AopRegistrationController.getAllAopRegistrations);

// Get a specific AOP registration by ID
router.get("/:id", authenticateToken, AopRegistrationController.getAopRegistrationById);

module.exports = router; 