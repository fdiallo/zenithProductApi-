// Dependencies
const express = require("express")
const router = express.Router()
const Product = require("./../models/Product.js")


// POST /api/products (Create a Product)
router.post("/api/products", async (req, res) => {

    try {
        const { name, description, price, category, inStock, tags, createdAt } = req.body
        const savedProduct = await Product.create({
            name,
            description,
            price,
            category,
            inStock,
            tags,
            createdAt
        })

        res.status(201).json({ success: true, data: savedProduct })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// GET /:id - Retrieves a single product by its _id
router.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/products/:id (Update a Product)
router.put("/api/products/:id", async (req, res) => {
    try {
        // {new: true} returns the updated document instead of the old one
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/products/:id (Delete a Product)
router.delete("/api/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/products (Read All Products with Advanced Querying)
router.get("/api/products", async (req, res) => {

    try {
        const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

        // 1. Filtering
        let query = {};
        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // 2. Sorting
        let sortOptions = {};
        if (sortBy === "price_asc") sortOptions.price = 1;
        if (sortBy === "price_desc") sortOptions.price = -1;

        // 3. Execution with Pagination
        const skip = (page - 1) * limit;
        const products = await Product.find(query)
            .sort(sortOptions)
            .limit(Number(limit))
            .skip(skip);

        res.json({
            page: Number(page),
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

module.exports = router

