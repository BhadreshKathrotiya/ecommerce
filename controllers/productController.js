const Product = require('../models/Product');

// // Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Get product by ID or handle
exports.getProduct = async (req, res) => {
    const { identifier } = req.params;
    try {
        const product = await Product.findOne({
            $or: [{ _id: identifier }, { handle: identifier }]
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};