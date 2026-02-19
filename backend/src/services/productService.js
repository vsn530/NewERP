const prisma = require('../utils/prisma');

async function createProduct(data) {
    return prisma.product.create({ data });
}

async function getAllProducts() {
    return prisma.product.findMany({ orderBy: { created_at: 'desc' } });
}

async function getProductById(id) {
    return prisma.product.findUnique({ where: { id } });
}

async function updateProduct(id, data) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        throw Object.assign(new Error('Product not found.'), { status: 404 });
    }
    return prisma.product.update({ where: { id }, data });
}

async function deleteProduct(id) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        throw Object.assign(new Error('Product not found.'), { status: 404 });
    }
    return prisma.product.delete({ where: { id } });
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
