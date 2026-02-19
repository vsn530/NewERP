const productService = require('../services/productService');

async function create(req, res, next) {
    try {
        const { name, price, stock_quantity } = req.body;
        if (!name || price == null || stock_quantity == null) {
            return res.status(400).json({ error: 'Name, price, and stock_quantity are required.' });
        }
        const product = await productService.createProduct({ name, price: parseFloat(price), stock_quantity: parseInt(stock_quantity) });
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { name, price, stock_quantity } = req.body;
        const data = {};
        if (name !== undefined) data.name = name;
        if (price !== undefined) data.price = parseFloat(price);
        if (stock_quantity !== undefined) data.stock_quantity = parseInt(stock_quantity);
        const product = await productService.updateProduct(id, data);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        await productService.deleteProduct(id);
        res.json({ message: 'Product deleted successfully.' });
    } catch (err) {
        next(err);
    }
}

module.exports = { create, getAll, update, remove };
