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
        res.status(400).json({ success: false, error: error.message })
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
    res.status(400).json({ message: err.message });
  }
});


module.exports = router

