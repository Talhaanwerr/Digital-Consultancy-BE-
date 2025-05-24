const express = require("express");
const router = express.Router();
const IncomeController = require("../controllers/IncomeController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Salary Income routes
router.post("/salary", authenticateToken, IncomeController.saveSalaryIncome);
router.get(
  "/salary/:year",
  authenticateToken,
  IncomeController.getSalaryIncome
);

// Pension Income routes
router.post("/pension", authenticateToken, IncomeController.savePensionIncome);
router.get(
  "/pension/:year",
  authenticateToken,
  IncomeController.getPensionIncome
);

// Rental Income routes
router.post("/rental", authenticateToken, IncomeController.saveRentalIncome);
router.get(
  "/rental/:year",
  authenticateToken,
  IncomeController.getRentalIncome
);

module.exports = router;
