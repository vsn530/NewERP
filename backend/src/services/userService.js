const crypto = require('crypto');
const prisma = require('../utils/prisma');
const { hashPassword } = require('./authService');

async function createStaff(email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw Object.assign(new Error('User with this email already exists.'), { status: 400 });
    }

    const tempPassword = crypto.randomBytes(4).toString('hex'); // 8 char random password
    const password_hash = await hashPassword(tempPassword);

    const user = await prisma.user.create({
        data: { email, password_hash, role: 'STAFF', must_change_password: true },
    });

    return {
        user: { id: user.id, email: user.email, role: user.role },
        temporaryPassword: tempPassword,
    };
}

async function getAllUsers() {
    return prisma.user.findMany({
        select: { id: true, email: true, role: true, must_change_password: true, created_at: true },
        orderBy: { created_at: 'desc' },
    });
}

module.exports = { createStaff, getAllUsers };
