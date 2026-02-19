const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/summary', authenticate, authorize('ADMIN'), reportController.getSummary);

module.exports = router;
