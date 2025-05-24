const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route.js");
const individualTaxReturnRoutes = require("./individualTaxReturn.route.js");
const companyReturnFilingRoutes = require("./companyReturnFiling.route.js");
const incomeRoutes = require("./income.routes.js");

router.use("/users", userRoutes);
router.use("/returns", individualTaxReturnRoutes);
router.use("/company-returns", companyReturnFilingRoutes);
router.use("/returns/income", incomeRoutes);

module.exports = router;




module.exports = router; 