const request = require('supertest')
const app = require('../src/app')

describe('Products', () => {
  let token
  beforeAll(async () => {
    const res = await request(app).post('/auth/login').send({ email: 'admin@example.com', password: 'password123' })
    token = res.body.token
  })

  test('list products with auth', async () => {
    const res = await request(app).get('/products').set('Authorization', `Bearer ${token}`).expect(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
