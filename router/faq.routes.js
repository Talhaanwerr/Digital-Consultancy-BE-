const express = require('express');
const router = express.Router();
const FaqController = require('../controllers/FaqController.js');
const authenticateToken = require("../middlewares/auth.middleware.js");
const isAdmin = require("../middlewares/admin.middleware.js");


// Protected routes - require authentication
router.get('/', authenticateToken, FaqController.getAllFaqs);
router.get('/:id', authenticateToken, FaqController.getFaqById);
router.post('/', authenticateToken, isAdmin, FaqController.createFaq);
router.put('/:id', authenticateToken, isAdmin, FaqController.updateFaq);
router.delete('/:id', authenticateToken, isAdmin, FaqController.deleteFaq);

module.exports = router; 