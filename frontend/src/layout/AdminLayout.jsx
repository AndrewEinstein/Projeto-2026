import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import OfflineBanner from '../components/OfflineBanner'

export default function AdminLayout() {
  return (
    <div>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <div className="header">
          <div>
            <input className="search" placeholder="Pesquisar produtos, pedidos..." />
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:700}}>Protheus</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>Painel administrativo</div>
            </div>
            <div className="avatar" />
          </div>
        </div>
        <OfflineBanner />
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
