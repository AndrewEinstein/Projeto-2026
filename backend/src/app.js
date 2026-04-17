require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const metricsRoutes = require('./routes/metrics')
const customerRoutes = require('./routes/customers')
const orderRoutes = require('./routes/orders')
const checkoutRoutes = require('./routes/checkout')
const couponRoutes = require('./routes/coupons')
const logsRoutes = require('./routes/logs')
const { logger } = require('./middlewares/logger')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Logging middleware (grava em backend/logs/system.log)
app.use(logger)

// Para facilitar testes locais, as rotas principais estão abertas (sem exigir JWT).
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/customers', customerRoutes)
app.use('/orders', orderRoutes)
app.use('/admin/metrics', metricsRoutes)
app.use('/checkout', checkoutRoutes)
app.use('/coupons', couponRoutes)
app.use('/admin/logs', logsRoutes)

app.get('/', (req, res) => res.json({ ok: true }))

module.exports = app
