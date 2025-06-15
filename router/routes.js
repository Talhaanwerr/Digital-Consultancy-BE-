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

module.exports = router; 