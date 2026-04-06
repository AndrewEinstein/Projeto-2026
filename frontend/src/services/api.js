const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const api = {
  token: null,
  setToken(t) { this.token = t },
  async request(path, opts = {}) {
    const headers = opts.headers || {}
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`
    const res = await fetch(API_BASE + path, { ...opts, headers })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  get(path) { return this.request(path, { method: 'GET' }) },
  post(path, body) { return this.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) },
  put(path, body) { return this.request(path, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) },
  del(path) { return this.request(path, { method: 'DELETE' }) }
}

export default api
