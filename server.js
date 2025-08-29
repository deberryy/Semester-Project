const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

connectDB() // Connect to MongoDB

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))

const port = process.env.PORT || 5000

app.listen(port, () => {
   

    console.log(`Server started on port ${port}`)
}
)