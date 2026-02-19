const customerService = require('../services/customerService');

async function create(req, res, next) {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }
        const customer = await customerService.createCustomer({ name, email, phone });
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (err) {
        next(err);
    }
}

module.exports = { create, getAll };
