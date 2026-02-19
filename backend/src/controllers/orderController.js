const orderService = require('../services/orderService');

async function create(req, res, next) {
    try {
        const { customerName, items } = req.body;
        if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'customerName and items array are required.' });
        }

        for (const item of items) {
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ error: 'Each item must have a valid productId and quantity > 0.' });
            }
        }

        const order = await orderService.createOrder(customerName, items, req.user.id);
        res.status(201).json({ message: 'Order created successfully.', order });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        let orders;
        if (req.user.role === 'ADMIN') {
            orders = await orderService.getAllOrders();
        } else {
            orders = await orderService.getOrdersByUser(req.user.id);
        }
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

module.exports = { create, getAll };
