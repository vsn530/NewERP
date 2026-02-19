const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, orderController.create);
router.get('/', authenticate, orderController.getAll);

module.exports = router;
