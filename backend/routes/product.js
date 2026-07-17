const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// // Public: Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// // Add a product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const product = new new Product({ name, description, price, image, category });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;