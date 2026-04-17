const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main(){
  console.log('Seeding database...')
  const pass = await bcrypt.hash('password123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password: pass, name: 'Admin' }
  })

  // Gera 20 produtos de exemplo
  const products = Array.from({ length: 20 }).map((_, i) => ({
    name: `Produto ${i + 1}`,
    price: parseFloat((Math.random() * 200 + 10).toFixed(2)),
    stock: Math.floor(Math.random() * 200) + 1
  }))
  for (const p of products) {
    const exists = await prisma.product.findFirst({ where: { name: p.name } })
    if (!exists) await prisma.product.create({ data: p })
  }

  // Gera 20 clientes de exemplo
  const customers = Array.from({ length: 20 }).map((_, i) => ({
    name: `Cliente ${i + 1}`,
    email: `cliente${i + 1}@example.com`
  }))
  for (const c of customers) {
    await prisma.customer.upsert({ where: { email: c.email }, update: {}, create: c })
  }

  // Gera 20 pedidos de exemplo
  const orderStatuses = ['pending', 'completed', 'cancelled']
  for (let i = 0; i < 20; i++) {
    const total = parseFloat((Math.random() * 500 + 20).toFixed(2))
    const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)]
    await prisma.order.create({ data: { total, status } })
  }

  // coupons
  // Gera 20 cupons de exemplo
  for (let i = 1; i <= 20; i++) {
    const code = `PROMO${i}`
    const percent = [5, 10, 15, 20, 25, 30, 50][i % 7]
    try { await prisma.coupon.create({ data: { code, percent, active: true } }) } catch (e) { /* ignore dup */ }
  }

  console.log('Seeding finished')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
