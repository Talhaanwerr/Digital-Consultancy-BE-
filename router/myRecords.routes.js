const express = require('express');
const router = express.Router();
const MyRecordsController = require('../controllers/MyRecordsController');
const authenticateToken = require('../middlewares/auth.middleware');

// My Records route - JWT protected
router.get('/', authenticateToken, MyRecordsController.getAllRecords);

module.exports = router; 