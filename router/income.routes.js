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

// Property Sale Income routes
router.post("/property-sale", authenticateToken, IncomeController.savePropertySaleIncome);
router.get(
  "/property-sale/:year",
  authenticateToken,
  IncomeController.getPropertySaleIncome
);

// Agriculture Income routes
router.post("/agriculture", authenticateToken, IncomeController.saveAgricultureIncome);
router.get(
  "/agriculture/:year",
  authenticateToken,
  IncomeController.getAgricultureIncome
);

// Partnership Income routes
router.post("/partnership", authenticateToken, IncomeController.savePartnershipIncome);
router.get(
  "/partnership/:year",
  authenticateToken,
  IncomeController.getPartnershipIncome
);

// Freelancer Income routes
router.post("/freelancer", authenticateToken, IncomeController.saveFreelancerIncome);
router.get(
  "/freelancer/:year",
  authenticateToken,
  IncomeController.getFreelancerIncome
);

// Profession Income routes
router.post("/profession", authenticateToken, IncomeController.saveProfessionIncome);
router.get(
  "/profession/:year",
  authenticateToken,
  IncomeController.getProfessionIncome
);

// Commission Income routes
router.post("/commission", authenticateToken, IncomeController.saveCommissionIncome);
router.get(
  "/commission/:year",
  authenticateToken,
  IncomeController.getCommissionIncome
);

// Dividend Capital Gain Income routes
router.post("/dividend-cap-gain", authenticateToken, IncomeController.saveDividendCapitalGainIncome);
router.get(
  "/dividend-cap-gain/:year",
  authenticateToken,
  IncomeController.getDividendCapitalGainIncome
);

// Business Income routes
router.post("/business", authenticateToken, IncomeController.saveBusinessIncome);
router.get(
  "/business/:year",
  authenticateToken,
  IncomeController.getBusinessIncome
);

// Other Income routes
router.post("/other-income", authenticateToken, IncomeController.saveOtherIncome);
router.get(
  "/other-income/:year",
  authenticateToken,
  IncomeController.getOtherIncome
);

module.exports = router;
