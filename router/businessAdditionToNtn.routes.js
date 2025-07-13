const express = require("express");
const router = express.Router();
const BusinessAdditionToNtnController = require("../controllers/BusinessAdditionToNtnController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const isAdmin = require("../middlewares/admin.middleware.js");

// Create or update a business addition to NTN
router.post("/", authenticateToken, BusinessAdditionToNtnController.createOrUpdateBusinessAdditionToNtn);

// Get all business addition to NTN registrations for the current user
router.get("/", authenticateToken, BusinessAdditionToNtnController.getAllBusinessAdditionToNtns);

// Get a specific business addition to NTN registration by ID
router.get("/:id", authenticateToken, BusinessAdditionToNtnController.getBusinessAdditionToNtnById);

// Update a business addition to NTN registration (admin only)
router.put("/:id", authenticateToken, isAdmin, BusinessAdditionToNtnController.updateBusinessAdditionToNtn);

module.exports = router; 