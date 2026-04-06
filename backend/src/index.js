const app = require('./app')
const { prisma } = require('./prismaClient')

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`))
