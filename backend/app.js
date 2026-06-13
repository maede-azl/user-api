require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/config/swagger')
const userRoutes = require('./src/routes/user.route')
const authRoutes = require('./src/routes/auth.route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

module.exports = app