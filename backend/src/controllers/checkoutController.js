const { prisma } = require('../prismaClient')

async function handleCheckout(req, res) {
  /* Expected body:
    {
      customer: { name, email } or customerId,
      items: [{ productId, quantity }],
      couponCode?: string
    }
  */
  const { customer, customerId, items, couponCode } = req.body
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'items_required' })

  try {
    const result = await prisma.$transaction(async (tx) => {
      // resolve or create customer
      let custId = customerId
      if (!custId && customer && customer.email) {
        const existing = await tx.customer.findUnique({ where: { email: customer.email } })
        if (existing) custId = existing.id
        else {
          const c = await tx.customer.create({ data: { name: customer.name || '', email: customer.email } })
          custId = c.id
        }
      }

      // fetch products and validate stock
      const prodIds = items.map(i => i.productId)
      const products = await tx.product.findMany({ where: { id: { in: prodIds } } })
      const productMap = new Map(products.map(p => [p.id, p]))

      let subtotal = 0
      for (const it of items) {
        const p = productMap.get(it.productId)
        if (!p) throw new Error('product_not_found')
        if (p.stock < it.quantity) throw new Error('insufficient_stock')
        subtotal += Number(p.price) * Number(it.quantity)
      }

      const total = subtotal

      const order = await tx.order.create({ data: { total: Number(total), status: 'pending' } })

      // decrement stock for each product
      for (const it of items) {
        const p = productMap.get(it.productId)
        await tx.product.update({ where: { id: p.id }, data: { stock: p.stock - it.quantity } })
      }

      return { orderId: order.id, total, subtotal }
    })

    res.json(result)
  } catch (err) {
    if (err.message === 'insufficient_stock') return res.status(400).json({ error: 'insufficient_stock' })
    if (err.message === 'product_not_found') return res.status(400).json({ error: 'product_not_found' })
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
}

module.exports = { handleCheckout }
