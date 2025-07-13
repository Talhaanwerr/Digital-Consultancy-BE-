const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route.js");
const individualTaxReturnRoutes = require("./individualTaxReturn.route.js");
const companyReturnFilingRoutes = require("./companyReturnFiling.route.js");
const incomeRoutes = require("./income.routes.js");
const taxBenefitCreditRoutes = require("./taxBenefitCredit.routes.js");
const taxDeductionRoutes = require("./taxDeduction.routes.js");
const wealthStatementRoutes = require("./wealthStatement.routes.js");
const rateListRoutes = require("./rateList.routes.js");
const fileRoutes = require("./file.routes.js");
const faqRoutes = require("./faq.routes.js");
const profitSavingRoutes = require("./profitSaving.routes.js");
const salesTaxRoutes = require("./salesTax.routes.js");
const gstPstRoutes = require("./gstPst.routes.js");
const soleProprietorRoutes = require("./soleProprietor.routes.js");
const { computeReturnSummary } = require("../data/computeReturnSummary.js");
const { individualTaxReturn } = require("../data/data.js");
const WealthReconciliationController = require("../controllers/WealthReconciliationController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const ntnRegistrationRoutes = require("./ntnRegistration.routes.js");

router.use("/users", userRoutes);
router.use("/returns", individualTaxReturnRoutes);
router.use("/company-returns", companyReturnFilingRoutes);
router.use("/returns/income", incomeRoutes);
router.use("/returns/income/profit-saving", profitSavingRoutes);
router.use("/returns/tax-benefits", taxBenefitCreditRoutes);
router.use("/returns/deductions", taxDeductionRoutes);
router.use("/returns/wealth-statement", wealthStatementRoutes);
router.use("/rate-lists", rateListRoutes);
router.use("/files", fileRoutes);
router.use("/faqs", faqRoutes);
router.use("/sales-tax", salesTaxRoutes);
router.use("/gst-pst", gstPstRoutes);
router.use("/ntn-registrations", ntnRegistrationRoutes);
router.use("/business/sole-proprietor", soleProprietorRoutes);

// Legacy endpoint for testing
router.get("/wealth-reconciliation", (req, res) => {
  console.log("Wealth reconciliation endpoint hit", individualTaxReturn);
  const response = computeReturnSummary(individualTaxReturn?.data || {});
  res.status(200).json({
    status: "success",
    message: "Wealth reconciliation successful",
    data: response,
  });
});

// New wealth reconciliation endpoint with ID parameter
router.get("/wealth-reconciliation/:id", authenticateToken, WealthReconciliationController.getWealthReconciliation);

module.exports = router;
