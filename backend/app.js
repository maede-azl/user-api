require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoutes = require('./src/routes/user.route')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)

module.exports = app