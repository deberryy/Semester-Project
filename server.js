const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors') // Import cors middleware
const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes') // Import new routes
const app = express()
const port = process.env.PORT || 5000

connectDB()

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Enable CORS for all requests
app.use(cors())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/payments', paymentRoutes) // Use the new payment routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
