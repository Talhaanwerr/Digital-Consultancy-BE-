const express = require("express");
const router = express.Router();
const TaxDeductionController = require("../controllers/TaxDeductionController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Get All Tax Deduction Categories route
router.get("/all-categories", authenticateToken, TaxDeductionController.getAllDeductionCategories);

// Tax Deduction Categories routes
router.post("/categories", authenticateToken, TaxDeductionController.saveDeductionCategories);
router.get("/categories/:year", authenticateToken, TaxDeductionController.getDeductionCategories);

// Bank Deductions routes
router.post("/bank", authenticateToken, TaxDeductionController.saveBankDeductions);
router.get("/bank/:year", authenticateToken, TaxDeductionController.getBankDeductions);

// Vehicle Deductions routes
router.post("/vehicle", authenticateToken, TaxDeductionController.saveVehicleDeductions);
router.get("/vehicle/:year", authenticateToken, TaxDeductionController.getVehicleDeductions);

// Utilities Deductions routes
router.post("/utilities", authenticateToken, TaxDeductionController.saveUtilitiesDeductions);
router.get("/utilities/:year", authenticateToken, TaxDeductionController.getUtilitiesDeductions);

// Property Deductions routes
router.post("/property", authenticateToken, TaxDeductionController.savePropertyDeductions);
router.get("/property/:year", authenticateToken, TaxDeductionController.getPropertyDeductions);

// Other Deductions routes
router.post("/others", authenticateToken, TaxDeductionController.saveOtherDeductions);
router.get("/others/:year", authenticateToken, TaxDeductionController.getOtherDeductions);

module.exports = router; 