// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()


const productRouter = require("./routes/productRoutes.js")

const { connectDB } = require("./db/connection.js")


connectDB()


// Middleware
app.use(express.urlencoded({extended: true}))

app.use(express.json())     // Middleware to parse JSON bodies

// Routes
app.use("/", productRouter);   // Mount the router


// Port
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`Server listening on Port: ${PORT}`)})