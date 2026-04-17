import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Cupons(){
  const [cupons, setCupons] = useState([])
  const [form, setForm] = useState({ code: '', percent: '', active: true })
  const [editId, setEditId] = useState(null)

  useEffect(()=>{ load() }, [])

  async function load(){
    try{ const data = await api.get('/coupons'); setCupons(data) }catch(e){ console.error(e) }
  }

  function reset(){ setForm({ code: '', percent: '', active: true }); setEditId(null) }

  async function save(){
    try{
      if(editId) await api.put(`/coupons/${editId}`, { ...form })
      else await api.post('/coupons', { ...form })
      reset(); load()
    }catch(e){ console.error(e); alert('Erro ao salvar cupom') }
  }

  async function remove(id){ if(!confirm('Excluir cupom?')) return; await api.del(`/coupons/${id}`); load() }

  function edit(c){ setEditId(c.id); setForm({ code: c.code, percent: c.percent, active: c.active }) }

  return (
    <div>
      <div className="header"><h1>Cupons</h1></div>

      <div className="card">
        <h3>{editId ? 'Editar Cupom' : 'Novo Cupom'}</h3>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input placeholder="Código" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} />
          <input placeholder="Percent" value={form.percent} onChange={e=>setForm({...form,percent:e.target.value})} style={{width:120}} />
          <label style={{display:'flex',alignItems:'center',gap:6}}>
            <input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} /> Ativo
          </label>
          <button className="btn" onClick={save}>{editId ? 'Atualizar' : 'Criar'}</button>
          <button className="btn secondary" onClick={reset}>Cancelar</button>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Código</th><th>%</th><th>Ativo</th><th></th></tr></thead>
          <tbody>
            {cupons.map(c => (
              <tr key={c.id}>
                <td>{c.code}</td>
                <td>{c.percent}</td>
                <td>{c.active ? 'Sim' : 'Não'}</td>
                <td style={{display:'flex',gap:8}}>
                  <button className="btn" onClick={()=>edit(c)}>Editar</button>
                  <button className="btn secondary" onClick={()=>remove(c.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
