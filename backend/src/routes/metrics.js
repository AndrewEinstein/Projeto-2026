const express = require('express')
const router = express.Router()
const { prisma } = require('../prismaClient')

router.get('/', async (req, res) => {
  // Métricas agregadas para dashboard
  try {
    const orders = await prisma.order.count()
    const customers = await prisma.customer.count()
    const products = await prisma.product.count()
    const agg = await prisma.order.aggregate({ _sum: { total: true } })
    const sales = agg._sum && agg._sum.total ? agg._sum.total : 0
    res.json({ sales, orders, customers, products })
  } catch (err) {
    console.error('Metrics error', err)
    res.status(500).json({ error: 'failed to load metrics' })
  }
})

module.exports = router
