const express = require("express");
const router = express.Router();
const IndividualTaxReturnController = require("../controllers/IndividualTaxReturnController.js");
const IncomeSourceController = require("../controllers/IncomeSourceController.js");
const authenticateToken = require("../middlewares/auth.middleware");

// Get tax return snapshot
router.get("/info/:taxYear", authenticateToken, IndividualTaxReturnController.getTaxReturnSnapshot);

// Save or update tax return info
router.post("/info", authenticateToken, IndividualTaxReturnController.saveReturnInfo);

router.get("/income-sources", authenticateToken, IncomeSourceController.getAllIncomeSources);
router.post("/income-sources", authenticateToken, IncomeSourceController.updateTaxReturnIncomeSources);


module.exports = router; 