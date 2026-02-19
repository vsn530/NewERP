const userService = require('../services/userService');

async function createStaff(req, res, next) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }
        const result = await userService.createStaff(email);
        res.status(201).json({
            message: 'Staff user created successfully.',
            ...result,
        });
    } catch (err) {
        next(err);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

module.exports = { createStaff, getAllUsers };
