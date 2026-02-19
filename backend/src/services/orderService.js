const prisma = require('../utils/prisma');

async function createOrder(customerName, items, createdBy) {
    // 1. Validate customer exists
    const customer = await prisma.customer.findFirst({ where: { name: customerName } });
    if (!customer) {
        throw Object.assign(new Error(`Customer "${customerName}" not found.`), { status: 404 });
    }

    // 2. Validate products exist
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    if (products.length !== productIds.length) {
        const foundIds = products.map(p => p.id);
        const missing = productIds.filter(id => !foundIds.includes(id));
        throw Object.assign(new Error(`Products not found: ${missing.join(', ')}`), { status: 404 });
    }

    // 3. Start database transaction
    const order = await prisma.$transaction(async (tx) => {
        // 4. Check stock for each product and calculate total
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await tx.product.findUnique({ where: { id: item.productId } });

            // 5. If insufficient stock, throw (transaction will rollback)
            if (product.stock_quantity < item.quantity) {
                throw Object.assign(
                    new Error(`Insufficient stock for "${product.name}". Available: ${product.stock_quantity}, Requested: ${item.quantity}`),
                    { status: 400 }
                );
            }

            // 6a. Deduct stock
            await tx.product.update({
                where: { id: item.productId },
                data: { stock_quantity: { decrement: item.quantity } },
            });

            const priceAtPurchase = product.price;
            totalAmount += priceAtPurchase * item.quantity;

            orderItemsData.push({
                product_id: item.productId,
                quantity: item.quantity,
                price_at_purchase: priceAtPurchase,
            });
        }

        // 6b. Create order record
        const newOrder = await tx.order.create({
            data: {
                customer_id: customer.id,
                created_by: createdBy,
                total_amount: totalAmount,
                order_items: {
                    create: orderItemsData,
                },
            },
            include: {
                order_items: { include: { product: true } },
                customer: true,
            },
        });

        return newOrder;
    });

    // 7 & 8. Transaction committed, return success
    return order;
}

async function getAllOrders() {
    return prisma.order.findMany({
        include: {
            customer: true,
            creator: { select: { id: true, email: true } },
            order_items: { include: { product: true } },
        },
        orderBy: { created_at: 'desc' },
    });
}

async function getOrdersByUser(userId) {
    return prisma.order.findMany({
        where: { created_by: userId },
        include: {
            customer: true,
            order_items: { include: { product: true } },
        },
        orderBy: { created_at: 'desc' },
    });
}

module.exports = { createOrder, getAllOrders, getOrdersByUser };
