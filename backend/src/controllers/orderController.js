const { prisma } = require('../prismaClient')

async function listOrders(req, res) {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(orders)
}

async function createOrder(req, res) {
  const { total, status } = req.body
  const order = await prisma.order.create({ data: { total: Number(total || 0), status: status || 'pending' } })
  res.json(order)
}

async function getOrder(req, res) {
  const id = Number(req.params.id)
  const order = await prisma.order.findUnique({ where: { id } })
  if (!order) return res.status(404).json({ error: 'not_found' })
  res.json(order)
}

async function updateOrderStatus(req, res) {
  const id = Number(req.params.id)
  const { status } = req.body
  const order = await prisma.order.update({ where: { id }, data: { status } })
  res.json(order)
}

module.exports = { listOrders, createOrder, getOrder, updateOrderStatus }
