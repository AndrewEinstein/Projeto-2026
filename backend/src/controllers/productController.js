const { prisma } = require('../prismaClient')

async function listProducts(req, res) {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(products)
}

async function createProduct(req, res) {
  const { name, price, stock } = req.body
  const product = await prisma.product.create({ data: { name, price: Number(price), stock: Number(stock) } })
  res.json(product)
}

async function updateProduct(req, res) {
  const id = Number(req.params.id)
  const { name, price, stock } = req.body
  const product = await prisma.product.update({ where: { id }, data: { name, price: Number(price), stock: Number(stock) } })
  res.json(product)
}

async function deleteProduct(req, res) {
  const id = Number(req.params.id)
  await prisma.product.delete({ where: { id } })
  res.json({ ok: true })
}

module.exports = { listProducts, createProduct, updateProduct, deleteProduct }
