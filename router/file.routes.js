const express = require("express");
const router = express.Router();
const FileController = require("../controllers/FileController.js");
const upload = require("../utils/fileUpload.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

// File upload route - JWT protected
router.post("/upload", authenticateToken, upload.single("file"), FileController.uploadFile);

module.exports = router; 