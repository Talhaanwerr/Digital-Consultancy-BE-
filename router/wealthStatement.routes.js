const express = require("express");
const router = express.Router();
const WealthStatementController = require("../controllers/WealthStatementController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Wealth Statement routes
router.post("/", authenticateToken, WealthStatementController.saveWealthStatement);
router.get("/:year", authenticateToken, WealthStatementController.getWealthStatement);

module.exports = router; 