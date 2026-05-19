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


module.exports = router

