const express = require("express");
const router = express.Router();
const ReceiptController = require("../controllers/ReceiptController.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// Upload receipt for any entity type
router.post("/", authenticateToken, ReceiptController.uploadReceipt);

module.exports = router; 