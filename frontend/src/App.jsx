import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Produtos from './pages/Produtos'
import Clientes from './pages/Clientes'
import Pedidos from './pages/Pedidos'
import Cupons from './pages/Cupons'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Logs from './pages/Logs'
import AdminLayout from './layout/AdminLayout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="cupons" element={<Cupons />} />
        <Route path="logs" element={<Logs />} />
        <Route path="carrinho" element={<Carrinho />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}
