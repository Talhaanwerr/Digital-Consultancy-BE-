const express = require("express");
const router = express.Router();
const GstPstRegistrationController = require("../controllers/GstPstRegistrationController");
const authenticateToken = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

// Create a new GST/PST registration
router.post("/", authenticateToken, GstPstRegistrationController.createGstPstRegistration);

// Get all GST/PST registrations for the authenticated user with optional filters
router.get("/", authenticateToken, GstPstRegistrationController.getGstPstRegistrations);

// Get all GST/PST registrations (admin only)
router.get("/all", authenticateToken, isAdmin, GstPstRegistrationController.getAllGstPstRegistrations);

// Get a specific GST/PST registration by ID
router.get("/:id", authenticateToken, GstPstRegistrationController.getGstPstRegistrationById);

// Update a specific GST/PST registration by ID
router.patch("/:id", authenticateToken, GstPstRegistrationController.updateGstPstRegistration);

module.exports = router; 