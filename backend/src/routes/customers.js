const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, customerController.getAll);
router.post('/', authenticate, customerController.create);

module.exports = router;
