const express = require('express');
const router = express.Router();
const ProfitSavingController = require('../controllers/ProfitSavingController.js');
const authenticateToken = require('../middlewares/auth.middleware.js');

// Bank profit routes
router.post('/bank', authenticateToken, ProfitSavingController.saveBankProfit);
router.get('/bank/:year', authenticateToken, ProfitSavingController.getBankProfit);

// Behbood profit routes
router.post('/behbood', authenticateToken, ProfitSavingController.saveBehboodProfit);
router.get('/behbood/:year', authenticateToken, ProfitSavingController.getBehboodProfit);

// Government scheme profit routes
router.post('/govt-scheme', authenticateToken, ProfitSavingController.saveGovtSchemeProfit);
router.get('/govt-scheme/:year', authenticateToken, ProfitSavingController.getGovtSchemeProfit);

// Pensioner benefit profit routes
router.post('/pensioner', authenticateToken, ProfitSavingController.savePensionerBenefitProfit);
router.get('/pensioner/:year', authenticateToken, ProfitSavingController.getPensionerBenefitProfit);

module.exports = router; 