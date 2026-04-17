const prismaModule = require('../prismaClient')
const { PrismaClient } = require('@prisma/client')
const prisma = prismaModule && prismaModule.prisma ? prismaModule.prisma : new PrismaClient()

async function listCoupons(req, res) {
  const coupons = await prisma.coupon.findMany({ orderBy: { id: 'desc' } })
  res.json(coupons)
}

async function createCoupon(req, res) {
  const { code, percent, active } = req.body
  const coupon = await prisma.coupon.create({ data: { code, percent: Number(percent || 0), active: !!active } })
  res.json(coupon)
}

async function updateCoupon(req, res) {
  const id = Number(req.params.id)
  const { code, percent, active } = req.body
  const coupon = await prisma.coupon.update({ where: { id }, data: { code, percent: Number(percent || 0), active: !!active } })
  res.json(coupon)
}

async function deleteCoupon(req, res) {
  const id = Number(req.params.id)
  await prisma.coupon.delete({ where: { id } })
  res.json({ ok: true })
}

module.exports = { listCoupons, createCoupon, updateCoupon, deleteCoupon }
