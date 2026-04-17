import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Logs(){
  const [logs, setLogs] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{ load() }, [])

  async function load(){
    try{ const data = await api.get('/admin/logs'); setLogs(data) }catch(e){ console.error(e); alert('Erro ao carregar logs') }
  }

  const filtered = logs.filter(l => {
    if (!q) return true
    const s = q.toLowerCase()
    return JSON.stringify(l).toLowerCase().includes(s)
  })

  return (
    <div style={{ padding: 20 }}>
      <div className="header"><h1>Logs & Rastreamento</h1></div>

      <div style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <input placeholder="Buscar (path, método, ip, body)" value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,padding:8}} />
        <button className="btn" onClick={load}>Atualizar</button>
      </div>

      <div className="card" style={{ maxHeight: '60vh', overflow: 'auto' }}>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr><th>Ts</th><th>Método</th><th>Path</th><th>IP</th><th>Body</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={5}>Nenhum log</td></tr>}
            {filtered.map((l, idx) => (
              <tr key={idx} style={{ fontSize: 13 }}>
                <td>{l.ts}</td>
                <td>{l.method}</td>
                <td>{l.path}</td>
                <td>{l.ip}</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{l.body && Object.keys(l.body).length ? JSON.stringify(l.body) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
