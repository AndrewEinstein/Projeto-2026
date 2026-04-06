import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Dashboard(){
  const [metrics,setMetrics]=useState({sales:0,orders:0,customers:0,products:0})

  useEffect(()=>{
    async function load(){
      try{
        const res = await api.get('/admin/metrics')
        setMetrics(res)
      }catch(e){/* ignore */}
    }
    load()
  },[])

  const fmt = v => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v)

  return (
    <div>
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      <div className="metrics">
        <div className="metric card">Vendas: <strong>{fmt(metrics.sales || 0)}</strong></div>
        <div className="metric card">Pedidos: <strong>{metrics.orders}</strong></div>
        <div className="metric card">Clientes: <strong>{metrics.customers}</strong></div>
        <div className="metric card">Produtos: <strong>{metrics.products}</strong></div>
      </div>
      <div style={{marginTop:16}} className="card">
        <h3>Visão geral</h3>
        <p>Relatórios e gráficos podem ser adicionados aqui.</p>
      </div>
    </div>
  )
}
