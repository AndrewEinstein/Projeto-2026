import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Checkout(){
  const { items, checkout, clear } = useCart()
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState(null)

  const subtotal = items.reduce((s,i)=> s + i.product.price * i.quantity, 0)

  async function handleCheckout(){
    if(items.length===0) return alert('Carrinho vazio')
    setLoading(true)
    try{
      const res = await checkout({ name: 'Cliente', email: 'cliente@example.com' })
      setMessage(`Pedido ${res.orderId} criado. Total R$ ${res.total}`)
      clear()
    }catch(err){
      alert('Erro ao processar pedido')
    }finally{setLoading(false)}
  }

  return (
    <div>
      <div className="header"><h1>Checkout</h1></div>
      <div className="card">
        <p>Itens: {items.length}</p>
        <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={handleCheckout} disabled={loading}>{loading? 'Processando...':'Finalizar Pedido'}</button>
        </div>
        {message && <div style={{marginTop:12}} className="card">{message}</div>}
      </div>
    </div>
  )
}
