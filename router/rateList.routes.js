const express = require("express");
const router = express.Router();
const RateListController = require("../controllers/RateListController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const isAdmin = require("../middlewares/admin.middleware.js");

// Rate List routes - all protected with JWT and admin-only
router.post("/", authenticateToken, isAdmin, RateListController.createRateList);
router.get("/", authenticateToken, RateListController.getAllRateLists); // This one accessible by mobile app
router.get("/:id", authenticateToken, RateListController.getRateListById);
router.put("/:id", authenticateToken, isAdmin, RateListController.updateRateList);
router.delete("/:id", authenticateToken, isAdmin, RateListController.deleteRateList);

module.exports = router; 