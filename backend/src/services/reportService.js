const prisma = require('../utils/prisma');

async function getSummary() {
    const [totalOrders, revenueResult, totalProducts, totalCustomers] = await Promise.all([
        prisma.order.count(),
        prisma.order.aggregate({ _sum: { total_amount: true } }),
        prisma.product.count(),
        prisma.customer.count(),
    ]);

    return {
        totalOrders,
        totalRevenue: revenueResult._sum.total_amount || 0,
        totalProducts,
        totalCustomers,
    };
}

module.exports = { getSummary };
