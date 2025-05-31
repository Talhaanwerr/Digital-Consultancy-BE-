const express = require("express");
const router = express.Router();
const TaxBenefitCreditController = require("../controllers/TaxBenefitCreditController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Tax Benefits and Credits routes
router.post("/", authenticateToken, TaxBenefitCreditController.saveTaxBenefitCredit);
router.get(
  "/:year",
  authenticateToken,
  TaxBenefitCreditController.getTaxBenefitCredit
);

module.exports = router; 