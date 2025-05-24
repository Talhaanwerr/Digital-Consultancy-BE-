const express = require("express");
const router = express.Router();
const CompanyReturnFilingController = require("../controllers/CompanyReturnFilingController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Create a new company return
router.post("/", authenticateToken, CompanyReturnFilingController.createCompanyReturn);

// Get all company returns with filtering and pagination
router.get("/", authenticateToken, CompanyReturnFilingController.getAllCompanyReturns);

// Get a specific company return by ID
router.get("/:id", authenticateToken, CompanyReturnFilingController.getCompanyReturnById);

// Update a company return
router.put("/:id", authenticateToken, CompanyReturnFilingController.updateCompanyReturn);

// Delete a company return
router.delete("/:id", authenticateToken, CompanyReturnFilingController.deleteCompanyReturn);

module.exports = router; 