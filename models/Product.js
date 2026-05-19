const mongoose = require("mongoose")

// Define Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0.01 },
    category: { type: String, required: true },
     inStock: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product