const express = require("express");
const router = express.Router();
const IndividualTaxReturnController = require("../controllers/IndividualTaxReturnController.js");
const IncomeSourceController = require("../controllers/IncomeSourceController.js");
const authenticateToken = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

// Get tax return snapshot
router.get("/info/:taxYear", authenticateToken, IndividualTaxReturnController.getTaxReturnSnapshot);

// Save or update tax return info
router.post("/info", authenticateToken, IndividualTaxReturnController.saveReturnInfo);

router.get("/income-sources", authenticateToken, IncomeSourceController.getAllIncomeSources);
router.post("/income-sources", authenticateToken, IncomeSourceController.updateTaxReturnIncomeSources);

// New APIs
// Get all individual tax returns (admin only)
router.get("/all", authenticateToken, /*isAdmin,*/ IndividualTaxReturnController.getAllIndividualTaxReturns);

// Get individual tax return by ID (admin only)
router.get("/:id", authenticateToken, /*isAdmin, */IndividualTaxReturnController.getIndividualTaxReturnById);

module.exports = router; 