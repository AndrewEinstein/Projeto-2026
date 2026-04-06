const jwt = require('jsonwebtoken')
const { prisma } = require('../prismaClient')

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

module.exports = async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) return res.status(401).json({ error: 'Unauthorized' })
    req.user = { id: user.id, email: user.email }
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
