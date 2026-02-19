const authService = require('../services/authService');

async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const user = await authService.registerAdmin(email, password);
        res.status(201).json({ message: 'Admin registered successfully.', user });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters.' });
        }
        await authService.changePassword(req.user.id, newPassword);
        res.json({ message: 'Password changed successfully.' });
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login, changePassword };
