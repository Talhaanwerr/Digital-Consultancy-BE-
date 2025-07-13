const express = require("express");
const router = express.Router();
const BusinessDeletionFromNtnController = require("../controllers/BusinessDeletionFromNtnController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const isAdmin = require("../middlewares/admin.middleware.js");

// Create or update a business deletion from NTN
router.post("/", authenticateToken, BusinessDeletionFromNtnController.createOrUpdateBusinessDeletionFromNtn);

// Get all business deletion from NTN registrations for the current user
router.get("/", authenticateToken, BusinessDeletionFromNtnController.getAllBusinessDeletionFromNtns);

// Get a specific business deletion from NTN registration by ID
router.get("/:id", authenticateToken, BusinessDeletionFromNtnController.getBusinessDeletionFromNtnById);

// Update a business deletion from NTN registration (admin only)
router.put("/:id", authenticateToken, isAdmin, BusinessDeletionFromNtnController.updateBusinessDeletionFromNtn);

module.exports = router; 