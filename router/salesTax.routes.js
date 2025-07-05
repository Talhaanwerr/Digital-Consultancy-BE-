const express = require("express");
const router = express.Router();
const SalesTaxController = require("../controllers/SalesTaxController");
const authenticateToken = require("../middlewares/auth.middleware");

// Create or update sales tax filing
router.post("/", authenticateToken, SalesTaxController.createOrUpdateSalesTax);

// Get all sales tax filings for the authenticated user with optional filters
router.get("/", authenticateToken, SalesTaxController.getSalesTaxFilings);

// Get a specific sales tax filing by ID
router.get("/:id", authenticateToken, SalesTaxController.getSalesTaxFilingById);

// Update a specific sales tax filing by ID
router.patch("/:id", authenticateToken, SalesTaxController.updateSalesTaxFiling);

module.exports = router; 