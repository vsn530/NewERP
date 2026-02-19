const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

async function registerAdmin(email, password) {
    const existingAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (existingAdmin) {
        throw Object.assign(new Error('Admin already exists.'), { status: 400 });
    }

    const password_hash = await hashPassword(password);
    const user = await prisma.user.create({
        data: { email, password_hash, role: 'ADMIN', must_change_password: false },
    });

    return { id: user.id, email: user.email, role: user.role };
}

async function login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw Object.assign(new Error('Invalid credentials.'), { status: 401 });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
        throw Object.assign(new Error('Invalid credentials.'), { status: 401 });
    }

    const token = generateToken(user);
    return {
        token,
        user: { id: user.id, email: user.email, role: user.role },
        must_change_password: user.must_change_password,
    };
}

async function changePassword(userId, newPassword) {
    const password_hash = await hashPassword(newPassword);
    await prisma.user.update({
        where: { id: userId },
        data: { password_hash, must_change_password: false },
    });
}

module.exports = { registerAdmin, login, changePassword, hashPassword, generateToken };
