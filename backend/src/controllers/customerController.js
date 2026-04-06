const { prisma } = require('../prismaClient')

async function listCustomers(req, res) {
  const customers = await prisma.customer.findMany({ orderBy: { id: 'desc' } })
  res.json(customers)
}

async function createCustomer(req, res) {
  const { name, email } = req.body
  const customer = await prisma.customer.create({ data: { name, email } })
  res.json(customer)
}

async function updateCustomer(req, res) {
  const id = Number(req.params.id)
  const { name, email } = req.body
  const customer = await prisma.customer.update({ where: { id }, data: { name, email } })
  res.json(customer)
}

async function deleteCustomer(req, res) {
  const id = Number(req.params.id)
  await prisma.customer.delete({ where: { id } })
  res.json({ ok: true })
}

module.exports = { listCustomers, createCustomer, updateCustomer, deleteCustomer }
