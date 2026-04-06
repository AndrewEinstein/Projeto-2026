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

  const products = [
    { name: 'Camiseta Básica', price: 49.9, stock: 120 },
    { name: 'Caneca 300ml', price: 29.5, stock: 80 },
    { name: 'Placa Decorativa', price: 79.0, stock: 40 }
  ]
  for (const p of products) {
    const exists = await prisma.product.findFirst({ where: { name: p.name } })
    if (!exists) await prisma.product.create({ data: p })
  }

  const customers = [
    { name: 'João Silva', email: 'joao@example.com' },
    { name: 'Maria Souza', email: 'maria@example.com' }
  ]
  for (const c of customers) {
    await prisma.customer.upsert({ where: { email: c.email }, update: {}, create: c })
  }

  const orders = [
    { total: 199.9, status: 'completed' },
    { total: 49.9, status: 'pending' }
  ]
  for (const o of orders) {
    await prisma.order.create({ data: o })
  }

  // coupons
  const coupons = [
    { code: 'WELCOME10', percent: 10, active: true },
    { code: 'HALFOFF', percent: 50, active: false }
  ]
  for (const cp of coupons) {
    try{ await prisma.coupon.create({ data: cp }) }catch(e){/* ignore */}
  }

  console.log('Seeding finished')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
