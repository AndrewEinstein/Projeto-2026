const request = require('supertest')
const app = require('../src/app')

describe('Auth', () => {
  test('login seed user returns token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' })
      .expect(200)
    expect(res.body.token).toBeDefined()
  })
})
