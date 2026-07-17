const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// Get user's cart
router.get('/', protect, async (req, res) => {
    try {
        // Safely check both req.user.id or req.user._id depending on your middleware setup
        const userId = req.user._id || req.user.id;
        
        let cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add item to cart
router.post('/add', protect, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const userId = req.user._id || req.user.id;
        
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            // FIXED: Changed the typo "+-" to a proper "+=" assignment operator
            cart.items[itemIndex].quantity += (quantity || 1);
        } else {
            cart.items.push({ productId, quantity: quantity || 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove item from cart
router.post('/remove', protect, async (req, res) => {
    const { productId } = req.body;
    try {
        const userId = req.user._id || req.user.id;
        
        let cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;