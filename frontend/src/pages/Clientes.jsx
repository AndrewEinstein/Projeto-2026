import React, { useEffect, useState } from 'react'

const API = 'http://localhost:4000/customers'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const carregar = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error('Erro na resposta da API')
      const data = await res.json()
      // Normaliza os campos vindos do backend (name -> nome, telefone pode não existir)
      const normalized = data.map(c => ({ id: c.id, nome: c.name || c.nome, email: c.email, telefone: c.telefone || '' }))
      setClientes(normalized)
    } catch (err) {
      console.error('Erro ao carregar clientes', err)
      setError('Erro ao carregar clientes — verifique se o backend está rodando')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const salvar = async () => {
    if (!form.nome || !form.email) {
      alert('Preencha nome e email')
      return
    }

    try {
      // O backend espera os campos em inglês: { name, email }
      const payload = { name: form.nome, email: form.email }
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } else {
        await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }

      setForm({ nome: '', email: '', telefone: '' })
      setEditId(null)
      carregar()
    } catch {
      alert('Erro ao salvar cliente')
    }
  }

  const editar = (cliente) => {
    setForm({ nome: cliente.nome || cliente.name || '', email: cliente.email || '', telefone: cliente.telefone || '' })
    setEditId(cliente.id)
  }

  const excluir = async (id) => {
    if (!confirm('Deseja excluir este cliente?')) return

    await fetch(`${API}/${id}`, { method: 'DELETE' })
    carregar()
  }

  return (
    <div style={{ padding: 24 }}>
      <div className="header">
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          background: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Clientes
        </h1>
      </div>

      <div style={cardForm}>
        <h3 style={{ marginBottom: 12 }}>
          {editId ? '✏️ Editar Cliente' : '➕ Novo Cliente'}
        </h3>

        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" style={input}/>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={input}/>
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" style={input}/>

        <button onClick={salvar} style={btnSalvar}>
          {editId ? 'Atualizar' : 'Criar'}
        </button>
      </div>

      <div>
        {error && (
          <div style={{ background: '#ffe6e6', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Carregando clientes...</div>
        ) : (
          clientes.length === 0 ? (
            <div style={{ color: '#94a3b8' }}>Nenhum cliente cadastrado</div>
          ) : (
            clientes.map(c => (
              <div key={c.id} style={cardItem}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div>
                  <strong style={{ fontSize: 16 }}>{c.nome}</strong>
                  <div style={{ color: '#94a3b8' }}>{c.email}</div>
                  <div style={{ color: '#94a3b8' }}>{c.telefone}</div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => editar(c)} style={btnEdit}>
                    Editar
                  </button>

                  <button onClick={() => excluir(c.id)} style={btnDelete}>
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  )
}

/* ===== ESTILOS ===== */

const cardForm = {
  background: 'linear-gradient(145deg, #0f172a, #020617)',
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
  boxShadow: '0 0 20px rgba(0,0,0,0.4)',
  border: '1px solid #1e293b'
}

const input = {
  display: 'block',
  width: '100%',
  marginBottom: 10,
  padding: 12,
  borderRadius: 8,
  border: '1px solid #1e293b',
  background: '#020617',
  color: '#fff',
  outline: 'none'
}

const btnSalvar = {
  padding: 12,
  background: 'linear-gradient(90deg, #22c55e, #4ade80)',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 700,
  boxShadow: '0 0 10px rgba(34,197,94,0.5)'
}

const btnEdit = {
  background: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: 6,
  cursor: 'pointer'
}

const btnDelete = {
  background: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: 6,
  cursor: 'pointer'
}

const cardItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#020617',
  padding: 14,
  borderRadius: 10,
  marginBottom: 10,
  border: '1px solid #1e293b',
  transition: '0.2s',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
}