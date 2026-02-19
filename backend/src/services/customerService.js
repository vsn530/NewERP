const prisma = require('../utils/prisma');

async function createCustomer(data) {
    const existing = await prisma.customer.findUnique({ where: { email: data.email } });
    if (existing) {
        throw Object.assign(new Error('Customer with this email already exists.'), { status: 400 });
    }
    return prisma.customer.create({ data });
}

async function getAllCustomers() {
    return prisma.customer.findMany({ orderBy: { created_at: 'desc' } });
}

async function getCustomerByName(name) {
    return prisma.customer.findFirst({ where: { name } });
}

module.exports = { createCustomer, getAllCustomers, getCustomerByName };
